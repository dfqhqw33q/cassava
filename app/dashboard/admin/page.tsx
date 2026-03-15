import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Admin Dashboard
 */
export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  // Check if user is admin
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profileError || !profile || profile.role !== 'admin') {
    redirect('/dashboard')
  }

  // Get dashboard statistics
  const [
    { count: totalOrders },
    { count: totalUsers },
    { count: totalProducts },
    { data: recentOrders },
  ] = await Promise.all([
    supabase
      .from('orders')
      .select('*', { count: 'exact', head: true }),
    supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true }),
    supabase
      .from('products')
      .select('*', { count: 'exact', head: true }),
    supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold text-foreground mb-8">Admin Dashboard</h1>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-muted-foreground text-sm font-medium mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-foreground">{totalOrders || 0}</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-muted-foreground text-sm font-medium mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-foreground">{totalUsers || 0}</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-muted-foreground text-sm font-medium mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-foreground">{totalProducts || 0}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-4">Recent Orders</h2>
        {recentOrders && recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 px-4 text-foreground font-medium">Order ID</th>
                  <th className="py-2 px-4 text-foreground font-medium">Status</th>
                  <th className="py-2 px-4 text-foreground font-medium">Amount</th>
                  <th className="py-2 px-4 text-foreground font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order: any) => (
                  <tr key={order.id} className="border-b border-border">
                    <td className="py-2 px-4 text-foreground font-mono text-sm">
                      {order.id.substring(0, 8)}...
                    </td>
                    <td className="py-2 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                        {order.order_status}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-foreground">₱{order.total_price}</td>
                    <td className="py-2 px-4 text-muted-foreground text-sm">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground">No recent orders</p>
        )}
      </div>
    </div>
  )
}
