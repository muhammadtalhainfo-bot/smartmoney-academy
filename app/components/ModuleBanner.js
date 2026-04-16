'use client';

// ICT Flow — Custom SVG Banner Generator
// Produces a unique designed banner for each module/blog card
// Does NOT use or modify any existing images

const GOLD = '#E8C547';
const GOLD_DIM = '#8A6B28';
const GOLD_FAINT = 'rgba(212,168,67,0.22)';
const BG = '#090909';

// IF Logo mark — compact SVG
function IFLogo({ x = 0, y = 0, size = 28 }) {
  const r = size / 2;
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={size * 0.28} fill="rgba(10,10,10,0.9)" stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.5" />
      <text
        x={x + r}
        y={y + r + size * 0.14}
        textAnchor="middle"
        fontFamily="'Bebas Neue', sans-serif"
        fontSize={size * 0.38}
        fill={GOLD}
        letterSpacing="0.5"
      >IF</text>
    </g>
  );
}

// Shared frame corners
function CornerFrames({ w, h, size = 20, inset = 10, opacity = 0.55 }) {
  const s = `rgba(212,168,67,${opacity})`;
  const sw = 1.5;
  return (
    <>
      <line x1={inset} y1={inset} x2={inset + size} y2={inset} stroke={s} strokeWidth={sw} />
      <line x1={inset} y1={inset} x2={inset} y2={inset + size} stroke={s} strokeWidth={sw} />
      <line x1={w - inset} y1={inset} x2={w - inset - size} y2={inset} stroke={s} strokeWidth={sw} />
      <line x1={w - inset} y1={inset} x2={w - inset} y2={inset + size} stroke={s} strokeWidth={sw} />
      <line x1={inset} y1={h - inset} x2={inset + size} y2={h - inset} stroke={s} strokeWidth={sw} />
      <line x1={inset} y1={h - inset} x2={inset} y2={h - inset - size} stroke={s} strokeWidth={sw} />
      <line x1={w - inset} y1={h - inset} x2={w - inset - size} y2={h - inset} stroke={s} strokeWidth={sw} />
      <line x1={w - inset} y1={h - inset} x2={w - inset} y2={h - inset - size} stroke={s} strokeWidth={sw} />
    </>
  );
}

// Grid overlay
function GridLines({ w, h, spacing = 40, opacity = 0.04 }) {
  const lines = [];
  for (let x = 0; x < w; x += spacing) {
    lines.push(<line key={`v${x}`} x1={x} y1={0} x2={x} y2={h} stroke={GOLD} strokeWidth="0.5" strokeOpacity={opacity} />);
  }
  for (let y = 0; y < h; y += spacing) {
    lines.push(<line key={`h${y}`} x1={0} y1={y} x2={w} y2={y} stroke={GOLD} strokeWidth="0.5" strokeOpacity={opacity} />);
  }
  return <>{lines}</>;
}

// ── BANNER VISUALS per module/slug ──────────────────────────────────────────

