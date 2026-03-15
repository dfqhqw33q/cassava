import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Dashboard root page - redirects to role-specific dashboard
 */
export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  // Get user role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    redirect('/auth/login')
  }

  // Redirect to role-specific dashboard
  switch (profile.role) {
    case 'admin':
      redirect('/dashboard/admin')
    case 'vendor':
      redirect('/dashboard/vendor')
    case 'customer':
      redirect('/dashboard/customer')
    default:
      redirect('/auth/login')
  }
}
