import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

export const createClient = () => createSupabaseClient(supabaseUrl, supabaseAnonKey)