import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    'https://abmvklthhjvvehijdqil.supabase.co',
    'sb_publishable_cB_5CHlobWoar0WUKY7GCQ_8gJrPtLo'
  )
}