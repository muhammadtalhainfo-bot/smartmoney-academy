import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';

function privateJson(body, init = {}) {
  return NextResponse.json(body, {
    ...init,
    headers: { ...(init.headers || {}), 'Cache-Control': 'private, no-store' },
  });
}

const RATE_WINDOW_SECONDS = 5 * 60;
const RATE_LIMIT = 30;

function hashUserKey(userId) {
  const pepper = process.env.RATE_LIMIT_SECRET || process.env.SUPABASE_SERVICE_KEY || 'ictflow-rate-limit';
  return createHash('sha256').update(pepper + ':pro-plan:' + userId).digest('hex');
}

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('Supabase server configuration is missing.');
  return createSupabaseAdmin(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

const PLAN =   {
    id: 'plan',
    emoji: '📋',
    title: 'ICT Trading Plan Template',
    subtitle: 'Fill-in-the-blank · 7 Sections · Professional',
    desc: 'A written trading plan can help turn broad intentions into explicit, testable rules. Fill out this template and keep it available during your review process.',
    color: '#D4A843',
    sections: [
      {
        title: 'PART 1: TRADER PROFILE',
        items: [
          { label: 'YOUR INFORMATION', fields: [
            'Trading Experience: Beginner (0-1yr) / Intermediate (1-3yr) / Advanced (3+yr)',
            'Available Capital: $_______________',
            'Risk Tolerance: Conservative (0.5%) / Moderate (1%) / Aggressive (2%)',
            'Trading Style: Scalping / Day Trading / Swing Trading',
            'Available Time: Full-time (6+ hrs) / Part-time (2-4 hrs) / Limited (1-2 hrs)',
          ]},
        ],
      },
      {
        title: 'PART 2: MARKET SELECTION',
        items: [
          { label: 'INSTRUMENTS I TRADE', fields: [
            'Primary: Forex / Indices (NAS100, US30) / Gold / Crypto',
            'Specific pairs: 1. _____________ 2. _____________ 3. _____________',
            'Pairs I NEVER trade: 1. _____________ 2. _____________',
          ]},
        ],
      },
      {
        title: 'PART 3: STRATEGY DEFINITION',
        items: [
          { label: 'ENTRY CRITERIA (ALL must be met)', fields: [
            '1. Daily bias is: _______________',
            '2. Killzone: _______________',
            '3. PD Array type: _______________',
            '4. Premium or Discount: _______________',
            '5. Minimum confluences required: _____',
            '6. Maximum risk per trade: _____%',
          ]},
          { label: 'EXIT CRITERIA', fields: [
            'Stop loss placement rule: _______________',
            'Take profit 1 at R:R: _____',
            'Take profit 2 at R:R: _____',
            'Trailing stop rule: _______________',
          ]},
        ],
      },
      {
        title: 'PART 4: RISK MANAGEMENT RULES',
        items: [
          { label: 'HARD LIMITS', fields: [
            'Risk per trade: _____%',
            'Maximum risk per day: _____%',
            'Maximum risk per week: _____%',
            'Maximum open positions at once: _____',
            'Daily loss limit (stop trading after): _____%',
            'Weekly loss limit: _____%',
            'Monthly loss limit: _____%',
            'Consecutive losses before stopping for day: _____',
          ]},
        ],
      },
      {
        title: 'PART 5: TRADING SCHEDULE',
        items: [
          { label: 'TRADING WINDOWS', fields: [
            'Trading days: Mon / Tue / Wed / Thu / Fri',
            'Pre-market analysis time: _____ to _____',
            'London session: _____ to _____ (local time)',
            'New York session: _____ to _____ (local time)',
            'Maximum trading hours per day: _____ hours',
          ]},
          { label: 'NO-TRADE CONDITIONS', fields: [
            'Before high-impact news (30 min): YES / NO',
            'When daily loss limit is hit: YES / NO',
            'When 3 consecutive losses occur: YES / NO',
            'When emotionally compromised: YES / NO',
          ]},
        ],
      },
      {
        title: 'PART 6: PSYCHOLOGY RULES',
        items: [
          { label: 'PRE-TRADE ROUTINE', fields: [
            '1. _______________',
            '2. _______________',
            '3. _______________',
          ]},
          { label: 'AFTER A LOSS', fields: [
            '1. _______________',
            '2. _______________',
          ]},
          { label: 'ACCOUNTABILITY', fields: [
            'Trading partner or mentor: _______________',
            'Check-in frequency: _______________',
          ]},
        ],
      },
      {
        title: 'PART 7: GOALS & METRICS',
        items: [
          { label: 'MONTHLY PROCESS GOALS', fields: [
            'Win rate target: _____%',
            'Average R:R target: _____',
            'Maximum trades per week: _____',
            'Journal consistency target: _____%',
          ]},
          { label: 'QUARTERLY REVIEW QUESTIONS', fields: [
            'Did I follow my plan? _____%',
            'Biggest improvement this quarter: _______________',
            'Biggest weakness: _______________',
            'Focus for next quarter: _______________',
          ]},
        ],
      },
    ],
  };

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {}
        },
      },
    }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return privateJson({ error: 'Unauthorized' }, { status: 401 });

  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  if (!serviceKey) return privateJson({ error: 'Service temporarily unavailable.' }, { status: 503 });

  const admin = adminClient();
  const { data: allowed, error: rateError } = await admin.rpc('consume_api_rate_limit', {
    p_scope: 'pro-plan',
    p_key_hash: hashUserKey(user.id),
    p_window_seconds: RATE_WINDOW_SECONDS,
    p_max_requests: RATE_LIMIT,
  });
  if (rateError) {
    console.error('Pro plan rate-limit error:', rateError);
    return privateJson({ error: 'Service temporarily unavailable.' }, { status: 503 });
  }
  if (allowed !== true) return privateJson({ error: 'Too many requests. Try again later.' }, { status: 429 });

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_pro')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError || profile?.is_pro !== true) {
    return privateJson({ error: 'Pro access required' }, { status: 403 });
  }

  return privateJson(PLAN, {
    headers: { 'Cache-Control': 'private, no-store' },
  });
}
