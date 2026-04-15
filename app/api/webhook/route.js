import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const Stripe = (await import('stripe')).default;

    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      return Response.json({ error: 'Configuration error' }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const body = await req.text();
    const sig = req.headers.get('stripe-signature');
    if (!sig) return Response.json({ error: 'Missing signature' }, { status: 400 });

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      
      return Response.json({ error: 'Webhook signature failed' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const email = session.customer_email || session.customer_details?.email;
      if (!email) return Response.json({ received: true });

      const { data: { users } } = await supabase.auth.admin.listUsers();
      const user = users?.find(u => u.email?.toLowerCase() === email.toLowerCase());
      if (!user) {  return Response.json({ received: true }); }

      await supabase.from('profiles').upsert({
        id: user.id,
        is_pro: true,
        pro_since: new Date().toISOString(),
        stripe_customer_id: session.customer,
      }, { onConflict: 'id' });

      
    }

    if (event.type === 'customer.subscription.deleted') {
      const customerId = event.data.object.customer;
      const { data: profiles } = await supabase.from('profiles').select('id').eq('stripe_customer_id', customerId);
      if (profiles?.length > 0) {
        await supabase.from('profiles').update({ is_pro: false }).eq('id', profiles[0].id);
        
      }
    }

    return Response.json({ received: true });
  } catch (err) {
    
    return Response.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
