export const runtime = 'nodejs';

const CACHE_DURATION = 60 * 1000;
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
          if (!data.c || data.c === 0) return null;
          const changePct = (((data.c - data.pc) / data.pc) * 100).toFixed(2);
          const up = parseFloat(changePct) >= 0;
          return { pair, price: data.c.toLocaleString('en-US', { maximumFractionDigits: 5 }), change: `${up ? '+' : ''}${changePct}%`, up };
        } catch { return null; }
      })
    );

    const valid = results.filter(r => r.status === 'fulfilled' && r.value).map(r => r.value);
    if (valid.length > 0) { cachedData = valid; lastFetchTime = Date.now(); return valid; }
    return [];
  } catch { return []; }
}

export async function GET() {
  try {
    const data = await fetchTickerData();
    return Response.json({ data, timestamp: new Date().toISOString() }, {\n      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },\n    });
  } catch {
    return Response.json({ data: [], timestamp: new Date().toISOString() });
  }
}
