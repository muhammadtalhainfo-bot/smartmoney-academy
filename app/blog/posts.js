export const POSTS = [
  {
    slug: 'what-is-ict-trading',
    title: 'What Is ICT Trading? The Complete Beginner\'s Guide',
    description: 'ICT (Inner Circle Trader) is a trading methodology developed by Michael Huddleston that teaches how institutional money moves markets. Learn the core concepts here.',
    category: 'Beginner',
    readTime: '8 min read',
    date: 'March 15, 2026',
    image: '/images/market-structure.png',
    content: [
      {
        type: 'intro',
        text: 'ICT — Inner Circle Trader — is a trading methodology developed by Michael J. Huddleston. It teaches retail traders how to think and trade like institutional money. Instead of relying on lagging indicators or random patterns, ICT focuses on understanding how banks, hedge funds, and algorithmic systems actually move price.',
      },
      {
        type: 'heading',
        text: 'Who Created ICT?',
      },
      {
        type: 'paragraph',
        text: 'Michael J. Huddleston, known online as "ICT" (Inner Circle Trader), began sharing his methodology on YouTube and trading forums starting in the early 2010s. He has since built one of the largest free trading education communities in the world, with millions of views on his YouTube channel. His 2022 and 2023 mentorship series on YouTube are considered the most comprehensive free trading education ever released.',
      },
      {
        type: 'heading',
        text: 'The Core Premise of ICT',
      },
      {
        type: 'paragraph',
        text: 'The foundation of ICT is simple but powerful: price is not random. Markets are driven by algorithms — programmed systems that deliver price to specific levels in a predictable manner. These algorithms are designed to hunt liquidity (stop orders clustered at obvious levels), create imbalances (Fair Value Gaps), and then deliver price to targets.',
      },
      {
        type: 'heading',
        text: 'Key ICT Concepts',
      },
      {
        type: 'list',
        items: [
          'Market Structure — Understanding how price creates trends through Higher Highs/Lower Lows and Break of Structure (BOS)',
          'Liquidity — Buy-side liquidity above highs, sell-side liquidity below lows — where institutional orders rest',
          'Fair Value Gaps (FVG) — 3-candle imbalances that price returns to fill',
          'Order Blocks — The last candle before a displacement move — where institutions left unfilled orders',
          'Killzones — Specific time windows (London Open, NY AM) when institutional activity peaks',
          'AMD Model — Accumulation, Manipulation, Distribution — the daily market cycle',
        ],
      },
      {
        type: 'heading',
        text: 'Why ICT Works',
      },
      {
        type: 'paragraph',
        text: 'ICT works because it aligns with how large institutions actually operate. Banks and hedge funds cannot enter or exit positions the way retail traders do — they need liquidity to fill massive orders. This means they intentionally move price to areas where retail stop orders are clustered, triggering those stops to fill their own positions. ICT teaches you to identify these patterns and trade alongside institutional flow rather than against it.',
      },
      {
        type: 'heading',
        text: 'ICT vs Traditional Technical Analysis',
      },
      {
        type: 'paragraph',
        text: 'Traditional technical analysis relies on lagging indicators (moving averages, RSI, MACD) and subjective patterns (head and shoulders, triangles). ICT abandons these in favor of price action concepts that reflect actual institutional behavior. Instead of asking "what does the RSI say?", an ICT trader asks "where is the liquidity, and where will the algorithm deliver price next?"',
      },
      {
        type: 'heading',
        text: 'How to Learn ICT',
      },
      {
        type: 'paragraph',
        text: 'The best free resource is ICT\'s YouTube channel (@InnerCircleTrader) where he has published thousands of hours of content. ICT Flow has structured this content into a progressive 14-module curriculum — from basic market structure all the way to advanced IPDA theory — making it easier to learn ICT in a logical sequence rather than jumping between random videos.',
      },
      {
        type: 'cta',
        text: 'Start learning ICT for free with our structured curriculum',
        link: '/courses',
        label: 'View Curriculum →',
      },
    ],
  },
  {
    slug: 'how-to-trade-fair-value-gaps',
    title: 'How to Trade Fair Value Gaps (FVG) — ICT Strategy Guide',
    description: 'Fair Value Gaps are one of the most powerful ICT concepts. Learn what they are, how to identify them, and how to trade them profitably.',
    category: 'Strategy',
    readTime: '10 min read',
    date: 'March 14, 2026',
    image: '/images/fvg.png',
    content: [
      {
        type: 'intro',
        text: 'A Fair Value Gap (FVG) is a price imbalance created when a large displacement candle moves so fast that it leaves a "gap" between three candles. The algorithm — the institutional pricing mechanism — tends to return to these gaps to rebalance price before continuing in the original direction.',
      },
      {
        type: 'heading',
        text: 'What Is a Fair Value Gap?',
      },
      {
        type: 'paragraph',
        text: 'An FVG forms across three consecutive candles. For a bullish FVG: candle 1\'s high and candle 3\'s low do not overlap — there is a clear gap between them. This gap represents an area of price imbalance where the market moved too quickly for all orders to be filled. The algorithm is programmed to return to these areas to "fill" the imbalance.',
      },
      {
        type: 'heading',
        text: 'Bullish vs Bearish FVG',
      },
      {
        type: 'list',
        items: [
          'Bullish FVG — Gap between candle 1 high and candle 3 low after an upward displacement. Price returns from above to fill it — buy zone.',
          'Bearish FVG — Gap between candle 1 low and candle 3 high after a downward displacement. Price returns from below to fill it — sell zone.',
          'Inverse FVG — When an FVG is completely filled and price passes through it, the FVG flips polarity and becomes the opposite bias.',
        ],
      },
      {
        type: 'heading',
        text: 'How to Trade an FVG — Step by Step',
      },
      {
        type: 'list',
        items: [
          'Step 1: Identify the higher timeframe bias (bullish or bearish) using daily/4H structure',
          'Step 2: Wait for a displacement move that creates an FVG in the direction of the bias',
          'Step 3: Mark the FVG zone — the gap between candle 1 and candle 3',
          'Step 4: Wait for price to retrace into the FVG (ideally to the 50% midpoint)',
          'Step 5: Look for a lower timeframe (1m/5m) ChoCH or BOS confirming the reversal',
          'Step 6: Enter at the FVG — stop below the FVG low (bullish) or above FVG high (bearish)',
          'Step 7: Target the next liquidity pool — previous swing high/low or BSL/SSL',
        ],
      },
      {
        type: 'heading',
        text: 'The 50% Entry Rule',
      },
      {
        type: 'paragraph',
        text: 'The highest probability entry within an FVG is at the 50% midpoint of the gap. This gives you the best risk-reward ratio — your stop is below the bottom of the FVG (for bullish) and your target is the full FVG fill plus the next liquidity level. Many ICT traders use limit orders placed at the 50% level to automatically enter when price retraces.',
      },
      {
        type: 'heading',
        text: 'What Invalidates an FVG?',
      },
      {
        type: 'paragraph',
        text: 'A bullish FVG is invalidated when price closes below the bottom of the gap (candle 3\'s low). A bearish FVG is invalidated when price closes above the top of the gap (candle 3\'s high). A wick into the FVG does not invalidate it — only a full candle close through it.',
      },
      {
        type: 'heading',
        text: 'Best Timeframes for FVG Trading',
      },
      {
        type: 'paragraph',
        text: 'FVGs work on all timeframes but carry more weight on higher timeframes. A daily FVG is significantly more powerful than a 1-minute FVG. The best approach is top-down: identify a daily or 4H FVG for context, then drop to the 15m or 1m to find a precise entry within the FVG zone.',
      },
      {
        type: 'cta',
        text: 'Learn Fair Value Gaps in depth in Module 3',
        link: '/lesson/3',
        label: 'Start Module 3 →',
      },
    ],
  },
  {
    slug: 'ict-order-blocks-explained',
    title: 'ICT Order Blocks Explained — How to Find and Trade Them',
    description: 'Order blocks are the footprints institutions leave behind. Learn how to identify bullish and bearish order blocks and use them for high-probability entries.',
    category: 'Strategy',
    readTime: '9 min read',
    date: 'March 13, 2026',
    image: '/images/order-blocks.png',
    content: [
      {
        type: 'intro',
        text: 'An Order Block (OB) is the last candle before a significant displacement move. It represents a price level where institutions placed large orders. When price returns to this level, those unfilled institutional orders are still waiting — creating a high-probability reaction zone.',
      },
      {
        type: 'heading',
        text: 'What Is an Order Block?',
      },
      {
        type: 'paragraph',
        text: 'When a bank or large institution wants to buy or sell a massive position, they cannot fill everything in one transaction — the market would move against them. Instead, they place orders in layers. The last candle before a large move represents where they placed the bulk of their orders. Price returning to this level finds those unfilled orders still sitting there, creating a reaction.',
      },
      {
        type: 'heading',
        text: 'Bullish vs Bearish Order Blocks',
      },
      {
        type: 'list',
        items: [
          'Bullish Order Block — The last bearish (red) candle before a strong bullish displacement. Institutions bought into the selling pressure of this candle.',
          'Bearish Order Block — The last bullish (green) candle before a strong bearish displacement. Institutions sold into the buying pressure of this candle.',
          'The OB zone is defined by the body of the candle (open to close) — not the wicks.',
        ],
      },
      {
        type: 'heading',
        text: 'What Makes a High-Quality Order Block?',
      },
      {
        type: 'list',
        items: [
          'Preceded by a clear displacement — a large, impulsive move away from the OB',
          'Located in a discount zone (for bullish OBs) or premium zone (for bearish OBs)',
          'Has not been tested before — virgin OBs are strongest',
          'Aligns with higher timeframe structure and bias',
          'Formed during a killzone (London or NY session)',
          'Accompanied by a Fair Value Gap nearby',
        ],
      },
      {
        type: 'heading',
        text: 'How to Trade an Order Block',
      },
      {
        type: 'list',
        items: [
          'Identify the HTF bias (bullish or bearish)',
          'Find a valid OB — last candle before a displacement in the direction of bias',
          'Mark the OB zone: open to close of that candle',
          'Wait for price to retrace into the OB',
          'Look for LTF confirmation: ChoCH or bullish/bearish candle from the OB',
          'Enter at the OB — stop beyond the OB high/low',
          'Target: next opposing liquidity pool',
        ],
      },
      {
        type: 'heading',
        text: 'The Breaker Block',
      },
      {
        type: 'paragraph',
        text: 'A breaker block forms when a prior order block fails — price trades completely through it. The former support becomes resistance and vice versa. Breaker blocks are powerful because they represent failed institutional attempts, and the reversal from a breaker is often sharp and clean.',
      },
      {
        type: 'heading',
        text: 'Order Block vs Supply and Demand',
      },
      {
        type: 'paragraph',
        text: 'Order blocks are more specific than traditional supply and demand zones. While supply/demand identifies general areas of interest, OBs pinpoint the exact candle where institutional orders were placed. This makes OBs more precise for entries and stop placement.',
      },
      {
        type: 'cta',
        text: 'Master Order Blocks in Module 4',
        link: '/lesson/4',
        label: 'Start Module 4 →',
      },
    ],
  },
  {
    slug: 'best-prop-firms-ict-traders',
    title: 'Best Prop Firms for ICT Traders in 2026',
    description: 'The top funded trading firms for ICT and Smart Money Concepts traders. Compare challenges, profit splits, and rules to find your best fit.',
    category: 'Resources',
    readTime: '7 min read',
    date: 'March 12, 2026',
    image: '/images/market-structure.png',
    content: [
      {
        type: 'intro',
        text: 'Prop trading firms give you access to institutional capital — you trade their money and keep a percentage of the profits. For ICT traders, prop firms are the fastest path to trading significant size without risking personal savings. Here are the top options in 2026.',
      },
      {
        type: 'heading',
        text: 'What to Look for in a Prop Firm (ICT Perspective)',
      },
      {
        type: 'list',
        items: [
          'Low maximum drawdown rules (10% or higher gives more breathing room)',
          'No minimum trading day requirements — ICT setups only appear when conditions align',
          'Weekend holding allowed — ICT traders sometimes hold positions over weekends',
          'NAS100 and Gold available — the most popular ICT instruments',
          'Fair profit split — 80% or higher',
          'Reasonable challenge cost relative to account size',
        ],
      },
      {
        type: 'heading',
        text: '1. FTMO — The Gold Standard',
      },
      {
        type: 'paragraph',
        text: 'FTMO is the most established prop firm with over 100,000 funded traders. They offer accounts from $10,000 to $200,000 with an 80-90% profit split. The 2-step evaluation requires a 10% profit target with a 10% maximum drawdown. FTMO is well-suited for ICT traders because there are no minimum trading day requirements in Phase 2, and they support all major instruments including NAS100 and XAUUSD.',
      },
      {
        type: 'heading',
        text: '2. The Funded Trader',
      },
      {
        type: 'paragraph',
        text: 'TFT offers up to 90% profit split with their Royal plan. They have flexible evaluation options and support scaling up to $1.5 million in funding. Weekend holding is allowed, making it ideal for ICT traders who hold swing positions.',
      },
      {
        type: 'heading',
        text: '3. E8 Funding',
      },
      {
        type: 'paragraph',
        text: 'E8 is beginner-friendly with simple rules and a 1-step evaluation option. An 8% maximum drawdown with 80% profit split. Great for ICT traders new to prop trading who want straightforward rules.',
      },
      {
        type: 'heading',
        text: 'Tips for Passing a Prop Firm Challenge with ICT',
      },
      {
        type: 'list',
        items: [
          'Trade only A-grade setups — quality over quantity. 1-3 trades per week is enough.',
          'Never risk more than 0.5-1% per trade — the challenge is a marathon, not a sprint.',
          'Only trade during killzones — London Open and NY AM produce the best ICT setups.',
          'Keep a trade journal — document every trade and review weekly.',
          'Do not revenge trade after a loss — protect the drawdown above all else.',
          'Wait for full confluence — liquidity sweep + FVG/OB + killzone time + correct bias.',
        ],
      },
      {
        type: 'cta',
        text: 'View our recommended prop firms with exclusive deals',
        link: '/resources',
        label: 'View Resources →',
      },
    ],
  },
  {
    slug: 'what-are-killzones-ict',
    title: 'What Are ICT Killzones? The Best Times to Trade',
    description: 'ICT Killzones are specific time windows when institutional activity peaks. Learn the four killzones and why trading during them dramatically improves your results.',
    category: 'Strategy',
    readTime: '7 min read',
    date: 'March 11, 2026',
    image: '/images/killzones.png',
    content: [
      {
        type: 'intro',
        text: 'ICT Killzones are specific time windows during the trading day when institutional activity is at its highest. Trading during killzones means you are operating when the algorithm is most active — increasing your probability of catching the real directional move rather than random noise.',
      },
      {
        type: 'heading',
        text: 'The Four ICT Killzones',
      },
      {
        type: 'list',
        items: [
          'Asian Killzone (7 PM – 12 AM EST) — Low volatility range building. Liquidity accumulates for London to target.',
          'London Open Killzone (2 AM – 5 AM EST) — Most important session. The Judas Swing happens here — false move then real direction.',
          'New York AM Killzone (8 AM – 12 PM EST) — Second most important. NY-London overlap creates highest volume.',
          'New York Lunch (12 PM – 1:30 PM EST) — Avoid trading. Low volume, random movement.',
        ],
      },
      {
        type: 'heading',
        text: 'Why Killzones Matter',
      },
      {
        type: 'paragraph',
        text: 'Outside of killzones, price action is largely random — retail traders chasing noise. During killzones, institutional algorithms are actively delivering price to target levels. This is when Fair Value Gaps form, Order Blocks are tested, and liquidity sweeps occur. A setup that appears at 3 AM EST (London killzone) is exponentially higher quality than the same setup appearing at 11 AM EST (post-NY-open).',
      },
      {
        type: 'heading',
        text: 'The London Open and the Judas Swing',
      },
      {
        type: 'paragraph',
        text: 'The London killzone (2-5 AM EST) is where most professional ICT traders focus. London typically begins with a false move in the opposite direction of the true daily bias — this is the Judas Swing. It sweeps the Asian session liquidity (highs or lows) before reversing in the true direction. The Judas Swing completion (confirmed by a lower timeframe ChoCH) is often the highest-probability entry of the entire day.',
      },
      {
        type: 'heading',
        text: 'ICT Macro Times',
      },
      {
        type: 'list',
        items: [
          '8:20-8:40 AM EST — Pre-market macro before NY open',
          '9:30-10:00 AM EST — NY stock market open volatility',
          '10:00-11:00 AM EST — Silver Bullet window — highest probability intraday setups',
          '2:00-3:00 PM EST — Afternoon Silver Bullet window',
          '3:00-4:00 PM EST — End of day positioning',
        ],
      },
      {
        type: 'heading',
        text: 'What to Do During Non-Killzone Hours',
      },
      {
        type: 'paragraph',
        text: 'During Asian session: mark key levels, identify potential liquidity targets, plan your bias for London. During NY lunch: do not trade — review morning trades, update your journal. After 4 PM EST: close positions or manage trailing stops. The discipline to NOT trade outside killzones is what separates consistently profitable ICT traders from those who overtrade.',
      },
      {
        type: 'cta',
        text: 'Learn Killzones in depth — Module 5',
        link: '/lesson/5',
        label: 'Start Module 5 →',
      },
    ],
  },
  {
    slug: 'how-to-pass-ftmo-challenge',
    title: 'How to Pass the FTMO Challenge Using ICT Strategy',
    description: 'A practical guide to passing the FTMO funded trader challenge using ICT concepts. Rules, strategy, and the mindset needed to get funded.',
    category: 'Resources',
    readTime: '9 min read',
    date: 'March 10, 2026',
    image: '/images/market-structure.png',
    content: [
      {
        type: 'intro',
        text: 'The FTMO challenge is the gateway to trading up to $200,000 in institutional capital. With ICT methodology, you have a structured, rules-based approach that aligns perfectly with prop firm requirements. Here is exactly how to approach the challenge.',
      },
      {
        type: 'heading',
        text: 'FTMO Challenge Rules (2026)',
      },
      {
        type: 'list',
        items: [
          'Phase 1: 10% profit target, 10% max drawdown, 5% daily loss limit, minimum 4 trading days',
          'Phase 2 (Verification): 5% profit target, same drawdown rules, minimum 4 trading days',
          'Funded: 80-90% profit split, bi-weekly payouts, no time limit',
          'Instruments: Forex, indices (NAS100, S&P500), commodities (Gold), crypto',
        ],
      },
      {
        type: 'heading',
        text: 'The ICT Approach to FTMO',
      },
      {
        type: 'paragraph',
        text: 'The key to passing FTMO with ICT is patience and selectivity. You do not need to trade every day. You need 1-3 A-grade setups per week. With proper 1-2% risk per trade and a 3:1 reward-to-risk ratio, you only need to win 4-5 trades in Phase 1 to hit the 10% target — while keeping drawdown minimal.',
      },
      {
        type: 'heading',
        text: 'Risk Management for FTMO',
      },
      {
        type: 'list',
        items: [
          'Risk 0.5-1% per trade maximum — never more than 1% on any single trade',
          'Max 3 open trades at once — and only if they are uncorrelated',
          'If you lose 2% in a day, stop trading — protect the 5% daily limit',
          'Never risk more than 3% per week — think long term',
          'Move stop to break-even once trade reaches 1:1 profit',
        ],
      },
      {
        type: 'heading',
        text: 'What Setups to Take on FTMO',
      },
      {
        type: 'paragraph',
        text: 'Only A-grade ICT setups: higher timeframe bias confirmed + killzone timing + liquidity sweep + FVG or OB entry + discount/premium alignment. If even one of these is missing, do not take the trade. The FTMO challenge rewards patience — not activity.',
      },
      {
        type: 'heading',
        text: 'Common Reasons ICT Traders Fail FTMO',
      },
      {
        type: 'list',
        items: [
          'Over-trading — taking B and C grade setups out of boredom',
          'Trading during NY lunch session when price is random',
          'Risking too much per trade to hit the target faster',
          'Not having a defined daily loss limit and blowing through it emotionally',
          'Trading correlated pairs simultaneously (EURUSD and GBPUSD both long = double exposure)',
          'Not journaling — unable to identify what went wrong',
        ],
      },
      {
        type: 'cta',
        text: 'View our recommended prop firms',
        link: '/resources',
        label: 'View Prop Firms →',
      },
    ],
  },
  {
    slug: 'smc-vs-ict-difference',
    title: 'SMC vs ICT — What\'s the Difference?',
    description: 'SMC (Smart Money Concepts) and ICT are often confused. Here is a clear breakdown of what each methodology teaches and how they relate to each other.',
    category: 'Beginner',
    readTime: '6 min read',
    date: 'March 9, 2026',
    image: '/images/market-structure.png',
    content: [
      {
        type: 'intro',
        text: 'SMC (Smart Money Concepts) and ICT (Inner Circle Trader) are frequently used interchangeably online, but they are not exactly the same thing. Understanding the difference helps you know what you are actually learning and from whom.',
      },
      {
        type: 'heading',
        text: 'What Is ICT?',
      },
      {
        type: 'paragraph',
        text: 'ICT is a specific trading methodology created by Michael J. Huddleston. It is a comprehensive system that includes market structure, liquidity theory, Fair Value Gaps, Order Blocks, Killzones, the AMD model, IPDA (Interbank Price Delivery Algorithm), and much more. ICT is the original source — everything is documented in Huddleston\'s YouTube videos and mentorship series.',
      },
      {
        type: 'heading',
        text: 'What Is SMC?',
      },
      {
        type: 'paragraph',
        text: 'SMC (Smart Money Concepts) is a broader term used by the trading community to describe a style of trading that focuses on institutional order flow. SMC incorporates many ICT concepts but is not attributed to any single creator. Different SMC educators teach variations of ICT concepts, sometimes with different terminology or slight modifications.',
      },
      {
        type: 'heading',
        text: 'Key Differences',
      },
      {
        type: 'list',
        items: [
          'ICT has one creator (Michael Huddleston) with a specific, documented system. SMC is a community-evolved term used by many educators.',
          'ICT includes advanced concepts like IPDA, CRT, and quarterly shifts that are not commonly covered in generic SMC content.',
          'SMC terminology sometimes differs from ICT: "supply and demand" vs "order blocks", "imbalance" vs "Fair Value Gap".',
          'ICT is free on YouTube. Many SMC educators charge for courses that teach similar concepts.',
          'ICT has more depth and specificity. SMC is often a simplified version of ICT principles.',
        ],
      },
      {
        type: 'heading',
        text: 'Which Should You Learn?',
      },
      {
        type: 'paragraph',
        text: 'Learn ICT directly from the source — Michael Huddleston\'s YouTube channel (@InnerCircleTrader). This gives you the most complete, accurate version of the methodology. SMC content from other educators can be useful as supplementary learning, but always cross-reference with ICT\'s original teachings to avoid learning inaccurate interpretations.',
      },
      {
        type: 'cta',
        text: 'Learn ICT and SMC concepts in our free curriculum',
        link: '/courses',
        label: 'Start Learning →',
      },
    ],
  },
  {
    slug: 'best-timeframes-ict-trading',
    title: 'Best Timeframes for ICT Trading — A Complete Guide',
    description: 'What timeframes do ICT traders use? Learn the top-down analysis approach and which charts to use for bias, setup identification, and entry.',
    category: 'Strategy',
    readTime: '8 min read',
    date: 'March 8, 2026',
    image: '/images/market-structure.png',
    content: [
      {
        type: 'intro',
        text: 'ICT trading uses a top-down timeframe approach — starting from the highest timeframe to establish context and working down to lower timeframes for precise entries. Each timeframe serves a specific purpose in the analysis framework.',
      },
      {
        type: 'heading',
        text: 'The Top-Down Analysis Approach',
      },
      {
        type: 'paragraph',
        text: 'ICT traders never look at a single timeframe in isolation. The analysis always starts from the top and works down. Higher timeframes establish the dominant trend, key liquidity levels, and major order blocks. Lower timeframes provide entry precision, stop placement, and confirmation signals.',
      },
      {
        type: 'heading',
        text: 'Monthly and Weekly Charts',
      },
      {
        type: 'paragraph',
        text: 'The monthly and weekly charts define the macro bias. Is the market in a long-term uptrend or downtrend? Where are the major liquidity pools — old highs and lows that the algorithm may target over the coming weeks? IPDA lookback periods (20, 40, 60 trading days) are most visible on these higher timeframes. Monthly and weekly charts are reviewed once per week, not daily.',
      },
      {
        type: 'heading',
        text: 'Daily Chart',
      },
      {
        type: 'paragraph',
        text: 'The daily chart is the most important for most ICT traders. It shows the current market structure, the AMD cycle playing out, key FVGs and OBs, and the draw on liquidity (where price is heading). Daily bias — bullish or bearish for today — is determined from the daily chart. Most traders review the daily chart once per day, before the London session opens.',
      },
      {
        type: 'heading',
        text: '4-Hour Chart',
      },
      {
        type: 'paragraph',
        text: 'The 4H chart provides the intermediate structure. It shows the current swing that is playing out within the daily move. 4H order blocks and FVGs are significant confluence levels. The 4H chart helps identify where price is in relation to the daily draw on liquidity.',
      },
      {
        type: 'heading',
        text: '1-Hour and 15-Minute Charts',
      },
      {
        type: 'paragraph',
        text: 'These are the setup timeframes. This is where you see the specific killzone price action — the London Judas Swing, the NY liquidity sweep, the Silver Bullet setup. The 1H and 15M show the specific OBs and FVGs you will use for entries. Most day traders spend most of their time on these timeframes.',
      },
      {
        type: 'heading',
        text: '5-Minute and 1-Minute Charts',
      },
      {
        type: 'paragraph',
        text: 'The entry timeframes. The 1-minute chart is used for the Silver Bullet strategy to identify the specific 1M FVG for entry. The 5-minute chart shows the lower timeframe ChoCH that confirms the setup before entry. These charts are only used after a setup has been identified on higher timeframes — never for initial analysis.',
      },
      {
        type: 'heading',
        text: 'The ICT Timeframe Stack',
      },
      {
        type: 'list',
        items: [
          'Monthly/Weekly → Macro bias and major liquidity targets',
          'Daily → Current bias, AMD identification, daily draw on liquidity',
          '4H → Intermediate structure, key OBs and FVGs',
          '1H/15M → Setup identification, killzone entries',
          '5M/1M → Entry refinement, ChoCH confirmation, Silver Bullet FVG',
        ],
      },
      {
        type: 'cta',
        text: 'Learn top-down analysis in Module 10',
        link: '/lesson/10',
        label: 'Start Module 10 →',
      },
    ],
  },
  {
    slug: 'ict-liquidity-explained',
    title: 'ICT Liquidity Explained — Stop Hunts, BSL, and SSL',
    description: 'Liquidity is the most fundamental ICT concept. Learn what buy-side and sell-side liquidity are, why institutions target them, and how to trade liquidity sweeps.',
    category: 'Beginner',
    readTime: '8 min read',
    date: 'March 7, 2026',
    image: '/images/liquidity.png',
    content: [
      {
        type: 'intro',
        text: 'In ICT methodology, liquidity refers to the clusters of resting orders (stop losses and pending orders) that sit at predictable price levels. Institutions need this liquidity to fill their massive positions — and they intentionally move price to these levels to trigger the orders they need.',
      },
      {
        type: 'heading',
        text: 'What Is Buy-Side Liquidity (BSL)?',
      },
      {
        type: 'paragraph',
        text: 'Buy-side liquidity sits above swing highs and equal highs. It consists of stop losses from short sellers (who place stops above highs) and buy stop orders from breakout traders (who place buys above resistance). When institutions want to sell a large position, they drive price up to sweep this buy-side liquidity — using the buy orders to fill their sell positions.',
      },
      {
        type: 'heading',
        text: 'What Is Sell-Side Liquidity (SSL)?',
      },
      {
        type: 'paragraph',
        text: 'Sell-side liquidity sits below swing lows and equal lows. It consists of stop losses from long traders (who place stops below lows) and sell stop orders from breakdown traders. When institutions want to buy, they drive price down to sweep this sell-side liquidity — using the sell orders to fill their buy positions.',
      },
      {
        type: 'heading',
        text: 'The Stop Hunt Pattern',
      },
      {
        type: 'list',
        items: [
          'Price approaches a key high or low where retail stops are clustered',
          'Price briefly exceeds the level — triggering the stop orders',
          'The triggered stops create a surge of orders in the opposite direction',
          'Institutions use these orders to fill their positions',
          'Price immediately reverses — leaving retail traders stopped out',
          'The real move begins — in the opposite direction of the stop hunt',
        ],
      },
      {
        type: 'heading',
        text: 'How to Trade Liquidity Sweeps',
      },
      {
        type: 'paragraph',
        text: 'After identifying a significant liquidity level (equal highs, swing highs, round numbers), wait for price to sweep the level and show a clear reversal signal. The reversal should come as a displacement candle or ChoCH on a lower timeframe. Enter in the direction of the reversal, targeting the opposing liquidity pool on the other side of the range.',
      },
      {
        type: 'cta',
        text: 'Master Liquidity in Module 2',
        link: '/lesson/2',
        label: 'Start Module 2 →',
      },
    ],
  },
  {
    slug: 'ict-amd-power-of-three',
    title: 'ICT AMD Model — Accumulation, Manipulation, Distribution',
    description: 'The AMD model (Power of Three) is how the market moves every single day. Learn to identify the three phases and trade the distribution move profitably.',
    category: 'Strategy',
    readTime: '8 min read',
    date: 'March 6, 2026',
    image: '/images/amd.png',
    content: [
      {
        type: 'intro',
        text: 'The AMD model — Accumulation, Manipulation, Distribution — describes how institutional money moves price every single day. Also called the "Power of Three", this framework explains the three-act structure of daily candles and intraday price delivery.',
      },
      {
        type: 'heading',
        text: 'Phase 1: Accumulation',
      },
      {
        type: 'paragraph',
        text: 'Accumulation occurs primarily during the Asian session (7 PM – 12 AM EST). Price moves in a relatively tight range as institutions quietly build their positions. This range establishes the liquidity pools that London will target. Retail traders see this as "boring" price action — that is exactly the point.',
      },
      {
        type: 'heading',
        text: 'Phase 2: Manipulation (The Judas Swing)',
      },
      {
        type: 'paragraph',
        text: 'Manipulation occurs during the London session (2 AM – 7 AM EST). Price makes a false move opposite to the true daily direction — sweeping the Asian session liquidity. This is the Judas Swing. On a bullish day, price first drops to sweep the Asian lows (trapping shorts), then reverses aggressively higher. This false move is designed to stop out retail traders and provide the liquidity institutions need to fill their real positions.',
      },
      {
        type: 'heading',
        text: 'Phase 3: Distribution',
      },
      {
        type: 'paragraph',
        text: 'Distribution is the real move — the direction institutions intended from the start. After the Judas Swing completes (confirmed by a ChoCH on the lower timeframe), price delivers strongly in the true direction during the New York session. This is where ICT traders enter and capture the bulk of the daily range.',
      },
      {
        type: 'heading',
        text: 'How to Identify the Judas Swing',
      },
      {
        type: 'list',
        items: [
          'Wait for London open (2 AM EST)',
          'Observe the initial move — is it sweeping obvious liquidity?',
          'Look for a liquidity sweep of the Asian session high or low',
          'Drop to 5M or 1M — wait for a Change of Character (ChoCH)',
          'The ChoCH signals the Judas Swing is complete',
          'Enter in the opposite direction — this is the start of distribution',
        ],
      },
      {
        type: 'cta',
        text: 'Learn the AMD Model in Module 6',
        link: '/lesson/6',
        label: 'Start Module 6 →',
      },
    ],
  },

  {
    slug: "fair-value-gap-ict-explained",
    title: "What is a Fair Value Gap? ICT Explained",
    description: "Fair Value Gaps (FVG) are one of the most powerful ICT concepts. Learn what they are, how to identify them, and how to trade them profitably.",
    category: "Beginner",
    readTime: "7 min read",
    date: "April 2, 2026",
    image: "/images/fvg.png",
    content: [
      { type: "intro", text: "A Fair Value Gap (FVG) is one of the most traded concepts in ICT methodology. It represents a price imbalance where price moved so fast that it left an inefficiency behind. Understanding FVGs can dramatically improve your entry precision." },
      { type: "heading", text: "What is a Fair Value Gap?" },
      { type: "paragraph", text: "A Fair Value Gap is a 3-candle pattern where the first and third candle do not overlap. The middle candle moves so aggressively that it creates a gap between the high of candle 1 and the low of candle 3. This zone represents an area where price was delivered inefficiently and the algorithm will often return to rebalance it." },
      { type: "heading", text: "Bullish vs Bearish FVG" },
      { type: "paragraph", text: "A Bullish FVG forms during a strong upward move. Price will often return to this zone before continuing higher. A Bearish FVG is the opposite, formed during a strong downward move, acting as resistance on the return." },
      { type: "heading", text: "How to Trade FVGs" },
      { type: "list", items: ["Identify the FVG on a higher timeframe first", "Wait for price to return to the FVG zone", "Look for confirmation on a lower timeframe", "Enter at the 50% level of the FVG", "Place stop below the FVG for buys", "Target the next liquidity pool"] },
      { type: "heading", text: "Key Rules for Trading FVGs" },
      { type: "list", items: ["Only trade FVGs in the direction of the higher timeframe bias", "First return to an FVG is the highest probability", "If price closes through the FVG it is invalidated", "FVGs inside killzones are significantly stronger", "A FVG that aligns with a Premium or Discount level is the strongest setup"] },
    ],
  },
  {
    slug: "ict-order-blocks-explained",
    title: "Order Blocks ICT — How to Find and Trade Them",
    description: "Order Blocks are the institutional footprint on your chart. Learn exactly how to identify, mark, and trade ICT Order Blocks for high-probability setups.",
    category: "Intermediate",
    readTime: "9 min read",
    date: "April 2, 2026",
    image: "/images/order-blocks.png",
    content: [
      { type: "intro", text: "Order Blocks are one of the most important concepts in ICT trading. They represent the last opposing candle before a significant price move, the exact area where institutions placed their orders." },
      { type: "heading", text: "What is an Order Block?" },
      { type: "paragraph", text: "An Order Block is the last bearish candle before a bullish displacement or the last bullish candle before a bearish displacement. Institutions leave unfilled orders at specific price levels and when price returns to those levels, those orders get filled causing a reaction." },
      { type: "heading", text: "How to Identify a Valid Order Block" },
      { type: "list", items: ["Find a strong displacement move with large bodied candles", "Look back to the last candle in the opposite direction", "That candle is your Order Block", "Mark the high and low of that candle", "The 50% level is the optimal entry point"] },
      { type: "heading", text: "Order Block vs Breaker Block" },
      { type: "paragraph", text: "When an Order Block fails and price breaks through it, it becomes a Breaker Block. A Bullish OB that is broken to the downside becomes a Bearish Breaker. These are powerful reversal zones." },
      { type: "heading", text: "The Most Important Rule" },
      { type: "paragraph", text: "The first return to an Order Block is the highest probability trade. Once mitigated, the OB loses its power. Never chase a second or third return to the same OB." },
    ],
  },
  {
    slug: "ict-killzones-explained",
    title: "ICT Killzones — The Only Times You Should Be Trading",
    description: "ICT Killzones are specific time windows when institutional activity peaks. Learn the four killzones, why they work, and how to use them to time your entries perfectly.",
    category: "Intermediate",
    readTime: "6 min read",
    date: "April 2, 2026",
    image: "/images/killzones.png",
    content: [
      { type: "intro", text: "One of the most underrated ICT concepts is time. Most retail traders focus entirely on price but ICT teaches that WHEN you trade matters as much as WHERE you trade." },
      { type: "heading", text: "The Four ICT Killzones" },
      { type: "list", items: ["Asian Killzone: 8PM - 12AM EST — Range building phase", "London Open Killzone: 2AM - 5AM EST — Judas Swing and stop hunts", "New York AM Killzone: 7AM - 10AM EST — Highest volume real directional move", "London Close: 10AM - 12PM EST — Profit taking and reversals"] },
      { type: "heading", text: "Why Killzones Work" },
      { type: "paragraph", text: "Banks and institutions operate on schedules. London opens at 3AM EST, New York at 8AM EST. When these major financial centers open, massive order flow enters the market creating predictable moves." },
      { type: "heading", text: "How to Use Killzones in Your Trading" },
      { type: "list", items: ["Only look for entries during killzone windows", "Outside killzones do nothing and observe only", "Mark killzone times on your chart", "Look for price to sweep liquidity at the start of a killzone", "Most setups complete within 2 to 3 hours of killzone open"] },
    ],
  },
  {
    slug: "smart-money-concepts-vs-ict",
    title: "Smart Money Concepts vs ICT — What is the Difference?",
    description: "SMC and ICT are often confused. Learn the key differences between Smart Money Concepts and ICT methodology, and which one you should learn first.",
    category: "Beginner",
    readTime: "6 min read",
    date: "April 2, 2026",
    image: "/images/market-structure.png",
    content: [
      { type: "intro", text: "If you have spent any time in trading communities, you have seen both ICT and SMC mentioned constantly. Many traders use these terms interchangeably but they are not the same thing." },
      { type: "heading", text: "What is ICT?" },
      { type: "paragraph", text: "ICT stands for Inner Circle Trader, the methodology created by Michael J. Huddleston. It is a comprehensive trading system that includes specific concepts like IPDA, Power of Three, Silver Bullet, 2022 Model, and Macro timing windows." },
      { type: "heading", text: "What is SMC?" },
      { type: "paragraph", text: "Smart Money Concepts is a community-built framework derived from ICT. Traders took ICT concepts, simplified them, and packaged them into a more accessible format focusing on BOS, ChoCH, Order Blocks, FVGs, and Liquidity." },
      { type: "heading", text: "Key Differences" },
      { type: "list", items: ["ICT is the original — SMC is derived from ICT", "ICT includes time-based concepts — SMC focuses mainly on price", "ICT has specific entry models — SMC is more flexible", "SMC is easier to learn first — ICT is more comprehensive", "ICT includes IPDA theory — SMC does not cover this"] },
      { type: "heading", text: "Which Should You Learn First?" },
      { type: "paragraph", text: "Learn SMC first if you are a complete beginner. Then progress to full ICT to understand the deeper mechanics. Start with Trading Foundations, then SMC Basics, then ICT modules." },
    ],
  },
  {
    slug: "how-to-trade-nas100-ict",
    title: "How to Trade NAS100 Using ICT Concepts",
    description: "NAS100 is the most popular market for ICT traders. Learn why ICT works so well on the Nasdaq, the best sessions to trade, and step-by-step setups.",
    category: "Intermediate",
    readTime: "8 min read",
    date: "April 2, 2026",
    image: "/images/amd.png",
    content: [
      { type: "intro", text: "NAS100 has become the go-to market for ICT traders worldwide. Its high volatility, tight spreads during NY session, and clean algorithmic delivery make it one of the best markets to apply ICT methodology." },
      { type: "heading", text: "Why ICT Works So Well on NAS100" },
      { type: "paragraph", text: "NAS100 is driven by algorithmic trading, the same IPDA framework ICT describes. It respects Order Blocks and FVGs with remarkable precision. The New York AM killzone provides consistent directional moves." },
      { type: "heading", text: "Best Sessions for NAS100" },
      { type: "list", items: ["Pre-market 4AM to 9:30AM EST — Wait for range to form", "NY Open 9:30AM to 11AM EST — Highest probability moves", "NY AM Session 9:30AM to 12PM EST — Primary trading window", "Avoid lunch hours 12PM to 2PM EST — Low volume choppy action"] },
      { type: "heading", text: "NAS100 ICT Setup Step by Step" },
      { type: "list", items: ["Check Daily bias for bullish or bearish structure", "Mark previous day high and low", "Identify key OBs and FVGs on 1H chart", "Wait for NY open and watch for liquidity sweep", "Drop to 5M for BOS confirmation", "Enter at OB or FVG level with stop below OB"] },
    ],
  },
  {
    slug: "ict-silver-bullet-strategy",
    title: "ICT Silver Bullet Strategy — Step by Step Guide 2026",
    description: "The ICT Silver Bullet is one of the most precise entry models in trading. Learn the exact rules, timing windows, and how to execute it on NAS100 and Forex.",
    category: "Intermediate",
    readTime: "8 min read",
    date: "April 2, 2026",
    image: "/images/killzones.png",
    content: [
      { type: "intro", text: "The ICT Silver Bullet is arguably the most popular ICT entry model. It is a time-based strategy that targets specific 1-hour windows during the trading day offering extremely precise entries with tight stops and clear targets." },
      { type: "heading", text: "What is the Silver Bullet?" },
      { type: "paragraph", text: "The Silver Bullet occurs during three specific time windows: 3AM to 4AM EST for London Open, 10AM to 11AM EST for NY AM, and 2PM to 3PM EST for NY PM. During these windows the algorithm delivers price with high precision." },
      { type: "heading", text: "Silver Bullet Rules" },
      { type: "list", items: ["Only trade during the three Silver Bullet windows", "Wait for a liquidity sweep at the start of the window", "Look for a Fair Value Gap to form after the sweep", "Enter at the FVG at the 50% CE level", "Stop goes beyond the liquidity sweep point", "Target previous session high or low"] },
      { type: "heading", text: "Step by Step 10AM Silver Bullet on NAS100" },
      { type: "list", items: ["At 9:30AM mark the high and low of the 9AM to 10AM range", "At 10AM watch for price to sweep above or below that range", "After the sweep watch for a sharp reversal creating an FVG on 1M chart", "Enter at the FVG with stop beyond the sweep", "Target opposite side liquidity", "If no setup by 11AM do not take the trade"] },
    ],
  },
  {
    slug: "liquidity-in-trading-ict",
    title: "What is Liquidity in Trading? ICT Explanation",
    description: "Liquidity is the foundation of ICT trading. Learn what buy-side and sell-side liquidity are, why banks hunt stop losses, and how to trade with the institutions.",
    category: "Beginner",
    readTime: "7 min read",
    date: "April 2, 2026",
    image: "/images/liquidity.png",
    content: [
      { type: "intro", text: "Liquidity is the single most important concept in ICT trading. Everything else, Order Blocks, FVGs, killzones, exists in service of understanding where liquidity is and how institutions will use it." },
      { type: "heading", text: "What is Liquidity?" },
      { type: "paragraph", text: "In ICT, liquidity refers to clusters of stop-loss orders sitting above and below key price levels. When retail traders place stop losses at obvious levels like swing highs and lows, they create liquidity pools that institutions need to fill their massive orders." },
      { type: "heading", text: "Buy Side vs Sell Side Liquidity" },
      { type: "paragraph", text: "Buy Side Liquidity sits ABOVE swing highs and previous day highs. These are the stop losses of short sellers. Sell Side Liquidity sits BELOW swing lows and previous day lows. These are the stop losses of long traders." },
      { type: "heading", text: "Why Banks Hunt Stop Losses" },
      { type: "paragraph", text: "A large institution cannot place a massive order at market price without moving the market against them. By pushing price to stop-loss clusters, they trigger those orders creating the liquidity they need to fill their institutional position." },
      { type: "heading", text: "How to Trade Using Liquidity" },
      { type: "list", items: ["Mark all swing highs and swing lows on your chart", "Identify where the majority of retail stops are resting", "Wait for price to sweep that liquidity during a killzone", "After the sweep look for a reversal into an OB or FVG", "Target the liquidity on the opposite side"] },
    ],
  },
  {
    slug: "how-to-pass-ftmo-ict",
    title: "How to Pass FTMO Using ICT Strategy in 2026",
    description: "ICT methodology is one of the most effective approaches for passing prop firm challenges. Learn the exact rules, risk management, and ICT setups to pass FTMO.",
    category: "Advanced",
    readTime: "9 min read",
    date: "April 2, 2026",
    image: "/images/premium-discount.png",
    content: [
      { type: "intro", text: "Prop firm challenges like FTMO have become the goal for thousands of ICT traders. The combination of precise entry models and strict risk management makes ICT one of the best methodologies for passing prop firm challenges." },
      { type: "heading", text: "Why ICT Works for Prop Firms" },
      { type: "paragraph", text: "FTMO has strict rules: maximum daily loss of 5%, maximum total loss of 10%, and a profit target of 10%. ICT high-probability setups with tight stops and favorable risk-reward ratios are perfectly aligned with these requirements." },
      { type: "heading", text: "ICT Risk Management for FTMO" },
      { type: "list", items: ["Risk maximum 0.5 to 1% per trade", "Stop trading after 2 consecutive losses", "Only trade NAS100 or XAUUSD during NY killzone", "Minimum R:R of 1:2 always", "Target 3 to 4R on your best setups", "Take 2 to 3 trades maximum per day"] },
      { type: "heading", text: "Best ICT Setups for FTMO" },
      { type: "list", items: ["Silver Bullet 10AM to 11AM EST", "Daily OB plus FVG confluence", "Previous Day High or Low sweeps", "AMD Model distribution phase plays"] },
    ],
  },
  {
    slug: "ict-2026-mentorship-concepts",
    title: "ICT 2026 Mentorship — Key Concepts Explained",
    description: "ICT continues to release new content in 2026. Learn the latest ICT concepts including updated entry models, refined killzone timing, and advanced IPDA concepts.",
    category: "Advanced",
    readTime: "7 min read",
    date: "April 2, 2026",
    image: "/images/amd.png",
    content: [
      { type: "intro", text: "ICT has been releasing mentorship content since 2010 and the methodology continues to evolve. The 2026 mentorship builds on foundational concepts while introducing refined models and deeper algorithmic understanding." },
      { type: "heading", text: "Core 2026 Focus Areas" },
      { type: "list", items: ["Refined IPDA data ranges — 20, 40, and 60 day lookback periods", "Quarterly shifts — how price delivery changes at the start of each quarter", "Propulsion Blocks — a refined version of Order Blocks", "Venom Model — advanced intraday delivery model", "Time-based entries moving away from indicator confirmation"] },
      { type: "heading", text: "IPDA Data Ranges" },
      { type: "paragraph", text: "The Interbank Price Delivery Algorithm uses historical price data in 20, 40, and 60 trading day lookback periods to determine draw on liquidity. Understanding which IPDA range is active helps identify price targets weeks in advance." },
      { type: "heading", text: "The Venom Model" },
      { type: "paragraph", text: "The Venom Model is one of ICT most refined intraday entry models. It combines specific time windows with displacement moves and FVG entries. The model targets the 8:30AM to 9AM EST window specifically." },
    ],
  },
  {
    slug: "ict-premium-discount-explained",
    title: "ICT Premium and Discount — The Fibonacci Framework Explained",
    description: "ICT Premium and Discount zones tell you whether price is cheap or expensive. Learn how to use the 50% equilibrium level to find optimal trade entries.",
    category: "Intermediate",
    readTime: "6 min read",
    date: "April 2, 2026",
    image: "/images/premium-discount.png",
    content: [
      { type: "intro", text: "One of the most elegant concepts in ICT is the Premium and Discount framework. It answers a simple but critical question: is price cheap or expensive right now?" },
      { type: "heading", text: "What is Premium and Discount?" },
      { type: "paragraph", text: "Every price range has a 50% midpoint called the Equilibrium. Price above the 50% level is in Premium and is expensive. Price below the 50% level is in Discount and is cheap. Institutions buy in discount and sell in premium." },
      { type: "heading", text: "How to Apply the Fibonacci" },
      { type: "list", items: ["Identify the most recent swing high and swing low", "Apply a Fibonacci retracement from low to high", "The 50% level is your Equilibrium", "Below 50% is Discount zone — look for buy setups", "Above 50% is Premium zone — look for sell setups"] },
      { type: "heading", text: "Optimal Trade Entry" },
      { type: "paragraph", text: "The Optimal Trade Entry zone sits between the 61.8% and 79% Fibonacci retracement levels. An OB or FVG that aligns with the OTE zone creates one of the highest-probability setups in the entire ICT framework." },
    ],
  },
];
