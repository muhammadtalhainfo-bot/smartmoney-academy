// v2
'use client';
import { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';

// ─── Real chart images from web ──────────────────────────────────

// ─── Full lesson data ─────────────────────────────────────────────
const LESSONS = {
  1: {
    id: 1,
    title: 'Market Structure',
    subtitle: 'The Language of Price — How to Read What the Market Is Actually Saying',
    level: 'Beginner',
    duration: '18 min read',
    category: 'Foundation',
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


  15: {
    id: 15,
    title: 'Daily Bias Framework',
    subtitle: 'The Most Important Decision of Every Trading Day - Before Price Moves',
    level: 'Intermediate',
    duration: '20 min read',
    category: 'Analysis',
    intro: `Every professional ICT trader makes one critical decision before placing a single trade: which direction is price going today? This is called Daily Bias - and getting it right means every entry you take during the day has the full force of institutional order flow behind it. Getting it wrong means you are fighting the algorithm every step of the way.`,
    sections: [
      {
        title: 'What Daily Bias Really Means',
        content: `Daily bias is your directional conviction for the trading day - determined from higher timeframe analysis before any session opens. It is the answer to: "Am I looking for longs today, shorts today, or neither?"\n\nThis is fundamentally different from how most retail traders operate. They open a chart when the session starts, see what price is doing in the moment, and decide direction on the spot. This is reactive trading - and it consistently loses because you are making decisions based on the manipulation phase, not the institutional order flow direction.\n\nICT traders are proactive. They study the monthly chart, the weekly chart, and the daily chart before London opens. They identify the draw on liquidity, the institutional order flow direction, and the dealing range. By the time the session opens, the decision is already made. The session itself is just execution.`,
        highlight: '📌 Daily bias is determined BEFORE the session opens - not during it. If you are deciding direction while the market is moving, you are already too late.',
      },
      {
        title: 'The Top-Down Hierarchy - Monthly to Daily',
        content: `Daily bias is never determined from the daily chart alone. It is the synthesis of three higher timeframes:\n\nMONTHLY CHART:\nThe macro context. Is price in a monthly uptrend (HH/HL) or downtrend (LH/LL)? Are we approaching a major monthly premium or discount zone? What is the monthly draw on liquidity - which major swing high or low has not been taken yet?\n\nWEEKLY CHART:\nThe intermediate context. Did last week close bullish or bearish? Is the weekly structure aligned with the monthly? Where is the weekly draw on liquidity? Has the weekly AMD cycle just started (Monday) or is it in distribution (Wednesday-Thursday)?\n\nDAILY CHART:\nThe specific bias. What is the daily structure? Did yesterday close bullish or bearish? Is there an open daily FVG or OB that price should return to? What is the daily draw on liquidity - the nearest unmitigated BSL or SSL?\n\nOnly when all three timeframes align does daily bias carry maximum probability. Monthly bullish + weekly bullish + daily bullish = highest conviction long bias.`,
        highlight: '📌 The hierarchy: Monthly sets the macro direction. Weekly confirms the intermediate trend. Daily gives you the specific day\'s bias. All three must align for maximum conviction.',
      },
      {
        title: 'Previous Day Reference Levels',
        content: `Before every trading day, mark these levels on your chart - they are the primary liquidity pools the algorithm uses as daily targets:\n\nPREVIOUS DAY HIGH (PDH):\nBuy-side liquidity rests above this level. In a bearish daily bias, PDH is often the first target for a Judas Swing - price sweeps above it to collect BSL before reversing lower.\n\nPREVIOUS DAY LOW (PDL):\nSell-side liquidity rests below this level. In a bullish daily bias, PDL is the first target for the London Judas Swing - price sweeps below it before the real bullish delivery.\n\nPREVIOUS DAY CLOSE:\nThe overnight gap between the previous close and the current day's open is significant. The algorithm frequently fills this gap early in the session.\n\nPREVIOUS WEEK HIGH / LOW:\nMore significant than previous day levels - these create larger liquidity pools that require more institutional participation to sweep. Weekly levels define the day's maximum potential target range.\n\nMark all four before every session. They define the boundaries of the day's potential moves.`,
        highlight: '📌 Mark PDH, PDL, previous week high and low before every session. These are your primary liquidity targets for the day - not arbitrary support/resistance lines.',
      },
      {
        title: 'The Midnight Open - True Daily Reference',
        content: `ICT uses midnight New York time as the "True Daily Open" - not the NYSE open at 9:30 AM. This is the reference point from which the day's AMD cycle begins.\n\nWhy midnight? Because the algorithm begins delivering price from midnight onwards. The Asian session (7 PM-12 AM EST) accumulates. The London session (2 AM-5 AM EST) manipulates. The New York AM session (7 AM-11 AM EST) distributes. The midnight open is the starting point of the full day's cycle.\n\nThe relationship between current price and the midnight open tells you the AMD phase:\n• Price near midnight open = still in accumulation/early manipulation\n• Price significantly above/below midnight open in London = manipulation phase (Judas Swing)\n• Price extending from the manipulation extreme in NY AM = distribution phase\n\nPractical application: if it is 10 AM New York time and price has already moved 50 points above the midnight open, you are likely in the distribution phase. Do not chase. If price is pulling back toward the midnight open level, watch for re-entry from an IRL level.`,
        highlight: '📌 The True Daily Open is midnight NY time - not 9:30 AM. Mark it every day. It is the starting reference for the entire day\'s AMD delivery cycle.',
      },
      {
        title: 'When to Trade With No Bias (Neutral Days)',
        content: `The most underappreciated skill in ICT trading is knowing when NOT to have a bias. Not every day offers a clear directional conviction - and trading on low-conviction days is one of the fastest ways to destroy a profitable week.\n\nNEUTRAL DAY SIGNALS:\n• Monthly and weekly timeframes are in conflict (monthly bullish but weekly making lower highs)\n• Daily chart is in the middle of a dealing range - no clear premium or discount\n• High-impact news event scheduled (NFP, FOMC, CPI)\n• Previous day closed inside a major FVG without commitment\n• The week is already in the distribution phase and target has been reached\n\nOn neutral days: do not trade. Study. Review previous trades. Mark levels for tomorrow. The discipline to sit on your hands on neutral days is what allows you to trade aggressively on the three or four high-conviction days per week that actually matter.\n\nRemember: professional traders might have 8-12 high-quality trades per month. The rest of the time they are waiting or studying. The compulsion to trade every day is a retail habit that destroys accounts.`,
        highlight: '📌 No bias = no trade. Not every day has a clear ICT setup. Trading on low-conviction days produces marginal setups that create psychological damage when they fail. Protect your edge by being selective.',
      },
      {
        title: 'Building Your Daily Bias Routine',
        content: `Here is the exact pre-session routine for determining daily bias:\n\nTIME: After Asian session closes, before London opens (12 AM - 1:30 AM EST)\n\nSTEP 1 - Monthly Chart (2 minutes):\nConfirm macro trend direction. Note any nearby monthly premium/discount level.\n\nSTEP 2 - Weekly Chart (3 minutes):\nConfirm weekly structure. Note PDW high and low. Determine weekly AMD phase.\n\nSTEP 3 - Daily Chart (5 minutes):\nConfirm daily structure. Mark PDH and PDL. Identify daily draw on liquidity. Look for open FVGs or OBs.\n\nSTEP 4 - Write Your Bias:\nLiterally write: "Today's bias is BULLISH because [reason]. My draw on liquidity is [level]. The invalidation of this bias is [level]." This takes 30 seconds and forces clarity.\n\nSTEP 5 - Set Alerts:\nSet price alerts at your draw on liquidity and at the invalidation level. Then step away until the London or NY AM killzone.\n\nThis entire routine takes 15-20 minutes. Traders who do this consistently outperform those who sit in front of charts all day reacting to noise.`,
        highlight: '📌 Your daily bias routine should take 15-20 minutes and be completed before London opens. Write your bias down. Set alerts. Then wait for killzone hours.',
      },
    ],
    quiz: [
      { q: 'Daily bias should be determined...', options: ['During the NY AM session', 'Before the session opens using HTF analysis', 'After the first trade of the day', 'When price shows a clear pattern'], answer: 1 },
      { q: 'The True Daily Open in ICT is...', options: ['9:30 AM NYSE open', 'London open at 2 AM EST', 'Midnight New York time', 'Asian session open at 7 PM EST'], answer: 2 },
      { q: 'When should you trade with no bias?', options: ['Never - always have a direction', 'When monthly and weekly timeframes conflict', 'Only on Mondays', 'When RSI is at 50'], answer: 1 },
    ],
    nextLesson: { id: 16, title: 'Draw on Liquidity' },
    prevLesson: { id: 14, title: 'Top-Down Analysis' },
  },

  16: {
    id: 16,
    title: 'Draw on Liquidity',
    subtitle: 'Where Is Price Going Before It Arrives - The Most Powerful ICT Concept',
    level: 'Intermediate',
    duration: '18 min read',
    category: 'Analysis',
    intro: `The Draw on Liquidity (DOL) is the concept that separates traders who anticipate from traders who react. While retail traders wonder "where will price go?" after it has already moved, ICT traders identify the next liquidity target BEFORE price reaches it. This is not prediction - it is understanding the algorithmic sequence that governs all price delivery.`,
    sections: [
      {
        title: 'What Is the Draw on Liquidity?',
        content: `The Draw on Liquidity is the next logical price target - the specific level where the algorithm is delivering price next. It is always a pool of liquidity: a cluster of stop orders, pending orders, or unfilled institutional orders that the algorithm needs to reach to continue the delivery cycle.\n\nThe DOL concept is built on a simple truth: price never moves randomly from one level to another. Every move has a destination - a liquidity pool that needs to be collected before the next phase of the cycle begins. Once you can identify that destination, you know where to place your take-profit, how far to expect price to travel, and whether a developing move is likely to continue or reverse.\n\nThink of it like a chess game. Amateur players react to the last move. Masters see five moves ahead. ICT traders identify the DOL before the move starts - then enter at the pullback and ride price to the target.`,
        highlight: '📌 The DOL is always a liquidity pool - BSL above a high, SSL below a low, or an institutional zone like a FVG. Price does not move to arbitrary levels - it moves from one pool to the next.',
      },
      {
        title: 'External Range Liquidity (ERL) vs Internal Range Liquidity (IRL)',
        content: `The DOL exists in one of two forms:\n\nEXTERNAL RANGE LIQUIDITY (ERL):\nLiquidity that sits OUTSIDE the current price range - beyond the swing highs and swing lows. This includes: previous swing highs (BSL), previous swing lows (SSL), equal highs and equal lows, previous week highs/lows, previous month highs/lows, and major round numbers.\n\nERL targets are the ultimate destinations - the levels where major institutional orders are resting and where the algorithm delivers price as its primary objective.\n\nINTERNAL RANGE LIQUIDITY (IRL):\nLiquidity that exists WITHIN the current price range - inside the dealing range. This includes: unmitigated FVGs, Order Blocks within the range, Balanced Price Ranges, and NWOG/NDOG gaps within the range.\n\nIRL targets are intermediate stops - price fills these as part of the delivery path before continuing to the ERL target.\n\nThe trading sequence: Price sweeps ERL (collects liquidity at a major level) → retraces to IRL (fills an internal imbalance) → continues to the next ERL. Understanding which phase you are in determines whether you are looking for continuation entries or waiting for the retracement.`,
        highlight: '📌 ERL = targets outside the range (swing highs/lows). IRL = targets inside the range (FVGs, OBs). Price alternates: ERL sweep → IRL retracement → ERL continuation.',
      },
      {
        title: 'Identifying Your DOL Before the Session',
        content: `Before every trading session, run this DOL identification process:\n\nSTEP 1 - Mark all ERL above price:\n• Previous swing highs\n• Equal highs (EQH)\n• Previous day high, previous week high\n• Round numbers above current price\n\nSTEP 2 - Mark all ERL below price:\n• Previous swing lows\n• Equal lows (EQL)\n• Previous day low, previous week low\n• Round numbers below current price\n\nSTEP 3 - Mark all IRL:\n• Open FVGs on 4-hour and daily charts\n• Unmitigated Order Blocks within the current range\n• NWOG and NDOG gaps\n\nSTEP 4 - Determine which DOL is most likely:\nGiven your daily bias, which liquidity pool is the algorithm most likely targeting today? In a bullish bias, the DOL is likely the nearest ERL above price (BSL at a swing high or equal highs). In a bearish bias, the DOL is the nearest ERL below price.\n\nSTEP 5 - This becomes your take-profit target before you enter a single trade.`,
        highlight: '📌 Your DOL is your TP target - identified BEFORE entry. Never enter a trade without knowing where it is going. The DOL tells you: this is where price is being delivered, and this is where I exit.',
      },
      {
        title: 'The DOL Sequence in Real Trades',
        content: `A complete DOL-based trade follows this exact sequence:\n\n1. IDENTIFY THE ERL TARGET:\nBullish bias. Equal highs sitting above price at 1.0850. This is BSL - the algorithm's draw. This is your TP.\n\n2. WAIT FOR THE IRL RETRACEMENT:\nAfter a recent bullish BOS, price pulls back. It fills the nearest IRL - an open bullish FVG at 1.0790.\n\n3. ENTER AT THE IRL:\nPrice reaches the FVG at 1.0790. Lower timeframe shows a ChoCH bullish - confirmation the retracement is over. Enter long.\n\n4. STOP BELOW THE SWEEP:\nPlace stop below the recent low that created the FVG - beyond the sweep level.\n\n5. TARGET = THE ERL:\nTP at the equal highs (BSL) at 1.0850. This gives you a clear, pre-identified target based on where the algorithm is delivering price.\n\nThis is not hope-based trading. This is algorithmic trading - understanding the delivery mechanism and positioning accordingly. The entry is at IRL. The target is ERL. The stop is beyond the sweep. Three levels, all defined before execution.`,
        highlight: '📌 The DOL trade: identify ERL target → wait for IRL retracement → enter at IRL → stop beyond sweep → TP at ERL. All three levels defined before entry. No guessing.',
      },
      {
        title: 'Common DOL Mistakes',
        content: `MISTAKE 1 - CONFUSING DOL WITH RANDOM TP LEVELS:\nPlacing take-profit at "2:1 R:R" or "50 pips" without identifying an actual liquidity pool. The DOL is always a specific, identifiable liquidity level - not an arbitrary number.\n\nMISTAKE 2 - TARGETING THE WRONG ERL:\nSkipping the nearest ERL and targeting a distant one. The algorithm works step by step - it collects the nearest liquidity before moving to the next. Target the first unmitigated ERL in your bias direction.\n\nMISTAKE 3 - TRADING INTO A VOID:\nEntering a trade where the DOL has already been reached. If the equal highs have already been swept, there is no DOL above them - you need to identify the new ERL that forms after the sweep.\n\nMISTAKE 4 - IGNORING LRLR vs HRLR:\nLow Resistance Liquidity Runs (LRLR) reach their DOL cleanly with minimal opposing structure. High Resistance Liquidity Runs (HRLR) face multiple opposing PD arrays on the way to the target - lower probability. Assess the path before entering.`,
        highlight: '📌 Always ask: is this a LRLR (clean path to target) or HRLR (multiple obstacles)? LRLR setups reach their DOL reliably. HRLR setups frequently fail before reaching the target.',
      },
    ],
    quiz: [
      { q: 'The Draw on Liquidity is always...', options: ['The nearest support/resistance line', 'A specific liquidity pool where institutional orders rest', 'A 2:1 R:R target', 'The previous day close'], answer: 1 },
      { q: 'External Range Liquidity (ERL) refers to...', options: ['FVGs inside the current range', 'Order Blocks within the dealing range', 'Swing highs and lows outside the current range', 'The midnight open level'], answer: 2 },
      { q: 'The correct DOL trade sequence is...', options: ['Enter anywhere → hope for movement → exit randomly', 'Identify ERL → wait for IRL retracement → enter at IRL → TP at ERL', 'Buy at support → sell at resistance', 'Enter after news → exit at round number'], answer: 1 },
    ],
    nextLesson: { id: 17, title: 'Dealing Ranges & PD Arrays' },
    prevLesson: { id: 15, title: 'Daily Bias Framework' },
  },

  17: {
    id: 17,
    title: 'Dealing Ranges & PD Arrays',
    subtitle: 'The Full PD Array Matrix - Every Institutional Zone Ranked by Strength',
    level: 'Intermediate',
    duration: '22 min read',
    category: 'PD Arrays',
    intro: `PD Arrays - Price Delivery Arrays - are the institutional zones on your chart where the algorithm is programmed to deliver price and create reactions. Understanding which arrays exist, how to rank them by strength, and how to use them in order of priority is what separates advanced ICT practitioners from beginners who draw random boxes and call them Order Blocks.`,
    sections: [
      {
        title: 'What Is a Dealing Range?',
        content: `A Dealing Range is any defined price range between a significant swing high and swing low. Every dealing range has three zones:\n\nPREMIUM (above 50% EQ): Price is expensive. Institutions sell in premium. This is where you look for short entries or TP targets on longs.\n\nEQUILIBRIUM (exactly 50%): Fair value within the range. Not a particularly high-probability entry zone - price typically moves through equilibrium rather than reacting from it.\n\nDISCOUNT (below 50% EQ): Price is cheap. Institutions buy in discount. This is where you look for long entries or TP targets on shorts.\n\nDealing ranges nest inside each other at every timeframe. A monthly dealing range contains weekly dealing ranges, which contain daily dealing ranges, which contain 4-hour dealing ranges. Understanding which dealing range you are operating within - and whether price is in premium or discount within that range - is fundamental to every ICT entry decision.\n\nThe rule is simple and non-negotiable: only buy in discount zones. Only sell in premium zones. Buying in premium or selling in discount is fighting institutional order flow.`,
        highlight: '📌 Only buy in discount (below 50% EQ). Only sell in premium (above 50% EQ). This single rule eliminates the majority of low-probability trades that most ICT beginners take.',
      },
      {
        title: 'The Full PD Array Matrix - Ranked by Strength',
        content: `ICT ranks all PD Arrays from most to least powerful. Higher-ranked arrays produce stronger, more reliable reactions:\n\n1. BREAKER BLOCK (highest probability):\nA failed Order Block that has flipped polarity. Price broke through and violated a previous OB, converting it from support to resistance (or vice versa). Breakers attract the strongest institutional reactions because they represent zones where two sets of institutional orders are stacked.\n\n2. REJECTION BLOCK:\nFormed when price has a large wick that gets completely engulfed by the next candle. The wick represents trapped orders that become institutional levels on future returns.\n\n3. ORDER BLOCK:\nThe last opposing candle before a significant displacement move. Bullish OB = last bearish candle before bullish displacement. Bearish OB = last bullish candle before bearish displacement.\n\n4. MITIGATION BLOCK:\nAn OB that has been partially returned to but not fully traded through. The remaining unfilled portion continues to attract institutional interest.\n\n5. FAIR VALUE GAP (FVG/BISI/SIBI):\nThree-candle imbalance. The most commonly traded array. Highly reliable when aligned with HTF bias and within a discount/premium zone.\n\n6. BALANCED PRICE RANGE (BPR):\nOverlap between a bullish FVG and bearish FVG. Creates the most concentrated institutional reaction zone.\n\n7. VOID / LIQUIDITY VOID (lowest among arrays, but still significant):\nLarge single-candle gaps that price must return to fill. Less predictable timing but reliable eventual fill.`,
        highlight: '📌 Array priority: Breaker → Rejection Block → Order Block → Mitigation Block → FVG/BPR → Void. When multiple arrays overlap at the same level, the probability of reaction dramatically increases.',
      },
      {
        title: 'Nested Dealing Ranges - Operating at Multiple Levels',
        content: `The dealing range concept is fractal - every timeframe has its own dealing range, and they nest inside each other. Understanding which range governs your trade is critical:\n\nMACRO RANGE (monthly/weekly):\nDefines the macro premium and discount. If price is in a monthly discount zone, the entire week's trading should favor longs regardless of short-term patterns.\n\nINTERMEDIATE RANGE (daily/4-hour):\nDefines the intermediate structure for entries. A daily bullish OB in a weekly discount zone represents a high-conviction buy zone.\n\nMICRO RANGE (1-hour/15-minute):\nDefines the precise entry level. An FVG on the 5-minute chart within a discount zone of the 1-hour dealing range is your entry trigger.\n\nThe golden rule of nested dealing ranges: higher timeframe dealing ranges override lower timeframe signals. A 5-minute bearish FVG inside a 1-hour bullish discount zone is a LOW probability short - even if the 5-minute pattern looks perfect. The 1-hour dealing range context says: look for longs, not shorts.\n\nThis concept eliminates the counter-trend trades that destroy beginners - the ones where a lower timeframe pattern looks convincing but the higher timeframe says the opposite.`,
        highlight: '📌 Higher timeframe dealing ranges override lower timeframe signals. A 5-minute pattern inside an opposing 1-hour dealing range is low probability. Always check which dealing range you are operating within.',
      },
      {
        title: 'Stacking PD Arrays for Confluence',
        content: `The highest-probability entries occur when multiple PD Arrays stack at the same price level. This is called confluence - and it dramatically increases the reliability of the reaction.\n\nEXAMPLE OF MAXIMUM CONFLUENCE:\n• Weekly dealing range: price in discount (below 50% EQ)\n• Daily chart: bullish Order Block at the same price\n• 4-hour chart: bullish FVG overlapping the Order Block\n• 1-hour chart: Balanced Price Range within the FVG\n• All of this occurs within the OTE zone (62-79% retracement)\n\nThis is four PD Arrays stacked at the same level, all within a discount zone, within the OTE zone. This is an A+ setup. When these levels align, the probability of a strong reaction is the highest possible in the ICT framework.\n\nContrast this with: a 5-minute FVG in a neutral zone with no other confluence. This is a D-grade setup. Same concept, completely different probability.\n\nGrade your setups by confluence depth. A+ = 4+ arrays aligned in optimal zone. A = 3 arrays. B = 2 arrays. C = 1 array. Only trade A and A+ setups. The patience to wait for maximum confluence is the most valuable skill an ICT trader can develop.`,
        highlight: '📌 Stack PD Arrays for confluence: OB + FVG + BPR in discount zone = A+ setup. A single FVG with no other confluence = C setup. Only take A and A+ trades. Wait for confluence.',
      },
      {
        title: 'How to Draw PD Arrays Correctly',
        content: `DRAWING ORDER BLOCKS:\nMark the body of the last bearish candle before a bullish displacement (for bullish OB). The OB zone spans from the candle's body high to body low. Some practitioners use wick-to-wick - ICT traditionally uses body only for the core zone.\n\nDRAWING FVGs:\nMark the high of candle 1 and the low of candle 3 for a bullish FVG. The midpoint is the Consequent Encroachment (CE) - your primary entry level within the gap.\n\nDRAWING BREAKER BLOCKS:\nWhen an OB is violated (price completely trades through it), flip its polarity. Mark it as a Breaker Block - it becomes resistance for a bullish OB that was broken, or support for a bearish OB that was broken.\n\nDRAWING BPR:\nIdentify a bullish FVG and a bearish FVG in the same area. The overlapping zone between them is the BPR.\n\nKEY RULE - REMOVE MITIGATED ARRAYS:\nOnce price has returned to an array and traded through its entire range, that array is consumed. Remove it from your chart. Leaving consumed arrays creates false signals and chart clutter. Only active, unmitigated arrays belong on your working chart.`,
        highlight: '📌 Remove mitigated PD Arrays from your chart immediately. A consumed OB or FVG is no longer valid. Leaving old arrays creates false signals. Only keep active, unmitigated zones.',
      },
    ],
    quiz: [
      { q: 'In a dealing range, institutions buy in...', options: ['Premium zone (above 50% EQ)', 'Equilibrium (exactly 50%)', 'Discount zone (below 50% EQ)', 'Any zone regardless of price'], answer: 2 },
      { q: 'Which PD Array ranks highest in the matrix?', options: ['Fair Value Gap', 'Order Block', 'Breaker Block', 'Mitigation Block'], answer: 2 },
      { q: 'When should a PD Array be removed from your chart?', options: ['After 24 hours', 'When price approaches it', 'Once price has fully traded through it (mitigated)', 'At the end of each week'], answer: 2 },
    ],
    nextLesson: { id: 18, title: 'Institutional Order Flow' },
    prevLesson: { id: 16, title: 'Draw on Liquidity' },
  },

  18: {
    id: 18,
    title: 'Institutional Order Flow',
    subtitle: 'How Banks and Hedge Funds Actually Move Price - The Real Mechanics',
    level: 'Advanced',
    duration: '24 min read',
    category: 'Advanced',
    intro: `Retail traders ask "where is price going?" Institutional traders ask "where do we need to deliver price to fill our orders?" These are fundamentally different questions - and the gap between them is the gap between consistent losses and consistent profits. This lesson breaks down exactly how banks and hedge funds operate, and how their operation creates every pattern ICT traders use.`,
    sections: [
      {
        title: 'Why Banks Cannot Trade Like Retail',
        content: `A retail trader with a $10,000 account can buy 1 lot of EURUSD and the order fills instantly without moving the market. A bank with a $10 billion position in the same pair faces an entirely different problem.\n\nIf JPMorgan wants to buy $10 billion worth of EURUSD, they cannot simply place a market order. The moment they start buying that size, price rises sharply against them - every pip of movement represents millions of dollars of slippage. By the time they have filled their position, they have moved the market so far that the trade is already at a loss before it even starts.\n\nTo solve this, institutions use two mechanisms:\n\n1. ACCUMULATION OVER TIME:\nInstead of buying all at once, institutions buy gradually over hours or days, disguising their activity within normal-looking market oscillations. This is the Accumulation phase of AMD.\n\n2. LIQUIDITY ENGINEERING:\nInstitutions deliberately move price to areas where retail orders cluster - stop losses, breakout orders - to generate the SELL orders they need to fill their massive BUY positions against. This is the Manipulation phase of AMD.\n\nEverything in ICT methodology flows from understanding these two institutional constraints.`,
        highlight: '📌 Banks cannot enter positions the way retail traders do. Their size forces them to accumulate gradually and engineer price to collect liquidity. Understanding this is understanding why ICT patterns exist.',
      },
      {
        title: 'The Accumulation Phase - Building Without Moving Price',
        content: `During accumulation, institutions are building their positions across a range of prices. Price appears to consolidate - moving back and forth without strong directional commitment. This is not indecision. It is deliberate.\n\nSIGNS OF ACCUMULATION:\n• Price moves within a tight range for an extended period\n• Multiple tests of the same support or resistance level without breakout\n• Decreasing volatility and range compression\n• The Asian session range - the primary daily accumulation window\n• Consolidation zones that retail traders incorrectly label as "low volume" periods\n\nDuring accumulation, smart money is:\n• Filling buy orders at progressively higher prices (for long positioning)\n• Filling sell orders at progressively lower prices (for short positioning)\n• Absorbing retail orders on both sides to hide directional intent\n\nThe final stage of accumulation is always a liquidity sweep - a sharp move in the opposite direction of the intended trade, designed to collect the last remaining orders needed to complete the position. After this sweep, the true directional move begins.`,
        highlight: '📌 Consolidation = institutional accumulation. The tighter and longer the consolidation, the more significant the eventual breakout. The direction of the breakout is opposite to the final sweep before it.',
      },
      {
        title: 'Stop Hunt Engineering - The Deliberate Manipulation',
        content: `The most controversial aspect of ICT methodology is the concept of deliberate price manipulation - and it is also the most important to understand. Banks engineer stop hunts not out of malice but out of necessity. They need retail order flow to fill their own positions.\n\nTHE MECHANICS OF A STOP HUNT:\n\nScenario: Banks want to buy $10 billion of EURUSD.\n\nStep 1 - Identify where retail longs have their stops:\nRetail traders who are long EURUSD have stop losses below recent support levels (SSL). These stops are sell orders waiting to trigger.\n\nStep 2 - Engineer the move to the stops:\nBanks temporarily push price DOWN through the support level - triggering all those retail sell stops.\n\nStep 3 - Buy against the triggered stops:\nThose retail stop-loss sell orders become the bank's buy orders. The bank buys everything the panicking retail longs sell. This fills the institution's massive buy position at the support level.\n\nStep 4 - Reverse price aggressively:\nWith their position now filled and all opposing retail orders consumed, the bank drives price sharply higher. The retail traders who just got stopped out watch price immediately reverse and run without them.\n\nThis is the pattern ICT traders trade EVERY DAY - the sweep and reverse. It is not random. It is mechanical.`,
        highlight: '📌 The stop hunt sequence: identify where retail stops are → engineer sweep of those stops → collect liquidity → reverse aggressively. This is the foundational ICT trade pattern.',
      },
      {
        title: 'Institutional Candle Signatures',
        content: `Institutional activity leaves specific footprints on your candle charts. Learning to recognize these signatures tells you when smart money is actively participating:\n\nDISPLACEMENT CANDLES:\nLarge-bodied candles with relatively small wicks, moving aggressively in one direction. These represent moments when institutional commitment is overwhelming retail resistance. A single displacement candle can move price further in one session than weeks of gradual retail trading.\n\nFVG-EMBEDDED MOVES:\nMultiple consecutive displacement candles that leave Fair Value Gaps between them. This is the signature of genuine institutional delivery - the algorithm is running and not allowing price to reprice efficiently.\n\nINSTITUTIONAL WICKS:\nLong wicks that immediately reverse - these are the stop hunt signatures. A candle that spikes 30 points below support then closes back above it is showing you exactly where the bank swept SSL and reversed.\n\nFLAT-TOP / FLAT-BOTTOM CANDLES:\nCandles where the open and the high (or open and low) are at the same level - institutional orders set at a specific price limiting movement in one direction before a breakout.\n\nRECOGNIZING these signatures helps you identify in real time when institutional order flow is present versus when price is in random retail noise - and trade only during institutional participation.`,
        highlight: '📌 Learn to distinguish displacement candles (institutional commitment) from choppy, overlapping candles (retail noise). Only trade during displacement - when smart money is actively participating.',
      },
      {
        title: 'Reading Institutional Intent from Price Structure',
        content: `Advanced ICT practitioners read the chart like a story - every price action sequence tells them something about institutional intent:\n\nBOLLISH IOF SEQUENCE:\n1. Price makes lower lows (accumulation, retail sold)\n2. Sharp sweep below a significant low (SSL collection)\n3. Immediate violent reversal upward (institutional buy execution complete)\n4. Break of Structure to the upside (bullish ChoCH - IOF now bullish)\n5. Retracement into the FVG/OB from the initial move\n6. Continuation higher toward BSL target\n\nBEARISH IOF SEQUENCE:\n1. Price makes higher highs (accumulation at premium)\n2. Sharp sweep above a significant high (BSL collection)\n3. Immediate violent reversal downward\n4. ChoCH to the downside (IOF now bearish)\n5. Rally into FVG/OB from the initial move\n6. Continuation lower toward SSL target\n\nRecognizing which sequence you are in - and specifically WHERE in that sequence current price is - tells you whether to be looking for entries, waiting for confirmation, or taking profits.`,
        highlight: '📌 The complete IOF sequence: accumulation → liquidity sweep → reversal → ChoCH → retracement entry → continuation to target. Identify which step price is on before every trade decision.',
      },
      {
        title: 'Order Flow Confirmation Before Entry',
        content: `Before entering any trade, confirm that institutional order flow supports your direction. This is different from asking whether the setup "looks good" - it requires confirming the presence of the following:\n\n1. DISPLACEMENT:\nHas there been a genuine displacement move in your trade direction recently? Multiple large candles with FVGs, moving decisively in one direction. Without recent displacement, there is no evidence of institutional commitment.\n\n2. LIQUIDITY SWEEP:\nHas a recent stop hunt occurred in the opposite direction of your trade? The sweep confirms that the institution collected the liquidity it needed before the true directional move.\n\n3. STRUCTURE BREAK:\nHas the lower timeframe broken structure in your trade direction following the sweep? The LTF ChoCH or BOS confirms institutional commitment to the new direction.\n\n4. RETRACEMENT INTO ARRAY:\nIs price currently pulling back into a PD Array in your trade direction? The retracement is your entry opportunity - the algorithm is repricing to fill at institutional levels before continuing.\n\nAll four must be present for maximum confluence. Missing one reduces probability significantly. Missing two or more means wait for a better setup.`,
        highlight: '📌 Before entry, confirm: recent displacement + liquidity sweep + LTF structure break + retracement into PD Array. All four = maximum probability. Missing elements = reduced probability or no trade.',
      },
      {
        title: 'The Distribution Phase - Delivering to Target',
        content: `Distribution is when institutions execute the delivery phase of their plan - driving price aggressively toward the target liquidity pool with sustained commitment. This is the phase retail traders call "the trend" and desperately try to catch - usually after it has already traveled most of its distance.\n\nSIGNATURES OF THE DISTRIBUTION PHASE:\n• Consistent displacement candles in one direction\n• Minimal opposing retracements - pullbacks are shallow and brief\n• Each pullback respects FVGs from the initial move without violating them\n• Price reaches and takes out the identified DOL (ERL target)\n• Volume is highest during this phase in traditional markets\n\nWHEN DISTRIBUTION ENDS:\nDistribution is complete when the ERL target is reached and swept. After the target is collected, price will transition back into accumulation for the next cycle - often showing a sharp reversal after a final over-extended push past the target.\n\nThe sign that distribution is ending: a final aggressive push past the target liquidity level that immediately reverses - a sweep of the ERL target followed by a ChoCH in the opposite direction. This is the setup for the next directional trade.`,
        highlight: '📌 Distribution ends when the ERL target is swept. After the target, expect accumulation for the next cycle - and watch for a final overshoot of the target followed by ChoCH as the signal that the cycle is resetting.',
      },
    ],
    quiz: [
      { q: 'Why do banks engineer stop hunts?', options: ['To punish retail traders', 'To generate the order flow they need to fill large positions', 'Because of random price movement', 'To follow technical analysis patterns'], answer: 1 },
      { q: 'A displacement candle is characterized by...', options: ['Small body with large wicks', 'Large body with minimal wicks, moving aggressively in one direction', 'Equal open and close', 'Gap from the previous close'], answer: 1 },
      { q: 'The Distribution phase ends when...', options: ['Price reaches equilibrium', 'The ERL target is swept', 'The Asian session opens', 'RSI reaches overbought'], answer: 1 },
    ],
    nextLesson: { id: 19, title: 'Session Timing & Market Hours' },
    prevLesson: { id: 17, title: 'Dealing Ranges & PD Arrays' },
  },

  19: {
    id: 19,
    title: 'Session Timing & Market Hours',
    subtitle: 'The Clock Is as Important as the Chart - When You Trade Matters',
    level: 'Beginner',
    duration: '17 min read',
    category: 'Timing',
    intro: `One of ICT's most powerful but often overlooked teachings is this: time matters as much as price. The same setup that produces a clean 3R trade during the New York AM Killzone will frequently fail or produce a messy, slow-moving trade if taken at 2 PM New York time. Institutional liquidity is not constant - it floods the market during specific windows and retreats during others. Trading in the right window transforms your results.`,
    sections: [
      {
        title: 'Why Time Matters in ICT',
        content: `Markets are not equally active throughout the 24-hour trading day. Liquidity - the volume of institutional orders hitting the market - ebbs and flows dramatically based on which institutional centers are active.\n\nWhen London banks are at their desks and executing orders, spreads are tight, price moves with commitment, and ICT setups deliver cleanly to their targets. When European traders are at lunch and New York has not fully engaged, price chops - the algorithm is in a neutral holding pattern with no institutional mandate to deliver price anywhere specific.\n\nThis is why the same FVG or Order Block that produces a 3R trade at 10 AM New York will produce a stop-out or breakeven trade at 3 PM New York. It is not the setup that changed - it is the institutional participation that changed.\n\nTrading during institutional hours is not a filter that improves your results marginally. It is the primary environmental factor that determines whether your setups work at all. Professional ICT traders do not fight this - they adapt their entire schedule around it.`,
        highlight: '📌 The same setup can produce very different results at different times. Institutional participation - not the pattern itself - determines whether a setup delivers. Trade during institutional hours only.',
      },
      {
        title: 'Asian Session (7 PM - 12 AM EST) - Range Building',
        content: `The Asian session encompasses the Tokyo, Singapore, and Hong Kong institutional centers. It is characterized by lower volume than European and American sessions and a tendency for price to build a defined range rather than commit to a directional delivery.\n\nKEY CHARACTERISTICS:\n• Price oscillates within a relatively tight range - the "Asian Range"\n• Lower spread and lower volatility compared to London and NY\n• Institutional participants are building overnight positions\n• No major institutional mandate for directional price delivery\n\nTRADING THE ASIAN SESSION:\nFor most ICT traders, the Asian session is not a trading window - it is an observation and analysis window. During this time:\n• Mark the Asian High and Asian Low (the top and bottom of the session range)\n• Note any FVGs or OBs that form during Asian accumulation\n• Confirm or update your daily bias analysis\n• Set alerts for the London Killzone\n\nTHE ASIAN RANGE AS LIQUIDITY TARGET:\nThe high and low of the Asian range become critical London session targets. BSL rests above the Asian High. SSL rests below the Asian Low. London traders will frequently target one or both before committing to the day's real direction.`,
        highlight: '📌 Asian session = observation and analysis, not trading. Mark the Asian High and Low - they become the London session\'s primary liquidity targets (BSL above Asian High, SSL below Asian Low).',
      },
      {
        title: 'London Killzone (2 AM - 5 AM EST) - Manipulation Phase',
        content: `The London Killzone is the most deceptive session of the trading day. European institutional traders - some of the most powerful in the world - come online and immediately begin the Manipulation phase of the daily AMD cycle.\n\nKEY CHARACTERISTICS:\n• Price often makes the session's false move first\n• The Judas Swing is most common during London open\n• Asian Range gets swept - either the high or the low is taken\n• After the sweep, the real daily direction is often established\n• Volume dramatically increases from the Asian session\n\nTHE LONDON JUDAS SWING PATTERN:\n1. Asian session closes. Asian Range is marked.\n2. London opens. Price breaks above the Asian High (BSL sweep) - breakout traders buy.\n3. Price immediately reverses. The BSL sweep was manipulation.\n4. Price drives lower for the real bearish daily delivery.\n\nOr the mirror:\n1. Price breaks below the Asian Low (SSL sweep) - breakdown traders sell.\n2. Price immediately reverses.\n3. Real bullish daily delivery begins.\n\nThis pattern repeats with remarkable consistency. The London session sweep of the Asian range is one of the most reliable patterns in all of ICT methodology - and one of the most profitable when traded correctly.`,
        highlight: '📌 The London Judas Swing: price sweeps the Asian High or Low in the first hour → immediately reverses → real daily direction begins. This is the London open\'s primary trading pattern.',
      },
      {
        title: 'New York AM Killzone (7 AM - 11 AM EST) - Primary Delivery',
        content: `The New York AM Killzone is the single most important trading window in the entire ICT framework. This is when:\n• The highest volume of institutional orders enters the market\n• The most reliable price delivery occurs\n• The Silver Bullet entry model is designed to operate\n• The day's primary directional trend is confirmed and delivered\n\nKEY SUB-WINDOWS WITHIN NY AM:\n\n9:30 AM EST - NYSE OPEN:\nThe official opening of the New York Stock Exchange. A surge of institutional orders hits all correlated markets. This creates the final confirmation or final manipulation of the day's direction before the primary delivery.\n\n10:00 AM EST - SILVER BULLET WINDOW:\nICT's most precise time window. Between 10:00 AM and 11:00 AM EST, the algorithm frequently delivers its primary trade for the day. Silver Bullet setups - FVG entries after a liquidity sweep - work best in this exact window.\n\n11:00 AM EST - PRIMARY DELIVERY COMPLETE:\nBy 11:00 AM, the day's primary move is typically complete or well-established. After this, energy drops and setups become less reliable.\n\nBEST PRACTICE: Complete all top-down analysis and daily bias work before 7 AM. Be fully prepared with levels marked and alerts set. Execute one or two trades during 9:30-11:00 AM only. Stop trading at 11:00 AM.`,
        highlight: '📌 The Silver Bullet window (10 AM - 11 AM EST) is the single highest-probability trading hour in the entire week. If you only trade one hour per day, trade this one.',
      },
      {
        title: 'London Close & New York PM (12 PM - 5 PM EST)',
        content: `The London Close session (12 PM - 2 PM EST) is when European traders exit their positions for the day. This creates predictable price behavior:\n\nLONDON CLOSE REVERSAL:\nIf price has trended bullishly during the London/NY AM session, London traders selling their long positions can create a bearish reversal as New York heads into the afternoon. This reversal frequently returns price to the midpoint of the day's range or to an open FVG before consolidating.\n\nNEW YORK PM SESSION (2 PM - 5 PM EST):\nThe afternoon session is characterized by:\n• Lower volume than the morning\n• Less reliable price delivery\n• Higher risk of stop hunts without follow-through\n• Suitable for position management, not new entries\n• Avoid new positions in the PM session whenever possible\n\nThe PM session CAN produce valid setups when there is still an unmitigated ERL target that the day's move has not yet reached - but probability is materially lower than the AM session. Professional ICT traders rarely initiate new positions after 11 AM EST.`,
        highlight: '📌 After 11 AM EST, probability drops significantly. The London Close (12-2 PM) can create reversals. The NY PM session (2-5 PM) is high-noise. Avoid new positions - focus on managing existing trades.',
      },
    ],
    quiz: [
      { q: 'Which session is described as the "Manipulation Phase" of the AMD cycle?', options: ['Asian Session', 'London Killzone', 'New York PM', 'London Close'], answer: 1 },
      { q: 'The Silver Bullet entry window occurs between...', options: ['7 AM - 9 AM EST', '9 AM - 10 AM EST', '10 AM - 11 AM EST', '2 PM - 4 PM EST'], answer: 2 },
      { q: 'During the Asian session, ICT traders should primarily...', options: ['Trade aggressively for quick scalps', 'Observe, analyze, and mark levels for the next session', 'Trade reversals from the Asian range', 'Place orders for the London session'], answer: 1 },
    ],
    nextLesson: { id: 20, title: 'Narrative Building' },
    prevLesson: { id: 18, title: 'Institutional Order Flow' },
  },

  20: {
    id: 20,
    title: 'Narrative Building',
    subtitle: 'Constructing the Complete Trade Story Before Price Moves',
    level: 'Advanced',
    duration: '25 min read',
    category: 'Advanced',
    intro: `Narrative building is the highest-level skill in ICT methodology. It is the ability to construct a complete, coherent story about what the algorithm intends to do - before price does it. Not from indicators. Not from patterns. From understanding the current position in the institutional delivery cycle across all relevant timeframes. When you can tell the narrative accurately, trading becomes anticipatory rather than reactive.`,
    sections: [
      {
        title: 'What Is a Trading Narrative?',
        content: `A trading narrative is a complete written or mental story that answers these questions before you place a trade:\n\n• What is the monthly direction and draw on liquidity?\n• What is the weekly direction and draw?\n• What is the daily bias and why?\n• Which AMD phase are we in on each timeframe?\n• What is the session-level sequence expected today?\n• Where is the specific entry, and why is this the correct location?\n• What is the target, and why will price reach it?\n• What would invalidate this narrative?\n\nA narrative is not a gut feeling dressed up in technical language. It is a logical, sequenced argument built from observable price data - from the monthly chart all the way to the 1-minute entry trigger. Every step connects to the next. If any step does not connect logically, the narrative is incomplete and the trade should not be taken.`,
        highlight: '📌 A trading narrative is a logical chain from monthly to entry. Every step must connect. If you cannot explain WHY each element supports the next, the narrative is incomplete - do not trade.',
      },
      {
        title: 'Building the Monthly → Weekly Layer',
        content: `MONTHLY LAYER:\n\nQuestion 1: What is the monthly structure?\nAre monthly candles making Higher Highs / Higher Lows (bullish) or Lower Highs / Lower Lows (bearish)?\n\nQuestion 2: Where is the monthly draw on liquidity?\nWhat is the nearest unswept monthly swing high (BSL) or swing low (SSL)? This is the macro target for the next several months.\n\nQuestion 3: Is price in monthly premium or discount?\nDraw the Fibonacci from the last monthly swing. Is current price above or below the 50% EQ? Premium = sell zone, discount = buy zone.\n\nWEEKLY LAYER:\n\nQuestion 1: Does weekly structure confirm the monthly bias?\nIf monthly is bullish, is weekly also making HH/HL? Confirmation = higher probability. Conflict = stay out.\n\nQuestion 2: Where is the weekly draw on liquidity?\nWhat is the nearest weekly swing high (BSL) or swing low (SSL)? This is the target for the current week.\n\nQuestion 3: What is the weekly AMD phase?\nMonday = accumulation. Tuesday/Wednesday = manipulation or early distribution. Thursday/Friday = primary distribution or reversal. What phase does today fall into?\n\nThese two layers define the macro context that makes or breaks every trade below them.`,
        highlight: '📌 Monthly and weekly layers define the macro context. If they conflict, do not trade. If they confirm, every lower timeframe trade in that direction carries institutional support.',
      },
      {
        title: 'Building the Daily Layer',
        content: `The daily layer is where the specific trading bias for the current day is confirmed or denied:\n\nDAILY STRUCTURE:\nIs the daily chart making HH/HL (bullish) or LH/LL (bearish)? Does this match the weekly and monthly direction?\n\nDAILY DRAW ON LIQUIDITY:\nWhat is the nearest unmitigated daily level? Previous day high (PDH) or previous day low (PDL)? An open daily FVG? A daily OB that has not been returned to? This is today's primary target.\n\nDAILY AMD PHASE:\nWhich phase of the daily AMD cycle are we in?\n• Price near midnight open with minimal movement = Accumulation\n• Price made a false move in one direction = Manipulation (look for the reversal)\n• Price has committed directionally after the false move = Distribution\n\nDAILY PD ARRAY STATUS:\nAre there any open FVGs or OBs on the daily timeframe that price is near? These are high-priority reaction zones that often define the session's key turning point.\n\nAfter completing the daily layer, you should have a specific price zone to watch for the day's primary trade - either a buy zone (FVG/OB in discount) or a sell zone (FVG/OB in premium).`,
        highlight: '📌 The daily layer gives you one specific trade zone for the day - a PD Array in premium or discount that aligns with all higher timeframe analysis. This is where you focus. Nothing else matters.',
      },
      {
        title: 'Building the Session-Level Narrative',
        content: `With the daily layer complete, you now build the session narrative - what specific price sequence do you expect during the trading session?\n\nANTICIPATED SESSION SEQUENCE (BULLISH EXAMPLE):\n\n"Monthly is bullish (making HH/HL). Weekly draw is at last week's high (BSL). Daily structure is bullish with an open bullish FVG at 1.0820-1.0835. Previous day low is at 1.0810 - this is SSL that has not been swept.\n\nExpected London sequence: price sweeps below PDL (1.0810) to collect SSL - this is the Judas Swing. After the sweep, price reverses bullishly. A 5-minute ChoCH above recent structure confirms the reversal. Price returns to the daily FVG at 1.0820-1.0835 for the entry.\n\nExpected NY AM sequence: price enters the bullish FVG during the Silver Bullet window (10-11 AM). A 1-minute displacement candle from the FVG CE confirms entry. Target is the weekly BSL at last week's high. R:R approximately 3.2:1.\n\nInvalidation: If price opens above 1.0835 and the daily FVG is immediately consumed before the entry, the setup is off. Wait for new setup."\n\nThis is a complete session narrative. Every element is identified before the market opens.`,
        highlight: '📌 Write your session narrative before every trading day. "Price will do X because Y, then do Z because W, and I will enter at A targeting B." If you cannot write this, you do not have a setup.',
      },
      {
        title: 'When the Narrative Fails - Invalidation Logic',
        content: `The most important part of narrative building is knowing when your narrative is wrong. Every narrative must have a clearly defined invalidation - a price level or event that, if it occurs, proves the narrative incorrect and requires you to step aside.\n\nCOMMON NARRATIVE INVALIDATIONS:\n\nBullish narrative invalidation:\n• Price breaks below the key swing low that anchors your bullish structure\n• The daily FVG is consumed (price trades completely through it) without reversing\n• A bearish displacement occurs from the daily premium zone without a setup\n• Time passes without the setup forming - the killzone window closes without a trigger\n\nWhen your narrative is invalidated: CLOSE any open positions immediately. Do not argue with the market. Do not widen your stop to "give price more room." The market is telling you your narrative was wrong - believe it.\n\nBuilding this discipline - the willingness to admit you were wrong and exit cleanly - is the psychological foundation of long-term profitability. Every great trader has robust invalidation logic. Every struggling trader has excuses for why their wrong trade might still work.`,
        highlight: '📌 Every narrative MUST have a written invalidation. "If price does X, my narrative is wrong and I close immediately." Trading without invalidation is not analysis - it is hope.',
      },
      {
        title: 'Backtesting Your Narrative Framework',
        content: `The only way to trust your narrative-building skill is to validate it against historical data. Here is a structured backtesting framework for narrative building:\n\nWEEK 1-2: COMPLETED DAILY CANDLE REVIEW:\nGo back 90 days on your target instrument. For each completed trading day, write a retrospective narrative: "Given what the monthly, weekly, and daily showed at the time, what was the correct daily bias? Was there a clear session setup? What was the result?"\n\nWEEK 3-4: REAL-TIME NARRATIVE WRITING (DEMO):\nEvery day before the session opens, write your full narrative as outlined above. Then watch the day unfold and evaluate: How accurate was your sequence prediction? Did the Judas Swing occur as expected? Did the setup form in the killzone?\n\nMONTH 2: FORWARD TESTING:\nContinue writing daily narratives and tracking accuracy. Target: correctly identifying the day's direction 70%+ of trading days. Correctly predicting the session sequence 50%+ of days with a clear setup.\n\nOnce you can consistently write accurate narratives across 30+ trading days, your live trading will improve dramatically - because you will be trading FROM a plan rather than REACTING to price.`,
        highlight: '📌 Backtest your narrative skill: go back 90 days and write retrospective narratives. Then write forward-looking narratives daily. Track accuracy. 70%+ direction accuracy = you are ready to trade the narrative live.',
      },
      {
        title: 'The Narrative vs the Trade',
        content: `An important distinction: the narrative and the trade are separate things.\n\nThe narrative tells you WHAT the algorithm is likely to do.\n\nThe trade is the EXECUTION that occurs when price confirms a specific entry sequence within that narrative.\n\nYou can have a correct narrative (bullish daily bias, Judas Swing expected) and still have no trade - because the specific entry sequence (sweep + ChoCH + FVG entry in killzone) does not materialize that day.\n\nThis is completely fine. The narrative gives you context and patience. It prevents you from taking low-quality trades out of boredom. It keeps you from chasing price that has already left your entry zone.\n\nSome days the narrative is clear but no setup forms. Some days the narrative is uncertain. Some days narrative AND setup are both perfect - these are your A+ days. Trade with maximum conviction on A+ days. Reduce size on A days. Take nothing on B or C days.\n\nNarrative quality and setup quality together determine position sizing. This is how professional traders compound capital consistently while managing risk across varying market conditions.`,
        highlight: '📌 Correct narrative + perfect setup = A+ trade (full size). Correct narrative + mediocre setup = A trade (half size). Unclear narrative = no trade regardless of how good the setup looks.',
      },
      {
        title: 'Full Narrative Walkthrough Example',
        content: `Here is a complete narrative example on XAUUSD (Gold):\n\nMONTHLY: Bullish structure (HH/HL sequence intact). Monthly draw on liquidity is at 2,450 (previous monthly high). Price currently at 2,310 - in monthly discount below the 2,380 equilibrium.\n\nWEEKLY: Bullish structure confirming monthly. Weekly draw is previous week's high at 2,340. Price is in weekly discount.\n\nDAILY: Bullish structure. Open bullish FVG on daily at 2,298-2,305 from Tuesday's displacement. PDL is at 2,291 - SSL that has not been swept.\n\nSESSION NARRATIVE: London will likely sweep below PDL (2,291) to collect SSL. This is the Judas Swing. After sweep, price reverses bullish. NY AM Silver Bullet window sees price return to the daily FVG (2,298-2,305). Entry at FVG CE (2,301.50). Stop below PDL sweep at 2,288. Target: weekly draw at 2,340. R:R = 3.8:1.\n\nINVALIDATION: If price gaps above the FVG on open and closes above 2,308 without reversal, setup is invalidated. Do not chase.\n\nThis is a complete institutional narrative. Written before London opens. Executed during NY AM. Based on alignment from monthly to entry. This is professional ICT trading.`,
        highlight: '📌 Every narrative includes: monthly direction, weekly direction, daily bias, session sequence, entry level and reason, stop level, target level, and invalidation. All seven elements. No exceptions.',
      },
    ],
    quiz: [
      { q: 'A trading narrative must include...', options: ['Only the entry and stop loss', 'Direction on all relevant timeframes, entry, target, and invalidation', 'RSI and MACD readings', 'News events for the week'], answer: 1 },
      { q: 'When your narrative is invalidated, you should...', options: ['Widen your stop and wait', 'Close positions and step aside immediately', 'Add to the losing position', 'Switch to a different timeframe and look for confirmation'], answer: 1 },
      { q: 'A correct narrative with a mediocre setup should be traded at...', options: ['Full position size', 'Reduced position size (half)', 'Zero size - do not trade', 'Double position size to compensate'], answer: 1 },
    ],
    nextLesson: { id: 21, title: 'Quarterly Theory' },
    prevLesson: { id: 19, title: 'Session Timing & Market Hours' },
  },

  21: {
    id: 21,
    title: 'Quarterly Theory & Seasonal Tendencies',
    subtitle: 'Markets Breathe in Quarterly Cycles - The Macro Rhythm That Transforms Your Bias',
    level: 'Advanced',
    duration: '20 min read',
    category: 'Advanced',
    intro: `Just as daily price delivery follows the AMD cycle, and weekly delivery follows a predictable Monday-to-Friday rhythm, the annual market follows a quarterly cycle that institutional traders understand and use to position for the largest moves of the year. Quarterly Theory adds the macro layer that most ICT traders miss - the seasonal and cyclical context that determines whether a daily or weekly setup has the full force of institutional bias behind it.`,
    sections: [
      {
        title: 'The Four Quarters of Every Year',
        content: `Financial markets operate within a framework of quarterly cycles driven by institutional positioning cycles, earnings seasons, central bank meetings, and regulatory reporting requirements. ICT Quarterly Theory maps the typical institutional behavior within each quarter:\n\nQ1 (January - March) - ACCUMULATION:\nThe first quarter is typically when institutions begin establishing positions for the year. Markets often trend relatively cleanly as smart money accumulates in the direction they intend to trade for the year. The January Effect - the tendency for markets to establish their annual direction early in the year - aligns with this Q1 accumulation phase.\n\nQ2 (April - June) - MANIPULATION:\nThe second quarter is often the most dangerous and deceptive of the year. After Q1 has established a trend, Q2 frequently creates counter-trend moves - trapping late-entering retail traders in the wrong direction before the real annual trend reasserts. Major Q2 reversals, false breakouts, and trend violations are characteristic of this quarter.\n\nQ3 (July - September) - DISTRIBUTION:\nThe third quarter sees the primary trend of the year delivered with more commitment. Markets often trend strongly in Q3, particularly after the Q2 manipulation has shaken out weak hands. Summer months can be quieter with lower volume, but the overall direction is typically the clearest of the year.\n\nQ4 (October - December) - REPOSITIONING AND REVERSAL:\nThe fourth quarter involves year-end positioning, profit-taking, and the beginning of positioning for the following year. Major reversals frequently begin in Q4, and the final weeks of the year can be volatile as large institutions close books and smaller players try to front-run next year's themes.`,
        highlight: '📌 Q1 = accumulation (clean trend). Q2 = manipulation (beware reversals and false moves). Q3 = distribution (primary trend delivery). Q4 = repositioning (volatility and potential major reversals).',
      },
      {
        title: 'Q1: The January Effect and Accumulation Logic',
        content: `January is one of the most significant months in the annual institutional calendar. Several factors converge to create strong directional moves:\n\nNEW YEAR POSITIONING:\nFund managers return from holidays with fresh mandates and new capital allocations. The institutional buying or selling that occurs in January frequently establishes the year's primary direction.\n\nTHE JANUARY EFFECT:\nThe tendency for small-cap stocks and risk assets to outperform in January has been documented for decades. From an ICT perspective, this is Q1 accumulation - institutions front-running the year's primary trend before retail traders recognize it.\n\nFEBRUARY CONTINUATION:\nAfter January establishes direction, February typically sees continuation. The Q1 trend is usually the clearest and most reliable of the year.\n\nMARCH CAUTION:\nBy March, the Q1 move is often mature. Prices may have reached significant levels, and the early signs of Q2 manipulation can begin appearing. Reduce position size on late Q1 entries - the best opportunities in Q1 are in January and early February.\n\nPRACTICAL APPLICATION:\nAt the start of each year, use ICT top-down analysis to identify the direction of the Q1 accumulation. If monthly structure is bullish and Q1 is confirming with a strong January, align all your Q1 trading in that direction. The seasonal tailwind dramatically increases probability.`,
        highlight: '📌 January establishes the year\'s direction. Strong bullish January = bullish Q1 bias for all trades. Fade the Q2 manipulation against Q1\'s direction. Resume Q1 direction in Q3.',
      },
      {
        title: 'Q2: Spring Manipulation - The Most Dangerous Quarter',
        content: `Q2 is where the most retail accounts are destroyed. After Q1 establishes a clear trend, retail traders pile in during Q2 - often at the worst possible time, right before Q2 manipulation reverses price dramatically.\n\nWHY Q2 IS DECEPTIVE:\nAfter Q1 accumulation, the primary trend is established and visible. RSI shows momentum. Moving averages confirm the trend. Technical patterns align. Every indicator says the trend continues - and retail traders enter with high conviction just as institutions begin the Q2 manipulation.\n\nQ2 MANIPULATION CHARACTERISTICS:\n• Sharp counter-trend moves that violate Q1 structure\n• False breakouts in the opposite direction of Q1\n• Extreme sentiment readings (either euphoria or panic) at Q2 turning points\n• Major news events that seem to justify the Q2 reversal narrative\n• Q2 reversals frequently reach and sweep the Q1 starting point\n\nTRADING Q2:\nReduce position size significantly in Q2. Expect volatility and counter-trend moves. The best Q2 strategy for most traders is to trade smaller, use tighter stops, and look specifically for Q2 manipulation sweep-and-reverse setups - where price makes a false Q2 breakout in the opposite direction of Q1, then reverses to resume the Q1 direction.`,
        highlight: '📌 Q2 is the most dangerous quarter for trend followers. Reduce size, tighten stops, and look specifically for Q2 sweep-and-reverse setups - false breakouts against Q1\'s direction that immediately reverse.',
      },
      {
        title: 'Monthly Seasonal Tendencies by Pair',
        content: `Beyond the quarterly framework, specific months have historically reliable seasonal tendencies for major forex pairs and instruments:\n\nFOREX SEASONAL PATTERNS:\n• EURUSD: tends to be weak in Q1 and Q3, stronger in Q2 and Q4 in years of dollar weakness\n• GBPUSD: historically stronger in April-May and weaker in September-October\n• USDJPY: tends to be bullish in Q1 (dollar strengthening) and weaker in Q3\n• XAUUSD (Gold): January historically strong, August-September frequently bullish\n\nINDICES SEASONAL PATTERNS:\n• NAS100/SP500: January Effect, summer dip in Q3, year-end rally in Q4 are well-documented\n• "Sell in May and go away" - the tendency for equity weakness between May and October - corresponds to Q2 manipulation and Q3 caution before Q4 repositioning\n\nIMPORTANT CAVEAT:\nSeasonal tendencies are biases - not certainties. They inform your probability framework but do not override your top-down ICT analysis. Use seasonal tendencies as an additional filter: if ICT analysis says bullish AND seasonality says bullish → higher conviction. If they conflict → be cautious.`,
        highlight: '📌 Seasonal tendencies are probability filters - not trading signals. Use them to add or reduce conviction in your ICT analysis, never as standalone reasons to enter or exit trades.',
      },
      {
        title: 'Integrating Quarterly Theory into Your Analysis',
        content: `Adding Quarterly Theory to your ICT analysis creates a five-layer framework:\n\n1. QUARTERLY LAYER (macro bias):\nWhich quarter are we in? What is the expected institutional behavior for this quarter? Does this quarter confirm or conflict with the annual trend?\n\n2. MONTHLY LAYER:\nMonthly structure and draw on liquidity (as previously discussed)\n\n3. WEEKLY LAYER:\nWeekly structure and draw on liquidity\n\n4. DAILY LAYER:\nDaily bias and specific trade zone\n\n5. SESSION LAYER:\nEntry execution during killzone\n\nA trade with quarterly, monthly, weekly, and daily all aligned in the same direction represents the highest institutional confluence possible - the equivalent of all major institutional timeframes pointing the same way simultaneously. These trades, when the entry setup also forms correctly, are among the most powerful in the entire ICT framework.\n\nPRACTICAL IMPLEMENTATION:\nAt the start of each quarter, take 30 minutes to assess: What quarter are we entering? What was Q1's direction (if applicable)? Does current price action confirm the quarterly bias? How does this affect my monthly and weekly analysis? Update your macro bias document and refer to it before every trading week.`,
        highlight: '📌 Five-layer framework: Quarterly → Monthly → Weekly → Daily → Session. When all five align, position sizing should be maximum. When quarterly and monthly conflict with weekly and daily, reduce size significantly.',
      },
    ],
    quiz: [
      { q: 'Which quarter is typically the most deceptive and dangerous for trend followers?', options: ['Q1', 'Q2', 'Q3', 'Q4'], answer: 1 },
      { q: 'Q1 is primarily characterized by...', options: ['Volatility and reversals', 'Institutional accumulation and trend establishment', 'Distribution and delivery', 'Year-end repositioning'], answer: 1 },
      { q: 'How should seasonal tendencies be used in ICT analysis?', options: ['As the primary trading signal', 'To override ICT analysis when they conflict', 'As an additional probability filter alongside ICT analysis', 'Only for equity markets, not forex'], answer: 2 },
    ],
    nextLesson: { id: 22, title: 'Liquidity Voids & Gaps' },
    prevLesson: { id: 20, title: 'Narrative Building' },
  },

  22: {
    id: 22,
    title: 'Liquidity Voids & Gaps',
    subtitle: 'The Invisible Zones Price Is Magnetically Drawn to Fill',
    level: 'Intermediate',
    duration: '16 min read',
    category: 'PD Arrays',
    intro: `Every gap on a price chart represents a zone where the market never traded at equilibrium - where price jumped from one level to another without the normal two-sided participation that characterizes healthy price delivery. These gaps create institutional obligations - zones where unfilled orders remain and where the algorithm is programmed to return and reprice. Understanding liquidity voids and gaps is understanding some of the most reliable Draw on Liquidity targets available.`,
    sections: [
      {
        title: 'Liquidity Voids vs Fair Value Gaps - Key Distinction',
        content: `ICT traders sometimes use "liquidity void" and "Fair Value Gap" interchangeably, but they have distinct characteristics:\n\nFAIR VALUE GAP (FVG):\nA three-candle formation where the high of candle 1 does not overlap with the low of candle 3 (bullish FVG) or vice versa (bearish FVG). The gap represents the specific zone of price imbalance between two adjacent candles in the sequence.\n\nLIQUIDITY VOID:\nA larger zone where price moved so aggressively - typically in a single large candle or a rapid sequence - that an entire section of the chart was covered without any meaningful trading. Unlike an FVG, a liquidity void spans the entire body of the aggressive candle, not just the gap between adjacent candles.\n\nPRACTICAL DIFFERENCE:\nFVGs are more precisely defined and easier to identify - they have clear upper and lower boundaries between two specific candles. Liquidity voids are more expansive - the entire body of the displacement candle represents a zone of price inefficiency.\n\nBoth types share the same core characteristic: price passed through them without adequate two-sided participation, and the algorithm will return to reprice them eventually.`,
        highlight: '📌 FVGs are precise (gap between candle 1 high and candle 3 low). Liquidity voids are expansive (the full body of a displacement candle). Both must be repriced - the FVG more precisely, the void more broadly.',
      },
      {
        title: 'Weekend Gaps (NWOG) - New Week Opening Gap',
        content: `The New Week Opening Gap (NWOG) forms every Sunday when the forex market reopens after the weekend. If price closed Friday at 1.0820 and opened Sunday at 1.0850, a 30-pip gap has formed. This gap is a powerful Draw on Liquidity - the algorithm is highly likely to fill this gap at some point during the trading week.\n\nWHY NWOG FORMS:\nWeekend news, central bank announcements, geopolitical events, and Asian session activity before the Western market fully opens can cause price to gap from Friday's close.\n\nNWOG TRADING LOGIC:\nBullish NWOG (opened higher than Friday close): The zone BELOW the Sunday open (from Friday close to Sunday open) is a zone the algorithm must return to fill. This creates Sell-Side Liquidity in the gap zone - price will typically trade back into this gap at some point during the week before continuing higher (or reversing).\n\nBearish NWOG (opened lower than Friday close): The zone ABOVE the Sunday open is a void that attracts price higher - BSL in the gap zone.\n\nTIMING OF NWOG FILLS:\nNWOG fills frequently occur during Monday or Tuesday of the gap week. However, gaps can remain open for several weeks before being filled. Do not predict exact timing - just note the NWOG as a significant IRL target on your weekly analysis.`,
        highlight: '📌 Mark the NWOG every Sunday. The gap between Friday close and Sunday open is a powerful IRL target that the algorithm will fill at some point during the week - typically within the first few days.',
      },
      {
        title: 'Daily Opening Gaps (NDOG) - New Day Opening Gap',
        content: `The New Day Opening Gap (NDOG) forms at the start of each trading day when price opens significantly different from the previous day's close. On forex, this is most visible at the 5 PM EST daily candle open.\n\nNDOG MECHANICS:\nIf yesterday closed at 1.0830 and today opens at 1.0845, a 15-pip gap exists. This gap represents unfilled institutional orders between those two levels. The algorithm will typically fill this gap during the Asian session or early London session before committing to the day's directional delivery.\n\nNDOG AS A TRADE TARGET:\nWhen a NDOG exists, it frequently becomes the first target of the day. In a bullish scenario:\n• Daily opens higher than previous close (bullish NDOG)\n• The gap zone below the open (from previous close to today's open) is SSL\n• London's Judas Swing frequently sweeps into this gap zone\n• After the NDOG fill, the real bullish delivery begins\n\nNDOG AS AN ENTRY LEVEL:\nFor the more advanced practitioner, the NDOG fill zone itself can serve as an entry - particularly when it aligns with an open FVG or OB on the 1-hour or 4-hour chart within the same price area.\n\nTRADE MANAGEMENT WITH GAPS:\nWhen you have an open position and a NWOG or NDOG exists in the opposite direction of your trade, it creates a realistic target for a counter-move. Factor gap levels into your stop placement - do not place stops inside gap zones where price is likely to trade.`,
        highlight: '📌 The NDOG frequently gets filled during Asian session or early London before the day\'s real direction commits. Mark it every day and factor it into your session narrative.',
      },
      {
        title: 'Void Fill Patterns - Full vs Partial',
        content: `Not all voids and gaps fill completely before price continues. Understanding the difference between full fills and partial fills helps you manage entries and exits:\n\nFULL FILL:\nPrice returns to the gap or void and trades completely through it - from the near edge to the far edge. After a full fill, the zone is typically neutralized and price continues in the pre-fill direction (or establishes a new direction from the far edge).\n\nPARTIAL FILL (50% or CE Fill):\nPrice returns to the gap and fills to approximately the midpoint (Consequent Encroachment), then reverses. This is more common with FVGs - price fills to the CE and immediately reacts as institutional orders at the CE level are triggered.\n\nNO FILL (Immediate Continuation):\nPrice occasionally gaps and continues in the gap direction without returning to fill. This is more common with extremely bullish or bearish commitment moves - when institutional delivery is so aggressive that the algorithm does not reprice the gap immediately. These gaps remain open as future IRL targets.\n\nPRACTICAL APPLICATION:\nWhen price approaches a void or gap from a direction that aligns with your bias, expect a partial fill to CE as the primary entry zone. Full fills into a PD Array below/above the gap are secondary entries. Entering after a full fill that completely fills the gap reduces risk but also significantly reduces profit potential.`,
        highlight: '📌 Gaps frequently fill to the 50% midpoint (CE) before reacting. Enter at the CE within a gap when it aligns with your HTF bias and a nearby PD Array. A full fill that violates the far edge often signals trend change.',
      },
      {
        title: 'Trading Into and Out of Voids',
        content: `Integrating void and gap analysis into your ICT trading process:\n\nBEFORE THE SESSION:\n1. Mark any open NWOG from Sunday (if applicable)\n2. Mark the previous day close vs today\'s open (NDOG if gap exists)\n3. Note all open daily and 4-hour FVGs that haven't been filled\n4. Determine which gaps are in the direction of your daily bias (IRL targets) and which are opposing (potential obstacles or alternative targets)\n\nDURING THE SESSION:\n• If price approaches a gap in your trade direction, watch for the partial fill reaction at the CE\n• If price approaches a gap that opposes your existing position, prepare for potential reversal or partial profit taking\n• Gaps below a rising market are bullish support zones. Gaps above a falling market are bearish resistance zones.\n\nEXIT MANAGEMENT USING GAPS:\nOne of the most useful applications of gap analysis is scaling out of winning positions as they approach opposing gaps. If you are long and an open bearish FVG exists 20 pips above current price, take a portion of profits before price reaches that FVG - it represents a zone where price may stall or temporarily reverse before continuing.`,
        highlight: '📌 Use gaps as both entry zones (fill-and-reverse setups) and exit management tools (scale out as you approach opposing gaps). They define the path of least resistance between current price and the DOL.',
      },
    ],
    quiz: [
      { q: 'A New Week Opening Gap (NWOG) forms when...', options: ['Price breaks a weekly high', 'The forex market opens Sunday at a different price than Friday\'s close', 'Monthly candles overlap', 'The Asian session closes'], answer: 1 },
      { q: 'The CE (Consequent Encroachment) of a gap is...', options: ['The top of the gap', 'The bottom of the gap', 'The exact 50% midpoint of the gap', 'The original closing price before the gap'], answer: 2 },
      { q: 'A NDOG (New Day Opening Gap) is most frequently filled during...', options: ['The New York PM session', 'The Asian or early London session', 'The NYSE open at 9:30 AM', 'Friday afternoon'], answer: 1 },
    ],
    nextLesson: { id: 23, title: 'Time & Price Theory' },
    prevLesson: { id: 21, title: 'Quarterly Theory' },
  },

  23: {
    id: 23,
    title: 'Time & Price Theory',
    subtitle: 'The Algorithm Delivers Price to Specific Levels at Specific Times - Master Both Dimensions',
    level: 'Advanced',
    duration: '22 min read',
    category: 'Advanced',
    intro: `Most traders analyze price. Advanced ICT practitioners analyze price AND time simultaneously. ICT's core thesis is that the algorithm delivers price to specific targets at specific times - not randomly throughout the day. The 8 Macro Time Windows are the precise moments when the algorithm is most likely to initiate, accelerate, or reverse price delivery. Once you align your entries with these windows, the timing of your trades transforms from guesswork into systematic precision.`,
    sections: [
      {
        title: 'The Time-Price Matrix',
        content: `The Time-Price Matrix is the concept that price and time are not independent variables - they are linked. The algorithm does not deliver price to a specific level whenever conditions are "right." It delivers price to specific levels WHEN the scheduled delivery time arrives AND conditions are aligned.\n\nThis means:\n• A valid FVG or OB entry at 3:00 AM EST (outside killzone) is lower probability than the identical pattern at 10:00 AM EST (inside the Silver Bullet window)\n• A correct daily bias with no killzone trigger is not a trade - it is an observation\n• Price moving toward your target outside a delivery window should make you cautious, not excited\n\nThe practical implication is profound: before every potential entry, ask not just "is the setup valid?" but "is it the right TIME for this setup to deliver?" The combination of valid PD Array + discount/premium + killzone timing is exponentially more powerful than any two elements alone.`,
        highlight: '📌 The Time-Price Matrix: valid setup + wrong time = lower probability. Valid setup + correct killzone time = highest probability. Time is not a secondary filter - it is a co-primary entry criteria.',
      },
      {
        title: 'The 8 Macro Time Windows',
        content: `ICT identifies 8 specific time windows during which the algorithm is most likely to initiate significant price moves. These are NOT guaranteed - they are statistical windows of highest institutional activity:\n\n2:33 AM EST - LONDON OPEN MACRO:\nThe precise moment the London institutional flow begins. Setups forming within 15 minutes of this time, in the direction of the day's bias, have high delivery probability.\n\n4:03 AM EST - LONDON MID-MORNING:\nA secondary London delivery window after the initial Judas Swing has typically completed. Price is usually committed to the day's direction by this point.\n\n8:50 AM EST - PRE-NEW YORK:\nThe 10-minute window before the NYSE open. Institutional positioning for the NY session. Often coincides with sharp moves that establish the NY AM direction.\n\n9:10 AM EST - NEW YORK OPEN:\nImmediately following the NYSE open at 9:30 AM, the 9:10 AM window begins positioning. Combined with the NYSE open surge, this is the beginning of the highest-volume window of the day.\n\n10:00 AM EST - SILVER BULLET MACRO:\nThe primary Silver Bullet window begins. This is the single highest-probability entry time in all of ICT methodology.\n\n10:50 AM EST - MID-MORNING NY:\nA secondary window as the primary NY AM move matures. Good for partial profit exits and potential reversal entries if the morning move is complete.\n\n11:10 AM EST - NOON MACRO:\nThe pre-lunch window. Often sees brief positioning moves before the London Close and NY lunch period begins.\n\n1:10 PM EST - LONDON CLOSE MACRO:\nEuropean traders exiting positions creates a predictable repositioning move. Often the trigger for the NY PM counter-trend setup.`,
        highlight: '📌 The Silver Bullet window (10:00-11:00 AM EST) is the single most reliable macro window. Plan your primary trade around this window. Use other macro times for secondary setups or position management.',
      },
      {
        title: 'Time-Based Reversals - Price Changing at the Clock',
        content: `One of ICT's most powerful (and initially shocking) observations is that significant price reversals frequently occur within minutes of the macro time windows - even without any obvious price action catalyst.\n\nYou will observe: price trending in one direction, then precisely at 10:00 AM, it reverses. No news. No breakout. No obvious trigger. The reversal occurs because the algorithm has reached its scheduled delivery time for the opposite move.\n\nHOW TO USE TIME-BASED REVERSALS:\n\nStep 1: Note the macro time approaching (e.g., 10:00 AM Silver Bullet)\nStep 2: Observe what price has done leading up to the macro time (was there a sweep? A false move?)\nStep 3: At the macro time, watch the 1-minute chart for a displacement candle or ChoCH\nStep 4: If a 1-minute structure shift occurs within 3-5 minutes of the macro time, it is a strong time-based reversal signal\nStep 5: Enter on the retracement into the 1-minute FVG that forms after the initial reversal candle\n\nThe combination of a significant liquidity sweep immediately before a macro time window, followed by a 1-minute structure break at the macro time, is one of the highest-probability entry patterns in all of ICT.`,
        highlight: '📌 Watch for liquidity sweeps immediately BEFORE macro time windows. When a sweep completes just before 10:00 AM and a 1-minute ChoCH occurs at exactly 10:00 AM - this is the Silver Bullet setup in its purest form.',
      },
      {
        title: 'The 20-Minute Rule',
        content: `ICT's "20-Minute Rule" is an observation about institutional price delivery timing that has significant practical value:\n\nTHE RULE: After a significant reversal or new directional move begins, the first 20 minutes following the initiation candle frequently determines the session's primary direction. If price has not established commitment within 20 minutes of the reversal, the move is weaker than initially apparent.\n\nAPPLICATION IN TRADING:\n\nScenario: The Silver Bullet window opens at 10:00 AM. A liquidity sweep occurs at 9:58 AM. At 10:00 AM, a strong bullish reversal candle forms.\n\nUsing the 20-minute rule: if price has not created a clear HH on the 1-minute chart by 10:20 AM, the bullish commitment is questionable. Either the narrative was wrong or this was a counter-trend bounce, not the primary delivery.\n\nThis rule helps prevent "slow death" trades - positions where price moves tentatively in your direction without commitment, eventually stopping you out as the real move goes the other way. If your trade isn't showing momentum within the first 20 minutes, reassess.`,
        highlight: '📌 The 20-Minute Rule: after a reversal signal, price should show directional commitment within 20 minutes. No momentum after 20 minutes = reassess your narrative. Close or reduce if commitment is absent.',
      },
      {
        title: 'Using Time to Predict Price',
        content: `The most advanced application of ICT time theory is using time ALONE to anticipate price moves - without looking at chart patterns first.\n\nTHE PROCESS:\n\n1. Note which macro window is approaching (e.g., 2:33 AM London open)\n2. Based on your daily bias (bullish), determine what should happen at the London open:\n   • Bullish daily bias → London open should see SSL sweep below Asian Low\n   • After the sweep → bullish reversal begins\n3. Set an alert for 2:30 AM (3 minutes before the macro)\n4. When the alert fires, immediately look for:\n   • Is price near the Asian Low? (potential sweep setup)\n   • Has a sudden move lower occurred to sweep below it?\n   • Is there a 1-minute displacement to the upside forming?\n5. If yes → this is your London open entry sequence. Execute.\n\nThe power of this approach: you are not reacting to price. You are PREPARED for a specific price action sequence at a specific time. Your execution is faster. Your conviction is higher. Your stop placement is more precise.\n\nThis is the difference between watching a movie and directing one - ICT time theory makes you the director.`,
        highlight: '📌 Advanced application: use time to PREDICT the price sequence. Know which macro window is next. Know your daily bias. Know what price sequence that bias expects at that macro time. Be ready before it happens.',
      },
    ],
    quiz: [
      { q: 'The single highest-probability macro time window is...', options: ['2:33 AM London Open', '8:50 AM Pre-New York', '10:00 AM Silver Bullet', '1:10 PM London Close'], answer: 2 },
      { q: 'The 20-Minute Rule states that after a reversal signal...', options: ['You must wait 20 minutes before entering', 'Price should show directional commitment within 20 minutes', 'The trade is valid for exactly 20 minutes', 'Stops should be set 20 pips away'], answer: 1 },
      { q: 'In the Time-Price Matrix, a valid setup at the wrong time...', options: ['Has the same probability as at the correct time', 'Has higher probability because institutions are absent', 'Has lower probability due to reduced institutional participation', 'Should always be taken'], answer: 2 },
    ],
    nextLesson: { id: 24, title: 'Turtle Soup & Stop Hunts' },
    prevLesson: { id: 22, title: 'Liquidity Voids & Gaps' },
  },

  24: {
    id: 24,
    title: 'Turtle Soup & Stop Hunts',
    subtitle: 'Engineering False Breakouts - The Most Reliable Reversal Pattern in ICT',
    level: 'Intermediate',
    duration: '18 min read',
    category: 'Strategy',
    intro: `The Turtle Soup is named after the "Turtle Trader" breakout strategy - a system that buys new 20-day highs and sells new 20-day lows. ICT's Turtle Soup is designed to trade AGAINST turtle traders - to catch the reversal immediately after price takes out an obvious high or low and fails to continue in the breakout direction. It is one of the most consistently reliable setups in the entire ICT framework because it is based on the single most predictable institutional behavior: sweeping retail stop orders before reversing.`,
    sections: [
      {
        title: 'Why Turtle Soup Works',
        content: `The Turtle Soup works because it is based on the most fundamental truth in ICT: institutions need liquidity to fill positions, and retail stop orders are the most accessible liquidity in the market.\n\nHere is the institutional sequence that creates every Turtle Soup:\n\n1. An obvious high or low exists on the chart (equal highs, recent swing high, previous week high)\n2. Retail breakout traders are watching this level - they will buy if price breaks above or sell if price breaks below\n3. Retail protection traders (who are long below resistance) have stop losses just above that same high\n4. Institutions need SELL orders to fill their short position - retail breakout buys and stop-loss sells from trapped longs are both SELL orders for the institution to buy against\n5. Institution pushes price slightly above the high, triggering every retail buy and every stop on longs\n6. With position now filled, institution reverses price sharply downward\n7. The breakout buyers and the trapped longs are all now in losing positions\n\nThis sequence repeats on every timeframe, every day. The Turtle Soup is trading on the CORRECT side of this sequence - positioning short after the sweep completes, not long during it.`,
        highlight: '📌 Turtle Soup logic: institutions sweep obvious highs/lows to collect liquidity. Your job is to identify that the sweep is likely, wait for it to complete, confirm the reversal, then enter in the opposite direction.',
      },
      {
        title: 'Identifying Turtle Soup Setup Conditions',
        content: `Not every stop hunt is a Turtle Soup. The highest-probability Turtle Soup setups share these characteristics:\n\nCRITERION 1 - OBVIOUS LEVEL:\nThe level being swept must be obvious to retail traders. Equal Highs (EQH) are ideal - they represent textbook double-top patterns that retail traders short with stops above. Previous swing highs that multiple people are watching are ideal. The more "obvious" the level, the more retail orders cluster around it, and the more significant the sweep.\n\nCRITERION 2 - HTF ALIGNMENT:\nThe Turtle Soup direction must align with the higher timeframe bias. A bearish Turtle Soup (sweeping EQH and reversing lower) must occur within a bearish higher timeframe context - bearish daily bias, in a premium zone, with a bearish draw on liquidity below. Without HTF alignment, the sweep may not reverse - it may be a genuine breakout.\n\nCRITERION 3 - KILLZONE TIMING:\nTurtle Soup setups in killzone hours (London, NY AM) have significantly higher delivery probability than those outside killzones. The London Judas Swing is frequently a Turtle Soup of the Asian High or Asian Low.\n\nCRITERION 4 - DISPLACEMENT REVERSAL:\nAfter the sweep, a genuine Turtle Soup shows immediate displacement in the opposite direction - multiple large candles with FVGs, not a tentative, slow reversal. The immediate reversal confirms institutional commitment to the opposite direction.`,
        highlight: '📌 Best Turtle Soup conditions: obvious EQH/EQL level + HTF alignment + killzone timing + immediate displacement reversal after sweep. All four = A+ setup. Missing any reduces probability.',
      },
      {
        title: 'Entry Logic After the Sweep',
        content: `The common mistake when trading Turtle Soup is entering immediately at the moment of the sweep - jumping in short the moment price takes out the high. This often results in getting swept yourself if the initial violation continues further before the real reversal begins.\n\nTHE CORRECT ENTRY SEQUENCE:\n\nStep 1 - WAIT FOR THE SWEEP TO COMPLETE:\nDo not enter as price is breaking above the high. Wait for the sweep candle to close back below the original level, or wait for a distinct reversal candle to form.\n\nStep 2 - CONFIRM WITH LTF STRUCTURE BREAK:\nDrop to the 1-minute or 5-minute chart. Wait for a bearish ChoCH (for a bearish Turtle Soup) - price must break below a recent 1-minute high to confirm that the reversal has begun and the sweep is complete.\n\nStep 3 - ENTER ON THE FIRST FVG AFTER THE REVERSAL:\nAfter the 1-minute ChoCH, price will usually pull back briefly before continuing lower. This creates a 1-minute bearish FVG that represents your entry zone. A limit order at the CE of this FVG is the precision Turtle Soup entry.\n\nStep 4 - STOP ABOVE THE SWEEP WICK:\nPlace the stop above the highest point of the sweep wick - not at the original level, above the full wick. The stop must be above the maximum sweep point to avoid being hit on any lingering wicks.\n\nStep 5 - TARGET = NEXT SSL:\nThe take-profit is the next significant Sell-Side Liquidity pool below price - the nearest EQL, previous swing low, or daily draw on liquidity.`,
        highlight: '📌 Turtle Soup entry sequence: wait for sweep → 1-minute ChoCH confirms reversal → enter at first 1-minute FVG after ChoCH → stop above sweep wick → target next SSL. This is the complete execution blueprint.',
      },
      {
        title: 'Turtle Soup on Multiple Timeframes',
        content: `Turtle Soup setups exist on every timeframe, but each timeframe produces setups of different quality and holding time:\n\n4-HOUR TURTLE SOUP:\nThe most powerful. A sweep of a significant 4-hour equal high or swing high, followed by a 4-hour ChoCH, sets up a multi-day trade targeting the next major SSL. These occur less frequently but produce the largest R multiples.\n\n1-HOUR TURTLE SOUP:\nThe standard working timeframe for most ICT traders. A sweep of an obvious 1-hour level during a killzone, reversed by a 1-hour ChoCH, typically delivers 2-4R during the session.\n\n15-MINUTE TURTLE SOUP:\nUseful for identifying the day's Judas Swing pattern. A 15-minute equal high sweep during London that immediately reverses is a classic London Turtle Soup - one of the most frequently occurring and reliable patterns.\n\n5-MINUTE AND 1-MINUTE TURTLE SOUP:\nThese occur constantly but have lower individual significance. They are most useful as entry confirmation on a higher timeframe setup - a 1-minute Turtle Soup confirming a reversal from a 1-hour OB is a confluence entry, not a standalone trade.`,
        highlight: '📌 4-hour Turtle Soups produce the largest moves. 1-hour Turtle Soups are the primary working setup. 15-minute confirms session reversals. 1-minute and 5-minute are entry triggers, not standalone setups.',
      },
      {
        title: 'Common Turtle Soup Errors',
        content: `ERROR 1 - ENTERING ON THE SWEEP ITSELF:\nBuying/selling the moment price breaks the obvious level, hoping for the reversal before it is confirmed. Price frequently extends further before reversing - this early entry gets stopped out and then watches the real trade work without them.\n\nERROR 2 - NO HTF CONFIRMATION:\nTaking a Turtle Soup against the higher timeframe trend. A bullish Turtle Soup (sweeping EQL and reversing higher) during a bearish daily bias is counter-trend. Without HTF alignment, many "Turtle Soups" are actually continuation stop hunts that continue in the sweep direction.\n\nERROR 3 - IGNORING THE DISPLACEMENT QUALITY:\nA genuine Turtle Soup has immediate, explosive displacement in the reversal direction. If price reverses tentatively - small candles, overlapping ranges - the sweep may not be institutional. Wait for genuine displacement before committing.\n\nERROR 4 - WRONG LEVEL:\nNot every high or low is a Turtle Soup candidate. The level must have significant retail attention - visible EQH/EQL, a widely-watched swing high, a round number. Sweeping a random internal high has no institutional significance.\n\nERROR 5 - STOP INSIDE THE SWEEP WICK:\nPlacing the stop at the original level (not above the wick). Price frequently wicks further than the initial sweep before reversing. The stop must be above the absolute high of the wick.`,
        highlight: '📌 The three fatal Turtle Soup mistakes: entering on the sweep (not after confirmation), taking it counter to HTF bias, and placing the stop inside the wick instead of above it.',
      },
    ],
    quiz: [
      { q: 'A Turtle Soup setup requires HTF alignment because...', options: ['It looks cleaner on the chart', 'Without HTF support, sweeps may be genuine breakouts rather than reversals', 'The London session only trades with HTF direction', 'Retail traders cannot see HTF charts'], answer: 1 },
      { q: 'The correct Turtle Soup entry occurs...', options: ['The moment price breaks the obvious level', 'After the sweep + 1-minute ChoCH + retracement into 1-minute FVG', 'At the original high/low level', 'During the Asian session after a quiet night'], answer: 1 },
      { q: 'Where should the stop loss be placed on a Turtle Soup?', options: ['At the original resistance level', 'Inside the sweep wick at the halfway point', 'Above the highest point of the entire sweep wick', '50 pips above the entry'], answer: 2 },
    ],
    nextLesson: { id: 25, title: 'Judas Swing & AMD Deep Dive' },
    prevLesson: { id: 23, title: 'Time & Price Theory' },
  },

  25: {
    id: 25,
    title: 'Judas Swing & AMD Deep Dive',
    subtitle: 'The Betrayal Move That Sets Up Every Day\'s Best Trade',
    level: 'Intermediate',
    duration: '20 min read',
    category: 'Strategy',
    intro: `The Judas Swing is named deliberately - it is a betrayal. A false move in the wrong direction that deceives retail traders into positioning opposite to the day's real institutional delivery. Understanding the Judas Swing is understanding the Manipulation phase of AMD in its most practical and tradeable form. Once you can identify it in real time, you are no longer the one being betrayed - you are the one positioned to profit from those who are.`,
    sections: [
      {
        title: 'What Is the Judas Swing?',
        content: `The Judas Swing is the false initial move of a session - a temporary movement in the opposite direction of the day's true institutional delivery. It is the Manipulation phase of AMD made visible on the intraday chart.\n\nHere is the daily AMD context:\n• Accumulation: Asian session, price builds a range\n• Manipulation: London open, Judas Swing - false move to collect liquidity\n• Distribution: NY AM, real directional delivery toward the day's target\n\nThe Judas Swing is what makes London so deceptive. Breakout traders who follow London's initial direction are on the wrong side of the trade - they entered during the manipulation, not the distribution.\n\nKEY INSIGHT: The Judas Swing reveals the day's true direction by its failure. If price breaks lower during London (bearish Judas Swing) and immediately reverses, the TRUE direction for the day is BULLISH. The downward move existed only to collect SSL before the real bullish delivery.\n\nThis is why ICT traders do not trade the London open direction - they trade the London REVERSAL direction after the Judas Swing is confirmed.`,
        highlight: '📌 The Judas Swing reveals true direction by its failure. If the false move goes DOWN, the real move goes UP. Trade the REVERSAL of the Judas, not the initial move with it.',
      },
      {
        title: 'London Judas Swing Anatomy',
        content: `The London Judas Swing is the most common and tradeable form. Here is the complete anatomy:\n\nPHASE 1 - ASIAN RANGE FORMATION:\nDuring the Asian session (7 PM-12 AM EST), price oscillates within a range. The Asian High and Asian Low define the liquidity targets for the London Judas.\n\nPHASE 2 - LONDON OPEN (2:00-2:30 AM EST):\nAs London opens, price makes an initial move - usually in the direction that seems to continue the prior trend or break out of the Asian range.\n\nPHASE 3 - THE JUDAS MOVE:\nPrice sweeps either the Asian High (bullish Judas → bearish reversal day) or the Asian Low (bearish Judas → bullish reversal day). This sweep collects BSL or SSL from the Asian range.\n\nPHASE 4 - THE REVERSAL:\nAfter the sweep, price immediately reverses. A displacement move in the opposite direction begins. A ChoCH forms on the 5-minute or 15-minute chart - this is the first confirmation that the Judas is complete.\n\nPHASE 5 - RETRACEMENT ENTRY:\nAfter the initial reversal displacement, price retraces into the first FVG created by the reversal move. This is the Judas Swing entry - buy the pullback into the FVG after confirmation.\n\nPHASE 6 - DELIVERY:\nPrice delivers to the day's target - typically the opposite end of the Asian range and beyond toward the daily draw on liquidity.`,
        highlight: '📌 Judas Swing entry: wait for Asian range sweep → initial reversal displacement → 5-minute ChoCH → retracement into first FVG of the reversal → enter with stop below sweep wick.',
      },
      {
        title: 'NY AM Judas Swing Patterns',
        content: `The Judas Swing also occurs during the New York AM session, particularly around the NYSE open at 9:30 AM EST:\n\nTYPE 1 - PRE-MARKET JUDAS:\nDuring the period from 8:00-9:30 AM, price makes a false move against the daily bias. This sweeps pre-market stop orders and liquidity before the real move begins with the NYSE open.\n\nTYPE 2 - OPEN REVERSAL:\nAt 9:30 AM, price spikes in one direction for the first few minutes - creating what appears to be the day's opening direction. Within 15-20 minutes, this initial move reverses into the real directional delivery of the NY AM session.\n\nTYPE 3 - SILVER BULLET JUDAS (10 AM):\nAt the 10:00 AM macro window, price sometimes makes a brief false move immediately before the Silver Bullet entry. This is a miniature Judas Swing within the NY AM session - a final stop hunt before the primary 10 AM delivery begins.\n\nHOW TO DISTINGUISH JUDAS FROM REAL MOVE:\n• Judas moves are typically fast and aggressive on LOW relative volume compared to the reversal that follows\n• The reversal after a Judas has LARGER candles and more FVGs than the Judas itself\n• A real directional move does not immediately reverse when it takes out an obvious liquidity level\n• The Judas move rarely creates a clear BOS - it sweeps and fails`,
        highlight: '📌 The key distinction: a Judas move takes out an obvious liquidity level and immediately reverses. A real directional move takes out the same level and CONTINUES with larger displacement candles.',
      },
      {
        title: 'How Far the Manipulation Extends',
        content: `One of the most common Judas Swing questions: how far will the false move go before reversing?\n\nThe Judas Swing typically extends to one of these levels:\n\nTARGET 1 - ASIAN RANGE HIGH/LOW:\nThe most common Judas target. The Asian High or Low is the nearest significant liquidity pool and the most frequently swept level in London.\n\nTARGET 2 - PREVIOUS DAY HIGH/LOW:\nIf price has already swept the Asian range from the opposite side, the Judas may extend to the PDH or PDL.\n\nTARGET 3 - A SIGNIFICANT FVG OR OB:\nThe Judas frequently ends precisely when it reaches and partially fills a daily or 4-hour FVG - then reverses from that zone.\n\nTARGET 4 - EQUAL HIGHS/LOWS:\nVisible EQH or EQL above/below the Asian range are powerful Judas targets.\n\nTIMING AS A GUIDE:\nThe London Judas typically completes within the first 60-90 minutes of the London open (2:00-4:00 AM EST). If price has been falling for more than 90 minutes from the London open, the move may not be a Judas - it may be the real direction.\n\nIf you cannot identify the Judas completion within the first 90 minutes, the day's direction is less clear - reduce expectations and wait for NY AM confirmation.`,
        highlight: '📌 If the London move hasn\'t reversed within 90 minutes, it may not be a Judas - it may be the real direction. Do not hold Judas reversal trades for more than 90 minutes after London open without seeing reversal displacement.',
      },
      {
        title: 'Entries After Judas Completion',
        content: `Three entry approaches for the Judas Swing reversal, ranging from most aggressive to most conservative:\n\nENTRY 1 - AGGRESSIVE (Sweep + LTF Candle):\nEnter immediately when a reversal candle forms at the Judas target - before a formal LTF structure break. Higher risk (may not be the real reversal) but better price if correct.\n\nENTRY 2 - MODERATE (Sweep + 5M ChoCH + Retracement):\nWait for the Judas sweep → wait for a 5-minute ChoCH in the reversal direction → enter on the first retracement into the 5-minute FVG after the ChoCH. This is the standard ICT Judas Swing entry - balances risk and reward.\n\nENTRY 3 - CONSERVATIVE (Full Confirmation + Continuation):\nWait for the full 5-minute structure to shift → wait for a pullback to the 15-minute or 1-hour FVG from the initial reversal move → enter on the second push in the reversal direction. Lowest risk, smallest R:R, best for beginners.\n\nSTOP PLACEMENT FOR ALL ENTRIES:\nStop goes below the absolute low of the Judas wick (for bullish reversal) or above the absolute high (for bearish reversal). Never inside the wick.\n\nTARGET PLACEMENT:\nFirst target: Previous day high (for bullish reversal) or previous day low (for bearish reversal). Second target: weekly draw on liquidity.`,
        highlight: '📌 Three Judas entries: aggressive (immediate reversal candle), moderate (5M ChoCH + FVG retracement), conservative (15M/1H FVG retracement). All have stop beyond the sweep wick. All target the daily/weekly draw.',
      },
      {
        title: 'Confirming Judas vs Real Breakout',
        content: `The most critical skill with Judas Swing analysis is distinguishing a genuine Judas (manipulation) from a genuine breakout (the real direction).\n\nSIGNS OF A GENUINE JUDAS (MANIPULATION):\n• Price breaks the level quickly and aggressively but closes back below it within 1-3 candles on the 5-minute chart\n• Volume on the false move is lower than volume on the reversal\n• The reversal produces larger candles and FVGs than the initial move\n• The false move stopped at an obvious PD Array (OB, FVG, or round number)\n• The false move aligns with the expected Judas direction given your daily bias\n\nSIGNS OF A GENUINE BREAKOUT (REAL DIRECTION):\n• Price breaks the level and HOLDS above/below it - closing candles confirm the breakout\n• The move produces displacement candles with FVGs in the breakout direction\n• Volume increases on the breakout, not on the reversal\n• The move is in the same direction as the higher timeframe bias\n• Price quickly puts distance between itself and the broken level\n\nWHEN UNCERTAIN:\nIf you genuinely cannot determine whether you are watching a Judas or a real breakout - do not trade. The highest-conviction Judas Swing trades are those where the fake is obvious in retrospect within minutes of the reversal beginning. Ambiguous situations = reduced probability = reduced or zero position size.`,
        highlight: '📌 Genuine Judas: fast sweep → immediate reversal → large reversal candles with FVGs. Real breakout: holds above/below broken level → displacement in breakout direction → distance from the level. When uncertain, wait.',
      },
    ],
    quiz: [
      { q: 'The Judas Swing is the ICT term for...', options: ['A trend continuation pattern', 'The manipulation phase false move that traps retail traders before the real direction', 'A bullish candlestick pattern', 'The Asian session opening move'], answer: 1 },
      { q: 'After the London Judas Swing completes, price should...', options: ['Continue in the Judas direction', 'Create a LTF ChoCH confirming reversal, then deliver in the opposite direction', 'Enter a consolidation phase until NY opens', 'Return exactly to the Asian range midpoint'], answer: 1 },
      { q: 'If the London move hasn\'t reversed after 90 minutes, you should...', options: ['Enter in the direction of the move anyway', 'Double your stop loss to give price more room', 'Consider that the move may be the real direction and reduce expectations for a reversal', 'Wait for the NY AM session to confirm'], answer: 2 },
    ],
    nextLesson: { id: 26, title: 'Balanced Price Range (BPR)' },
    prevLesson: { id: 24, title: 'Turtle Soup & Stop Hunts' },
  },

  26: {
    id: 26,
    title: 'Balanced Price Range (BPR)',
    subtitle: 'The Highest-Probability Reaction Zone in All of ICT Methodology',
    level: 'Advanced',
    duration: '16 min read',
    category: 'PD Arrays',
    intro: `The Balanced Price Range is where two opposing Fair Value Gaps overlap - where a zone of bullish institutional imbalance and a zone of bearish institutional imbalance occupy the same price range. This overlap creates the most concentrated institutional interest of any entry zone in the ICT framework. Reactions from BPRs are typically sharper, faster, and more complete than reactions from any single PD Array.`,
    sections: [
      {
        title: 'BPR Formation - How It Forms',
        content: `A Balanced Price Range (BPR) forms when two conditions are met simultaneously:\n\n1. A BULLISH FVG exists at a specific price range (high of candle 1 to low of candle 3 on a bullish displacement)\n2. A BEARISH FVG overlaps with that same price range (high of candle 3 to low of candle 1 on a bearish displacement)\n\nThe OVERLAP ZONE - the price range where both FVGs occupy the same space - is the BPR.\n\nWHY DOES THIS HAPPEN?\nBPRs form most commonly in areas of high institutional activity where price has passed through the same zone multiple times with strong directional commitment in both directions. When the bullish displacement through a zone and the bearish displacement through the same zone both leave FVGs, the overlapping area becomes loaded with institutional orders from both camps.\n\nThis creates a zone where, when price returns, BOTH sets of orders are triggered simultaneously - creating an exceptionally powerful reaction point.\n\nVISUALIZING BPR:\nImagine drawing a green box for a bullish FVG and a red box for a bearish FVG. Where these two boxes overlap - where they share the same price range - that overlapping area is the BPR. The BPR is typically a smaller zone than either individual FVG.`,
        highlight: '📌 BPR = the overlap zone between a bullish FVG and a bearish FVG at the same price level. The overlap is typically smaller than either FVG individually but carries the combined institutional interest of both.',
      },
      {
        title: 'Why BPR Creates Extreme Reactions',
        content: `The BPR produces sharper reactions than individual FVGs for a specific institutional reason:\n\nSINGLE FVG REACTION LOGIC:\nWhen price returns to a bullish FVG, the institutional buy orders placed during the bullish displacement are triggered. This creates buying pressure that pushes price away from the zone.\n\nBPR REACTION LOGIC:\nWhen price enters a BPR zone from below (bullish trade scenario), two things happen simultaneously:\n1. The bullish FVG buy orders are triggered (creating upward pressure)\n2. The bearish FVG sell orders that previously existed here are now reversed - the institutional sellers who created that bearish FVG have now taken profits or been stopped, leaving only unfilled buy orders\n\nThe result: both the bullish FVG orders AND the cleared field from the bearish FVG's resolution create combined upward momentum from the BPR. There is no opposing institutional selling pressure at this zone - it has been consumed by the prior bearish move through the area.\n\nIn simpler terms: the BPR is the exact price range where institutional buyers and sellers have both been active, but where the current trade direction has the advantage because its orders were the LAST ones placed at this level.`,
        highlight: '📌 BPR reactions are sharper because two sets of institutional orders converge at the same zone. The opposing institutional pressure has been consumed, leaving only orders aligned with the current direction.',
      },
      {
        title: 'Identifying BPR on Any Timeframe',
        content: `STEP-BY-STEP BPR IDENTIFICATION:\n\nStep 1 - Mark all bullish FVGs on your timeframe:\nGo through recent price history and mark every zone where a bullish displacement created a gap between candle 1's high and candle 3's low.\n\nStep 2 - Mark all bearish FVGs:\nMark every zone where a bearish displacement created a gap between candle 1's low and candle 3's high.\n\nStep 3 - Look for overlaps:\nWhere does a bullish FVG zone occupy the same price range as a bearish FVG zone? The overlap is the BPR.\n\nStep 4 - Define the overlap precisely:\nThe BPR zone runs from the HIGHER of the two lower boundaries to the LOWER of the two upper boundaries. Example: Bullish FVG = 1.0820 to 1.0840. Bearish FVG = 1.0815 to 1.0835. BPR = 1.0820 to 1.0835 (the overlap).\n\nStep 5 - Determine direction:\nA BPR in a bullish dealing range (discount zone) with bullish HTF bias = BULLISH BPR. A BPR in a bearish dealing range (premium zone) with bearish HTF bias = BEARISH BPR.\n\nThe most powerful BPRs exist within the OTE zone (62-79% retracement) AND within a premium/discount zone that aligns with the HTF bias. Triple confluence: BPR + OTE + HTF alignment = highest quality entry.`,
        highlight: '📌 BPR identification: mark bullish FVGs → mark bearish FVGs → find price range where both overlap → that overlap is the BPR. The smaller the overlap zone, the more precise the institutional concentration.',
      },
      {
        title: 'BPR + OB Confluence',
        content: `The most powerful confluence in the PD Array hierarchy combines a BPR with an Order Block at the same level:\n\nWHY THIS COMBINATION IS POWERFUL:\n• The OB represents the zone where institutional orders were placed before a major move\n• The BPR represents where both bullish and bearish FVG institutional imbalances exist\n• When an OB and a BPR occupy the same price zone, three sets of institutional orders are stacked: OB orders + bullish FVG orders + bearish FVG (inverted) orders\n• This is the maximum possible PD Array confluence on any single timeframe\n\nHOW TO IDENTIFY THIS SETUP:\nLook for instances where the displacement move that created a bullish OB ALSO created bullish and bearish FVGs - and where those FVGs create a BPR within the body of the OB itself.\n\nThis occurs most commonly when price has been through a zone multiple times with varying commitment levels before the final directional breakout.\n\nREAL EXAMPLE LOGIC:\nA bullish OB sits at 1.0820-1.0835 on the 1-hour chart. Within that zone, a 5-minute bullish FVG (1.0825-1.0832) overlaps with a 5-minute bearish FVG (1.0823-1.0830). The BPR (1.0825-1.0830) sits within the OB. This is a 1-hour OB containing a 5-minute BPR - an exceptionally precise entry zone.`,
        highlight: '📌 OB + BPR confluence = maximum PD Array stacking. This combination appears less frequently but produces the most reliable and powerful reactions when it does. Wait patiently for these setups.',
      },
      {
        title: 'Partial BPR Fills and Continuation',
        content: `Not every BPR is fully traded through before price reacts. Understanding the difference between partial and full fills determines your entry approach:\n\nPARTIAL BPR FILL (to CE):\nPrice enters the BPR and reaches the midpoint (CE at 50% of the BPR range) before reacting. This is the most common BPR reaction. The CE represents the point where both FVG orders are most concentrated - and where the sharpest reaction typically occurs.\n\nEnter at the CE: set a limit order at the exact midpoint of the BPR zone. This is the highest R:R entry because you are positioned at the center of maximum institutional interest with a tight stop.\n\nFULL BPR FILL (complete penetration):\nPrice trades through the entire BPR zone before reacting. This occurs when there is additional selling pressure that temporarily overpowers the BPR orders. After a full fill, the BPR is tested and confirmed - price typically reacts sharply from the far edge of the BPR.\n\nEnter at the far edge: a full fill that respects the far edge of the BPR and shows a 1-minute reversal candle is a valid entry, though R:R is typically smaller than a CE entry.\n\nBPR VIOLATION (complete failure):\nIf price trades completely through the BPR and closes outside its far edge, the BPR is consumed (mitigated). Remove it from your chart. This often signals that the HTF narrative has changed - reassess your bias.`,
        highlight: '📌 Target the BPR midpoint (CE) for the highest R:R entry. A full fill to the far edge is a secondary entry. If price closes beyond the far edge - BPR is mitigated, remove it, reassess your narrative.',
      },
    ],
    quiz: [
      { q: 'A Balanced Price Range (BPR) forms when...', options: ['Price makes equal highs and equal lows', 'A bullish FVG and bearish FVG overlap at the same price zone', 'An Order Block is fully mitigated', 'Price reaches the 50% equilibrium level'], answer: 1 },
      { q: 'Why do BPR reactions tend to be sharper than single FVG reactions?', options: ['Because BPRs are larger zones with more price area', 'Because two sets of institutional orders converge at the same zone simultaneously', 'Because retail traders avoid BPR zones', 'Because BPRs only form during killzones'], answer: 1 },
      { q: 'If price closes beyond the far edge of a BPR, you should...', options: ['Enter a larger position - the BPR is now more powerful', 'Consider the BPR mitigated and remove it from your chart', 'Wait for price to return to the BPR midpoint', 'Move your stop to the far edge of the BPR'], answer: 1 },
    ],
    nextLesson: { id: 27, title: 'Execution & Trade Management' },
    prevLesson: { id: 25, title: 'Judas Swing & AMD Deep Dive' },
  },

  27: {
    id: 27,
    title: 'Execution & Trade Management',
    subtitle: 'Knowing the Setup Is 40% of Trading - Execution Is the Other 60%',
    level: 'Advanced',
    duration: '24 min read',
    category: 'Execution',
    intro: `Most ICT learners spend 90% of their time on concepts and 10% on execution. In reality, two traders with identical knowledge of ICT concepts will produce completely different results based on how they execute. Precise entry timing, non-negotiable stop placement, intelligent take-profit management, and the psychology of holding a winning trade - these are the skills that determine whether your ICT knowledge produces profits or frustration.`,
    sections: [
      {
        title: 'Entry Precision - Limit vs Market Orders',
        content: `LIMIT ORDERS (Preferred for ICT Entries):\nA limit order is placed at a specific price level - typically the CE of a FVG, the top of an OB, or the middle of a BPR. Price must reach your level for the order to fill. You enter at the level you chose, not wherever price happens to be when you decide to trade.\n\nADVANTAGES:\n• Precise entry at your chosen PD Array level\n• Better R:R because entry is at the optimal zone\n• No emotional pressure - the order fills automatically if your level is reached\n• Eliminates impulse entries that often occur at worse prices\n\nMARKET ORDERS (Used for Confirmation Entries):\nA market order fills immediately at the current best price. Used when waiting for a limit order would mean missing the move - specifically after seeing a 1-minute ChoCH or displacement candle that confirms the move has begun.\n\nWHEN TO USE MARKET vs LIMIT:\n• Use LIMIT at FVG CE, OB top, BPR midpoint - known PD Array levels\n• Use MARKET after a 1-minute structure break that confirms reversal (aggressive confirmation entry)\n• Never use market orders to "chase" a move that has already departed from your intended entry level\n\nThe most common execution mistake: using a market order because "price is moving and I don't want to miss it." This consistently produces entries at worse prices and tighter R:R.`,
        highlight: '📌 Default to limit orders at your PD Array level. Use market orders only for confirmation entries after a 1-minute structure break. Never chase with a market order - if you missed the level, wait for the next setup.',
      },
      {
        title: 'Stop Loss Placement Logic',
        content: `Stop loss placement in ICT is not arbitrary - it follows a specific logical framework based on what would invalidate the trade thesis:\n\nFOR FVG ENTRIES:\nStop goes below the ENTIRE FVG (for longs) or above the ENTIRE FVG (for shorts). The full FVG zone represents the institutional imbalance - if price trades completely through it, the thesis is invalid.\n\nFOR ORDER BLOCK ENTRIES:\nStop goes below the FULL CANDLE BODY of the OB (for longs) or above it (for shorts). The OB candle represents the institutional accumulation - violation of the full candle invalidates it.\n\nFOR TURTLE SOUP / JUDAS SWING ENTRIES:\nStop goes beyond the ABSOLUTE EXTREME of the sweep wick - including the furthest extension of the hunt candle. This is typically 5-10 points beyond where most traders would place their stop, specifically to survive any secondary wick before the real reversal.\n\nFOR BPR ENTRIES:\nStop goes beyond the FAR EDGE of the BPR zone - the edge opposite to your entry.\n\nGENERAL RULE:\nThe stop goes at the level that, if reached, proves the setup was wrong - not at a level that allows price to "breathe" or "give it room." If the setup is valid, price should not come close to the logical invalidation stop. If it does, you want to be out.`,
        highlight: '📌 Stop placement rule: stop goes at the level that PROVES THE SETUP WRONG if reached. Not a round number. Not a comfortable distance. The exact level that invalidates the specific setup type you entered.',
      },
      {
        title: 'Take Profit at Liquidity Targets',
        content: `Take profit placement in ICT is always at an identified Draw on Liquidity - a specific liquidity pool, not an arbitrary level:\n\nTP1 - INTERNAL RANGE LIQUIDITY (IRL):\nThe first TP is at the nearest significant IRL target - an open FVG above price (for longs), an unmitigated OB above, or a recent swing high that represents BSL. This should typically be 2:1 or better R:R from your entry.\n\nTP2 - EXTERNAL RANGE LIQUIDITY (ERL):\nThe second TP (for partial positions) is at the session\'s primary draw on liquidity - PDH, PDL, weekly high/low, or a significant swing that has not been swept. This is typically 3:1 to 5:1 R:R.\n\nTP3 - MACRO DRAW:\nIf the trade is a larger swing with weekly/monthly context, the third TP is at a macro draw on liquidity - a monthly high/low, a major round number, or a quarterly target.\n\nNEVER PLACE TP AT RANDOM PRICE:\nThe most common amateur mistake - placing TP at "50 pips" or "2:1 R:R" without identifying whether that specific level has liquidity significance. If your TP is not at an actual liquidity pool (BSL or SSL), price may stop just before it and reverse.\n\nMARK YOUR TP BEFORE ENTRY:\nIdentify your TP level during pre-session analysis - before the trade forms. You should know where you are exiting before you know where you are entering.`,
        highlight: '📌 TP is always at a Draw on Liquidity - identified BEFORE entry. TP1 = nearest IRL. TP2 = session ERL. TP3 = macro draw. Never at an arbitrary price or "feels right" level.',
      },
      {
        title: 'Partial Profits - When and How Much',
        content: `Partial profit taking is a risk management and psychological tool. Used correctly, it removes stress from winning trades and lets profits run to maximum targets:\n\nWHEN TO TAKE PARTIALS:\n• When price reaches the first identified liquidity target (TP1)\n• When price reaches a significant HTF PD Array that might create a temporary reaction\n• When holding the full position becomes emotionally difficult - taking a partial reduces stress without fully closing\n\nHOW MUCH TO TAKE:\n• TP1 - Take 25-50% of position at first target\n• Move stop to breakeven after TP1 is hit - the remaining position is now risk-free\n• TP2 - Take another 25-50% of the remaining position at the second target\n• Let the final 25-50% run to the macro draw or a trailing stop exit\n\nTHE PSYCHOLOGY OF PARTIALS:\nPartial profits serve a critical psychological function - they prove the trade is working before the final target is reached. This reduces the emotional impulse to close the entire position prematurely when price has a brief adverse retracement on the way to the target.\n\nTHE DANGER OF PARTIALS:\nTaking partials too early (before any target is reached) simply because you are nervous is NOT partial profit taking - it is fear-based early exit. Wait for a defined target before taking any profits.`,
        highlight: '📌 Take 25-50% at TP1 → move stop to breakeven → hold remaining position to TP2 and beyond. Partials reduce stress and let winners run. Never take partials before reaching a defined liquidity target.',
      },
      {
        title: 'Break Even Logic and Trail Stops',
        content: `MOVING TO BREAKEVEN:\nThe most common break-even rule in ICT trading: move the stop to breakeven after price has moved 1R in your favor AND after a significant PD Array has been either reached or cleared.\n\nDo NOT move to breakeven:\n• The moment the trade is a few pips positive - this creates "stop the winners early" behavior\n• Before the first PD Array is cleared - price may need to test a nearby array before continuing\n\nMove to breakeven WHEN:\n• Price has cleared the first significant PD Array in your direction\n• Price has moved at least 1R in your favor\n• A LTF BOS has confirmed commitment in your direction\n\nTRAILING STOPS IN ICT:\nICT does not typically advocate fixed trailing stops (e.g., "trail by 20 pips"). Instead, use a STRUCTURAL trailing stop:\n• Move the stop to below the most recent Higher Low (for longs) after each BOS\n• As price creates new Higher Highs with clear structure, move the stop to below the new HL\n• This keeps the stop at the logical structural level - where the thesis would be invalidated if breached\n\nFULL EXIT LOGIC:\nClose the full position when price reaches the final target (macro DOL) OR when a clear bearish ChoCH occurs on the working timeframe (for a long trade). Do not hold past a structure shift in the opposite direction.`,
        highlight: '📌 Move to breakeven when: price moved 1R + cleared first PD Array + LTF BOS confirmed. Use structural trailing stops (below each new HL) rather than arbitrary pip-based trails.',
      },
      {
        title: 'Position Sizing and Risk Per Trade',
        content: `MAXIMUM RISK PER TRADE:\n• Standard ICT position sizing: 1% of account per trade\n• For beginners learning the methodology: 0.5% per trade\n• For experienced traders with proven edge: up to 1.5% on A+ setups only\n• Never risk more than 2% on any single trade regardless of conviction\n\nCALCULATING POSITION SIZE:\n1. Determine account balance: $50,000\n2. Determine risk amount: 1% = $500\n3. Determine entry price: 1.0825\n4. Determine stop price: 1.0800 (25 pips stop)\n5. Position size = Risk Amount / (Stop Distance × Pip Value)\n6. Example: $500 / (25 pips × $10/pip per standard lot) = 2 standard lots\n\nSCALING BY SETUP QUALITY:\n• A+ setup (maximum confluence): 1% risk\n• A setup (strong confluence): 0.75% risk\n• B setup (moderate confluence): 0.5% risk\n• C setup: 0 - do not trade\n\nDAILY AND WEEKLY LOSS LIMITS:\n• Maximum daily loss: 2-3% of account\n• If daily limit is hit → stop trading for the day\n• Maximum weekly loss: 5% of account\n• If weekly limit is hit → stop trading for the week\n\nThis discipline around loss limits is not optional - it is the mechanism that prevents one bad day from destroying a month of gains.`,
        highlight: '📌 Risk 1% maximum per trade. Scale by setup quality: A+ = 1%, A = 0.75%, B = 0.5%, C = no trade. Daily loss limit: 2-3%. Weekly loss limit: 5%. When limits are hit - stop. No exceptions.',
      },
      {
        title: 'The Psychology of Execution',
        content: `The mechanics of execution - where to enter, where to stop, where to exit - are teachable and learnable within weeks. The psychology of execution takes much longer and is where most traders fail despite correct setups.\n\nTHE CORE EXECUTION PSYCHOLOGY CHALLENGES:\n\n1. PREMATURE EXIT:\nClosing a winning trade before the target because you are afraid it will reverse. Caused by past experiences of winners becoming losers. Solution: partial profits at TP1 reduce this fear while keeping the position running.\n\n2. STOP MOVEMENT:\nMoving the stop further away when price approaches it - "giving it more room." This turns defined-risk trades into undefined-risk disasters. Solution: write the stop level in your journal before entry and treat it as a physical contract you cannot break.\n\n3. LATE ENTRY:\nEntering a trade after missing the intended entry level because you cannot bear to let it go. This creates worse entries with worse R:R. Solution: if you miss the entry, write "missed" in your journal and wait for the next one.\n\n4. OVERTRADING:\nTaking additional trades after a winner to "keep the momentum going" or after a loser to "make it back." Both are destructive. Solution: maximum two trades per day. After two, close all charts.\n\n5. ANALYSIS PARALYSIS:\nKnowing the setup is valid but being unable to pull the trigger due to fear of being wrong. Solution: pre-planned limit orders placed before the session - the order fills automatically without requiring a real-time decision.`,
        highlight: '📌 The biggest execution killers: premature exit, stop movement, late entry, overtrading, and analysis paralysis. Each has a specific solution. Write them down and review them weekly.',
      },
    ],
    quiz: [
      { q: 'When should you use a LIMIT order for ICT entries?', options: ['When price is moving fast and you need to catch it', 'At predefined PD Array levels - FVG CE, OB top, BPR midpoint', 'After news events when spreads are tight', 'Only during the Asian session'], answer: 1 },
      { q: 'In ICT, take profit is ALWAYS placed at...', options: ['2:1 R:R from entry', 'A round number above/below entry', 'An identified Draw on Liquidity - BSL or SSL', 'The previous day close'], answer: 2 },
      { q: 'The correct time to move your stop to breakeven is...', options: ['The moment the trade becomes positive', 'After price has moved 1R AND cleared the first PD Array AND LTF BOS confirmed', 'After 30 minutes regardless of price action', 'When you feel nervous about the trade'], answer: 1 },
    ],
    nextLesson: { id: 28, title: 'Backtesting & Model Development' },
    prevLesson: { id: 26, title: 'Balanced Price Range (BPR)' },
  },

  28: {
    id: 28,
    title: 'Backtesting & Model Development',
    subtitle: 'No Edge Can Be Trusted Until It Has Been Proven Across Hundreds of Historical Setups',
    level: 'Advanced',
    duration: '22 min read',
    category: 'Strategy',
    intro: `The most dangerous phrase in trading is "I think this setup works." ICT traders do not think - they know, because they have tested their setup across hundreds of historical occurrences and measured the results statistically. Backtesting is not busywork. It is the process that transforms a set of interesting concepts into a provable, statistical edge - the foundation of consistent profitability.`,
    sections: [
      {
        title: 'Why Most Traders Skip This and Fail',
        content: `Here is an uncomfortable truth: the majority of traders who learn ICT concepts never systematically backtest them. And the majority of those traders never achieve consistent profitability. This is not a coincidence.\n\nREASONS TRADERS SKIP BACKTESTING:\n1. Impatience - they want to trade now, not study historical data\n2. Overconfidence - "I understand the concept, that's enough"\n3. Avoidance - backtesting reveals that their current approach doesn't actually work\n4. False belief that demo trading IS backtesting (it is not)\n\nWHY SKIPPING BACKTESTING FAILS:\n• Without backtesting, you do not know your actual win rate\n• Without knowing your win rate, you cannot size positions correctly\n• Without correct sizing, even a positive expectancy system destroys accounts through luck-based drawdowns\n• Without statistical evidence, you abandon valid setups after 3 losses and keep invalid setups because they feel right\n\nBACKTESTING IS NOT OPTIONAL:\nFor serious ICT practitioners, backtesting is the equivalent of a pilot's flight simulator hours - you prove you can navigate the conditions before risking lives. Backtesting proves you can execute the strategy before risking capital.`,
        highlight: '📌 Backtesting is not optional if you are serious about profitability. Without statistical evidence of your edge, you are trading on hope - and hope is not a trading strategy.',
      },
      {
        title: 'Setting Up a Proper Backtesting Environment',
        content: `TOOLS FOR ICT BACKTESTING:\n\nOPTION 1 - TRADINGVIEW REPLAY (FREE, RECOMMENDED):\nTradingView's Bar Replay feature allows you to go back in time on any instrument and move forward candle by candle, making trading decisions as if you are in real time. This is the gold standard for manual ICT backtesting.\n\nSetup: Open TradingView → select your instrument → click the Bar Replay button → go back 6-12 months → replay day by day, marking your analysis before you advance.\n\nOPTION 2 - FOREX TESTER:\nA dedicated backtesting software that allows tick-by-tick replay with order simulation. More realistic but requires a paid subscription. Excellent for traders who want simulated execution with real spread and slippage data.\n\nOPTION 3 - CHART SCROLLING METHOD:\nScroll your chart back in time → cover future price with a box → advance forward candle by candle manually. Cruder than replay tools but accessible on any platform.\n\nWHAT YOU NEED TO RECORD:\n• Date and instrument\n• Entry price and entry reason (which PD Array, which session, which AMD phase)\n• Stop loss level and reason\n• Take profit level and reason (which DOL)\n• Exit price and exit reason\n• R:R planned vs R:R achieved\n• All criteria from your entry checklist (which were present, which were missing)\n• Outcome: win / loss / breakeven\n• Notes on execution quality`,
        highlight: '📌 Use TradingView Bar Replay for free backtesting. Record every triggered trade with full criteria notes. The quality of your data determines the quality of your analysis.',
      },
      {
        title: 'What to Record in Every Backtest',
        content: `A backtest record that does not capture sufficient detail is nearly useless for analysis. Here is the minimum required data for each backtested trade:\n\nTRADE IDENTIFICATION:\n• Trade number (sequential)\n• Date and time of entry\n• Instrument traded (EURUSD, NAS100, XAUUSD)\n• Session (London, NY AM)\n• Direction (Long / Short)\n\nSETUP QUALITY:\n• Setup type (FVG entry, OB entry, BPR entry, Turtle Soup, etc.)\n• HTF alignment: Monthly direction, Weekly direction, Daily bias\n• Was price in discount (for longs) or premium (for shorts)?\n• Killzone: Yes / No\n• Liquidity sweep present: Yes / No\n• Entry criteria checklist: which items were confirmed?\n\nTRADE MECHANICS:\n• Entry price\n• Stop loss price and distance in pips\n• Planned TP1, TP2\n• Initial planned R:R\n\nOUTCOME:\n• Exit price\n• Actual R:R achieved\n• Result: Win / Loss / Breakeven\n• Did price reach TP1 before TP2? Before stop?\n• Were there any execution errors (entered late, moved stop, exited early)?\n\nPOST-TRADE NOTES:\n• What worked about this trade?\n• What would you do differently?\n• Confidence level in setup (1-10)`,
        highlight: '📌 Record every triggered setup - wins AND losses. Losses contain the most valuable information. A backtest that only records wins is useless. The patterns in your losses reveal the filters that will fix your system.',
      },
      {
        title: 'Sample Size - Minimum for Statistical Significance',
        content: `MINIMUM 100 TRADES:\nThis is the non-negotiable minimum for any statistical analysis of an ICT trading model. Less than 100 trades is too small a sample to distinguish genuine edge from lucky variance.\n\nWHY 100?\n• A 60% win rate system can have a losing streak of 10-12 consecutive losses by pure chance\n• With 30 trades, a 10-trade losing streak wipes out most of your sample\n• With 100 trades, losing streaks of 10-12 are survivable and the overall win rate still shows accurately\n\nTARGET: 200+ TRADES FOR CONFIDENCE:\nFor a production-ready model you plan to trade live with significant capital, 200+ backtested trades gives you much stronger statistical confidence in your win rate, average R, and maximum drawdown measurements.\n\nTIME TO COMPLETE 100 TRADES:\nDepending on how active your setup is, 100 backtested trades may require reviewing 3-6 months of historical data. Aim to find 2-4 valid setups per week in your backtest - which means 3-6 months of daily review is typical.\n\nTRAPS TO AVOID:\n• Replay bias - going back in time and "seeing" setups that only look valid in hindsight\n• Selection bias - only recording setups that worked, ignoring setups that failed\n• Data mining - adjusting rules to fit historical data until the win rate looks good\n\nTest EXACTLY the rules you plan to trade live. Do not modify the rules during the backtest - if you need to adjust rules, restart the backtest from scratch with the new rules.`,
        highlight: '📌 Minimum 100 trades for statistical significance. 200+ for production confidence. Test EXACTLY the rules you will trade live - no mid-backtest modifications. Record every triggered setup, wins and losses equally.',
      },
      {
        title: 'Turning Results Into a Defined Model',
        content: `After completing 100+ backtested trades, analyze the data systematically to build your defined trading model:\n\nKEY METRICS TO CALCULATE:\n\nWIN RATE:\n(Winning trades / Total trades) × 100\nTarget for ICT methodology: 50-70%\n\nAVERAGE R ON WINNERS:\nSum of all winner R multiples / Number of winners\nTarget: 2R or better\n\nAVERAGE R ON LOSERS:\nSum of all loser R multiples / Number of losers\nTarget: should be -1R (full stop hit)\n\nEXPECTANCY:\n(Win rate × Average R winner) - (Loss rate × Average R loser)\nTarget: positive expectancy, ideally 0.5R or better per trade\n\nMAXIMUM CONSECUTIVE LOSSES:\nThe longest losing streak in your 100-trade sample\nThis determines how much drawdown to expect during the inevitable bad runs\n\nBEST PERFORMING FILTERS:\nAnalyze which criteria, when present, correlated with the highest win rates:\n• Setup type: which PD Array performed best?\n• Session: London or NY AM?\n• HTF alignment: did 3-timeframe alignment outperform 2-timeframe?\n• AMD phase: did distribution phase entries outperform manipulation entries?\n\nMODIFICATIONS BASED ON DATA:\nIf certain criteria consistently appear in losers but rarely in winners - add them as EXCLUSION filters. If certain criteria consistently appear in winners - make them REQUIRED. Build the final model from what the data tells you, not what feels right.`,
        highlight: '📌 Calculate: win rate, average R, expectancy, max consecutive losses. Add criteria that consistently appear in winners as requirements. Remove criteria that consistently appear in losers as exclusions.',
      },
      {
        title: 'Forward Testing Your Model on Demo',
        content: `After defining your model from backtesting, the next step is forward testing on a demo account - trading the model in real time on paper money to validate that it performs similarly in live market conditions:\n\nWHY FORWARD TESTING MATTERS:\nBacktesting, even done perfectly, has limitations:\n• You know roughly what price does in the data you are reviewing\n• Emotional pressure is absent\n• Execution is hypothetical\n\nForward testing on demo introduces:\n• Real-time uncertainty - you do not know what price will do\n• Real-time emotional pressure - even on paper money, decisions feel more real\n• Real execution practice - actually placing orders, managing positions\n\nFORWARD TEST REQUIREMENTS:\n• Trade the EXACT same rules from your backtest model - no modifications\n• Record every triggered trade with the same detail as backtesting\n• Minimum 50 forward-tested trades before considering live trading\n• Target: 50 consecutive trades following ALL rules of your model (including staying out when conditions are not met)\n\nWHEN FORWARD TEST RESULTS MATCH BACKTEST:\nIf your forward test win rate is within 10 percentage points of your backtest win rate - your model is robust and ready for live trading at micro size.\n\nWHEN THEY DON\'T MATCH:\nIf forward test results are significantly worse than backtest - either your backtest had replay bias, or there are real-time conditions that affect the model that were not present in historical data. Identify the discrepancies and fix them before going live.`,
        highlight: '📌 Forward test for minimum 50 trades on demo. If forward test win rate is within 10% of backtest win rate - the model is robust. If not - identify and fix the discrepancies before risking real capital.',
      },
    ],
    quiz: [
      { q: 'The minimum number of trades required for statistically significant backtesting is...', options: ['10 trades', '50 trades', '100 trades', '500 trades'], answer: 2 },
      { q: 'Expectancy in backtesting is calculated as...', options: ['Win rate × Average R', '(Win rate × Avg R winner) - (Loss rate × Avg R loser)', 'Total wins / Total losses', 'Average R × position size'], answer: 1 },
      { q: 'If forward test win rate is significantly lower than backtest win rate, you should...', options: ['Trade live anyway - demo is always different', 'Identify and fix the discrepancies before risking real capital', 'Increase position size to compensate', 'Accept the lower win rate and adjust expectations'], answer: 1 },
    ],
    nextLesson: null,
    prevLesson: { id: 27, title: 'Execution & Trade Management' },
  },

};

// ─── Level badge styles ──────────────────────────────────────────
const LEVEL_STYLE = {
  Beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Advanced: 'text-red-400 bg-red-400/10 border-red-400/20',
};

// ─── Section component ───────────────────────────────────────────
function Section({ section, index, diagramSrc, diagramAlt }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border border-[rgba(212,168,67,0.75)] rounded-xl overflow-hidden mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[rgba(212,168,67,0.03)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(212,168,67,0.75)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-semibold text-white">{section.title}</span>
        </div>
        <span className="text-[#D4A843] text-lg">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-5 pb-6 border-t border-[rgba(212,168,67,0.75)]">
          <div className="pt-5 text-gray-300 leading-relaxed text-sm whitespace-pre-line mb-4" style={{ fontWeight: 300 }}>
            {section.content}
          </div>

          {section.highlight && (
            <div className="flex gap-3 p-4 rounded-xl border border-[rgba(212,168,67,0.8)] bg-[rgba(212,168,67,0.05)]">
              <div className="text-sm text-[#D4A843] leading-relaxed">{section.highlight}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Quiz component ──────────────────────────────────────────────
function Quiz({ questions, lessonId }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = submitted ? questions.filter((q, i) => answers[i] === q.answer).length : 0;

  return (
    <div className="rounded-2xl border border-[rgba(212,168,67,0.8)] bg-[rgba(212,168,67,0.03)] p-6">
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#D4A843', letterSpacing: '0.15em' }} className="mb-4">
        // KNOWLEDGE CHECK
      </div>
      {questions.map((q, qi) => (
        <div key={qi} className="mb-6">
          <p className="text-white text-sm font-medium mb-3">{qi + 1}. {q.q}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              let style = 'border-[rgba(212,168,67,0.75)] bg-[#0F0F0F] text-gray-300 hover:border-[rgba(212,168,67,0.8)]';
              if (submitted) {
                if (oi === q.answer) style = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
                else if (answers[qi] === oi) style = 'border-red-500/40 bg-red-500/10 text-red-300';
                else style = 'border-[rgba(212,168,67,0.75)] bg-[#0F0F0F] text-gray-300';
              } else if (answers[qi] === oi) {
                style = 'border-[rgba(212,168,67,0.75)] bg-[rgba(212,168,67,0.22)] text-[#D4A843]';
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
                const normalizedLessonId = Number.parseInt(String(lessonId), 10);
                if (!Number.isNaN(normalizedLessonId)) {
                  await supabase
                    .from('lesson_completions')
                    .upsert(
                      { user_id: user.id, lesson_id: normalizedLessonId },
                      { onConflict: 'user_id,lesson_id' }
                    );
                }
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
              : 'rgba(212,168,67,0.75)',
            color: Object.keys(answers).length === questions.length ? '#080808' : '#8A6B28',
            fontWeight: 700,
          }}
        >
          Submit Answers
        </button>
      ) : (
        <div className="text-center p-4 rounded-xl border border-[rgba(212,168,67,0.8)] bg-[rgba(212,168,67,0.05)]">
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', background: 'linear-gradient(135deg, #D4A843, #F0C96A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {score}/{questions.length}
          </div>
          <p className="text-gray-300 text-sm mt-1">
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

  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthReady(true);
      } else {
        supabase.auth.refreshSession().then(({ data: { session: s } }) => {
          if (s) {
            setAuthReady(true);
          } else {
            router.push('/auth?redirect=' + encodeURIComponent(window.location.pathname));
          }
        });
      }
    });
  }, []);

  if (!authReady) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(212,168,67,0.75)', fontSize: '12px', letterSpacing: '0.2em' }}>
        LOADING...
      </div>
    </div>
  );
  const { id } = use(params);
  const lessonId = Number.parseInt(id, 10) || 1;
  const moduleDiagramSrc = `/modules/module-${String(lessonId).padStart(2, '0')}.webp`;
  const lesson = LESSONS[lessonId] || LESSONS[1];

  const page = (
    <div className="min-h-screen bg-[#080808] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        :root { --gold: #D4A843; --gold-light: #F0C96A; --gold-dim: #8A6B28; --bg2: #0F0F0F; --bg3: #141414; --border: rgba(212,168,67,0.75); }
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-mono-custom { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-[var(--border)]" style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)' }}>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display text-black text-sm" style={{ background: 'linear-gradient(135deg, #D4A843, #8A6B28)' }}>S</div>
          <span className="font-display text-base tracking-widest text-white group-hover:text-[var(--gold)] transition-colors">ICT FLOW</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {[['/', 'Home'], ['/foundations', 'Foundations'], ['/courses', 'Courses'], ['/mentorship', 'Mentorship']].map(([href, label]) => (
            <Link key={href} href={href} className="font-mono-custom text-xs text-gray-300 hover:text-[var(--gold)] transition-colors tracking-wider uppercase">{label}</Link>
          ))}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 font-mono-custom text-xs text-gray-300 mb-8">
          <Link href="/courses" className="hover:text-[var(--gold)] transition-colors">Courses</Link>
          <span className="text-gray-400">›</span>
          <span className="text-[var(--gold)]">{lesson.title}</span>
        </div>

        {/* ── Header ── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`px-3 py-1 rounded-lg text-xs font-mono-custom border ${LEVEL_STYLE[lesson.level]}`}>{lesson.level}</span>
            <span className="font-mono-custom text-xs text-gray-300">📖 {lesson.duration}</span>
            <span className="font-mono-custom text-xs text-gray-300">🏷 {lesson.category}</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white mb-4 leading-none">{lesson.title.toUpperCase()}</h1>
          <p className="text-gray-300 text-lg" style={{ fontWeight: 300 }}>{lesson.subtitle}</p>
        </div>

        {/* ── Intro ── */}
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] mb-8">
          <p className="text-gray-300 leading-relaxed" style={{ fontWeight: 300 }}>{lesson.intro}</p>
        </div>



        {/* ── Module Banner Image ── */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-[var(--border)]" style={{ background: '#0F0F0F' }}>
          <img
            src={moduleDiagramSrc}
            alt={lesson.title + ' - ICT concept diagram'}
            style={{ width: '100%', maxHeight: '380px', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            onError={(e) => { e.target.parentElement.style.display = 'none'; }}
          />
          <div className="px-4 py-3 border-t border-[var(--border)]">
            <p className="font-mono-custom text-xs text-gray-300">{lesson.imageCaption}</p>
          </div>
        </div>

        {/* ── Content sections ── */}
        <div className="mb-10">
          <div className="font-mono-custom text-xs text-[var(--gold)] tracking-widest uppercase mb-5">// Lesson Content</div>
          {lesson.sections.map((section, i) => (
            <Section
              key={i}
              section={section}
              index={i}
              diagramSrc={i === 0 ? moduleDiagramSrc : null}
              diagramAlt={`${lesson.title} ICT concept diagram`}
            />
          ))}
        </div>

        {/* ── Quiz ── */}
        <div className="mb-10">
          <div className="font-mono-custom text-xs text-[var(--gold)] tracking-widest uppercase mb-5">// Test Your Understanding</div>
          <Quiz questions={lesson.quiz} lessonId={lessonId} />
        </div>

        {/* ── Navigation ── */}
        <div className="grid grid-cols-2 gap-4">
          {lesson.prevLesson ? (
            <Link href={`/lesson/${lesson.prevLesson.id}`}>
              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg2)] hover:border-[rgba(212,168,67,0.35)] transition-all group">
                <div className="font-mono-custom text-xs text-gray-300 mb-1">← Previous</div>
                <div className="font-semibold text-white group-hover:text-[var(--gold)] transition-colors">{lesson.prevLesson.title}</div>
              </div>
            </Link>
          ) : <div />}
          {lesson.nextLesson && (
            <Link href={`/lesson/${lesson.nextLesson.id}`}>
              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg2)] hover:border-[rgba(212,168,67,0.35)] transition-all group text-right">
                <div className="font-mono-custom text-xs text-gray-300 mb-1">Next →</div>
                <div className="font-semibold text-white group-hover:text-[var(--gold)] transition-colors">{lesson.nextLesson.title}</div>
              </div>
            </Link>
          )}
        </div>

      </div>

      {/* ── Next Step CTA ── */}
      <div className="border-t border-[var(--border)] px-6 py-8 mt-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-mono-custom text-xs text-[var(--gold)] tracking-widest uppercase mb-1">// What to study next</div>
            <div className="text-white font-semibold">Continue your ICT journey</div>
          </div>
          <div className="flex gap-3">
            {lesson.nextLesson && (
              <Link href={`/lesson/${lesson.nextLesson.id}`} className="btn-gold px-6 py-3 rounded-xl font-mono-custom text-xs tracking-widest uppercase" style={{ background: 'linear-gradient(135deg,#D4A843,#F0C96A)', color: '#080808', textDecoration: 'none', fontWeight: 700 }}>
                Next: {lesson.nextLesson.title} →
              </Link>
            )}
            <Link href="/courses" style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(212,168,67,0.8)', color: 'rgba(255,255,255,0.85)', fontFamily: 'DM Mono,monospace', fontSize: '12px', textDecoration: 'none', letterSpacing: '0.08em' }}>
              All Modules
            </Link>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--border)] px-8 py-6 mt-16">
        <div className="max-w-4xl mx-auto text-center font-mono-custom text-xs text-gray-300">
          ICT Flow - Educational content only. Not financial advice.
        </div>
      </footer>
    </div>
  );
  return page;
}
