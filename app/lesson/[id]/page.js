'use client';
import { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import ProGuard from '@/app/components/ProGuard';
import Link from 'next/link';

// ─── Real chart images from web ──────────────────────────────────
const CONCEPT_IMAGES = {
  'market-structure': '/images/market-structure.png',
  'liquidity': '/images/liquidity.png',
  'fvg': '/images/fvg.png',
  'order-blocks': '/images/order-blocks.png',
  'killzones': '/images/killzones.png',
  'premium-discount': '/images/premium-discount.png',
  'amd': '/images/amd.png',
};

// ─── Full lesson data ─────────────────────────────────────────────
const LESSONS = {
  1: {
    id: 1,
    title: 'Market Structure',
    subtitle: 'The Language of Price — How to Read What the Market Is Actually Saying',
    level: 'Beginner',
    duration: '18 min read',
    category: 'Foundation',
    image: CONCEPT_IMAGES['market-structure'],
    imageCaption: 'BOS vs ChoCH — the two most critical market structure signals in ICT',
    intro: `Before you can trade ICT, you need to understand one thing: price is not random. It moves in a very specific, structured way — and once you learn to read that structure, you will never look at a chart the same way again. Market structure is the foundation of everything in ICT. It tells you the direction price is going, when that direction is changing, and when a new move is starting.`,
    sections: [
      {
        title: 'What Is Market Structure?',
        content: `Market structure is simply the sequence of highs and lows that price creates as it moves. That's it. But the pattern of those highs and lows tells you everything about who is in control — buyers or sellers.

In an uptrend, price creates Higher Highs (HH) and Higher Lows (HL). Each new push up goes higher than the last. Each pullback stops higher than the previous pullback. Buyers are in full control.

In a downtrend, price creates Lower Highs (LH) and Lower Lows (LL). Each rally stops lower than the last. Each drop goes deeper. Sellers are in full control.

This sounds simple — and it is. But 90% of retail traders don't actually use this properly. They try to buy in downtrends and sell in uptrends and wonder why they keep losing.`,
        highlight: '📌 Rule #1: Only take buy setups in bullish structure. Only take sell setups in bearish structure. Never fight the structure.',
      },
      {
        title: 'Break of Structure (BOS)',
        content: `A Break of Structure (BOS) happens when price breaks through the most recent swing high (in an uptrend) or swing low (in a downtrend). It confirms that the current trend is continuing.

Here's how to identify a Bullish BOS: Price is in an uptrend (HH, HL sequence). Price pulls back, creates a new Higher Low. Then price pushes up and breaks above the last Higher High. That break above the previous swing high = BOS. This confirms the uptrend is still active and you should be looking for buys.

Bearish BOS is the opposite: price breaks below the most recent swing low, confirming continuation of the downtrend.

The BOS is not your entry signal — it's your confirmation that the trend is still running. Your entry comes from the pullback that follows.`,
        highlight: '📌 BOS = Trend Continuation. When you see a BOS, the smart money is telling you: the original direction is still valid.',
      },
      {
        title: 'Change of Character (ChoCH / MSS)',
        content: `This is where it gets powerful. A Change of Character (ChoCH) — also called a Market Structure Shift (MSS) — is the signal that the trend is REVERSING.

In a downtrend, price is making LH and LL. Then suddenly, price shoots up and breaks above the most recent Lower High. That break = ChoCH. It means buyers have stepped in aggressively enough to break the bearish structure. The downtrend may be over.

In an uptrend, if price breaks below the most recent Higher Low in one aggressive move — that's a bearish ChoCH. Sellers just took control.

The key difference between BOS and ChoCH is direction:
• BOS breaks in the direction of the current trend = continuation
• ChoCH breaks AGAINST the current trend = potential reversal

This is the concept ICT traders use to "catch the turn" — the moment smart money switches from accumulation to distribution.`,
        highlight: '📌 ChoCH = The first warning sign that trend is reversing. Don\'t jump in immediately — wait for confirmation and a PD Array to enter from.',
      },
      {
        title: 'Internal vs External Structure',
        content: `ICT goes deeper than just "uptrend/downtrend." He breaks structure into two layers:

External Structure (swing highs/lows visible on your current timeframe) — these are the major turning points. They create the overall bias.

Internal Structure (the smaller movements WITHIN the external swings) — these are the Lower Timeframe (LTF) details that give you precise entries.

For example, you might be looking at a 1-hour bullish trend (external structure). Inside that, on the 5-minute chart, you'll see a mini downtrend creating the pullback. When that internal bearish structure shifts to bullish (internal ChoCH on 5min) — THAT is your precise entry trigger.

This concept of nesting structure inside structure is what separates ICT from basic technical analysis.`,
        highlight: '📌 Higher Timeframe = Bias. Lower Timeframe = Entry. Never enter based on HTF signals alone — drill down for precision.',
      },
      {
        title: 'How to Use Market Structure in a Real Trade',
        content: `Here's the complete workflow:

Step 1 — Check the Daily chart. Is it making HH/HL (bullish) or LH/LL (bearish)? This is your macro bias. Only trade in this direction.

Step 2 — Move to the 1-Hour or 4-Hour chart. Confirm the same structure direction. Look for where the last BOS happened to know how deep the pullback could go.

Step 3 — When price pulls back, drop to the 15-minute or 5-minute chart. Watch for a ChoCH in the direction of your HTF bias. This is your LTF confirmation.

Step 4 — After LTF ChoCH, look for a PD Array (FVG, OB, etc.) nearby to enter from. Set your stop below the swing low that caused the ChoCH.

This is a complete top-down analysis framework. Every ICT trade starts here.`,
        highlight: '📌 The trade entry is on the LOWER timeframe, but the bias comes from the HIGHER timeframe. This is non-negotiable in ICT.',
      },
    ],
    quiz: [
      { q: 'In a downtrend, price creates...', options: ['Higher Highs and Higher Lows', 'Lower Highs and Lower Lows', 'Equal Highs and Equal Lows', 'Higher Highs and Lower Lows'], answer: 1 },
      { q: 'A BOS (Break of Structure) signals...', options: ['Trend reversal', 'Trend continuation', 'No trading signal', 'Liquidity sweep only'], answer: 1 },
      { q: 'A ChoCH in a downtrend means...', options: ['Sellers got stronger', 'Buyers broke above a Lower High', 'Price reached premium zone', 'Asian session opened'], answer: 1 },
    ],
    nextLesson: { id: 2, title: 'Liquidity Concepts' },
    prevLesson: null,
  },

  2: {
    id: 2,
    title: 'Liquidity Concepts',
    subtitle: 'Why Price Really Moves — The Stop Hunt Mechanism Explained',
    level: 'Beginner',
    duration: '20 min read',
    category: 'Foundation',
    image: CONCEPT_IMAGES['liquidity'],
    imageCaption: 'Buy-side liquidity (BSL) sits above highs, sell-side liquidity (SSL) sits below lows',
    intro: `Here is a truth that will change how you see every chart: price does not move because of news, fundamentals, or technical indicators. Price moves to collect liquidity. And liquidity is nothing more than the stop-loss orders and pending orders of millions of retail traders. Once you understand this — you stop being the prey and start following the predator.`,
    sections: [
      {
        title: 'What Is Liquidity in ICT?',
        content: `In traditional finance, "liquidity" means how easily an asset can be bought or sold. But in ICT, liquidity has a very specific meaning: it's the pool of stop-loss orders and resting orders that banks need to fill their massive positions.

Think about it this way. A hedge fund wants to buy 10,000 lots of EURUSD. They can't just hit the buy button — there aren't enough sellers at one price level to fill an order that large without moving the market against them. So what do they do? They engineer a move DOWN to where retail traders' stop-losses are sitting. Those stop-losses trigger as market sell orders — and the institution buys every single one of them. That's their fill. Then price reverses and shoots up.

This is the entire game. Every major move starts with a liquidity hunt.`,
        highlight: '📌 Banks don\'t react to price — they engineer price to reach liquidity. Every major reversal is preceded by a stop hunt.',
      },
      {
        title: 'Buy-Side Liquidity (BSL)',
        content: `Buy-Side Liquidity (BSL) sits ABOVE price, at levels where:
• Retail traders have placed stop-losses on their short positions
• Buy-stop orders from breakout traders are waiting
• Equal highs or swing highs that everyone can see on the chart

When price approaches BSL from below, institutions use it to SELL into. They let retail breakout buyers push price up, then sell their massive positions to those buyers. After filling, price reverses down sharply.

You'll recognize BSL as: Equal Highs (EQH) on a chart, previous day/week highs, obvious resistance levels that everyone is watching, and round numbers like 1.1000 or 2000 on Gold.

The pattern is always the same: price approaches the BSL level, spikes above it briefly to trigger the stops, then immediately reverses. ICT calls this the "stop hunt" or "liquidity sweep."`,
        highlight: '📌 Every time you see price spike above an obvious high and immediately reverse — that was a BSL sweep. Institutions just filled their sells.',
      },
      {
        title: 'Sell-Side Liquidity (SSL)',
        content: `Sell-Side Liquidity (SSL) is the mirror image — it sits BELOW price, at levels where:
• Retail longs have their stop-losses
• Sell-stop orders from breakout sellers are resting
• Equal lows, swing lows, support levels

Institutions use SSL to BUY from. They push price down below obvious support (triggering retail stops), fill their massive buy orders from those panicking sellers, then reverse price upward.

You'll identify SSL as: Equal Lows (EQL), previous day/week lows, obvious support levels, and round numbers below current price.

The key insight: when you place your stop-loss below "support," you are literally placing your money exactly where banks need it to be to fill their positions. Your stop-loss is their liquidity.`,
        highlight: '📌 SSL is below obvious lows. BSL is above obvious highs. Institutions hunt both — always ask: where are retail stops before entering?',
      },
      {
        title: 'Equal Highs & Equal Lows (EQH / EQL)',
        content: `Equal Highs (EQH) and Equal Lows (EQL) are among the most powerful liquidity signals on any chart. When price creates two or more highs/lows at almost the same price level, it creates a massive pool of stops — because every retail trader can see it, and most will place their stops just beyond it.

This is actually a trap set by smart money. They WANT price to look like it's double-topping or double-bottoming. Retail sells the double top and buys the double bottom. Their stops cluster just beyond those levels. Then institutions sweep through, collect all that liquidity, and drive price in the opposite direction.

In ICT terminology: EQH = resting BSL above. EQL = resting SSL below. When you see equal highs or lows on your chart, your thought should be: "Price will probably come here to sweep this before the real move."`,
        highlight: '📌 Equal Highs and Equal Lows are not resistance/support — they are LIQUIDITY MAGNETS. Expect a sweep before major moves.',
      },
      {
        title: 'How to Trade Liquidity Sweeps',
        content: `The complete liquidity sweep trade setup:

Step 1 — Identify your HTF bias (bullish or bearish) using market structure.

Step 2 — Mark all visible BSL (above recent highs) and SSL (below recent lows) on your chart.

Step 3 — In a bullish bias, watch for price to sweep below SSL (a fake breakdown). This is the institution filling buys.

Step 4 — After the sweep, wait for a ChoCH or BOS to the upside on the LTF. This confirms the sweep is done and price is reversing.

Step 5 — Enter from a nearby FVG or OB that forms after the sweep/ChoCH.

The most powerful ICT setups always follow the pattern: Liquidity Sweep → Structure Shift → Entry from PD Array. This is the core of the 2022 Model, Silver Bullet, and virtually every other ICT entry model.`,
        highlight: '📌 The setup: SSL Sweep (fake breakdown) → Bullish ChoCH → Buy from FVG/OB. This is the cleanest ICT trade there is.',
      },
    ],
    quiz: [
      { q: 'Buy-side liquidity (BSL) is located...', options: ['Below recent lows', 'Above recent highs', 'At the 50% Fibonacci level', 'During the Asian session'], answer: 1 },
      { q: 'What happens after a liquidity sweep?', options: ['Price continues in the same direction', 'Price reverses sharply', 'Price consolidates for weeks', 'Volume disappears'], answer: 1 },
      { q: 'Equal Highs (EQH) in ICT represent...', options: ['Strong resistance to sell from', 'Resting buy-side liquidity above', 'A bullish continuation pattern', 'Order block validation'], answer: 1 },
    ],
    nextLesson: { id: 3, title: 'Fair Value Gaps (FVG)' },
    prevLesson: { id: 1, title: 'Market Structure' },
  },

  3: {
    id: 3,
    title: 'Fair Value Gaps (FVG)',
    subtitle: 'The Most Traded ICT Concept — Imbalance, Magnet Zones, and How to Use Them',
    level: 'Beginner',
    duration: '16 min read',
    category: 'PD Arrays',
    image: CONCEPT_IMAGES['fvg'],
    imageCaption: 'A bullish FVG: gap between candle 1 high and candle 3 low — price returns to fill it',
    intro: `If you could only learn one ICT concept, the Fair Value Gap (FVG) would be the best choice. It is the most consistently predictive pattern in the entire methodology, it appears on every timeframe, every instrument, and it works because it's based on a fundamental truth about how markets function: price hates imbalance and will always return to fill it.`,
    sections: [
      {
        title: 'What Is a Fair Value Gap?',
        content: `A Fair Value Gap (FVG) is a three-candle price formation where the middle candle moves so aggressively that it leaves a price gap — a zone where no two-sided trading occurred.

Here's how to identify a Bullish FVG:
• Candle 1: any candle
• Candle 2: a large bullish candle (the "displacement" candle)
• Candle 3: the next candle
• The FVG = the gap between the HIGH of Candle 1 and the LOW of Candle 3

If Candle 3's low is ABOVE Candle 1's high — there is a gap where price skipped. That gap is the FVG. Price passed through it so fast that buyers and sellers couldn't meet there. The market is "imbalanced" in that zone.

Bearish FVG is the mirror: Candle 3's HIGH is below Candle 1's LOW after a large bearish displacement candle.`,
        highlight: '📌 The FVG is the gap between Candle 1\'s high and Candle 3\'s low (bullish). Mark it on your chart — price WILL return to this zone.',
      },
      {
        title: 'Why Does Price Return to FVGs?',
        content: `Price returns to FVGs because of the mechanics of how large institutional orders get filled. When a bank places a massive order, it creates a displacement move — price moves so fast that many orders can't get filled at those levels. The algorithm is programmed to return to these inefficiencies to allow full order completion.

Think of it this way: imagine you're at an auction and the bidding jumps from $100 to $150 in one instant. Someone missed their chance to bid at $120. The market comes back to that $110-$130 zone to let them transact. That's the FVG.

For ICT traders, this means FVGs are extremely high-probability support/resistance zones — not because they're "magic levels" but because the algorithm is literally programmed to return to them for order completion. This is why FVGs work far more consistently than traditional support/resistance.`,
        highlight: '📌 FVGs aren\'t just patterns — they represent unfilled institutional orders. The algorithm returns to complete them. This is why they work.',
      },
      {
        title: 'Bullish vs Bearish FVG',
        content: `Bullish FVG (Buy from here in a bullish bias):
• Forms during a bullish displacement (large upward candle)
• Located BELOW current price after the move
• Price comes back down into this zone = retracement
• In a bullish bias, this is a HIGH-PROBABILITY buy zone
• Entry: wait for price to enter the FVG, look for a reaction candle

Bearish FVG (Sell from here in a bearish bias):
• Forms during a bearish displacement (large downward candle)
• Located ABOVE current price after the move
• Price comes back up into this zone = retracement
• In a bearish bias, this is a HIGH-PROBABILITY sell zone

The key rule: ONLY use bullish FVGs for buys when your HTF bias is bullish. ONLY use bearish FVGs for sells in bearish bias. Using an FVG against the HTF bias is one of the most common mistakes ICT beginners make.`,
        highlight: '📌 FVG direction must match your HTF bias. A bullish FVG in a bearish structure is NOT a buy signal — it\'s a trap.',
      },
      {
        title: 'Key FVG Variations to Know',
        content: `ICT has introduced several variations of the FVG concept:

Consequent Encroachment (CE): The 50% midpoint of the FVG. Often the deepest price will fill the FVG before reversing. If price rejects at the CE — that's a valid entry without waiting for a full fill.

Inverse FVG (IFVG): When an FVG gets fully filled and price passes through it — the FVG "inverts" its polarity. A bullish FVG that gets completely filled becomes a bearish resistance zone on re-test.

Balanced Price Range (BPR): When a bullish FVG and bearish FVG overlap on different timeframes, creating an exceptionally strong zone that is twice as powerful as a single FVG.

1st Presented FVG: In any displacement, the FIRST FVG that forms is the most important. ICT specifically targets the first one because it is closest to where the institutional order was placed.

BISI (Buy-side Imbalance, Sell-side Inefficiency): A bullish FVG — price imbalanced to the buy-side.
SIBI (Sell-side Imbalance, Buy-side Inefficiency): A bearish FVG — price imbalanced to the sell-side.`,
        highlight: '📌 Most important variations: CE (50% of FVG), IFVG (inverted after full fill), BPR (overlapping FVGs = double strength).',
      },
      {
        title: 'Trading FVGs — The Complete Process',
        content: `Here is how to trade an FVG from start to finish:

Step 1 — Establish HTF Bias. Check Daily/4H. Is structure bullish or bearish? Only use FVGs that align.

Step 2 — Identify a Liquidity Sweep. Price sweeps SSL (in bullish scenario). This starts the reversal.

Step 3 — Find the FVG. After the sweep, a bullish displacement move forms. Mark the FVG (gap between candle 1 high and candle 3 low).

Step 4 — Wait for Price to Return. Price pulls back into the FVG zone. You're not chasing — you're waiting.

Step 5 — Entry Trigger. Look for a small bullish confirmation candle inside the FVG. Or simply enter at the CE (50%) of the FVG with a limit order.

Step 6 — Stop Loss. Below the low of the FVG (for bullish trades). This invalidates the FVG if hit.

Step 7 — Target. The next liquidity pool above (BSL, previous high, etc.).

Risk:Reward is typically 1:3 or better on FVG trades.`,
        highlight: '📌 The cleanest entry in ICT: SSL Sweep → Bullish Displacement → FVG forms → Price returns to FVG → Enter long at CE.',
      },
    ],
    quiz: [
      { q: 'A Fair Value Gap forms between...', options: ['Two consecutive candle bodies', 'Candle 1\'s high and Candle 3\'s low', 'The open and close of one candle', 'Two daily session opens'], answer: 1 },
      { q: 'CE (Consequent Encroachment) refers to...', options: ['The full fill of the FVG', 'The 50% midpoint of the FVG', 'A second FVG forming inside the first', 'The candle that creates the FVG'], answer: 1 },
      { q: 'An Inverse FVG (IFVG) forms when...', options: ['The FVG is very large', 'The original FVG gets completely filled', 'Two FVGs overlap', 'Price gaps overnight'], answer: 1 },
    ],
    nextLesson: { id: 4, title: 'Order Blocks' },
    prevLesson: { id: 2, title: 'Liquidity Concepts' },
  },

  4: {
    id: 4,
    title: 'Order Blocks',
    subtitle: 'The Institutional Footprint — Where Banks Actually Enter the Market',
    level: 'Intermediate',
    duration: '22 min read',
    category: 'PD Arrays',
    image: CONCEPT_IMAGES['order-blocks'],
    imageCaption: 'Bullish OB: last bearish candle before a strong bullish move — institutions bought here',
    intro: `Order Blocks (OBs) are the most powerful price delivery array in the ICT methodology. While the FVG shows you WHERE price moved fast, the Order Block shows you exactly WHERE the institution placed their original order. It's the footprint left behind by a bank or hedge fund as they accumulated their position — and price always returns to these zones to offer more fill at the same price.`,
    sections: [
      {
        title: 'What Is an Order Block?',
        content: `An Order Block is the last opposing candle before a strong impulse move. It represents the candle where an institution was absorbing all retail orders — quietly filling their position against the crowd — before launching price in their intended direction.

Bullish Order Block:
• The last BEARISH (red) candle before a significant bullish move
• At this candle, institutions were buying while retail was selling
• The OB zone = the body of that last bearish candle (open to close)
• Price will often return to this zone and find strong support

Bearish Order Block:
• The last BULLISH (green) candle before a significant bearish move
• Institutions were selling while retail was buying
• The OB zone = the body of that last bullish candle
• Price returns here as resistance

The "significant move" that validates an OB must include: a BOS or ChoCH on the LTF, at least one FVG in the move, and clear displacement (large bodied candles with momentum).`,
        highlight: '📌 Order Block = the candle where smart money was quietly building their position. Price returns because they left unfilled orders there.',
      },
      {
        title: 'How to Identify a Valid Order Block',
        content: `Not every candle before a move is a valid Order Block. ICT gives specific criteria for validity:

1. The OB must be followed by a displacement move — large bodied candles moving rapidly in one direction, leaving FVGs behind. If the move after the OB was slow and grinding, it's probably not a valid OB.

2. The move must include a BOS or ChoCH — confirming that structure shifted after the OB candle. This shows institutional intent.

3. Mitigation threshold — once price returns to the OB, it should react within the body of the OB candle. Specifically, ICT says a bullish OB is valid if price holds above the 50% level of the OB candle (the midpoint between open and close).

4. Volume context — higher volume on the OB candle and the displacement move adds validity.

5. Higher timeframe alignment — a Daily OB is more powerful than a 5-minute OB. Always note the timeframe of the OB.`,
        highlight: '📌 OB validity checklist: (1) displacement after it ✓ (2) BOS or ChoCH after it ✓ (3) FVG in the displacement ✓ (4) HTF alignment ✓',
      },
      {
        title: 'Order Block Variations',
        content: `ICT has developed several OB variations over the years:

Breaker Block: An Order Block that FAILED. When price returns to an OB and instead of reversing, it blasts through — that OB is now a Breaker Block. In a bullish scenario: a bearish OB that gets violated to the upside becomes a support zone (breaker). The logic: institutions must defend their original position or take a loss, so they buy MORE at that level.

Mitigation Block: When an OB is partially filled — price enters the OB but not fully. ICT considers partially mitigated OBs as still valid for future tests.

Rejection Block: The WICK of a candle before a strong move, rather than the body. When price creates a long wick before launching, that wick zone is a rejection block — slightly different from a standard OB.

Hidden OB: An OB that exists on a higher timeframe but is not visible when looking at a lower timeframe alone. Requires multi-timeframe analysis to identify.

Reclaimed OB (2024): If an OB gets swept through but price quickly returns inside it — the OB is "reclaimed" and is still valid for trading.`,
        highlight: '📌 Breaker Block is the OB that failed. When an OB gets broken through, it inverts polarity and becomes support (if bullish) or resistance (if bearish).',
      },
      {
        title: 'Order Block vs Fair Value Gap — Key Differences',
        content: `Both are high-probability entry zones but they are fundamentally different:

Order Block = WHERE institutions entered (the candle they used to build their position). It's about position accumulation.

Fair Value Gap = WHERE price moved too fast and left an imbalance. It's about price inefficiency.

The most powerful setups in ICT combine both: an OB that also contains an FVG within it. ICT calls this a "confluence" zone. When an Order Block and FVG overlap, you have both institutional interest AND price imbalance at the same level — extremely high probability.

How to determine which to use:
• OBs are better for swing trades and higher timeframe setups
• FVGs are better for intraday precision entries on 5m/15m
• When they overlap = your highest confidence entry
• Always check both before entering any trade`,
        highlight: '📌 OB + FVG at the same zone = highest probability ICT setup. This confluence is what ICT calls a "sweet spot" entry.',
      },
    ],
    quiz: [
      { q: 'A Bullish Order Block is identified as...', options: ['Last bullish candle before a bearish move', 'Last bearish candle before a bullish move', 'First candle of the day', 'A candle with a very long wick'], answer: 1 },
      { q: 'A Breaker Block forms when...', options: ['An OB produces a very strong reaction', 'An OB fails and price blasts through it', 'Two OBs overlap at the same level', 'Price first touches the OB'], answer: 1 },
      { q: 'The most powerful ICT entry zone combines...', options: ['Two FVGs on the same level', 'An OB and an FVG at the same zone', 'Three OBs in sequence', 'BSL and SSL at the same price'], answer: 1 },
    ],
    nextLesson: { id: 5, title: 'Killzones & Macro Times' },
    prevLesson: { id: 3, title: 'Fair Value Gaps' },
  },

  5: {
    id: 5,
    title: 'Killzones & Macro Times',
    subtitle: 'Time Is Your Edge — When Institutions Actually Trade',
    level: 'Intermediate',
    duration: '15 min read',
    category: 'Time & Sessions',
    image: CONCEPT_IMAGES['killzones'],
    imageCaption: 'The four ICT Killzones — Asian, London, New York AM, and London Close',
    intro: `One of the most underrated secrets in trading is this: WHEN you trade matters more than WHAT you trade. The same setup that works at 9:30 AM New York will fail completely at 2:00 PM. ICT's Killzone framework explains exactly why — and gives you a precise schedule for when the algorithm actually delivers price. Trading outside Killzones is gambling. Trading inside them is reading the playbook.`,
    sections: [
      {
        title: 'What Are Killzones?',
        content: `Killzones are specific time windows during the trading day when institutional activity is at its highest — when the Interbank Price Delivery Algorithm (IPDA) is most actively delivering price. During these windows, setups are more reliable, moves are more decisive, and liquidity sweeps followed by strong reversals are most likely to occur.

Outside of Killzones, the market is controlled by retail noise, algorithmic ping-pong, and low-liquidity chop. ICT traders simply don't trade outside these windows — not because of a rule, but because the setups don't carry the same institutional backing.

There are four main Killzones, each serving a specific role in the daily narrative. Understanding which session is doing what is the key to reading the daily AMD (Accumulate-Manipulate-Distribute) cycle.`,
        highlight: '📌 The rule is simple: only execute trades during Killzones. Outside of them, you\'re trading retail noise, not institutional flow.',
      },
      {
        title: 'The Four Killzones',
        content: `Asian Killzone (8:00 PM – 12:00 AM EST):
Role: ACCUMULATION. Price consolidates and builds the Asian Range. This is where smart money quietly accumulates positions. The high and low of the Asian session = critical levels. Price almost always comes back to sweep one of these levels during London or New York. Mark them every single day.

London Killzone (2:00 AM – 5:00 AM EST):
Role: MANIPULATION / JUDAS SWING. This is where the fake move happens. London will often sweep one side of the Asian range first (the Judas Swing) — tricking retail into a trade — before reversing hard in the true direction. This is ICT's "don't trade the first 15 minutes of London" rule. The sweep of Asian high/low during this window = a liquidity grab signal.

New York AM Killzone (7:00 AM – 10:00 AM EST) — or 8:30-11:00 AM:
Role: DISTRIBUTION. The real, sustained directional move. This is where institutional positions that were accumulated in Asia and manipulated in London get DISTRIBUTED. The biggest daily candles form here. The Silver Bullet trade runs entirely within this window (specifically 10:00-11:00 AM EST for the NY AM Silver Bullet).

London Close Killzone (10:00 AM – 12:00 PM EST):
Role: REVERSAL / PROFIT TAKING. As London banks close their books, they take profits on positions opened during the London Killzone. This creates a reliable retracement or reversal of the NY AM move. ICT traders either close positions here or look for a fade trade.`,
        highlight: '📌 London = fake out (Judas). NY AM = real move. This two-step pattern (manipulation then distribution) happens almost every trading day.',
      },
      {
        title: 'ICT Macro Times',
        content: `Beyond Killzones, ICT introduced "Macro Times" — precise 20-minute windows WITHIN sessions where the algorithm delivers price with even higher precision. These are effectively mini-Killzones within the larger ones.

The key Macro Times (all EST):
• London Macro 1: 2:33 AM – 3:00 AM
• London Macro 2: 4:03 AM – 4:30 AM
• New York AM Macro 1: 8:50 AM – 9:10 AM
• New York AM Macro 2: 9:50 AM – 10:10 AM
• New York AM Macro 3: 10:50 AM – 11:10 AM
• Lunch Macro: 11:50 AM – 12:10 PM
• PM Session Macro: 1:10 PM – 1:40 PM
• Last Hour Macro: 3:15 PM – 3:45 PM

During these 20-minute windows, ICT says the algorithm "draws to liquidity" — meaning it makes the decisive move toward the next target. The Silver Bullet strategy is specifically designed around the 10:00-11:00 AM and 2:00-3:00 PM Macro windows.`,
        highlight: '📌 Macro Times are 20-minute windows of extreme precision. Mark 9:50-10:10 AM and 10:50-11:10 AM on your chart every day.',
      },
      {
        title: 'The Asian Range — Your Daily Map',
        content: `One of the most practical applications of the session framework is marking the Asian Range every single day. Here's why it matters:

The Asian session (8 PM – 12 AM EST) creates a price range — a high and a low. This range represents the consolidated accumulation zone where institutions are quietly building positions.

During London and New York, institutions NEED to sweep one or both sides of this range to collect liquidity before the real move. This makes the Asian High and Asian Low among the most reliable liquidity targets of the day.

Daily routine:
1. At midnight EST, mark the Asian Range High and Low
2. During London open (2-5 AM), watch which side gets swept first
3. The sweep direction = Judas Swing (wrong direction)
4. After the sweep, the real move goes the OTHER way
5. That gives you your NY AM directional bias

This simple framework alone — just trading the Asian range sweep + reversal — has made many ICT traders consistently profitable.`,
        highlight: '📌 Mark the Asian Range every day. The London session will sweep one side. That sweep gives you your directional bias for NY AM.',
      },
    ],
    quiz: [
      { q: 'The London Killzone is primarily known for...', options: ['The real directional move', 'The Judas Swing / fake-out', 'Profit taking and reversals', 'Asian range consolidation'], answer: 1 },
      { q: 'The New York AM Killzone serves the role of...', options: ['Accumulation', 'Manipulation', 'Distribution', 'Consolidation'], answer: 2 },
      { q: 'Macro Times are approximately...', options: ['1-hour windows', '20-minute precision windows', 'The entire trading session', '4-hour windows'], answer: 1 },
    ],
    nextLesson: { id: 6, title: 'Power of Three (AMD)' },
    prevLesson: { id: 4, title: 'Order Blocks' },
  },

  6: {
    id: 6,
    title: 'Power of Three (AMD)',
    subtitle: 'The Daily Market Script — How Every Trading Day Is Engineered',
    level: 'Intermediate',
    duration: '17 min read',
    category: 'Market Mechanics',
    image: CONCEPT_IMAGES['amd'],
    imageCaption: 'AMD: price accumulates in Asia, manipulates (Judas) in London, distributes in New York',
    intro: `The Power of Three (PO3) — also known as AMD (Accumulate, Manipulate, Distribute) — is ICT's model for how every single trading day is engineered by institutional participants. Once you understand this three-act script, you will stop being confused by price action and start reading the daily narrative with clarity. Most losing days happen because traders fight this structure instead of flowing with it.`,
    sections: [
      {
        title: 'The Three Acts of Every Trading Day',
        content: `ICT says every trading day follows a three-act structure, each corresponding to a specific session:

ACT 1 — ACCUMULATION (Asian Session, 8 PM – 12 AM EST):
Institutions quietly build positions. Price consolidates in a tight range. Don't trade here — there's no direction, just noise. But DO mark the range because the high and low become critical levels for the next two acts.

ACT 2 — MANIPULATION (London Session, 2 AM – 5 AM EST):
This is the deception phase. Price makes a false move — the "Judas Swing" — in the WRONG direction. If the day is going to be bullish, London will push price DOWN first, sweeping the Asian lows, triggering retail sell orders. Then price reverses. If bearish, London sweeps the Asian highs first. This false move traps retail traders on the wrong side and provides liquidity for institutions to fill their real position.

ACT 3 — DISTRIBUTION (New York AM, 7 AM – 12 PM EST):
The real, sustained move. After the Judas Swing is complete, price moves powerfully in the TRUE direction. This is where 80% of the daily range is created. This is where ICT traders make their money — catching Act 3 after identifying Acts 1 and 2.`,
        highlight: '📌 Never trade the London open blindly. The first move is usually the WRONG direction (Judas). Wait for it to complete, then trade the reversal in NY.',
      },
      {
        title: 'The Judas Swing in Detail',
        content: `The Judas Swing is the most important sub-concept within AMD. It is named after Judas Iscariot — the betrayer — because it tricks retail traders into a false position before the real move begins.

How it works on a bullish day:
• Asian session creates a range (say 1.0800 – 1.0850)
• During London, price drops below 1.0800 (sweeping Asian lows)
• Retail traders see a "breakdown" and short the market
• Their stop-losses are placed above 1.0850
• Price has now swept SSL and collected retail sell orders
• Institutions absorb all those sell orders as their BUYS
• Price reverses and shoots up through 1.0850 during NY AM
• Now retail shorts are stopped out (more fuel for the up move)
• The real bullish daily candle is complete

This exact pattern repeats with remarkable consistency. Learning to identify when the Judas Swing is complete — signaled by a ChoCH on the LTF — is the core skill of reading AMD.`,
        highlight: '📌 The Judas Swing: first move of London is usually wrong. Wait for the fake-out to complete (LTF ChoCH) then enter in the true direction.',
      },
      {
        title: 'Reading the Daily Candle as AMD',
        content: `One of the most profound insights ICT offers is that you can read the STRUCTURE of a single daily candle as an AMD story:

A Bullish Daily Candle:
• Open (midnight open)
• Wick DOWN = the manipulation (Judas Swing sweep of lows)
• Long green body = the distribution phase (real bullish move)
• Small wick UP = sometimes a minor London Close reversal
• Close near the high

A Bearish Daily Candle:
• Open
• Wick UP = manipulation (Judas sweep of highs)
• Long red body = distribution (real bearish move)
• Close near the low

This means that when you see a daily candle with a long lower wick and bullish body — you're looking at a perfect AMD bullish day: liquidity was grabbed below, then price distributed upward. The daily candle is literally a visual representation of the three acts.`,
        highlight: '📌 Long lower wick + bullish body = perfect AMD bullish day. Long upper wick + bearish body = perfect AMD bearish day. Read every daily candle this way.',
      },
      {
        title: 'AMD on Higher Timeframes',
        content: `The Power of Three is fractal — it repeats at every timeframe. This is one of the most mind-expanding concepts in ICT:

Weekly AMD:
• Monday: Accumulation (weekly range starts forming)
• Tuesday/Wednesday: Manipulation (Judas Swing of weekly highs or lows)
• Thursday/Friday: Distribution (real weekly directional move)

Monthly AMD:
• Week 1: Accumulation
• Week 2: Manipulation
• Weeks 3-4: Distribution

This means you can apply the AMD framework to weekly charts to determine which DIRECTION the week will ultimately close in. If you see the weekly sweep a key low on Tuesday — that's your weekly Judas Swing. Expect the week to close bullish.

ICT specifically notes that TUESDAY is the most common day for the weekly Judas Swing. The highest probability weekly move is: sweep lows/highs on Tuesday, reverse and distribute Thursday into Friday.`,
        highlight: '📌 Weekly AMD: Monday = accumulate. Tuesday = Judas Swing (usually). Thursday-Friday = real directional move. This works with remarkable consistency.',
      },
    ],
    quiz: [
      { q: 'In AMD, what does the "M" (Manipulation) phase represent?', options: ['The real directional move', 'The Judas Swing fake-out', 'Institutional accumulation', 'Profit taking at day close'], answer: 1 },
      { q: 'On a bullish AMD day, the lower wick of the daily candle represents...', options: ['Strong support', 'The distribution phase', 'The Judas Swing / liquidity sweep below', 'End of trend'], answer: 2 },
      { q: 'According to ICT, which day of the week is most common for the weekly Judas Swing?', options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], answer: 1 },
    ],
    nextLesson: { id: 7, title: 'Premium & Discount Zones' },
    prevLesson: { id: 5, title: 'Killzones & Macro Times' },
  },
  7: {
    id: 7,
    title: 'Premium & Discount Arrays',
    subtitle: 'The Price Delivery Framework — Where Institutions Buy and Where They Sell',
    level: 'Intermediate',
    duration: '22 min read',
    category: 'Price Theory',
    image: '/images/premium-discount.png',
    imageCaption: 'Premium vs Discount: institutions sell in premium, buy in discount — always relative to a swing range',
    intro: `One of the most powerful yet overlooked concepts in ICT is this: institutions never buy at a random price. They only buy when price is at a discount relative to a defined range — and they only sell when price is at a premium. Once you internalize this single principle, you will stop buying at highs and selling at lows forever. The Premium & Discount framework is ICT's answer to the question every trader asks: "Is this a good price to enter?"`,
    sections: [
      {
        title: 'The Core Principle: Price Is Always Relative',
        content: `Here is the fundamental insight: there is no such thing as an objectively "good" or "bad" price. Price is only good or bad RELATIVE to a range. A price that is cheap in one context is expensive in another.\n\nICT uses the Fibonacci retracement tool not to predict reversal levels — but to define premium and discount zones within any swing range.\n\nHere's how it works:\n• Identify a significant swing low and swing high (or high to low for bearish)\n• Draw a Fibonacci from the swing low to the swing high\n• The 50% level (equilibrium) divides the range in half\n• Everything ABOVE the 50% = Premium Zone (overpriced, only sell here)\n• Everything BELOW the 50% = Discount Zone (underpriced, only buy here)\n\nThis is the most fundamental rule in ICT price delivery:\n• Institutions BUY in discount (below 50%)\n• Institutions SELL in premium (above 50%)\n• Retail traders do the opposite — they buy breakouts (premium) and sell breakdowns (discount)\n\nThis is why retail traders consistently buy the top and sell the bottom. They enter at the worst possible prices while institutions are doing the opposite.`,
        highlight: '📌 Rule: Only buy in discount (below 50% of a swing range). Only sell in premium (above 50%). This single rule eliminates most bad entries immediately.',
      },
      {
        title: 'The Optimal Trade Entry (OTE)',
        content: `The Optimal Trade Entry (OTE) is ICT's specific buy/sell zone within the discount or premium area. It is defined by three Fibonacci levels:\n\nFor a BULLISH OTE (buy zone in discount):\n• 62% retracement — start of the OTE zone\n• 70.5% retracement — the deepest sweet spot\n• 79% retracement — the outer limit of the OTE zone\n\nWhen price pulls back into the 62-79% zone after a bullish BOS, you are in the OTE. This is where ICT traders place their buy limit orders.\n\nWhy these levels? Because this is statistically the zone where institutional algorithms re-enter their positions after a displacement move. The 70.5% level in particular is where the deepest institutional demand consistently appears.\n\nFor a BEARISH OTE (sell zone in premium):\n• 62% retracement of a swing high to low\n• 70.5% level\n• 79% level\n\nThe OTE is not a guarantee — it's a high-probability zone. It must be combined with a liquidity sweep, a Fair Value Gap or Order Block, and alignment with the higher timeframe narrative.`,
        highlight: '📌 The OTE zone is 62%-79% of a Fibonacci retracement. This is where smart money re-enters. This is where YOUR entry should be — not at the breakout.',
      },
      {
        title: 'Premium and Discount Arrays — The Full Spectrum',
        content: `Within the premium and discount framework, ICT identifies specific price delivery arrays — zones that have a higher probability of causing a reaction. From most premium to most discount:\n\nPREMIUM ARRAYS (selling opportunities):\n1. Old Highs / Buy-Side Liquidity (BSL) — most premium\n2. Bearish Order Blocks\n3. Bearish Fair Value Gaps (FVGs)\n4. Equilibrium (50%) — the dividing line\n5. Bullish Fair Value Gaps\n6. Bullish Order Blocks\n7. Old Lows / Sell-Side Liquidity (SSL) — most discount\n\nThis spectrum tells you the hierarchy of where price is likely to find resistance (in premium) and support (in discount). The most powerful reversals come from the extremes — the most premium arrays rejecting price and sending it down, and the most discount arrays sending it back up.\n\nUnderstanding this spectrum allows you to rank your setups. A buy at an old SSL (most discount) with a bullish OB and FVG confluence in the OTE zone — that is the highest quality setup possible. Every element confirms: this is the most undervalued price in the current range.`,
        highlight: '📌 The premium/discount spectrum ranks every zone by its position. The extremes (old highs/lows) provide the highest probability reversals. Always know where you are in the spectrum.',
      },
      {
        title: 'Applying Premium & Discount Across Timeframes',
        content: `The premium/discount framework is fractal — it applies at every timeframe simultaneously. This is where ICT's multi-timeframe analysis becomes powerful.\n\nThe process:\n1. Weekly chart: Identify the major swing high and low. Is price in weekly premium or discount?\n2. Daily chart: Identify the daily swing. Is price in daily premium or discount?\n3. 4H chart: Same analysis\n4. 1H/15M: Find your entry within the OTE\n\nThe highest probability trades occur when ALL timeframes agree:\n• Weekly: Discount (bullish bias)\n• Daily: Discount (bullish bias)\n• 4H: Pullback into discount after BOS\n• 1H/15M: OTE entry with FVG or OB\n\nWhen every timeframe confirms discount, you are buying at the cheapest possible price relative to every meaningful range simultaneously. This is what institutional traders actually do — they wait for price to reach a zone that is discounted on every timeframe before committing size.\n\nThe opposite alignment — price in weekly premium, daily premium, 4H premium — is where you look exclusively for sells.`,
        highlight: '📌 Multi-timeframe discount alignment is the holy grail entry condition. When weekly, daily, and 4H all show discount, your buy entries have maximum institutional backing.',
      },
      {
        title: 'Common Mistakes with Premium & Discount',
        content: `Even traders who understand the concept make critical errors in application:\n\nMistake 1 — Wrong swing selection:\nThe range you draw determines everything. Using the wrong swing high/low gives you the wrong premium/discount zones. Always use the most RECENT and SIGNIFICANT swing — the one that the market is actively respecting.\n\nMistake 2 — Ignoring the higher timeframe:\nTrading discount on a 5-minute chart when the daily chart shows premium is a recipe for disaster. Higher timeframe premium/discount always wins. The lower timeframe is just the entry mechanism.\n\nMistake 3 — Entering at equilibrium:\nThe 50% level is not a buy or sell zone — it's neutral. Many traders try to enter at exactly 50% and get chopped up. The OTE starts at 62% for a reason.\n\nMistake 4 — Abandoning the concept during strong trends:\nIn a very strong uptrend, price sometimes only retraces to the 38.2% or 50% level before continuing. In these cases, the OTE (62-79%) may not be reached. Don't force the framework — if price gives you a clear signal at a shallower retracement with a valid order block, take it.\n\nMistake 5 — No directional bias:\nPremium/discount only works when combined with a directional bias. You must first determine the HTF direction using market structure (bullish or bearish), then identify discount for buys or premium for sells.`,
        highlight: '📌 The framework is only as good as the swing you draw it on. Always use the most significant, most recent swing high and low that the market is actively referencing.',
      },
    ],
    quiz: [
      { q: 'Where do institutions buy according to ICT\'s premium/discount framework?', options: ['In premium (above 50%)', 'At exactly 50% equilibrium', 'In discount (below 50%)', 'At previous highs'], answer: 2 },
      { q: 'What are the three Fibonacci levels that define the OTE zone?', options: ['38.2%, 50%, 61.8%', '62%, 70.5%, 79%', '50%, 61.8%, 78.6%', '23.6%, 38.2%, 50%'], answer: 1 },
      { q: 'What does it mean when weekly, daily, and 4H all show price in discount?', options: ['Price is about to crash', 'Maximum institutional alignment for buys', 'The trend is reversing', 'Time to sell'], answer: 1 },
    ],
  },
  8: {
    id: 8,
    title: 'ICT Entry Models',
    subtitle: 'The Exact Frameworks ICT Uses to Enter Trades With Precision',
    level: 'Intermediate',
    duration: '25 min read',
    category: 'Execution',
    image: '/images/entry-models.png',
    imageCaption: 'ICT entry models combine liquidity sweeps, displacement, and FVG/OB entries for precision execution',
    intro: `Having all the concepts in your head means nothing if you don't know HOW to combine them into a concrete trade entry. ICT entry models are the specific, repeatable frameworks that tell you exactly when to pull the trigger. These are not vague ideas — they are precise sequences of events that, when all conditions are met, produce high-probability trade entries.`,
    sections: [
      {
        title: 'The Foundation: What Makes a Valid ICT Entry',
        content: `Before learning specific entry models, understand the core requirements that every valid ICT entry must have:\n\n1. HIGHER TIMEFRAME BIAS — You must know the HTF direction before any entry. No bias = no trade.\n\n2. LIQUIDITY SWEEP — Price must take out a pool of liquidity before a valid entry. The sweep is the fuel that powers the reversal.\n\n3. DISPLACEMENT — After the sweep, price must show a strong, impulsive move in the opposite direction. A weak, grinding reversal is not displacement.\n\n4. ENTRY ARRAY — The actual entry is placed at a FVG or Order Block within the OTE zone.\n\n5. STOP LOSS — Placed beyond the liquidity sweep.\n\n6. TARGET — The next liquidity pool in the direction of the move.\n\nWhen all five elements are present — that is a valid ICT entry. If even ONE is missing, you do not take the trade.`,
        highlight: '📌 The 5 requirements: HTF bias + liquidity sweep + displacement + entry array (FVG/OB) + clear target. ALL five must be present. Missing even one = skip the trade.',
      },
      {
        title: 'Entry Model 1: The Classic Liquidity Sweep Reversal',
        content: `This is the most fundamental ICT entry model.\n\nTHE SEQUENCE:\nStep 1 — Identify the SSL level (old lows, equal lows)\nStep 2 — Wait for price to push DOWN into that level during a killzone\nStep 3 — Watch for the sweep (price wicks below, triggering stops)\nStep 4 — Look for immediate displacement upward (sharp move, FVGs left behind)\nStep 5 — Price pulls back into the FVG created by the displacement\nStep 6 — Enter long at the FVG (50% of the gap)\nStep 7 — Stop loss: below the sweep wick\nStep 8 — Target: Buy-side liquidity above\n\nThe entire sequence from sweep to entry can happen in 2-10 candles on the 5-minute chart.`,
        highlight: '📌 The classic sequence: HTF bullish → LTF sweeps SSL → displacement up → enter at FVG → target BSL. Master this before anything else.',
      },
      {
        title: 'Entry Model 2: The Order Block Entry',
        content: `The Order Block entry is used when price returns to the last opposing candle before a strong move.\n\nTHE SEQUENCE:\nStep 1 — Identify the OB: the last bearish candle before the bullish displacement\nStep 2 — Mark the OB zone: high and low of that candle\nStep 3 — Wait for price to pull back INTO the OB during a killzone\nStep 4 — Look for LTF BOS or FVG forming within the OB\nStep 5 — Enter at the 50% of the OB candle\nStep 6 — Stop: below the bottom of the OB\nStep 7 — Target: Next liquidity pool\n\nOB REFINEMENT: The most precise OB entry is the first return (mitigation). Once mitigated, the OB loses power. If price sweeps through — exit immediately.`,
        highlight: '📌 OB entries are highest quality on the FIRST return (mitigation). Enter at 50% of the OB candle. Stop below the OB. If price sweeps through — exit.',
      },
      {
        title: 'Entry Model 3: The Silver Bullet',
        content: `The Silver Bullet trades only during specific 60-minute windows:\n• 3:00 AM – 4:00 AM EST (London open)\n• 10:00 AM – 11:00 AM EST (NY AM — most reliable)\n• 2:00 PM – 3:00 PM EST (NY PM — least reliable)\n\nTHE SEQUENCE:\nStep 1 — Wait for the window to open\nStep 2 — HTF must show clear directional bias\nStep 3 — Price sweeps a liquidity level within the window\nStep 4 — A FVG forms on the 1M or 5M after the sweep\nStep 5 — Enter at the 50% of that FVG\nStep 6 — Stop: beyond the sweep\nStep 7 — Target: 2:1 minimum to next liquidity\n\nIf the window closes and no valid setup formed — do NOT trade. Wait for the next window.`,
        highlight: '📌 Silver Bullet windows: 3-4 AM, 10-11 AM, 2-3 PM EST. Sweep → displacement → 1M FVG entry. If no setup in the window — no trade. Time discipline is everything.',
      },
      {
        title: 'Entry Model 4: The Breaker Block',
        content: `A Breaker Block forms when an Order Block FAILS — when price sweeps through an OB, consuming the liquidity there. The former OB flips polarity and becomes a resistance zone.\n\nHOW A BREAKER FORMS:\n• A Bullish OB exists\n• Price sweeps THROUGH the OB (structure breaks)\n• The former OB is now a Bearish Breaker\n• Price pulls back to this zone — it now acts as resistance\n\nTHE SEQUENCE (Bearish Breaker):\nStep 1 — Former Bullish OB swept through\nStep 2 — HTF must be bearish\nStep 3 — Price pulls back UP to the Breaker\nStep 4 — Look for rejection (bearish FVG or LTF ChoCH)\nStep 5 — Enter short at the Breaker\nStep 6 — Stop: above the Breaker zone\nStep 7 — Target: next SSL below\n\nBreakers are powerful because they represent exhausted liquidity zones.`,
        highlight: '📌 When an OB is swept through — it becomes a Breaker Block and flips polarity. Former support becomes resistance. Former resistance becomes support.',
      },
    ],
    quiz: [
      { q: 'What are the 5 required elements of every valid ICT entry?', options: ['Chart pattern, indicator, news, volume, trend', 'HTF bias, liquidity sweep, displacement, entry array, clear target', 'Support, resistance, RSI, MACD, volume', 'Fibonacci, MA, candlestick, trend, time'], answer: 1 },
      { q: 'The Silver Bullet 10:00 AM window closes at?', options: ['10:30 AM', '11:30 AM', '11:00 AM', '12:00 PM'], answer: 2 },
      { q: 'What happens when an Order Block is swept through?', options: ['It becomes stronger', 'It disappears', 'It becomes a Breaker Block', 'Nothing changes'], answer: 2 },
    ],
  },
  9: {
    id: 9,
    title: 'The Silver Bullet Strategy',
    subtitle: 'ICT\'s Most Specific Time-Based Trade — A Complete Deep Dive',
    level: 'Intermediate',
    duration: '20 min read',
    category: 'Strategy',
    image: '/images/killzones.png',
    imageCaption: 'The Silver Bullet operates in three specific one-hour windows when the algorithm delivers its most predictable price action',
    intro: `The Silver Bullet is ICT's most specific, most repeatable, and most teachable trade setup. Unlike other concepts that require significant interpretation, the Silver Bullet has precise rules: specific times, specific sequences, and specific entry and exit criteria. This is the most comprehensive breakdown of the Silver Bullet available anywhere.`,
    sections: [
      {
        title: 'Why the Silver Bullet Works',
        content: `At 10:00 AM EST, the options market opens for serious activity. This is the moment when algorithmic systems recalibrate price delivery based on the 9:30-10:00 AM opening range.\n\nThe algorithm at 10:00 AM:\n1. Completes unfinished business from the opening range\n2. Delivers price to a key liquidity level\n3. Creates conditions for the rest of the day\n\nDuring this 60-minute window, the algorithm MOST LIKELY:\n• Sweeps a key liquidity level (BSL or SSL)\n• Creates a FVG on the 1M chart during displacement\n• Allows price to fill that FVG then continue in the true direction\n\nThe 3:00 AM window aligns with the London open — the most liquid hour in forex. The algorithm front-runs the London cash open with a sweep and reversal.\n\nThe 2:00 PM window is weakest — London close and NYSE early afternoon. ICT rarely trades this window.`,
        highlight: '📌 The 10-11 AM EST Silver Bullet is MOST reliable — it aligns with NYSE options open and algorithmic recalibration. This is your primary window.',
      },
      {
        title: 'The Exact Silver Bullet Sequence',
        content: `BULLISH SILVER BULLET — 10:00-11:00 AM:\n\nPRE-CONDITIONS before 10:00 AM:\n• Daily chart shows bullish bias (above NWOG)\n• Morning range has clear lows with SSL below\n\n10:00 AM — Switch to 1-minute chart.\n\nStep 1 (SWEEP): Price pushes DOWN through SSL. Pronounced lower wick on 1M.\n\nStep 2 (DISPLACEMENT): Price reverses sharply upward. Fast, impulsive move — not a slow grind.\n\nStep 3 (FVG): The displacement creates a 1M Bullish FVG. High of candle before displacement vs. low of candle after.\n\nStep 4 (ENTRY): Price pulls back into the FVG. Enter at the 50% of the gap.\n\nStep 5 (STOP): Below the sweep wick + buffer.\n\nStep 6 (TARGET): Next BSL above — minimum 2:1 R:R.\n\nIf sweep-displacement-FVG doesn't complete within the window — NO TRADE. Close charts. Next session.`,
        highlight: '📌 Sequence is non-negotiable: SWEEP → DISPLACEMENT → FVG → ENTRY. If it doesn\'t complete within the window — no trade. Never chase after 11:00 AM.',
      },
      {
        title: 'The 1-Minute FVG — Precise Identification',
        content: `The entry for the Silver Bullet is specifically the 1-MINUTE FVG created by displacement.\n\nA valid Bullish 1M FVG:\n• Candle 1: A bearish candle (part of the sweep)\n• Candle 2: A large bullish displacement candle\n• Candle 3: The next candle (begins to pull back)\n• The FVG = CANDLE 1's HIGH to CANDLE 3's LOW\n\nThis gap must be:\n• Clear and visible — empty space on the chart\n• At minimum 5-10 pips wide for forex\n• Created by the displacement candle\n\nENTRY OPTIONS:\nOption A: Market entry when price pulls into the FVG\nOption B: Limit order at the 50% of the FVG\nOption C: Conservative entry at the bottom of the FVG\n\nIf the FVG is filled completely before you enter — skip the trade. A closed FVG is no longer valid.`,
        highlight: '📌 The 1M FVG: gap between candle 1\'s high and candle 3\'s low after displacement. Enter at 50% with a limit. If the gap closes before entry — skip.',
      },
      {
        title: 'Silver Bullet on Different Instruments',
        content: `NAS100 / US30 (most reliable):\n• 10 AM window is strongest — directly aligns with NYSE options\n• Moves are fast and impulsive\n• Use 1M chart exclusively\n• Targets: 20-50 points on NAS100\n\nEURUSD / GBPUSD:\n• 10 AM works but is slightly less reliable\n• 3 AM London window is MORE reliable for forex\n• Use 1M chart, reference 5M for confirmation\n\nXAUUSD (Gold):\n• Highly algorithmic — responds very well to Silver Bullet\n• Sweeps are sharp (10-20 pip spikes)\n• Displacement is dramatic\n• Requires larger stops — 15-20 pips minimum\n\nKEY ADAPTATION: For slower markets, use 5M FVG instead of 1M. For NAS100 — always 1M. Speed matters on fast instruments.`,
        highlight: '📌 Silver Bullet works best on NAS100 at 10 AM and EURUSD at 3 AM. Match the window to the instrument for maximum effectiveness.',
      },
      {
        title: 'The 3 Fatal Silver Bullet Errors',
        content: `Error 1 — Trading outside the window:\n"It looks like a Silver Bullet at 9:45 AM" — NO. The window opens at 10:00 AM exactly. Before that, different regime. Outside = invalid.\n\nError 2 — Entering without a sweep:\nA FVG without a preceding liquidity sweep is just random price noise. The sweep gives the FVG its power. No sweep = no trade.\n\nError 3 — Wrong HTF bias:\nTaking a bullish Silver Bullet on a bearish daily = gambling. If the daily is bearish — look for BEARISH Silver Bullets only. HTF always overrides.\n\nTRADE MANAGEMENT:\n• Never move stop to breakeven before 1R profit\n• At 1R — move stop to breakeven\n• At target — exit fully\n• ONE loss does not invalidate the model\n\nJOURNALING: Every Silver Bullet trade gets a screenshot of: HTF bias, sweep, displacement, FVG, entry/stop/target. Without journaling, improvement is impossible.`,
        highlight: '📌 Three fatal errors: outside the time window, no sweep before entry, wrong HTF bias. Avoid all three and your strike rate will be above 60%.',
      },
    ],
    quiz: [
      { q: 'Most reliable Silver Bullet window for NAS100?', options: ['3:00-4:00 AM EST', '9:30-10:00 AM EST', '10:00-11:00 AM EST', '2:00-3:00 PM EST'], answer: 2 },
      { q: 'Where is the Silver Bullet entry placed?', options: ['At the sweep low', 'At 50% of the 1M FVG after displacement', 'At the previous day high', 'At opening price'], answer: 1 },
      { q: 'Most common Silver Bullet error?', options: ['Wrong broker', 'Trading outside the time window', 'Too large position', 'Trading weekends'], answer: 1 },
    ],
  },
  10: {
    id: 10,
    title: 'Higher Timeframe Analysis',
    subtitle: 'How to Read the Market from the Top Down — The ICT Multi-Timeframe Approach',
    level: 'Advanced',
    duration: '24 min read',
    category: 'Analysis',
    image: '/images/market-structure.png',
    imageCaption: 'HTF analysis starts on monthly/weekly charts and works down to the entry timeframe — never the reverse',
    intro: `The single biggest mistake new ICT traders make is starting their analysis on the 5-minute chart. They see a setup, take it, and wonder why it fails. The reason is almost always the same: they traded against the higher timeframe. ICT's multi-timeframe analysis is not optional — it is the foundation of everything.`,
    sections: [
      {
        title: 'The Top-Down Framework',
        content: `ICT's top-down approach is non-negotiable. Always start at the highest timeframe and work DOWN.\n\nTHE TIMEFRAME HIERARCHY:\n• Monthly — The macro narrative\n• Weekly — Medium-term trend\n• Daily — Short-term bias for the week\n• 4H — Intermediate structure\n• 1H — Session structure\n• 15M — Entry refinement\n• 5M / 1M — Execution\n\nWHY THIS ORDER MATTERS:\nThe monthly creates context for the weekly. The weekly for the daily. The daily for the session. Every lower timeframe is a smaller picture of the higher timeframe.\n\nA bullish 5M setup means NOTHING if the daily is in a strong downtrend. You'd be buying in daily premium — exactly where institutions sell. The setup fails not because ICT doesn't work, but because you ignored context.\n\nTHE RULE: You are NOT allowed to look at the 5M chart until you know the monthly, weekly, and daily bias.`,
        highlight: '📌 Start on monthly, work down to weekly, daily, 4H, 1H, then execute on 5M/1M. NEVER start on the low timeframe. Context comes from above — always.',
      },
      {
        title: 'Monthly and Weekly Analysis',
        content: `MONTHLY ANALYSIS PROCESS:\nStep 1 — What is the most recent major swing high and low?\nStep 2 — Is monthly structure HH/HL (bullish) or LH/LL (bearish)?\nStep 3 — Is price in monthly premium or discount?\nStep 4 — Mark monthly FVGs and OBs — these react for days or weeks\nStep 5 — Identify the PDARRA: which monthly arrays are above and below?\n\nWEEKLY ANALYSIS PROCESS:\nStep 1 — Is weekly structure aligned with monthly?\nStep 2 — What is the weekly premium/discount?\nStep 3 — Where is the weekly FVG or OB that price targets?\nStep 4 — What liquidity pools exist on weekly? (Equal highs/lows from previous weeks)\nStep 5 — Mark the weekly range: previous week's high (PWH) and low (PWL)\n\nThe Previous Week's High (PWH) and Low (PWL) are the most important weekly levels. Price frequently targets both during the following week.`,
        highlight: '📌 Monthly bias overrules everything. Mark monthly FVGs and OBs — most powerful levels on any chart. Previous week\'s high and low are the most critical weekly references.',
      },
      {
        title: 'Daily Analysis — The Session Narrative',
        content: `DAILY ANALYSIS PROCESS:\n\nStep 1 — PREVIOUS DAY LEVELS:\nMark previous day's high (PDH), low (PDL), and close. Most important levels for current day.\n\nStep 2 — NEW YORK MIDNIGHT OPEN (NWOG):\nMidnight New York open (12:00 AM EST) is a critical reference.\n• Price ABOVE NWOG = bullish bias for the day\n• Price BELOW NWOG = bearish bias\nThis single rule has a very high success rate.\n\nStep 3 — OPENING GAP:\nIf today's open gaps above or below yesterday's close — that gap is a magnet. Price almost always fills a daily opening gap.\n\nStep 4 — DAILY FVGs and OBs:\nMark any unfilled FVGs and unmitigated OBs on the daily chart.\n\nStep 5 — DAILY BIAS STATEMENT:\nWrite a one-sentence bias: "Today is BULLISH. Price is above NWOG. Daily structure is HH/HL. I am looking for BUYS only — targeting SSL at [level] with target of [PDH]."\n\nThis single sentence prevents wrong-direction trades all day.`,
        highlight: '📌 The New York Midnight Open (12:00 AM EST) is ICT\'s most important daily reference. Above NWOG = bullish. Below NWOG = bearish. This prevents most directional errors.',
      },
      {
        title: 'The IPDA Lookback Periods',
        content: `The IPDA Lookback tells you exactly how far back the algorithm references when deciding where to deliver price.\n\nTHE THREE LOOKBACK PERIODS:\n• 20 trading days (1 month back)\n• 40 trading days (2 months back)\n• 60 trading days (3 months back)\n\nHOW TO USE IT:\nCount back 20, 40, and 60 trading days on the daily chart. Mark the HIGH and LOW from each period. These are what the algorithm targets.\n\nIf price is near the 20-day low and monthly is bullish — the algorithm may be targeting the 40-day or 60-day high.\n\nPRACTICAL APPLICATION:\nWhen unsure where price is heading, ask: "What is the most significant high or low from 20, 40, or 60 days ago that hasn't been visited?" That level is very likely the next target.\n\nThis explains why price makes moves that seem "too far" to retail traders — the algorithm is simply delivering to its next lookback target.\n\nWhen IPDA lookback levels align with weekly PDH/PDL and monthly FVGs — that is a high-conviction target.`,
        highlight: '📌 The IPDA looks back 20, 40, and 60 trading days for its next delivery targets. Mark these highs and lows on your daily chart — they become your price targets for weeks ahead.',
      },
      {
        title: 'The Complete HTF Analysis Routine',
        content: `SUNDAY EVENING (15-20 minutes):\n1. Monthly chart: Note HTF bias and key levels\n2. Weekly chart: Mark PWH, PWL. Note weekly bias. Mark FVGs/OBs\n3. Identify IPDA 20/40/60 day levels\n4. Write weekly bias statement\n\nDAILY MORNING (10-15 minutes):\n1. Mark PDH, PDL, NWOG\n2. Determine today's bias (above/below NWOG)\n3. Mark any daily FVGs or OBs\n4. Drop to 4H: identify session structure\n5. Write daily bias statement: direction, key levels, target\n\nSESSION START (5 minutes):\n1. 1H chart: Confirm session structure aligns with daily bias\n2. 15M: Identify the specific setup forming\n3. 5M/1M: Wait for entry sequence\n\nPOST-SESSION (5 minutes):\n1. Journal the trade (or no-trade reason)\n2. Screenshot entry and exit\n3. Note what went right and what to improve\n\nTotal: less than 30 minutes per day. Traders who skip this gamble. Traders who follow it trade.`,
        highlight: '📌 The HTF routine: Sunday evening (monthly/weekly), morning (daily/4H), session start (1H/5M), post-session journal. 30 minutes total. Non-negotiable.',
      },
    ],
    quiz: [
      { q: 'Price above NWOG indicates?', options: ['Bearish bias', 'Neutral', 'Bullish bias', 'No significance'], answer: 2 },
      { q: 'The three IPDA lookback periods?', options: ['10, 20, 30 days', '20, 40, 60 days', '30, 60, 90 days', '5, 10, 20 days'], answer: 1 },
      { q: 'Correct order for timeframe analysis?', options: ['5M → 1H → Daily', 'Daily → Weekly → Monthly', 'Monthly → Weekly → Daily → Lower TFs', 'Any order'], answer: 2 },
    ],
  },
  11: {
    id: 11,
    title: 'IPDA & Algorithmic Theory',
    subtitle: 'Understanding the Machine Behind the Market',
    level: 'Advanced',
    duration: '26 min read',
    category: 'Theory',
    image: '/images/fvg.png',
    imageCaption: 'The IPDA delivers price in programmatic, predictable ways — understanding its logic is the key to reading markets like an institution',
    intro: `Most traders treat the market like a chaotic battlefield. ICT's view is fundamentally different: the market is a programmatic delivery system. The Interbank Price Delivery Algorithm (IPDA) follows rules. It has patterns. It is predictable. Understanding this changes everything about how you read price.`,
    sections: [
      {
        title: 'What Is the IPDA?',
        content: `The IPDA is ICT's framework for understanding how price is delivered in financial markets. ICT's thesis: major markets are not driven by random supply and demand, but by a programmatic algorithm operated by major banks and central banks.\n\nTHE CORE THESIS:\nMajor institutions coordinate through algorithms to deliver price to specific levels. These algorithms:\n• Hunt liquidity pools to fill institutional orders\n• Create FVGs as evidence of rapid order execution\n• Deliver price in AMD patterns on every timeframe\n• Reference specific lookback periods (20/40/60 days) for targets\n• Operate during specific time windows (killzones)\n\nWHY THIS MATTERS PRACTICALLY:\nWhether or not you accept the theory — the OBSERVABLE BEHAVIOR is undeniable. Markets DO behave predictably during specific times. Price DOES consistently target old highs and lows. FVGs DO get filled with remarkable consistency. AMD patterns DO repeat.\n\nICT is not asking you to believe a theory. He's asking you to observe patterns in data. Backtest 100 liquidity sweeps on NAS100 and see the reversal rate. The data speaks.`,
        highlight: '📌 You don\'t need to believe every element of IPDA theory. Observe that markets behave in programmable, predictable ways. The patterns are real. The theory explains them.',
      },
      {
        title: 'Price Delivery — How the Algorithm Moves Price',
        content: `THE DELIVERY MECHANISM:\n\nStep 1 — ACCUMULATION:\nThe algorithm identifies a target delivery level. Before moving toward it, it accumulates liquidity at the current price level. This creates Asian session consolidation — the algorithm is "loading up."\n\nStep 2 — MANIPULATION:\nTo maximize fill, the algorithm moves price in the OPPOSITE direction first. This sweeps stops on one side, creating the liquidity pool it needs. Retail traders enter in the wrong direction.\n\nStep 3 — DELIVERY:\nWith orders filled, the algorithm moves price powerfully toward the pre-determined target. Fast, impulsive, leaving FVGs behind.\n\nTHE DELIVERY STYLE:\nPrice is delivered in "legs" with FVGs between them. Each leg creates a FVG. Price returns to fill the FVG (algorithm requires two-sided pricing). After filling, another leg begins.\n\nThis is why you see: impulse → pullback to FVG → impulse → pullback to FVG. The algorithm methodically delivers price leg by leg to its target.`,
        highlight: '📌 The algorithm delivers price in legs, pausing at FVGs for two-sided pricing. Each FVG WILL be revisited. Understanding this makes FVG trading mechanically sound.',
      },
      {
        title: 'The Four Delivery Arrays — PDARRA',
        content: `PDARRA describes the specific price levels the algorithm uses as delivery targets:\n\n1. CONSEQUENT ENCROACHMENT (CE):\nThe 50% midpoint of any FVG. The algorithm ALWAYS targets the CE of every FVG before continuing. Most consistent behavior in any market.\n\n2. IOFED (Institutional Order Flow Entry Drill):\nThe zone where institutions re-enter during retracement — the OTE zone (62-79% Fibonacci). Algorithm returns here to offer institutions another entry.\n\n3. INVERSION FAIR VALUE GAP (IFVG):\nA FVG that has been "inverted" — former bullish FVG now used as resistance, former bearish FVG now used as support. Algorithm always references these inverted zones.\n\n4. BALANCED PRICE RANGE (BPR):\nThe overlap between a bearish FVG above and a bullish FVG below. Algorithm frequently returns here before continuing the primary move.\n\nPRACTICAL APPLICATION:\nWhen CE, OTE zone, OB, and IFVG all appear at the same price level — that is maximum conviction. All four arrays confirming one zone is the closest thing to a guaranteed reaction you will find.`,
        highlight: '📌 Four delivery arrays: CE (FVG midpoint), IOFED (OTE zone), IFVG (inverted FVG), BPR (balanced price range). Multiple arrays at one level = maximum conviction.',
      },
      {
        title: 'Time and Price — The Algorithmic Clock',
        content: `THE MIDNIGHT OPEN CYCLE:\nThe algorithm resets at midnight EST. The midnight price becomes the day's anchor. The algorithm delivers price away from this anchor and often returns to it before close.\n\nTHE QUARTERLY SHIFT:\nEvery quarter (January, April, July, October), the algorithm shifts its macro delivery bias. Mark the first trading day of each quarter — often coincides with significant reversals.\n\nTHE NEW WEEK OPENING GAP (NWOG):\nSunday's open vs. Friday's close. If there is a gap — the algorithm WILL fill it during the week with extremely high probability (ICT claims 85%+). Mark the NWOG every Sunday.\n\nTHE NEW MONTH OPENING GAP (NMOG):\nSame principle monthly. The first trading day creates an anchor. Price frequently returns to test this level before the month's primary move.\n\nFRACTAL TIME:\nJust as price structure is fractal, time structure is fractal. The AMD pattern over a day also plays out over a week (Monday accumulate, Tuesday manipulate, Thursday-Friday distribute) and over a quarter.`,
        highlight: '📌 Time is as important as price. Mark Midnight Open, NWOG, and NMOG every week. These are where the algorithm resets. Gaps ALWAYS get filled. Always.',
      },
      {
        title: 'The Five Algorithmic Patterns',
        content: `PATTERN 1 — THE LIQUIDITY HUNT:\nBefore any significant move, the algorithm sweeps the nearest liquidity pool. Before going up — sweeps lows first. Before going down — sweeps highs first. This occurs on EVERY timeframe.\n\nPATTERN 2 — THE FVG RETURN:\nEvery FVG gets filled. Not always immediately — some take hours, days, weeks. But the algorithm ALWAYS returns to complete two-sided pricing.\n\nPATTERN 3 — THE FALSE BREAKOUT:\nThe algorithm regularly creates false breakouts before reversing. Every "breakout" should be viewed with suspicion until confirmed by significant displacement.\n\nPATTERN 4 — EQUAL HIGHS/LOWS MAGNET:\nWhenever equal highs or lows form — the algorithm is irresistibly drawn to sweep them. Equal highs/lows are like a magnet. Mark them always.\n\nPATTERN 5 — THE ASIAN RANGE BREAK:\nDuring killzones, the algorithm almost always breaks out of the Asian range before the true directional move. The direction of the break is frequently WRONG (Judas). Expect this every day.`,
        highlight: '📌 Five algorithmic patterns: liquidity hunt before every move, FVG return, false breakout (Judas), equal highs/lows magnetism, Asian range break in wrong direction first.',
      },
    ],
    quiz: [
      { q: 'What does IPDA stand for?', options: ['Institutional Price Delivery Analysis', 'Interbank Price Delivery Algorithm', 'International Price Distribution Array', 'Index Price Data Aggregator'], answer: 1 },
      { q: 'What is the Consequent Encroachment (CE)?', options: ['The highest swing point', 'The 50% midpoint of any FVG', 'The day\'s opening price', 'A type of order block'], answer: 1 },
      { q: 'When do New Week Opening Gaps form?', options: ['Monday at market open', 'Sunday open vs Friday close', 'End of each trading day', 'During London session'], answer: 1 },
    ],
  },
  12: {
    id: 12,
    title: 'Risk Management (ICT Style)',
    subtitle: 'How Professionals Protect Capital — The Rules That Keep You in the Game',
    level: 'Advanced',
    duration: '21 min read',
    category: 'Risk Management',
    image: '/images/amd.png',
    imageCaption: 'Risk management is the difference between a successful trader and a blown account — ICT\'s rules are non-negotiable',
    intro: `ICT has said it repeatedly: "Risk management is the only thing that matters." You can have the best entry model in the world, but without proper risk management, you will blow your account. This is not a cliché — it is a mathematical certainty.`,
    sections: [
      {
        title: 'The Math of Survival',
        content: `THE MATH OF DRAWDOWNS:\n• Lose 10% → need 11% to recover\n• Lose 20% → need 25% to recover\n• Lose 30% → need 43% to recover\n• Lose 50% → need 100% to recover\n• Lose 75% → need 300% to recover\n\nRecovery becomes exponentially harder as losses grow. Protecting capital is MORE important than making profits.\n\nTHE MATH OF R:R AND WIN RATE:\n• 2:1 R:R → only need 34% win rate to be profitable\n• 3:1 R:R → only need 25% win rate to be profitable\n• 1:1 R:R → need 51% just to break even\n\nWith ICT's minimum 2:1 R:R, you can be WRONG more often than right and still make money. The math is on your side — but ONLY if you respect R:R rules on every single trade.`,
        highlight: '📌 Losing 50% requires a 100% gain to recover. Capital preservation is the PRIMARY goal. Making money comes second. Protecting money comes first. Always.',
      },
      {
        title: 'Position Sizing Rules',
        content: `THE CORE RULE: Risk no more than 1% of your account on any single trade.\n\n$10,000 account = maximum $100 loss per trade.\n\nFOR BEGINNERS (first 6 months): Risk 0.25% to 0.5% per trade.\n\nCALCULATING POSITION SIZE:\nFormula: Position Size = (Account × Risk%) ÷ (Stop Distance × Pip Value)\n\nExample for EURUSD on $10,000:\n• Risk: 1% = $100\n• Stop: 20 pips\n• Pip value (1 standard lot): $10/pip\n• Position size = $100 ÷ (20 × $10) = 0.5 lots\n\nAlways calculate position size BEFORE entering. Never guess.\n\nWHY 1% MAXIMUM:\n• 10 consecutive losses at 1% = only 10% drawdown\n• 10 consecutive losses at 2% = 20% drawdown\n• 10 consecutive losses at 5% = 50% drawdown (career-ending)\n\nThe 1% rule isn't about timidity. It's about surviving long enough to develop skill.`,
        highlight: '📌 Maximum risk: 1% per trade. Beginners: 0.25-0.5%. Calculate position size BEFORE every entry. Risk is determined by math, not by confidence level.',
      },
      {
        title: 'Stop Loss Placement',
        content: `RULE 1: Stop goes BEYOND the liquidity pool that was swept.\nIf price swept an SSL before your bullish entry — stop goes below that swept low. The sweep is the invalidation level.\n\nRULE 2: Give sufficient breathing room.\n• Forex: 2-5 pip buffer\n• NAS100: 5-10 point buffer\n\nRULE 3: Stop placement determines position size — NOT the other way around.\nPlace the stop where it SHOULD be (beyond the sweep), then calculate position size based on that distance and your 1% risk rule.\n\nRULE 4: Never move your stop FURTHER away from entry.\nMoving a stop further = guaranteed larger loss. Accept the planned loss.\n\nRULE 5: Move stop to breakeven ONLY after 1R profit.\nOnce the trade moves 1R in your favor (e.g., 20 pips if stop was 20 pips), move stop to entry. Now you have zero risk with full profit potential.\n\nRED FLAG: If your stop requires risking more than 1% — either reduce position size OR skip the trade entirely.`,
        highlight: '📌 Stop goes beyond the swept liquidity. Give it buffer. Let stop distance determine position size. NEVER move stop further away. Move to breakeven after 1R.',
      },
      {
        title: 'Maximum Daily, Weekly, Monthly Loss Rules',
        content: `MAXIMUM DAILY LOSS: 3%\nLose 3% in a single day — STOP TRADING for the rest of the day. No exceptions. This prevents revenge trading — the most account-destroying behavior in trading.\n\nMAXIMUM WEEKLY LOSS: 5%\nReach 5% drawdown in a week — stop trading for the remainder of the week. Review trades. Come back fresh Monday.\n\nMAXIMUM MONTHLY LOSS: 10%\nReach 10% in a month — stop trading for the rest of the month. This signals a serious problem in strategy or execution.\n\nWHY THESE LIMITS:\nWorst month = only 10% down. A 10% loss is recoverable in 1-2 good months. A 30-50% loss is psychologically and mathematically devastating.\n\nWHAT BREAKS THESE RULES:\n• Overconfidence after winning streak → "just one more trade"\n• Revenge trading after a loss → "I need to make it back"\n• "This setup is perfect, I'll risk 3% just this once"\n\nThese are exactly the moments rules were created for. The moments you most want to make an exception are when you MOST need to follow the rule.`,
        highlight: '📌 Daily: 3% max. Weekly: 5% max. Monthly: 10% max. Hit any limit → stop immediately. These limits exist specifically for the moments you most want to break them.',
      },
      {
        title: 'The Psychological Framework',
        content: `Shift 1 — Every trade outcome is random; your edge is statistical:\nAny single trade can win or lose regardless of how perfect the setup. Your edge manifests over 100+ trades. A single loss proves NOTHING about setup quality.\n\nShift 2 — Loss is the cost of doing business:\nA stopped-out trade is not a failure. It's the cost of being in the market and having opportunity to win. Surgeons have complications. Lawyers lose cases. Trading losses are identical.\n\nShift 3 — The goal is not to be right; the goal is to follow the process:\nGrade yourself on whether you followed your rules. A perfect execution that lost = SUCCESS. A rule-breaking trade that won = FAILURE. The win was luck. Following rules is skill.\n\nShift 4 — Protect tomorrow by managing today:\nBest question after a loss: "Am I still within daily/weekly limits? Can I still trade tomorrow?" Protecting the ability to trade tomorrow is more important than any single trade today.\n\nJournal not just trades — but your emotional state before, during, and after each trade. Patterns will emerge. Self-awareness is the beginning of psychological mastery.`,
        highlight: '📌 Grade yourself on process, not outcomes. A rule-following loss is a success. A rule-breaking win is a failure. Your edge requires 100+ trades to prove itself statistically.',
      },
    ],
    quiz: [
      { q: 'ICT\'s maximum recommended risk per trade?', options: ['5%', '2%', '1%', '10%'], answer: 2 },
      { q: 'When you hit the 3% daily loss limit?', options: ['Take one more trade to recover', 'Increase size on next trade', 'Stop trading for the rest of the day', 'Switch to different market'], answer: 2 },
      { q: 'Where should stop loss be placed in a bullish ICT entry?', options: ['50 pips below entry', 'Below the liquidity sweep', 'At previous day\'s low', 'At 50% Fibonacci'], answer: 1 },
    ],
  },
  13: {
    id: 13,
    title: 'Trade Management',
    subtitle: 'How to Handle a Trade After Entry — The Art of Running Winners',
    level: 'Advanced',
    duration: '19 min read',
    category: 'Execution',
    image: '/images/order-blocks.png',
    imageCaption: 'Trade management after entry determines profitability as much as the entry itself',
    intro: `Getting into a trade is only half the battle. Managing it after entry — the harder half — is what separates profitable traders from break-even ones. Most traders enter well but exit poorly: closing winners too early and letting losers run.`,
    sections: [
      {
        title: 'The Two Enemies of Trade Management',
        content: `ENEMY 1 — PREMATURE EXIT (Fear):\nPrice moves in your direction. Profit appears. Fear of "giving it back" causes you to close at 1R when the target is 3R. You watch price continue to your original target without you.\n\nThe cause: You are trading your P&L instead of the chart. The moment you think "I have $200 profit, I don't want to lose it" — you've shifted from objective analysis to emotional decision-making.\n\nENEMY 2 — HOPE TRADE (Denial):\nPrice moves against you. Instead of accepting the planned loss, you move the stop or refuse to exit. The loss grows from 1% to 3% or 5%.\n\nThe cause: Ego. You don't want to be wrong. The market is always right. You are not.\n\nTHE SOLUTION:\nPredetermined, written rules. Followed without exception. Write your exit plan BEFORE entering. Execute it regardless of emotions in the moment.`,
        highlight: '📌 Two enemies: closing winners early (fear) and holding losers (hope). Rules eliminate both. Write the exit plan BEFORE entry. Execute it regardless of emotions.',
      },
      {
        title: 'Breakeven Rules',
        content: `ICT'S BREAKEVEN RULE:\nMove stop loss to breakeven when price has moved 1R in your favor.\n\nExample:\n• Entry: 1.0800\n• Stop: 1.0780 (20 pips = 1R)\n• Target: 1.0860 (3R = 60 pips)\n• When price reaches 1.0820 (1R profit) → move stop to 1.0802\n\nAfter this:\n• Zero risk on the trade\n• Still full profit potential to target\n• Completely stress-free management\n\nWHEN NOT TO MOVE EARLY:\nMoving to breakeven before 1R is a common mistake. If price is at 0.5R and you move to breakeven — the stop is too tight and gets hit by normal noise. Wait for the full 1R.\n\nPARTIAL vs FULL BREAKEVEN:\nSome traders move 50% to breakeven at 1R, let 50% run. ICT typically recommends full breakeven at 1R for simplicity. Keep it simple, especially as a beginner.`,
        highlight: '📌 Move to breakeven only after 1R profit — not before. At 1R → stop moves to entry. Zero risk + full profit potential. Too early = noise takes you out.',
      },
      {
        title: 'Target Identification',
        content: `Your target MUST be identified BEFORE entry. Never enter without knowing where you exit.\n\nTHE TARGET HIERARCHY:\n\n1. NEXT LIQUIDITY POOL:\nPrimary target always. Sweep SSL → target is nearest BSL above (equal highs, PDH, PWH, swing high).\n\n2. PREVIOUS WEEK HIGH/LOW:\nPWH and PWL are magnetic. Price consistently targets these. If PWH is within reasonable distance — it's your target.\n\n3. DAILY FVG MIDPOINT (CE):\nUnfilled daily FVG above (for longs) — the 50% (CE) is a valid target. Algorithm always fills FVGs.\n\n4. THE 2:1 MINIMUM R:R RULE:\nICT requires minimum 2:1 R:R on every trade. If you can't find a logical target at 2:1 or better — the trade is not worth taking.\n\nWHAT TO DO IF PRICE APPROACHES TARGET EARLY:\nDo NOT move your target higher. Take the originally planned profit. Greed is how winners become losers. After exiting at target, reassess and re-enter if a new setup forms.`,
        highlight: '📌 Target = next liquidity pool (BSL for longs, SSL for shorts). Minimum 2:1 R:R. Identify BEFORE entry. Do not move target higher after entry — greed kills winners.',
      },
      {
        title: 'Scaling Out Strategy',
        content: `Scaling out means taking partial profits at multiple levels rather than one full exit.\n\nTHE 50/50 SPLIT:\n• Exit 50% at 1.5R or 2R\n• Move stop to breakeven on remaining 50%\n• Let remaining 50% run to full 3R or 4R target\n\nTHE 33/33/33 SPLIT (for larger moves):\n• Exit 33% at 1.5R\n• Exit 33% at 2.5R\n• Exit 33% at 4R or higher\n\nWHEN SCALING HELPS:\n• High-volatility markets where price frequently reverses before full target\n• When you're uncertain the full target will be reached\n• During learning phase to build confidence\n\nWHEN SCALING HURTS:\n• Low-volatility markets where price typically reaches full target\n• When the partial exit removes you from a home run trade\n• When the math reduces average R:R significantly\n\nICT'S PERSONAL PREFERENCE:\nICT often recommends beginners focus on FULL exits at a predetermined target. Less decisions = less opportunity for emotion. One entry, one exit is simpler and more executable.`,
        highlight: '📌 Scaling: exit 50% at 1.5-2R, move stop to breakeven, let 50% run. For beginners: avoid scaling until you consistently hit your initial target. Simple beats complex.',
      },
      {
        title: 'Manual Exits — When to Break the Plan',
        content: `Sometimes conditions change significantly during a trade. Manual exits are sometimes justified — but must follow strict criteria.\n\nVALID REASONS FOR MANUAL EXIT:\n\n1. STRUCTURAL BREAK AGAINST POSITION:\nIf you're long and price creates a lower low on your entry timeframe — that invalidates the bullish thesis. Exit.\n\n2. MACRO NEWS EVENT:\nMajor central bank decisions, NFP reports, unexpected geopolitical events. Consider exiting before the event to avoid extreme volatility overwhelming your stop.\n\n3. SETUP CLEARLY EXPIRED:\nIf price has gone sideways 30+ minutes and the killzone has ended — the timing has expired. Consider exiting at a small loss rather than waiting for the stop.\n\nINVALID REASONS FOR MANUAL EXIT:\n1. "I'm up 0.8R and don't want to lose it" — Fear. Follow the plan.\n2. "Price looks like it might reverse" — Speculation. Wait for actual signal.\n3. "I have a feeling this won't work" — Emotion. Irrelevant.\n4. "I need the money" — Personal finance and trading don't mix.\n\nTHE RULE: Manual exits from structural changes = acceptable. Manual exits from emotion = prohibited and systematically destructive.`,
        highlight: '📌 Manual exits acceptable when structure breaks or major news threatens. Unacceptable when driven by fear, impatience, or greed.',
      },
    ],
    quiz: [
      { q: 'When should you move stop to breakeven?', options: ['Immediately after entry', 'At 0.5R profit', 'At 1R profit', 'At the target'], answer: 2 },
      { q: 'ICT\'s minimum required R:R?', options: ['1:1', '1.5:1', '2:1', '3:1'], answer: 2 },
      { q: 'Valid reason for manual exit before stop is hit?', options: ['Up 0.8R and nervous', 'Lower low forming invalidating bullish thesis', 'Need the money', 'Price moving slowly'], answer: 1 },
    ],
  },
  14: {
    id: 14,
    title: 'Building Your ICT Trading Plan',
    subtitle: 'From Student to Trader — Creating the System That Makes You Consistently Profitable',
    level: 'Advanced',
    duration: '23 min read',
    category: 'Strategy',
    image: '/images/amd.png',
    imageCaption: 'A trading plan transforms random trades into a systematic, repeatable process — without it, you are gambling',
    intro: `You now understand all core ICT concepts. Now comes the most important step: putting it all together into a written trading plan you will follow every day. Without a plan, all the knowledge is useless. With a great plan — and the discipline to follow it — consistency becomes possible.`,
    sections: [
      {
        title: 'Why Most Traders Never Build a Plan',
        content: `The uncomfortable truth: most traders never build a written trading plan. They trade on feel, on memory, on "experience." And they consistently lose money.\n\nWhy traders avoid planning:\n1. It requires confronting what they don't know\n2. It creates accountability — they can no longer blame the market\n3. It requires discipline to follow\n4. It feels like "too much work" when they could just start trading\n\nThese are all fear responses.\n\nIT DEFINES YOUR EDGE:\nA plan forces you to articulate exactly what your edge is and why it works. If you cannot write this down clearly — you don't have an edge. You have hope.\n\nIT MAKES YOU REVIEWABLE:\nWith a written plan, you can review every trade against it. Did you follow the rules? If yes and you lost — the edge will assert itself over time. If no — identify and correct the specific rule you broke.\n\nIT ELIMINATES DECISION FATIGUE:\nEvery decision the plan addresses is one fewer decision under pressure with money at stake. The plan makes decisions in advance. You just execute.`,
        highlight: '📌 A written plan creates accountability and eliminates in-the-moment emotional decisions. Without it, you make high-stakes decisions under pressure with no framework. That is gambling.',
      },
      {
        title: 'The 10 Components of a Complete ICT Trading Plan',
        content: `1. MARKETS TRADED:\nWhich instruments? (e.g., NAS100, EURUSD, XAUUSD only)\nSpecialization beats generalization.\n\n2. TIMEFRAMES:\nAnalysis timeframes + entry timeframe\n(e.g., Weekly/Daily for bias, 4H/1H for structure, 5M/1M for entry)\n\n3. SESSION/KILLZONE:\nWhich killzone exclusively?\n(e.g., NY AM session, 9:30-11:00 AM EST only)\n\n4. ENTRY MODEL:\nWhich specific model(s)?\n(e.g., Silver Bullet 10 AM only)\n\n5. ENTRY CRITERIA CHECKLIST:\nAll conditions that must be true before entry:\n□ HTF bias confirmed\n□ Price in discount/premium\n□ Liquidity swept in killzone\n□ Displacement formed\n□ FVG/OB identified\n□ Entry at array level\n\n6. POSITION SIZING:\nExact formula. Maximum 1% risk.\n\n7. STOP LOSS RULE:\nExactly where stop goes\n\n8. TARGET RULE:\nHow you identify targets (minimum 2:1 R:R)\n\n9. DAILY/WEEKLY LOSS LIMITS:\n3% daily, 5% weekly, 10% monthly\n\n10. JOURNALING REQUIREMENT:\nWhat you record after every trade`,
        highlight: '📌 All 10 components must be in your written plan: markets, timeframes, session, entry model, checklist, position sizing, stop rule, target rule, loss limits, journaling.',
      },
      {
        title: 'The Beginner\'s Recommended Plan',
        content: `If you are new to ICT, follow this EXACT plan for the first 6-12 months. Do not deviate:\n\nMARKET: NAS100 — most algorithmic, cleanest price action\nTIMEFRAMES: Daily (bias) → 1H (structure) → 5M/1M (entry)\nSESSION: New York AM ONLY — 9:30-11:00 AM EST\nENTRY MODEL: Silver Bullet (10:00-11:00 AM window only)\n\nENTRY CHECKLIST (all must be true):\n□ Daily bullish (above NWOG) or bearish (below NWOG)\n□ Price in discount (long) or premium (short) on daily\n□ Time is 10:00-11:00 AM EST\n□ Clear SSL or BSL visible on 5M\n□ Sweep of that level occurred\n□ Displacement candle followed\n□ 1M FVG formed\n□ Price pulling back toward FVG\n\nPOSITION SIZE: 0.5% risk per trade\nSTOP: Below sweep wick + 10 point buffer\nTARGET: Next liquidity pool, minimum 2:1 R:R\nDAILY LIMIT: Stop at 1.5% loss\nWEEKLY LIMIT: Stop at 3% loss\n\nFOLLOW THIS PLAN FOR 100 TRADES. Only then evaluate modifications.`,
        highlight: '📌 Beginners: NAS100, Silver Bullet 10-11 AM only, 0.5% risk, 2:1 minimum R:R. Follow this exact plan for 100 trades before making ANY changes. Consistency beats complexity.',
      },
      {
        title: 'Backtesting — Validate Before Risking Money',
        content: `Before trading live, validate your plan through backtesting — reviewing historical data and marking every instance where your entry criteria triggers.\n\nHOW TO BACKTEST AN ICT PLAN:\n\nStep 1 — Choose a tool:\nTradingView's replay function (free) is the best option for manual backtesting.\n\nStep 2 — Set the timeframe:\nGo back 6-12 months on NAS100. Start the replay.\n\nStep 3 — Apply your checklist:\nFor every day, perform top-down analysis. When 10 AM arrives, watch for the Silver Bullet sequence.\n\nStep 4 — Record every trade:\nEntry price, stop, target, outcome, R:R achieved, all criteria present?\n\nStep 5 — After 100 trades, analyze:\n• Win rate: above 40% with 2:1 R:R = profitable\n• Average R on winners\n• Maximum consecutive losses\n• Most common failure modes\n\nStep 6 — Refine and retest:\nTighten criteria that most often appear in losers. Retest 50 more trades.\n\nMINIMUM: 100 backtested trades before any live trading. Non-negotiable.`,
        highlight: '📌 Backtest 100 trades before going live. Use TradingView replay. Record every triggered trade. Analyze win rate, R:R, and failure patterns. Only trade live after 100 backtested trades.',
      },
      {
        title: 'Your 12-Month Roadmap',
        content: `MONTHS 1-2 — BACKTESTING:\n• Backtest 100 Silver Bullet trades on NAS100\n• Journal every trade in a spreadsheet\n• Analyze results and refine entry criteria\n• Goal: understand your plan's statistical edge\n\nMONTHS 3-4 — PAPER TRADING (DEMO):\n• Trade the plan live on demo account\n• Same size, same rules as real money\n• Identify your psychological weak points\n• Goal: 50 consecutive trades following ALL rules\n\nMONTHS 5-6 — MICRO LIVE ACCOUNT:\n• Real money but very small size (0.25% risk)\n• Real money reveals what demo could not\n• Do not increase size until 50 trades completed with all rules\n• Goal: build emotional resilience with real stakes\n\nMONTHS 7-9 — SMALL LIVE ACCOUNT:\n• If profitable on micro → scale to 0.5% risk\n• Strict journaling continues\n• Monthly performance review\n• Goal: consistent monthly profitability\n\nMONTHS 10-12 — STANDARD ACCOUNT:\n• Scale to 1% risk per trade\n• Continue exact same plan that produced results\n• Resist adding new strategies\n• Goal: 3 consecutive profitable months\n\nThe journey is longer than most traders accept. Those who follow this path consistently succeed. Those who skip steps consistently fail.`,
        highlight: '📌 12-month path: backtest (1-2) → demo (3-4) → micro live (5-6) → small live (7-9) → standard (10-12). Skip steps = skip results. The path is the shortcut.',
      },
    ],
    quiz: [
      { q: 'How many components does a complete ICT trading plan have?', options: ['5', '7', '10', '15'], answer: 2 },
      { q: 'Minimum backtested trades before live trading?', options: ['10', '50', '100', '200'], answer: 2 },
      { q: 'Maximum risk per trade in the beginner plan?', options: ['1%', '0.5%', '2%', '0.25%'], answer: 1 },
    ],
  },
};

