'use client';
import AuthGuard from '@/app/components/AuthGuard';
import { useState, use } from 'react';
import Link from 'next/link'
// ─── Real chart images from web ──────────────────────────────────
const CONCEPT_IMAGES = {
  'market-structure': '/images/market-structure.png',
  'liquidity': '/images/liquidity.png',
  'fvg': '/images/fvg.png',
  'order-blocks': '/images/order-blocks.png',
  'killzones': '/images/killzones.png',
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
          onClick={() => setSubmitted(true)}
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
  const { id } = use(params);
  const lessonId = parseInt(id) || 1;
  const lesson = LESSONS[lessonId] || LESSONS[1];

 return (
    <AuthGuard>
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
          {[['/', 'Home'], ['/courses', 'Courses'], ['/signals', 'Signals'], ['/glossary', 'Glossary'], ['/journal', 'Journal']].map(([href, label]) => (
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
              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg2)] hover:border-[rgba(212,168,67,0.7)] transition-all group">
                <div className="font-mono-custom text-xs text-gray-500 mb-1">← Previous</div>
                <div className="font-semibold text-white group-hover:text-[var(--gold)] transition-colors">{lesson.prevLesson.title}</div>
              </div>
            </Link>
          ) : <div />}
          {lesson.nextLesson && (
            <Link href={`/lesson/${lesson.nextLesson.id}`}>
              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg2)] hover:border-[rgba(212,168,67,0.7)] transition-all group text-right">
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
</AuthGuard>
  );
}