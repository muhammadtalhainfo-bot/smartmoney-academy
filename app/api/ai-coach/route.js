import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const ALLOWED_KEYS = [
  'total', 'winRate', 'avgRR', 'expectancy', 'netPnl', 'maxDD',
  'consistencyScore', 'topMistakes', 'bestSession', 'worstSession',
  'bestSetup', 'emotionWinRates', 'recentTrades',
];

function clean(value, max = 2000) {
  return String(value ?? '').slice(0, max);
}

export async function POST(req) {
  try {
    if (!process.env.ANTHROPIC_API_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ error: 'AI Coach is not configured' }, { status: 503 });
    }

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
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await req.json();
    const input = body?.summary;
    if (!input || typeof input !== 'object') {
      return NextResponse.json({ error: 'Invalid journal summary' }, { status: 400 });
    }

    const summary = Object.fromEntries(
      ALLOWED_KEYS.map((key) => [key, clean(input[key])])
    );

    const prompt = `You are an educational trading-journal coach. Analyze the supplied journal statistics and give 4 specific, actionable insights. Do not promise profits, predict markets, or recommend specific trades.

Trading Stats:
- Trades: ${summary.total}, Win Rate: ${summary.winRate}%, Avg R:R: ${summary.avgRR}
- Net P&L: $${summary.netPnl}, Max Drawdown: -$${summary.maxDD}
- Expectancy: ${summary.expectancy}R per trade
- Consistency Score: ${summary.consistencyScore}/100
- Top Mistakes: ${summary.topMistakes || 'None logged'}
- Best Session: ${summary.bestSession}, Worst: ${summary.worstSession}
- Best Setup: ${summary.bestSetup}
- Emotion vs WR: ${summary.emotionWinRates || 'No data'}

Recent Trades:
${summary.recentTrades}

Respond with exactly 4 insights as JSON:
{"insights":[{"type":"strength|weakness|pattern|action","title":"short title","body":"2-3 sentences, specific and data-referenced. No generic advice.","priority":"high|medium|low"}]}
Only JSON. No preamble.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) {
      console.error('Anthropic API error:', response.status);
      return NextResponse.json({ error: 'AI Coach request failed' }, { status: 502 });
    }

    const data = await response.json();
    let text = data.content?.[0]?.text || '';
    text = text.replace(/\`\`\`json|\`\`\`/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: 'AI Coach returned invalid data' }, { status: 502 });
    }

    if (!Array.isArray(parsed?.insights) || parsed.insights.length !== 4) {
      return NextResponse.json({ error: 'AI Coach returned incomplete data' }, { status: 502 });
    }

    return NextResponse.json({ insights: parsed.insights });
  } catch (error) {
    console.error('AI Coach error:', error);
    return NextResponse.json({ error: 'AI Coach unavailable' }, { status: 500 });
  }
}
