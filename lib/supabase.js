import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    'https://abmvklthhjvvehijdqil.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFibXZrbHRoaGp2dmVoaWpkcWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3OTE1ODgsImV4cCI6MjA4ODM2NzU4OH0.JjDUbt4-fe19h552l5rruYVN4xeghEdY9-fyCjbUHhk',
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'ictflow-auth',
      }
    }
  )
}