const BANNERS = {

  // ── COURSE MODULES ──

  '01': ({ w, h }) => (  // Market Structure — HH/HL trend
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.035} />
      {/* Uptrend HH/HL staircase */}
      <polyline points={`18,${h-28} 55,${h-55} 72,${h-45} 108,${h-82} 125,${h-70} 162,${h-108} 180,${h-94} 218,${h-132} 236,${h-116} ${w-20},${h-152}`}
        fill="none" stroke={GOLD} strokeWidth="1.6" strokeOpacity="0.7" />
      {/* HL dots */}
      {[[55,h-55],[108,h-82],[162,h-108],[218,h-132]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="none" stroke={GOLD} strokeWidth="1.2" strokeOpacity="0.8" />
      ))}
      {/* BOS label */}
      <rect x={130} y={h-100} width={44} height={16} rx="3" fill="rgba(232,197,71,0.95)" stroke={GOLD} strokeWidth="0.7" strokeOpacity="0.4" />
      <text x={152} y={h-88} textAnchor="middle" fontFamily="monospace" fontSize="8" fill={GOLD} fillOpacity="0.7">BOS</text>
      {/* ChoCH */}
      <line x1={62} y1={h-28} x2={62} y2={h-42} stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="3,3" />
      <text x={68} y={h-32} fontFamily="monospace" fontSize="7" fill={GOLD} fillOpacity="0.45">ChoCH</text>
    </>
  ),

  '02': ({ w, h }) => (  // Liquidity — equal highs/lows sweep
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      {/* Equal highs line */}
      <line x1={20} y1={30} x2={w-20} y2={30} stroke={GOLD} strokeWidth="1" strokeOpacity="0.35" strokeDasharray="5,4" />
      <text x={24} y={25} fontFamily="monospace" fontSize="7.5" fill={GOLD} fillOpacity="0.55">EQH — Buy-Side Liquidity</text>
      {/* Equal lows line */}
      <line x1={20} y1={h-30} x2={w-20} y2={h-30} stroke="#818CF8" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="5,4" />
      <text x={24} y={h-18} fontFamily="monospace" fontSize="7.5" fill="#818CF8" fillOpacity="0.55">EQL — Sell-Side Liquidity</text>
      {/* Price wicks touching equal highs */}
      {[40, 95, 155, 210, 265].map((x, i) => {
        const top = 30 + (i % 2 === 0 ? 0 : 3);
        const bot = 60 + (i * 8) % 30;
        return <line key={i} x1={x} y1={top} x2={x} y2={bot} stroke={GOLD} strokeWidth="1.2" strokeOpacity="0.6" />;
      })}
      {/* Sweep arrow */}
      <path d={`M ${w-55} 30 Q ${w-40} 18 ${w-25} 30`} fill="none" stroke={GOLD} strokeWidth="1.5" strokeOpacity="0.9" markerEnd="url(#arr)" />
      <text x={w-80} y={14} fontFamily="monospace" fontSize="7" fill={GOLD} fillOpacity="0.8">SWEEP</text>
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={GOLD} fillOpacity="0.9" />
        </marker>
      </defs>
    </>
  ),

  '03': ({ w, h }) => (  // Fair Value Gaps — 3 candles with gap
    <>
      <GridLines w={w} h={h} spacing={38} opacity={0.03} />
      {/* 3-candle FVG illustration */}
      {/* Candle 1 — bearish */}
      <rect x={60} y={45} width={20} height={50} rx="2" fill="rgba(248,113,113,0.18)" stroke="#F87171" strokeWidth="1" strokeOpacity="0.7" />
      <line x1={70} y1={30} x2={70} y2={45} stroke="#F87171" strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1={70} y1={95} x2={70} y2={110} stroke="#F87171" strokeWidth="1.2" strokeOpacity="0.6" />
      {/* Candle 2 — big bearish */}
      <rect x={110} y={30} width={24} height={80} rx="2" fill="rgba(248,113,113,0.22)" stroke="#F87171" strokeWidth="1.2" strokeOpacity="0.85" />
      <line x1={122} y1={15} x2={122} y2={30} stroke="#F87171" strokeWidth="1.3" strokeOpacity="0.7" />
      <line x1={122} y1={110} x2={122} y2={125} stroke="#F87171" strokeWidth="1.3" strokeOpacity="0.7" />
      {/* Candle 3 — bearish */}
      <rect x={164} y={62} width={20} height={45} rx="2" fill="rgba(248,113,113,0.15)" stroke="#F87171" strokeWidth="1" strokeOpacity="0.6" />
      <line x1={174} y1={48} x2={174} y2={62} stroke="#F87171" strokeWidth="1.2" strokeOpacity="0.55" />
      <line x1={174} y1={107} x2={174} y2={120} stroke="#F87171" strokeWidth="1.2" strokeOpacity="0.55" />
      {/* FVG zone — between candle1 low and candle3 high */}
      <rect x={87} y={95} width={80} height={22} rx="2" fill="rgba(212,168,67,0.22)" stroke={GOLD} strokeWidth="1" strokeOpacity="0.6" strokeDasharray="4,3" />
      <text x={127} y={109} textAnchor="middle" fontFamily="monospace" fontSize="8" fill={GOLD} fillOpacity="0.85">FVG</text>
      {/* CE line */}
      <line x1={87} y1={106} x2={167} y2={106} stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="3,3" />
      <text x={230} y={109} fontFamily="monospace" fontSize="7" fill={GOLD} fillOpacity="0.6">CE</text>
    </>
  ),

  '04': ({ w, h }) => (  // Order Blocks — OB zone + price return
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      {/* OB zone */}
      <rect x={20} y={55} width={70} height={35} rx="3" fill="rgba(232,197,71,0.95)" stroke={GOLD} strokeWidth="1.2" strokeOpacity="0.7" />
      <text x={55} y={70} textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill={GOLD} fillOpacity="0.9">ORDER</text>
      <text x={55} y={82} textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill={GOLD} fillOpacity="0.9">BLOCK</text>
      {/* Price moves up from OB */}
      <polyline points={`90,72 130,60 155,35 185,20 215,28 ${w-20},15`}
        fill="none" stroke="#34D399" strokeWidth="1.6" strokeOpacity="0.75" />
      {/* Price returns to OB and bounces */}
      <path d={`M ${w-20},15 Q ${w-10},72 ${w-30},72 Q ${w-50},72 ${w-60},55`}
        fill="none" stroke={GOLD} strokeWidth="1.4" strokeOpacity="0.65" strokeDasharray="5,3" />
      {/* Bounce arrow */}
      <line x1={w-60} y1={55} x2={w-60} y2={35} stroke="#34D399" strokeWidth="1.5" strokeOpacity="0.8" />
      <path d={`M ${w-66},40 L ${w-60},30 L ${w-54},40`} fill="none" stroke="#34D399" strokeWidth="1.3" strokeOpacity="0.8" />
      <text x={w-90} y={h-20} fontFamily="monospace" fontSize="7" fill="#34D399" fillOpacity="0.6">PRICE RETURNS TO OB</text>
    </>
  ),

  '05': ({ w, h }) => (  // Killzones — session time blocks
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      {/* Session blocks */}
      {[
        { label: 'ASIAN', x: 15, color: 'rgba(129,140,248,0.15)', sc: '#818CF8' },
        { label: 'LONDON', x: 95, color: 'rgba(212,168,67,0.13)', sc: GOLD },
        { label: 'NY', x: 195, color: 'rgba(52,211,153,0.13)', sc: '#34D399' },
      ].map(({ label, x, color, sc }) => (
        <g key={label}>
          <rect x={x} y={25} width={72} height={h - 50} rx="4" fill={color} stroke={sc} strokeWidth="1" strokeOpacity="0.45" />
          <text x={x + 36} y={42} textAnchor="middle" fontFamily="monospace" fontSize="8" fill={sc} fillOpacity="0.85">{label}</text>
          <line x1={x} y1={48} x2={x + 72} y2={48} stroke={sc} strokeWidth="0.6" strokeOpacity="0.3" />
          {/* Small candles inside */}
          {[10, 25, 40, 55].map((dx) => {
            const ch = 15 + Math.sin(dx * 0.4 + x) * 10;
            const cy = 65 + Math.cos(dx * 0.3) * 12;
            const bull = Math.cos(dx + x) > 0;
            return (
              <g key={dx}>
                <rect x={x + dx} y={cy - ch / 2} width={8} height={ch} rx="1"
                  fill={bull ? 'rgba(52,211,153,0.22)' : 'rgba(248,113,113,0.22)'}
                  stroke={bull ? '#34D399' : '#F87171'} strokeWidth="0.8" strokeOpacity="0.6" />
              </g>
            );
          })}
          <text x={x + 36} y={h - 30} textAnchor="middle" fontFamily="monospace" fontSize="7" fill={sc} fillOpacity="0.55">
            {label === 'ASIAN' ? '00:00-06:00' : label === 'LONDON' ? '07:00-10:00' : '13:00-16:00'}
          </text>
        </g>
      ))}
    </>
  ),

  '06': ({ w, h }) => (  // Power of Three — AMD arc
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      {/* AMD arc shape */}
      <path d={`M 20,${h-30} Q 80,${h-80} ${w/2-10},${h-120} Q ${w/2+10},${h-125} ${w/2+30},${h-80} Q ${w-40},${h-40} ${w-20},${h-30}`}
        fill="none" stroke={GOLD} strokeWidth="2" strokeOpacity="0.7" />
      {/* Phase labels */}
      <text x={50} y={h-60} fontFamily="monospace" fontSize="9" fill="#818CF8" fillOpacity="0.85">A</text>
      <text x={w/2-5} y={h-128} fontFamily="monospace" fontSize="9" fill="#F87171" fillOpacity="0.85">M</text>
      <text x={w-55} y={h-55} fontFamily="monospace" fontSize="9" fill="#34D399" fillOpacity="0.85">D</text>
      {/* Judas swing spike */}
      <polyline points={`${w/2-10},${h-120} ${w/2+10},${h-140} ${w/2+30},${h-80}`}
        fill="none" stroke="#F87171" strokeWidth="1.4" strokeOpacity="0.65" />
      <text x={w/2+15} y={h-145} fontFamily="monospace" fontSize="7" fill="#F87171" fillOpacity="0.7">JUDAS</text>
      {/* Baseline */}
      <line x1={20} y1={h-30} x2={w-20} y2={h-30} stroke={GOLD} strokeWidth="0.7" strokeOpacity="0.2" strokeDasharray="4,4" />
    </>
  ),

  '07': ({ w, h }) => (  // Premium & Discount — Fibonacci
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      {/* Fib levels */}
      {[
        { pct: 0,    label: '0%',    color: '#34D399', note: 'HIGH' },
        { pct: 0.38, label: '38.2%', color: GOLD,     note: 'PREMIUM' },
        { pct: 0.5,  label: '50%',   color: GOLD,     note: 'EQ' },
        { pct: 0.62, label: '62%',   color: '#818CF8', note: 'OTE' },
        { pct: 0.79, label: '79%',   color: '#818CF8', note: '' },
        { pct: 1,    label: '100%',  color: '#F87171', note: 'LOW' },
      ].map(({ pct, label, color, note }) => {
        const y = 18 + pct * (h - 36);
        return (
          <g key={label}>
            <line x1={20} y1={y} x2={w - 20} y2={y} stroke={color} strokeWidth={pct === 0.5 ? 1.2 : 0.8} strokeOpacity={pct === 0.5 ? 0.8 : 0.5} />
            <text x={24} y={y - 3} fontFamily="monospace" fontSize="7" fill={color} fillOpacity="0.7">{label} {note}</text>
          </g>
        );
      })}
      {/* OTE zone fill */}
      <rect x={20} y={18 + 0.62 * (h-36)} width={w-40} height={(0.79-0.62)*(h-36)} fill="rgba(129,140,248,0.07)" />
      <text x={w/2} y={18 + 0.71*(h-36)} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#818CF8" fillOpacity="0.8">OTE ZONE</text>
    </>
  ),

  '08': ({ w, h }) => (  // ICT Entry Models — Silver Bullet
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      {/* Silver bullet 10am-11am window */}
      <rect x={85} y={18} width={90} height={h-36} rx="3" fill="rgba(212,168,67,0.06)" stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="4,3" />
      <text x={130} y={32} textAnchor="middle" fontFamily="monospace" fontSize="8" fill={GOLD} fillOpacity="0.75">10:00 - 11:00</text>
      <text x={130} y={44} textAnchor="middle" fontFamily="monospace" fontSize="7" fill={GOLD} fillOpacity="0.5">SILVER BULLET</text>
      {/* Price action inside window */}
      <polyline points={`20,${h*0.5} 50,${h*0.52} 85,${h*0.48} 100,${h*0.38} 115,${h*0.3} 130,${h*0.32} 145,${h*0.28} 175,${h*0.36} ${w-20},${h*0.42}`}
        fill="none" stroke="#34D399" strokeWidth="1.6" strokeOpacity="0.75" />
      {/* FVG entry zone */}
      <rect x={95} y={h*0.34} width={40} height={h*0.1} rx="2" fill="rgba(52,211,153,0.1)" stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.6" />
      <text x={115} y={h*0.4} textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#34D399" fillOpacity="0.75">FVG</text>
    </>
  ),

  '09': ({ w, h }) => (  // Market Maker Models
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      {/* MMBM shape */}
      <path d={`M 18,${h-28} L 55,${h-28} L 55,${h*0.6} Q 80,${h*0.4} 120,${h*0.35} L 155,${h*0.3} Q 180,${h*0.28} 200,${h*0.4} L 220,${h-28} L ${w-18},${h-28}`}
        fill="rgba(52,211,153,0.06)" stroke="#34D399" strokeWidth="1.4" strokeOpacity="0.65" />
      {/* Labels */}
      <text x={35} y={h-38} fontFamily="monospace" fontSize="7" fill="#34D399" fillOpacity="0.6">ACCUM</text>
      <text x={120} y={h*0.25} textAnchor="middle" fontFamily="monospace" fontSize="7" fill={GOLD} fillOpacity="0.75">DISTRIBUTION</text>
      <text x={230} y={h-38} fontFamily="monospace" fontSize="7" fill="#818CF8" fillOpacity="0.6">MARKUP</text>
      {/* False flag spike */}
      <line x1={80} y1={h*0.4} x2={80} y2={h*0.2} stroke="#F87171" strokeWidth="1.2" strokeOpacity="0.7" />
      <text x={84} y={h*0.2} fontFamily="monospace" fontSize="7" fill="#F87171" fillOpacity="0.7">FALSE FLAG</text>
    </>
  ),

  '10': ({ w, h }) => (  // SMT Divergence — two correlated pairs
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      {/* EURUSD makes lower low */}
      <polyline points={`18,60 60,55 100,45 140,55 180,65 ${w-20},75`}
        fill="none" stroke={GOLD} strokeWidth="1.5" strokeOpacity="0.75" />
      {/* GBPUSD makes higher low (SMT) */}
      <polyline points={`18,80 60,75 100,70 140,60 180,52 ${w-20},48`}
        fill="none" stroke="#818CF8" strokeWidth="1.5" strokeOpacity="0.7" />
      {/* Labels */}
      <text x={24} y={56} fontFamily="monospace" fontSize="7.5" fill={GOLD} fillOpacity="0.8">EURUSD</text>
      <text x={24} y={90} fontFamily="monospace" fontSize="7.5" fill="#818CF8" fillOpacity="0.8">GBPUSD</text>
      {/* Divergence zone */}
      <rect x={155} y={42} width={60} height={40} rx="3" fill="rgba(212,168,67,0.22)" stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="3,3" />
      <text x={185} y={h-22} textAnchor="middle" fontFamily="monospace" fontSize="8" fill={GOLD} fillOpacity="0.8">SMT DIV</text>
      {/* Divergence lines */}
      <line x1={155} y1={65} x2={215} y2={75} stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1={155} y1={58} x2={215} y2={50} stroke="#818CF8" strokeWidth="0.8" strokeOpacity="0.4" />
    </>
  ),

  '11': ({ w, h }) => (  // IPDA & CRT — data ranges
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      {/* 20/40/60 day ranges */}
      {[
        { x: 15, width: 50, label: '20D', color: '#34D399' },
        { x: 70, width: 90, label: '40D', color: GOLD },
        { x: 165, width: 100, label: '60D', color: '#818CF8' },
      ].map(({ x, width, label, color }) => (
        <g key={label}>
          <rect x={x} y={30} width={width} height={h - 55} rx="3" fill={`${color}08`} stroke={color} strokeWidth="0.8" strokeOpacity="0.35" />
          <text x={x + width / 2} y={45} textAnchor="middle" fontFamily="monospace" fontSize="8" fill={color} fillOpacity="0.8">{label}</text>
        </g>
      ))}
      {/* Price line weaving through */}
      <polyline points={`18,${h*0.55} 40,${h*0.45} 65,${h*0.5} 90,${h*0.35} 115,${h*0.42} 140,${h*0.3} 165,${h*0.38} 190,${h*0.28} 220,${h*0.35} 250,${h*0.25} ${w-15},${h*0.32}`}
        fill="none" stroke="white" strokeWidth="1.3" strokeOpacity="0.45" />
      <text x={w/2} y={h-16} textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill={GOLD} fillOpacity="0.55">IPDA DATA RANGES</text>
    </>
  ),

  '12': ({ w, h }) => (  // ICT 2024 Mentorship — Venom/new concepts
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      {/* Quarterly shift boxes */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={15 + i * (w-30)/4 + 2} y={25} width={(w-30)/4 - 4} height={h-50} rx="3"
          fill={`rgba(212,168,67,${0.03 + i*0.015})`} stroke={GOLD} strokeWidth="0.6" strokeOpacity={0.2 + i*0.08} />
      ))}
      {['Q1','Q2','Q3','Q4'].map((q,i) => (
        <text key={q} x={15 + (i+0.5)*(w-30)/4} y={40} textAnchor="middle"
          fontFamily="monospace" fontSize="8" fill={GOLD} fillOpacity={0.4 + i*0.12}>{q}</text>
      ))}
      {/* Propulsion block */}
      <rect x={60} y={65} width={50} height={25} rx="2" fill="rgba(52,211,153,0.12)" stroke="#34D399" strokeWidth="1" strokeOpacity="0.65" />
      <text x={85} y={81} textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#34D399" fillOpacity="0.85">PROP BLOCK</text>
      {/* Venom arrow */}
      <path d={`M 140,78 Q 160,55 185,70 Q 205,85 225,65`}
        fill="none" stroke={GOLD} strokeWidth="1.4" strokeOpacity="0.7" />
      <text x={200} y={58} fontFamily="monospace" fontSize="7.5" fill={GOLD} fillOpacity="0.8">VENOM</text>
    </>
  ),

  '13': ({ w, h }) => (  // SMC — CHoCH / supply demand
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      {/* Supply zone */}
      <rect x={20} y={20} width={w-40} height={28} rx="3" fill="rgba(248,113,113,0.1)" stroke="#F87171" strokeWidth="0.9" strokeOpacity="0.55" />
      <text x={w/2} y={32} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#F87171" fillOpacity="0.8">SUPPLY ZONE</text>
      <text x={w/2} y={43} textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#F87171" fillOpacity="0.5">SELL-SIDE INEFFICIENCY</text>
      {/* Demand zone */}
      <rect x={20} y={h-48} width={w-40} height={28} rx="3" fill="rgba(52,211,153,0.1)" stroke="#34D399" strokeWidth="0.9" strokeOpacity="0.55" />
      <text x={w/2} y={h-33} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#34D399" fillOpacity="0.8">DEMAND ZONE</text>
      <text x={w/2} y={h-22} textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#34D399" fillOpacity="0.5">BUY-SIDE INEFFICIENCY</text>
      {/* CHoCH line */}
      <line x1={w/2} y1={48} x2={w/2} y2={h-48} stroke={GOLD} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4,3" />
      <rect x={w/2-20} y={h/2-10} width={40} height={20} rx="3" fill="rgba(232,197,71,0.95)" stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.5" />
      <text x={w/2} y={h/2+4} textAnchor="middle" fontFamily="monospace" fontSize="8" fill={GOLD} fillOpacity="0.85">CHoCH</text>
    </>
  ),

  '28': ({ w, h }) => (  // Top-Down Analysis — MTF pyramid
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      {/* Timeframe pyramid */}
      {[
        { label: 'MONTHLY', w: w-30, y: 18, color: '#818CF8' },
        { label: 'WEEKLY', w: (w-30)*0.78, y: 44, color: GOLD },
        { label: 'DAILY', w: (w-30)*0.58, y: 70, color: '#34D399' },
        { label: '4H', w: (w-30)*0.4, y: 96, color: '#34D399' },
        { label: '1H / 15M', w: (w-30)*0.25, y: 122, color: GOLD },
      ].map(({ label, w: bw, y, color }) => {
        const x = (300 - bw) / 2 + 15;
        return (
          <g key={label}>
            <rect x={x} y={y} width={bw} height={22} rx="3" fill={`${color}08`} stroke={color} strokeWidth="0.8" strokeOpacity="0.45" />
            <text x={150} y={y + 15} textAnchor="middle" fontFamily="monospace" fontSize="8" fill={color} fillOpacity="0.8">{label}</text>
          </g>
        );
      })}
    </>
  ),

  // ── BLOG POSTS ──

  'what-is-ict-trading': ({ w, h }) => (
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      <text x={w/2} y={h*0.35} textAnchor="middle" fontFamily="'Bebas Neue', sans-serif" fontSize="42" fill={GOLD} fillOpacity="0.12" letterSpacing="4">ICT</text>
      <polyline points={`18,${h*0.6} 55,${h*0.5} 95,${h*0.55} 135,${h*0.38} 175,${h*0.42} 215,${h*0.3} ${w-20},${h*0.25}`}
        fill="none" stroke={GOLD} strokeWidth="1.6" strokeOpacity="0.7" />
      <rect x={20} y={h*0.28} width={55} height={18} rx="3" fill="rgba(232,197,71,0.95)" stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.5" />
      <text x={47} y={h*0.28+12} textAnchor="middle" fontFamily="monospace" fontSize="8" fill={GOLD} fillOpacity="0.85">SMART MONEY</text>
    </>
  ),

  'how-to-trade-fair-value-gaps': ({ w, h }) => BANNERS['03']({ w, h }),

  'ict-order-blocks-explained': ({ w, h }) => BANNERS['04']({ w, h }),

  'best-prop-firms-ict-traders': ({ w, h }) => (
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      {/* Trophy / funded chart */}
      <polyline points={`18,${h-28} 50,${h*0.65} 80,${h*0.7} 110,${h*0.5} 140,${h*0.55} 170,${h*0.38} 200,${h*0.42} 230,${h*0.28} ${w-18},${h*0.22}`}
        fill="none" stroke="#34D399" strokeWidth="1.8" strokeOpacity="0.8" />
      <rect x={20} y={18} width={80} height={20} rx="10" fill="rgba(52,211,153,0.12)" stroke="#34D399" strokeWidth="0.9" strokeOpacity="0.6" />
      <text x={60} y={31} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#34D399" fillOpacity="0.9">FUNDED ✓</text>
      <text x={w-20} y={h*0.18} fontFamily="monospace" fontSize="10" fill="#34D399" fillOpacity="0.5" textAnchor="end">$100K</text>
    </>
  ),

  'what-are-killzones-ict': ({ w, h }) => BANNERS['05']({ w, h }),

  'how-to-pass-ftmo-challenge': ({ w, h }) => (
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      {/* Equity curve passing challenge */}
      <line x1={20} y1={h*0.3} x2={w-20} y2={h*0.3} stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="5,4" />
      <text x={24} y={h*0.3-4} fontFamily="monospace" fontSize="7" fill={GOLD} fillOpacity="0.6">PROFIT TARGET</text>
      <line x1={20} y1={h*0.72} x2={w-20} y2={h*0.72} stroke="#F87171" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="5,4" />
      <text x={24} y={h*0.72+12} fontFamily="monospace" fontSize="7" fill="#F87171" fillOpacity="0.6">MAX DRAWDOWN</text>
      <polyline points={`20,${h*0.55} 55,${h*0.52} 90,${h*0.48} 125,${h*0.42} 160,${h*0.38} 195,${h*0.34} 230,${h*0.3} ${w-18},${h*0.28}`}
        fill="none" stroke="#34D399" strokeWidth="1.8" strokeOpacity="0.8" />
    </>
  ),

  'smc-vs-ict-difference': ({ w, h }) => (
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      <line x1={w/2} y1={18} x2={w/2} y2={h-18} stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.25" />
      <text x={w/4} y={36} textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#818CF8" fillOpacity="0.8">SMC</text>
      <text x={3*w/4} y={36} textAnchor="middle" fontFamily="monospace" fontSize="10" fill={GOLD} fillOpacity="0.8">ICT</text>
      <polyline points={`20,${h*0.55} 55,${h*0.48} 90,${h*0.52} 125,${h*0.4} ${w/2-10},${h*0.45}`}
        fill="none" stroke="#818CF8" strokeWidth="1.5" strokeOpacity="0.65" />
      <polyline points={`${w/2+10},${h*0.45} ${w/2+50},${h*0.38} ${w/2+85},${h*0.32} ${w-20},${h*0.25}`}
        fill="none" stroke={GOLD} strokeWidth="1.5" strokeOpacity="0.65" />
    </>
  ),

  'best-timeframes-ict-trading': ({ w, h }) => BANNERS['28']({ w, h }),

  'ict-liquidity-explained': ({ w, h }) => BANNERS['02']({ w, h }),

  'ict-amd-power-of-three': ({ w, h }) => BANNERS['06']({ w, h }),

  'fair-value-gap-ict-explained': ({ w, h }) => BANNERS['03']({ w, h }),

  'ict-killzones-explained': ({ w, h }) => BANNERS['05']({ w, h }),

  'smart-money-concepts-vs-ict': ({ w, h }) => (
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      <line x1={w/2} y1={18} x2={w/2} y2={h-18} stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.25" />
      <text x={w/4} y={36} textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#818CF8" fillOpacity="0.8">SMC</text>
      <text x={3*w/4} y={36} textAnchor="middle" fontFamily="monospace" fontSize="10" fill={GOLD} fillOpacity="0.8">ICT</text>
      <polyline points={`20,${h*0.6} 55,${h*0.5} 100,${h*0.45} ${w/2-15},${h*0.42}`}
        fill="none" stroke="#818CF8" strokeWidth="1.5" strokeOpacity="0.65" />
      <polyline points={`${w/2+15},${h*0.42} ${w/2+55},${h*0.35} ${w/2+90},${h*0.28} ${w-20},${h*0.22}`}
        fill="none" stroke={GOLD} strokeWidth="1.5" strokeOpacity="0.65" />
    </>
  ),

  'how-to-trade-nas100-ict': ({ w, h }) => (
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      <polyline points={`18,${h*0.7} 35,${h*0.65} 55,${h*0.68} 75,${h*0.55} 95,${h*0.5} 115,${h*0.42} 130,${h*0.38} 150,${h*0.3} 170,${h*0.35} 190,${h*0.25} 210,${h*0.28} 230,${h*0.2} ${w-18},${h*0.15}`}
        fill="none" stroke="#34D399" strokeWidth="1.8" strokeOpacity="0.8" />
      <text x={w/2} y={h*0.62} textAnchor="middle" fontFamily="'Bebas Neue', sans-serif" fontSize="36" fill={GOLD} fillOpacity="0.08" letterSpacing="2">NAS100</text>
      <rect x={20} y={18} width={62} height={18} rx="9" fill="rgba(52,211,153,0.1)" stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.5" />
      <text x={51} y={30} textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#34D399" fillOpacity="0.85">NAS100 · ICT</text>
    </>
  ),

  'ict-silver-bullet-strategy': ({ w, h }) => BANNERS['08']({ w, h }),

  'liquidity-in-trading-ict': ({ w, h }) => BANNERS['02']({ w, h }),

  'how-to-pass-ftmo-ict': ({ w, h }) => (
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      <line x1={20} y1={h*0.32} x2={w-20} y2={h*0.32} stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="5,4" />
      <text x={24} y={h*0.32-4} fontFamily="monospace" fontSize="7" fill="#34D399" fillOpacity="0.7">PROFIT TARGET 10%</text>
      <line x1={20} y1={h*0.7} x2={w-20} y2={h*0.7} stroke="#F87171" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="5,4" />
      <text x={24} y={h*0.7+12} fontFamily="monospace" fontSize="7" fill="#F87171" fillOpacity="0.7">MAX DD 5%</text>
      <polyline points={`20,${h*0.55} 60,${h*0.5} 100,${h*0.44} 145,${h*0.38} 185,${h*0.33} 225,${h*0.32} ${w-18},${h*0.3}`}
        fill="none" stroke="#34D399" strokeWidth="1.8" strokeOpacity="0.85" />
      <text x={w-22} y={h*0.28} textAnchor="end" fontFamily="monospace" fontSize="8" fill="#34D399" fillOpacity="0.8">PASS ✓</text>
    </>
  ),

  'ict-2026-mentorship-concepts': ({ w, h }) => BANNERS['12']({ w, h }),

  'ict-premium-discount-explained': ({ w, h }) => BANNERS['07']({ w, h }),
};

