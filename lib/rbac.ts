import { createClient } from '@/lib/supabase/server'

/**
 * Get the current user's role
 */
export async function getUserRole(userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()

  if (error || !data) {
    return null
  }

  return data.role
}

/**
 * Check if user has specific role
 */
export async function hasRole(userId: string, role: string | string[]) {
  const userRole = await getUserRole(userId)

  if (!userRole) {
    return false
  }

  if (Array.isArray(role)) {
    return role.includes(userRole)
  }

  return userRole === role
}

/**
 * Check if user is admin
 */
export async function isAdmin(userId: string) {
  return hasRole(userId, 'admin')
}

/**
 * Check if user is vendor
 */
export async function isVendor(userId: string) {
  return hasRole(userId, 'vendor')
}

/**
 * Check if user is customer
 */
export async function isCustomer(userId: string) {
  return hasRole(userId, 'customer')
}

/**
 * Get all users with specific role
 */
export async function getUsersByRole(role: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', role)

  if (error) {
    return []
  }

  return data || []
}

/**
 * Update user role (admin only)
 */
export async function updateUserRole(userId: string, newRole: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  return { data, success: true }
}
