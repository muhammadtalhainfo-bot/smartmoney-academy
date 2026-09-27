import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

function getBaseUrl(req) {
  const forwardedProto = req.headers.get('x-forwarded-proto') || 'https';
  const forwardedHost = req.headers.get('x-forwarded-host') || req.headers.get('host');
  if (forwardedHost) {
    return `${forwardedProto.split(',')[0].trim()}://${forwardedHost.split(',')[0].trim()}`;
  }
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

function allowedPriceIds() {
  return [
    process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE,
    process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE,
    process.env.STRIPE_MONTHLY_PRICE_ID,
    process.env.STRIPE_YEARLY_PRICE_ID,
  ].filter(Boolean);
}

async function getAuthenticatedUser() {
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
  if (error) throw error;
  return { supabase, user };
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const priceId = typeof body.priceId === 'string' ? body.priceId.trim() : '';

    if (!process.env.STRIPE_SECRET_KEY) {
      return Response.json({ error: 'Payment is not configured.' }, { status: 500 });
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return Response.json({ error: 'Authentication is not configured.' }, { status: 500 });
    }
    if (!priceId || !allowedPriceIds().includes(priceId)) {
      return Response.json({ error: 'Invalid subscription plan.' }, { status: 400 });
    }

    const { supabase, user } = await getAuthenticatedUser();
    if (!user?.id || !user.email) {
      return Response.json({ error: 'Please sign in before starting Pro.' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro, stripe_customer_id')
      .eq('id', user.id)
      .maybeSingle();

    if (profile?.is_pro === true) {
      return Response.json({ error: 'Your account is already on Pro.' }, { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const baseUrl = getBaseUrl(req);
    const metadata = { user_id: user.id, email: user.email.toLowerCase() };

    const sessionConfig = {
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/dashboard?upgraded=true`,
      cancel_url: `${baseUrl}/pricing?cancelled=true`,
      metadata,
      subscription_data: { metadata },
      allow_promotion_codes: true,
    };

    if (profile?.stripe_customer_id) {
      sessionConfig.customer = profile.stripe_customer_id;
    } else {
      sessionConfig.customer_email = user.email;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);
    return Response.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return Response.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}