// Fallback banner for unknown slugs/ids
function DefaultBanner({ w, h, label }) {
  return (
    <>
      <GridLines w={w} h={h} spacing={36} opacity={0.03} />
      <polyline
        points={`18,${h*0.65} 55,${h*0.55} 95,${h*0.58} 135,${h*0.42} 175,${h*0.48} 215,${h*0.35} ${w-18},${h*0.28}`}
        fill="none" stroke={GOLD} strokeWidth="1.6" strokeOpacity="0.65"
      />
    </>
  );
}

// ── MAIN EXPORT ──────────────────────────────────────────────────────────────

export default function ModuleBanner({
  id,           // module number string e.g. "01" OR blog slug
  title,        // display title
  label,        // e.g. "MODULE 01" or category
  levelColor,   // { text, bg, border }
  width = 300,
  height = 148,
}) {
  const w = width;
  const h = height;
  const key = String(id);
  const Visual = BANNERS[key] || (() => <DefaultBanner w={w} h={h} label={label} />);

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: BG }}
    >
      <defs>
        <radialGradient id={`glow-${key}`} cx="85%" cy="15%" r="55%">
          <stop offset="0%" stopColor="#E8C547" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#E8C547" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`fade-${key}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#090909" stopOpacity="0" />
          <stop offset="100%" stopColor="#090909" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Base background */}
      <rect width={w} height={h} fill={BG} />

      {/* Radial gold glow top-right */}
      <rect width={w} height={h} fill={`url(#glow-${key})`} />

      {/* Concept-specific visual */}
      <Visual w={w} h={h} />

      {/* Bottom fade */}
      <rect width={w} height={h} fill={`url(#fade-${key})`} />

      {/* Corner frames */}
      <CornerFrames w={w} h={h} size={16} inset={8} opacity={0.45} />

      {/* IF Logo — top left */}
      <IFLogo x={12} y={12} size={26} />

      {/* Label pill — top right */}
      {label && (
        <g>
          <rect
            x={w - 8 - label.length * 5.8}
            y={14}
            width={label.length * 5.8 + 2}
            height={16}
            rx={8}
            fill="rgba(8,8,8,0.82)"
            stroke={levelColor?.border || '#E8C547'}
            strokeWidth="0.8"
          />
          <text
            x={w - 7 - (label.length * 5.8) / 2}
            y={25}
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="7.5"
            fill={levelColor?.text || GOLD}
            letterSpacing="0.8"
          >{label}</text>
        </g>
      )}

      {/* Title text — bottom left */}
      <text
        x={14}
        y={h - 14}
        fontFamily="'Bebas Neue', monospace"
        fontSize="15"
        fill="white"
        fillOpacity="0.92"
        letterSpacing="0.8"
      >{title}</text>
    </svg>
  );
}
