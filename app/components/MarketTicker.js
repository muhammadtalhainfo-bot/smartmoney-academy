'use client';

import { useEffect, useState } from 'react';

const POLL_MS = 60_000;

export default function MarketTicker() {
  const [ticker, setTicker] = useState([]);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function fetchPrices() {
      try {
        const res = await fetch('/api/ticker', { cache: 'no-store', signal: controller.signal });
        const json = await res.json();
        if (active && Array.isArray(json.data) && json.data.length > 0) {
          setTicker(json.data);
        }
      } catch {}
    }

    let interval = null;
    const schedule = () => {
      if (document.visibilityState !== 'visible') return;
      if (interval) clearInterval(interval);
      interval = setInterval(fetchPrices, POLL_MS);
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchPrices();
        schedule();
      } else if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    fetchPrices();
    schedule();
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      active = false;
      controller.abort();
      if (interval) clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  if (ticker.length === 0) return null;

  return (
    <section
      role="region"
      aria-label="Live market snapshot"
      style={{ position:'relative', zIndex:10, borderBottom:'1px solid rgba(232,197,71,0.12)', background:'#050505', padding:'10px 0', overflow:'hidden' }}
    >
      <div className="ticker-track" style={{ display:'flex', whiteSpace:'nowrap' }}>
        {[...ticker, ...ticker].map((item, i) => (
          <span key={i} aria-hidden={i >= ticker.length} style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'0 24px', fontFamily:'DM Mono,monospace', fontSize:'11px' }}>
            <span style={{ color:'#E8C547', fontWeight:500 }}>{item.pair}</span>
            <span style={{ color:'rgba(255,255,255,0.85)' }}>{item.price}</span>
            <span style={{ color: item.up ? '#34D399' : '#F87171' }}>{item.up ? '▲' : '▼'} {item.change}</span>
            <span aria-hidden="true" style={{ color:'rgba(255,255,255,0.15)' }}>·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
