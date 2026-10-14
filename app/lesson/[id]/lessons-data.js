// ─── LESSONS 15–28 DATA ──────────────────────────────────────────────────────
// Separate file to avoid SWC parser issues with large LESSONS object
// Imported and merged in lesson/[id]/page.js

export const LESSONS_EXTRA = {
  15: {
    id: 15,
    title: `Daily Bias Framework`,
    subtitle: `A Repeatable Process for Building and Testing Daily Context`,
    level: `Intermediate`,
    duration: `20 min read`,
    category: `Analysis`,
    imageCaption: `Daily bias is determined before the session opens  --  from monthly down to daily timeframe alignment`,
    intro: `A trader can define a Daily Bias before the session by studying higher-timeframe context. A useful bias is a testable scenario, not proof of institutional order flow or a guarantee about the day's direction.`,
    sections: [
      {
        title: `What Daily Bias Really Means`,
        content: `Daily bias is your directional conviction for the trading day  --  determined from higher timeframe analysis before any session opens. It is the answer to: "Am I looking for longs today, shorts today, or neither?"\n\nThis is fundamentally different from how most retail traders operate. They open a chart when the session starts, see what price is doing in the moment, and decide direction on the spot. Reactive decisions can introduce inconsistency because the trader is responding to information after the move has begun; compare a predefined bias process with reactive entries using journal data.\n\nICT traders are proactive. They study the monthly chart, the weekly chart, and the daily chart before London opens. They identify the draw on liquidity, the institutional order flow direction, and the dealing range. By the time the session opens, the decision is already made. The session itself is just execution.`,
        highlight: `📌 Daily bias is determined BEFORE the session opens  --  not during it. If you are deciding direction while the market is moving, you are already too late.`,
      },
      {
        title: `The Top-Down Hierarchy  --  Monthly to Daily`,
        content: `Daily bias is never determined from the daily chart alone. It is the synthesis of three higher timeframes:\n\nMONTHLY CHART:\nThe macro context. Is price in a monthly uptrend (HH/HL) or downtrend (LH/LL)? Are we approaching a major monthly premium or discount zone? What is the monthly draw on liquidity  --  which major swing high or low has not been taken yet?\n\nWEEKLY CHART:\nThe intermediate context. Did last week close bullish or bearish? Is the weekly structure aligned with the monthly? Where is the weekly draw on liquidity? Has the weekly AMD cycle just started (Monday) or is it in distribution (Wednesday-Thursday)?\n\nDAILY CHART:\nThe specific bias. What is the daily structure? Did yesterday close bullish or bearish? Is there an open daily FVG or OB that price should return to? What is the daily draw on liquidity  --  the nearest unmitigated BSL or SSL?\n\nOnly when all three timeframes align does daily bias carry maximum probability. Monthly bullish + weekly bullish + daily bullish = highest conviction long bias.`,
        highlight: `📌 One possible top-down workflow uses monthly and weekly context to inform a daily plan. The timeframes do not have to align in every model; define the role of each and test whether alignment improves results.`,
      },
      {
        title: `Previous Day Reference Levels`,
        content: `Before each session, traders can mark these reference levels as possible areas of interest:\n\nPREVIOUS DAY HIGH (PDH):\nICT traders often label the area above PDH as potential buy-side liquidity. In a bearish scenario, some watch for a move above PDH followed by a bearish response, but neither the sweep nor the reversal is assured.\n\nPREVIOUS DAY LOW (PDL):\nICT traders often label the area below PDL as potential sell-side liquidity. In a bullish scenario, some watch for a move below PDL followed by a bullish response, but neither the sweep nor the reversal is assured.\n\nPREVIOUS DAY CLOSE:\nThe overnight gap between the previous close and the current day's open is significant. Some traders monitor this gap as a reference area, but it may remain open or be filled at an unpredictable time.\n\nPREVIOUS WEEK HIGH / LOW:\nWeekly highs and lows can provide broader context than prior-day levels, but their relevance varies and they do not define the maximum possible daily range.\n\nMark all four before every session. They define the boundaries of the day's potential moves.`,
        highlight: `📌 Mark PDH, PDL, previous week high and low before every session. These are potential reference areas for a daily plan, not guaranteed targets.`,
      },
      {
        title: `The Midnight Open  --  True Daily Reference`,
        content: `ICT uses midnight New York time as the "True Daily Open"  --  not the NYSE open at 9:30 AM. This is the reference point from which the day's AMD cycle begins.\n\nWhy midnight? Because the algorithm begins delivering price from midnight onwards. The Asian session (7 PM-12 AM New York time) accumulates. The London session (2 AM-5 AM New York time) manipulates. The New York AM session (7 AM-11 AM New York time) distributes. The midnight open is the starting point of the full day's cycle.\n\nThe relationship between current price and the midnight open tells you the AMD phase:\n• Price near midnight open = still in accumulation/early manipulation\n• Price significantly above/below midnight open in London = manipulation phase (Judas Swing)\n• Price extending from the manipulation extreme in NY AM = distribution phase\n\nPractical application: if it is 10 AM New York time and price has already moved 50 points above the midnight open, you are likely in the distribution phase. Do not chase. If price is pulling back toward the midnight open level, watch for re-entry from an IRL level.`,
        highlight: `📌 Some ICT traders use midnight New York time as a daily-open reference. It is one chart level to test—not proof that an AMD cycle has begun or a forecast of delivery.`,
      },
      {
        title: `When to Trade With No Bias (Neutral Days)`,
        content: `The most underappreciated skill in ICT trading is knowing when NOT to have a bias. Not every day offers a clear directional conviction  --  and trading on low-conviction days is one of the fastest ways to destroy a profitable week.\n\nNEUTRAL DAY SIGNALS:\n• Monthly and weekly timeframes are in conflict (monthly bullish but weekly making lower highs)\n• Daily chart is in the middle of a dealing range  --  no clear premium or discount\n• High-impact news event scheduled (NFP, FOMC, CPI)\n• Previous day closed inside a major FVG without commitment\n• The week is already in the distribution phase and target has been reached\n\nOn neutral days: do not trade. Study. Review previous trades. Mark levels for tomorrow. The discipline to sit on your hands on neutral days is what allows you to trade aggressively on the three or four high-conviction days per week that actually matter.\n\nRemember: professional traders might have 8-12 high-quality trades per month. The rest of the time they are waiting or studying. The compulsion to trade every day is a retail habit that destroys accounts.`,
        highlight: `📌 No bias = no trade. Not every day has a clear ICT setup. Trading on low-conviction days produces marginal setups that create psychological damage when they fail. Protect your edge by being selective.`,
      },
      {
        title: `Building Your Daily Bias Routine`,
        content: `Here is the exact pre-session routine for determining daily bias:\n\nTIME: After Asian session closes, before London opens (12 AM - 1:30 AM New York time)\n\nSTEP 1  --  Monthly Chart (2 minutes):\nConfirm macro trend direction. Note any nearby monthly premium/discount level.\n\nSTEP 2  --  Weekly Chart (3 minutes):\nConfirm weekly structure. Note PDW high and low. Determine weekly AMD phase.\n\nSTEP 3  --  Daily Chart (5 minutes):\nConfirm daily structure. Mark PDH and PDL. Identify daily draw on liquidity. Look for open FVGs or OBs.\n\nSTEP 4  --  Write Your Bias:\nLiterally write: "Today's bias is BULLISH because [reason]. My draw on liquidity is [level]. The invalidation of this bias is [level]." This takes 30 seconds and forces clarity.\n\nSTEP 5  --  Set Alerts:\nSet price alerts at your draw on liquidity and at the invalidation level. Then step away until the London or NY AM killzone.\n\nThis entire routine takes 15-20 minutes. Traders who do this consistently outperform those who sit in front of charts all day reacting to noise.`,
        highlight: `📌 Your daily bias routine should take 15-20 minutes and be completed before London opens. Write your bias down. Set alerts. Then wait for killzone hours.`,
      },
    ],
    quiz: [
      { q: `Daily bias should be determined...`, options: ['During the NY AM session', 'Before the session opens using HTF analysis', 'After the first trade of the day', 'When price shows a clear pattern'], answer: 1 },
      { q: `The True Daily Open in ICT is...`, options: ['9:30 AM NYSE open', 'London open at 2 AM New York time', 'Midnight New York time', 'Asian session open at 7 PM New York time'], answer: 2 },
      { q: `When should you trade with no bias?`, options: ['Never  --  always have a direction', 'When monthly and weekly timeframes conflict', 'Only on Mondays', 'When RSI is at 50'], answer: 1 },
    ],
    nextLesson: { id: 16, title: `Draw on Liquidity` },
    prevLesson: { id: 14, title: `Top-Down Analysis` },
  },

  16: {
    id: 16,
    title: `Draw on Liquidity`,
    subtitle: `Marking Possible Price Objectives: Draw on Liquidity`,
    level: `Intermediate`,
    duration: `18 min read`,
    category: `Analysis`,
    imageCaption: `Draw on Liquidity: possible objectives marked by ICT traders, not guaranteed destinations`,
    intro: `The Draw on Liquidity (DOL) is the concept that separates traders who anticipate from traders who react. While retail traders wonder "where will price go?" after it has already moved, ICT traders identify the next liquidity target BEFORE price reaches it. This is a hypothesis about possible price objectives, not evidence of an algorithmic sequence or a forecast.`,
    sections: [
      {
        title: `What Is the Draw on Liquidity?`,
        content: `Draw on Liquidity (DOL) is used by some ICT traders to nominate a possible price objective, often a prior high or low. These areas may coincide with orders, but a chart alone cannot confirm the exact orders present or the reason price might approach a level.\n\nSome ICT narratives describe price as moving between candidate liquidity levels. Actual moves can be influenced by many factors and may not reach a marked level; treat each DOL as a hypothesis to test, not a known destination. A chart-based scenario can inform where you would monitor or plan a target, but cannot establish in advance how far price will travel or whether it will continue or reverse. Mark alternatives and define what invalidates the scenario rather than assuming the target will be reached.`,
        highlight: `📌 In ICT terminology, a DOL is a candidate price objective often marked around a prior high, low or other defined reference. Price may react elsewhere, so map alternatives and invalidation rather than assuming it will move from one pool to the next.`,
      },
      {
        title: `External Range Liquidity (ERL) vs Internal Range Liquidity (IRL)`,
        content: `The DOL exists in one of two forms:\n\nEXTERNAL RANGE LIQUIDITY (ERL):\nLiquidity that sits OUTSIDE the current price range  --  beyond the swing highs and swing lows. This includes: previous swing highs (BSL), previous swing lows (SSL), equal highs and equal lows, previous week highs/lows, previous month highs/lows, and major round numbers.\n\nIn ICT terminology, ERL (external range liquidity) refers to candidate reference areas outside a defined range, such as prior highs and lows. The label does not prove that institutional orders are resting there or that price is being delivered to the level.\n\nINTERNAL RANGE LIQUIDITY (IRL):\nLiquidity that exists WITHIN the current price range  --  inside the dealing range. This includes: unmitigated FVGs, Order Blocks within the range, Balanced Price Ranges, and NWOG/NDOG gaps within the range.\n\nIn ICT terminology, IRL (internal range liquidity) refers to candidate reference areas within a defined range, including imbalances or zones that a trader has marked by a consistent rule. Price may revisit these areas, bypass them, or move through the range in another way; a fill is not required.\n\nOne scenario to test is a move through an external reference, a retracement toward an internal reference, and then a continuation. Price may instead fail, range, reverse, or never reach the candidate levels. Define observable criteria and invalidation before testing the sequence.`,
        highlight: `📌 ERL and IRL are ICT labels for candidate reference areas outside and inside a defined range. The sweep → retracement → continuation sequence is one scenario to test, not a rule that price must follow.`,
      },
      {
        title: `Identifying Your DOL Before the Session`,
        content: `Before every trading session, run this DOL identification process:\n\nSTEP 1  --  Mark all ERL above price:\n• Previous swing highs\n• Equal highs (EQH)\n• Previous day high, previous week high\n• Round numbers above current price\n\nSTEP 2  --  Mark all ERL below price:\n• Previous swing lows\n• Equal lows (EQL)\n• Previous day low, previous week low\n• Round numbers below current price\n\nSTEP 3  --  Mark all IRL:\n• Open FVGs on 4-hour and daily charts\n• Unmitigated Order Blocks within the current range\n• NWOG and NDOG gaps\n\nSTEP 4  --  Select candidate reference areas:\nUsing your written model, identify which marked levels fit the current scenario. A bullish or bearish bias may help prioritize a candidate area, but it does not show which level the market will reach. Record alternative scenarios and define what would invalidate each one.\n\nSTEP 5  --  Treat this as a candidate target; compare it with invalidation, risk, and your tested exit rules before entering.`,
        highlight: `📌 You may use a DOL as a preplanned target, but it is a hypothesis rather than a destination price must reach. Define alternative exits and invalidation before entry.`,
      },
      {
        title: `The DOL Sequence in Real Trades`,
        content: `Consider a hypothetical chart where prior equal highs are visible above price and a bullish structure pattern has formed. An ICT trader may nominate those highs as a possible objective and an FVG as a potential retracement area. This is a planning scenario—not a known algorithmic destination. Price may reach the highs, reverse first, or continue elsewhere.\n\nBefore entering, define the setup trigger, invalidation, stop, exit rule and maximum acceptable risk. Record whether the target was reached under a fixed time horizon, and include cases where no trade triggered or the thesis failed. Avoid changing the target after observing the outcome.`,
        highlight: `📌 One DOL-based example is to mark a candidate ERL, wait for a defined IRL retracement, and specify stop, target and invalidation before entry. This is a model to test, not a required path every session follows.`,
      },
      {
        title: `Common DOL Mistakes`,
        content: `A DOL plan can become unreliable when a trader treats a marked level as inevitable, moves a target after price changes, or labels every subsequent move as confirmation. Mark candidate levels before the session, identify alternative scenarios, and specify what would invalidate each one.\n\nCompare the nearest candidate level with more distant levels using consistent rules. Track frequency, maximum adverse excursion, time to target, and expectancy after costs; do not assume a closer level must be reached first.`,
        highlight: `📌 LRLR and HRLR are labels some ICT traders use for a perceived clear path or a path with obstacles. Do not assume a clean path will reach a target or that obstacles guarantee failure; define measurable criteria and backtest.`,
      },
    ],
    quiz: [
      { q: `In an ICT-style plan, a Draw on Liquidity is best described as...`, options: ['A guaranteed destination price', 'A candidate price objective chosen from a defined reference area', 'A fixed 2:1 R:R target', 'The previous day close in every market'], answer: 1 },
      { q: `External Range Liquidity (ERL) refers to...`, options: ['FVGs inside the current range', 'Order Blocks within the dealing range', 'Swing highs and lows outside the current range', 'The midnight open level'], answer: 2 },
      { q: `The correct DOL trade sequence is...`, options: ['Enter anywhere → hope for movement → exit randomly', 'Identify ERL → wait for IRL retracement → enter at IRL → TP at ERL', 'Buy at support → sell at resistance', 'Enter after news → exit at round number'], answer: 1 },
    ],
    nextLesson: { id: 17, title: `Dealing Ranges & PD Arrays` },
    prevLesson: { id: 15, title: `Daily Bias Framework` },
  },

  17: {
    id: 17,
    title: `Dealing Ranges & PD Arrays`,
    subtitle: `How to Map and Test Price Delivery Arrays`,
    level: `Intermediate`,
    duration: `22 min read`,
    category: `PD Arrays`,
    imageCaption: `Examples of PD Array labels used in ICT material; any ranking of them needs a defined test`,
    intro: `PD Arrays—Price Delivery Arrays—are chart features named in ICT methodology, such as FVGs, order blocks, breakers, and related zones. Traders may use them as reference areas, but chart patterns do not confirm underlying institutional orders or algorithmic intent. Understanding which arrays exist, how to rank them by strength, and how to use them in order of priority is what separates advanced ICT practitioners from beginners who draw random boxes and call them Order Blocks.`,
    sections: [
      {
        title: `What Is a Dealing Range?`,
        content: `A dealing range is a price interval defined by a trader, often between a swing high and low. Premium and discount are labels relative to the range midpoint; they do not mean that a price is objectively expensive or cheap, nor do they prove where institutions are buying or selling.\n\nSome ICT traders use these zones to organize directional scenarios. Define the swing points and midpoint consistently, then test whether a premium/discount filter adds value to your setup. Lower-timeframe and higher-timeframe ranges can disagree, so define which range controls your rule instead of treating one timeframe as universally dominant.`,
        highlight: `📌 Premium and discount can be context filters in an ICT model, but the 50% level is not a standalone buy or sell command. Compare results with and without this filter before claiming it improves trade selection.`,
      },
      {
        title: `The Full PD Array Matrix  --  Ranked by Strength`,
        content: `ICT material describes chart features such as breakers, order blocks, FVGs, BISI/SIBI and other arrays, and some traders rank them by preference. There is no universal, independently established ranking that guarantees one array will produce a stronger reaction than another. The appearance, definition and result can depend on the market, timeframe and trader's rules.\n\nIf you rank arrays, write the exact definition for each one and score all examples before knowing their outcome. Compare each category with a consistent baseline using the same instruments, periods, stop and target rules, spread, slippage and management assumptions. Avoid presenting personal grading as a measured probability unless representative data supports it.`,
        highlight: `📌 Treat array rankings as hypotheses. A chart label does not prove institutional orders or reaction strength; define your rules and compare results with a baseline.`,
      },
      {
        title: `Nested Dealing Ranges  --  Operating at Multiple Levels`,
        content: `Traders can mark ranges on monthly, weekly, daily and intraday charts, but there is no universal rule that a higher timeframe must override every lower-timeframe signal. A higher-timeframe range may be useful context while a lower-timeframe signal may be used for execution. Define the priority in your written model and test it.\n\nFor example, you might require the 1-hour range to set a directional filter and use a 5-minute pattern to trigger an entry. Record the cases where the filter helps and where it excludes otherwise profitable setups. Do not call a setup low probability without measured evidence.`,
        highlight: `📌 Higher-timeframe ranges may provide context but do not automatically override lower-timeframe signals. Specify how the timeframes interact in your model and test the combined rule.`,
      },
      {
        title: `Stacking PD Arrays for Confluence`,
        content: `Some traders prefer locations where multiple reference features overlap—for example, a dealing-range discount, a bullish FVG and a structure level. This can be logged as a confluence score, but more labels do not automatically mean higher probability. Define each feature without looking ahead, compare results with setups having fewer features, and account for how extra filters reduce the number of trades.`,
        highlight: `📌 OB, FVG and BPR overlap is one possible confluence rule. Grades such as A+ or C are subjective unless defined in advance; test whether each added condition improves results instead of assuming a universal ranking.`,
      },
      {
        title: `How to Draw PD Arrays Correctly`,
        content: `DRAWING ORDER BLOCKS:\nMark the body of the last bearish candle before a bullish displacement (for bullish OB). The OB zone spans from the candle's body high to body low. Some practitioners use wick-to-wick  --  ICT traditionally uses body only for the core zone.\n\nDRAWING FVGs:\nMark the high of candle 1 and the low of candle 3 for a bullish FVG. The midpoint is the Consequent Encroachment (CE)  --  your primary entry level within the gap.\n\nDRAWING BREAKER BLOCKS:\nWhen an OB is violated (price completely trades through it), flip its polarity. Mark it as a Breaker Block  --  it becomes resistance for a bullish OB that was broken, or support for a bearish OB that was broken.\n\nDRAWING BPR:\nIdentify a bullish FVG and a bearish FVG in the same area. The overlapping zone between them is the BPR.\n\nKEY RULE  --  REMOVE MITIGATED ARRAYS:\nOnce price has returned to an array and traded through its entire range, that array is consumed. Remove it from your chart. Leaving consumed arrays creates false signals and chart clutter. Only active, unmitigated arrays belong on your working chart.`,
        highlight: `📌 Some ICT models treat a revisited or crossed zone as mitigated. Define mitigation precisely and apply that rule consistently; a zone's usefulness cannot be established by its label alone.`,
      },
    ],
    quiz: [
      { q: `In a dealing range, institutions buy in...`, options: ['Premium zone (above 50% EQ)', 'Equilibrium (exactly 50%)', 'Discount zone (below 50% EQ)', 'Any zone regardless of price'], answer: 2 },
      { q: `Which PD Array ranks highest in the matrix?`, options: ['Fair Value Gap', 'Order Block', 'Breaker Block', 'Mitigation Block'], answer: 2 },
      { q: `When should a PD Array be removed from your chart?`, options: ['After 24 hours', 'When price approaches it', 'Once price has fully traded through it (mitigated)', 'At the end of each week'], answer: 2 },
    ],
    nextLesson: { id: 18, title: `Institutional Order Flow` },
    prevLesson: { id: 16, title: `Draw on Liquidity` },
  },

  18: {
    id: 18,
    title: `Institutional Order Flow`,
    subtitle: `What Price Action Can and Cannot Tell You About Large Orders`,
    level: `Advanced`,
    duration: `24 min read`,
    category: `Advanced`,
    imageCaption: `Common ICT interpretations of accumulation, sweeps, displacement and continuation—hypotheses to define and test`,
    intro: `ICT/SMC traders often use terms such as order flow, accumulation, displacement and liquidity sweeps to describe price behavior. Candlestick charts show price and, depending on the market, volume; they do not directly reveal a participant's identity, intention, inventory, or the reason for a move. This lesson separates observable chart features from interpretations and shows how to turn those interpretations into rules that can be tested.`,
    sections: [
      {
        title: `Why Banks Cannot Trade Like Retail`,
        content: `Large orders can create execution challenges, including market impact and slippage, so some institutions use execution strategies that split orders across time or venues. The exact methods vary by market, instrument, liquidity and mandate. A chart by itself does not reveal the size of an order, who placed it, or whether a consolidation reflects accumulation. Treat AMD as a framework some ICT traders use to interpret ranges and directional moves—not as a verified account of every institutional transaction.`,
        highlight: `📌 Large orders may require careful execution, but chart patterns cannot establish which participant is trading, the size of its position, or its motive. Define observable conditions before testing an ICT interpretation.`,
      },
      {
        title: `The Accumulation Phase  --  Building Without Moving Price`,
        content: `In ICT terminology, accumulation describes a range-bound phase in a proposed Accumulation-Manipulation-Distribution (AMD) sequence. A chart can show consolidation, repeated tests of levels, and changing range or volatility; it cannot establish that a participant is secretly building a directional position. These features may be recorded as candidate conditions in a model.\n\nPotential observations to log include range width, duration, session, volume where reliable, number of level tests, subsequent breakout direction, and the maximum adverse move after a breakout. Compare qualifying cases with non-qualifying ranges and include failed breakouts. A sweep may follow a consolidation, but it is not required and does not reveal the motive for the move.`,
        highlight: `📌 Consolidation is observable; hidden accumulation and the direction of a later breakout are interpretations. Record the range and the following outcome rather than assuming a sweep or reversal will occur.`,
      },
      {
        title: `Stop Hunt Engineering  --  The Deliberate Manipulation`,
        content: `A false breakout occurs when price moves beyond a visible level but fails to sustain the break under a trader's predefined rule. ICT material may interpret this pattern as a stop hunt or manipulation, but price action alone cannot show whether a bank caused the move, which orders were triggered, or why the price reversed.\n\nA testable example is to mark a prior high or low, define the required penetration and close-back condition, specify an entry trigger and invalidation level, and record every qualifying instance—including cases that continue in the breakout direction. Separate the observed pattern from the explanation assigned to it. Do not assume a reversal simply because price crossed a level.`,
        highlight: `📌 A false breakout is a price pattern, not proof of a stop hunt. Define the level, penetration, close-back rule, trigger and invalidation in advance, then measure results on a representative sample.`,
      },
      {
        title: `Institutional Candle Signatures`,
        content: `Traders sometimes use displacement, gaps and wicks to describe candle patterns. A large-bodied candle with relatively small wicks is an observable feature; a Fair Value Gap is defined by the chosen candle-range rule; a wick beyond a prior high or low may meet a trader's definition of a sweep. None of these features identifies an institution or establishes intent.\n\nFor a repeatable test, define candle size relative to recent volatility, specify the exact FVG and sweep rules, then record follow-through, retracement, invalidation, spread and execution costs. Compare performance with a baseline that uses the same instrument and periods. Avoid labeling all overlapping candles as retail noise or assuming that every displacement leads to continuation.`,
        highlight: `📌 Describe what the candles show first. Treat labels such as displacement, FVG and sweep as chart definitions—not proof of institutional commitment or a guaranteed directional move.`,
      },
      {
        title: `Reading Institutional Intent from Price Structure`,
        content: `Some ICT traders describe a sequence such as a move beyond a prior low, a sharp rebound, a structure break and a retracement as a possible bullish scenario; the reverse sequence may be studied as bearish. These are chart interpretations, not a record of institutional intent or a confirmed accumulation/distribution cycle.\n\nWrite down the levels and trigger conditions before the outcome is visible. Specify what would invalidate the scenario, and include examples where the sequence fails or does not develop. If the rule cannot be identified consistently in real time, it is not yet precise enough to evaluate.`,
        highlight: `📌 Use structure to describe price and manage a scenario. Do not infer hidden intent from a sweep, reversal or BOS/ChoCH alone; define confirmation and invalidation rules in advance.`,
      },
      {
        title: `Order Flow Confirmation Before Entry`,
        content: `Before entering, check whether price matches the conditions in your written setup. A pre-trade checklist might include a defined displacement condition, a move through a marked high or low, a specified lower-timeframe structure break, and a retracement into a reference zone. These checks document price behavior; they do not confirm institutional order flow.\n\nDefine what each condition means, including candle-close or wick rules and the timeframe used. Test whether each condition adds value to the baseline setup, and record all valid signals whether they win, lose, or never reach the target. If one condition is absent, follow the prewritten rule rather than making an after-the-fact judgment about institutional intent.`,
        highlight: `📌 Use a fixed checklist of observable conditions. The checklist only has value if representative testing shows that it improves your process or results; it does not verify who is trading.`,
      },
      {
        title: `The Distribution Phase  --  Delivering to Target`,
        content: `In the AMD framework, distribution describes a directional move away from a range toward a potential objective. A trader can record directional candles, retracements, range expansion, and interaction with prior highs or lows. Those observations do not establish that institutions are executing a coordinated delivery plan.\n\nDefine a possible end condition in advance—for example, price reaching a marked level, a structure change, a time limit, or a protective stop. Price may pass a target, reverse before reaching it, or continue beyond it. Use the same exit rule in backtests and forward tests, including costs and adverse outcomes.`,
        highlight: `📌 A move may approach or pass a marked liquidity level, but that does not prove a distribution phase has ended. Decide the exit and invalidation rules before the trade.`,
      },
    ],
    quiz: [
      { q: `What can a chart establish about a suspected stop hunt?`, options: ['The bank that caused it', 'The exact orders that were triggered', 'A price pattern that can be defined and tested', 'A guaranteed reversal'], answer: 2 },
      { q: `A displacement candle is characterized by...`, options: ['Small body with large wicks', 'Large body with minimal wicks, moving aggressively in one direction', 'Equal open and close', 'Gap from the previous close'], answer: 1 },
      { q: `The Distribution phase ends when...`, options: ['Price reaches equilibrium', 'The ERL target is swept', 'The Asian session opens', 'RSI reaches overbought'], answer: 1 },
    ],
    nextLesson: { id: 19, title: `Session Timing & Market Hours` },
    prevLesson: { id: 17, title: `Dealing Ranges & PD Arrays` },
  },

  19: {
    id: 19,
    title: `Session Timing & Market Hours`,
    subtitle: `The Clock Is as Important as the Chart  --  When You Trade Matters`,
    level: `Beginner`,
    duration: `17 min read`,
    category: `Timing`,
    imageCaption: `The four sessions  --  Asia, London, New York AM, New York PM  --  each with distinct institutional behavior`,
    intro: `Session timing is one context filter used in ICT trading. Activity, spreads and volatility can vary by instrument and time of day, but a named session does not guarantee a better setup or reveal the intentions of institutional participants. Treat killzones and session profiles as hypotheses to test rather than fixed descriptions of what price must do.`,
    sections: [
      {
        title: `Why Time Matters in ICT`,
        content: `Markets are not equally active throughout the 24-hour trading day. Liquidity  --  the volume of institutional orders hitting the market  --  ebbs and flows dramatically based on which institutional centers are active.\n\nA session may coincide with tighter spreads or more activity for some instruments, but this does not mean setups necessarily work cleanly during that window. When European traders are at lunch and New York has not fully engaged, price chops  --  market activity may be quieter, but a chart does not reveal an algorithm's mandate or intent.\n\nTest differences between 10 AM and 3 PM New York time using a representative sample that includes costs, slippage, losses and no-trade sessions. It is not the setup that changed  --  it is the institutional participation that changed.\n\nTrading during institutional hours is not a filter that improves your results marginally. It is the primary environmental factor that determines whether your setups work at all. Professional ICT traders do not fight this  --  they adapt their entire schedule around it.`,
        highlight: `📌 The same setup can produce different results across session windows. Price timing alone does not reveal who participated or guarantee an edge; test named windows against an appropriate baseline before restricting trading to them.`,
      },
      {
        title: `Asian Session (7 PM - 12 AM New York time)  --  Range Building`,
        content: `In some ICT frameworks, traders mark the Asian-session high and low and later watch how price interacts with those levels. Range size and volatility vary by instrument, weekday, news and feed. A narrow range does not prove that institutions are accumulating positions, and the later session is not required to sweep either side.\n\nIf you use the range as a reference, define the session clock, mark the high and low mechanically, and record what happens during London and New York. Include days where neither side is swept or where a breakout continues without reversing.`,
        highlight: `📌 Asian session = observation and analysis, not trading. Mark the Asian High and Low  --  they become the London session's primary liquidity targets (BSL above Asian High, SSL below Asian Low).`,
      },
      {
        title: `London Killzone (2 AM - 5 AM New York time)  --  Manipulation Phase`,
        content: `Some ICT traders study the hours around the London open for possible false breakouts, structure changes and range expansions. These are candidate price patterns, not proof that European institutions initiate a manipulation phase or that price must move opposite to its eventual direction. Define your conditions for a sweep, close-back, structure shift and entry trigger. Compare the same rules during other time windows and record failed reversals as well as successful ones.`,
        highlight: `📌 The London Judas Swing: price sweeps the Asian High or Low in the first hour → immediately reverses → real daily direction begins. This is the London open's primary trading pattern.`,
      },
      {
        title: `New York AM Killzone (7 AM - 11 AM New York time)  --  Primary Delivery`,
        content: `The New York morning includes the U.S. cash-equity open and may coincide with scheduled economic news and changing activity. The amount of activity depends on the instrument and date; price can trend, range, reverse or remain quiet. A named killzone does not establish a preferred direction or guarantee that an FVG, order block or other setup will work. Define the window using New York time and test your setup against a comparison window, including news days, transaction costs and all valid signals.`,
        highlight: `📌 The 10–11 AM New York Silver Bullet window is a commonly studied ICT time window; test it with a fixed setup definition and include losing and no-trade sessions.`,
      },
      {
        title: `London Close & New York PM (12 PM - 5 PM New York time)`,
        content: `The later London and New York hours can differ from the morning in volume, spreads and available catalysts, but no fixed directional move is assured. Some traders study levels near the London close as possible reference points. Verify the behavior for the instrument and period you trade instead of assuming a predictable repositioning move or mandatory counter-trend setup.`,
        highlight: `📌 After 11 AM New York time, probability drops significantly. The London Close (12-2 PM) can create reversals. The NY PM session (2-5 PM) is high-noise. Avoid new positions  --  focus on managing existing trades.`,
      },
    ],
    quiz: [
      { q: `Which session is described as the "Manipulation Phase" of the AMD cycle?`, options: ['Asian Session', 'London Killzone', 'New York PM', 'London Close'], answer: 1 },
      { q: `The Silver Bullet entry window occurs between...`, options: ['7 AM - 9 AM New York time', '9 AM - 10 AM New York time', '10 AM - 11 AM New York time', '2 PM - 4 PM New York time'], answer: 2 },
      { q: `During the Asian session, ICT traders should primarily...`, options: ['Trade aggressively for quick scalps', 'Observe, analyze, and mark levels for the next session', 'Trade reversals from the Asian range', 'Place orders for the London session'], answer: 1 },
    ],
    nextLesson: { id: 20, title: `Narrative Building` },
    prevLesson: { id: 18, title: `Institutional Order Flow` },
  },

  20: {
    id: 20,
    title: `Narrative Building`,
    subtitle: `Constructing the Complete Trade Story Before Price Moves`,
    level: `Advanced`,
    duration: `25 min read`,
    category: `Advanced`,
    imageCaption: `Narrative building: monthly → weekly → daily → session → entry  --  one coherent story from top to bottom`,
    intro: `Narrative building can be treated as a pre-trade scenario: describe what price may do under defined conditions, what evidence would support the idea, and what would invalidate it. The scenario does not reveal algorithmic intent or remove uncertainty. Not from indicators. Not from patterns. From understanding the current position in the institutional delivery cycle across all relevant timeframes. When you can tell the narrative accurately, trading becomes anticipatory rather than reactive.`,
    sections: [
      {
        title: `What Is a Trading Narrative?`,
        content: `A trading narrative is a complete written or mental story that answers these questions before you place a trade:\n\n• What is the monthly direction and draw on liquidity?\n• What is the weekly direction and draw?\n• What is the daily bias and why?\n• Which AMD phase are we in on each timeframe?\n• What is the session-level sequence expected today?\n• Where is the specific entry, and why is this the correct location?\n• What is the target, and why will price reach it?\n• What would invalidate this narrative?\n\nA narrative is not a gut feeling dressed up in technical language. It is a logical, sequenced argument built from observable price data  --  from the monthly chart all the way to the 1-minute entry trigger. Every step connects to the next. If any step does not connect logically, the narrative is incomplete and the trade should not be taken.`,
        highlight: `📌 A trading narrative is a logical chain from monthly to entry. Every step must connect. If you cannot explain WHY each element supports the next, the narrative is incomplete  --  do not trade.`,
      },
      {
        title: `Building the Monthly → Weekly Layer`,
        content: `MONTHLY LAYER:\n\nQuestion 1: What is the monthly structure?\nAre monthly candles making Higher Highs / Higher Lows (bullish) or Lower Highs / Lower Lows (bearish)?\n\nQuestion 2: Where is the monthly draw on liquidity?\nWhat is the nearest unswept monthly swing high (BSL) or swing low (SSL)? This is the macro target for the next several months.\n\nQuestion 3: Is price in monthly premium or discount?\nDraw the Fibonacci from the last monthly swing. Is current price above or below the 50% EQ? Premium = sell zone, discount = buy zone.\n\nWEEKLY LAYER:\n\nQuestion 1: Does weekly structure confirm the monthly bias?\nIf monthly is bullish, is weekly also making HH/HL? Confirmation = higher probability. Conflict = stay out.\n\nQuestion 2: Where is the weekly draw on liquidity?\nWhat is the nearest weekly swing high (BSL) or swing low (SSL)? This is the target for the current week.\n\nQuestion 3: What is the weekly AMD phase?\nMonday = accumulation. Tuesday/Wednesday = manipulation or early distribution. Thursday/Friday = primary distribution or reversal. What phase does today fall into?\n\nThese two layers define the macro context that makes or breaks every trade below them.`,
        highlight: `📌 Monthly and weekly context can conflict. Record the scenarios and decide in advance how conflict affects your model; alignment does not prove institutional support or make every lower-timeframe setup valid.`,
      },
      {
        title: `Building the Daily Layer`,
        content: `The daily layer is where the specific trading bias for the current day is confirmed or denied:\n\nDAILY STRUCTURE:\nIs the daily chart making HH/HL (bullish) or LH/LL (bearish)? Does this match the weekly and monthly direction?\n\nDAILY DRAW ON LIQUIDITY:\nWhat is the nearest unmitigated daily level? Previous day high (PDH) or previous day low (PDL)? An open daily FVG? A daily OB that has not been returned to? This is today's primary target.\n\nDAILY AMD PHASE:\nWhich phase of the daily AMD cycle are we in?\n• Price near midnight open with minimal movement = Accumulation\n• Price made a false move in one direction = Manipulation (look for the reversal)\n• Price has committed directionally after the false move = Distribution\n\nDAILY PD ARRAY STATUS:\nAre there any open FVGs or OBs on the daily timeframe that price is near? These are high-priority reaction zones that often define the session's key turning point.\n\nAfter completing the daily layer, you should have a specific price zone to watch for the day's primary trade  --  either a buy zone (FVG/OB in discount) or a sell zone (FVG/OB in premium).`,
        highlight: `📌 A daily plan may focus on a candidate PD Array within a defined range, but it remains one scenario. Keep alternative levels and invalidation visible rather than assuming one zone is all that matters.`,
      },
      {
        title: `Building the Session-Level Narrative`,
        content: `With the daily layer complete, you now build the session narrative  --  what specific price sequence do you expect during the trading session?\n\nANTICIPATED SESSION SEQUENCE (BULLISH EXAMPLE):\n\n"Monthly is bullish (making HH/HL). Weekly draw is at last week's high (BSL). Daily structure is bullish with an open bullish FVG at 1.0820-1.0835. Previous day low is at 1.0810  --  this is SSL that has not been swept.\n\nExpected London sequence: price sweeps below PDL (1.0810) to collect SSL  --  this is the Judas Swing. After the sweep, price reverses bullishly. A 5-minute ChoCH above recent structure confirms the reversal. Price returns to the daily FVG at 1.0820-1.0835 for the entry.\n\nExpected NY AM sequence: price enters the bullish FVG during the Silver Bullet window (10-11 AM). A 1-minute displacement candle from the FVG CE confirms entry. Target is the weekly BSL at last week's high. R:R approximately 3.2:1.\n\nInvalidation: If price opens above 1.0835 and the daily FVG is immediately consumed before the entry, the setup is off. Wait for new setup."\n\nThis is a complete session narrative. Every element is identified before the market opens.`,
        highlight: `📌 Write your session narrative before every trading day. "If X occurs at level Y, I will monitor for Z; if invalidation A occurs, I will stand aside." If you cannot write this, you do not have a setup.`,
      },
      {
        title: `When the Narrative Fails  --  Invalidation Logic`,
        content: `The most important part of narrative building is knowing when your narrative is wrong. Every narrative must have a clearly defined invalidation  --  a price level or event that, if it occurs, proves the narrative incorrect and requires you to step aside.\n\nCOMMON NARRATIVE INVALIDATIONS:\n\nBullish narrative invalidation:\n• Price breaks below the key swing low that anchors your bullish structure\n• The daily FVG is consumed (price trades completely through it) without reversing\n• A bearish displacement occurs from the daily premium zone without a setup\n• Time passes without the setup forming  --  the killzone window closes without a trigger\n\nWhen your narrative is invalidated: CLOSE any open positions immediately. Do not argue with the market. Do not widen your stop to "give price more room." The market is telling you your narrative was wrong  --  believe it.\n\nBuilding this discipline  --  the willingness to admit you were wrong and exit cleanly  --  is the psychological foundation of long-term profitability. Every great trader has robust invalidation logic. Every struggling trader has excuses for why their wrong trade might still work.`,
        highlight: `📌 Every narrative MUST have a written invalidation. "If price does X, my narrative is wrong and I close immediately." Trading without invalidation is not analysis  --  it is hope.`,
      },
      {
        title: `Backtesting Your Narrative Framework`,
        content: `The only way to trust your narrative-building skill is to validate it against historical data. Here is a structured backtesting framework for narrative building:\n\nWEEK 1-2: COMPLETED DAILY CANDLE REVIEW:\nGo back 90 days on your target instrument. For each completed trading day, write a retrospective narrative: "Given what the monthly, weekly, and daily showed at the time, what was the correct daily bias? Was there a clear session setup? What was the result?"\n\nWEEK 3-4: REAL-TIME NARRATIVE WRITING (DEMO):\nEvery day before the session opens, write your full narrative as outlined above. Then watch the day unfold and evaluate: How accurate was your sequence prediction? Did the Judas Swing occur as expected? Did the setup form in the killzone?\n\nMONTH 2: FORWARD TNew York timeING:\nContinue writing daily narratives and tracking accuracy. Do not use a generic accuracy target unless the prediction and scoring rules are defined in advance. Track directional bias, setup frequency, outcomes, and expectancy on a representative sample.\n\nA journal of 30 or more sessions can reveal how consistently rules are applied, but it is not enough by itself to establish a durable edge or guarantee better live results.`,
        highlight: `📌 Backtest your narrative skill: go back 90 days and write retrospective narratives. Then write forward-looking narratives daily. Track accuracy. 70%+ direction accuracy = you are ready to trade the narrative live.`,
      },
      {
        title: `The Narrative vs the Trade`,
        content: `An important distinction: the narrative and the trade are separate things.\n\nThe narrative records a scenario you plan to monitor, not what the algorithm will do.\n\nThe trade is the EXECUTION that occurs when price confirms a specific entry sequence within that narrative.\n\nYou can have a correct narrative (bullish daily bias, Judas Swing expected) and still have no trade  --  because the specific entry sequence (sweep + ChoCH + FVG entry in killzone) does not materialize that day.\n\nThis is completely fine. The narrative gives you context and patience. It prevents you from taking low-quality trades out of boredom. It keeps you from chasing price that has already left your entry zone.\n\nSome days the narrative is clear but no setup forms. Some days the narrative is uncertain. Some days narrative AND setup are both perfect  --  these are your A+ days. Trade with maximum conviction on A+ days. Reduce size on A days. Take nothing on B or C days.\n\nNarrative quality and setup quality together determine position sizing. This is how professional traders compound capital consistently while managing risk across varying market conditions.`,
        highlight: `📌 Correct narrative + perfect setup = A+ trade (full size). Correct narrative + mediocre setup = A trade (half size). Unclear narrative = no trade regardless of how good the setup looks.`,
      },
      {
        title: `Full Narrative Walkthrough Example`,
        content: `Here is a complete narrative example on XAUUSD (Gold):\n\nMONTHLY: Bullish structure (HH/HL sequence intact). Monthly draw on liquidity is at 2,450 (previous monthly high). Price currently at 2,310  --  in monthly discount below the 2,380 equilibrium.\n\nWEEKLY: Bullish structure confirming monthly. Weekly draw is previous week's high at 2,340. Price is in weekly discount.\n\nDAILY: Bullish structure. Open bullish FVG on daily at 2,298-2,305 from Tuesday's displacement. PDL is at 2,291  --  SSL that has not been swept.\n\nSESSION NARRATIVE: London will likely sweep below PDL (2,291) to collect SSL. This is the Judas Swing. After sweep, price reverses bullish. NY AM Silver Bullet window sees price return to the daily FVG (2,298-2,305). Entry at FVG CE (2,301.50). Stop below PDL sweep at 2,288. Target: weekly draw at 2,340. R:R = 3.8:1.\n\nINVALIDATION: If price gaps above the FVG on open and closes above 2,308 without reversal, setup is invalidated. Do not chase.\n\nThis is a complete institutional narrative. Written before London opens. Executed during NY AM. Based on alignment from monthly to entry. This is professional ICT trading.`,
        highlight: `📌 A narrative can record higher-timeframe context, session scenario, entry rationale, stop, target and invalidation. Adapt the checklist to your strategy rather than treating one fixed list as mandatory for every model.`,
      },
    ],
    quiz: [
      { q: `A trading narrative must include...`, options: ['Only the entry and stop loss', 'Direction on all relevant timeframes, entry, target, and invalidation', 'RSI and MACD readings', 'News events for the week'], answer: 1 },
      { q: `When your narrative is invalidated, you should...`, options: ['Widen your stop and wait', 'Close positions and step aside immediately', 'Add to the losing position', 'Switch to a different timeframe and look for confirmation'], answer: 1 },
      { q: `A correct narrative with a mediocre setup should be traded at...`, options: ['Full position size', 'Reduced position size (half)', 'Zero size  --  do not trade', 'Double position size to compensate'], answer: 1 },
    ],
    nextLesson: { id: 21, title: `Quarterly Theory` },
    prevLesson: { id: 19, title: `Session Timing & Market Hours` },
  },

  21: {
    id: 21,
    title: `Quarterly Theory & Seasonal Tendencies`,
    subtitle: `Markets Breathe in Quarterly Cycles  --  The Macro Rhythm That Transforms Your Bias`,
    level: `Advanced`,
    duration: `20 min read`,
    category: `Advanced`,
    imageCaption: `Q1-Q4 quarterly cycle: accumulation → manipulation → distribution → reversal  --  the annual market script`,
    intro: `Quarterly Theory is an ICT framework that assigns labels such as accumulation, manipulation, distribution and repositioning to parts of the calendar year. Those labels should be treated as hypotheses about seasonality, not established descriptions of what institutions do. If you study quarterly effects, define the rules in advance and compare results with a baseline across multiple years and instruments.`,
    sections: [
      {
        title: `The Four Quarters of Every Year`,
        content: `Some ICT explanations associate Q1 with accumulation, Q2 with manipulation, Q3 with distribution and Q4 with repositioning. These labels are a framework for organizing observations, not a market law. Quarterly returns, volatility and trends vary across years, instruments and macroeconomic conditions.\n\nTo evaluate the idea, define the expected direction or behavior for each quarter before examining results. Compare distributions across a broad historical period, avoid selecting only famous examples, and account for hindsight bias.`,
        highlight: `📌 Q1 = accumulation (clean trend). Q2 = manipulation (beware reversals and false moves). Q3 = distribution (primary trend delivery). Q4 = repositioning (volatility and potential major reversals).`,
      },
      {
        title: `Q1: The January Effect and Accumulation Logic`,
        content: `Some market commentary discusses a January Effect or seasonal tendencies early in the year, while ICT Quarterly Theory may interpret Q1 through an accumulation label. Neither label reliably determines a year's direction. If you use the quarter as context, compare instrument-specific returns, range, drawdown and direction over multiple years and specify what would falsify the hypothesis.`,
        highlight: `📌 Some traders study quarterly patterns such as January context and possible later reversals. These are hypotheses, not calendar rules; test defined conditions across instruments and periods before using them.`,
      },
      {
        title: `Q2: Spring Manipulation  --  The Most Dangerous Quarter`,
        content: `The quarterly framework sometimes labels Q2 as a manipulation phase, but there is no basis here to conclude that Q2 is universally the most dangerous quarter or that it routinely reverses Q1 to trap retail traders. Quarter-to-quarter behavior can vary substantially. Treat a Q2 reversal filter as a testable idea: define a Q1 trend, a Q2 counter-trend move and a resumed trend before testing; include years where no reversal occurred and compare results with other quarters.`,
        highlight: `📌 Q2 is the most dangerous quarter for trend followers. Reduce size, tighten stops, and look specifically for Q2 sweep-and-reverse setups  --  false breakouts against Q1's direction that immediately reverse.`,
      },
      {
        title: `Monthly Seasonal Tendencies by Pair`,
        content: `Beyond the quarterly framework, specific months have historically reliable seasonal tendencies for major forex pairs and instruments:\n\nFOREX SEASONAL PATTERNS:\n• EURUSD: tends to be weak in Q1 and Q3, stronger in Q2 and Q4 in years of dollar weakness\n• GBPUSD: historically stronger in April-May and weaker in September-October\n• USDJPY: tends to be bullish in Q1 (dollar strengthening) and weaker in Q3\n• XAUUSD (Gold): January historically strong, August-September frequently bullish\n\nINDICES SEASONAL PATTERNS:\n• NAS100/SP500: January Effect, summer dip in Q3, year-end rally in Q4 are well-documented\n• "Sell in May and go away"  --  the tendency for equity weakness between May and October  --  corresponds to Q2 manipulation and Q3 caution before Q4 repositioning\n\nIMPORTANT CAVEAT:\nSeasonal tendencies are biases  --  not certainties. They inform your probability framework but do not override your top-down ICT analysis. Use seasonal tendencies as an additional filter: if ICT analysis says bullish AND seasonality says bullish → higher conviction. If they conflict → be cautious.`,
        highlight: `📌 Seasonal tendencies are calendar-based hypotheses, not established filters by default. Test whether they add out-of-sample value beyond the base model before adjusting conviction; never use them alone as entry or exit signals.`,
      },
      {
        title: `Integrating Quarterly Theory into Your Analysis`,
        content: `Adding Quarterly Theory to your ICT analysis creates a five-layer framework:\n\n1. QUARTERLY LAYER (macro bias):\nWhich quarter are we in? What is the expected institutional behavior for this quarter? Does this quarter confirm or conflict with the annual trend?\n\n2. MONTHLY LAYER:\nMonthly structure and draw on liquidity (as previously discussed)\n\n3. WEEKLY LAYER:\nWeekly structure and draw on liquidity\n\n4. DAILY LAYER:\nDaily bias and specific trade zone\n\n5. SESSION LAYER:\nEntry execution during killzone\n\nA plan may score alignment across quarterly, monthly, weekly and daily charts as confluence. Alignment is not evidence of institutional positions or, by itself, proof of better results; test whether it improves outcomes relative to a simpler baseline. These trades, when the entry setup also forms correctly, are among the most powerful in the entire ICT framework.\n\nPRACTICAL IMPLEMENTATION:\nAt the start of each quarter, take 30 minutes to assess: What quarter are we entering? What was Q1's direction (if applicable)? Does current price action confirm the quarterly bias? How does this affect my monthly and weekly analysis? Update your macro bias document and refer to it before every trading week.`,
        highlight: `📌 The quarterly-to-session hierarchy is one way to organize context. Multiple aligned timeframes do not automatically justify maximum size; risk should reflect tested expectancy, volatility and drawdown limits.`,
      },
    ],
    quiz: [
      { q: `How should quarterly or seasonal ICT patterns be evaluated?`, options: ['As fixed calendar rules for all markets', 'As hypotheses to test across defined instruments and periods', 'As a substitute for risk management', 'As guaranteed reversals'], answer: 1 },
      { q: `Which statement about Q1 in a quarterly ICT narrative is most defensible?`, options: ['Q1 always establishes the year’s direction', 'Q1 can be treated as a context variable, but its directional value must be tested', 'Q1 determines all later-quarter moves', 'Q1 guarantees institutional accumulation'], answer: 1 },
      { q: `How should seasonal tendencies be used in ICT analysis?`, options: ['As the primary trading signal', 'To override ICT analysis when they conflict', 'As an additional probability filter alongside ICT analysis', 'Only for equity markets, not forex'], answer: 2 },
    ],
    nextLesson: { id: 22, title: `Liquidity Voids & Gaps` },
    prevLesson: { id: 20, title: `Narrative Building` },
  },

  22: {
    id: 22,
    title: `Liquidity Voids & Gaps`,
    subtitle: `Understanding and Testing Liquidity Voids and Gaps`,
    level: `Intermediate`,
    duration: `16 min read`,
    category: `PD Arrays`,
    imageCaption: `NWOG and NDOG: opening-gap reference areas whose fills and timing can be tested`,
    intro: `ICT traders sometimes mark fair value gaps, liquidity voids, and opening gaps as possible reference areas. These labels describe chosen chart patterns; they do not establish that no trading occurred throughout a zone, that institutional orders remain there, or that price is programmed to return. Define each gap consistently and test whether it has value as context, an entry condition, or an exit objective.`,
    sections: [
      {
        title: `Liquidity Voids vs Fair Value Gaps  --  Key Distinction`,
        content: `A Fair Value Gap (FVG) is commonly defined using a three-candle rule—for example, the high of the first candle does not overlap the low of the third candle for a bullish formation, with the inverse rule for a bearish formation. A liquidity void is a less standardized term that some traders use for a rapid move or a broad area with relatively little observed price overlap.\n\nThe FVG definition is more mechanical when its candle and timeframe rules are specified; the boundaries of a liquidity void may be more subjective. Neither pattern proves that no transactions occurred or that orders remain unfilled. Define whether a revisit, partial entry, or complete traversal counts as a fill before collecting results.`,
        highlight: `📌 FVGs can be defined with a three-candle rule. Liquidity voids need an explicit boundary rule. Neither label guarantees a revisit or proves the absence of trading activity.`,
      },
      {
        title: `Weekend Gaps (NWOG)  --  New Week Opening Gap`,
        content: `The New Week Opening Gap (NWOG) is commonly marked between a Friday reference price and the first price available when the market reopens after the weekend. For example, a Friday reference of 1.0820 and a Sunday open of 1.0850 would produce a 30-pip difference. The size and definition depend on the price feed and chosen reference.\n\nSome ICT traders monitor this zone as a potential objective or reaction area. Price may partially trade into it, fully cross it, or leave it open. Use one explicit fill rule and measure how often it is revisited over a stated horizon; do not assume the gap dictates the week's direction or the timing of a fill.`,
        highlight: `📌 Mark an NWOG only after choosing the Friday reference and Sunday opening price consistently. Treat the zone as a possible reference; it may be revisited, partially filled, or remain open.`,
      },
      {
        title: `Daily Opening Gaps (NDOG)  --  New Day Opening Gap`,
        content: `A New Day Opening Gap (NDOG) is a difference between the selected prior-day close and the current daily open. Its appearance depends on the instrument, broker/feed and daily-candle definition. It can be marked as a possible reference area, but it is not proof of unfilled institutional orders.\n\nBefore testing an NDOG rule, define the source prices and the meaning of a fill. Track whether price enters the zone, whether it fully crosses it, how long a revisit takes, and what happens afterward. Avoid assuming that London will sweep it, that it will become the day's first target, or that a fill signals the start of a directional move.`,
        highlight: `📌 An NDOG is a gap between defined reference prices. It may be useful to track as context, but it does not guarantee a fill or reveal what price will do next.`,
      },
      {
        title: `Void Fill Patterns  --  Full vs Partial`,
        content: `Not all voids and gaps fill completely before price continues. Understanding the difference between full fills and partial fills helps you manage entries and exits:\n\nFULL FILL:\nPrice returns to the gap or void and trades completely through it  --  from the near edge to the far edge. After a full fill, the zone is typically neutralized and price continues in the pre-fill direction (or establishes a new direction from the far edge).\n\nPARTIAL FILL (50% or CE Fill):\nPrice returns to the gap and fills to approximately the midpoint (Consequent Encroachment), then reverses. This is more common with FVGs  --  price fills to the CE and immediately reacts as institutional orders at the CE level are triggered.\n\nNO FILL (Immediate Continuation):\nPrice occasionally gaps and continues in the gap direction without returning to fill. This is more common with extremely bullish or bearish commitment moves  --  when institutional delivery is so aggressive that the algorithm does not reprice the gap immediately. These gaps remain open as future IRL targets.\n\nPRACTICAL APPLICATION:\nWhen price approaches a void or gap from a direction that aligns with your bias, expect a partial fill to CE as the primary entry zone. Full fills into a PD Array below/above the gap are secondary entries. Entering after a full fill that completely fills the gap reduces risk but also significantly reduces profit potential.`,
        highlight: `📌 Gaps frequently fill to the 50% midpoint (CE) before reacting. Enter at the CE within a gap when it aligns with your HTF bias and a nearby PD Array. A full fill that violates the far edge often signals trend change.`,
      },
      {
        title: `Trading Into and Out of Voids`,
        content: `Integrating void and gap analysis into your ICT trading process:\n\nBEFORE THE SESSION:\n1. Mark any open NWOG from Sunday (if applicable)\n2. Mark the previous day close vs today's open (NDOG if gap exists)\n3. Note all open daily and 4-hour FVGs that haven't been filled\n4. Determine which gaps are in the direction of your daily bias (IRL targets) and which are opposing (potential obstacles or alternative targets)\n\nDURING THE SESSION:\n• If price approaches a gap in your trade direction, watch for the partial fill reaction at the CE\n• If price approaches a gap that opposes your existing position, prepare for potential reversal or partial profit taking\n• Gaps below a rising market are bullish support zones. Gaps above a falling market are bearish resistance zones.\n\nEXIT MANAGEMENT USING GAPS:\nOne of the most useful applications of gap analysis is scaling out of winning positions as they approach opposing gaps. If you are long and an open bearish FVG exists 20 pips above current price, take a portion of profits before price reaches that FVG  --  it represents a zone where price may stall or temporarily reverse before continuing.`,
        highlight: `📌 Use gaps as both entry zones (fill-and-reverse setups) and exit management tools (scale out as you approach opposing gaps). They define the path of least resistance between current price and the DOL.`,
      },
    ],
    quiz: [
      { q: `A New Week Opening Gap (NWOG) forms when...`, options: ['Price breaks a weekly high', 'The forex market opens Sunday at a different price than Friday\'s close', 'Monthly candles overlap', 'The Asian session closes'], answer: 1 },
      { q: `The CE (Consequent Encroachment) of a gap is...`, options: ['The top of the gap', 'The bottom of the gap', 'The exact 50% midpoint of the gap', 'The original closing price before the gap'], answer: 2 },
      { q: `How should a trader evaluate when an NDOG may be revisited?`, options: ['Assume the New York PM session will fill it', 'Compare predefined session windows and fill outcomes in historical data', 'Assume it fills in Asian or early London sessions', 'Treat Friday afternoon as a universal rule'], answer: 1 },
    ],
    nextLesson: { id: 23, title: `Time & Price Theory` },
    prevLesson: { id: 21, title: `Quarterly Theory` },
  },

  23: {
    id: 23,
    title: `Time & Price Theory`,
    subtitle: `How ICT Traders Combine Session Timing and Price Levels`,
    level: `Advanced`,
    duration: `22 min read`,
    category: `Advanced`,
    imageCaption: `Named macro time windows used in some ICT frameworks: define the clock rules and test them against other periods`,
    intro: `Some ICT frameworks pair chart levels with named session or macro time windows. Traders can treat the proposed relationship between time and price as a hypothesis and measure outcomes by instrument, date, and a consistent setup definition. A clock label does not prove that a hidden algorithm is scheduled to deliver price at that moment. This lesson focuses on defining the window, controlling for other conditions, and evaluating whether a time filter adds value.`,
    sections: [
      {
        title: `The Time-Price Matrix`,
        content: `The Time-Price Matrix is an ICT framework for studying whether a setup behaves differently across selected times of day. A trader might compare the same FVG or order-block rule during a named window and outside it, but any difference should be estimated from representative observations rather than assumed in advance.\n\nDefine the time zone and daylight-saving rules, instrument, setup trigger, stop, target, and the treatment of news sessions. Record outcomes for both the selected window and the comparison group, including no-trade cases, losses, spread and slippage. Do not label one time as higher probability until the data supports the claim.`,
        highlight: `📌 The Time-Price Matrix: a valid setup at a relevant session time can provide stronger confluence. Treat time as a testable filter rather than a guarantee.`,
      },
      {
        title: `The 8 Macro Time Windows`,
        content: `ICT materials name several time windows around the London and New York sessions. Treat these as reference times from a particular framework, not as universally verified turning points or proof of when institutional flow begins. Actual activity varies by instrument, news, venue, liquidity and date.\n\nIf you test a window, define its exact start and end in New York time, handle daylight saving consistently, and use the same entry and exit rules for a comparison window. Measure sample size, expectancy, drawdown and costs. Do not infer the day's direction from the clock alone or assume that a named window is the highest-volume or highest-probability period.`,
        highlight: `📌 The Silver Bullet window (10:00-11:00 AM New York time) is a commonly studied macro window. If it is part of your plan, define its rules in advance and test it against other session windows.`,
      },
      {
        title: `Time-Based Reversals  --  Price Changing at the Clock`,
        content: `Some traders study whether reversals or structure changes occur more often near named macro windows. A reversal occurring at 10:00 AM does not establish causation or algorithmic intent; similar moves may occur at other times, and events such as economic releases can influence activity.\n\nA testable rule might mark a defined level, require a specified sweep and close-back condition, then require a lower-timeframe structure break within a predefined window. Record every signal, including those that fail or never trigger. Compare results against a baseline and avoid hindsight-based selection.`,
        highlight: `📌 A structure shift near a named time can be recorded as a candidate trigger. Define the exact time window and conditions before testing; do not treat timing alone as a reversal signal.`,
      },
      {
        title: `The 20-Minute Rule`,
        content: `Some ICT lessons use a 20-minute observation window to evaluate whether momentum develops after a possible reversal. This is not a universal market law. If you adopt the rule, define the starting event, the timeframe, what constitutes directional commitment, and what action follows if the condition is absent. Compare the rule with alternative time limits in a representative sample.`,
        highlight: `📌 A time limit can be a management rule, but it must be tested for your instrument and setup. Lack of momentum is not proof that an algorithm or narrative is wrong.`,
      },
      {
        title: `Using Time to Predict Price`,
        content: `Use a named macro window to prepare a conditional plan rather than predict a fixed price sequence. For example: mark the Asian-session high and low, specify what price would need to do to qualify as a sweep, define the structure-break trigger, and state where the idea is invalid. If the sequence does not occur, record no trade.\n\nReview the plan after the session and include failed or ambiguous cases. A clock time may help organize observations, but it does not direct the market or make execution intrinsically more precise.`,
        highlight: `📌 Prepare scenarios before a session; do not assume a certain sequence must occur at the next macro window.`,
      },
    ],
    quiz: [
      { q: `Which time window is commonly associated with the Silver Bullet model in ICT material?`, options: ['2:33 AM London Open', '8:50 AM Pre-New York', '10:00 AM Silver Bullet', '1:10 PM London Close'], answer: 2 },
      { q: `In a model that uses a 20-minute rule, what is the intended use?`, options: ['A universal delay before every entry', 'A predefined window for checking whether a move gains follow-through', 'A fixed duration for all trades', 'A rule for choosing a 20-pip stop'], answer: 1 },
      { q: `How should a named time window be evaluated in a trading model?`, options: ['Assume every valid setup works better in that window', 'Treat the time label as proof of institutional activity', 'Test whether the window changes results relative to a defined baseline', 'Take every setup regardless of invalidation'], answer: 2 },
    ],
    nextLesson: { id: 24, title: `Turtle Soup & Stop Hunts` },
    prevLesson: { id: 22, title: `Liquidity Voids & Gaps` },
  },

  24: {
    id: 24,
    title: `Turtle Soup & Stop Hunts`,
    subtitle: `Engineering False Breakouts  --  A Reversal Pattern to Test`,
    level: `Intermediate`,
    duration: `18 min read`,
    category: `Strategy`,
    imageCaption: `Turtle Soup: price sweeps above EQH or below EQL → immediate reversal → trend in opposite direction`,
    intro: `The Turtle Soup is named after the "Turtle Trader" breakout strategy  --  a system that buys new 20-day highs and sells new 20-day lows. ICT's Turtle Soup is designed to trade AGAINST turtle traders  --  to catch the reversal immediately after price takes out an obvious high or low and fails to continue in the breakout direction. It is one of the most consistently reliable setups in the entire ICT framework because it is based on the single most predictable institutional behavior: sweeping retail stop orders before reversing.`,
    sections: [
      {
        title: `Why Turtle Soup Works`,
        content: `Turtle Soup is an ICT term for a possible false breakout around a visible high or low. One hypothesis is that a move beyond a level may trigger some orders before price returns through it; the chart does not reveal exactly which orders triggered, who placed them, or whether a participant intended to trap traders. Define the level, required penetration, close-back condition, reversal trigger, stop and target in advance. Record cases where price continues beyond the level rather than selecting only clear-looking reversals in hindsight.`,
        highlight: `📌 Turtle Soup logic: institutions sweep obvious highs/lows to collect liquidity. Your job is to identify that the sweep is likely, wait for it to complete, confirm the reversal, then enter in the opposite direction.`,
      },
      {
        title: `Identifying Turtle Soup Setup Conditions`,
        content: `Some traders test whether a Turtle Soup definition works better when the reference high or low is visible on a higher timeframe, when a close-back condition occurs, or when a lower-timeframe structure break follows. These are candidate filters, not proven requirements or a universal ranking. Set rules before reviewing results and include examples where an apparently obvious level breaks and continues.`,
        highlight: `📌 A potential Turtle Soup setup might combine a marked high or low, contextual alignment, a defined session window and a reversal trigger. Define each condition and test whether it adds value instead of assigning preset A+ grades.`,
      },
      {
        title: `Entry Logic After the Sweep`,
        content: `The common mistake when trading Turtle Soup is entering immediately at the moment of the sweep  --  jumping in short the moment price takes out the high. This often results in getting swept yourself if the initial violation continues further before the real reversal begins.\n\nTHE CORRECT ENTRY SEQUENCE:\n\nStep 1  --  WAIT FOR THE SWEEP TO COMPLETE:\nDo not enter as price is breaking above the high. Wait for the sweep candle to close back below the original level, or wait for a distinct reversal candle to form.\n\nStep 2  --  CONFIRM WITH LTF STRUCTURE BREAK:\nDrop to the 1-minute or 5-minute chart. Wait for a bearish ChoCH (for a bearish Turtle Soup)  --  price must break below a recent 1-minute high to confirm that the reversal has begun and the sweep is complete.\n\nStep 3  --  ENTER ON THE FIRST FVG AFTER THE REVERSAL:\nAfter the 1-minute ChoCH, price will usually pull back briefly before continuing lower. This creates a 1-minute bearish FVG that represents your entry zone. A limit order at the CE of this FVG is the precision Turtle Soup entry.\n\nStep 4  --  STOP ABOVE THE SWEEP WICK:\nPlace the stop above the highest point of the sweep wick  --  not at the original level, above the full wick. The stop must be above the maximum sweep point to avoid being hit on any lingering wicks.\n\nStep 5  --  TARGET = NEXT SSL:\nThe take-profit is the next significant Sell-Side Liquidity pool below price  --  the nearest EQL, previous swing low, or daily draw on liquidity.`,
        highlight: `📌 Turtle Soup entry sequence: wait for sweep → 1-minute ChoCH confirms reversal → enter at first 1-minute FVG after ChoCH → stop above sweep wick → target next SSL. This is the complete execution blueprint.`,
      },
      {
        title: `Turtle Soup on Multiple Timeframes`,
        content: `A false-breakout rule may be applied to different timeframes, but the signal frequency, stop distance and holding period change with the chart interval. A four-hour pattern is not automatically stronger than a one-minute pattern, and larger timeframes do not guarantee larger R multiples. Define the swing level and trigger for each interval, use realistic costs and compare outcomes with consistent performance measures.`,
        highlight: `📌 4-hour Turtle Soups produce the largest moves. 1-hour Turtle Soups are the primary working setup. 15-minute confirms session reversals. 1-minute and 5-minute are entry triggers, not standalone setups.`,
      },
      {
        title: `Common Turtle Soup Errors`,
        content: `ERROR 1  --  ENTERING ON THE SWEEP ITSELF:\nBuying/selling the moment price breaks the obvious level, hoping for the reversal before it is confirmed. Price frequently extends further before reversing  --  this early entry gets stopped out and then watches the real trade work without them.\n\nERROR 2  --  NO HTF CONFIRMATION:\nTaking a Turtle Soup against the higher timeframe trend. A bullish Turtle Soup (sweeping EQL and reversing higher) during a bearish daily bias is counter-trend. Without HTF alignment, many "Turtle Soups" are actually continuation stop hunts that continue in the sweep direction.\n\nERROR 3  --  IGNORING THE DISPLACEMENT QUALITY:\nA genuine Turtle Soup has immediate, explosive displacement in the reversal direction. If price reverses tentatively  --  small candles, overlapping ranges  --  the sweep may not be institutional. Wait for genuine displacement before committing.\n\nERROR 4  --  WRONG LEVEL:\nNot every high or low is a Turtle Soup candidate. The level must have significant retail attention  --  visible EQH/EQL, a widely-watched swing high, a round number. Sweeping a random internal high has no institutional significance.\n\nERROR 5  --  STOP INSIDE THE SWEEP WICK:\nPlacing the stop at the original level (not above the wick). Price frequently wicks further than the initial sweep before reversing. The stop must be above the absolute high of the wick.`,
        highlight: `📌 The three fatal Turtle Soup mistakes: entering on the sweep (not after confirmation), taking it counter to HTF bias, and placing the stop inside the wick instead of above it.`,
      },
    ],
    quiz: [
      { q: `A Turtle Soup setup requires HTF alignment because...`, options: ['It looks cleaner on the chart', 'Without HTF support, sweeps may be genuine breakouts rather than reversals', 'The London session only trades with HTF direction', 'Retail traders cannot see HTF charts'], answer: 1 },
      { q: `The correct Turtle Soup entry occurs...`, options: ['The moment price breaks the obvious level', 'After the sweep + 1-minute ChoCH + retracement into 1-minute FVG', 'At the original high/low level', 'During the Asian session after a quiet night'], answer: 1 },
      { q: `Where should the stop loss be placed on a Turtle Soup?`, options: ['At the original resistance level', 'Inside the sweep wick at the halfway point', 'Above the highest point of the entire sweep wick', '50 pips above the entry'], answer: 2 },
    ],
    nextLesson: { id: 25, title: `Judas Swing & AMD Deep Dive` },
    prevLesson: { id: 23, title: `Time & Price Theory` },
  },

  25: {
    id: 25,
    title: `Judas Swing & AMD Deep Dive`,
    subtitle: `A Possible False Breakout to Define and Test`,
    level: `Intermediate`,
    duration: `20 min read`,
    category: `Strategy`,
    imageCaption: `The Judas Swing: a false move against the daily bias that sweeps liquidity before the real delivery begins`,
    intro: `The Judas Swing is named deliberately  --  it is a betrayal. A false move in the wrong direction that deceives retail traders into positioning opposite to the day's real institutional delivery. Understanding the Judas Swing is understanding the Manipulation phase of AMD in its most practical and tradeable form. Once you can identify it in real time, you are no longer the one being betrayed  --  you are the one positioned to profit from those who are.`,
    sections: [
      {
        title: `What Is the Judas Swing?`,
        content: `Judas Swing is a term in ICT education for a proposed false move around a session transition that may be followed by a move in the opposite direction. It is an interpretation of a possible price sequence—not proof of institutional manipulation or a required event each day. Define the reference range, time window, penetration, close-back or structure shift, invalidation and exit before testing.`,
        highlight: `📌 The Judas Swing reveals true direction by its failure. If the false move goes DOWN, the real move goes UP. Trade the REVERSAL of the Judas, not the initial move with it.`,
      },
      {
        title: `London Judas Swing Anatomy`,
        content: `Some ICT traders watch whether price crosses an Asian-session high or low around the London open and then reverses. A cross and reversal can be described using fixed chart rules; it does not establish why the move occurred or guarantee that the rest of the session will continue the other way. Mark the range consistently and log both reversals and continuations.`,
        highlight: `📌 Judas Swing entry: wait for Asian range sweep → initial reversal displacement → 5-minute ChoCH → retracement into first FVG of the reversal → enter with stop below sweep wick.`,
      },
      {
        title: `NY AM Judas Swing Patterns`,
        content: `The Judas Swing also occurs during the New York AM session, particularly around the NYSE open at 9:30 AM New York time:\n\nTYPE 1  --  PRE-MARKET JUDAS:\nDuring the period from 8:00-9:30 AM, price makes a false move against the daily bias. This sweeps pre-market stop orders and liquidity before the real move begins with the NYSE open.\n\nTYPE 2  --  OPEN REVERSAL:\nAt 9:30 AM, price spikes in one direction for the first few minutes  --  creating what appears to be the day's opening direction. Within 15-20 minutes, this initial move reverses into the real directional delivery of the NY AM session.\n\nTYPE 3  --  SILVER BULLET JUDAS (10 AM):\nAt the 10:00 AM macro window, price sometimes makes a brief false move immediately before the Silver Bullet entry. This is a miniature Judas Swing within the NY AM session  --  a final stop hunt before the primary 10 AM delivery begins.\n\nHOW TO DISTINGUISH JUDAS FROM REAL MOVE:\n• Judas moves are typically fast and aggressive on LOW relative volume compared to the reversal that follows\n• The reversal after a Judas has LARGER candles and more FVGs than the Judas itself\n• A real directional move does not immediately reverse when it takes out an obvious liquidity level\n• The Judas move rarely creates a clear BOS  --  it sweeps and fails`,
        highlight: `📌 The key distinction: a Judas move takes out an obvious liquidity level and immediately reverses. A real directional move takes out the same level and CONTINUES with larger displacement candles.`,
      },
      {
        title: `How Far the Manipulation Extends`,
        content: `One of the most common Judas Swing questions: how far will the false move go before reversing?\n\nThe Judas Swing typically extends to one of these levels:\n\nTARGET 1  --  ASIAN RANGE HIGH/LOW:\nThe most common Judas target. The Asian High or Low is the nearest significant liquidity pool and the most frequently swept level in London.\n\nTARGET 2  --  PREVIOUS DAY HIGH/LOW:\nIf price has already swept the Asian range from the opposite side, the Judas may extend to the PDH or PDL.\n\nTARGET 3  --  A SIGNIFICANT FVG OR OB:\nThe Judas frequently ends precisely when it reaches and partially fills a daily or 4-hour FVG  --  then reverses from that zone.\n\nTARGET 4  --  EQUAL HIGHS/LOWS:\nVisible EQH or EQL above/below the Asian range are powerful Judas targets.\n\nTIMING AS A GUIDE:\nThe London Judas typically completes within the first 60-90 minutes of the London open (2:00-4:00 AM New York time). If price has been falling for more than 90 minutes from the London open, the move may not be a Judas  --  it may be the real direction.\n\nIf you cannot identify the Judas completion within the first 90 minutes, the day's direction is less clear  --  reduce expectations and wait for NY AM confirmation.`,
        highlight: `📌 If the London move hasn't reversed within 90 minutes, it may not be a Judas  --  it may be the real direction. Do not hold Judas reversal trades for more than 90 minutes after London open without seeing reversal displacement.`,
      },
      {
        title: `Entries After Judas Completion`,
        content: `Three entry approaches for the Judas Swing reversal, ranging from most aggressive to most conservative:\n\nENTRY 1  --  AGGRESSIVE (Sweep + LTF Candle):\nEnter immediately when a reversal candle forms at the Judas target  --  before a formal LTF structure break. Higher risk (may not be the real reversal) but better price if correct.\n\nENTRY 2  --  MODERATE (Sweep + 5M ChoCH + Retracement):\nWait for the Judas sweep → wait for a 5-minute ChoCH in the reversal direction → enter on the first retracement into the 5-minute FVG after the ChoCH. This is the standard ICT Judas Swing entry  --  balances risk and reward.\n\nENTRY 3  --  CONSERVATIVE (Full Confirmation + Continuation):\nWait for the full 5-minute structure to shift → wait for a pullback to the 15-minute or 1-hour FVG from the initial reversal move → enter on the second push in the reversal direction. Lowest risk, smallest R:R, best for beginners.\n\nSTOP PLACEMENT FOR ALL ENTRIES:\nStop goes below the absolute low of the Judas wick (for bullish reversal) or above the absolute high (for bearish reversal). Never inside the wick.\n\nTARGET PLACEMENT:\nFirst target: Previous day high (for bullish reversal) or previous day low (for bearish reversal). Second target: weekly draw on liquidity.`,
        highlight: `📌 Some ICT traders describe aggressive, moderate and conservative Judas-style entry variants. These are alternative examples, not universal entries; define each trigger, stop, target and invalidation before testing instead of assuming every setup uses the same rules.`,
      },
      {
        title: `Confirming Judas vs Real Breakout`,
        content: `A possible false breakout and a genuine breakout can look similar while they are developing. A trader may define a close back inside the range, a subsequent structure shift, or follow-through as confirmation, but none guarantees the next move. Volume data—when available and relevant to the venue—can be another feature to test, not a universal discriminator. Define the rule in advance and avoid labelling a move as a fake only after it reverses.`,
        highlight: `📌 Genuine Judas: fast sweep → immediate reversal → large reversal candles with FVGs. Real breakout: holds above/below broken level → displacement in breakout direction → distance from the level. When uncertain, wait.`,
      },
    ],
    quiz: [
      { q: `The Judas Swing is the ICT term for...`, options: ['A trend continuation pattern', 'The manipulation phase false move that traps retail traders before the real direction', 'A bullish candlestick pattern', 'The Asian session opening move'], answer: 1 },
      { q: `After the London Judas Swing completes, price should...`, options: ['Continue in the Judas direction', 'Create a LTF ChoCH confirming reversal, then deliver in the opposite direction', 'Enter a consolidation phase until NY opens', 'Return exactly to the Asian range midpoint'], answer: 1 },
      { q: `If the London move hasn't reversed after 90 minutes, you should...`, options: ['Enter in the direction of the move anyway', 'Double your stop loss to give price more room', 'Consider that the move may be the real direction and reduce expectations for a reversal', 'Wait for the NY AM session to confirm'], answer: 2 },
    ],
    nextLesson: { id: 26, title: `Balanced Price Range (BPR)` },
    prevLesson: { id: 24, title: `Turtle Soup & Stop Hunts` },
  },

  26: {
    id: 26,
    title: `Balanced Price Range (BPR)`,
    subtitle: `A Guide to Identifying and Testing Balanced Price Ranges`,
    level: `Advanced`,
    duration: `16 min read`,
    category: `PD Arrays`,
    imageCaption: `BPR: bullish FVG and bearish FVG overlap  --  the dual institutional zone that creates the sharpest reactions`,
    intro: `The Balanced Price Range is where two opposing Fair Value Gaps overlap  --  where a zone of bullish institutional imbalance and a zone of bearish institutional imbalance occupy the same price range. This overlap creates the most concentrated institutional interest of any entry zone in the ICT framework. Reactions from BPRs are typically sharper, faster, and more complete than reactions from any single PD Array.`,
    sections: [
      {
        title: `BPR Formation  --  How It Forms`,
        content: `A Balanced Price Range (BPR) forms when two conditions are met simultaneously:\n\n1. A BULLISH FVG exists at a specific price range (high of candle 1 to low of candle 3 on a bullish displacement)\n2. A BEARISH FVG overlaps with that same price range (high of candle 3 to low of candle 1 on a bearish displacement)\n\nThe OVERLAP ZONE  --  the price range where both FVGs occupy the same space  --  is the BPR.\n\nWHY DOES THIS HAPPEN?\nBPRs form most commonly in areas of high institutional activity where price has passed through the same zone multiple times with strong directional commitment in both directions. When the bullish displacement through a zone and the bearish displacement through the same zone both leave FVGs, the overlapping area becomes loaded with institutional orders from both camps.\n\nThis creates a zone where, when price returns, BOTH sets of orders are triggered simultaneously  --  creating an exceptionally powerful reaction point.\n\nVISUALIZING BPR:\nImagine drawing a green box for a bullish FVG and a red box for a bearish FVG. Where these two boxes overlap  --  where they share the same price range  --  that overlapping area is the BPR. The BPR is typically a smaller zone than either individual FVG.`,
        highlight: `📌 BPR = the overlap zone between a bullish FVG and a bearish FVG at the same price level. The overlap is typically smaller than either FVG individually but carries the combined institutional interest of both.`,
      },
      {
        title: `Why BPR Creates Extreme Reactions`,
        content: `A Balanced Price Range (BPR) is commonly described in ICT material as the overlap between bullish and bearish Fair Value Gap zones. Some traders monitor the overlap as a possible reaction area, but an overlap does not prove that institutional orders are concentrated there or that price will react sharply. Define the candle rules, boundaries and reaction condition, then evaluate outcomes including complete violations and no reaction.`,
        highlight: `📌 Some ICT explanations define a BPR as an overlap of bullish and bearish fair value gaps. The overlap does not identify institutional orders or guarantee a sharper reaction; define the zone rule and test it.`,
      },
      {
        title: `Identifying BPR on Any Timeframe`,
        content: `STEP-BY-STEP BPR IDENTIFICATION:\n\nStep 1  --  Mark all bullish FVGs on your timeframe:\nGo through recent price history and mark every zone where a bullish displacement created a gap between candle 1's high and candle 3's low.\n\nStep 2  --  Mark all bearish FVGs:\nMark every zone where a bearish displacement created a gap between candle 1's low and candle 3's high.\n\nStep 3  --  Look for overlaps:\nWhere does a bullish FVG zone occupy the same price range as a bearish FVG zone? The overlap is the BPR.\n\nStep 4  --  Define the overlap precisely:\nThe BPR zone runs from the HIGHER of the two lower boundaries to the LOWER of the two upper boundaries. Example: Bullish FVG = 1.0820 to 1.0840. Bearish FVG = 1.0815 to 1.0835. BPR = 1.0820 to 1.0835 (the overlap).\n\nStep 5  --  Determine direction:\nA BPR in a bullish dealing range (discount zone) with bullish HTF bias = BULLISH BPR. A BPR in a bearish dealing range (premium zone) with bearish HTF bias = BEARISH BPR.\n\nSome traders look for a BPR that also overlaps OTE and aligns with higher-timeframe context. Treat this as a hypothesis, not a ranking; test whether each added condition improves expectancy.`,
        highlight: `📌 BPR identification: mark bullish FVGs → mark bearish FVGs → find price range where both overlap → that overlap is the BPR. The smaller the overlap zone, the more precise the institutional concentration.`,
      },
      {
        title: `BPR + OB Confluence`,
        content: `Some traders study whether a BPR overlapping an order block performs differently from either feature alone. The overlap is a chart relationship; it does not demonstrate that institutional orders were placed there or that multiple sets of orders are present. Define both patterns independently, then compare BPR-only, order-block-only and combined cases with the same entry, stop, target and cost assumptions.`,
        highlight: `📌 OB + BPR overlap can be evaluated as one confluence condition. A label such as maximum PD Array stacking does not prove a stronger edge; compare the combined rule with a simpler baseline.`,
      },
      {
        title: `Partial BPR Fills and Continuation`,
        content: `A price move may enter part of a BPR and then reverse, continue through the entire zone, or remain inside it. The midpoint (sometimes called consequent encroachment) is one reference price some traders watch; it does not inherently provide the best reward-to-risk ratio or reveal where orders are concentrated. Define partial versus full fill and compare midpoint entries with alternative rules, including slippage and missed fills.`,
        highlight: `📌 The BPR midpoint can be tested as an entry reference, but it is not automatically the highest-R:R or best fill. Compare midpoint and edge entries using the same stop, target and market sample; define mitigation before testing.`,
      },
    ],
    quiz: [
      { q: `A Balanced Price Range (BPR) forms when...`, options: ['Price makes equal highs and equal lows', 'A bullish FVG and bearish FVG overlap at the same price zone', 'An Order Block is fully mitigated', 'Price reaches the 50% equilibrium level'], answer: 1 },
      { q: `In an ICT framework, why might a trader mark a BPR?`, options: ['It proves two sets of institutional orders converged', 'It labels an overlap between defined bullish and bearish FVGs that can be tested', 'It guarantees a sharper reaction', 'It forms only during killzones'], answer: 1 },
      { q: `If price closes beyond the far edge of a BPR, you should...`, options: ['Enter a larger position  --  the BPR is now more powerful', 'Consider the BPR mitigated and remove it from your chart', 'Wait for price to return to the BPR midpoint', 'Move your stop to the far edge of the BPR'], answer: 1 },
    ],
    nextLesson: { id: 27, title: `Execution & Trade Management` },
    prevLesson: { id: 25, title: `Judas Swing & AMD Deep Dive` },
  },

  27: {
    id: 27,
    title: `Execution & Trade Management`,
    subtitle: `Knowing the Setup Is 40% of Trading  --  Execution Is the Other 60%`,
    level: `Advanced`,
    duration: `24 min read`,
    category: `Execution`,
    imageCaption: `Precise entry + correct SL placement + planned TP = execution that lets the edge compound over time`,
    intro: `Most ICT learners spend 90% of their time on concepts and 10% on execution. In reality, two traders with identical knowledge of ICT concepts will produce completely different results based on how they execute. Precise entry timing, non-negotiable stop placement, intelligent take-profit management, and the psychology of holding a winning trade  --  these are the skills that determine whether your ICT knowledge produces profits or frustration.`,
    sections: [
      {
        title: `Entry Precision  --  Limit vs Market Orders`,
        content: `LIMIT ORDERS (Preferred for ICT Entries):\nA limit order is placed at a specific price level  --  typically the CE of a FVG, the top of an OB, or the middle of a BPR. Price must reach your level for the order to fill. You enter at the level you chose, not wherever price happens to be when you decide to trade.\n\nADVANTAGES:\n• Precise entry at your chosen PD Array level\n• Better R:R because entry is at the optimal zone\n• No emotional pressure  --  the order fills automatically if your level is reached\n• Eliminates impulse entries that often occur at worse prices\n\nMARKET ORDERS (Used for Confirmation Entries):\nA market order fills immediately at the current best price. Used when waiting for a limit order would mean missing the move  --  specifically after seeing a 1-minute ChoCH or displacement candle that confirms the move has begun.\n\nWHEN TO USE MARKET vs LIMIT:\n• Use LIMIT at FVG CE, OB top, BPR midpoint  --  known PD Array levels\n• Use MARKET after a 1-minute structure break that confirms reversal (aggressive confirmation entry)\n• Never use market orders to "chase" a move that has already departed from your intended entry level\n\nThe most common execution mistake: using a market order because "price is moving and I don't want to miss it." This consistently produces entries at worse prices and tighter R:R.`,
        highlight: `📌 Limit and market orders have different fill, slippage and missed-trade tradeoffs. Choose order type through a predefined execution rule suited to spread, volatility and the setup; do not generalize one order type across every model.`,
      },
      {
        title: `Stop Loss Placement Logic`,
        content: `Stop loss placement in ICT is not arbitrary  --  it follows a specific logical framework based on what would invalidate the trade thesis:\n\nFOR FVG ENTRIES:\nStop goes below the ENTIRE FVG (for longs) or above the ENTIRE FVG (for shorts). The full FVG zone represents the institutional imbalance  --  if price trades completely through it, the thesis is invalid.\n\nFOR ORDER BLOCK ENTRIES:\nStop goes below the FULL CANDLE BODY of the OB (for longs) or above it (for shorts). The OB candle represents the institutional accumulation  --  violation of the full candle invalidates it.\n\nFOR TURTLE SOUP / JUDAS SWING ENTRIES:\nStop goes beyond the ABSOLUTE EXTREME of the sweep wick  --  including the furthest extension of the hunt candle. This is typically 5-10 points beyond where most traders would place their stop, specifically to survive any secondary wick before the real reversal.\n\nFOR BPR ENTRIES:\nStop goes beyond the FAR EDGE of the BPR zone  --  the edge opposite to your entry.\n\nGENERAL RULE:\nThe stop goes at the level that, if reached, proves the setup was wrong  --  not at a level that allows price to "breathe" or "give it room." If the setup is valid, price should not come close to the logical invalidation stop. If it does, you want to be out.`,
        highlight: `📌 Stop placement rule: stop goes at the level that PROVES THE SETUP WRONG if reached. Not a round number. Not a comfortable distance. The exact level that invalidates the specific setup type you entered.`,
      },
      {
        title: `Take Profit at Liquidity Targets`,
        content: `Take profit placement in ICT is always at an identified Draw on Liquidity  --  a specific liquidity pool, not an arbitrary level:\n\nTP1  --  INTERNAL RANGE LIQUIDITY (IRL):\nThe first TP is at the nearest significant IRL target  --  an open FVG above price (for longs), an unmitigated OB above, or a recent swing high that represents BSL. This should typically be 2:1 or better R:R from your entry.\n\nTP2  --  EXTERNAL RANGE LIQUIDITY (ERL):\nThe second TP (for partial positions) is at the session's primary draw on liquidity  --  PDH, PDL, weekly high/low, or a significant swing that has not been swept. This is typically 3:1 to 5:1 R:R.\n\nTP3  --  MACRO DRAW:\nIf the trade is a larger swing with weekly/monthly context, the third TP is at a macro draw on liquidity  --  a monthly high/low, a major round number, or a quarterly target.\n\nNEVER PLACE TP AT RANDOM PRICE:\nThe most common amateur mistake  --  placing TP at "50 pips" or "2:1 R:R" without identifying whether that specific level has liquidity significance. If your TP is not at an actual liquidity pool (BSL or SSL), price may stop just before it and reverse.\n\nMARK YOUR TP BEFORE ENTRY:\nIdentify your TP level during pre-session analysis  --  before the trade forms. You should know where you are exiting before you know where you are entering.`,
        highlight: `📌 Some ICT plans use a candidate DOL as one possible target. Define target-selection and invalidation rules before entry; a marked liquidity level is not a required destination, and a fixed three-target sequence is only one model.`,
      },
      {
        title: `Partial Profits  --  When and How Much`,
        content: `Partial profit taking is a risk management and psychological tool. Used correctly, it removes stress from winning trades and lets profits run to maximum targets:\n\nWHEN TO TAKE PARTIALS:\n• When price reaches the first identified liquidity target (TP1)\n• When price reaches a significant HTF PD Array that might create a temporary reaction\n• When holding the full position becomes emotionally difficult  --  taking a partial reduces stress without fully closing\n\nHOW MUCH TO TAKE:\n• TP1  --  Take 25-50% of position at first target\n• Move stop to breakeven after TP1 is hit  --  the remaining position is now risk-free\n• TP2  --  Take another 25-50% of the remaining position at the second target\n• Let the final 25-50% run to the macro draw or a trailing stop exit\n\nTHE PSYCHOLOGY OF PARTIALS:\nPartial profits serve a critical psychological function  --  they prove the trade is working before the final target is reached. This reduces the emotional impulse to close the entire position prematurely when price has a brief adverse retracement on the way to the target.\n\nTHE DANGER OF PARTIALS:\nTaking partials too early (before any target is reached) simply because you are nervous is NOT partial profit taking  --  it is fear-based early exit. Wait for a defined target before taking any profits.`,
        highlight: `📌 Partial exits, breakeven moves and holding for another target are alternative management rules. Compare their effects on expectancy and drawdown before adopting a fixed percentage or sequence.`,
      },
      {
        title: `Break Even Logic and Trail Stops`,
        content: `MOVING TO BREAKEVEN:\nThe most common break-even rule in ICT trading: move the stop to breakeven after price has moved 1R in your favor AND after a significant PD Array has been either reached or cleared.\n\nDo NOT move to breakeven:\n• The moment the trade is a few pips positive  --  this creates "stop the winners early" behavior\n• Before the first PD Array is cleared  --  price may need to test a nearby array before continuing\n\nMove to breakeven WHEN:\n• Price has cleared the first significant PD Array in your direction\n• Price has moved at least 1R in your favor\n• A LTF BOS has confirmed commitment in your direction\n\nTRAILING STOPS IN ICT:\nICT does not typically advocate fixed trailing stops (e.g., "trail by 20 pips"). Instead, use a STRUCTURAL trailing stop:\n• Move the stop to below the most recent Higher Low (for longs) after each BOS\n• As price creates new Higher Highs with clear structure, move the stop to below the new HL\n• This keeps the stop at the logical structural level  --  where the thesis would be invalidated if breached\n\nFULL EXIT LOGIC:\nClose the full position when price reaches the final target (macro DOL) OR when a clear bearish ChoCH occurs on the working timeframe (for a long trade). Do not hold past a structure shift in the opposite direction.`,
        highlight: `📌 Move to breakeven when: price moved 1R + cleared first PD Array + LTF BOS confirmed. Use structural trailing stops (below each new HL) rather than arbitrary pip-based trails.`,
      },
      {
        title: `Position Sizing and Risk Per Trade`,
        content: `RISK LIMITS ARE ACCOUNT- AND STRATEGY-SPECIFIC:\nThere is no single percentage that is appropriate for every trader, instrument, strategy or account. Choose a maximum planned loss per trade that fits your tested strategy, account rules and ability to tolerate drawdown. Include total open exposure and correlated positions; a setup grade such as A+ should not automatically justify higher risk.\n\nCALCULATING POSITION SIZE:\n1. Choose the amount you are willing to lose if the stop is reached.\n2. Define the entry and stop from your written setup rules.\n3. Convert the stop distance into monetary risk using the instrument's contract size, tick/pip value and account currency.\n4. Account for spread, commissions, slippage and other execution costs.\n5. Check aggregate risk across open positions before placing the order.\n\nHYPOTHETICAL EURUSD EXAMPLE:\nAssume a $50,000 account, a planned risk cap of 1% ($500), a 25-pip stop, and a pip value of $10 per standard lot. Under those assumptions, $500 / (25 × $10) = 2 standard lots before additional costs or slippage. Actual sizing depends on the broker, contract specifications, quote currency and execution conditions.\n\nDAILY AND WEEKLY PAUSE RULES:\nSome traders set daily or weekly loss limits and pause trading when they are reached. Choose thresholds in advance based on your strategy, account limits and risk capacity, then review the cause of a drawdown. A limit may reduce exposure, but it does not guarantee that losses will stop exactly at that percentage.`,
        highlight: `📌 Example risk framework, not a universal prescription: set a per-trade cap and daily or weekly stop based on your tested strategy, account limits and ability to tolerate drawdown. A subjective setup grade alone does not justify increasing risk.`,
      },
      {
        title: `The Psychology of Execution`,
        content: `The mechanics of execution  --  where to enter, where to stop, where to exit  --  are teachable and learnable within weeks. The psychology of execution takes much longer and is where most traders fail despite correct setups.\n\nTHE CORE EXECUTION PSYCHOLOGY CHALLENGES:\n\n1. PREMATURE EXIT:\nClosing a winning trade before the target because you are afraid it will reverse. Caused by past experiences of winners becoming losers. Solution: partial profits at TP1 reduce this fear while keeping the position running.\n\n2. STOP MOVEMENT:\nMoving the stop further away when price approaches it  --  "giving it more room." This turns defined-risk trades into undefined-risk disasters. Solution: write the stop level in your journal before entry and treat it as a physical contract you cannot break.\n\n3. LATE ENTRY:\nEntering a trade after missing the intended entry level because you cannot bear to let it go. This creates worse entries with worse R:R. Solution: if you miss the entry, write "missed" in your journal and wait for the next one.\n\n4. OVERTRADING:\nTaking additional trades after a winner to "keep the momentum going" or after a loser to "make it back." Both are destructive. Solution: maximum two trades per day. After two, close all charts.\n\n5. ANALYSIS PARALYSIS:\nKnowing the setup is valid but being unable to pull the trigger due to fear of being wrong. Solution: pre-planned limit orders placed before the session  --  the order fills automatically without requiring a real-time decision.`,
        highlight: `📌 The biggest execution killers: premature exit, stop movement, late entry, overtrading, and analysis paralysis. Each has a specific solution. Write them down and review them weekly.`,
      },
    ],
    quiz: [
      { q: `How should order type be chosen for an ICT-style entry?`, options: ['Use a market order whenever price moves fast', 'Follow a predefined execution rule that fits the setup, spread and slippage assumptions', 'Always use limit orders at every PD Array', 'Use limit orders only during the Asian session'], answer: 1 },
      { q: `In a trading plan that uses DOL, which is one possible preplanned target?`, options: ['A fixed 2:1 R:R in every trade', 'A round number in every market', 'A candidate draw on liquidity selected by the defined model', 'The previous day close in every trade'], answer: 2 },
      { q: `The correct time to move your stop to breakeven is...`, options: ['The moment the trade becomes positive', 'After price has moved 1R AND cleared the first PD Array AND LTF BOS confirmed', 'After 30 minutes regardless of price action', 'When you feel nervous about the trade'], answer: 1 },
    ],
    nextLesson: { id: 28, title: `Backtesting & Model Development` },
    prevLesson: { id: 26, title: `Balanced Price Range (BPR)` },
  },

  28: {
    id: 28,
    title: `Backtesting & Model Development`,
    subtitle: `No Edge Can Be Trusted Until It Has Been Proven Across Hundreds of Historical Setups`,
    level: `Advanced`,
    duration: `22 min read`,
    category: `Strategy`,
    imageCaption: `The backtesting process: 100+ historical trades → statistical analysis → defined model → forward test → live trading`,
    intro: `The most dangerous phrase in trading is "I think this setup works." ICT traders do not think  --  they know, because they have tested their setup across hundreds of historical occurrences and measured the results statistically. Backtesting is not busywork. It is the process that transforms a set of interesting concepts into a provable, statistical edge  --  the foundation of consistent profitability.`,
    sections: [
      {
        title: `Why Most Traders Skip This and Fail`,
        content: `Here is an uncomfortable truth: the majority of traders who learn ICT concepts never systematically backtest them. And the majority of those traders never achieve consistent profitability. This is not a coincidence.\n\nREASONS TRADERS SKIP BACKTNew York timeING:\n1. Impatience  --  they want to trade now, not study historical data\n2. Overconfidence  --  "I understand the concept, that's enough"\n3. Avoidance  --  backtesting reveals that their current approach doesn't actually work\n4. False belief that demo trading IS backtesting (it is not)\n\nWHY SKIPPING BACKTNew York timeING FAILS:\n• Without backtesting, you do not know your actual win rate\n• Without knowing your win rate, you cannot size positions correctly\n• Without correct sizing, even a positive expectancy system destroys accounts through luck-based drawdowns\n• Without statistical evidence, you abandon valid setups after 3 losses and keep invalid setups because they feel right\n\nBACKTNew York timeING IS NOT OPTIONAL:\nFor serious ICT practitioners, backtesting is the equivalent of a pilot's flight simulator hours  --  you prove you can navigate the conditions before risking lives. Backtesting proves you can execute the strategy before risking capital.`,
        highlight: `📌 Backtesting is not optional if you are serious about profitability. Without statistical evidence of your edge, you are trading on hope  --  and hope is not a trading strategy.`,
      },
      {
        title: `Setting Up a Proper Backtesting Environment`,
        content: `TOOLS FOR ICT BACKTNew York timeING:\n\nOPTION 1  --  TRADINGVIEW REPLAY (FREE, RECOMMENDED):\nTradingView's Bar Replay feature allows you to go back in time on any instrument and move forward candle by candle, making trading decisions as if you are in real time. This is the gold standard for manual ICT backtesting.\n\nSetup: Open TradingView → select your instrument → click the Bar Replay button → go back 6-12 months → replay day by day, marking your analysis before you advance.\n\nOPTION 2  --  FOREX TNew York timeER:\nA dedicated backtesting software that allows tick-by-tick replay with order simulation. More realistic but requires a paid subscription. Excellent for traders who want simulated execution with real spread and slippage data.\n\nOPTION 3  --  CHART SCROLLING METHOD:\nScroll your chart back in time → cover future price with a box → advance forward candle by candle manually. Cruder than replay tools but accessible on any platform.\n\nWHAT YOU NEED TO RECORD:\n• Date and instrument\n• Entry price and entry reason (which PD Array, which session, which AMD phase)\n• Stop loss level and reason\n• Take profit level and reason (which DOL)\n• Exit price and exit reason\n• R:R planned vs R:R achieved\n• All criteria from your entry checklist (which were present, which were missing)\n• Outcome: win / loss / breakeven\n• Notes on execution quality`,
        highlight: `📌 Use TradingView Bar Replay for free backtesting. Record every triggered trade with full criteria notes. The quality of your data determines the quality of your analysis.`,
      },
      {
        title: `What to Record in Every Backtest`,
        content: `A backtest record that does not capture sufficient detail is nearly useless for analysis. Here is the minimum required data for each backtested trade:\n\nTRADE IDENTIFICATION:\n• Trade number (sequential)\n• Date and time of entry\n• Instrument traded (EURUSD, NAS100, XAUUSD)\n• Session (London, NY AM)\n• Direction (Long / Short)\n\nSETUP QUALITY:\n• Setup type (FVG entry, OB entry, BPR entry, Turtle Soup, etc.)\n• HTF alignment: Monthly direction, Weekly direction, Daily bias\n• Was price in discount (for longs) or premium (for shorts)?\n• Killzone: Yes / No\n• Liquidity sweep present: Yes / No\n• Entry criteria checklist: which items were confirmed?\n\nTRADE MECHANICS:\n• Entry price\n• Stop loss price and distance in pips\n• Planned TP1, TP2\n• Initial planned R:R\n\nOUTCOME:\n• Exit price\n• Actual R:R achieved\n• Result: Win / Loss / Breakeven\n• Did price reach TP1 before TP2? Before stop?\n• Were there any execution errors (entered late, moved stop, exited early)?\n\nPOST-TRADE NOTES:\n• What worked about this trade?\n• What would you do differently?\n• Confidence level in setup (1-10)`,
        highlight: `📌 Record every triggered setup, wins and losses, using the same criteria. Excluding losses biases the sample; review loss types as hypotheses for process improvements, then test any proposed filter separately before relying on it.`,
      },
      {
        title: `Sample Size  --  Minimum for Statistical Significance`,
        content: `There is no universal number of trades that guarantees statistical significance or proves a trading model is ready for live use. The amount of data required depends on the effect size being tested, variability, the number of filters, and how independent the observations are. Use a documented sample plan, avoid changing rules after reviewing outcomes, and separate rule development from out-of-sample validation. Report trade count, expectancy, uncertainty, drawdown, market coverage and costs; then forward-test before risking material capital.`,
        highlight: `📌 There is no universal minimum sample size that guarantees statistical significance or production confidence. Choose a sample strategy based on setup variability, and include out-of-sample and forward testing. Test EXACTLY the rules you will trade live  --  no mid-backtest modifications. Record every triggered setup, wins and losses equally.`,
      },
      {
        title: `Turning Results Into a Defined Model`,
        content: `After completing 100+ backtested trades, analyze the data systematically to build your defined trading model:\n\nKEY METRICS TO CALCULATE:\n\nWIN RATE:\n(Winning trades / Total trades) × 100\nNo universal win-rate target applies across instruments, rules, and costs.\n\nAVERAGE R ON WINNERS:\nSum of all winner R multiples / Number of winners\nNo universal average-R target applies across strategies.\n\nAVERAGE R ON LOSERS:\nSum of all loser R multiples / Number of losers\nTarget: should be -1R (full stop hit)\n\nEXPECTANCY:\n(Win rate × Average R winner) - (Loss rate × Average R loser)\nEstimate expectancy on a representative sample and account for uncertainty and costs; do not assume a universal 0.5R threshold.\n\nMAXIMUM CONSECUTIVE LOSSES:\nThe longest losing streak in your 100-trade sample\nThis determines how much drawdown to expect during the inevitable bad runs\n\nBNew York time PERFORMING FILTERS:\nAnalyze which criteria, when present, correlated with the highest win rates:\n• Setup type: which PD Array performed best?\n• Session: London or NY AM?\n• HTF alignment: did 3-timeframe alignment outperform 2-timeframe?\n• AMD phase: did distribution phase entries outperform manipulation entries?\n\nMODIFICATIONS BASED ON DATA:\nIf certain criteria consistently appear in losers but rarely in winners  --  add them as EXCLUSION filters. If certain criteria consistently appear in winners  --  make them REQUIRED. Build the final model from what the data tells you, not what feels right.`,
        highlight: `📌 Calculate: win rate, average R, expectancy, max consecutive losses. Add criteria that consistently appear in winners as requirements. Remove criteria that consistently appear in losers as exclusions.`,
      },
      {
        title: `Forward Testing Your Model on Demo`,
        content: `After defining your model from backtesting, the next step is forward testing on a demo account  --  trading the model in real time on paper money to validate that it performs similarly in live market conditions:\n\nWHY FORWARD TNew York timeING MATTERS:\nBacktesting, even done perfectly, has limitations:\n• You know roughly what price does in the data you are reviewing\n• Emotional pressure is absent\n• Execution is hypothetical\n\nForward testing on demo introduces:\n• Real-time uncertainty  --  you do not know what price will do\n• Real-time emotional pressure  --  even on paper money, decisions feel more real\n• Real execution practice  --  actually placing orders, managing positions\n\nFORWARD TNew York time REQUIREMENTS:\n• Trade the EXACT same rules from your backtest model  --  no modifications\n• Record every triggered trade with the same detail as backtesting\n• Minimum 50 forward-tested trades before considering live trading\n• Target: 50 consecutive trades following ALL rules of your model (including staying out when conditions are not met)\n\nWHEN FORWARD TNew York time RESULTS MATCH BACKTNew York time:\nSimilar backtest and forward-test win rates alone do not prove robustness or readiness for live trading. Compare expectancy, drawdown, trade frequency, costs, and rule adherence on an independent sample.\n\nWHEN THEY DON\'T MATCH:\nIf forward test results are significantly worse than backtest  --  either your backtest had replay bias, or there are real-time conditions that affect the model that were not present in historical data. Identify the discrepancies and fix them before going live.`,
        highlight: `📌 Forward-test on demo with a sample large and representative enough for the setup’s frequency and variability. A 50-trade minimum or a 10-percentage-point win-rate difference cannot certify robustness on its own; compare costs, expectancy, drawdown, execution quality and out-of-sample performance before risking capital.`,
      },
    ],
    quiz: [
      { q: `The minimum number of trades required for statistically significant backtesting is...`, options: ['10 trades', '50 trades', '100 trades', '500 trades'], answer: 2 },
      { q: `Expectancy in backtesting is calculated as...`, options: ['Win rate × Average R', '(Win rate × Avg R winner) - (Loss rate × Avg R loser)', 'Total wins / Total losses', 'Average R × position size'], answer: 1 },
      { q: `If forward test win rate is significantly lower than backtest win rate, you should...`, options: ['Trade live anyway  --  demo is always different', 'Identify and fix the discrepancies before risking real capital', 'Increase position size to compensate', 'Accept the lower win rate and adjust expectations'], answer: 1 },
    ],
    nextLesson: null,
    prevLesson: { id: 27, title: `Execution & Trade Management` },
  },


  29: {
    id: 29,
    title: `Risk Management Fundamentals`,
    subtitle: `The #1 Reason Traders Fail (And How to Avoid It)`,
    level: `Beginner`,
    duration: `18 min read`,
    category: `Risk Management`,
    imageCaption: `Risk management is not optional -- it is the foundation that separates professional traders from gamblers`,
    intro: `Risk management is the single most important skill in trading. You can have the best ICT strategy, the perfect entry model, and flawless market structure analysis -- but without proper risk management, you will eventually blow your account. This lesson covers the core principles that every ICT trader must master before placing a single trade.`,
    sections: [
      {
        title: `Why Risk Management Matters More Than Strategy`,
        content: `Risk management determines how a strategy's outcomes affect account survival. Fixed rules and numerical examples are useful only when their assumptions are stated; unsupported percentages are not a substitute for calculation.\n\nRISK-OF-RUIN ESTIMATES:\nThere is no universal probability of ruin based only on a stated risk percentage and win rate. Any estimate depends on starting capital, win/loss distribution, sequence of outcomes, costs, slippage, stake size and the definition of ruin. A simulation should state its assumptions and use representative results.\n\nBREAK-EVEN WIN RATE:\nIf average winners are +3R and average losses are -1R, the gross break-even win rate is 25% before costs: 0.25 × 3R offsets 0.75 × 1R. Changing risk from 1% to 5% changes the dollar size of wins and losses, but does not by itself change the break-even win rate when the payoff ratio is unchanged. Costs and different average outcomes change the calculation.\n\nTHE PSYCHOLOGICAL IMPACT:\nLosing 20% of your account requires a 25% gain just to break even. Losing 50% requires a 100% gain. The deeper the drawdown, the harder the recovery.`,
        highlight: `📌 Risk management is not about avoiding losses -- it is about ensuring that no single loss (or series of losses) can destroy your account.`,
      },
      {
        title: `The 1% Rule (And When to Break It)`,
        content: `An example risk ceiling is a personal or account policy, not a universal ICT rule. Choose a maximum planned loss that fits the account's limits, the tested strategy and your risk capacity.\n\nCALCULATING POSITION SIZE (HYPOTHETICAL EXAMPLE):\nAccount balance: $10,000\nChosen planned risk cap: 1% = $100\nStop distance: 20 pips\nAssumed pip value: $10 per pip for one standard lot\nPosition size: $100 / (20 pips × $10 per pip) = 0.5 standard lots (equivalent to 5 mini lots) before costs and slippage.\n\nActual position sizing depends on contract specifications, account currency, pip/tick value, stop distance, commissions, spread and expected slippage. Smaller risk allocations may be appropriate while testing or in volatile conditions, but a past win rate or a winning streak alone does not justify increasing size. Set daily or weekly pause limits in advance and review aggregate exposure across correlated positions.`,
        highlight: `📌 Start with a small risk allocation that you can afford to lose and verify in simulation. Do not increase risk after an arbitrary streak of profitable trades; use a representative sample and written risk limits.`,
      },
      {
        title: `Risk-to-Reward Ratio (R:R)`,
        content: `The risk-to-reward ratio compares the planned loss at the stop with the planned gain at the target. There is no universal minimum ratio for every strategy; a high ratio does not automatically compensate for a poor win rate, costs or inconsistent execution.\n\nGROSS BREAK-EVEN EXAMPLES (BEFORE COSTS):\n• 1:1 planned payoff: 50% win rate to break even.\n• 1:2 planned payoff: about 33.3% win rate to break even.\n• 1:3 planned payoff: 25% win rate to break even.\n• 1:5 planned payoff: about 16.7% win rate to break even.\n\nThese figures assume fixed average wins/losses at the stated ratio, with no fees, slippage or partial exits. Real results can differ. OBs, FVGs, sweeps and dealing ranges can be used to define entry, stop and target hypotheses, but they do not ensure tight stops or profitable high-R:R trades.\n\nHYPOTHETICAL EXAMPLE:\nIf planned risk is $100 and the target yields +4R when reached, the planned ratio is 1:4. A sequence with one +4R winner and three -1R losses nets +1R before trading costs; that is arithmetic, not evidence that a setup will produce those outcomes.`,
        highlight: `📌 No single risk-to-reward ratio suits every setup. Evaluate win rate, costs, average win and loss, and drawdown for the full strategy instead of rejecting all trades below 3R.`,
      },
      {
        title: `Stop Loss Placement for ICT Traders`,
        content: `Where you place your stop loss is as important as where you enter. A poorly placed stop can expose a trade to ordinary volatility, spread, slippage or a stop that does not match the setup. A chart alone cannot establish that an algorithm deliberately targeted the stop.\n\nTHE GOLDEN RULE:\nYour stop loss should be placed at a level where, if hit, your trade idea is proven wrong. Not at a random number. Not at a fixed pip distance. At the structural level that invalidates your setup.\n\nSTOP LOSS RULES BY SETUP:\n\nOrder Block Entry:\n- Bullish OB: Stop below the OB low (plus 2-3 pips buffer)\n- Bearish OB: Stop above the OB high (plus 2-3 pips buffer)\n\nFair Value Gap Entry:\n- Bullish FVG: Stop below the FVG (the low of the first candle)\n- Bearish FVG: Stop above the FVG (the high of the first candle)\n\nLiquidity Sweep Entry:\n- Stop below the sweep low (bullish) or above the sweep high (bearish)\n\nBUFFER AND EXECUTION:\nIf a buffer is part of your tested setup, define it using the instrument, volatility and execution conditions. A fixed 2-5 pip buffer does not suit every market; more distance can increase planned loss unless position size is adjusted. A buffer cannot guarantee that a trade will avoid a stop-out or that a setup is still valid.`,
        highlight: `📌 Your stop loss is your 'I am wrong' price. If price hits your stop, you should be glad -- it saved you from a bigger loss. Never move your stop loss further away after entering a trade.`,
      },
      {
        title: `Daily, Weekly & Monthly Loss Limits`,
        content: `Some traders set daily, weekly or monthly loss limits as a circuit breaker. Choose thresholds in advance to fit your account constraints and strategy; there is no universal 3% daily, 6% weekly or 10% monthly rule.\n\nA PAUSE RULE:\nIf a pre-set loss limit or repeated rule violation is reached, pause new entries and review the data before resuming. Three consecutive losses alone do not prove that your bias is wrong or the market has changed; check whether each trade followed the model and whether results fit its expected distribution. Likewise, a winning streak by itself is not a reason to increase or cut risk. Avoid changing size based only on short-term outcomes.`,
        highlight: `📌 The market will be here tomorrow. Your account might not be. Protect your capital above all else.`,
      },
    ],
    quiz: [
      { q: `What is the maximum recommended risk per trade for a beginner ICT trader?`, options: ['5%', '2%', '1%', '0.5%'], answer: 3 },
      { q: `Which evidence should inform a strategy’s minimum risk-to-reward filter?`, options: ['An arbitrary fixed ratio', 'A common social-media recommendation', 'Tested win rate, execution costs, average win/loss and drawdown', 'A grade such as A+ on its own'], answer: 2 },
      { q: `Where should you place your stop loss on a bullish Order Block entry?`, options: ['10 pips below entry', 'Below the OB low', 'At the previous day low', 'At breakeven'], answer: 1 },
      { q: `What should you do after 3 consecutive losing trades?`, options: ['Increase position size to recover', 'Stop trading for the day', 'Switch to a different strategy', 'Trade a different pair'], answer: 1 },
    ],
    nextLesson: { id: 30, title: `Advanced Risk Management` },
    prevLesson: { id: 28, title: `Backtesting & Model Development` },
  },

  30: {
    id: 30,
    title: `Advanced Risk Management & Position Sizing`,
    subtitle: `How Professional ICT Traders Protect Capital in All Market Conditions`,
    level: `Intermediate`,
    duration: `22 min read`,
    category: `Risk Management`,
    imageCaption: `Professional traders treat risk management as a science, not an afterthought`,
    intro: `Once you understand the basics of the 1% rule and stop loss placement, it is time to master advanced risk management techniques. This lesson covers position sizing formulas, correlation risk, drawdown recovery strategies, and the psychological aspects of managing money like a professional ICT trader.`,
    sections: [
      {
        title: `The Kelly Criterion for ICT Traders`,
        content: `The Kelly formula estimates a growth-maximizing fraction only when its inputs accurately describe a repeatable process. For a simplified binary-outcome model, f = (b × p − q) / b, where b is the average net win per unit lost, p is win probability and q = 1 − p. Real trading involves changing odds, costs, slippage and non-identical outcomes, so the estimate can be very wrong.\n\nILLUSTRATIVE CALCULATION:\nWith p = 0.45, q = 0.55 and average win b = 3R versus a 1R loss, f = (3 × 0.45 − 0.55) / 3 = 0.80 / 3 ≈ 26.7%. This is a theoretical full-Kelly estimate under those assumptions, not a recommendation to risk 26.7% of an account.\n\nFractional Kelly scales the estimate down (for example, one-quarter or one-sixteenth), but a fraction is not automatically safe. Estimation error, small or unrepresentative samples, correlation and drawdowns can make Kelly sizing unsuitable. Do not choose a risk percentage merely because a formula returns it; compare conservative fixed-risk approaches and account restrictions, and validate assumptions before any live use.`,
        highlight: `📌 Kelly sizing depends on reliable estimates of edge and payoff, which are easy to misestimate. Fractional Kelly reduces exposure versus full Kelly but is not a guarantee of sustainability; simpler fixed-risk limits may be more appropriate for many traders.`,
      },
      {
        title: `Correlation Risk: The Hidden Account Killer`,
        content: `Correlation between instruments changes with timeframe, market regime and measurement period. Instruments that have often moved together can diverge, and seemingly unrelated markets can become correlated during stress.\n\nDo not convert a correlation coefficient directly into a portfolio-risk multiplier. A 1% planned loss on each of two positions remains two separately defined stop risks, while the likelihood and timing of those losses may be related. Assess aggregate exposure with volatility, stop distances, gap risk, account currency and plausible joint-loss scenarios instead of assuming a fixed correlation or that both positions will stop out together.\n\nPortfolio rules should fit the strategy and account constraints. Review rolling relationships and stress scenarios relevant to the instruments and period you trade; no universal limit on the number of correlated positions or standard reduced risk percentage is safe for every account.`,
        highlight: `📌 Correlated positions can concentrate risk because losses may occur together. Estimate portfolio-level exposure from the instruments and position sizes; do not assume a fixed risk multiplier or that markets are uncorrelated.`,
      },
      {
        title: `Drawdown Recovery Strategies`,
        content: `Drawdown is the decline from an account's prior peak to a later trough. Prepare a response plan before losses occur, using thresholds appropriate to your strategy, account constraints and personal risk capacity.\n\nEXAMPLE OF A REVIEW PROCESS (NOT UNIVERSAL THRESHOLDS):\n• At a predefined warning level, check whether losses fit the tested distribution and whether you followed the rules.\n• At a larger predefined drawdown, consider reducing risk, pausing new entries or switching to simulation while reviewing the data.\n• Before resuming, check for execution mistakes, changed market conditions, data-quality issues and evidence that the strategy's edge may have weakened.\n\nTHE RECOVERY FORMULA:\nA 20% drawdown requires a 25% gain to return to the starting balance.\nA 50% drawdown requires a 100% gain to return to the starting balance.\n\nThese figures illustrate the arithmetic, not a forecast or a recommended drawdown allowance. Define stop and review rules in advance rather than increasing risk to recover losses.`,
        highlight: `📌 Recovery math is asymmetric: larger drawdowns require disproportionately larger gains to recover. Choose a drawdown limit based on strategy volatility and risk capacity; 10% can be a personal policy, not a universal threshold.`,
      },
      {
        title: `Position Sizing for Different Account Sizes`,
        content: `Account size alone does not determine the right percentage risk, order size, trade frequency or return target. Position size should follow the stop distance, instrument specifications, planned account risk and aggregate exposure. Smaller accounts may face practical minimum-size constraints; larger accounts may face liquidity, slippage or execution constraints.\n\nHYPOTHETICAL COMPOUNDING MATH:\nIf $10,000 grew by a constant 3% every month, before costs, taxes and withdrawals, the arithmetic would be approximately:\nYear 1: $14,258\nYear 2: $20,328\nYear 3: $29,004\nYear 5: $59,092\nYear 10: $348,912\n\nThis is an illustration, not an achievable or expected return target. Trading returns vary and include losing periods; a constant positive monthly return is not guaranteed. Evaluate performance using a representative record that includes costs, drawdowns and out-of-sample results.`,
        highlight: `📌 Hypothetical compounding illustrates arithmetic, not a forecast. Recurring positive monthly returns are not guaranteed, and actual trading performance includes costs, drawdowns and possible losses.`,
      },
      {
        title: `The Psychology of Risk`,
        content: `Risk management combines sizing, execution, strategy design and behavior; a fixed 80/20 split is not a universal measurement.\n\nTHE FEAR OF LOSS:\nPeople may react asymmetrically to losses and gains, but the size of the effect varies by study and context; avoid treating a single multiplier as universal. This causes:\n- Moving stop losses to avoid realizing a loss\n- Closing winning trades too early to secure profits\n- Revenge trading after losses\n- Avoiding valid setups due to recent losses\n\nTHE GREED TRAP:\nAfter a winning streak, traders often:\n- Increase position size (I am on fire!)\n- Take lower-quality setups\n- Remove stop losses\n\nEXAMPLE: A PRE-TRADE CHECKLIST:\nBefore entering, ask whether the setup meets your written criteria, whether the stop and target are defined, whether expected payoff is supported by testing, and whether the planned risk fits your limits. Thresholds such as a 1:3 risk-to-reward ratio or 1% risk may be used in a specific personal model, but they are not universal requirements; define subjective grades such as A+ in observable terms before testing. If a required rule is not met, follow the plan you set in advance.`,
        highlight: `📌 The best trade is often the one you do not take. Missing a trade costs nothing. Taking a bad trade costs money, confidence, and account equity.`,
      },
    ],
    quiz: [
      { q: `Which inputs matter most when calculating position risk?`, options: ['Account balance alone', 'A fixed percentage recommended for every account', 'The planned risk cap, stop distance and instrument value, plus costs', 'The setup grade alone'], answer: 2 },
      { q: `What should you consider when holding EURUSD and GBPUSD at the same time?`, options: ['Treat them as unrelated because they are different pairs', 'Consider their correlation and combined exposure before choosing position sizes', 'Automatically risk 0.5% on each pair', 'Increase total risk to 2%'], answer: 1 },
      { q: `How much gain is needed to recover from a 30% drawdown?`, options: ['30%', '43%', '50%', '60%'], answer: 1 },
      { q: `What should you do during a 10-20% drawdown?`, options: ['Increase risk to recover faster', 'Stop trading and review', 'Trade more pairs to diversify', 'Switch to a new strategy'], answer: 1 },
    ],
    nextLesson: { id: 201, title: `ICT for NAS100 & US30` },
    prevLesson: { id: 29, title: `Risk Management Fundamentals` },
  },

  201: {
    id: 201,
    title: `ICT for NAS100 & US30 (Indices)`,
    subtitle: `How to Apply Smart Money Concepts to Stock Indices`,
    level: `Intermediate`,
    duration: `28 min read`,
    category: `Indices`,
    imageCaption: `Indices move differently than forex -- understand the nuances to profit consistently`,
    intro: `NAS100 and US30 are popular instruments among ICT traders, but they do not inherently offer cleaner structure, more predictable institutional behavior, or greater profitability than FX. Index futures, CFDs and cash-index products have different trading hours, costs and gap risks. This lesson covers practical features to define and test for the product you actually trade.`,
    sections: [
      {
        title: `Why Indices Are Better for ICT`,
        content: `Rather than assuming indices are better, compare the product you trade with your FX alternatives. Index cash-session hours, futures hours, CFD hours, spreads, commissions, volatility and overnight financing can differ materially. Indices can have overnight sessions or gaps depending on the product and broker. Compare the same entry and exit definitions, express outcomes in risk units, and account for fees and slippage; no account-size threshold by itself makes one market more profitable.`,
        highlight: `📌 Indices offer cleaner ICT structure, larger moves, and predictable sessions. Ideal for traders with $5K+ accounts.`,
      },
      {
        title: `NAS100 vs US30: Key Differences`,
        content: `Both indices follow ICT principles but have distinct personalities.\n\nNAS100 (Nasdaq-100):\n- Tech-heavy (Apple, Microsoft, Tesla, Nvidia)\n- More volatile -- 200-500 point daily ranges\n- Reacts strongly to tech earnings and Fed policy\n- Cleaner FVGs and Order Blocks\n- Best for: Scalping, day trading, aggressive ICT strategies\n- Killzone: 9:30-10:30AM New York time and 2:00-3:00PM New York time\n\nUS30 (Dow Jones):\n- Industrial-heavy (Boeing, Goldman Sachs)\n- Less volatile -- 100-300 point daily ranges\n- More stable structure, easier for beginners\n- Best for: Swing trading, conservative ICT strategies\n- Killzone: 9:30-10:30AM New York time and 1:00-2:00PM New York time\n\nWhich Should You Trade?\n- Beginners: Start with US30 (slower, more forgiving)\n- Experienced: Trade NAS100 (larger moves, more profit)\n- Advanced: Trade both using SMT divergence between them\n\nCorrelation Note: NAS100 and US30 are 85%+ correlated. Use SMT divergence to choose the stronger index. Never risk 1% on both simultaneously.`,
        highlight: `📌 NAS100 = volatile, tech-driven, larger profits. US30 = stable, industrial, beginner-friendly.`,
      },
      {
        title: `The Index Opening Range Strategy`,
        content: `The first 30 minutes after the U.S. cash-equity open is a time window some index traders study. A range break may continue, fail, or remain unresolved; the window itself does not establish a high-probability ICT setup. Define the opening range from a consistent data source and New York-time clock, specify entry and invalidation rules, and compare results with other windows, including news days, losing breakouts, costs and slippage.`,
        highlight: `📌 The 9:30–10:00 AM New York opening range is a commonly studied period for indices. Whether a setup in this window has an edge must be tested against a defined baseline.`,
      },
      {
        title: `Index-Specific Risk Management`,
        content: `Indices require stricter risk management than forex due to larger moves and gap risk.\n\nPOSITION SIZING:\nFormula: Risk $ / (Stop distance in points x Point value)\n\nNAS100 Example:\n- Account: $20,000, Risk: 1% = $200\n- Stop: 100 points, Point value: $1 per point (micro contract)\n- Position size: $200 / (100 x $1) = 2 micro contracts\n\nUS30 Example:\n- Account: $20,000, Risk: 1% = $200\n- Stop: 80 points, Point value: $0.50 per point (micro)\n- Position size: $200 / (80 x $0.50) = 5 micro contracts\n\nGAP RISK MANAGEMENT:\n1. Never hold positions overnight unless you accept gap risk\n2. Reduce position size by 50% before earnings season\n3. Close all positions before 3-day weekends\n\nVOLATILITY ADJUSTMENT:\nDuring high volatility (earnings, Fed days):\n- Reduce risk to 0.5% per trade, widen stops by 50%\n\nDuring low volatility (holiday weeks):\n- Reduce risk to 0.5%, consider not trading at all`,
        highlight: `📌 Size index positions from contract specifications, stop distance, volatility and total account risk. No universal percentage reduction versus forex applies across brokers and instruments.`,
      },
    ],
    quiz: [
      { q: `Which index is more volatile?`, options: ['US30', 'NAS100', 'Both the same', 'Depends on the day'], answer: 1 },
      { q: `Which U.S. session period is commonly examined in some index strategies?`, options: ['3 AM New York time', '9:30 AM New York time', '2 PM New York time', '8 PM New York time'], answer: 1 },
      { q: `How correlated are NAS100 and US30?`, options: ['50%', '70%', '85%+', '30%'], answer: 2 },
      { q: `What should be planned before an earnings or event-risk period?`, options: ['Increase size', 'Apply a predefined event-risk plan based on exposure and model rules', 'Trade all instruments normally', 'Only trade NAS100'], answer: 1 },
    ],
    nextLesson: { id: 202, title: `ICT for Gold (XAU/USD)` },
    prevLesson: { id: 30, title: `Advanced Risk Management` },
  },

  202: {
    id: 202,
    title: `ICT for Gold (XAU/USD)`,
    subtitle: `How Smart Money Moves Gold and How to Trade It`,
    level: `Intermediate`,
    duration: `24 min read`,
    category: `Commodities`,
    imageCaption: `Gold follows ICT principles but with unique characteristics driven by safe-haven flows`,
    intro: `Gold (XAU/USD) is the ultimate safe-haven asset. When markets crash, gold rises. When inflation fears spike, gold rises. Understanding how institutional money flows into gold is essential for ICT traders who want to diversify beyond forex and indices.`,
    sections: [
      {
        title: `What Drives Gold Prices`,
        content: `Gold prices may respond to real yields, the U.S. dollar, inflation expectations, central-bank activity, risk sentiment and other macroeconomic factors. These relationships are not fixed: they can weaken, change sign over short periods, or be overwhelmed by other news. A single correlation figure should not be presented as constant. ICT traders may overlay structure and chart features on this context, but a catalyst does not guarantee a direction.`,
        highlight: `📌 Gold is driven by safe-haven flows, USD inverse correlation, inflation, and central bank buying. More predictable than forex.`,
      },
      {
        title: `Gold-Specific ICT Adaptations`,
        content: `Gold's range and spread can change sharply around data releases and market transitions. Stop distances, FVG widths and session activity should be measured from the product and timeframe you trade rather than set from universal pip ranges. Broker quote conventions also affect what a pip means for XAU/USD. The London fix and U.S. data windows are potential times to study, not guarantees of predictable volatility or direction.`,
        highlight: `📌 Gold needs wider stops, respects Asian session, and has massive FVGs. London fix at 10AM GMT is the key time.`,
      },
      {
        title: `The Gold Safe-Haven Setup`,
        content: `This is one gold setup hypothesis discussed in ICT-style trading. Its frequency and performance depend on exact definitions and market conditions, so do not treat it as the highest-probability setup.\n\nCONTEXT (Daily/4H):\n- Stock market is selling off (S&P 500 down 1%+) OR\n- Geopolitical tensions are rising OR\n- Inflation data surprised to the upside\n- DXY is weakening (below key support)\n\nSTRUCTURE (1H/4H):\n- Gold is in bullish market structure (HH/HL)\n- Price is in discount zone of daily dealing range\n- BSL is visible above recent highs\n- SSL has been swept recently\n\nENTRY (15M/5M):\n- Wait for price to return to a bullish PD array\n- Enter during London or NY killzone\n- Stop below the PD array (usually 15-25 pips)\n- Target the nearest BSL (usually 3-5R)\n\nEXAMPLE:\n- Entry: $1,920 at daily OB\n- Stop: $1,895 (25 pips below FVG)\n- Target 1: $1,970 (BSL -- 2R)\n- Target 2: $2,000 (next BSL -- 3.2R)\n\nDo not assume a fixed annual frequency or return multiple. Record every qualifying setup, including losses and missed or invalidated signals, before estimating performance.`,
        highlight: `📌 Treat the safe-haven pattern as a hypothesis to test; do not assume a fixed number of occurrences per year or a guaranteed R multiple.`,
      },
    ],
    quiz: [
      { q: `What is gold inversely correlated with?`, options: ['EURUSD', 'USD (DXY)', 'Oil', 'Stocks'], answer: 1 },
      { q: `When is the London Gold Fix?`, options: ['8AM GMT', '10AM GMT', '12PM GMT', '2PM GMT'], answer: 1 },
      { q: `How wide are typical gold FVGs?`, options: ['1-2 pips', '5-10 pips', '20-30 pips', '50+ pips'], answer: 1 },
      { q: `How should gold be approached around a safe-haven event?`, options: ['Assume London alone drives moves', 'Assume New York alone drives moves', 'Assume the Asian session determines direction', 'Treat the reaction as uncertain and account for event, liquidity and volatility conditions'], answer: 3 },
    ],
    nextLesson: { id: 301, title: `ICT for Crypto: Bitcoin & Ethereum` },
    prevLesson: { id: 201, title: `ICT for NAS100 & US30` },
  },

  301: {
    id: 301,
    title: `ICT for Crypto: Bitcoin & Ethereum`,
    subtitle: `Applying Smart Money Concepts to Cryptocurrency Markets`,
    level: `Intermediate`,
    duration: `22 min read`,
    category: `Crypto`,
    imageCaption: `Crypto markets run 24/7 -- ICT concepts work even better without session boundaries`,
    intro: `Cryptocurrency markets never close. They run 24/7, 365 days a year. This creates unique opportunities for ICT traders -- no killzone limitations, no session gaps, and massive volatility. But crypto also has unique risks: exchange hacks, regulatory news, and extreme leverage. This module teaches you how to apply ICT safely in crypto markets.`,
    sections: [
      {
        title: `Why ICT Works Even Better in Crypto`,
        content: `Crypto markets trade around the clock, but liquidity, spread, volatility and price structure vary by asset, exchange and period. The presence of large holders or retail sentiment cannot be inferred reliably from a candlestick pattern alone, and 24/7 trading does not make ICT setups inherently cleaner or more profitable. Define the venue, pair, time zone, fees, funding costs, stop rule and exit conditions, then compare with a baseline.`,
        highlight: `📌 Crypto trades 24/7, but structure, costs and volatility vary. Size positions to a predefined risk limit and test session filters before relying on them.`,
      },
      {
        title: `Adapting ICT Killzones for Crypto`,
        content: `Some traders examine whether crypto activity changes around traditional Asian, London and New York hours. Because crypto trades 24/7 and venues differ, those session labels should be tested rather than treated as universal killzones. Use UTC or a clearly defined local time zone, handle daylight-saving changes, and compare the same setup across sessions. Avoid assigning a move to a specific country's institutional activity or assuming that the Asian session sets the day's direction.`,
        highlight: `📌 Crypto killzones: Asian (8PM-12AM), London (3-5AM), NY (9:30AM-4PM). Trade when YOUR schedule allows.`,
      },
      {
        title: `Crypto-Specific Risk Management`,
        content: `Crypto risk management is MORE important than forex due to extreme volatility.\n\nLEVERAGE RULES:\n- NEVER use more than 5x leverage for ICT trading\n- 3x leverage is recommended for beginners\n- 10x+ leverage is gambling, not trading\n- Remember: 10x leverage + 10% move = 100% gain OR 100% loss\n\nSTOP LOSS RULES:\n- Bitcoin: 3-5% stop minimum\n- Ethereum: 4-6% stop minimum\n- Altcoins: 8-12% stop minimum (more volatile)\n- Never use fixed pip stops -- use percentage stops\n\nEXCHANGE RISK:\n- Use reputable exchanges (Binance, Coinbase, Kraken)\n- Never keep more than 50% of capital on an exchange\n- Use hardware wallets for long-term holds\n- Enable 2FA on all accounts\n- Diversify across 2-3 exchanges\n\nThe Golden Rule for Crypto: If a 20% move against you would cause emotional distress, your position size is too large. Size down until you are comfortable with the worst-case scenario.`,
        highlight: `📌 Crypto volatility and liquidity vary by asset and venue. Use position sizing and invalidation rules suited to the specific market; fixed stop-width bands or a blanket leverage cap are not universally suitable. Consider counterparty and custody risk when choosing where to hold assets.`,
      },
      {
        title: `The Bitcoin Halving Cycle Strategy`,
        content: `Bitcoin halvings are scheduled by protocol at intervals measured in blocks; their price implications are uncertain and should not be treated as a predictable macro signal.\n\nThe Halving Cycle:\n\n1. PRE-HALVING (12-18 months before)\n- Bitcoin accumulates in a range\n- Smart money quietly builds positions\n- ICT play: Buy discount zones, hold for 6+ months\n\n2. HALVING EVENT (April 2024, next: 2028)\n- Mining rewards cut in half\n- Supply shock begins\n- ICT play: Avoid trading 1 week before/after. Wait for structure to form.\n\n3. POST-HALVING BULL RUN (6-18 months after)\n- Supply reduction drives price up\n- Retail FOMO kicks in\n- ICT play: Trade bullish setups in premium with trailing stops\n\n4. BEAR MARKET (12-24 months after peak)\n- Price drops 70-85% from peak\n- ICT play: Short premium zones. Wait for accumulation before buying.\n\nA small number of past cycles does not establish a repeatable future pattern or guarantee profitability. Treat any cycle-based idea as a hypothesis and test it against alternative explanations.`,
        highlight: `📌 Bitcoin halving cycle: Accumulation -> Halving -> Bull Run -> Bear Market. Trade each phase with different ICT strategies.`,
      },
    ],
    quiz: [
      { q: `What is the maximum recommended leverage for crypto ICT?`, options: ['10x', '5x', '20x', '50x'], answer: 1 },
      { q: `When does Bitcoin halving occur?`, options: ['Every year', 'Every 2 years', 'Every 4 years', 'Every 6 years'], answer: 2 },
      { q: `What is the best session for crypto swing entries?`, options: ['London', 'NY', 'Asian', 'Weekend'], answer: 2 },
      { q: `What percentage stop is recommended for Bitcoin?`, options: ['1-2%', '3-5%', '8-10%', '15-20%'], answer: 1 },
    ],
    nextLesson: null,
    prevLesson: { id: 202, title: `ICT for Gold (XAU/USD)` },
  },


  101: {
    id: 101,
    title: `Risk Management: Core Principles`,
    subtitle: `Why Risk Management is More Important Than Your Strategy`,
    level: `Beginner`,
    duration: `18 min read`,
    category: `Risk Management`,
    imageCaption: `Professional traders focus on protecting capital first, profits second`,
    intro: `Risk management is the foundation of every successful trading career. Without proper risk controls, even the best ICT strategy will eventually blow your account. This lesson teaches you the non-negotiable rules that separate profitable traders from those who fail.`,
    sections: [
      {
        title: `The #1 Rule: Protect Your Capital`,
        content: `The single most important rule in trading is this: never risk more than you can afford to lose on a single trade. Professional traders treat their trading account like a business -- they protect the capital at all costs.\n\nHere is why most traders fail:\n\n1. They risk 5-10% per trade, thinking they need to go big to make money\n2. They have no stop loss, hoping the market will come back\n3. They revenge trade after losses, doubling position sizes\n4. They trade without a plan, making emotional decisions\n\nThe mathematics of drawdown are brutal:\n\n- Risk 10% per trade = 10 consecutive losses = account destroyed\n- Risk 5% per trade = 10 consecutive losses = 60% drawdown (need 150% gain to recover)\n- Risk 2% per trade = 10 consecutive losses = 18% drawdown (need 22% gain to recover)\n- Risk 1% per trade = 10 consecutive losses = 9.5% drawdown (need 10.5% gain to recover)\n\nThe difference between 2% and 5% risk is the difference between a recoverable setback and account destruction.`,
        highlight: `📌 Per-trade risk limits vary by strategy and account constraints. A percentage alone does not make a trader professional; consistent execution, transparent performance data and bounded drawdown matter.`,
      },
      {
        title: `Position Sizing: The Formula`,
        content: `Position sizing is how you calculate exactly how many lots to trade based on your stop loss distance and account size.\n\nThe Formula:\nPosition Size = (Account Risk $) / (Stop Loss in Pips x Pip Value)\n\nExample:\n- Account: $10,000\n- Risk per trade: 1% = $100\n- Stop loss: 20 pips on EURUSD\n- Pip value: $10 per standard lot\n\nPosition Size = $100 / (20 x $10) = 0.5 standard lots = 5 mini lots\n\nNever guess your position size. Always calculate it before entering the trade. Most trading platforms have position size calculators -- use them every single time.`,
        highlight: `📌 Calculate position size BEFORE every trade. Never trade based on feeling.`,
      },
      {
        title: `The Risk-Reward Ratio (R:R)`,
        content: `The risk-reward ratio measures planned gain relative to planned loss. No single minimum ratio fits every strategy; the useful filter depends on the observed win rate, average win/loss, costs and drawdown.\n\nGROSS BREAK-EVEN EXAMPLES (BEFORE COSTS):\n• With +1R wins and -1R losses, the gross break-even win rate is 50%.\n• With +2R wins and -1R losses, it is about 33.3%.\n• With +3R wins and -1R losses, it is 25%.\n\nThese are arithmetic examples assuming the stated average outcomes occur consistently; commissions, spread, slippage, partial exits and variation in realized R change the required win rate. Select and test the R:R filter against the full strategy rather than treating 1:3 or 1:2 as a universal gate.`,
        highlight: `📌 Choose an acceptable risk-to-reward profile from tested win rate, execution costs, average win and loss, and drawdown. Do not assign a ratio solely from a subjective A+ label.`,
      },
      {
        title: `Setting Stop Losses Like a Pro`,
        content: `Your stop loss is your insurance policy. It is not a suggestion -- it is a hard rule.\n\nWhere to Place Stops (ICT Method):\n1. Beyond the nearest PD Array (Order Block, FVG, Breaker)\n2. Above or below the inducement level (not the swing high or low)\n3. Beyond the dealing range equilibrium for swing trades\n4. At the invalidation point of your setup -- where your thesis is proven wrong\n\nCommon Stop Loss Mistakes:\n- Placing stops at obvious round numbers (retail traders cluster here)\n- Using a fixed 20-pip stop for every trade (ignores market structure)\n- Moving stops further away when price approaches (emotional decision)\n- Removing stops entirely just this once (account killer)\n\nThe Golden Rule: Your stop loss should be placed at the technical invalidation of your setup. If you need a 50-pip stop for your setup to be valid, use 50 pips. Never force a stop to fit a predetermined risk amount -- adjust your position size instead.`,
        highlight: `📌 Place stops at technical invalidation, not at random distances. Adjust position size, not stop distance.`,
      },
      {
        title: `Daily, Weekly & Monthly Loss Limits`,
        content: `Some traders use circuit breakers to stop new entries after a pre-defined level of losses or repeated rule violations. Daily, weekly and monthly thresholds are personal or account-policy choices, not universal recommendations.\n\nWhen a limit is reached, follow the written review procedure: pause new risk, assess open positions according to the plan, review execution and costs, and resume only when your criteria are met. Three consecutive losses do not prove the bias is wrong or that market conditions have changed; inspect the trades against the model and compare with expected variance before deciding what to change.`,
        highlight: `📌 A daily stop or pause after consecutive losses can help limit uncontrolled trading, but its threshold should fit your strategy and account rather than be treated as universal.`,
      },
    ],
    quiz: [
      { q: `What is the maximum recommended risk per trade?`, options: ['5%', '2%', '10%', '1%'], answer: 1 },
      { q: `What is the minimum acceptable Risk-Reward ratio for an ICT setup?`, options: ['1:1', '1:2', '1:3', '1:5'], answer: 2 },
      { q: `What should you do after 3 consecutive losses?`, options: ['Increase position size', 'Stop trading for the day', 'Switch to a different strategy', 'Trade a different pair'], answer: 1 },
      { q: `Where should you place your stop loss?`, options: ['At a round number', 'At technical invalidation', '20 pips away always', 'Wherever you feel comfortable'], answer: 1 },
    ],
    nextLesson: { id: 102, title: `Advanced Position Sizing & Portfolio Heat` },
    prevLesson: { id: 30, title: `Advanced Risk Management` },
  },

  102: {
    id: 102,
    title: `Advanced Position Sizing & Portfolio Heat`,
    subtitle: `Managing Multiple Positions and Correlated Risk`,
    level: `Intermediate`,
    duration: `22 min read`,
    category: `Risk Management`,
    imageCaption: `Portfolio heat measures your total market exposure at any given moment`,
    intro: `Once you master single-trade risk management, the next level is managing multiple positions simultaneously. This lesson covers portfolio heat, correlated pairs, and advanced position sizing techniques used by professional ICT traders.`,
    sections: [
      {
        title: `Portfolio Heat: Total Account Exposure`,
        content: `Portfolio heat is the total percentage of your account at risk across ALL open positions at any moment.\n\nThe Rule: Never exceed 6% portfolio heat. This means if you have 3 positions open each risking 2%, your total heat is 6% -- the maximum.\n\nWhy 6%?\n- 6% heat = 5 consecutive losing days of max heat = 30% drawdown (recoverable)\n- 10% heat = 5 consecutive losing days = 50% drawdown (very difficult to recover)\n- 15% heat = 5 consecutive losing days = 75% drawdown (account essentially destroyed)\n\nPortfolio Heat Calculation:\nPosition 1: 2% risk\nPosition 2: 1.5% risk\nPosition 3: 2% risk\nTotal Heat: 5.5% (Under 6% limit)\n\nIf you want to add Position 4, you must reduce risk on existing positions or wait for one to close.`,
        highlight: `📌 Track aggregate open-position risk, correlations and gap risk. Set an exposure ceiling that fits your account and strategy; a fixed 6% figure is not suitable for everyone.`,
      },
      {
        title: `Correlated Pairs: Hidden Risk`,
        content: `Trading multiple correlated pairs simultaneously increases your risk without you realizing it.\n\nHighly Correlated Pairs (Move Together):\n- EURUSD & GBPUSD (90%+ correlation)\n- AUDUSD & NZDUSD (85%+ correlation)\n- US30 & NAS100 (80%+ correlation)\n\nThe Danger: If you take 2% risk on EURUSD and 2% risk on GBPUSD, your effective risk is nearly 4% because both pairs will likely move in the same direction.\n\nThe Solution:\n1. Only trade one pair from each correlation group at a time\n2. If trading correlated pairs, halve the risk on each (1% + 1% = 2% effective)\n3. Use SMT divergence to confirm which pair is leading\n4. Diversify across uncorrelated markets (forex + indices + commodities)\n\nICT traders use correlated pairs for confirmation, not for doubling exposure.`,
        highlight: `📌 Trading EURUSD + GBPUSD simultaneously = nearly double risk. Treat correlated pairs as one position.`,
      },
      {
        title: `Scaling In and Out of Positions`,
        content: `Scaling is the art of adding to winning positions or reducing losing ones -- done correctly, it amplifies profits while protecting capital.\n\nScaling INTO Winners (Pyramiding):\n1. Enter initial position at 1% risk\n2. Move stop to breakeven when price reaches 1:1 R:R\n3. Add second position at 0.5% risk when new setup forms in profit direction\n4. Trail stops on all positions to lock in profits\n\nRules for Scaling In:\n- Only add to winners, never losers\n- Each new position must have its own stop loss\n- Total heat must stay under 6%\n- Move stops to breakeven before adding\n\nScaling OUT of Positions (Partial Closes):\n1. Close 50% at 1:2 R:R (covers risk, guarantees profit)\n2. Move stop to breakeven on remaining 50%\n3. Close 25% at 1:3 R:R\n4. Let final 25% run with trailing stop`,
        highlight: `📌 Scaling, partial exits and trailing stops are strategy choices. Define them before testing and compare the results; do not assume one management sequence fits all instruments.`,
      },
      {
        title: `The Kelly Criterion for Optimal Risk`,
        content: `The Kelly Criterion is one model for estimating a growth-maximizing fraction when the return distribution and edge are known accurately. Its output is extremely sensitive to estimation error and may be inappropriate when outcomes are nonstationary, correlated or poorly measured.\n\nFORMULA FOR A SIMPLIFIED TWO-OUTCOME MODEL:\nf = (p × b − q) / b, where p is the win probability, q = 1 − p, and b is the average net win measured in units of the average loss.\n\nHYPOTHETICAL EXAMPLE:\nWith p = 0.40, q = 0.60, average win = 3R and average loss = 1R, f = (0.40 × 3 − 0.60) / 3 = (1.20 − 0.60) / 3 = 0.20 or 20% full Kelly under these assumptions. This mathematical output is not a recommendation to risk 20% on a trade.\n\nFractional Kelly simply scales the estimate down, but quarter, half or other fractions are not automatically safe or suitable. Validate the inputs, account for costs and correlation, and compare with conservative fixed-risk limits; if the edge is uncertain, do not rely on Kelly output for live sizing.`,
        highlight: `📌 Full Kelly can be very sensitive to estimation error and produce large drawdowns. Fractional approaches are one option, not a universal rule; use conservative exposure limits and test assumptions carefully.`,
      },
      {
        title: `Risk Management Checklist`,
        content: `Before EVERY trade, run through this checklist. Do not deviate.\n\nPRE-TRADE CHECKLIST:\n- Identified the daily bias (bullish/bearish/neutral)\n- Found a valid PD Array in premium/discount zone\n- Confirmed killzone timing (London/NY/Asian)\n- Placed stop loss at technical invalidation\n- Calculated position size for 1-2% risk\n- Verified R:R is minimum 1:2 (preferably 1:3+)\n- Checked portfolio heat (under 6% total)\n- Checked correlated pairs (not doubling risk)\n- Set take profit targets (1:2, 1:3, 1:5)\n- Written trade plan in journal\n\nPOST-TRADE CHECKLIST:\n- Recorded entry, exit, and result in journal\n- Noted what worked and what did not\n- Identified any emotional decisions\n- Updated win rate and average R:R statistics\n- Reviewed if setup followed ICT rules perfectly\n\nThis checklist takes 30 seconds but saves accounts. Professional traders treat it as non-negotiable.`,
        highlight: `📌 A short pre-trade checklist can reduce omissions. Tailor it to observable entry, stop, target, risk and invalidation rules rather than treating a fixed duration as a measure of professionalism.`,
      },
    ],
    quiz: [
      { q: `What is the maximum recommended portfolio heat?`, options: ['3%', '6%', '10%', '15%'], answer: 1 },
      { q: `Which pairs are highly correlated?`, options: ['EURUSD & USDJPY', 'EURUSD & GBPUSD', 'AUDUSD & USDCAD', 'XAUUSD & EURUSD'], answer: 1 },
      { q: `When should a trader scale into a position?`, options: ['Whenever it is losing', 'Only when a predefined, tested rule calls for scaling', 'Immediately after the initial entry', 'Never under any strategy'], answer: 1 },
      { q: `What percentage of a position should you close at 1:2 R:R?`, options: ['25%', '50%', '75%', '100%'], answer: 1 },
    ],
    nextLesson: { id: 103, title: `The Psychology of Risk` },
    prevLesson: { id: 101, title: `Risk Management Fundamentals` },
  },

  103: {
    id: 103,
    title: `The Psychology of Risk`,
    subtitle: `Managing Trading Emotions with Observable Rules`,
    level: `Intermediate`,
    duration: `20 min read`,
    category: `Risk Management`,
    imageCaption: `Trading is 80% psychology and 20% strategy`,
    intro: `Fear, greed, frustration and overconfidence can affect trading decisions, but their impact varies by person and situation. A useful psychology process identifies observable behaviors—such as moving a stop, skipping a valid setup, or increasing size after a loss—and ties them to a written rule. Avoid unsourced percentages about the share of traders who fail or how strongly losses are felt.`,
    sections: [
      {
        title: `The Four Deadly Emotions`,
        content: `Trading discussions often group decision-making problems under fear, greed, revenge and hope. These labels can help a journal describe behavior, but they do not explain every loss and should not replace review of the setup, execution, market conditions and costs. For each trade, record whether you followed entry, stop, target and sizing rules. Separate a valid setup that loses from a process violation, and change rules only after reviewing a representative set of trades.`,
        highlight: `📌 Fear, Greed, Revenge, Hope -- the four account killers. Recognize them before they cost you money.`,
      },
      {
        title: `Cognitive Biases in Trading`,
        content: `Common decision biases include hindsight bias, confirmation bias, recency bias and loss aversion. Their effect depends on context; avoid unsupported numerical claims about how many times stronger any emotion is. Practical controls include recording a scenario before entry, saving screenshots before and after the trade, and reviewing winners and losers by the same criteria.`,
        highlight: `📌 Confirmation, Recency, Anchoring, Sunk Cost -- the four biases that distort your market read. Know them.`,
      },
      {
        title: `Building Trading Discipline`,
        content: `Discipline can be supported by a written, testable routine. The following are examples to adapt to a specific strategy, not universal requirements:\n\n1. DEFINE RULES IN ADVANCE\n• Trade only in session windows that your model explicitly uses and that you have tested.\n• Set a planned account-risk ceiling and rules for correlated open positions.\n• Do not widen a stop after entry unless a documented strategy rule explicitly permits it.\n• Define pause rules based on drawdown, repeated rule violations or execution problems.\n• If you use setup grades or confluence counts, define them in observable terms and evaluate their effect with data.\n\n2. USE A CHECKLIST\nCheck setup criteria, stop, target, risk, costs and invalidation before entry. The checklist should reduce omissions without substituting for evidence that the strategy works.\n\n3. SET PRACTICAL BOUNDARIES\nChoose a trading schedule and screen breaks that fit your life and strategy; there is no universal session-duration limit.\n\n4. REVIEW REGULARLY\nReview wins and losses by the same criteria, record execution errors and decide on one evidence-based process change at a time. Test changes separately before relying on them.`,
        highlight: `📌 Discipline is a system, not a feeling. Create rules, use checklists, set boundaries, and review weekly.`,
      },
      {
        title: `The Winning Mindset`,
        content: `Focus on process as well as outcomes. A single win or loss does not establish whether a strategy is sound; record whether you followed the rules and review performance across a representative sample.\n\nHYPOTHETICAL EXPECTANCY EXAMPLE:\nA strategy with a 40% win rate and average wins of +3R while losses average -1R has positive arithmetic expectancy before costs if those statistics persist: (0.40 × 3R) − (0.60 × 1R) = +0.60R per trade. That is an illustration, not a forecast; fees, slippage, changing conditions and estimation error can materially change results.\n\nAfter entry, follow your predefined trade-management rules rather than making impulsive changes based on each tick. Review outcomes, process quality and drawdown over time. Do not treat a fixed monthly return as a benchmark or assume compounding will occur at a constant rate.`,
        highlight: `📌 Focus on process, not outcome. Accept losses as part of the system. Think in years, not days.`,
      },
      {
        title: `Creating Your Trading Routine`,
        content: `Some traders use a repeatable routine to prepare, execute and review. Adapt this example to your own market, schedule and tested strategy.\n\nPRE-MARKET (30 minutes before your killzone):\n1. Check whether scheduled events affect the instrument you trade.\n2. Mark candidate reference levels using consistent definitions.\n3. Write a primary scenario plus alternatives and invalidation.\n4. Check planned risk, open-position exposure and possible event risk.\n5. Set alerts only where they support your predefined plan.\n\nDURING TRADING (duration suited to your strategy):\n1. Wait for the conditions in your written model.\n2. Check observable entry criteria and any required confluence rules.\n3. Calculate position size including costs and aggregate exposure.\n4. Place orders and define stop, target and invalidation according to the plan; monitor as required.\n\nPOST-MARKET (15 minutes after session):\n1. Record all trades in journal\n2. Screenshot charts of setups (winners and losers)\n3. Note any emotional decisions or rule violations\n4. Update statistics spreadsheet\n\nWEEKLY REVIEW (Sunday evening):\n1. Review all trades from the week\n2. Calculate win rate, average R:R, total P&L\n3. Identify patterns in winning and losing trades\n4. Study 5 charts where you missed opportunities`,
        highlight: `📌 The routine: Pre-market preparation -> Disciplined execution -> Post-market review -> Weekly analysis. Consistency creates consistency.`,
      },
    ],
    quiz: [
      { q: `Which emotion causes you to close winners too early?`, options: ['Greed', 'Fear', 'Revenge', 'Hope'], answer: 1 },
      { q: `What is confirmation bias?`, options: ['Seeking info that confirms your existing belief', 'Recent events affecting decisions', 'Fixating on entry price', 'Continuing losing trades'], answer: 0 },
      { q: `How should you judge your trading performance?`, options: ['By profit and loss only', 'By whether you followed your process', 'By win rate alone', 'By number of trades taken'], answer: 1 },
      { q: `What is the maximum recommended trading session length?`, options: ['1 hour', '2-3 hours', '6 hours', 'All day'], answer: 1 },
    ],
    nextLesson: { id: 29, title: `Risk Management Fundamentals (Applied)` },
    prevLesson: { id: 102, title: `Advanced Position Sizing & Portfolio Heat` },
  },
  31: {
    id: 31,
    title: `Trade Review & Journal Process`,
    subtitle: `Turn Completed Trades Into Evidence, Not Emotion`,
    level: `Advanced`,
    duration: `24 min read`,
    category: `Process`,
    imageCaption: `A structured review process converts individual trades into repeatable evidence about your model`,
    intro: `A trading journal is useful only when it changes how you make decisions. The objective is not to write a diary after every loss; it is to collect consistent information so you can discover which conditions help your model and which conditions hurt it. This module turns the journal into a research tool.`,
    sections: [
      {
        title: `What to Record Before Entry`,
        content: `Before entering, record the market context while your decision is still unbiased. Write the instrument, date, session, direction, higher-timeframe context, setup name, entry reason, invalidation level, target, planned risk in R, and the condition that would make you cancel the trade.\n\nDo not write a perfect story after the trade. Record the information that was actually available at the time. This preserves the difference between a good decision and a lucky outcome.`,
        highlight: `📌 The pre-trade record is your snapshot of what you actually knew. It is more valuable than a polished explanation written after the result.`,
      },
      {
        title: `Screenshot & Context Standards`,
        content: `Use the same screenshot structure every time so trades can be compared later. A useful minimum set is: higher-timeframe context, execution timeframe, entry/stop/target markings, and the key liquidity or imbalance level you used.\n\nKeep the chart clean. Do not add indicators after the fact. Your future review should answer three questions quickly: what did I see, what did I do, and what invalidated the idea?`,
        highlight: `📌 Consistent screenshots make patterns visible. Inconsistent screenshots make review subjective.`,
      },
      {
        title: `R-Multiple, MAE & MFE`,
        content: `Track every outcome in R rather than only in dollars. A +2R trade and a +$200 trade are difficult to compare when account sizes change; R normalizes the result.\n\nAlso track maximum adverse excursion (MAE) and maximum favorable excursion (MFE) when your platform or manual review allows it. MAE shows how far a trade moved against you before resolving. MFE shows how much unrealized profit was available. Across a meaningful sample, these measures can reveal whether stops are too tight, targets are unrealistic, or management rules are giving back too much.\n\nThese are descriptive statistics, not guarantees. Small samples can produce misleading patterns.`,
        highlight: `📌 Measure the path, not just the final result. R, MAE and MFE show how the trade behaved between entry and exit.`,
      },
      {
        title: `Setup Tagging & Error Taxonomy`,
        content: `Create a small controlled list of tags instead of writing a different description every time. Example tags: setup, session, direction, HTF alignment, entry quality, management error, rule violation, news exposure, and execution error.\n\nSeparate model failure from process failure. If the setup met your rules and still lost, that is different from entering early, moving the stop, or trading outside your session. You need that distinction before changing the strategy itself.`,
        highlight: `📌 Never redesign a model because of one loss. First classify the loss: valid loss, execution error, rule violation, or data-quality problem.`,
      },
      {
        title: `Weekly Performance Review`,
        content: `Once per week, review the whole sample rather than the most emotional trade. Calculate total R, win rate, average winner, average loser, largest losing streak, rule-violation count, and performance by setup or session when you have enough observations.\n\nThen inspect representative trades: one clean winner, one clean loser, one avoidable loss, and one trade you missed. The goal is not a motivational speech. The goal is to identify one repeatable behavior to preserve and one behavior to remove.`,
        highlight: `📌 Your weekly review should end with one process rule to reinforce and one process rule to eliminate.`,
      },
      {
        title: `Turning Data Into One Rule Change`,
        content: `Make changes slowly. If a review shows that losses cluster around a specific session, news window or entry condition, test that hypothesis on historical data before changing the live rules.\n\nUse a simple experiment: define the hypothesis, select the historical sample, apply the same rule consistently, compare the old and revised results, and only then decide whether the change deserves a forward test.\n\nThis prevents the common cycle of losing money, changing the strategy, winning once, changing it again, and never knowing what actually worked.`,
        highlight: `📌 A journal should create hypotheses. Backtesting and forward testing should decide whether those hypotheses deserve to become rules.`,
      },
    ],
    quiz: [
      { q: `Why record the setup before entry?`, options: ['To make the trade look better later', 'To preserve the information and reasoning available at the time', 'To predict the exact outcome', 'To avoid using a stop loss'], answer: 1 },
      { q: `What does R normalize?`, options: ['Account currency only', 'Trade results across different risk sizes', 'Market news', 'Broker spreads'], answer: 1 },
      { q: `What should a weekly review produce?`, options: ['A new strategy every week', 'One evidence-based process improvement', 'A guaranteed winning setup', 'A higher risk limit'], answer: 1 },
    ],
    nextLesson: { id: 32, title: `Macro, News & Execution Risk` },
    prevLesson: { id: 30, title: `Advanced Risk Management & Position Sizing` },
  },

  32: {
    id: 32,
    title: `Macro, News & Execution Risk`,
    subtitle: `Build a Trading Process That Survives Fast Markets`,
    level: `Advanced`,
    duration: `21 min read`,
    category: `Risk`,
    imageCaption: `Scheduled macro events can change spread, volatility and execution conditions even when the chart setup looks clean`,
    intro: `You do not need to trade every volatility burst. A serious execution plan includes the ability to stand aside when a scheduled event can materially change market conditions. This module explains how to use the economic calendar as a risk input rather than as a prediction engine.`,
    sections: [
      {
        title: `Reading the Economic Calendar`,
        content: `Start with events that can materially affect your instrument: central-bank decisions, inflation releases, employment reports and other high-impact scheduled announcements. Record the release time in the relevant market timezone and note whether you are normally in the market at that time.\n\nThe calendar does not tell you which direction price must move. Its primary value for execution is timing: it tells you when conditions may become less stable.`,
        highlight: `📌 Treat the calendar as a risk variable, not a directional signal.`,
      },
      {
        title: `Event Volatility & Scenario Planning`,
        content: `Before a major event, define three outcomes: no trade, wait for post-event structure, or execute only when your existing model remains valid after the event. Do not create a setup solely because volatility increased.\n\nWrite the invalidation before the release. If price spikes through your planned level, reassess rather than assuming the spike was a liquidity sweep that must reverse.`,
        highlight: `📌 A fast move is not automatically confirmation. Volatility can invalidate an otherwise clean technical setup.`,
      },
      {
        title: `Spread, Slippage & Fast Markets`,
        content: `Execution cost can rise during volatile periods. Spread is the difference between bid and ask; slippage is the difference between the expected execution price and the actual fill. Both can worsen during fast markets.\n\nThat matters for small stops. A setup that appears to risk 1R on a static chart may have materially different realized risk when the market is moving quickly. Position size should account for the instrument and execution environment rather than assuming the displayed spread will always remain constant.`,
        highlight: `📌 Your chart does not show the entire execution environment. Spread and slippage are part of real trading risk.`,
      },
      {
        title: `When to Stand Aside`,
        content: `A no-trade rule is a professional tool, not a missed opportunity. Consider standing aside when event risk is outside your tested model, spreads are abnormal, liquidity is thin, the setup requires a stop that is too tight for current volatility, or you cannot monitor the position responsibly.\n\nThe exact rule should come from your own testing and account constraints. The point is to make the decision in advance rather than improvising after a loss.`,
        highlight: `📌 If your model has not been tested through a condition, defaulting to caution is more defensible than assuming the edge still applies.`,
      },
      {
        title: `Building a News-Aware Trading Plan`,
        content: `Add a simple pre-session checklist: major scheduled events, instrument-specific volatility conditions, spread expectations, maximum risk, no-trade windows, and the plan for re-entry after the event.\n\nThen collect data. Tag trades taken before, during and after major releases and compare their results over a meaningful sample. This turns news handling from an opinion into a testable part of your process.`,
        highlight: `📌 The objective is not to predict news. The objective is to control your exposure to changing execution conditions.`,
      },
    ],
    quiz: [
      { q: `What is the economic calendar most useful for?`, options: ['Guaranteeing market direction', 'Identifying scheduled periods of potential execution risk', 'Replacing technical analysis', 'Setting a fixed profit target'], answer: 1 },
      { q: `What can happen to slippage during fast markets?`, options: ['It always becomes zero', 'It can increase', 'It becomes a profit guarantee', 'It cannot change'], answer: 1 },
      { q: `What should determine your news rules?`, options: ['A single dramatic trade', 'Testing, account constraints and a defined process', 'Social media predictions', 'The largest candle on the chart'], answer: 1 },
    ],
    nextLesson: null,
    prevLesson: { id: 31, title: `Trade Review & Journal Process` },
  },
};
