export const runtime = 'nodejs';

const CACHE_DURATION = 60 * 1000;
let cachedData = null;
let lastFetchTime = 0;

const SYMBOLS = [
  { pair: 'EURUSD', symbol: 'OANDA:EUR_USD' },
  { pair: 'XAUUSD', symbol: 'OANDA:XAU_USD' },
  { pair: 'NAS100', symbol: 'NASDAQ:QQQ' },
  { pair: 'GBPUSD', symbol: 'OANDA:GBP_USD' },
  { pair: 'BTCUSD', symbol: 'BINANCE:BTCUSDT' },
  { pair: 'US30', symbol: 'FOREXCOM:DJI' },
  { pair: 'USDJPY', symbol: 'OANDA:USD_JPY' },
];

const DEFAULT_TICKER = [
  { pair: 'EURUSD', price: '1.08432', change: '+0.12%', up: true },
  { pair: 'XAUUSD', price: '2,341.50', change: '+0.84%', up: true },
  { pair: 'NAS100', price: '18,204.25', change: '-0.23%', up: false },
  { pair: 'GBPUSD', price: '1.26718', change: '+0.07%', up: true },
  { pair: 'BTCUSD', price: '67,842.00', change: '+1.42%', up: true },
  { pair: 'US30', price: '38,910.50', change: '-0.18%', up: false },
  { pair: 'USDJPY', price: '151.824', change: '+0.31%', up: true },
];

async function fetchTickerData() {
  if (cachedData && Date.now() - lastFetchTime < CACHE_DURATION) return cachedData;

  const key = process.env.FINNHUB_API_KEY || 'd704rgpr01qtb4r9fvmgd704rgpr01qtb4r9fvn0';

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
    return DEFAULT_TICKER;
  } catch { return DEFAULT_TICKER; }
}

export async function GET() {
  try {
    const data = await fetchTickerData();
    return Response.json({ data, timestamp: new Date().toISOString() });
  } catch {
    return Response.json({ data: DEFAULT_TICKER, timestamp: new Date().toISOString() });
  }
}
