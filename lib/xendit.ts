/**
 * Xendit Payment Gateway Integration
 * Handles invoice creation, payment tracking, and webhook processing
 */

interface XenditInvoiceRequest {
  externalId: string
  amount: number
  payerEmail: string
  description: string
  invoiceDuration?: number
  items?: Array<{
    name: string
    quantity: number
    price: number
  }>
}

interface XenditInvoiceResponse {
  id: string
  external_id: string
  user_id: string
  status: string
  merchant_name: string
  amount: number
  payer_email: string
  description: string
  expiry_date: string
  invoice_url: string
  available_banks?: Array<{ code: string; name: string; is_installment: boolean }>
  available_retail_outlets?: Array<{ name: string; code: string }>
  available_ewallets?: Array<{ name: string; code: string }>
  available_qr_codes?: Array<{ name: string; code: string }>
  items?: Array<{ name: string; quantity: number; price: number }>
  fees?: { xendit_admin_fee: number; tax_amount: number; total_fees: number }
  created?: string
  updated?: string
  mid?: string
  fixed_va?: boolean
  should_send_email?: boolean
  payment_method?: string
  reminder_date?: string
  success_redirect_url?: string
  failure_redirect_url?: string
  credit_card_charge_currency?: string
  locale?: string
}

/**
 * Create a Xendit invoice for payment
 */
export async function createXenditInvoice(
  invoiceRequest: XenditInvoiceRequest
): Promise<{ success: boolean; data?: XenditInvoiceResponse; error?: string }> {
  try {
    const apiKey = process.env.XENDIT_API_KEY || process.env.XENDIT_SANDBOX_KEY
    if (!apiKey) {
      return { success: false, error: 'Xendit API key not configured' }
    }

    const response = await fetch('https://api.xendit.co/v2/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
      },
      body: JSON.stringify({
        external_id: invoiceRequest.externalId,
        amount: invoiceRequest.amount,
        payer_email: invoiceRequest.payerEmail,
        description: invoiceRequest.description,
        invoice_duration: invoiceRequest.invoiceDuration || 86400, // 24 hours default
        items: invoiceRequest.items,
        success_redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/success`,
        failure_redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/failed`,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return { success: false, error: error.message || 'Failed to create invoice' }
    }

    const data = (await response.json()) as XenditInvoiceResponse
    return { success: true, data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}

/**
 * Get invoice details from Xendit
 */
export async function getXenditInvoice(
  invoiceId: string
): Promise<{ success: boolean; data?: XenditInvoiceResponse; error?: string }> {
  try {
    const apiKey = process.env.XENDIT_API_KEY || process.env.XENDIT_SANDBOX_KEY
    if (!apiKey) {
      return { success: false, error: 'Xendit API key not configured' }
    }

    const response = await fetch(`https://api.xendit.co/v2/invoices/${invoiceId}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      return { success: false, error: error.message || 'Failed to get invoice' }
    }

    const data = (await response.json()) as XenditInvoiceResponse
    return { success: true, data }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}

/**
 * Verify Xendit webhook signature
 */
export async function verifyXenditWebhook(
  body: string,
  signature: string
): Promise<boolean> {
  try {
    const crypto = await import('crypto')
    const webhookToken = process.env.XENDIT_WEBHOOK_TOKEN
    if (!webhookToken) {
      console.error('Xendit webhook token not configured')
      return false
    }

    const hash = crypto
      .createHmac('sha256', webhookToken)
      .update(body)
      .digest('hex')

    return hash === signature
  } catch (error) {
    console.error('Webhook verification error:', error)
    return false
  }
}

/**
 * Parse and validate Xendit webhook payload
 */
export async function parseXenditWebhook(payload: any) {
  // Validate webhook payload structure
  if (!payload.id || !payload.status || !payload.external_id) {
    return { valid: false, error: 'Invalid webhook payload' }
  }

  return {
    valid: true,
    invoiceId: payload.id,
    externalId: payload.external_id,
    status: payload.status,
    paidAmount: payload.paid_amount,
    paymentMethod: payload.payment_method,
    paidAt: payload.paid_at,
  }
}

/**
 * Map Xendit payment status to order status
 */
export function mapXenditStatusToOrderStatus(xenditStatus: string): string {
  const statusMap: Record<string, string> = {
    PAID: 'confirmed',
    EXPIRED: 'cancelled',
    PENDING: 'pending',
  }

  return statusMap[xenditStatus] || 'pending'
}

/**
 * Map Xendit payment status to payment status
 */
export function mapXenditStatusToPaymentStatus(xenditStatus: string): string {
  const statusMap: Record<string, string> = {
    PAID: 'paid',
    EXPIRED: 'expired',
    PENDING: 'pending',
  }

  return statusMap[xenditStatus] || 'pending'
}
