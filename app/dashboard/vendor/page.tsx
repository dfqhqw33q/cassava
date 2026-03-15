import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Vendor Dashboard
 */
export default async function VendorDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  // Check if user is vendor or admin
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profileError || !profile || (profile.role !== 'vendor' && profile.role !== 'admin')) {
    redirect('/dashboard')
  }

  // Get vendor statistics
  const [
    { count: vendorProducts },
    { data: vendorOrders },
    { data: products },
  ] = await Promise.all([
    supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('vendor_id', user.id),
    supabase
      .from('orders')
      .select('*, order_items(*)')
      .limit(10),
    supabase
      .from('products')
      .select('*')
      .eq('vendor_id', user.id)
      .limit(5),
  ])

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold text-foreground mb-8">Vendor Dashboard</h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-muted-foreground text-sm font-medium mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-foreground">{vendorProducts || 0}</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-muted-foreground text-sm font-medium mb-2">Pending Orders</h3>
          <p className="text-3xl font-bold text-foreground">
            {vendorOrders?.filter((o: any) => o.order_status === 'pending').length || 0}
          </p>
        </div>
      </div>

      {/* Product List */}
      <div className="bg-card p-6 rounded-lg border border-border mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Your Products</h2>
        {products && products.length > 0 ? (
          <div className="space-y-4">
            {products.map((product: any) => (
              <div key={product.id} className="p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                    <p className="text-muted-foreground">{product.flavor}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Stock: {product.stock_quantity} | Price: ₱{product.price}
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    {product.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No products found</p>
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-4">Recent Orders</h2>
        {vendorOrders && vendorOrders.length > 0 ? (
          <div className="space-y-4">
            {vendorOrders.slice(0, 5).map((order: any) => (
              <div key={order.id} className="p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-mono text-sm text-foreground">Order: {order.id.substring(0, 8)}</p>
                    <p className="text-muted-foreground text-sm">Items: {order.order_items?.length || 0}</p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    {order.order_status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No orders found</p>
        )}
      </div>
    </div>
  )
}
