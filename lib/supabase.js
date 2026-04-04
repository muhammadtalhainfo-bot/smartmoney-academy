import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://abmvklthhjvvehijdqil.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFibXZrbHRoaGp2dmVoaWpkcWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3OTE1ODgsImV4cCI6MjA4ODM2NzU4OH0.JjDUbt4-fe19h552l5rruYVN4xeghEdY9-fyCjbUHhk',
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'sb-auth-token',
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      }
    }
  )
}
