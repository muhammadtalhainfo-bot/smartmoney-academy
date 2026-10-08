import { createHash } from 'node:crypto';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const CACHE_DURATION = 60 * 1000;
const RATE_WINDOW_SECONDS = 60;
const RATE_LIMIT = 30;

function getClientIp(req) {
  const vercelIp = req.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim();
  if (vercelIp) return vercelIp;
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || req.headers.get('x-real-ip')?.trim() || 'unknown';
}

function hashClientIp(ip) {
  const pepper = process.env.RATE_LIMIT_SECRET || process.env.SUPABASE_SERVICE_KEY || 'ictflow-rate-limit';
  return createHash('sha256').update(pepper + ':ticker:' + ip).digest('hex');
}

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('Supabase server configuration is missing.');
  return createSupabaseAdmin(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function enforceRateLimit(req) {
  const admin = adminClient();
  const { data: allowed, error } = await admin.rpc('consume_api_rate_limit', {
    p_scope: 'ticker',
    p_key_hash: hashClientIp(getClientIp(req)),
    p_window_seconds: RATE_WINDOW_SECONDS,
    p_max_requests: RATE_LIMIT,
  });
  if (error) {
    console.error('Ticker rate-limit error:', error);
    throw new Error('Ticker rate-limit service unavailable.');
  }
  return allowed === true;
}
let cachedData = null;
let lastFetchTime = 0;

const SYMBOLS = [
  { pair: 'EURUSD', symbol: 'OANDA:EUR_USD' },
  { pair: 'XAUUSD', symbol: 'OANDA:XAU_USD' },
  { pair: 'NAS100', symbol: 'NASDAQ:NDX' },
  { pair: 'GBPUSD', symbol: 'OANDA:GBP_USD' },
  { pair: 'BTCUSD', symbol: 'BINANCE:BTCUSDT' },
  { pair: 'US30', symbol: 'FOREXCOM:DJI' },
  { pair: 'USDJPY', symbol: 'OANDA:USD_JPY' },
];


async function fetchTickerData() {
  if (cachedData && Date.now() - lastFetchTime < CACHE_DURATION) return cachedData;
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return [];

  try {
    const results = await Promise.allSettled(
      SYMBOLS.map(async ({ pair, symbol }) => {
        try {
          const res = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${key}`,
            { signal: AbortSignal.timeout(5000) }
          );
          if (!res.ok) return null;
          const data = await res.json();
          const current = Number(data.c);
          const previous = Number(data.pc);
          if (!Number.isFinite(current) || !Number.isFinite(previous) || current <= 0 || previous <= 0) return null;
          const changePct = ((current - previous) / previous) * 100;
          const up = changePct >= 0;
          return { pair, price: current.toLocaleString('en-US', { maximumFractionDigits: 5 }), change: `${up ? '+' : ''}${changePct.toFixed(2)}%`, up };
        } catch { return null; }
      })
    );

    const valid = results.filter(r => r.status === 'fulfilled' && r.value).map(r => r.value);
    if (valid.length > 0) { cachedData = valid; lastFetchTime = Date.now(); return valid; }
    return [];
  } catch { return []; }
}

const HEADERS = {
  'Cache-Control': 'public, max-age=15, s-maxage=60, stale-while-revalidate=30',
};

export async function GET(req) {
  try {
    if (!(await enforceRateLimit(req))) {
      return Response.json({ data: [], error: 'Too many requests. Try again later.' }, { status: 429, headers: { 'Cache-Control': 'private, no-store' } });
    }
    const data = await fetchTickerData();
    return Response.json({ data, timestamp: new Date().toISOString() }, { headers: HEADERS });
  } catch {
    return Response.json({ data: [], timestamp: new Date().toISOString() }, { headers: HEADERS });
  }
}
