const LESSONS = {
  1: {
    id: 1,
    title: 'Market Structure',
    subtitle: 'The Language of Price — How to Read What the Market Is Actually Saying',
    level: 'Beginner',
    duration: '18 min read',
    category: 'Foundation',
    imageCaption: 'BOS vs ChoCH — the two most critical market structure signals in ICT',
    intro: `Before you can trade ICT, you need to understand one thing: price can exhibit recurring patterns and structure. Learning to read those patterns can provide a framework for interpreting charts. Market structure is the foundation of everything in ICT. It tells you the direction price is going, when that direction is changing, and when a new move is starting.`,
    sections: [
      {
        title: 'What Is Market Structure?',
        content: `Market structure is simply the sequence of highs and lows that price creates as it moves. That's it. But the pattern of those highs and lows tells you everything about who is in control — buyers or sellers.

In an uptrend, price creates Higher Highs (HH) and Higher Lows (HL). Each new push up goes higher than the last. Each pullback stops higher than the previous pullback. Buyers are in full control.

In a downtrend, price creates Lower Highs (LH) and Lower Lows (LL). Each rally stops lower than the last. Each drop goes deeper. Sellers are in full control.

This sounds simple — and it is. Many retail traders struggle to apply this consistently. They try to buy in downtrends and sell in uptrends and wonder why they keep losing.`,
        highlight: '📌 Rule #1: Some traders filter setups by higher-timeframe structure; test whether this filter improves your results.',
      },
      {
        title: 'Break of Structure (BOS)',
        content: `A Break of Structure (BOS) happens when price breaks through the most recent swing high (in an uptrend) or swing low (in a downtrend). It confirms that the current trend is continuing.

Here's how to identify a Bullish BOS: Price is in an uptrend (HH, HL sequence). Price pulls back, creates a new Higher Low. Then price pushes up and breaks above the last Higher High. That break above the previous swing high = BOS. This can support a continuation interpretation; any directional trade should still follow a defined, tested plan.

Bearish BOS is the opposite: price breaks below the most recent swing low, confirming continuation of the downtrend.

The BOS is not your entry signal — it's your confirmation that the trend is still running. Your entry comes from the pullback that follows.`,
        highlight: '📌 BOS is commonly used as a continuation reference in ICT analysis; it does not by itself confirm institutional intent or guarantee continuation.',
      },
      {
        title: 'Change of Character (ChoCH / MSS)',
        content: `This is where it gets powerful. A Change of Character (ChoCH) — also called a Market Structure Shift (MSS) — is the signal that the trend is REVERSING.

In a downtrend, price is making LH and LL. Then suddenly, price shoots up and breaks above the most recent Lower High. That break = ChoCH. It means buyers have stepped in aggressively enough to break the bearish structure. This can be an early sign that the prior downtrend may be weakening or changing.

In an uptrend, if price breaks below the most recent Higher Low in one aggressive move — that's a bearish ChoCH. Sellers just took control.

The key difference between BOS and ChoCH is direction:
• BOS breaks in the direction of the current trend = continuation
• ChoCH breaks AGAINST the current trend = potential reversal

This is one framework ICT traders use to study potential turning points; interpretations about institutional positioning are not directly observable from price alone.`,
        highlight: '📌 ChoCH = The first warning sign that trend is reversing. Don\'t jump in immediately — wait for confirmation and a PD Array to enter from.',
      },
      {
        title: 'Internal vs External Structure',
        content: `ICT goes deeper than just "uptrend/downtrend." He breaks structure into two layers:

External Structure (swing highs/lows visible on your current timeframe) — these are the major turning points. They create the overall bias.

Internal Structure (the smaller movements WITHIN the external swings) — these are the Lower Timeframe (LTF) details that give you precise entries.

For example, you might be looking at a 1-hour bullish trend (external structure). Inside that, on the 5-minute chart, you'll see a mini downtrend creating the pullback. When that internal bearish structure shifts to bullish (internal ChoCH on 5min) — THAT is your precise entry trigger.

This nested view is one way ICT traders distinguish higher-timeframe context from lower-timeframe execution.`,
        highlight: '📌 Higher-timeframe context can inform bias while lower timeframes can refine entries. Test the exact sequence and rules that fit your strategy.',
      },
      {
        title: 'How to Use Market Structure in a Real Trade',
        content: `Here's the complete workflow:

Step 1 — Check the Daily chart. Is it making HH/HL (bullish) or LH/LL (bearish)? This is your macro bias. Use this as a directional filter if it is part of your tested plan.

Step 2 — Move to the 1-Hour or 4-Hour chart. Confirm the same structure direction. Look for where the last BOS happened to know how deep the pullback could go.

Step 3 — When price pulls back, drop to the 15-minute or 5-minute chart. Watch for a ChoCH in the direction of your HTF bias. This is your LTF confirmation.

Step 4 — After LTF ChoCH, look for a PD Array (FVG, OB, etc.) nearby to enter from. Set your stop below the swing low that caused the ChoCH.

This is one possible top-down analysis framework; traders can adapt the timeframes and rules to their instrument and tested plan.`,
        highlight: '📌 The trade entry is on the LOWER timeframe, but the bias comes from the HIGHER timeframe. This is a commonly emphasized ICT guideline; traders should test the timeframes and rules that fit their plan.',
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
    imageCaption: 'Buy-side liquidity (BSL) sits above highs, sell-side liquidity (SSL) sits below lows',
    intro: `A common ICT interpretation is that price often interacts with liquidity, including resting orders around visible highs and lows. News, fundamentals, positioning, and other factors can also affect price; liquidity is not the only explanation.`,
    sections: [
      {
        title: 'What Is Liquidity in ICT?',
        content: `In traditional finance, "liquidity" means how easily an asset can be bought or sold. But in ICT, liquidity has a very specific meaning: it's the pool of stop-loss orders and resting orders that banks need to fill their massive positions.

Think about it this way. For illustration, consider a large EURUSD order. Large orders can face market-impact and liquidity constraints, and an ICT interpretation may describe price moving toward visible liquidity before a reversal. This example is a simplified model, not evidence that institutions deliberately engineer every move or that a reversal must follow.

This is a central ICT interpretation of liquidity; not every market move needs to be explained by a liquidity hunt.`,
        highlight: '📌 ICT commonly interprets liquidity sweeps as potential catalysts around turning points; institutional intent and a required stop hunt cannot be confirmed from price alone.',
      },
      {
        title: 'Buy-Side Liquidity (BSL)',
        content: `Buy-Side Liquidity (BSL) sits ABOVE price, at levels where:
• Retail traders have placed stop-losses on their short positions
• Buy-stop orders from breakout traders are waiting
• Equal highs or swing highs that everyone can see on the chart

Within the ICT framework, traders may study BSL as an area where sell-side liquidity and potential reactions can occur. Actual participant intent and the resulting direction are not directly observable from the chart.

You'll recognize BSL as: Equal Highs (EQH) on a chart, previous day/week highs, obvious resistance levels that everyone is watching, and round numbers like 1.1000 or 2000 on Gold.

A common liquidity-sweep example is price approaching BSL, briefly trading above it, then potentially reversing. ICT calls this the "stop hunt" or "liquidity sweep."`,
        highlight: '📌 Every time you see price spike above an obvious high and immediately reverse — that may be interpreted as a BSL sweep; institutional order flow cannot be confirmed from the chart alone.',
      },
      {
        title: 'Sell-Side Liquidity (SSL)',
        content: `Sell-Side Liquidity (SSL) is the mirror image — it sits BELOW price, at levels where:
• Retail longs have their stop-losses
• Sell-stop orders from breakout sellers are resting
• Equal lows, swing lows, support levels

ICT teachings commonly interpret sell-side liquidity as an area where buy-side orders may be filled. Some ICT explanations describe price moving below obvious lows before reversing, but the chart alone cannot establish that institutions deliberately triggered stops or accumulated positions there.

You'll identify SSL as: Equal Lows (EQL), previous day/week lows, obvious support levels, and round numbers below current price.

A stop-loss can become part of available market liquidity when triggered, but a stop below support is not necessarily being targeted by banks or used to fill an institutional position.`,
        highlight: '📌 SSL is below commonly watched lows and BSL is above commonly watched highs. These levels can be studied for potential liquidity interactions; institutional intent is not directly observable.',
      },
      {
        title: 'Equal Highs & Equal Lows (EQH / EQL)',
        content: `ICT traders commonly study equal highs and lows as potential liquidity/reference areas. They can attract attention and may coincide with clustered orders, but the size and composition of resting stops cannot be known from the chart alone.

ICT teachings may interpret visible equal highs/lows as liquidity areas; calling them deliberate traps is an interpretation rather than a directly verified mechanism. They WANT price to look like it's double-topping or double-bottoming. Retail sells the double top and buys the double bottom. Their stops cluster just beyond those levels. Then institutions sweep through, collect all that liquidity, and drive price in the opposite direction.

In ICT terminology: EQH = resting BSL above. EQL = resting SSL below. When you see equal highs or lows on your chart, your thought should be: "Some traders watch these levels for potential sweeps, but a sweep or reversal is not guaranteed."`,
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

A commonly studied ICT sequence is Liquidity Sweep → Structure Shift → Entry from a PD Array. It appears in several ICT-style models, but individual models and criteria differ.`,
        highlight: '📌 Example setup: SSL sweep → bullish structure shift → FVG/OB entry. Treat this as a testable setup, not a guaranteed or universally superior trade.',
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
    imageCaption: 'A bullish FVG: gap between candle 1 high and candle 3 low — price returns to fill it',
    intro: `Fair Value Gap (FVG) is a core ICT concept and a useful framework to study price imbalance. Traders study FVGs across timeframes and instruments as areas of price imbalance; how price reacts when it revisits an FVG should be evaluated in context.`,
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
        highlight: '📌 The FVG is the gap between Candle 1\'s high and Candle 3\'s low (bullish). Mark it on your chart — price may revisit this zone; revisit frequency and reaction should be tested.',
      },
      {
        title: 'Why Does Price Return to FVGs?',
        content: `Price returns to FVGs because of the mechanics of how large institutional orders get filled. When a bank places a massive order, it creates a displacement move — price moves so fast that many orders can't get filled at those levels. The Some ICT teachings describe this as an algorithmic explanation, but it is not a directly verified mechanism.

Think of it this way: imagine you're at an auction and the bidding jumps from $100 to $150 in one instant. Someone missed their chance to bid at $120. A market may revisit prior prices, but the auction analogy does not establish why any specific FVG will be revisited. That's the FVG.

For ICT traders, FVGs can serve as potential areas of interest or confluence. Their usefulness should be evaluated with market context and personal testing rather than assumed to outperform other forms of analysis.`,
        highlight: '📌 FVGs aren\'t just patterns — they represent unfilled institutional orders. Some ICT teachings use an algorithmic explanation for FVG behavior, but the mechanism and performance should be treated as a hypothesis to test.',
      },
      {
        title: 'Bullish vs Bearish FVG',
        content: `Bullish FVG (Buy from here in a bullish bias):
• Forms during a bullish displacement (large upward candle)
• Located BELOW current price after the move
• Price comes back down into this zone = retracement
• In a bullish bias, this can be a potential buy area when supported by a tested setup
• Entry: wait for price to enter the FVG, look for a reaction candle

Bearish FVG (Sell from here in a bearish bias):
• Forms during a bearish displacement (large downward candle)
• Located ABOVE current price after the move
• Price comes back up into this zone = retracement
• In a bearish bias, this can be a potential sell area when supported by a tested setup

A common filtering rule is to align FVG direction with higher-timeframe bias; test whether this improves your setup quality. Using an FVG against the HTF bias is one of the most common mistakes ICT beginners make.`,
        highlight: '📌 Some traders use HTF alignment as an FVG filter. Treat it as contextual information to test, not a guarantee that opposing setups are traps.',
      },
      {
        title: 'Key FVG Variations to Know',
        content: `ICT has introduced several variations of the FVG concept:

Consequent Encroachment (CE): The 50% midpoint of the FVG. Some ICT traders monitor this midpoint when studying FVG revisits. A reaction there can be treated as a testable entry condition rather than a guaranteed reversal.

Inverse FVG (IFVG): When an FVG gets fully filled and price passes through it — the FVG "inverts" its polarity. A bullish FVG that gets completely filled becomes a bearish resistance zone on re-test.

Balanced Price Range (BPR): When a bullish FVG and bearish FVG overlap on different timeframes, creating an exceptionally strong zone that is a higher-confluence zone in this framework; any performance difference should be tested.

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

Risk/reward outcomes vary by setup and market; use the target and stop rules defined by your tested plan.`,
        highlight: '📌 A commonly studied ICT sequence is SSL Sweep → Bullish Displacement → FVG → potential entry near CE. Treat it as a testable setup, not a guaranteed outcome.',
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
    subtitle: 'An ICT Framework for Studying Potential Institutional Price Zones',
    level: 'Intermediate',
    duration: '22 min read',
    category: 'PD Arrays',
    imageCaption: 'Bullish OB: last bearish candle before a strong bullish move — institutions bought here',
    intro: `Order Blocks (OBs) are a major price-delivery concept in the ICT methodology. While the FVG shows you WHERE price moved fast, the Order Block shows you exactly WHERE the institution placed their original order. It's the footprint left behind by a bank or hedge fund as they accumulated their position — and traders study how price may react when it revisits these zones.`,
    sections: [
      {
        title: 'What Is an Order Block?',
        content: `An Order Block is the last opposing candle before a strong impulse move. It represents the candle where an institution was absorbing all retail orders — quietly filling their position against the crowd — before launching price in their intended direction.

Bullish Order Block:
• The last BEARISH (red) candle before a significant bullish move
• ICT interpretations may describe this candle as an area of institutional buying; actual participant positioning cannot be confirmed from the candle alone.
• The OB zone = the body of that last bearish candle (open to close)
• Price may revisit this zone and react, but the response should be treated as a testable outcome rather than an expectation

Bearish Order Block:
• The last BULLISH (green) candle before a significant bearish move
• ICT interpretations may describe this candle as an area of institutional selling; actual participant positioning cannot be confirmed from the candle alone.
• The OB zone = the body of that last bullish candle
• Price returns here as resistance

In this ICT-style framework, traders may define an OB confirmation using a BOS/ChoCH, an FVG, and displacement; these are model criteria to test rather than universal validation rules.`,
        highlight: '📌 In ICT terminology, an Order Block is studied as a candle/zone associated with a subsequent displacement move. Claims about unfilled institutional orders should be treated as a theoretical interpretation.',
      },
      {
        title: 'How to Identify a Valid Order Block',
        content: `Not every candle before a move is a valid Order Block. ICT gives specific criteria for validity:

1. Some ICT traders look for displacement after an OB, often accompanied by large directional candles and FVGs. A slower move may be treated differently depending on the model; test the rule rather than assume it is universally valid.

2. The move must include a BOS or ChoCH — confirming that structure shifted after the OB candle. This is interpreted within the ICT model as evidence of a potential structural shift; institutional intent cannot be confirmed from chart structure alone.

3. Mitigation threshold — once price returns to the OB, it should react within the body of the OB candle. Specifically, ICT says a bullish OB is valid if price holds above the 50% level of the OB candle (the midpoint between open and close).

4. Volume context — higher volume on the OB candle and the displacement move adds validity.

5. Higher timeframe alignment — a Daily OB is more powerful than a 5-minute OB. Always note the timeframe of the OB.`,
        highlight: '📌 OB validity checklist: (1) displacement after it ✓ (2) BOS or ChoCH after it ✓ (3) FVG in the displacement ✓ (4) HTF alignment ✓',
      },
      {
        title: 'Order Block Variations',
        content: `ICT has developed several OB variations over the years:

Breaker Block: An Order Block that FAILED. When price returns to an OB and instead of reversing, it blasts through — that OB is now a Breaker Block. In a bullish scenario: a bearish OB that gets violated to the upside becomes a support zone (breaker). Within the ICT interpretation, a breaker may be discussed as a former OB that changes role after being violated; the chart alone cannot confirm that institutions defended or added to a position.

Mitigation Block: When an OB is partially filled — price enters the OB but not fully. ICT considers partially mitigated OBs as still valid for future tests.

Rejection Block: The WICK of a candle before a strong move, rather than the body. When price creates a long wick before launching, that wick zone is a rejection block — slightly different from a standard OB.

Hidden OB: An OB that exists on a higher timeframe but is not visible when looking at a lower timeframe alone. Requires multi-timeframe analysis to identify.

Reclaimed OB (2024): If an OB gets swept through but price quickly returns inside it — the OB is "reclaimed" and is still valid for trading.`,
        highlight: '📌 Breaker Block is the OB that failed. When an OB gets broken through, it inverts polarity and becomes support (if bullish) or resistance (if bearish).',
      },
      {
        title: 'Order Block vs Fair Value Gap — Key Differences',
        content: `Both can be studied as potential entry zones within the framework, but they are fundamentally different:

Order Block = WHERE institutions entered (the candle they used to build their position). It's about position accumulation.

Fair Value Gap = WHERE price moved too fast and left an imbalance. It's about price inefficiency.

An OB that overlaps an FVG is one commonly studied ICT confluence pattern; whether it improves outcomes should be tested. ICT calls this a "confluence" zone. When an Order Block and FVG overlap, traders may treat the combination as additional confluence; its effectiveness should be tested rather than assumed.

How to determine which to use:
• OBs are better for swing trades and higher timeframe setups
• FVGs are better for intraday precision entries on 5m/15m
• When they overlap, some traders treat the area as additional confluence; confidence and performance should be evaluated rather than assumed.
• Consider both as part of the checklist if your tested strategy uses them.`,
        highlight: '📌 OB + FVG overlap can provide additional confluence in an ICT-style setup; it does not guarantee a better outcome.',
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
    subtitle: 'Time Is Your Edge — Studying Institutional Trading Windows',
    level: 'Intermediate',
    duration: '15 min read',
    category: 'Time & Sessions',
    imageCaption: 'The four ICT Killzones — Asian, London, New York AM, and London Close',
    intro: `Session timing can matter alongside setup selection, but neither timing nor setup type should be assumed to dominate across all markets. A setup's behavior can differ across session times; performance should be measured for the specific market and rules rather than assumed to succeed or fail at a particular time. ICT's Killzone framework provides defined time windows for studying session behavior; it does not establish that an algorithm delivers price on a fixed schedule. Killzones are an ICT time-window framework. Trading outside them is not inherently gambling, and trading inside them does not guarantee a valid setup.`,
    sections: [
      {
        title: 'What Are Killzones?',
        content: `Killzones are specific time windows during the trading day when some traders study these windows for changes in activity and liquidity; claims about IPDA activity cannot be directly verified from a chart. Some traders study these windows because of observed session behavior and liquidity patterns; reliability and reversal frequency should be evaluated with data for the instrument and rules used.

Outside of Killzones, the market is controlled by retail noise, algorithmic ping-pong, and low-liquidity chop. ICT traders simply don't trade outside these windows — not because of a rule, but because the setups don't carry the same institutional backing.

There are four main Killzones, each serving a specific role in the daily narrative. Understanding which session is doing what is the key to reading the daily AMD (Accumulate-Manipulate-Distribute) cycle.`,
        highlight: '📌 Some traders use Killzones as an execution filter; whether to restrict entries to those windows depends on the tested trading plan. Outside of them, you\'re trading retail noise, not institutional flow.',
      },
      {
        title: 'The Four Killzones',
        content: `Asian Killzone (8:00 PM – 12:00 AM EST):
Role: ACCUMULATION. Price consolidates and builds the Asian Range. This is where smart money quietly accumulates positions. The high and low of the Asian session = critical levels. Price may revisit or sweep one of these levels during London or New York. Mark them every single day.

London Killzone (2:00 AM – 5:00 AM EST):
Role: MANIPULATION / JUDAS SWING. This is where the fake move happens. London will often sweep one side of the Asian range first (the Judas Swing) — tricking retail into a trade — before reversing hard in the true direction. This is ICT's "don't trade the first 15 minutes of London" rule. The sweep of Asian high/low during this window = a liquidity grab signal.

New York AM Killzone (7:00 AM – 10:00 AM EST) — or 8:30-11:00 AM:
Role: DISTRIBUTION. The real, sustained directional move. This is where institutional positions that were accumulated in Asia and manipulated in London get DISTRIBUTED. The biggest daily candles form here. The Silver Bullet trade runs entirely within this window (specifically 10:00-11:00 AM EST for the NY AM Silver Bullet).

London Close Killzone (10:00 AM – 12:00 PM EST):
Role: REVERSAL / PROFIT TAKING. As London banks close their books, they take profits on positions opened during the London Killzone. This can coincide with a retracement or reversal of the NY AM move, but the behavior varies by session and market. ICT traders either close positions here or look for a fade trade.`,
        highlight: '📌 London = fake out (Judas). NY AM = real move. This two-step pattern is commonly taught within the AMD framework; its occurrence and usefulness should be evaluated across the market and session being studied.',
      },
      {
        title: 'ICT Macro Times',
        content: `Beyond Killzones, ICT introduced "Macro Times" — 20-minute windows within sessions that some ICT teachings use as additional timing references; traders can test whether they add useful context.

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
        highlight: '📌 Macro Times are ICT time-window concepts that some traders study for session behavior. Their precision and usefulness should be evaluated for the market and strategy being tested.',
      },
      {
        title: 'The Asian Range — Your Daily Map',
        content: `One of the most practical applications of the session framework is marking the Asian Range every single day. Here's why it matters:

The Asian session commonly forms a definable high-low range. ICT traders may interpret this range as an accumulation reference, but institutional positioning cannot be confirmed from the range alone.

London and New York sessions can interact with the Asian range. A sweep of one or both sides is not required, and target reliability varies by market and conditions.

Daily routine:
1. At midnight EST, mark the Asian Range High and Low
2. During London open (2-5 AM), watch which side gets swept first
3. The sweep direction = Judas Swing (wrong direction)
4. After the sweep, the real move goes the OTHER way
5. That gives you your NY AM directional bias

The Asian-range sweep-and-reversal setup is an example traders may study; reported profitability depends on the trader, market, execution, costs, and rules used.`,
        highlight: '📌 Marking the Asian Range can provide session context. London may sweep one side, both sides, or neither; use the result as one input rather than a guaranteed NY bias.',
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
    imageCaption: 'AMD: price accumulates in Asia, manipulates (Judas) in London, distributes in New York',
    intro: `The Power of Three (PO3), also known as AMD (Accumulate, Manipulate, Distribute), is an ICT framework for interpreting a possible sequence in price delivery; it should not be treated as a description of every trading day. Once you understand this three-act script, you will stop being confused by price action and start reading the daily narrative with clarity. Most losing days happen because traders fight this structure instead of flowing with it.`,
    sections: [
      {
        title: 'The Three Acts of a Trading Day',
        content: `The AMD framework describes a three-phase structure that traders may use to organize a session narrative:

ACT 1 — ACCUMULATION (Asian Session, 8 PM – 12 AM EST):
Institutions quietly build positions. Price consolidates in a tight range. Don't trade here — there's no direction, just noise. But DO mark the range because the high and low become critical levels for the next two acts.

ACT 2 — MANIPULATION (London Session, 2 AM – 5 AM EST):
In this framework, the manipulation phase can involve a move opposite the eventual directional move; the sequence and direction are not guaranteed. Some ICT explanations describe a bullish example as London first moving below the Asian range and a bearish example as London first moving above it. Treat these as hypotheses to test rather than assuming a fixed sequence, retail positioning, or institutional intent.

ACT 3 — DISTRIBUTION (New York AM, 7 AM – 12 PM EST):
The real, sustained move. After the Judas Swing is complete, price moves powerfully in the TRUE direction. This is where 80% of the daily range is created. This is where ICT traders make their money — catching Act 3 after identifying Acts 1 and 2.`,
        highlight: '📌 Treat the London open and any initial move as context. A Judas-style move can occur, but the first move is not reliably the wrong direction every day.',
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
• In ICT-style explanations, traders may interpret sell-side liquidity as an area where buy orders could be filled; actual institutional transactions cannot be observed directly.
• Price reverses and shoots up through 1.0850 during NY AM
• Now retail shorts are stopped out (more fuel for the up move)
• The real bullish daily candle is complete

The Judas-style sequence can recur across sessions, but its consistency varies. A lower-timeframe ChoCH can be one confirmation method within this framework, not proof that the pattern has completed.`,
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

A daily candle with a long lower wick and bullish body can be interpreted through the AMD framework as possible accumulation/manipulation/distribution, but a single candle cannot confirm those underlying events.`,
        highlight: '📌 Wick/body combinations can be used as descriptive context within AMD analysis; they do not by themselves establish a “perfect” AMD day.',
      },
      {
        title: 'AMD on Higher Timeframes',
        content: `ICT describes PO3/AMD as a fractal framework that can be applied across timeframes; whether the sequence transfers consistently across timeframes is an empirical question.

Weekly AMD:
• Monday: Accumulation (weekly range starts forming)
• Tuesday/Wednesday: Manipulation (Judas Swing of weekly highs or lows)
• Thursday/Friday: Distribution (real weekly directional move)

Monthly AMD:
• Week 1: Accumulation
• Week 2: Manipulation
• Weeks 3-4: Distribution

This means you can apply the AMD framework to weekly charts to determine which DIRECTION the week will ultimately close in. If you see the weekly sweep a key low on Tuesday — that's your weekly Judas Swing. Expect the week to close bullish.

ICT specifically notes that TUESDAY is the most common day for the weekly Judas Swing. One ICT framework describes Tuesday as a common day for a weekly Judas Swing, followed by distribution later in the week; treat this as a framework to test, not a guarantee.`,
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
    title: 'Premium & Discount',
    subtitle: 'The Price Delivery Framework — Where Institutions Buy and Where They Sell',
    level: 'Intermediate',
    duration: '22 min read',
    category: 'Price Theory',
    imageCaption: 'Premium vs Discount: ICT premium/discount framing: traders study selling in premium and buying in discount relative to a swing range',
    intro: `One important concept in ICT is this: ICT presents premium/discount as a framework for judging relative price within a defined range. It can be used as contextual information, but it does not determine every institutional transaction or guarantee better entries. The Premium & Discount framework is ICT's answer to the question every trader asks: "Is this a good price to enter?"`,
    sections: [
      {
        title: 'The Core Principle: Price Is Always Relative',
        content: `Here is the fundamental insight: there is no such thing as an objectively "good" or "bad" price. Price is only good or bad RELATIVE to a range. A price that is cheap in one context is expensive in another.\n\nICT uses the Fibonacci retracement tool not to predict reversal levels — but to define premium and discount zones within any swing range.\n\nHere's how it works:\n• Identify a significant swing low and swing high (or high to low for bearish)\n• Draw a Fibonacci from the swing low to the swing high\n• The 50% level (equilibrium) divides the range in half\n• Everything ABOVE the 50% = Premium Zone (relatively higher within the range)\n• Everything BELOW the 50% = Discount Zone (relatively lower within the range)\n\nThis is a commonly taught ICT framing of price relative to a dealing range:\n• Traders may study discount areas (below 50%) for potential long setups\n• Traders may study premium areas (above 50%) for potential short setups\n• Actual order flow and future direction cannot be confirmed from premium/discount location alone\n\nThis framework is intended to help traders compare price relative to a range; it does not establish that retail traders consistently enter at extremes or that institutions systematically take the opposite side.`,
        highlight: '📌 Study guideline: Some ICT traders use discount/premium as a directional filter. Treat it as one contextual input and test whether it improves your entries.',
      },
      {
        title: 'The Optimal Trade Entry (OTE)',
        content: `The Optimal Trade Entry (OTE) is ICT's specific buy/sell zone within the discount or premium area. It is defined by three Fibonacci levels:\n\nFor a BULLISH OTE (buy zone in discount):\n• 62% retracement — start of the OTE zone\n• 70.5% retracement — the deepest sweet spot\n• 79% retracement — the outer limit of the OTE zone\n\nWhen price pulls back into the 62-79% zone after a bullish BOS, you are in the OTE. This is where ICT traders place their buy limit orders.\n\nThese levels are part of the ICT OTE framework. Claims about institutional re-entry or consistent demand at a specific Fibonacci level are theoretical and should be tested rather than treated as established market mechanics.\n\nFor a BEARISH OTE (sell zone in premium):\n• 62% retracement of a swing high to low\n• 70.5% level\n• 79% level\n\nThe OTE is not a guarantee; within the ICT framework it is commonly studied as a potential entry zone, and its performance should be tested. It must be combined with a liquidity sweep, a Fair Value Gap or Order Block, and alignment with the higher timeframe narrative.`,
        highlight: '📌 The OTE zone is 62%-79% of a Fibonacci retracement. Within the ICT framework, this zone is commonly studied as a potential entry area rather than evidence that "smart money" is re-entering. Define your entry and invalidation rules in advance and test them rather than assuming the zone should be traded.',
      },
      {
        title: 'Premium and Discount Arrays — The Full Spectrum',
        content: `Within the premium and discount framework, ICT identifies specific price delivery arrays — zones that the framework treats as potential reaction areas. From most premium to most discount:\n\nPREMIUM ARRAYS (selling opportunities):\n1. Old Highs / Buy-Side Liquidity (BSL) — most premium\n2. Bearish Order Blocks\n3. Bearish Fair Value Gaps (FVGs)\n4. Equilibrium (50%) — the dividing line\n5. Bullish Fair Value Gaps\n6. Bullish Order Blocks\n7. Old Lows / Sell-Side Liquidity (SSL) — most discount\n\nThis spectrum provides a way to organize potential resistance in premium and support in discount; actual reactions vary by instrument, timeframe, and market conditions.\n\nUnderstanding this spectrum can help organize setups by context. An old SSL combined with bullish OB/FVG confluence may be treated as a higher-confluence example within this framework, but it does not establish the highest-quality outcome or guarantee undervaluation.`,
        highlight: '📌 The premium/discount spectrum organizes zones by their position in a range. Extremes can be studied as potential reaction areas, but reversal probability varies with market conditions.',
      },
      {
        title: 'Applying Premium & Discount Across Timeframes',
        content: `The premium/discount framework is fractal — it applies at every timeframe simultaneously. This is where ICT's multi-timeframe analysis becomes powerful.\n\nThe process:\n1. Weekly chart: Identify the major swing high and low. Is price in weekly premium or discount?\n2. Daily chart: Identify the daily swing. Is price in daily premium or discount?\n3. 4H chart: Same analysis\n4. 1H/15M: Find your entry within the OTE\n\nSome traders look for greater confluence when multiple timeframes agree:\n• Weekly: Discount (bullish bias)\n• Daily: Discount (bullish bias)\n• 4H: Pullback into discount after BOS\n• 1H/15M: OTE entry with FVG or OB\n\nWhen multiple ranges show discount, the framework may provide additional context for a potential long setup. This does not reveal what institutional traders are doing or guarantee that price is at the cheapest possible level.\n\nThe opposite alignment can be studied as premium context for potential short setups; it should not be treated as an exclusive sell condition.`,
        highlight: '📌 Multi-timeframe discount alignment can provide additional confluence in this framework. It does not guarantee institutional backing or a trading outcome.',
      },
      {
        title: 'Common Mistakes with Premium & Discount',
        content: `Even traders who understand the concept make critical errors in application:\n\nMistake 1 — Wrong swing selection:\nThe range you draw determines everything. Using the wrong swing high/low gives you the wrong premium/discount zones. Use a recent, meaningful swing that fits the range and timeframe you are analyzing; compare alternative swing selections when testing the framework.\n\nMistake 2 — Ignoring the higher timeframe:\nA lower-timeframe discount signal can conflict with a higher-timeframe premium context. Higher-timeframe context may carry more weight in this framework, but the appropriate hierarchy should be tested.\n\nMistake 3 — Entering at equilibrium:\nThe 50% level is not a buy or sell zone — it's neutral. Many traders try to enter at exactly 50% and get chopped up. The ICT OTE framework commonly uses a 62% starting level; this is a framework convention rather than evidence that 62% is inherently superior.\n\nMistake 4 — Abandoning the concept during strong trends:\nIn a very strong uptrend, price sometimes only retraces to the 38.2% or 50% level before continuing. In these cases, the OTE (62-79%) may not be reached. Don't force the framework — if price gives you a clear signal at a shallower retracement with a valid order block, take it.\n\nMistake 5 — No directional bias:\nWithin this framework, traders often combine premium/discount with a directional context from market structure. The exact sequence and filter can be tested rather than treated as mandatory.`,
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
    imageCaption: 'ICT entry models combine liquidity sweeps, displacement, and FVG/OB entries for precision execution',
    intro: `Having all the concepts in your head means nothing if you don't know HOW to combine them into a concrete trade entry. ICT entry models are structured, repeatable frameworks for defining potential entries. Their rules can be precise, but meeting the conditions does not guarantee a high-probability or profitable outcome.`,
    sections: [
      {
        title: 'The Foundation: What Makes a Valid ICT Entry',
        content: `Before learning specific entry models, understand the core requirements that every valid ICT entry must have:\n\n1. HIGHER TIMEFRAME BIAS — You must know the HTF direction before any entry. No bias = no trade.\n\n2. LIQUIDITY SWEEP — Price must take out a pool of liquidity before a valid entry. The sweep is the fuel that powers the reversal.\n\n3. DISPLACEMENT — After the sweep, price must show a strong, impulsive move in the opposite direction. A weak, grinding reversal is not displacement.\n\n4. ENTRY ARRAY — The actual entry is placed at a FVG or Order Block within the OTE zone.\n\n5. STOP LOSS — Placed beyond the liquidity sweep.\n\n6. TARGET — The next liquidity pool in the direction of the move.\n\nWhen these five elements are present, the setup matches this lesson's ICT checklist. Traders can define their own minimum requirements and test whether each element adds value.`,
        highlight: '📌 One example ICT checklist is HTF bias + liquidity sweep + displacement + entry array + clear target. Treat these as testable criteria rather than universal requirements.',
      },
      {
        title: 'Entry Model 1: The Classic Liquidity Sweep Reversal',
        content: `This is the most fundamental ICT entry model.\n\nTHE SEQUENCE:\nStep 1 — Identify the SSL level (old lows, equal lows)\nStep 2 — Wait for price to push DOWN into that level during a killzone\nStep 3 — Watch for the sweep (price wicks below, triggering stops)\nStep 4 — Look for immediate displacement upward (sharp move, FVGs left behind)\nStep 5 — Price pulls back into the FVG created by the displacement\nStep 6 — Enter long at the FVG (50% of the gap)\nStep 7 — Stop loss: below the sweep wick\nStep 8 — Target: Buy-side liquidity above\n\nThe entire sequence from sweep to entry can happen in 2-10 candles on the 5-minute chart.`,
        highlight: '📌 The classic sequence: HTF bullish → LTF sweeps SSL → displacement up → enter at FVG → target BSL. Master this before anything else.',
      },
      {
        title: 'Entry Model 2: The Order Block Entry',
        content: `The Order Block entry is used when price returns to the last opposing candle before a strong move.\n\nTHE SEQUENCE:\nStep 1 — Identify the OB: the last bearish candle before the bullish displacement\nStep 2 — Mark the OB zone: high and low of that candle\nStep 3 — Wait for price to pull back INTO the OB during a killzone\nStep 4 — Look for LTF BOS or FVG forming within the OB\nStep 5 — Enter at the 50% of the OB candle\nStep 6 — Stop: below the bottom of the OB\nStep 7 — Target: Next liquidity pool\n\nOB REFINEMENT: Traders often study the first return to an Order Block as a potential mitigation entry; test this condition against your own data rather than assuming it has universal priority. If price sweeps through — exit immediately.`,
        highlight: '📌 📌 Some ICT traders prioritize the first return to an OB. Define the entry, invalidation and management rules in advance and validate them with historical data.',
      },
      {
        title: 'Entry Model 3: The Silver Bullet',
        content: `The Silver Bullet trades only during specific 60-minute windows:\n• 3:00 AM – 4:00 AM EST (London open)\n• 10:00 AM – 11:00 AM EST (NY AM — commonly studied)\n• 2:00 PM – 3:00 PM EST (NY PM — commonly studied as a separate window)\n\nTHE SEQUENCE:\nStep 1 — Wait for the window to open\nStep 2 — HTF must show clear directional bias\nStep 3 — Price sweeps a liquidity level within the window\nStep 4 — A FVG forms on the 1M or 5M after the sweep\nStep 5 — Enter at the 50% of that FVG\nStep 6 — Stop: beyond the sweep\nStep 7 — Target: 2:1 minimum to next liquidity\n\nIf the window closes and no valid setup formed — do NOT trade. Wait for the next window.`,
        highlight: '📌 Silver Bullet windows: 3-4 AM, 10-11 AM, 2-3 PM EST. Sweep → displacement → 1M FVG entry. If no setup in the window — no trade. Time discipline is everything.',
      },
      {
        title: 'Entry Model 4: The Breaker Block',
        content: `A Breaker Block forms when an Order Block FAILS — when price sweeps through an OB, consuming the liquidity there. The former OB flips polarity and becomes a resistance zone.\n\nHOW A BREAKER FORMS:\n• A Bullish OB exists\n• Price sweeps THROUGH the OB (structure breaks)\n• The former OB is now a Bearish Breaker\n• Price pulls back to this zone — it now acts as resistance\n\nTHE SEQUENCE (Bearish Breaker):\nStep 1 — Former Bullish OB swept through\nStep 2 — HTF must be bearish\nStep 3 — Price pulls back UP to the Breaker\nStep 4 — Look for rejection (bearish FVG or LTF ChoCH)\nStep 5 — Enter short at the Breaker\nStep 6 — Stop: above the Breaker zone\nStep 7 — Target: next SSL below\n\nWithin ICT terminology, Breakers are studied as failed Order Blocks that may change role; claims about “exhausted liquidity” are an interpretation and should be tested.`,
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
    title: 'Market Maker Models',
    subtitle: 'MMBM, MMSM and multi-day price behavior within the ICT framework',
    level: 'Advanced',
    duration: '55 min',
    category: 'ICT',
    imageCaption: 'Market Maker Models are ICT teaching frameworks for studying multi-day price behavior; chart patterns do not reveal the actual positions or intentions of market participants.',
    intro: `Market Maker Buy Model (MMBM) and Market Maker Sell Model (MMSM) are ICT frameworks for organizing multi-day price behavior. They are models for observation and testing, not proof of what banks or other institutions are actually doing. The goal is to define the sequence precisely enough to study it without turning a narrative into a certainty.`,
    sections: [
      {
        title: 'MMBM — Market Maker Buy Model',
        content: `The MMBM is commonly taught as a multi-day bullish narrative in which price first creates conditions that can be interpreted as bearish accumulation or liquidity building before a later move higher.\n\nA useful study process is:\n1. Mark the relevant higher-timeframe range and obvious liquidity.\n2. Identify the sequence of daily highs and lows rather than assuming intent.\n3. Record where price expands, retraces and displaces.\n4. Define the exact level that would invalidate your interpretation.\n5. Test the complete sequence over historical samples.\n\nThe chart can show price behavior. It cannot independently prove that a market maker accumulated a specific position.`,
        highlight: '📌 Treat MMBM as a testable price-delivery framework, not as evidence of confirmed institutional positioning.',
      },
      {
        title: 'MMSM — Market Maker Sell Model',
        content: `The MMSM is the bearish counterpart used in ICT education to describe a multi-day sequence that may precede downward delivery.\n\nStudy it by mapping:\n• The higher-timeframe dealing range\n• External and internal liquidity\n• Daily displacement and retracement\n• The draw on liquidity you are testing\n• The invalidation point\n\nDo not label every multi-day decline as MMSM after the fact. Write the conditions before reviewing the outcome, then count both qualifying and non-qualifying examples.`,
        highlight: '📌 A valid study requires predefined rules. Otherwise, the model becomes a hindsight label that can be attached to almost any chart.',
      },
      {
        title: 'False Flag and Seek & Destroy',
        content: `ICT teachings use terms such as False Flag and Seek & Destroy to describe deceptive or range-bound price behavior around particular sessions or days.\n\nFor a test, define:\n• The day or session being studied\n• The reference range\n• What counts as the false move\n• What confirms the subsequent direction\n• The target and invalidation\n\nA Friday that behaves differently from the rest of the week is not automatically a Seek & Destroy or TGIF pattern. The label should only be applied when the predefined conditions are present.`,
        highlight: '📌 Narrative labels are useful only when they become measurable rules. Do not convert an interesting chart story into a trading rule without testing it.',
      },
      {
        title: 'Building a Market Maker Model Study',
        content: `A disciplined study can use a simple worksheet:\n\n1. Instrument and date\n2. Higher-timeframe range\n3. Liquidity references\n4. Model phase observed\n5. Entry trigger, if any\n6. Invalidation\n7. Target\n8. Result in R\n9. Screenshot before and after\n10. Notes on whether every rule was present\n\nCompare the model with a neutral benchmark instead of assuming it has an edge. Include missed setups and losing examples so the sample is not selected for attractive outcomes.`,
        highlight: '📌 The objective is not to prove the model. The objective is to find out whether a precisely defined version produces repeatable results after costs and execution constraints.',
      },
      {
        title: 'Friday and Weekly Context',
        content: `Seek & Destroy and TGIF discussions often focus on Friday behavior. Use weekly context first: previous-week high and low, weekly range, open gaps and the current draw on liquidity.\n\nDo not assume Friday must reverse or consolidate. Markets can trend, gap, compress or reverse on any day. A weekly narrative is a hypothesis; price action determines whether the predefined setup actually occurs.`,
        highlight: '📌 Weekly context can organize the hypothesis, but it should never override the actual entry and invalidation rules of the tested model.',
      },
    ],
    quiz: [
      { q: 'What can a Market Maker Model legitimately establish from a chart?', options: ['The exact bank positions', 'A testable framework for observed price behavior', 'The guaranteed next target', 'A guaranteed institutional order'], answer: 1 },
      { q: 'What should be defined before testing MMBM or MMSM?', options: ['Only the winning examples', 'The rules, invalidation and target', 'A prediction after the trade', 'A fixed profit guarantee'], answer: 1 },
      { q: 'What is the best way to evaluate a model?', options: ['Use one memorable chart', 'Assume the narrative is correct', 'Test predefined rules across a relevant sample', 'Change rules after every loss'], answer: 2 },
    ],
  },
  10: {
    id: 10,
    title: 'SMT Divergence',
    subtitle: 'Correlated markets, intermarket divergence and confirmation',
    level: 'Advanced',
    duration: '40 min',
    category: 'ICT',
    imageCaption: 'SMT divergence compares related markets to identify a non-confirmation; it is a contextual signal, not proof of institutional activity.',
    intro: `SMT (Smart Money Technique) divergence is an ICT concept based on comparing correlated instruments. The idea is simple: when two normally related markets reach a comparable swing area but one makes a new extreme and the other does not, traders may treat the non-confirmation as context. Divergence alone does not predict the next move.`,
    sections: [
      {
        title: 'SMT Between Correlated Pairs',
        content: `Start with two markets that have a defensible relationship, such as EURUSD and GBPUSD or NAS100 and S&P 500.\n\nMark comparable swing highs and lows on both charts. A bullish SMT example occurs when one market makes a lower low while the correlated market fails to make a corresponding lower low. A bearish example is the inverse.\n\nThe key is comparison: both markets must be viewed over the same relevant time window and swing definition.`,
        highlight: '📌 SMT is a non-confirmation between related markets. It is not proof that institutions are buying or selling at a specific level.',
      },
      {
        title: 'Intermarket SMT',
        content: `Intermarket SMT extends the same comparison idea across related asset classes or indices. Examples may include major FX pairs, US equity indices, or instruments with a commonly observed inverse relationship such as gold and the dollar.\n\nCorrelation is not constant. It can weaken or change with market regime, news and timeframe. Record the relationship you are using instead of assuming it will always behave the same way.`,
        highlight: '📌 Correlation must be validated for the instrument pair, timeframe and period being tested.',
      },
      {
        title: 'SMT With Indices',
        content: `For index traders, NAS100 and S&P 500 are a common pair to study. Compare equivalent swing points rather than simply comparing whether one chart is higher or lower.\n\nA practical workflow:\n1. Establish the higher-timeframe level or liquidity reference.\n2. Mark the corresponding swing on both indices.\n3. Check whether one index breaks the prior extreme while the other does not.\n4. Wait for your separate entry model if SMT is only a confirmation filter.\n5. Define invalidation independently of the divergence.`,
        highlight: '📌 SMT should usually be a confluence or filter, not the complete entry model.',
      },
      {
        title: 'SMT Entry Confirmation',
        content: `An SMT divergence becomes more useful for testing when combined with a clearly defined setup such as a liquidity sweep, market-structure shift or FVG.\n\nDo not enter simply because divergence appeared. Your plan should specify:\n• The correlated instruments\n• The swing definition\n• The timeframe\n• The confirmation required after SMT\n• Stop placement\n• Target\n• When the divergence is considered invalid\n\nThis makes the idea measurable instead of discretionary.`,
        highlight: '📌 Separate the SMT signal from the entry trigger. This lets you test whether SMT actually adds value to the base strategy.',
      },
      {
        title: 'Daily vs Intraday SMT',
        content: `Daily SMT and intraday SMT answer different questions. Higher-timeframe divergence can provide broader context, while intraday divergence may help with a specific session setup.\n\nKeep the timeframe fixed during a test. Avoid switching to a lower timeframe after the trade begins simply because it produces a cleaner divergence. That introduces hindsight bias.`,
        highlight: '📌 Test daily and intraday SMT separately. Mixing definitions makes it difficult to know what actually contributed to the result.',
      },
    ],
    quiz: [
      { q: 'What is the core idea behind SMT divergence?', options: ['A guaranteed reversal', 'Non-confirmation between related markets', 'A fixed risk percentage', 'A moving average crossover'], answer: 1 },
      { q: 'SMT divergence by itself should be treated as...', options: ['A guaranteed entry', 'Proof of institutional orders', 'Context or confirmation to be tested', 'A guaranteed target'], answer: 2 },
      { q: 'What should remain consistent during an SMT test?', options: ['Only winning examples', 'The instrument relationship and swing/timeframe rules', 'The rules after each trade', 'The target after entry'], answer: 2 },
    ],
  },
  11: {
    id: 11,
    title: 'IPDA & CRT',
    subtitle: 'IPDA theory, lookback ranges, gaps and Candle Range Theory',
    level: 'Advanced',
    duration: '50 min',
    category: 'ICT',
    imageCaption: 'IPDA and Candle Range Theory are educational frameworks for studying time and price behavior; they are not verified descriptions of a market-moving algorithm.',
    intro: `IPDA (Interbank Price Delivery Algorithm) and Candle Range Theory (CRT) are ICT frameworks for interpreting price delivery, time and liquidity. These ideas can organize chart study, but a chart cannot independently verify the existence, intent or operation of a specific market algorithm.`,
    sections: [
      {
        title: 'IPDA and the 20/40/60-Day Lookback',
        content: `ICT teachings commonly use 20-, 40- and 60-trading-day lookback windows when studying higher-timeframe price delivery.\n\nFor a repeatable study, mark the highs and lows associated with each window and record whether price later interacts with those levels. Do not assume every marked level is a required future target. The useful question is whether the rule adds predictive or contextual value in your tested sample.`,
        highlight: '📌 Lookback levels are reference points for testing, not guaranteed destinations.',
      },
      {
        title: 'NWOG and NDOG Gaps',
        content: `NWOG refers to a New Week Opening Gap, commonly measured between the prior Friday close and the new week's open. NDOG refers to a New Day Opening Gap, measured according to the specific daily reference convention used in your plan.\n\nTimezone and session definitions matter. Write down exactly which close and open you use so the same rule is applied every day.\n\nA gap can act as a reference level, but there is no guarantee that price will fill it.`,
        highlight: '📌 Define the exact session and timezone before testing NWOG or NDOG. Do not treat a gap fill as guaranteed.',
      },
      {
        title: 'Candle Range Theory (CRT)',
        content: `CRT is commonly taught around a range-forming candle and the idea that a later candle may sweep one side of that range before delivering toward the opposite side.\n\nA simple test requires fixed rules for:\n• The reference candle timeframe\n• The range high and low\n• What counts as a sweep\n• What confirms the directional move\n• Entry, invalidation and target\n\nThe model should be evaluated across many examples rather than selected from the cleanest historical charts.`,
        highlight: '📌 CRT becomes testable only when the reference candle, sweep and confirmation rules are defined in advance.',
      },
      {
        title: 'Weekly Draw on Liquidity',
        content: `A weekly draw on liquidity is a hypothesis about which meaningful high or low price may seek during the week. Candidates can include previous-week extremes, equal highs/lows, higher-timeframe gaps or other predefined liquidity references.\n\nChoose one rule for selecting the draw. If you change the target after seeing price action, the analysis becomes hindsight rather than a test.`,
        highlight: '📌 A draw on liquidity is a hypothesis about a target, not a promise about where price must go.',
      },
      {
        title: 'Combining IPDA and CRT',
        content: `One disciplined workflow is to use higher-timeframe lookback levels for context, weekly liquidity for the broader target, and CRT only when its exact conditions appear.\n\nKeep the layers separate. If the higher-timeframe hypothesis is invalidated, the lower-timeframe entry should not be rescued by changing the narrative.`,
        highlight: '📌 Separate context, setup and target. This prevents one attractive chart story from overriding invalidation rules.',
      },
    ],
    quiz: [
      { q: 'What are the commonly taught IPDA lookback windows?', options: ['5/10/15 days', '20/40/60 trading days', '30/60/90 calendar days', '1/2/3 hours'], answer: 1 },
      { q: 'What does NWOG commonly reference?', options: ['The Friday close versus the new week open', 'The NY lunch range', 'A 1-minute FVG', 'A moving-average crossover'], answer: 1 },
      { q: 'What makes a CRT idea testable?', options: ['Changing the range after the outcome', 'A fixed reference candle, sweep and confirmation rule', 'Only studying winning charts', 'Assuming every range will reverse'], answer: 1 },
    ],
  },
  12: {
    id: 12,
    title: 'ICT 2024 Mentorship',
    subtitle: 'Venom, Propulsion Blocks, quarterly shifts and newer ICT concepts',
    level: 'Advanced',
    duration: '75 min',
    category: '2024',
    imageCaption: 'Newer ICT concepts can be studied as defined frameworks, but labels and interpretations should be checked against the source material and tested before use.',
    intro: `This module collects newer concepts associated with ICT's 2024-era teaching, including the Venom Model, Propulsion Blocks, Quarterly Shifts, SCOB, QML and weekly profile templates. Because terminology and examples can evolve, treat the source material as the definition of the model and separate documented rules from your own interpretation.`,
    sections: [
      {
        title: 'Venom Model',
        content: `The Venom Model is a time-based ICT framework that combines session context, liquidity and price delivery into a defined setup sequence. When studying it, record the exact session window, liquidity condition, displacement or structure condition, entry trigger, invalidation and target from the source material you are following.\n\nDo not add a rule simply because it appears to improve historical examples. If you modify the model, label it as your own variant and test it separately.`,
        highlight: '📌 Keep the published model and your personal variation separate. Otherwise you cannot tell which rules produced your results.',
      },
      {
        title: 'Propulsion Block',
        content: `A Propulsion Block is a price-action concept used to describe a zone associated with continuation after a displacement. The exact identification rules matter more than the label.\n\nFor a test, specify which candle or range qualifies, what confirms the block, where the invalidation sits and what target is expected. Avoid marking every continuation candle as a Propulsion Block after the move has already happened.`,
        highlight: '📌 A zone is only useful as a trading rule when its identification and invalidation can be applied before the outcome.',
      },
      {
        title: 'Quarterly Shift',
        content: `Quarterly Shift concepts focus on changes around the start of a new calendar quarter. Mark the relevant quarterly reference and study how price behaves around it without assuming that every quarter produces a reversal.\n\nCompare several quarters and include both directional and non-directional examples. Seasonality-like narratives can be interesting, but the sample determines whether they add measurable value.`,
        highlight: '📌 Calendar timing can be studied as context; it should not be treated as a guaranteed directional signal.',
      },
      {
        title: 'SCOB and QML',
        content: `SCOB (Silver Bullet Order Block) and QML (Quasi Market Level) are newer terminology that can be incorporated into an ICT study process.\n\nFor either concept, preserve the source definition and then create a checklist: location, structure, liquidity, trigger, invalidation and target. If your definition differs from the source, document the difference.`,
        highlight: '📌 New terminology is not automatically a new edge. Define it precisely, then test whether it adds information beyond your existing model.',
      },
      {
        title: 'Weekly Profile Templates',
        content: `Weekly profile templates organize expectations around how price may behave during different parts of the trading week. They are useful as hypotheses for planning, but the actual week can deviate substantially from a template.\n\nUse the template to prepare scenarios rather than to force price into a predetermined narrative. Record which scenario occurred and which did not.`,
        highlight: '📌 A profile is a planning framework. Let actual price invalidate the scenario instead of forcing the chart to match the template.',
      },
    ],
    quiz: [
      { q: 'How should newer ICT concepts be handled when testing them?', options: ['Treat every label as a guaranteed edge', 'Define the rules precisely and test them', 'Change the rules after every loss', 'Ignore invalidation'], answer: 2 },
      { q: 'What is the purpose of separating a source model from your variation?', options: ['To make the strategy look more complex', 'To know which rules were actually tested', 'To guarantee higher win rate', 'To avoid journaling'], answer: 2 },
      { q: 'How should weekly profile templates be used?', options: ['As guaranteed predictions', 'As planning hypotheses that can be invalidated', 'As automatic entries', 'As fixed targets every week'], answer: 1 },
    ],
  },
  13: {
    id: 13,
    title: 'SMC — Smart Money Concepts',
    subtitle: 'Structure, order blocks, FVGs, CHoCH and a rules-based SMC workflow',
    level: 'Advanced',
    duration: '50 min',
    category: 'SMC',
    imageCaption: 'SMC is a broad community framework with overlapping terminology; exact definitions vary, so the trading rules must be stated explicitly.',
    intro: `Smart Money Concepts (SMC) is a community-used framework that overlaps heavily with ICT terminology. There is no single universal SMC rulebook, so this module focuses on the common concepts—structure, liquidity, order blocks, FVGs, CHoCH, inducement and a structured trade process—while making the definitions explicit.`,
    sections: [
      {
        title: 'SMC vs ICT',
        content: `SMC and ICT share concepts such as market structure, liquidity, order blocks, fair value gaps and displacement. ICT refers to the specific teaching associated with Michael J. Huddleston, while SMC is a broader community label used by many educators.\n\nDo not assume two traders mean the same thing when they use the same term. Define the exact swing, candle, range and confirmation rules in your own plan.`,
        highlight: '📌 The biggest practical difference is often terminology and source lineage. Always define the rule instead of relying on the label.',
      },
      {
        title: 'Supply and Demand Zones',
        content: `Supply and demand zones are broad price areas where traders expect prior imbalance between buyers and sellers to matter again. They are not proof of resting institutional orders.\n\nA useful zone definition should include its origin, the displacement that followed, the timeframe, the invalidation condition and whether the zone has already been mitigated.`,
        highlight: '📌 Avoid drawing dozens of zones. A zone needs a consistent definition and an objective invalidation rule.',
      },
      {
        title: 'SMC Order Blocks',
        content: `An SMC order block is commonly described as a candle or small range before a strong directional move. Different educators define the qualifying candle differently.\n\nFor testing, define:\n• Which candle qualifies\n• Minimum displacement condition\n• Whether a liquidity event is required\n• Entry location\n• Invalidation\n• Target\n\nDo not call every opposite-colored candle an order block.`,
        highlight: '📌 The term “order block” does not prove that a specific institution placed an order at that candle.',
      },
      {
        title: 'SMC CHoCH and BOS',
        content: `BOS (Break of Structure) is commonly used to describe a break supporting the current structural direction. CHoCH (Change of Character) is commonly used for a break suggesting a change in short-term behavior.\n\nThe terminology varies. Your test should state which swing must break, whether a candle close is required and which timeframe controls the decision.`,
        highlight: '📌 Define your BOS and CHoCH rules before the chart outcome. Otherwise the same move can be labeled differently after the fact.',
      },
      {
        title: 'Inducement and the SMC Trade Framework',
        content: `Inducement is commonly used for a price feature that attracts traders before a larger move. Because intent cannot be observed directly, use it as a chart hypothesis rather than a statement about what participants were thinking.\n\nA complete SMC workflow can be written as:\n1. Higher-timeframe context\n2. Liquidity reference\n3. Structure condition\n4. Setup zone\n5. Entry trigger\n6. Invalidation\n7. Target\n8. Risk and review rules\n\nEvery component should be testable independently.`,
        highlight: '📌 SMC becomes a system only when context, setup, trigger, invalidation, target and risk are all written as rules.',
      },
    ],
    quiz: [
      { q: 'What is SMC in common trading usage?', options: ['A single official rulebook', 'A broad community framework with overlapping ICT concepts', 'A guaranteed institutional feed', 'A broker execution method'], answer: 1 },
      { q: 'What should be defined when testing an SMC order block?', options: ['Only its color', 'The qualifying conditions and invalidation', 'A guaranteed target', 'The outcome first'], answer: 1 },
      { q: 'What is a key difference between BOS and CHoCH terminology?', options: ['They always mean exactly the same thing', 'BOS often describes continuation while CHoCH is used for a possible change', 'BOS is an indicator and CHoCH is a broker', 'Neither relates to structure'], answer: 1 },
    ],
  },
  14: {
    id: 14,
    title: 'Top-Down Analysis',
    subtitle: 'From Monthly context to 1-minute execution',
    level: 'Intermediate',
    duration: '45 min',
    category: 'ICT & SMC',
    imageCaption: 'Top-down analysis moves from higher-timeframe context toward lower-timeframe execution while keeping the definitions and invalidation rules consistent.',
    intro: `Top-down analysis is a multi-timeframe process: start with broad context, identify meaningful levels and liquidity, then move down toward the timeframe where the actual entry is defined. The purpose is not to make the lower timeframe obey the higher timeframe; it is to make the relationship between context and execution explicit.`,
    sections: [
      {
        title: 'Monthly and Weekly Bias',
        content: `Begin with the largest relevant structure. Mark major swing highs and lows, important gaps or arrays, and the current dealing range.\n\nOn the weekly chart, add previous-week high and low and the liquidity references that matter to your strategy. Write a short hypothesis such as “price is approaching weekly sell-side liquidity” instead of assuming that the level must be reached.\n\nHigher-timeframe context should guide the scenario, not override a clear invalidation.`,
        highlight: '📌 Higher timeframes provide context. They do not guarantee what the lower timeframe will do next.',
      },
      {
        title: 'Daily Narrative Building',
        content: `The daily chart connects the weekly context to the current session. Mark previous-day high and low, relevant gaps, major FVGs or order blocks, and the current dealing range.\n\nThen write one or two scenarios:\n• Bullish scenario: what must happen for the long thesis to remain valid?\n• Bearish scenario: what must happen for the short thesis to remain valid?\n\nIf neither scenario is confirmed, staying neutral is a valid outcome.`,
        highlight: '📌 A useful daily narrative contains conditions that can invalidate it. A directional statement without invalidation is only a prediction.',
      },
      {
        title: '4H Confirmation',
        content: `Use the 4H chart to refine structure between the daily narrative and intraday execution. Check whether the current swing sequence supports the scenario and where the nearest meaningful liquidity sits.\n\nDo not keep changing the higher-timeframe narrative every time a small 4H candle moves. Define the swing structure before the session begins and update it only when your structural rule is actually met.`,
        highlight: '📌 The 4H layer should refine the scenario, not create endless narrative changes during execution.',
      },
      {
        title: '15M and 5M Entry Timeframes',
        content: `Once context is established, move down to the execution environment. On 15M and 5M, mark session highs/lows, local liquidity and the setup zone.\n\nA lower-timeframe entry should have its own trigger—such as a defined displacement, structure shift or FVG rule. The exact trigger depends on the strategy being tested.\n\nAvoid entering merely because price reached a higher-timeframe level.`,
        highlight: '📌 A higher-timeframe level is context. The lower-timeframe trigger is what turns the context into a testable entry.',
      },
      {
        title: 'Full Trade Walkthrough',
        content: `A complete top-down routine can be written as:\n1. Monthly/weekly: major context and liquidity\n2. Daily: current narrative and scenarios\n3. 4H: structural confirmation\n4. 15M: session structure and setup zone\n5. 5M/1M: entry trigger and invalidation\n6. Trade: predefined target and risk\n7. Review: screenshot every layer and record whether each rule was present\n\nIf any required layer is missing, mark the trade as “not qualified” instead of filling the gap with hindsight.`,
        highlight: '📌 The strongest top-down process is the one you can repeat without changing definitions after seeing the result.',
      },
    ],
    quiz: [
      { q: 'What is the main purpose of top-down analysis?', options: ['To guarantee a direction', 'To connect higher-timeframe context with lower-timeframe execution', 'To avoid using lower timeframes', 'To predict every candle'], answer: 1 },
      { q: 'What should a daily narrative include?', options: ['Only a direction', 'A scenario and conditions that can invalidate it', 'A guaranteed target', 'A prediction after the trade'], answer: 1 },
      { q: 'What turns a higher-timeframe level into a testable entry?', options: ['The level alone', 'A defined lower-timeframe trigger and invalidation', 'A larger position', 'A fixed profit percentage'], answer: 1 },
    ],
  },


};

// Merge in new lessons (15-28)

import { LESSONS_EXTRA } from './lessons-data';

export const ALL_LESSONS = { ...LESSONS, ...LESSONS_EXTRA };
