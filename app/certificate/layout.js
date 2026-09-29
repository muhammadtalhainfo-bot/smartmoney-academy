export const metadata = {
  title: 'ICT Trading Certificate — ICT Flow',
  description: 'Earn your ICT trading certificate by completing the full ICT Flow curriculum. Proof of your ICT and Smart Money Concepts knowledge — shareable on LinkedIn.',
  alternates: { canonical: 'https://ictflow.com/certificate' },
  openGraph: {
    title: 'ICT Trading Certificate | ICT Flow',
    description: 'Complete the ICT Flow curriculum and earn your certificate. Shareable on LinkedIn.',
    url: 'https://ictflow.com/certificate',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'ICT Flow Trading Certificate' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICT Trading Certificate | ICT Flow',
    description: 'Earn your ICT trading certificate. Shareable on LinkedIn.',
    images: ['https://ictflow.com/og-image.png'],
    creator: '@riskfirsttrad',
  },
};
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect('/auth?next=/certificate');

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_pro')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError || profile?.is_pro !== true) redirect('/pricing');

  return children;
}
