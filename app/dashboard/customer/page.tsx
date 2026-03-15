import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Customer Dashboard
 */
export default async function CustomerDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  // Check if user is customer
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profileError || !profile || profile.role !== 'customer') {
    redirect('/dashboard')
  }

  // Get customer data
  const [
    { count: totalOrders },
    { data: recentOrders },
    { data: cartItems },
  ] = await Promise.all([
    supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('customer_id', user.id),
    supabase
      .from('orders')
      .select('*, order_items(*, product:products(*))')
      .eq('customer_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('cart_items')
      .select('*, product:products(*)')
      .eq('user_id', user.id),
  ])

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold text-foreground mb-8">My Dashboard</h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-muted-foreground text-sm font-medium mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-foreground">{totalOrders || 0}</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-muted-foreground text-sm font-medium mb-2">Cart Items</h3>
          <p className="text-3xl font-bold text-foreground">{cartItems?.length || 0}</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-muted-foreground text-sm font-medium mb-2">Account Status</h3>
          <p className="text-3xl font-bold text-foreground">Active</p>
        </div>
      </div>

      {/* Cart Preview */}
      {cartItems && cartItems.length > 0 && (
        <div className="bg-card p-6 rounded-lg border border-border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Shopping Cart</h2>
          <div className="space-y-2">
            {cartItems.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center py-2">
                <span className="text-foreground">{item.product?.name}</span>
                <span className="text-muted-foreground">x{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-4">Recent Orders</h2>
        {recentOrders && recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order: any) => (
              <div key={order.id} className="p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-mono text-sm text-foreground">
                      Order ID: {order.id.substring(0, 8)}...
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    {order.order_status}
                  </span>
                </div>
                <div className="text-foreground font-semibold">₱{order.total_price}</div>
                <div className="text-muted-foreground text-sm mt-2">
                  {order.order_items?.length || 0} item(s)
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No orders yet. Start shopping!</p>
        )}
      </div>
    </div>
  )
}
