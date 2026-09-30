import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'My Dashboard — ICT Flow',
  description: 'Track your ICT learning progress — lessons completed, quiz scores, streak, and your path to the certificate. Your personal ICT Flow dashboard.',
  alternates: { canonical: 'https://ictflow.com/dashboard' },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'My Dashboard | ICT Flow',
    description: 'Track your ICT learning progress, lessons completed and quiz scores.',
    url: 'https://ictflow.com/dashboard',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'ICT Flow Dashboard' }],
  },
};

export default async function Layout({ children }) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {}
        },
      },
    }
  );

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect('/auth?next=/dashboard');

  return children;
}
