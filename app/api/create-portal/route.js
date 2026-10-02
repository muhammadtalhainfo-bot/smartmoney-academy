import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ error: 'Payment service is not configured.' }, { status: 503 });
    }

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
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, is_pro')
      .eq('id', user.id)
      .maybeSingle();

    if (!profile?.is_pro || !profile?.stripe_customer_id) {
      return NextResponse.json({ error: 'Pro access required.' }, { status: 403 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const configuredOrigin = process.env.NEXT_PUBLIC_APP_URL?.trim()?.replace(/\/$/, '');
    const origin = configuredOrigin || new URL(req.url).origin;
    const portal = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${origin}/dashboard`,
    });

    return NextResponse.json({ url: portal.url }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Stripe portal error:', error);
    return NextResponse.json({ error: 'Unable to open billing portal.' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
}
