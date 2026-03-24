export async function GET() {
  const FINNHUB_KEY = 'd704rgpr01qtb4r9fvmgd704rgpr01qtb4r9fvn0';
  const symbols = [
    { pair: 'EURUSD', symbol: 'OANDA:EUR_USD' },
    { pair: 'XAUUSD', symbol: 'OANDA:XAU_USD' },
    { pair: 'NAS100', symbol: 'NASDAQ:QQQ' },
    { pair: 'GBPUSD', symbol: 'OANDA:GBP_USD' },
    { pair: 'BTCUSD', symbol: 'BINANCE:BTCUSDT' },
    { pair: 'US30', symbol: 'FOREXCOM:DJI' },
    { pair: 'USDJPY', symbol: 'OANDA:USD_JPY' },
  ];

  try {
    const results = await Promise.all(
      symbols.map(async ({ pair, symbol }) => {
        const res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`
        );
        const data = await res.json();
        if (!data.c || data.c === 0) return null;
        const price = data.c;
        const prev = data.pc;
        const changePct = prev ? (((price - prev) / prev) * 100).toFixed(2) : '0.00';
        const up = parseFloat(changePct) >= 0;
        return {
          pair,
          price: price.toLocaleString('en-US', { maximumFractionDigits: 5 }),
          change: `${up ? '+' : ''}${changePct}%`,
          up,
        };
      })
    );
    const valid = results.filter(Boolean);
    return Response.json({ data: valid });
  } catch (e) {
    return Response.json({ data: [] });
  }
}
