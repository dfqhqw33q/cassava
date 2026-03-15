import { createClient } from '@/lib/supabase/server'
import {
  verifyXenditWebhook,
  parseXenditWebhook,
  mapXenditStatusToPaymentStatus,
  mapXenditStatusToOrderStatus,
} from '@/lib/xendit'
import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/webhooks/xendit
 * Handle Xendit invoice payment notifications
 */
export async function POST(req: NextRequest) {
  try {
    // Get request body as raw text for signature verification
    const body = await req.text()
    const signature = req.headers.get('x-callback-token') || ''

    // Verify webhook signature
    const isValid = await verifyXenditWebhook(body, signature)
    if (!isValid) {
      console.warn('Invalid Xendit webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const payload = JSON.parse(body)

    // Parse and validate webhook payload
    const webhookData = await parseXenditWebhook(payload)
    if (!webhookData.valid) {
      return NextResponse.json(
        { error: webhookData.error },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Update payment status
    const paymentStatus = mapXenditStatusToPaymentStatus(webhookData.status)
    const orderStatus = mapXenditStatusToOrderStatus(webhookData.status)

    const { error: paymentError } = await supabase
      .from('payments')
      .update({
        payment_status: paymentStatus,
        updated_at: new Date().toISOString(),
        paid_at:
          paymentStatus === 'paid'
            ? new Date().toISOString()
            : null,
      })
      .eq('xendit_invoice_id', webhookData.invoiceId)

    if (paymentError) {
      console.error('Failed to update payment:', paymentError)
      return NextResponse.json(
        { error: 'Failed to update payment' },
        { status: 500 }
      )
    }

    // Update order status if payment is successful
    if (paymentStatus === 'paid') {
      const { error: orderError } = await supabase
        .from('orders')
        .update({
          order_status: orderStatus,
          updated_at: new Date().toISOString(),
        })
        .eq('id', webhookData.externalId)

      if (orderError) {
        console.error('Failed to update order:', orderError)
        return NextResponse.json(
          { error: 'Failed to update order' },
          { status: 500 }
        )
      }

      // Create notification for customer
      const { data: order } = await supabase
        .from('orders')
        .select('customer_id')
        .eq('id', webhookData.externalId)
        .single()

      if (order) {
        await supabase.from('notifications').insert({
          user_id: order.customer_id,
          title: 'Payment Confirmed',
          message: `Payment for Order #${webhookData.externalId} has been confirmed.`,
          type: 'success',
          status: 'unread',
          link: `/orders/${webhookData.externalId}`,
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
