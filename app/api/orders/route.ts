import { createClient } from '@/lib/supabase/server'
import { createXenditInvoice, mapXenditStatusToOrderStatus } from '@/lib/xendit'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/orders
 * Get user's orders (customers) or all orders (admin/vendor)
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items(*, product:products(*)),
        payments(*)
      `)

    // Customers only see their own orders
    if (profile?.role === 'customer') {
      query = query.eq('customer_id', user.id)
    }

    const { data: orders, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ orders })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

/**
 * POST /api/orders
 * Create a new order
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { items, shipping_address, notes, payment_method } = body

    // Calculate total price
    let totalPrice = 0
    const orderItems = []

    for (const item of items) {
      const { data: product } = await supabase
        .from('products')
        .select('price')
        .eq('id', item.product_id)
        .single()

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.product_id} not found` },
          { status: 404 }
        )
      }

      const itemTotal = product.price * item.quantity
      totalPrice += itemTotal
      orderItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        price: product.price,
      })
    }

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: user.id,
        total_price: totalPrice,
        shipping_address,
        notes,
        payment_method: payment_method || 'cod',
        order_status: 'pending',
      })
      .select()
      .single()

    if (orderError) {
      return NextResponse.json({ error: orderError.message }, { status: 400 })
    }

    // Add order items
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(
        orderItems.map((item) => ({
          ...item,
          order_id: order.id,
        }))
      )

    if (itemsError) {
      return NextResponse.json({ error: itemsError.message }, { status: 400 })
    }

    // If payment method is Xendit, create invoice
    if (payment_method === 'xendit') {
      const { data: profile } = await supabase
        .from('profiles')
        .select('email, name')
        .eq('id', user.id)
        .single()

      const invoiceResult = await createXenditInvoice({
        externalId: order.id,
        amount: totalPrice,
        payerEmail: profile?.email || '',
        description: `Cassava Roll Order #${order.id}`,
        items: orderItems.map((item) => ({
          name: `Product ${item.product_id}`,
          quantity: item.quantity,
          price: item.price,
        })),
      })

      if (!invoiceResult.success) {
        return NextResponse.json(
          { error: invoiceResult.error || 'Failed to create payment' },
          { status: 400 }
        )
      }

      // Create payment record
      const { data: payment } = await supabase
        .from('payments')
        .insert({
          order_id: order.id,
          payment_gateway: 'xendit',
          payment_method: 'gcash', // default, user selects during payment
          payment_status: 'pending',
          amount: totalPrice,
          xendit_invoice_id: invoiceResult.data?.id,
          xendit_external_id: order.id,
          xendit_payment_url: invoiceResult.data?.invoice_url,
        })
        .select()
        .single()

      return NextResponse.json(
        {
          order,
          payment,
          paymentUrl: invoiceResult.data?.invoice_url,
        },
        { status: 201 }
      )
    }

    return NextResponse.json({ order }, { status: 201 })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