// ─── Level badge styles ──────────────────────────────────────────
const LEVEL_STYLE = {
  Beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Advanced: 'text-red-400 bg-red-400/10 border-red-400/20',
};

// ─── Section component ───────────────────────────────────────────
function Section({ section, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border border-[rgba(212,168,67,0.1)] rounded-xl overflow-hidden mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[rgba(212,168,67,0.03)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(212,168,67,0.5)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-semibold text-white">{section.title}</span>
        </div>
        <span className="text-[#D4A843] text-lg">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-5 pb-6 border-t border-[rgba(212,168,67,0.1)]">
          <div className="pt-5 text-gray-300 leading-relaxed text-sm whitespace-pre-line mb-4" style={{ fontWeight: 300 }}>
            {section.content}
          </div>
          {section.highlight && (
            <div className="flex gap-3 p-4 rounded-xl border border-[rgba(212,168,67,0.2)] bg-[rgba(212,168,67,0.05)]">
              <div className="text-sm text-[#D4A843] leading-relaxed">{section.highlight}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Quiz component ──────────────────────────────────────────────
function Quiz({ questions }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = submitted ? questions.filter((q, i) => answers[i] === q.answer).length : 0;

  return (
    <div className="rounded-2xl border border-[rgba(212,168,67,0.2)] bg-[rgba(212,168,67,0.03)] p-6">
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#D4A843', letterSpacing: '0.15em' }} className="mb-4">
        // KNOWLEDGE CHECK
      </div>
      {questions.map((q, qi) => (
        <div key={qi} className="mb-6">
          <p className="text-white text-sm font-medium mb-3">{qi + 1}. {q.q}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              let style = 'border-[rgba(212,168,67,0.1)] bg-[#0F0F0F] text-gray-400 hover:border-[rgba(212,168,67,0.3)]';
              if (submitted) {
                if (oi === q.answer) style = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
                else if (answers[qi] === oi) style = 'border-red-500/40 bg-red-500/10 text-red-300';
                else style = 'border-[rgba(212,168,67,0.1)] bg-[#0F0F0F] text-gray-600';
              } else if (answers[qi] === oi) {
                style = 'border-[rgba(212,168,67,0.5)] bg-[rgba(212,168,67,0.08)] text-[#D4A843]';
              }
              return (
                <button
                  key={oi}
                  disabled={submitted}
                  onClick={() => setAnswers({ ...answers, [qi]: oi })}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {!submitted ? (
        <button
          onClick={async () => {
            setSubmitted(true);
            try {
              const supabase = createClient();
              const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
              if (user) {
                await supabase.from('lesson_completions').upsert({ user_id: user.id, lesson_id: lessonId }, { onConflict: 'user_id,lesson_id' });
                const sc = questions.filter((q, i) => answers[i] === q.answer).length;
                const xpEarned = sc === questions.length ? 70 : 20;
                const { data: profile } = await supabase.from('profiles').select('xp').eq('id', user.id).single();
                const currentXP = profile?.xp || 0;
                await supabase.from('profiles').upsert({ id: user.id, xp: currentXP + xpEarned }, { onConflict: 'id' });
              }
            } catch(e) {}
          }}
          disabled={Object.keys(answers).length < questions.length}
          className="w-full py-3 rounded-xl font-mono text-sm tracking-wider uppercase transition-all"
          style={{
            background: Object.keys(answers).length === questions.length
              ? 'linear-gradient(135deg, #D4A843, #F0C96A)'
              : 'rgba(212,168,67,0.1)',
            color: Object.keys(answers).length === questions.length ? '#080808' : '#8A6B28',
            fontWeight: 700,
          }}
        >
          Submit Answers
        </button>
      ) : (
        <div className="text-center p-4 rounded-xl border border-[rgba(212,168,67,0.2)] bg-[rgba(212,168,67,0.05)]">
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', background: 'linear-gradient(135deg, #D4A843, #F0C96A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {score}/{questions.length}
          </div>
          <p className="text-gray-400 text-sm mt-1">
            {score === questions.length ? '🎯 Perfect! You nailed it.' : score >= questions.length / 2 ? '💪 Good job. Review the ones you missed.' : '📖 Re-read the lesson and try again.'}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────
export default function LessonPage({ params }) {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth?redirect=' + encodeURIComponent(window.location.pathname));
      }
    }
    checkAuth();
  }, []);
  const { id } = use(params);
  const lessonId = parseInt(id) || 1;
  const lesson = LESSONS[lessonId] || LESSONS[1];

  const page = (
    <div className="min-h-screen bg-[#080808] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        :root { --gold: #D4A843; --gold-light: #F0C96A; --gold-dim: #8A6B28; --bg2: #0F0F0F; --bg3: #141414; --border: rgba(212,168,67,0.15); }
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-mono-custom { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-[var(--border)]" style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)' }}>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display text-black text-sm" style={{ background: 'linear-gradient(135deg, #D4A843, #8A6B28)' }}>S</div>
          <span className="font-display text-base tracking-widest text-white group-hover:text-[var(--gold)] transition-colors">SMARTMONEY</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {[['/', 'Home'], ['/courses', 'Courses'], ['/signals', 'Signals'], ['/glossary', 'Glossary']].map(([href, label]) => (
            <Link key={href} href={href} className="font-mono-custom text-xs text-gray-400 hover:text-[var(--gold)] transition-colors tracking-wider uppercase">{label}</Link>
          ))}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 font-mono-custom text-xs text-gray-500 mb-8">
          <Link href="/courses" className="hover:text-[var(--gold)] transition-colors">Courses</Link>
          <span className="text-gray-700">›</span>
          <span className="text-[var(--gold)]">{lesson.title}</span>
        </div>

        {/* ── Header ── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`px-3 py-1 rounded-lg text-xs font-mono-custom border ${LEVEL_STYLE[lesson.level]}`}>{lesson.level}</span>
            <span className="font-mono-custom text-xs text-gray-500">📖 {lesson.duration}</span>
            <span className="font-mono-custom text-xs text-gray-500">🏷 {lesson.category}</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white mb-4 leading-none">{lesson.title.toUpperCase()}</h1>
          <p className="text-gray-400 text-lg" style={{ fontWeight: 300 }}>{lesson.subtitle}</p>
        </div>

        {/* ── Intro ── */}
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] mb-8">
          <p className="text-gray-300 leading-relaxed" style={{ fontWeight: 300 }}>{lesson.intro}</p>
        </div>

        {/* ── Chart Image ── */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-[var(--border)]">
          <img
            src={lesson.image}
            alt={lesson.title}
            className="w-full object-cover"
            style={{ maxHeight: '400px', objectFit: 'contain', background: '#0F0F0F' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div style={{ display: 'none' }} className="h-48 items-center justify-center bg-[#0F0F0F]">
            <p className="font-mono-custom text-xs text-gray-500">Chart image — view on desktop for full quality</p>
          </div>
          <div className="px-4 py-3 bg-[#0A0A0A] border-t border-[var(--border)]">
            <p className="font-mono-custom text-xs text-gray-500">{lesson.imageCaption}</p>
          </div>
        </div>

        {/* ── Content sections ── */}
        <div className="mb-10">
          <div className="font-mono-custom text-xs text-[var(--gold)] tracking-widest uppercase mb-5">// Lesson Content</div>
          {lesson.sections.map((section, i) => (
            <Section key={i} section={section} index={i} />
          ))}
        </div>

        {/* ── Quiz ── */}
        <div className="mb-10">
          <div className="font-mono-custom text-xs text-[var(--gold)] tracking-widest uppercase mb-5">// Test Your Understanding</div>
          <Quiz questions={lesson.quiz} />
        </div>

        {/* ── Navigation ── */}
        <div className="grid grid-cols-2 gap-4">
          {lesson.prevLesson ? (
            <Link href={`/lesson/${lesson.prevLesson.id}`}>
              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg2)] hover:border-[rgba(212,168,67,0.35)] transition-all group">
                <div className="font-mono-custom text-xs text-gray-500 mb-1">← Previous</div>
                <div className="font-semibold text-white group-hover:text-[var(--gold)] transition-colors">{lesson.prevLesson.title}</div>
              </div>
            </Link>
          ) : <div />}
          {lesson.nextLesson && (
            <Link href={`/lesson/${lesson.nextLesson.id}`}>
              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg2)] hover:border-[rgba(212,168,67,0.35)] transition-all group text-right">
                <div className="font-mono-custom text-xs text-gray-500 mb-1">Next →</div>
                <div className="font-semibold text-white group-hover:text-[var(--gold)] transition-colors">{lesson.nextLesson.title}</div>
              </div>
            </Link>
          )}
        </div>

      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--border)] px-8 py-6 mt-16">
        <div className="max-w-4xl mx-auto text-center font-mono-custom text-xs text-gray-600">
          SmartMoney Academy — Educational content only. Not financial advice.
        </div>
      </footer>
    </div>
  );
  return lessonId >= 4 ? <ProGuard>{page}</ProGuard> : page;
}