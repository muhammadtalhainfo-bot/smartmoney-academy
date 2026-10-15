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
    imageCaption: `A pre-session daily-bias workflow can organize context; alignment is a filter to define and test`,
    intro: `A trader can define a Daily Bias before the session by studying higher-timeframe context. A useful bias is a testable scenario, not proof of institutional order flow or a guarantee about the day's direction.`,
    sections: [
      {
        title: `What Daily Bias Really Means`,
        content: `A daily bias is a directional scenario built from a trader's chosen higher-timeframe definitions. It may be written before a session to reduce unplanned decisions, then updated if predefined invalidation or new information changes the context. It does not reveal institutional order flow or make intraday reassessment too late.\n\nA useful comparison is to journal a predefined-bias process and a more reactive process under otherwise comparable rules. Evaluate whether either method changes execution discipline and results rather than assuming one style is inherently superior.`,
        highlight: `📌 A pre-session bias can organize a plan, but it is a conditional scenario, not a deadline. Reassess when your predefined rules or new information invalidate the original view.`,
      },
      {
        title: `The Top-Down Hierarchy  --  Monthly to Daily`,
        content: `Some traders use a top-down checklist to organize directional scenarios. The timeframes are context, not proof that a directional move is more likely; alignment and disagreement should be defined in advance and evaluated with journal or backtest data.\n\nMONTHLY CHART:\nNote the larger structure and reference levels under your chosen definitions.\n\nWEEKLY CHART:\nRecord the intermediate structure and prior-week levels. If you use an AMD or quarterly narrative, treat its labels as hypotheses rather than verified phases.\n\nDAILY CHART:\nRecord daily structure, prior-day levels and any defined FVG or OB references. State the scenario, alternatives and invalidation.\n\nIf you choose to require alignment across timeframes, test that filter against the same entry and exit rules without the filter. Three matching timeframe labels alone do not establish a higher win rate or justify larger position size.`,
        highlight: `📌 One possible top-down workflow uses monthly and weekly context to inform a daily plan. The timeframes do not have to align in every model; define the role of each and test whether alignment improves results.`,
      },
      {
        title: `Previous Day Reference Levels`,
        content: `Before each session, traders can mark these reference levels as possible areas of interest:\n\nPREVIOUS DAY HIGH (PDH):\nICT traders often label the area above PDH as potential buy-side liquidity. In a bearish scenario, some watch for a move above PDH followed by a bearish response, but neither the sweep nor the reversal is assured.\n\nPREVIOUS DAY LOW (PDL):\nICT traders often label the area below PDL as potential sell-side liquidity. In a bullish scenario, some watch for a move below PDL followed by a bullish response, but neither the sweep nor the reversal is assured.\n\nPREVIOUS DAY CLOSE:\nThe overnight gap between the previous close and the current day's open is significant. Some traders monitor this gap as a reference area, but it may remain open or be filled at an unpredictable time.\n\nPREVIOUS WEEK HIGH / LOW:\nWeekly highs and lows can provide broader context than prior-day levels, but their relevance varies and they do not define the maximum possible daily range.\n\nThese are candidate reference levels, not guaranteed boundaries of the day's range. Use them where your model calls for them and keep alternative scenarios visible.`,
        highlight: `📌 Mark PDH, PDL, previous week high and low before every session. These are potential reference areas for a daily plan, not guaranteed targets.`,
      },
      {
        title: `The Midnight Open  --  True Daily Reference`,
        content: `ICT materials may use midnight New York time as a “True Daily Open” reference, distinct from the 9:30 AM NYSE open. The reference can be included in a chart study, but it does not establish that a daily AMD cycle begins at midnight or that a particular session must accumulate, manipulate or distribute.\n\nOne ICT narrative associates different windows with possible phases: Asian trading with accumulation, London with a possible Judas-style move, and New York morning with possible directional expansion. These are interpretations to test against defined session and price rules, not verified descriptions of an algorithm's actions.\n\nThe relationship between price and the midnight open is a chart observation; it does not, by itself, determine an AMD phase or forecast direction. If the reference is part of your model, specify the market, timezone, session window, setup trigger and invalidation, then compare outcomes with a baseline.`,
        highlight: `📌 Midnight New York time can be studied as a daily-open reference; it does not prove an AMD phase, institutional activity or a future direction.`,
      },
      {
        title: `When to Trade With No Bias (Neutral Days)`,
        content: `Some strategies include a neutral or no-trade condition when their required context is missing or contradictory. Treat the following as possible review prompts, not universal signals:\n\n• Monthly and weekly context disagree under your chosen definitions.\n• Price is near the middle of a marked range and your model has no defined setup there.\n• A high-impact news event may change execution conditions.\n• A reference area has not provided the trigger your rules require.\n• The target or invalidation conditions for the scenario are unclear.\n\nWhen a required condition is absent, following a written no-trade rule can reduce discretionary entries. It does not mean every neutral day is harmful or that low-conviction days always lose. Track no-trade decisions as well as triggered setups, and assess the filter using defined data rather than assuming a fixed number of high-quality trades per month.`,
        highlight: `📌 Use a no-trade rule when your model's required context or trigger is absent. Treat any bias filter as a hypothesis to test, and distinguish a disciplined no-trade decision from a prediction that the day will lose.`,
      },
      {
        title: `Building Your Daily Bias Routine`,
        content: `EXAMPLE PRE-SESSION ROUTINE (ADAPT IT TO YOUR MARKET):\nChoose a consistent time and timezone that fit your instrument and strategy.\n\nSTEP 1 -- Higher-timeframe context:\nRecord the larger structure and candidate reference levels using consistent definitions.\n\nSTEP 2 -- Intermediate context:\nMark prior-week levels and note any model-specific seasonal or AMD hypothesis without treating it as a confirmed phase.\n\nSTEP 3 -- Daily context:\nMark prior-day levels and candidate FVG/OB zones if they are part of your rules.\n\nSTEP 4 -- Write a conditional scenario:\nFor example: "If condition X occurs at level Y, I will monitor for Z; if invalidation A occurs, I will stand aside." Include alternatives.\n\nSTEP 5 -- Set alerts where useful:\nUse alerts to support the plan; do not assume a named session will trigger the scenario. Review the routine's effect on consistency and results before claiming it outperforms reactive analysis.`,
        highlight: `📌 A written pre-session plan can help standardize analysis. Choose the timing and checklist that fit your instrument; assess whether it improves consistency instead of assuming a fixed duration or killzone window is optimal.`,
      },
    ],
    quiz: [
      { q: `Daily bias should be determined...`, options: ['During the NY AM session', 'Before the session opens using HTF analysis', 'After the first trade of the day', 'When price shows a clear pattern'], answer: 1 },
      { q: `The True Daily Open in ICT is...`, options: ['9:30 AM NYSE open', 'London open at 2 AM New York time', 'Midnight New York time', 'Asian session open at 7 PM New York time'], answer: 2 },
      { q: `When might a model signal a no-trade day?`, options: ['Always take a directional position', 'When required context is contradictory or a defined setup is absent', 'Only on Mondays', 'Whenever RSI is at 50'], answer: 1 },
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
    intro: `Draw on Liquidity (DOL) is an ICT term some traders use to record a possible price objective before a move occurs. While retail traders wonder "where will price go?" after it has already moved, It can help structure a conditional plan, but it does not establish an advantage over other approaches or show that a target will be reached. Treat each nominated level as a hypothesis and record alternatives and invalidation. This is a hypothesis about possible price objectives, not evidence of an algorithmic sequence or a forecast.`,
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
      { q: `What is one possible DOL-based scenario a trader could test?`, options: ['Enter anywhere → hope for movement → exit randomly', 'Mark a candidate ERL, require a predefined IRL condition, then apply entry, stop, target and invalidation rules', 'Buy at support → sell at resistance', 'Enter after news → exit at round number'], answer: 1 },
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
    intro: `PD Arrays—Price Delivery Arrays—are chart features named in ICT methodology, such as FVGs, order blocks, breakers, and related zones. Traders may use them as reference areas, but chart patterns do not confirm underlying institutional orders or algorithmic intent. Understanding the definitions, consistent marking rules and measured outcomes of these arrays is more useful than relying on labels alone. Traders should distinguish reproducible criteria from subjective grading and test whether an array-based rule adds value.`,
    sections: [
      {
        title: `What Is a Dealing Range?`,
        content: `A dealing range is a price interval defined by a trader, often between a swing high and low. Premium and discount are labels relative to the range midpoint; they do not mean that a price is objectively expensive or cheap, nor do they prove where institutions are buying or selling.\n\nSome ICT traders use these zones to organize directional scenarios. Define the swing points and midpoint consistently, then test whether a premium/discount filter adds value to your setup. Lower-timeframe and higher-timeframe ranges can disagree, so define which range controls your rule instead of treating one timeframe as universally dominant.`,
        highlight: `📌 Premium and discount can be context filters in an ICT model, but the 50% level is not a standalone buy or sell command. Compare results with and without this filter before claiming it improves trade selection.`,
      },
      {
        title: `Comparing PD Array Definitions and Results`,
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
        content: `DRAWING ORDER BLOCKS:\nMark the body of the last bearish candle before a bullish displacement (for bullish OB). The OB zone spans from the candle's body high to body low. Some practitioners use wick-to-wick  --  ICT traditionally uses body only for the core zone.\n\nDRAWING FVGs:\nMark the high of candle 1 and the low of candle 3 for a bullish FVG. The midpoint is called Consequent Encroachment (CE) in some ICT usage; treat it as one possible reference to test, not a universally optimal entry.\n\nDRAWING BREAKER BLOCKS:\nSome ICT variants label a previously defined order block a Breaker Block after price violates it, then study a possible change in polarity on a later revisit. Define the violation and retest criteria in advance; a former zone is not guaranteed to act as support or resistance.\n\nDRAWING BPR:\nIdentify a bullish FVG and a bearish FVG in the same area. The overlapping zone between them is the BPR.\n\nKEY RULE  --  REMOVE MITIGATED ARRAYS:\nSome ICT models mark an array as mitigated after price returns to it or trades through a defined part of the zone. Specify whether your rule uses a touch, partial fill, full traversal or close beyond a boundary, then apply it consistently. A previously crossed zone is not automatically useless under every model.`,
        highlight: `📌 Some ICT models treat a revisited or crossed zone as mitigated. Define mitigation precisely and apply that rule consistently; a zone's usefulness cannot be established by its label alone.`,
      },
    ],
    quiz: [
      { q: `In some ICT models, which range location may be evaluated as a candidate long context?`, options: ['Premium zone (above 50% EQ)', 'Equilibrium (exactly 50%)', 'Discount relative to the defined range, subject to the model’s other rules and testing', 'Any zone regardless of price'], answer: 2 },
      { q: `What is the most defensible way to compare PD Array types?`, options: ['Assume each label has a fixed rank', 'Rank by visual appeal', 'Define each pattern and compare outcomes with a consistent baseline', 'Always prioritize Breaker Blocks'], answer: 2 },
      { q: `Under a model that defines full traversal as mitigation, when might a PD Array be marked inactive?`, options: ['After 24 hours', 'When price approaches it', 'After price trades fully through it under the model’s prewritten mitigation rule', 'At the end of each week'], answer: 2 },
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
        title: `Execution Constraints for Large Orders`,
        content: `Large orders can create execution challenges, including market impact and slippage, so some institutions use execution strategies that split orders across time or venues. The exact methods vary by market, instrument, liquidity and mandate. A chart by itself does not reveal the size of an order, who placed it, or whether a consolidation reflects accumulation. Treat AMD as a framework some ICT traders use to interpret ranges and directional moves—not as a verified account of every institutional transaction.`,
        highlight: `📌 Large orders may require careful execution, but chart patterns cannot establish which participant is trading, the size of its position, or its motive. Define observable conditions before testing an ICT interpretation.`,
      },
      {
        title: `The Accumulation Phase  --  Building Without Moving Price`,
        content: `In ICT terminology, accumulation describes a range-bound phase in a proposed Accumulation-Manipulation-Distribution (AMD) sequence. A chart can show consolidation, repeated tests of levels, and changing range or volatility; it cannot establish that a participant is secretly building a directional position. These features may be recorded as candidate conditions in a model.\n\nPotential observations to log include range width, duration, session, volume where reliable, number of level tests, subsequent breakout direction, and the maximum adverse move after a breakout. Compare qualifying cases with non-qualifying ranges and include failed breakouts. A sweep may follow a consolidation, but it is not required and does not reveal the motive for the move.`,
        highlight: `📌 Consolidation is observable; hidden accumulation and the direction of a later breakout are interpretations. Record the range and the following outcome rather than assuming a sweep or reversal will occur.`,
      },
      {
        title: `False Breakouts and Stop-Hunt Interpretations`,
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
        title: `Distribution as a Price-Action Hypothesis`,
        content: `In the AMD framework, distribution describes a directional move away from a range toward a potential objective. A trader can record directional candles, retracements, range expansion, and interaction with prior highs or lows. Those observations do not establish that institutions are executing a coordinated delivery plan.\n\nDefine a possible end condition in advance—for example, price reaching a marked level, a structure change, a time limit, or a protective stop. Price may pass a target, reverse before reaching it, or continue beyond it. Use the same exit rule in backtests and forward tests, including costs and adverse outcomes.`,
        highlight: `📌 A move may approach or pass a marked liquidity level, but that does not prove a distribution phase has ended. Decide the exit and invalidation rules before the trade.`,
      },
    ],
    quiz: [
      { q: `What can a chart establish about a suspected stop hunt?`, options: ['The bank that caused it', 'The exact orders that were triggered', 'A price pattern that can be defined and tested', 'A guaranteed reversal'], answer: 2 },
      { q: `A displacement candle is characterized by...`, options: ['Small body with large wicks', 'Large body with minimal wicks, moving aggressively in one direction', 'Equal open and close', 'Gap from the previous close'], answer: 1 },
      { q: `In a model that uses the AMD framework, what is a defensible way to define the end of a distribution scenario?`, options: ['Price reaches equilibrium', 'Apply a predefined exit or invalidation condition that fits the tested model', 'The Asian session opens', 'RSI reaches overbought'], answer: 1 },
    ],
    nextLesson: { id: 19, title: `Session Timing & Market Hours` },
    prevLesson: { id: 17, title: `Dealing Ranges & PD Arrays` },
  },

  19: {
    id: 19,
    title: `Session Timing & Market Hours`,
    subtitle: `Session Timing as a Context Filter to Define and Test`,
    level: `Beginner`,
    duration: `17 min read`,
    category: `Timing`,
    imageCaption: `Four commonly discussed market sessions; activity and outcomes vary by instrument and time window`,
    intro: `Session timing is one context filter used in ICT trading. Activity, spreads and volatility can vary by instrument and time of day, but a named session does not guarantee a better setup or reveal the intentions of institutional participants. Treat killzones and session profiles as hypotheses to test rather than fixed descriptions of what price must do.`,
    sections: [
      {
        title: `Why Time Matters in ICT`,
        content: `Markets are not equally active throughout the 24-hour trading day. Trading activity and spreads vary by instrument, venue, news and market conditions. Liquidity is not simply the volume of institutional orders, and a chart cannot identify which participant groups caused a change.\n\nA session may coincide with tighter spreads or more activity for some instruments, but this does not mean setups necessarily work cleanly during that window. Some windows may be quieter for a given instrument, but this should be measured rather than assumed.  --  market activity may be quieter, but a chart does not reveal an algorithm's mandate or intent.\n\nTest differences between 10 AM and 3 PM New York time using a representative sample that includes costs, slippage, losses and no-trade sessions. Differences may reflect multiple factors, not just institutional participation.\n\nSession timing can be a useful context variable, but it is not by itself the primary determinant of whether a strategy works. Test whether it adds value beyond a clear baseline before restricting your trading hours.`,
        highlight: `📌 The same setup can produce different results across session windows. Price timing alone does not reveal who participated or guarantee an edge; test named windows against an appropriate baseline before restricting trading to them.`,
      },
      {
        title: `Asian Session (7 PM - 12 AM New York time)  --  Range Building`,
        content: `In some ICT frameworks, traders mark the Asian-session high and low and later watch how price interacts with those levels. Range size and volatility vary by instrument, weekday, news and feed. A narrow range does not prove that institutions are accumulating positions, and the later session is not required to sweep either side.\n\nIf you use the range as a reference, define the session clock, mark the high and low mechanically, and record what happens during London and New York. Include days where neither side is swept or where a breakout continues without reversing.`,
        highlight: `📌 Some ICT traders mark the Asian high and low as possible reference levels for later sessions. They may be crossed, respected, or ignored; do not assume either side must become a target or that a move through it must reverse.`,
      },
      {
        title: `London Killzone (2 AM - 5 AM New York time)  --  A Session Window to Study`,
        content: `Some ICT traders study the hours around the London open for possible false breakouts, structure changes and range expansions. These are candidate price patterns, not proof that European institutions initiate a manipulation phase or that price must move opposite to its eventual direction. Define your conditions for a sweep, close-back, structure shift and entry trigger. Compare the same rules during other time windows and record failed reversals as well as successful ones.`,
        highlight: `📌 A possible hypothesis is that price crosses an Asian range level near the London open and returns through it. Neither a sweep nor a reversal is required, and the eventual daily direction is not known from the first move; compare reversals with continuations under fixed rules.`,
      },
      {
        title: `New York AM Killzone (7 AM - 11 AM New York time)  --  U.S. Morning Window`,
        content: `The New York morning includes the U.S. cash-equity open and may coincide with scheduled economic news and changing activity. The amount of activity depends on the instrument and date; price can trend, range, reverse or remain quiet. A named killzone does not establish a preferred direction or guarantee that an FVG, order block or other setup will work. Define the window using New York time and test your setup against a comparison window, including news days, transaction costs and all valid signals.`,
        highlight: `📌 The 10–11 AM New York Silver Bullet window is a commonly studied ICT time window; test it with a fixed setup definition and include losing and no-trade sessions.`,
      },
      {
        title: `London Close & New York PM (12 PM - 5 PM New York time)`,
        content: `The later London and New York hours can differ from the morning in volume, spreads and available catalysts, but no fixed directional move is assured. Some traders study levels near the London close as possible reference points. Verify the behavior for the instrument and period you trade instead of assuming a predictable repositioning move or mandatory counter-trend setup.`,
        highlight: `📌 Some strategies use a session cutoff or study the London close as a reference window, but a time alone does not establish a lower probability or a reversal. Test later-window results separately and follow the written setup, risk and no-trade rules rather than imposing a universal ban.`,
      },
    ],
    quiz: [
      { q: `Which session window do some ICT frameworks examine for potential range breaks or false breakouts near the open?`, options: ['Asian Session', 'London Killzone', 'New York PM', 'London Close'], answer: 1 },
      { q: `A commonly studied Silver Bullet window in some ICT definitions is...`, options: ['7 AM - 9 AM New York time', '9 AM - 10 AM New York time', '10 AM - 11 AM New York time', '2 PM - 4 PM New York time'], answer: 2 },
      { q: `During the Asian session, ICT traders should primarily...`, options: ['Trade aggressively for quick scalps', 'Observe, analyze, and mark levels for the next session', 'Trade reversals from the Asian range', 'Place orders for the London session'], answer: 1 },
    ],
    nextLesson: { id: 20, title: `Narrative Building` },
    prevLesson: { id: 18, title: `Institutional Order Flow` },
  },

  20: {
    id: 20,
    title: `Narrative Building`,
    subtitle: `Writing Conditional Trading Scenarios Before Execution`,
    level: `Advanced`,
    duration: `25 min read`,
    category: `Advanced`,
    imageCaption: `Narrative building: monthly → weekly → daily → session → entry  --  a structured plan with explicit alternatives and invalidation`,
    intro: `Narrative building can be treated as a pre-trade scenario: describe what price may do under defined conditions, what evidence would support the idea, and what would invalidate it. The scenario does not reveal algorithmic intent or remove uncertainty. A coherent account of the chart can help organize decisions, but it does not establish an institutional delivery cycle or make a prediction accurate.`,
    sections: [
      {
        title: `What Is a Trading Narrative?`,
        content: `A trading narrative is a written scenario that can answer questions such as:\n\n• What higher-timeframe context and candidate Draw on Liquidity levels matter under my definitions?\n• What is the current daily scenario, and what alternative could unfold?\n• Which AMD phase labels, if any, am I using as hypotheses rather than verified events?\n• What observable session conditions would qualify a setup?\n• Which entry, stop and target rules apply if those conditions occur?\n• What specific event or price condition would invalidate the scenario?\n\nA narrative links chart observations to a conditional plan; it cannot guarantee that a target will be reached or establish why participants traded. If a link depends on an unverified assumption, label it as a hypothesis and test whether it contributes useful information.`,
        highlight: `📌 A narrative should connect chart observations to a conditional plan. Coherence alone does not confirm a forecast or prove institutional intent; record uncertain assumptions and define what evidence would change the scenario.`,
      },
      {
        title: `Building the Monthly → Weekly Layer`,
        content: `MONTHLY LAYER:\n\nQuestion 1: What is the monthly structure?\nAre monthly candles making Higher Highs / Higher Lows (bullish) or Lower Highs / Lower Lows (bearish)?\n\nQuestion 2: Which monthly reference is a candidate Draw on Liquidity?\nMark any relevant swing high or low under your model, but treat it as a possible objective rather than a target price must reach.\n\nQuestion 3: Is price in monthly premium or discount?\nDraw the Fibonacci from the last monthly swing. Is current price above or below the 50% EQ? Within this framework, premium may be studied as potential short context and discount as potential long context. Neither is an entry signal by itself, and both depend on the chosen swing range.\n\nWEEKLY LAYER:\n\nQuestion 1: How does weekly structure relate to the monthly scenario?\nRecord alignment or conflict under consistent definitions. Whether alignment improves the result is a testable filter; conflict does not require standing aside unless your written model says so.\n\nQuestion 2: Which weekly reference could serve as a Draw on Liquidity?\nRecord candidate levels and alternatives. The nearest swing is not necessarily the target price will reach during the week.\n\nQuestion 3: Do you use a weekly AMD hypothesis?\nSome ICT narratives associate phases with particular weekdays. Define the criteria for each label and track non-matches; no weekday is a reliable phase assignment by itself.\n\nThese layers provide one way to structure context. They do not determine lower-timeframe outcomes; define how context affects a specific setup and evaluate the rule with data.`,
        highlight: `📌 Monthly and weekly context can conflict. Record the scenarios and decide in advance how conflict affects your model; alignment does not prove institutional support or make every lower-timeframe setup valid.`,
      },
      {
        title: `Building the Daily Layer`,
        content: `The daily layer is where you assess the day's scenario against predefined criteria; it does not confirm the eventual direction:\n\nDAILY STRUCTURE:\nIs the daily chart making HH/HL (bullish) or LH/LL (bearish)? Does this match the weekly and monthly direction?\n\nDAILY DRAW ON LIQUIDITY:\nWhat is the nearest unmitigated daily level? Previous day high (PDH) or previous day low (PDL)? An open daily FVG? A daily OB that has not been returned to? These are candidate reference areas, not necessarily today's target; select one only if it fits the written model and keep alternatives and invalidation visible.\n\nDAILY AMD LABELS:\nSome ICT models label consolidation, a move beyond a reference, and later directional movement as accumulation, manipulation, and distribution. These are interpretations of price behavior—not proof of hidden positioning or a sequence that must occur. Define the conditions for each label and allow for days that do not fit the template.\n\nDAILY PD ARRAY STATUS:\nAre there any open FVGs or OBs on the daily timeframe that price is near? Traders may monitor these as candidate reaction areas, but price can pass through or ignore them; assess their usefulness against a defined baseline.\n\nAfter reviewing daily context, you may have one or more zones to monitor; a valid model can also produce no trade. Treat a zone as context, not an instruction to buy or sell.`,
        highlight: `📌 A daily plan may focus on a candidate PD Array within a defined range, but it remains one scenario. Keep alternative levels and invalidation visible rather than assuming one zone is all that matters.`,
      },
      {
        title: `Building the Session-Level Narrative`,
        content: `HYPOTHETICAL SESSION SCENARIO (BULLISH):\n\nAssume the monthly and daily structures meet your predefined bullish criteria, last week's high is marked as a candidate BSL reference, a daily FVG is identified at 1.0820-1.0835, and PDL is 1.0810. These chart observations can support a conditional scenario, but they do not establish how price will move or why.\n\nA rule to test might be: if price trades below PDL, then meets a predefined 5-minute structure-shift condition and a specified FVG-entry rule during the chosen New York window, record a qualifying setup. Price may instead continue lower, reverse without reaching the FVG, or never trigger the entry. A candidate target could be last week's high only if it meets the model's target rules; the expected R multiple must be calculated from the actual entry, stop and exit assumptions.\n\nInvalidation: specify the precise condition that cancels the scenario before the outcome. This is a testable example, not a forecast or a claim that a Judas Swing or Silver Bullet setup must occur.`,
        highlight: `📌 Write your session narrative before every trading day. "If X occurs at level Y, I will monitor for Z; if invalidation A occurs, I will stand aside." If the entry, invalidation or alternative outcome cannot be specified clearly enough to apply consistently, refine the plan before treating it as a testable setup.`,
      },
      {
        title: `When the Narrative Fails  --  Invalidation Logic`,
        content: `The important part of scenario building is defining in advance what invalidates the hypothesis. Choose observable price conditions or time limits that belong to the specific model, and distinguish scenario invalidation from rules governing an open position.\n\nFor example, a bullish scenario may be invalidated if the swing level anchoring the hypothesis breaks, an entry condition fails, or the allowed setup window expires. These are alternatives to define and test, not universal rules. If a trade is open, manage or close it according to the stop, exit and emergency rules written for that strategy; do not widen risk simply to avoid realizing a loss.\n\nReview whether invalidation rules were applied consistently and whether they improved the process; having a written rule does not guarantee long-term profitability.`,
        highlight: `📌 Define observable invalidation before entry. Scenario invalidation informs the plan; an open position still follows its predefined stop and exit rules rather than an automatic, universal instruction to close immediately.`,
      },
      {
        title: `Backtesting Your Narrative Framework`,
        content: `One way to evaluate a narrative framework is to test it against historical data using rules defined before scoring. Historical review can be affected by hindsight, so separate model development from out-of-sample evaluation:\n\nWEEK 1-2: COMPLETED DAILY CANDLE REVIEW:\nGo back 90 days on your target instrument. For each completed trading day, write a retrospective narrative: "Given what the monthly, weekly, and daily showed at the time, what bias would my prewritten rules have assigned before the session? Was there a clear session setup? What was the result?"\n\nWEEK 3-4: REAL-TIME NARRATIVE WRITING (DEMO):\nEvery day before the session opens, write your full narrative as outlined above. Then watch the day unfold and evaluate: Did the prewritten conditions occur? What alternatives unfolded? Was there a valid entry under the rules, or a no-trade? Record outcomes without assuming a named pattern was due.\n\nMONTH 2: FORWARD TESTING:\nContinue writing daily narratives and tracking accuracy. Do not use a generic accuracy target unless the prediction and scoring rules are defined in advance. Track directional bias, setup frequency, outcomes, and expectancy on a representative sample.\n\nA journal covering multiple sessions can help assess rule adherence, but its usefulness depends on the sample and scoring method; it does not by itself establish a durable edge or guarantee live results.`,
        highlight: `📌 Review both historical and forward-looking scenarios with criteria defined before scoring. Directional accuracy alone, including a 70% result, does not establish a durable edge or prove readiness for live trading.`,
      },
      {
        title: `The Narrative vs the Trade`,
        content: `A narrative and a trade are separate. The narrative records a scenario to monitor, not what an algorithm will do. A trade is taken only if written entry conditions occur and the stop, target and risk conditions are acceptable under the model.\n\nA bullish daily scenario may remain plausible even when a particular sweep, structure shift or FVG entry never occurs; in that case the scenario did not produce a qualifying trade. Conversely, the anticipated move can occur without offering an entry that meets the plan. Record both cases instead of relabeling them as successful predictions after the fact.\n\nSome traders grade setups, but any grade should be based on observable criteria and validated rules. Size positions using the predefined sizing method, stop distance, account risk cap and total exposure. A narrative or setup grade should not override the account risk cap or justify a larger position by itself. No narrative process guarantees consistent compounding.`,
        highlight: `📌 Use narrative to organize a scenario, not to justify full or half size by itself. Define setup grades in observable terms and size positions from tested rules, stop distance and total account exposure.`,
      },
      {
        title: `Full Narrative Walkthrough Example`,
        content: `HYPOTHETICAL XAUUSD SCENARIO (NOT A FORECAST):\n\nAssume a trader's predefined chart rules label the monthly and weekly structures bullish, mark 2,450 as a monthly reference, 2,340 as a weekly candidate level, a daily FVG at 2,298-2,305, and PDL at 2,291. These numbers illustrate planning only; they do not establish current conditions or an expected outcome.\n\nA testable rule might be: record whether price trades below PDL and then satisfies a specific structure-shift and entry condition during the chosen session window. The trader must also predefine stop placement, target-selection method and time horizon. Price may continue lower, fail to revisit the FVG, trigger no trade, or reach a candidate target through a different path. Compute realized R from the actual trade rules; do not infer a 3.8:1 outcome until entry, stop and exit are defined.\n\nInvalidation should be written as an observable condition before the outcome. This example describes how to document a hypothesis, not an institutional narrative, guaranteed sequence or recommendation to trade gold.`,
        highlight: `📌 A narrative can record higher-timeframe context, conditional scenarios, entry criteria, risk, target and invalidation. Keep assumptions explicit and adapt the checklist to the strategy being tested.`,
      },
    ],
    quiz: [
      { q: `A trading narrative must include...`, options: ['Only the entry and stop loss', 'Direction on all relevant timeframes, entry, target, and invalidation', 'RSI and MACD readings', 'News events for the week'], answer: 1 },
      { q: `When a scenario is invalidated, what is the best response?`, options: ['Widen your stop and wait', 'Follow the predefined position-management and exit rules, and record the scenario failure', 'Add to the losing position', 'Reverse direction immediately'], answer: 1 },
      { q: `What should determine position size when narrative context and setup quality differ?`, options: ['Always use full size on a perfect-looking chart', 'A predefined, tested sizing rule within the account risk cap', 'Always use half size on an A setup', 'Double size to compensate for missed trades'], answer: 1 },
    ],
    nextLesson: { id: 21, title: `Quarterly Theory` },
    prevLesson: { id: 19, title: `Session Timing & Market Hours` },
  },

  21: {
    id: 21,
    title: `Quarterly Theory & Seasonal Tendencies`,
    subtitle: `Quarterly Theory as a Seasonal Hypothesis to Test`,
    level: `Advanced`,
    duration: `20 min read`,
    category: `Advanced`,
    imageCaption: `Quarterly labels are one lens for studying seasonal behavior, not a fixed annual market script`,
    intro: `Quarterly Theory is an ICT framework that assigns labels such as accumulation, manipulation, distribution and repositioning to parts of the calendar year. Those labels should be treated as hypotheses about seasonality, not established descriptions of what institutions do. If you study quarterly effects, define the rules in advance and compare results with a baseline across multiple years and instruments.`,
    sections: [
      {
        title: `The Four Quarters of Every Year`,
        content: `Some ICT explanations associate Q1 with accumulation, Q2 with manipulation, Q3 with distribution and Q4 with repositioning. These labels are a framework for organizing observations, not a market law. Quarterly returns, volatility and trends vary across years, instruments and macroeconomic conditions.\n\nTo evaluate the idea, define the expected direction or behavior for each quarter before examining results. Compare distributions across a broad historical period, avoid selecting only famous examples, and account for hindsight bias.`,
        highlight: `📌 Q1/Q2/Q3/Q4 accumulation, manipulation, distribution and repositioning is one attributed template. No quarter must behave this way; define the classification and test its value against a baseline.`,
      },
      {
        title: `Q1: The January Effect and Accumulation Logic`,
        content: `Some market commentary discusses a January Effect or seasonal tendencies early in the year, while ICT Quarterly Theory may interpret Q1 through an accumulation label. Neither label reliably determines a year's direction. If you use the quarter as context, compare instrument-specific returns, range, drawdown and direction over multiple years and specify what would falsify the hypothesis.`,
        highlight: `📌 Some traders study quarterly patterns such as January context and possible later reversals. These are hypotheses, not calendar rules; test defined conditions across instruments and periods before using them.`,
      },
      {
        title: `Q2: Testing a Possible Seasonal Pattern`,
        content: `The quarterly framework sometimes labels Q2 as a manipulation phase, but there is no basis here to conclude that Q2 is universally the most dangerous quarter or that it routinely reverses Q1 to trap retail traders. Quarter-to-quarter behavior can vary substantially. Treat a Q2 reversal filter as a testable idea: define a Q1 trend, a Q2 counter-trend move and a resumed trend before testing; include years where no reversal occurred and compare results with other quarters.`,
        highlight: `📌 Do not automatically reduce size, tighten stops or trade reversals because the calendar says Q2. Any quarter-based filter needs defined rules and evidence from multiple years, after costs and against other quarters.`,
      },
      {
        title: `Monthly Seasonal Tendencies by Pair`,
        content: `Some traders study calendar-month patterns in FX, gold and equity indices. A seasonal tendency should not be called reliable without a stated dataset, period, instrument definition and comparison against a suitable baseline:\n\nFOREX SEASONAL PATTERNS:\n• EURUSD: measure returns by month and relevant dollar conditions; do not assume a stable quarterly direction\n• GBPUSD: test any April–May or September–October tendency across defined historical periods rather than assuming it persists\n• USDJPY: measure month-by-month returns and the influence of rate differentials and market regimes; do not treat a calendar label as a directional signal\n• XAUUSD: test monthly returns with consistent contract/price definitions and costs before assigning directional seasonality\n\nINDICES SEASONAL PATTERNS:\n• NAS100/S&P 500: examine any January, summer or year-end effect using a stated sample and out-of-sample validation; do not assume the pattern applies in every year\n• "Sell in May and go away"  --  the tendency for equity weakness between May and October  --  should not be linked to an assumed ICT quarter phase without evidence\n\nIMPORTANT CAVEAT:\nSeasonality is a candidate variable, not automatically a probability filter. Test whether it adds out-of-sample value beyond the base strategy after costs; agreement with an ICT narrative does not itself justify higher conviction or size.`,
        highlight: `📌 Seasonal tendencies are calendar-based hypotheses, not established filters by default. Test whether they add out-of-sample value beyond the base model before adjusting conviction; never use them alone as entry or exit signals.`,
      },
      {
        title: `Integrating Quarterly Theory into Your Analysis`,
        content: `Adding Quarterly Theory to your ICT analysis creates a five-layer framework:\n\n1. QUARTERLY LAYER (macro bias):\nWhich quarter are we in? Which prewritten seasonal hypothesis, if any, will be evaluated this quarter? Does this quarter confirm or conflict with the annual trend?\n\n2. MONTHLY LAYER:\nMonthly structure and draw on liquidity (as previously discussed)\n\n3. WEEKLY LAYER:\nWeekly structure and draw on liquidity\n\n4. DAILY LAYER:\nDaily bias and specific trade zone\n\n5. SESSION LAYER:\nEntry execution during killzone\n\nA plan may score alignment across quarterly, monthly, weekly and daily charts as confluence. Alignment is not evidence of institutional positions or, by itself, proof of better results; test whether it improves outcomes relative to a simpler baseline. Quarterly alignment may be logged as one candidate filter. It should not be assumed to improve performance unless comparison with a simpler baseline supports that conclusion.\n\nPRACTICAL IMPLEMENTATION:\nAt the start of each quarter, take 30 minutes to assess: What quarter are we entering? What was Q1's direction (if applicable)? Does current price action confirm the quarterly bias? How does this affect my monthly and weekly analysis? Update your macro bias document and refer to it before every trading week.`,
        highlight: `📌 The quarterly-to-session hierarchy is one way to organize context. Multiple aligned timeframes do not automatically justify maximum size; risk should reflect tested expectancy, volatility and drawdown limits.`,
      },
    ],
    quiz: [
      { q: `How should quarterly or seasonal ICT patterns be evaluated?`, options: ['As fixed calendar rules for all markets', 'As hypotheses to test across defined instruments and periods', 'As a substitute for risk management', 'As guaranteed reversals'], answer: 1 },
      { q: `Which statement about Q1 in a quarterly ICT narrative is most defensible?`, options: ['Q1 always establishes the year’s direction', 'Q1 can be treated as a context variable, but its directional value must be tested', 'Q1 determines all later-quarter moves', 'Q1 guarantees institutional accumulation'], answer: 1 },
      { q: `How should seasonal tendencies be used in ICT analysis?`, options: ['As the primary trading signal', 'To override ICT analysis when they conflict', 'As a hypothesis to test against the base strategy before changing conviction', 'Only for equity markets, not forex'], answer: 2 },
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
        content: `Not all voids and gaps fill completely before price continues. Understanding the difference between full fills and partial fills helps you manage entries and exits:\n\nFULL FILL:\nPrice returns to the gap or void and trades completely through it  --  from the near edge to the far edge. A full fill records traversal through the defined gap; it does not by itself predict continuation, reversal or whether a trader should remove the zone.\n\nPARTIAL FILL (50% or CE Fill):\nPrice returns to the gap and fills to approximately the midpoint (Consequent Encroachment), then reverses. Whether a partial fill stops at the CE and reacts is an empirical question; the candle pattern does not show that institutional orders were triggered there.\n\nNO FILL (Immediate Continuation):\nPrice occasionally gaps and continues in the gap direction without returning to fill. A gap may remain open while price continues or may be revisited later. The chart pattern does not establish an algorithmic decision or make an unfilled gap a future target.\n\nPRACTICAL APPLICATION:\nWhen price approaches a gap, a trader may test partial-fill, CE, edge-entry or full-traversal rules as separate variants. Do not assume a reaction, lower risk or greater profit potential from the fill label alone; compare entries using the same stop, exit and cost assumptions.`,
        highlight: `📌 CE is one possible reference, not a required fill or guaranteed reaction point. Define partial/full-fill and invalidation rules and measure whether they add value; a full traversal alone does not guarantee a trend change.`,
      },
      {
        title: `Trading Into and Out of Voids`,
        content: `Integrating void and gap analysis into your ICT trading process:\n\nBEFORE THE SESSION:\n1. Mark any open NWOG from Sunday (if applicable)\n2. Mark the previous day close vs today's open (NDOG if gap exists)\n3. Note all open daily and 4-hour FVGs that haven't been filled\n4. Determine which gaps are in the direction of your daily bias (IRL targets) and which are opposing (potential obstacles or alternative targets)\n\nDURING THE SESSION:\n• If price enters the gap, record whether it reaches a predefined partial/full-fill level; do not assume a reaction\n• If a gap opposes an open position, follow the prewritten exit or partial-profit rule; the gap alone does not require a reversal or an early exit\n• Gaps below a rising market or above a falling market may be studied as reference areas, but their support/resistance behavior must be defined and tested\n\nEXIT MANAGEMENT USING GAPS:\nA gap opposing an open position may be recorded as one candidate exit reference. If you are long and an open bearish FVG exists 20 pips above current price, Whether to scale out, hold or exit should follow the strategy's predefined, tested rules—not an assumption that price must stall or reverse at the gap.`,
        highlight: `📌 Gaps can be studied as entry or exit references when the model defines a measurable rule. They do not establish the path of least resistance or guarantee how price will reach a candidate DOL.`,
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
        title: `Using Time as a Context Filter`,
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
    subtitle: `A Potential False-Breakout Pattern to Define and Test`,
    level: `Intermediate`,
    duration: `18 min read`,
    category: `Strategy`,
    imageCaption: `Turtle Soup-style hypothesis: a move beyond a reference may return inside, but confirmation and follow-through are uncertain`,
    intro: `Turtle Soup is an ICT term for a possible false breakout near a visible high or low. A trader may test a move beyond the reference that then returns through it, followed by a separately defined confirmation rule. This pattern does not establish that retail stops were targeted, predict a reversal, or rank the setup's reliability; breakouts can continue. Define the trigger, stop, target and invalidation for the model being tested.`,
    sections: [
      {
        title: `How the Turtle Soup Hypothesis Is Defined`,
        content: `Turtle Soup is an ICT term for a possible false breakout around a visible high or low. One hypothesis is that a move beyond a level may trigger some orders before price returns through it; the chart does not reveal exactly which orders triggered, who placed them, or whether a participant intended to trap traders. Define the level, required penetration, close-back condition, reversal trigger, stop and target in advance. Record cases where price continues beyond the level rather than selecting only clear-looking reversals in hindsight.`,
        highlight: `📌 A move beyond a visible high or low can be studied as a possible false breakout. The chart does not establish institutional intent or guarantee a return inside the level; include continuations in the test.`,
      },
      {
        title: `Identifying Turtle Soup Setup Conditions`,
        content: `Some traders test whether a Turtle Soup definition works better when the reference high or low is visible on a higher timeframe, when a close-back condition occurs, or when a lower-timeframe structure break follows. These are candidate filters, not proven requirements or a universal ranking. Set rules before reviewing results and include examples where an apparently obvious level breaks and continues.`,
        highlight: `📌 A potential Turtle Soup setup might combine a marked high or low, contextual alignment, a defined session window and a reversal trigger. Define each condition and test whether it adds value instead of assigning preset A+ grades.`,
      },
      {
        title: `Entry Logic After the Sweep`,
        content: `The common mistake when trading Turtle Soup is entering immediately at the moment of the sweep  --  jumping in short the moment price takes out the high. An initial violation may instead continue as a breakout; the label alone cannot tell whether or when a reversal will occur.\n\nTHE CORRECT ENTRY SEQUENCE:\n\nStep 1  --  WAIT FOR THE SWEEP TO COMPLETE:\nOne possible rule requires a close back inside the level or a separately defined reversal condition. Select this before testing; it is not a universal entry rule.\n\nStep 2  --  CONFIRM WITH LTF STRUCTURE BREAK:\nIf the model uses lower-timeframe confirmation, define the bearish break with an explicit swing-low or closing-price rule. A structure break can be a condition to test, but it does not prove that the reversal will continue or the sweep is complete.\n\nStep 3  --  ENTER ON THE FIRST FVG AFTER THE REVERSAL:\nA retracement/FVG entry is one variant to define and test. A pullback may not occur, the FVG may not form, and a limit order may be missed or filled without a favorable reaction.\n\nStep 4  --  STOP ABOVE THE SWEEP WICK:\nOne possible stop rule places the stop beyond the observed sweep extreme, but that increases stop distance and cannot guarantee protection from further movement or slippage. Define the stop from the model's invalidation rule, then size the position for that distance.\n\nStep 5  --  TARGET = NEXT SSL:\nA possible target rule references a nearby low or candidate Draw on Liquidity, but traders can also predefine fixed-R or time-based exits. No target is guaranteed; compare outcomes after costs.`,
        highlight: `📌 One Turtle Soup-style variant uses a defined sweep, lower-timeframe structure condition and possible FVG entry. Specify invalidation, execution assumptions, missed fills and target rules; it is an example to test, not a complete rulebook for every model.`,
      },
      {
        title: `Turtle Soup on Multiple Timeframes`,
        content: `A false-breakout rule may be applied to different timeframes, but the signal frequency, stop distance and holding period change with the chart interval. A four-hour pattern is not automatically stronger than a one-minute pattern, and larger timeframes do not guarantee larger R multiples. Define the swing level and trigger for each interval, use realistic costs and compare outcomes with consistent performance measures.`,
        highlight: `📌 Signal frequency, stop distance and holding period vary by timeframe. Compare timeframes under the same definitions and realistic costs; a larger timeframe is not automatically stronger, and a lower timeframe is not only an entry chart.`,
      },
      {
        title: `Common Turtle Soup Errors`,
        content: `ERROR 1  --  ENTERING ON THE SWEEP ITSELF:\nBuying/selling the moment price breaks the obvious level, hoping for the reversal before it is confirmed. Price may extend further before reversing, may reverse quickly, or may never reverse. Include all of these outcomes in a pre-defined test rather than treating a later reversal as the expected result.\n\nERROR 2  --  NO HTF CONFIRMATION:\nSome variants use higher-timeframe alignment as a filter. A setup against that context is counter-trend under those rules, but the direction alone does not establish whether a break will continue or reverse. Compare the filter's value using consistent rules and costs.\n\nERROR 3  --  IGNORING THE DISPLACEMENT QUALITY:\nSome variants require a predefined displacement threshold after the candidate sweep. Define its size and timing before reviewing outcomes; a weak move does not prove institutional involvement, and a strong move does not guarantee continuation.\n\nERROR 4  --  WRONG LEVEL:\nNot every high or low is a Turtle Soup candidate. Some variants restrict the reference to a prior swing, equal high/low or other defined range. Operationalize the level rule rather than assuming chart visibility reveals retail attention or institutional significance.\n\nERROR 5  --  STOP INSIDE THE SWEEP WICK:\nPlacing the stop at the original level may conflict with a model whose invalidation is beyond the sweep. Other stop rules are possible; define the invalidation before the outcome and account for distance, volatility and execution costs rather than assuming a stop beyond the observed wick prevents every stop-out.`,
        highlight: `📌 Entry confirmation, higher-timeframe context and stop placement are model choices to define before testing. A sweep can continue as a breakout, and no wick-based stop guarantees a reversal or a precise exit.`,
      },
    ],
    quiz: [
      { q: `How should higher-timeframe alignment be used when testing a Turtle Soup-style setup?`, options: ['Treat it as mandatory for every market and model', 'Treat it as a possible filter and compare results with and without it under the same rules', 'Use it as proof that institutions caused the sweep', 'Assume it prevents the breakout from continuing'], answer: 1 },
      { q: `What should a Turtle Soup-style entry rule specify?`, options: ['Entry on the initial break in every case', 'A predefined post-sweep trigger, execution method and invalidation condition', 'A fixed 50-pip entry distance for all instruments', 'No confirmation or stop rule'], answer: 1 },
      { q: `How should a stop be selected in a Turtle Soup-style model?`, options: ['At the original level in every market', 'Inside the wick by default', 'At the model-defined invalidation level, then size for distance and execution risk', 'A fixed 50 pips beyond entry'], answer: 2 },
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
    imageCaption: `Judas Swing: a label for a possible counter-move, without assuming the later direction or institutional intent`,
    intro: `The Judas Swing is an ICT term for a possible short-term move against a scenario that later reverses. The label does not establish deception, institutional delivery, or that a reversal will occur. Define the reference range, time window, direction, confirmation, invalidation, target and no-trade cases before testing.`,
    sections: [
      {
        title: `What Is the Judas Swing?`,
        content: `Judas Swing is a term in ICT education for a proposed false move around a session transition that may be followed by a move in the opposite direction. It is an interpretation of a possible price sequence—not proof of institutional manipulation or a required event each day. Define the reference range, time window, penetration, close-back or structure shift, invalidation and exit before testing.`,
        highlight: `📌 A counter-move that later reverses is one possible Judas Swing interpretation. A move down does not establish that price will go up next; write down confirmation and invalidation conditions and track cases that continue instead.`,
      },
      {
        title: `London Judas Swing Anatomy`,
        content: `Some ICT traders watch whether price crosses an Asian-session high or low around the London open and then reverses. A cross and reversal can be described using fixed chart rules; it does not establish why the move occurred or guarantee that the rest of the session will continue the other way. Mark the range consistently and log both reversals and continuations.`,
        highlight: `📌 One variant can combine an Asian-range interaction, a separately defined structure condition and a possible FVG entry. Treat each condition and the wick-based stop as model choices to test, not a universally required sequence.`,
      },
      {
        title: `NY AM Judas Swing Patterns`,
        content: `Some ICT traders study a Judas-style move around the New York AM session, including near the NYSE open at 9:30 AM New York time:\n\nTYPE 1  --  PRE-MARKET JUDAS:\nSome traders study 8:00–9:30 AM as a premarket window for moves relative to a marked reference range. A move against bias can continue; chart data alone does not prove stops were swept or that a later “real” direction began.\n\nTYPE 2  --  OPEN REVERSAL:\nThe opening move can reverse, range or continue after 9:30 AM. A claim that it usually reverses within 15–20 minutes is a timing hypothesis that must be tested against continuations and other windows.\n\nTYPE 3  --  SILVER BULLET JUDAS (10 AM):\nSome traders include the 10:00 AM window in a Judas-style study. A short move at that time does not establish a final stop hunt or guarantee a subsequent directional delivery.\n\nHOW TO DISTINGUISH JUDAS FROM REAL MOVE:\n• Some traders test speed or relative volume as features, but these are not universal discriminators and the required data must be defined\n• Candle size and FVG counts can be measured as candidate features; they do not establish a false breakout by themselves\n• Whether price holds above/below a level or returns through it can be defined as a comparison rule, not a categorical distinction known in real time\n• Structure breaks may be included if defined before testing; a move beyond a level can still continue in the same direction`,
        highlight: `📌 To test this distinction in real time, define a close-back or follow-through rule before reviewing outcomes. Initial level breaks alone do not reveal whether a later reversal will occur.`,
      },
      {
        title: `Reference Levels and Timing to Test`,
        content: `A practical research question is how far price travels relative to a defined range before any reversal condition occurs. The label itself does not identify a target or predict a reversal.\n\nPossible reference levels a trader may record include:\n\nTARGET 1  --  ASIAN RANGE HIGH/LOW:\nThe Asian high or low is one possible reference; do not presume it is the nearest, most frequent or intended destination without data for the instrument and window.\n\nTARGET 2  --  PREVIOUS DAY HIGH/LOW:\nA model may separately record previous-day levels, but an earlier move through the Asian range does not predict that price will reach them.\n\nTARGET 3  --  A SIGNIFICANT FVG OR OB:\nA daily or 4-hour FVG can be recorded as a candidate reference if its boundaries are defined in advance; interaction does not imply the move will end or reverse there.\n\nTARGET 4  --  EQUAL HIGHS/LOWS:\nVisible EQH or EQL are candidate reference levels in some models; measure their outcomes rather than presuming they are powerful targets.\n\nTIMING AS A GUIDE:\nA time window can be included as a hypothesis, but session opens shift with daylight-saving changes and the window should be stated in a clear timezone. Do not assume a fixed 60–90-minute completion rule without instrument-specific evidence.\n\nIf the pre-defined condition does not occur within the chosen window, record a no-trade or follow the model's alternative scenario rather than forcing a Judas narrative.`,
        highlight: `📌 Use a session-time cutoff only if it is part of a prewritten, tested rule and the timezone is explicit. If the setup does not trigger, follow the no-trade or alternative scenario instead of inferring direction from elapsed time alone.`,
      },
      {
        title: `Judas-Style Entry Variants to Compare`,
        content: `Three entry approaches for the Judas Swing reversal, ranging from most aggressive to most conservative:\n\nENTRY 1  --  AGGRESSIVE (Sweep + LTF Candle):\nEnter immediately when a reversal candle forms at the Judas target  --  before a formal LTF structure break. This may provide an earlier entry if filled, but it can also enter before a reversal is established; compare outcomes and execution costs.\n\nENTRY 2  --  MODERATE (Sweep + 5M ChoCH + Retracement):\nWait for the Judas sweep → wait for a 5-minute ChoCH in the reversal direction → enter on the first retracement into the 5-minute FVG after the ChoCH. This is one commonly described variant; its risk and reward depend on the entry definition, execution and observed outcomes.\n\nENTRY 3  --  CONSERVATIVE (Full Confirmation + Continuation):\nWait for the full 5-minute structure to shift → wait for a pullback to the 15-minute or 1-hour FVG from the initial reversal move → enter on the second push in the reversal direction. This delays the entry and may miss part of a move; it is not inherently lower-risk or better for beginners.\n\nSTOP PLACEMENT FOR ALL ENTRIES:\nSome variants place the stop beyond the observed sweep extreme. Choose a stop from the model's invalidation rule and size for that distance; a wick-based stop is not universal and cannot guarantee the intended exit price.\n\nTARGET PLACEMENT:\nPossible targets include prior-day or weekly reference levels, a fixed risk multiple or a time-based exit. Specify the target rule before entry and do not assume any reference will be reached.`,
        highlight: `📌 Some ICT traders describe aggressive, moderate and conservative Judas-style entry variants. These are alternative examples, not universal entries; define each trigger, stop, target and invalidation before testing instead of assuming every setup uses the same rules.`,
      },
      {
        title: `Confirming Judas vs Real Breakout`,
        content: `A possible false breakout and a genuine breakout can look similar while they are developing. A trader may define a close back inside the range, a subsequent structure shift, or follow-through as confirmation, but none guarantees the next move. Volume data—when available and relevant to the venue—can be another feature to test, not a universal discriminator. Define the rule in advance and avoid labelling a move as a fake only after it reverses.`,
        highlight: `📌 One way to classify outcomes is to define a close-back-inside rule for a possible false breakout and a follow-through rule for continuation. Speed, candle size and FVGs are candidate features, not reliable proof by themselves; classify cases only using rules set in advance.`,
      },
    ],
    quiz: [
      { q: `The Judas Swing is the ICT term for...`, options: ['A trend continuation pattern', 'A possible counter-move studied for a later reversal, which may not occur', 'A bullish candlestick pattern', 'The Asian session opening move'], answer: 1 },
      { q: `When testing a Judas-style move near the London open, what is a defensible next step?`, options: ['Continue in the Judas direction', 'Apply a predefined confirmation rule and record both reversals and continuations', 'Enter a consolidation phase until NY opens', 'Return exactly to the Asian range midpoint'], answer: 1 },
      { q: `If the London move hasn't reversed after 90 minutes, you should...`, options: ['Enter in the direction of the move anyway', 'Double your stop loss to give price more room', 'Follow a prewritten cutoff or no-trade rule; do not force a reversal bias', 'Wait for the NY AM session to confirm'], answer: 2 },
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
    imageCaption: `BPR: an overlap between defined bullish and bearish FVG zones that can be evaluated as a chart reference`,
    intro: `A Balanced Price Range (BPR) is defined in some ICT variants as an overlap between a bullish Fair Value Gap and a bearish Fair Value Gap. The overlap is a chart relationship, not evidence of concentrated institutional orders. Whether price reacts there more often, more sharply or more completely than at other zones is an empirical question that needs consistent definitions, baseline comparisons and realistic costs.`,
    sections: [
      {
        title: `BPR Formation  --  How It Forms`,
        content: `A Balanced Price Range (BPR) forms when two conditions are met simultaneously:\n\n1. A BULLISH FVG exists at a specific price range (high of candle 1 to low of candle 3 on a bullish displacement)\n2. A BEARISH FVG overlaps with that same price range (high of candle 3 to low of candle 1 on a bearish displacement)\n\nThe OVERLAP ZONE  --  the price range where both FVGs occupy the same space  --  is the BPR.\n\nWHY MIGHT TRADERS STUDY THE OVERLAP?\nThe overlap records two opposing candle formations under the chosen FVG definition. It does not show why price moved through the zone, which participants traded there, whether orders remain there, or whether a future visit will trigger a strong reaction. Test this hypothesis against each individual FVG and a simple reference strategy using the same entry, stop, target and cost rules.\n\nVISUALIZING BPR:\nImagine drawing a green box for a bullish FVG and a red box for a bearish FVG. Where these two boxes overlap  --  where they share the same price range  --  that overlapping area is the BPR. The BPR is typically a smaller zone than either individual FVG.`,
        highlight: `📌 BPR = the overlap zone between a bullish and bearish FVG under the chosen definitions. Its size is a chart measurement; it does not reveal participant identity or prove that the zone will react.`,
      },
      {
        title: `Evaluating BPR Reaction Claims`,
        content: `A Balanced Price Range (BPR) is commonly described in ICT material as the overlap between bullish and bearish Fair Value Gap zones. Some traders monitor the overlap as a possible reaction area, but an overlap does not prove that institutional orders are concentrated there or that price will react sharply. Define the candle rules, boundaries and reaction condition, then evaluate outcomes including complete violations and no reaction.`,
        highlight: `📌 Some ICT explanations define a BPR as an overlap of bullish and bearish fair value gaps. The overlap does not identify institutional orders or guarantee a sharper reaction; define the zone rule and test it.`,
      },
      {
        title: `Identifying BPR on Any Timeframe`,
        content: `STEP-BY-STEP BPR IDENTIFICATION:\n\nStep 1  --  Mark all bullish FVGs on your timeframe:\nGo through recent price history and mark every zone where a bullish displacement created a gap between candle 1's high and candle 3's low.\n\nStep 2  --  Mark all bearish FVGs:\nMark every zone where a bearish displacement created a gap between candle 1's low and candle 3's high.\n\nStep 3  --  Look for overlaps:\nWhere does a bullish FVG zone occupy the same price range as a bearish FVG zone? The overlap is the BPR.\n\nStep 4  --  Define the overlap precisely:\nThe BPR zone runs from the HIGHER of the two lower boundaries to the LOWER of the two upper boundaries. Example: Bullish FVG = 1.0820 to 1.0840. Bearish FVG = 1.0815 to 1.0835. BPR = 1.0820 to 1.0835 (the overlap).\n\nStep 5  --  Determine direction:\nOne naming convention may label an overlap bullish or bearish using a predefined dealing-range reference and higher-timeframe context. State that convention consistently and do not infer a future reaction from the label alone.\n\nSome traders look for a BPR that also overlaps OTE and aligns with higher-timeframe context. Treat this as a hypothesis, not a ranking; test whether each added condition improves expectancy.`,
        highlight: `📌 BPR identification: mark bullish FVGs → mark bearish FVGs → find the price interval where they overlap. A narrow overlap is more precise geometrically, but that does not establish a more concentrated order book or better trading performance.`,
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
      { q: `If price closes beyond the far edge of a BPR, what is a cautious next step?`, options: ['Enter a larger position because the BPR is now more powerful', 'Apply your predefined invalidation rule; some models mark the zone inactive after a close through it', 'Assume price must return to the midpoint', 'Move the stop to the far edge in every case'], answer: 1 },
    ],
    nextLesson: { id: 27, title: `Execution & Trade Management` },
    prevLesson: { id: 25, title: `Judas Swing & AMD Deep Dive` },
  },

  27: {
    id: 27,
    title: `Execution & Trade Management`,
    subtitle: `Entry Rules, Order Execution and Risk Controls`,
    level: `Advanced`,
    duration: `24 min read`,
    category: `Execution`,
    imageCaption: `Entry, stop and target rules need realistic fills, costs, and testing`,
    intro: `Execution quality can affect realized trading results alongside strategy design, market conditions, costs and risk management. This lesson covers entry methods, stop placement and trade management as decisions to define and test; knowing a concept or executing it consistently does not guarantee a profitable result.`,
    sections: [
      {
        title: `Entry Precision  --  Limit vs Market Orders`,
        content: `LIMIT ORDERS:\nA limit order sets the maximum price you are willing to pay when buying, or the minimum price you are willing to accept when selling. It may fill at the desired price or better, but it can remain unfilled if price does not reach it. Some ICT-style models place limits at a specified part of an FVG, OB or BPR; these are model-specific references, not automatically optimal prices.\n\nMARKET ORDERS:\nA market order prioritizes execution at the best available price, but the actual fill may differ from the displayed price, especially in fast or illiquid conditions. It may be used when the written setup requires confirmation, but can also lead to slippage or a worse entry.\n\nCHOOSING AN ORDER TYPE:\n• Specify in advance when the strategy uses limit, market or stop orders.\n• Test missed fills as well as completed trades; a backtest that assumes every limit order fills when touched can overstate results.\n• Include spread, commissions and slippage when comparing realized R:R.\n• Avoid chasing a move outside the setup's defined entry conditions, but do not assume limit orders always provide a better outcome.\n\nOrder type is an execution choice with tradeoffs, not a shortcut to higher expectancy. Compare alternatives under the same signals and cost assumptions.`,
        highlight: `📌 Limit and market orders have different fill, slippage and missed-trade tradeoffs. Choose order type through a predefined execution rule suited to spread, volatility and the setup; do not generalize one order type across every model.`,
      },
      {
        title: `Stop Loss Placement Logic`,
        content: `Stop placement should follow the invalidation rule defined for the specific setup, not a universal boundary for every chart pattern. A setup may use a candle boundary, range extreme, structure point or another explicit condition, depending on the model.\n\nPOSSIBLE MODEL-SPECIFIC REFERENCES:\n• For an FVG, define whether invalidation is a touch, close through an edge, or traversal of the zone.\n• For an order block, define which part of the candle or zone matters and what price action invalidates the idea.\n• For a sweep or reversal setup, define the level that invalidates the reversal hypothesis rather than assuming every wick is a stop hunt.\n• For a BPR, write down the boundary or condition used by your strategy.\n\nGENERAL PROCESS:\nChoose the stop from a rule that can be applied before knowing the outcome. Calculate position size from stop distance, contract value, planned account risk and execution costs. A stop is not a guarantee of the exact exit price: gaps, slippage and low liquidity can make realized loss larger than the planned amount. Avoid moving a stop farther away merely to avoid realizing a loss.`,
        highlight: `📌 Stop placement rule: stop goes at the level that PROVES THE SETUP WRONG if reached. Not a round number. Not a comfortable distance. The exact level that invalidates the specific setup type you entered.`,
      },
      {
        title: `Take Profit at Liquidity Targets`,
        content: `Take-profit placement is one of the exit rules a trading model should define before entry. Some ICT traders use candidate Draws on Liquidity (DOL) as targets; others use a fixed-R multiple, timed exit, volatility-based exit or a combination. No target type guarantees a fill or a profitable outcome.\n\nPOSSIBLE REFERENCE TARGETS:\n• An internal-range reference such as a defined FVG, OB or prior swing.\n• An external-range reference such as a prior-day/week high or low.\n• A larger-timeframe reference for a swing model.\n\nThe nearest reference does not necessarily offer the best payoff or have to be reached. A target at a liquidity level can still be skipped or rejected before price arrives; a fixed-R target can also be a valid model if tested. Compare target-selection rules using the same entry, stop and cost assumptions.\n\nBefore entry, record the target, the invalidation condition, the time horizon and any partial-exit rule. Keep the plan conditional and evaluate missed fills, early exits and partial exits in the results.`,
        highlight: `📌 Some ICT plans use a candidate DOL as one possible target. Define target-selection and invalidation rules before entry; a marked liquidity level is not a required destination, and a fixed three-target sequence is only one model.`,
      },
      {
        title: `Partial Profits  --  When and How Much`,
        content: `Partial exits can change the trade's average realized win/loss, risk and drawdown. They are one possible management choice, not a guaranteed way to reduce stress or improve performance.\n\nWhen testing partials, define in advance: the condition for taking a partial, the fraction closed, the stop rule for the remaining size, and the final exit condition. Do not assume that moving the stop to breakeven makes the remaining position risk-free; spread, commissions, slippage and a stop execution beyond the entry can still produce a net loss.\n\nCompare the partial-exit variant with a full-position exit under the same setup, entry, stop, target and cost assumptions. Include all trades and measure expectancy, drawdown, missed fills and the effect of early exits. Do not change the exit rule on a trade simply because holding it feels uncomfortable unless that action is part of the tested plan.`,
        highlight: `📌 Partial exits, breakeven moves and holding for another target are alternative management rules. Compare their effects on expectancy and drawdown before adopting a fixed percentage or sequence.`,
      },
      {
        title: `Break Even Logic and Trail Stops`,
        content: `BREAK-EVEN RULES SHOULD BE MODEL-SPECIFIC:\nSome plans move a stop to entry after a defined move (for example, 1R) or after a named reference has been reached. Other plans keep the original stop until the target or invalidation is hit. Test the chosen rule; moving to breakeven early can reduce some losses but can also increase stop-outs on trades that later continue.\n\nTRAILING STOPS:\nA structural trail can be defined around swing points or other explicit invalidation references; a fixed-distance trail is another possible method. Neither method is universally better. Write down how the stop moves and test it with realistic costs and intrabar assumptions.\n\nFULL EXIT LOGIC:\nDefine in advance whether the exit is target-based, time-based, structure-based or a combination. A candidate DOL or opposite structure shift can inform the rule, but should not be applied retrospectively to justify an exit.`,
        highlight: `📌 A 1R move, a PD Array interaction or a lower-timeframe structure break can be tested as a stop-adjustment trigger, but none is a universal breakeven rule. Account for costs and the possibility of a net loss even after moving the stop to entry.`,
      },
      {
        title: `Position Sizing and Risk Per Trade`,
        content: `RISK LIMITS ARE ACCOUNT- AND STRATEGY-SPECIFIC:\nThere is no single percentage that is appropriate for every trader, instrument, strategy or account. Choose a maximum planned loss per trade that fits your tested strategy, account rules and ability to tolerate drawdown. Include total open exposure and correlated positions; a setup grade such as A+ should not automatically justify higher risk.\n\nCALCULATING POSITION SIZE:\n1. Choose the amount you are willing to lose if the stop is reached.\n2. Define the entry and stop from your written setup rules.\n3. Convert the stop distance into monetary risk using the instrument's contract size, tick/pip value and account currency.\n4. Account for spread, commissions, slippage and other execution costs.\n5. Check aggregate risk across open positions before placing the order.\n\nHYPOTHETICAL EURUSD EXAMPLE:\nAssume a $50,000 account, a planned risk cap of 1% ($500), a 25-pip stop, and a pip value of $10 per standard lot. Under those assumptions, $500 / (25 × $10) = 2 standard lots before additional costs or slippage. Actual sizing depends on the broker, contract specifications, quote currency and execution conditions.\n\nDAILY AND WEEKLY PAUSE RULES:\nSome traders set daily or weekly loss limits and pause trading when they are reached. Choose thresholds in advance based on your strategy, account limits and risk capacity, then review the cause of a drawdown. A limit may reduce exposure, but it does not guarantee that losses will stop exactly at that percentage.`,
        highlight: `📌 Example risk framework, not a universal prescription: set a per-trade cap and daily or weekly stop based on your tested strategy, account limits and ability to tolerate drawdown. A subjective setup grade alone does not justify increasing risk.`,
      },
      {
        title: `The Psychology of Execution`,
        content: `Execution habits can affect consistency, but avoid presenting a single cause or remedy as universal.\n\n1. PREMATURE EXIT: Leaving before a planned target may come from discomfort, changing conditions or an exit rule that was poorly specified. A partial at TP1 is one variant to test, not a guaranteed way to reduce fear or improve returns.\n\n2. STOP MOVEMENT: Moving a stop farther away without a predefined rule can increase exposure beyond the planned risk. Define the stop and any permitted adjustment before entry, and account for the possibility of slippage.\n\n3. LATE ENTRY: If price passes the intended entry, follow the strategy's missed-entry rule rather than improvising. Whether a later entry is acceptable depends on the model's predefined conditions.\n\n4. OVERTRADING: Repeated discretionary entries after wins or losses can depart from a tested plan. Define a trade-frequency or daily-stop rule only if it fits your account constraints and strategy evidence; there is no universal two-trade daily limit.\n\n5. HESITATION: If a setup is difficult to execute consistently, review whether its conditions are observable and its order method is appropriate. A preplanned limit order may miss the trade; it does not remove execution decisions or guarantee a fill.`,
        highlight: `📌 The biggest execution killers: premature exit, stop movement, late entry, overtrading, and analysis paralysis. Each has a specific solution. Write them down and review them weekly.`,
      },
    ],
    quiz: [
      { q: `How should order type be chosen for an ICT-style entry?`, options: ['Use a market order whenever price moves fast', 'Follow a predefined execution rule that fits the setup, spread and slippage assumptions', 'Always use limit orders at every PD Array', 'Use limit orders only during the Asian session'], answer: 1 },
      { q: `In a trading plan that uses DOL, which is one possible preplanned target?`, options: ['A fixed 2:1 R:R in every trade', 'A round number in every market', 'A candidate draw on liquidity selected by the defined model', 'The previous day close in every trade'], answer: 2 },
      { q: `How should a breakeven-stop rule be chosen?`, options: ['Move it as soon as the trade turns positive', 'Use a predefined, tested trigger that fits the strategy and accounts for costs and stop-out tradeoffs', 'Always move it after 1R plus a structure break', 'Never adjust a stop under any circumstances'], answer: 1 },
    ],
    nextLesson: { id: 28, title: `Backtesting & Model Development` },
    prevLesson: { id: 26, title: `Balanced Price Range (BPR)` },
  },

  28: {
    id: 28,
    title: `Backtesting & Model Development`,
    subtitle: `Building, Evaluating and Validating a Trading Model`,
    level: `Advanced`,
    duration: `22 min read`,
    category: `Strategy`,
    imageCaption: `A research workflow: specify rules → test historical data → validate out of sample → forward-test execution before deciding whether to risk capital`,
    intro: `Backtesting can help evaluate a trading hypothesis, but it does not prove a durable edge. Historical results depend on rule definitions, data quality, transaction costs, selection of rules and out-of-sample performance. Use testing to estimate uncertain performance and identify failure modes, not as a guarantee of consistent profitability.`,
    sections: [
      {
        title: `Why Backtesting Is Useful, Not Proof`,
        content: `A common risk in learning any discretionary method is relying on visual examples and memory instead of recording outcomes. Without systematic testing, a trader cannot estimate how a defined rule performed in the sampled data or compare it fairly with alternatives. Backtesting still has limits, including selection bias, data quality, transaction costs and changes in market conditions.\n\nREASONS TRADERS SKIP BACKTESTING:\n1. Impatience  --  they want to trade now, not study historical data\n2. Overconfidence  --  "I understand the concept, that's enough"\n3. Avoidance  --  backtesting reveals that their current approach doesn't actually work\n4. False belief that demo trading IS backtesting (it is not)\n\nWHY SKIPPING BACKTESTING FAILS:\n• Without testing, you lack a systematic estimate of the win rate under the rule and sample being studied\n• Position sizing should be grounded in a defined risk cap, stop distance, instrument value, costs and the uncertainty in the strategy's estimates—not win rate alone\n• Poor sizing can create large drawdowns; even a strategy with positive estimated expectancy can lose money if its estimates are wrong, costs rise or market conditions change\n• Without a consistent record, short runs can lead to subjective rule changes; classify outcomes using prewritten criteria and evaluate proposed changes on separate data\n\nBACKTESTING IS NOT OPTIONAL:\nBacktesting can estimate how a written rule performed on historical data, but it cannot prove live execution skill or that an edge will persist. Combine it with forward testing, realistic costs and limits on capital at risk.`,
        highlight: `📌 Backtesting is one tool for evaluating a defined strategy. Check data quality and realistic costs, and evaluate untouched out-of-sample data; historical evidence remains uncertain and does not guarantee future profitability.`,
      },
      {
        title: `Setting Up a Proper Backtesting Environment`,
        content: `TOOLS FOR ICT BACKTESTING:\n\nOPTION 1  --  TRADINGVIEW REPLAY (FREE, RECOMMENDED):\nTradingView's Bar Replay feature allows you to go back in time on any instrument and move forward candle by candle, making trading decisions as if you are in real time. This is one common tool for manual replay; results depend on written rules, data quality, costs and fill assumptions.\n\nSetup: Open TradingView → select your instrument → click the Bar Replay button → go back 6-12 months → replay day by day, marking your analysis before you advance.\n\nOPTION 2  --  FOREX TESTER:\nA dedicated backtesting software that allows tick-by-tick replay with order simulation. More realistic but requires a paid subscription. Excellent for traders who want simulated execution with real spread and slippage data.\n\nOPTION 3  --  CHART SCROLLING METHOD:\nScroll your chart back in time → cover future price with a box → advance forward candle by candle manually. Cruder than replay tools but accessible on any platform.\n\nWHAT YOU NEED TO RECORD:\n• Date and instrument\n• Entry price and entry reason (which PD Array, which session, which AMD phase)\n• Stop loss level and reason\n• Take profit level and reason (which DOL)\n• Exit price and exit reason\n• R:R planned vs R:R achieved\n• All criteria from your entry checklist (which were present, which were missing)\n• Outcome: win / loss / breakeven\n• Notes on execution quality`,
        highlight: `📌 Use TradingView Bar Replay for free backtesting. Record every triggered trade with full criteria notes. The quality of your data determines the quality of your analysis.`,
      },
      {
        title: `What to Record in Every Backtest`,
        content: `A backtest record needs enough detail to test the stated question; record the conditions and outcomes that matter to the model. Here is the minimum required data for each backtested trade:\n\nTRADE IDENTIFICATION:\n• Trade number (sequential)\n• Date and time of entry\n• Instrument traded (EURUSD, NAS100, XAUUSD)\n• Session (London, NY AM)\n• Direction (Long / Short)\n\nSETUP QUALITY:\n• Setup type (FVG entry, OB entry, BPR entry, Turtle Soup, etc.)\n• HTF alignment: Monthly direction, Weekly direction, Daily bias\n• Was price in discount (for longs) or premium (for shorts)?\n• Killzone: Yes / No\n• Liquidity sweep present: Yes / No\n• Entry criteria checklist: which items were confirmed?\n\nTRADE MECHANICS:\n• Entry price\n• Stop loss price and distance in pips\n• Planned TP1, TP2\n• Initial planned R:R\n\nOUTCOME:\n• Exit price\n• Actual R:R achieved\n• Result: Win / Loss / Breakeven\n• Did price reach TP1 before TP2? Before stop?\n• Were there any execution errors (entered late, moved stop, exited early)?\n\nPOST-TRADE NOTES:\n• What worked about this trade?\n• What would you do differently?\n• Confidence level in setup (1-10)`,
        highlight: `📌 Record every triggered setup, wins and losses, using the same criteria. Excluding losses biases the sample; review loss types as hypotheses for process improvements, then test any proposed filter separately before relying on it.`,
      },
      {
        title: `Sample Size — Planning Evidence and Uncertainty`,
        content: `There is no universal number of trades that guarantees statistical significance or proves a trading model is ready for live use. The amount of data required depends on the effect size being tested, variability, the number of filters, and how independent the observations are. Use a documented sample plan, avoid changing rules after reviewing outcomes, and separate rule development from out-of-sample validation. Report trade count, expectancy, uncertainty, drawdown, market coverage and costs; then forward-test before risking material capital.`,
        highlight: `📌 There is no universal minimum sample size that guarantees statistical significance or production confidence. Choose a sample strategy based on setup variability, and include out-of-sample and forward testing. Test EXACTLY the rules you will trade live  --  no mid-backtest modifications. Record every triggered setup, wins and losses equally.`,
      },
      {
        title: `Turning Results Into a Defined Model`,
        content: `After collecting a sample suited to the setup frequency, variability and research question, summarize the data to evaluate your defined trading model:\n\nKEY METRICS TO CALCULATE:\n\nWIN RATE:\n(Winning trades / Total trades) × 100\nNo universal win-rate target applies across instruments, rules, and costs.\n\nAVERAGE R ON WINNERS:\nSum of all winner R multiples / Number of winners\nNo universal average-R target applies across strategies.\n\nAVERAGE R ON LOSERS:\nSum of all loser R multiples / Number of losers\nTarget: should be -1R (full stop hit)\n\nEXPECTANCY:\n(Win rate × Average R winner) - (Loss rate × Average R loser)\nEstimate expectancy on a representative sample and account for uncertainty and costs; do not assume a universal 0.5R threshold.\n\nMAXIMUM CONSECUTIVE LOSSES:\nThe longest observed losing streak in the available sample\nIt describes that sample, not a guaranteed maximum or a prediction of future drawdown; include uncertainty and other loss sequences\n\nBEST-PERFORMING FILTERS:\nAnalyze which criteria, when present, correlated with the highest win rates:\n• Setup type: which PD Array performed best?\n• Session: London or NY AM?\n• HTF alignment: did 3-timeframe alignment outperform 2-timeframe?\n• AMD phase: did distribution phase entries outperform manipulation entries?\n\nMODIFICATIONS BASED ON DATA:\nUse discovery data to propose one change at a time, not to automatically promote every feature that separates winners and losers. More filters and rule changes increase the risk of fitting noise. Freeze the definitions, test each proposed change on untouched out-of-sample data, and compare it with a simple baseline after realistic costs. If the evidence is weak or inconsistent, report that uncertainty rather than optimizing until the historical results look good.`,
        highlight: `📌 Measure win rate, average R, expectancy and drawdown. Treat patterns among winners and losers as hypotheses, not automatic rules; validate changes on untouched data to reduce overfitting.`,
      },
      {
        title: `Forward Testing Your Model on Demo`,
        content: `After defining your model from backtesting, the next step is forward testing on a demo account  --  trading the model in real time on paper money to validate that it performs similarly in live market conditions:\n\nWHY FORWARD TESTING MATTERS:\nBacktesting, even done perfectly, has limitations:\n• You know roughly what price does in the data you are reviewing\n• Emotional pressure is absent\n• Execution is hypothetical\n\nForward testing on demo introduces:\n• Real-time uncertainty  --  you do not know what price will do\n• Real-time emotional pressure  --  even on paper money, decisions feel more real\n• Real execution practice  --  actually placing orders, managing positions\n\nFORWARD-TEST REQUIREMENTS:\n• Trade the EXACT same rules from your backtest model  --  no modifications\n• Record every triggered trade with the same detail as backtesting\n• Choose a representative forward-test sample based on setup frequency, variability, execution and the decision being evaluated; no fixed count certifies readiness\n• Track rule adherence and no-trade cases across that sample; a short perfect streak alone does not establish robustness\n\nWHEN FORWARD-TEST RESULTS MATCH BACKTEST RESULTS:\nSimilar backtest and forward-test win rates alone do not prove robustness or readiness for live trading. Compare expectancy, drawdown, trade frequency, costs, and rule adherence on an independent sample.\n\nWHEN THEY DON\'T MATCH:\nIf forward test results are significantly worse than backtest  --  either your backtest had replay bias, or there are real-time conditions that affect the model that were not present in historical data. Identify the discrepancies and fix them before going live.`,
        highlight: `📌 Forward-test on demo with a sample large and representative enough for the setup’s frequency and variability. A 50-trade minimum or a 10-percentage-point win-rate difference cannot certify robustness on its own; compare costs, expectancy, drawdown, execution quality and out-of-sample performance before risking capital.`,
      },
    ],
    quiz: [
      { q: `What determines how much backtest data is needed?`, options: ['A fixed minimum of 10 trades', 'A fixed minimum of 50 trades', 'The research question, expected variability, dependence and precision needed; there is no universal threshold', 'A fixed minimum of 500 trades'], answer: 2 },
      { q: `Expectancy in backtesting is calculated as...`, options: ['Win rate × Average R', '(Win rate × Avg R winner) - (Loss rate × Avg R loser)', 'Total wins / Total losses', 'Average R × position size'], answer: 1 },
      { q: `If forward-test results are weaker than backtest results, what is the best response?`, options: ['Trade live anyway because demo results are always different', 'Investigate data definitions, fill/cost assumptions, sampling variation and market conditions; validate any change out of sample', 'Increase position size to compensate', 'Keep changing filters until the backtest improves'], answer: 1 },
    ],
    nextLesson: null,
    prevLesson: { id: 27, title: `Execution & Trade Management` },
  },


  29: {
    id: 29,
    title: `Risk Management Fundamentals`,
    subtitle: `Risk Management Fundamentals: Limiting Exposure and Understanding Losses`,
    level: `Beginner`,
    duration: `18 min read`,
    category: `Risk Management`,
    imageCaption: `Risk controls help define exposure; they do not remove uncertainty or guarantee profits`,
    intro: `Risk management is one important part of a trading plan. A strategy can lose money even when position sizing and stops are used, but weak risk controls can magnify losses or expose an account to risks it cannot tolerate. This lesson covers risk examples and decisions to adapt to the strategy and account.`,
    sections: [
      {
        title: `Why Risk Management Matters More Than Strategy`,
        content: `Risk management determines how a strategy's outcomes affect account survival. Fixed rules and numerical examples are useful only when their assumptions are stated; unsupported percentages are not a substitute for calculation.\n\nRISK-OF-RUIN ESTIMATES:\nThere is no universal probability of ruin based only on a stated risk percentage and win rate. Any estimate depends on starting capital, win/loss distribution, sequence of outcomes, costs, slippage, stake size and the definition of ruin. A simulation should state its assumptions and use representative results.\n\nBREAK-EVEN WIN RATE:\nIf average winners are +3R and average losses are -1R, the gross break-even win rate is 25% before costs: 0.25 × 3R offsets 0.75 × 1R. Changing risk from 1% to 5% changes the dollar size of wins and losses, but does not by itself change the break-even win rate when the payoff ratio is unchanged. Costs and different average outcomes change the calculation.\n\nTHE PSYCHOLOGICAL IMPACT:\nLosing 20% of your account requires a 25% gain just to break even. Losing 50% requires a 100% gain. The deeper the drawdown, the harder the recovery.`,
        highlight: `📌 Risk management does not eliminate the possibility of ruin; it aims to keep planned exposure within account constraints and make losses survivable.`,
      },
      {
        title: `Choosing a Risk Ceiling (1% as One Example)`,
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
        content: `Where you place your stop loss is as important as where you enter. A poorly placed stop can expose a trade to ordinary volatility, spread, slippage or a stop that does not match the setup. A chart alone cannot establish that an algorithm deliberately targeted the stop.\n\nTHE GOLDEN RULE:\nDefine the condition that invalidates the trade idea before entry. Stop placement and position size should follow the tested model and account constraints; no chart level guarantees an exact exit price.\n\nSTOP LOSS RULES BY SETUP:\n\nOrder Block Entry:\n- Bullish OB: A model may use the OB low or a defined nearby level; any buffer should be selected for the instrument and tested rules\n- Bearish OB: A model may use the OB high or a defined nearby level; any buffer should be selected for the instrument and tested rules\n\nFair Value Gap Entry:\n- Bullish FVG: Some models use an FVG boundary or nearby swing as a reference; state the exact invalidation rule\n- Bearish FVG: Some models use an FVG boundary or nearby swing as a reference; state the exact invalidation rule\n\nLiquidity Sweep Entry:\n- A stop beyond the sweep extreme is one possible rule; use the model's defined invalidation and account for distance and execution risk\n\nBUFFER AND EXECUTION:\nIf a buffer is part of your tested setup, define it using the instrument, volatility and execution conditions. A fixed 2-5 pip buffer does not suit every market; more distance can increase planned loss unless position size is adjusted. A buffer cannot guarantee that a trade will avoid a stop-out or that a setup is still valid.`,
        highlight: `📌 Your stop loss is your 'I am wrong' price. A stop limits planned risk but can execute beyond the intended level; it is not possible to know whether the loss would have been smaller later. Do not widen a stop outside the predefined risk plan to avoid realizing a loss; any adjustment should follow documented rules.`,
      },
      {
        title: `Daily, Weekly & Monthly Loss Limits`,
        content: `Some traders set daily, weekly or monthly loss limits as a circuit breaker. Choose thresholds in advance to fit your account constraints and strategy; there is no universal 3% daily, 6% weekly or 10% monthly rule.\n\nA PAUSE RULE:\nIf a pre-set loss limit or repeated rule violation is reached, pause new entries and review the data before resuming. Three consecutive losses alone do not prove that your bias is wrong or the market has changed; check whether each trade followed the model and whether results fit its expected distribution. Likewise, a winning streak by itself is not a reason to increase or cut risk. Avoid changing size based only on short-term outcomes.`,
        highlight: `📌 The market will be here tomorrow. Your account might not be. Protect your capital above all else.`,
      },
    ],
    quiz: [
      { q: `What is a cautious way to choose trade risk while testing a strategy?`, options: ['Use 5% to learn faster', 'Always use 2% because it is a universal rule', 'Increase risk after each loss', 'Choose a small predefined amount that fits account rules and validate in simulation'], answer: 3 },
      { q: `Which evidence should inform a strategy’s minimum risk-to-reward filter?`, options: ['An arbitrary fixed ratio', 'A common social-media recommendation', 'Tested win rate, execution costs, average win/loss and drawdown', 'A grade such as A+ on its own'], answer: 2 },
      { q: `Where should you place your stop loss on a bullish Order Block entry?`, options: ['10 pips below entry', 'Below the OB low', 'At the previous day low', 'At breakeven'], answer: 1 },
      { q: `If a written pause threshold is reached, what is a cautious response?`, options: ['Increase position size to recover', 'Pause new entries and review the written plan', 'Switch to a different strategy', 'Trade a different pair'], answer: 1 },
    ],
    nextLesson: { id: 30, title: `Advanced Risk Management` },
    prevLesson: { id: 28, title: `Backtesting & Model Development` },
  },

  30: {
    id: 30,
    title: `Advanced Risk Management & Position Sizing`,
    subtitle: `Risk Controls, Portfolio Exposure and Drawdown Planning`,
    level: `Intermediate`,
    duration: `22 min read`,
    category: `Risk Management`,
    imageCaption: `Risk decisions benefit from explicit assumptions, calculations and ongoing review`,
    intro: `After studying single-trade risk and stop placement, this lesson covers position-sizing formulas, correlation risk, drawdown responses and the behavioral side of risk management. The 1% rule is one example of a personal or account limit, not a universal requirement.`,
    sections: [
      {
        title: `The Kelly Criterion for ICT Traders`,
        content: `The Kelly formula estimates a growth-maximizing fraction only when its inputs accurately describe a repeatable process. For a simplified binary-outcome model, f = (b × p − q) / b, where b is the average net win per unit lost, p is win probability and q = 1 − p. Real trading involves changing odds, costs, slippage and non-identical outcomes, so the estimate can be very wrong.\n\nILLUSTRATIVE CALCULATION:\nWith p = 0.45, q = 0.55 and average win b = 3R versus a 1R loss, f = (3 × 0.45 − 0.55) / 3 = 0.80 / 3 ≈ 26.7%. This is a theoretical full-Kelly estimate under those assumptions, not a recommendation to risk 26.7% of an account.\n\nFractional Kelly scales the estimate down (for example, one-quarter or one-sixteenth), but a fraction is not automatically safe. Estimation error, small or unrepresentative samples, correlation and drawdowns can make Kelly sizing unsuitable. Do not choose a risk percentage merely because a formula returns it; compare conservative fixed-risk approaches and account restrictions, and validate assumptions before any live use.`,
        highlight: `📌 Kelly sizing depends on reliable estimates of edge and payoff, which are easy to misestimate. Fractional Kelly reduces exposure versus full Kelly but is not a guarantee of sustainability; simpler fixed-risk limits may be more appropriate for many traders.`,
      },
      {
        title: `Correlation and Joint-Loss Risk`,
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
        highlight: `📌 Following a no-trade rule can avoid planned financial exposure when conditions are absent. A missed setup also has opportunity cost, so assess discipline by adherence to the plan rather than judging every missed move afterward.`,
      },
    ],
    quiz: [
      { q: `Which inputs matter most when calculating position risk?`, options: ['Account balance alone', 'A fixed percentage recommended for every account', 'The planned risk cap, stop distance and instrument value, plus costs', 'The setup grade alone'], answer: 2 },
      { q: `What should you consider when holding EURUSD and GBPUSD at the same time?`, options: ['Treat them as unrelated because they are different pairs', 'Consider their correlation and combined exposure before choosing position sizes', 'Automatically risk 0.5% on each pair', 'Increase total risk to 2%'], answer: 1 },
      { q: `How much gain is needed to recover from a 30% drawdown?`, options: ['30%', '43%', '50%', '60%'], answer: 1 },
      { q: `If you reach your predefined drawdown review threshold, which response is appropriate?`, options: ['Increase risk to recover faster', 'Pause new risk and review the plan', 'Trade more pairs to diversify', 'Switch to a new strategy'], answer: 1 },
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
    imageCaption: `Index products have distinct hours, costs, volatility and gap risks; test the rules for the instrument traded`,
    intro: `NAS100 and US30 are popular instruments among ICT traders, but they do not inherently offer cleaner structure, more predictable institutional behavior, or greater profitability than FX. Index futures, CFDs and cash-index products have different trading hours, costs and gap risks. This lesson covers practical features to define and test for the product you actually trade.`,
    sections: [
      {
        title: `How to Compare Indices for ICT`,
        content: `Rather than assuming indices are better, compare the product you trade with your FX alternatives. Index cash-session hours, futures hours, CFD hours, spreads, commissions, volatility and overnight financing can differ materially. Indices can have overnight sessions or gaps depending on the product and broker. Compare the same entry and exit definitions, express outcomes in risk units, and account for fees and slippage; no account-size threshold by itself makes one market more profitable.`,
        highlight: `📌 Indices offer cleaner ICT structure, larger moves, and predictable sessions. Ideal for traders with $5K+ accounts.`,
      },
      {
        title: `NAS100 vs US30: Key Differences`,
        content: `NAS100 (Nasdaq-100) and US30 (Dow Jones Industrial Average) represent different equity-index baskets and can differ in constituent mix, volatility, trading product, hours, spreads and contract specifications. Their relative volatility and correlation vary by period; fixed daily point ranges or a single correlation percentage should not be treated as permanent characteristics.\n\nTo compare them for a strategy, compare the same entry and exit definitions, express outcomes in risk units, and account for fees and slippage. Use the same time windows, position-sizing method and performance measures. Include spread, commission, slippage, funding or overnight costs, gaps and contract-value differences. A setup appearing cleaner on selected chart examples does not establish a higher expectancy. Choose the product based on tested results and execution requirements, not a blanket beginner/advanced label.`,
        highlight: `📌 Compare index products using consistent definitions, realistic costs, contract specifications and representative results rather than fixed volatility or profitability labels.`,
      },
      {
        title: `The Index Opening Range Strategy`,
        content: `The first 30 minutes after the U.S. cash-equity open is a time window some index traders study. A range break may continue, fail, or remain unresolved; the window itself does not establish a high-probability ICT setup. Define the opening range from a consistent data source and New York-time clock, specify entry and invalidation rules, and compare results with other windows, including news days, losing breakouts, costs and slippage.`,
        highlight: `📌 The 9:30–10:00 AM New York opening range is a commonly studied period for indices. Whether a setup in this window has an edge must be tested against a defined baseline.`,
      },
      {
        title: `Index-Specific Risk Management`,
        content: `Risk for an index position depends on the product, broker, contract specification, stop distance, execution and aggregate account exposure.\n\nPOSITION SIZING EXAMPLE (HYPOTHETICAL):\nPlanned dollar risk divided by (stop distance in points × dollar value per point) estimates contract quantity before costs and execution differences. Verify point value and minimum size for the specific futures, CFD or other product; different instruments branded NAS100 or US30 may have different specifications.\n\nGAP AND EVENT RISK:\nDecide in advance how the strategy handles overnight exposure, weekends, earnings and scheduled economic events. Reducing size, closing before selected events or avoiding entries are possible policies, not universal rules; consider whether gaps can bypass a stop.\n\nVOLATILITY ADJUSTMENT:\nIf volatility changes, reassess stop distance, expected slippage and planned loss. Do not mechanically widen a stop by a fixed percentage without recalculating size and testing that adjustment.`,
        highlight: `📌 Size index positions from contract specifications, stop distance, volatility and total account risk. No universal percentage reduction versus forex applies across brokers and instruments.`,
      },
    ],
    quiz: [
      { q: `What should guide position sizing across NAS100 and US30?`, options: ['Account balance alone', 'Volatility, contract specifications, stop distance and total risk', 'Always use smaller size on NAS100', 'Treat both products as identical'], answer: 1 },
      { q: `Which U.S. session period is commonly examined in some index strategies?`, options: ['3 AM New York time', '9:30 AM New York time', '2 PM New York time', '8 PM New York time'], answer: 1 },
      { q: `What should guide correlation estimates for NAS100 and US30?`, options: ['Assume a fixed 85%+ value', 'Use last week’s correlation forever', 'Measure the relationship over the relevant period and assess joint-loss risk', 'Treat all indices as identical'], answer: 2 },
      { q: `What should be planned before an earnings or event-risk period?`, options: ['Increase size', 'Apply a predefined event-risk plan based on exposure and model rules', 'Trade all instruments normally', 'Only trade NAS100'], answer: 1 },
    ],
    nextLesson: { id: 202, title: `ICT for Gold (XAU/USD)` },
    prevLesson: { id: 30, title: `Advanced Risk Management` },
  },

  202: {
    id: 202,
    title: `ICT for Gold (XAU/USD)`,
    subtitle: `Studying Gold with ICT Concepts: Drivers, Sessions and Risk`,
    level: `Intermediate`,
    duration: `24 min read`,
    category: `Commodities`,
    imageCaption: `Gold prices can respond to macroeconomic forces, liquidity, volatility and product-specific execution`,
    intro: `Gold is often treated as a potential safe-haven asset, but it does not always rise during market stress or every inflation scare. Price can respond to real yields, the U.S. dollar, investor demand, central-bank activity, positioning and other factors; relationships can change across periods. ICT-style chart setups are hypotheses to test, not evidence of institutional intent or a substitute for understanding the product's trading hours and costs.`,
    sections: [
      {
        title: `What Drives Gold Prices`,
        content: `Gold prices may respond to real yields, the U.S. dollar, inflation expectations, central-bank activity, risk sentiment and other macroeconomic factors. These relationships are not fixed: they can weaken, change sign over short periods, or be overwhelmed by other news. A single correlation figure should not be presented as constant. ICT traders may overlay structure and chart features on this context, but a catalyst does not guarantee a direction.`,
        highlight: `📌 Gold can respond to rates, the USD, inflation, risk sentiment and other forces. These factors do not make its direction reliably predictable or establish that it is more predictable than another market.`,
      },
      {
        title: `Gold-Specific ICT Adaptations`,
        content: `Gold's range and spread can change sharply around data releases and market transitions. Stop distances, FVG widths and session activity should be measured from the product and timeframe you trade rather than set from universal pip ranges. Broker quote conventions also affect what a pip means for XAU/USD. The London fix and U.S. data windows are potential times to study, not guarantees of predictable volatility or direction.`,
        highlight: `📌 Gold's stop distances and session behavior vary by quote convention, broker, timeframe and market conditions. Define the instrument's units and test session windows rather than assuming a universal stop width or key time.`,
      },
      {
        title: `The Gold Safe-Haven Setup`,
        content: `This is one gold setup hypothesis discussed in ICT-style trading. Its frequency and performance depend on exact definitions and market conditions, so do not treat it as the highest-probability setup.\n\nCONTEXT (Daily/4H):\n- Stock market is selling off (S&P 500 down 1%+) OR\n- Geopolitical tensions are rising OR\n- Inflation data surprised to the upside\n- DXY is weakening (below key support)\n\nSTRUCTURE (1H/4H):\n- Gold is in bullish market structure (HH/HL)\n- Price is in discount zone of daily dealing range\n- BSL is visible above recent highs\n- SSL has been swept recently\n\nENTRY (15M/5M):\n- Wait for price to return to a bullish PD array\n- Enter during London or NY killzone\n- Define the stop from the setup's tested invalidation rule; measure the distance in the product's quoted price units and size accordingly\n- Choose a target from the predefined exit rule; calculate R from the actual entry, stop and target rather than assuming a fixed multiple\n\nEXAMPLE:\n- Entry: $1,920 at daily OB\n- Stop: $1,895 (a $25.00 price-distance from the $1,920 entry; verify the broker's XAU/USD quote units rather than treating this as a universal pip distance)\n- Target 1: $1,970 (BSL -- 2R)\n- Target 2: $2,000 (next BSL -- 3.2R)\n\nDo not assume a fixed annual frequency or return multiple. Record every qualifying setup, including losses and missed or invalidated signals, before estimating performance.`,
        highlight: `📌 Treat the safe-haven pattern as a hypothesis to test; do not assume a fixed number of occurrences per year or a guaranteed R multiple.`,
      },
    ],
    quiz: [
      { q: `How should the relationship between gold and the U.S. dollar (DXY) be treated?`, options: ['It is always negative and works as a standalone signal', 'It has often been negative over some periods, but varies and can sometimes turn positive', 'There is no relationship in any period', 'Gold always follows DXY exactly one session later'], answer: 1 },
      { q: `When do the LBMA Gold Price auctions commence?`, options: ['08:00 and 12:00 London time', '10:30 and 15:00 London time', '12:00 and 16:00 London time', 'One auction at 10:00 GMT'], answer: 1 },
      { q: `How should FVG size be defined when studying XAU/USD?`, options: ['Use a fixed 1–2 pips on every broker', 'Use a consistent product-specific price/tick convention, then measure outcomes with costs and market conditions', 'Assume gold FVGs are always 20–30 pips', 'Assume an FVG must be at least 50 pips'], answer: 1 },
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
    imageCaption: `Crypto trades around the clock on many venues, but liquidity, costs and market behavior still vary`,
    intro: `Many crypto spot markets trade around the clock, but exchange maintenance, outages, liquidity shifts and product-specific trading hours can still affect access and execution. Around-the-clock availability does not remove session-based behavior, gaps in liquidity or event risk. This module discusses how to define and test ICT-style rules while accounting for exchange, custody, volatility and leverage risks.`,
    sections: [
      {
        title: `Applying ICT Concepts in Crypto Markets`,
        content: `Crypto markets trade around the clock, but liquidity, spread, volatility and price structure vary by asset, exchange and period. The presence of large holders or retail sentiment cannot be inferred reliably from a candlestick pattern alone, and 24/7 trading does not make ICT setups inherently cleaner or more profitable. Define the venue, pair, time zone, fees, funding costs, stop rule and exit conditions, then compare with a baseline.`,
        highlight: `📌 Crypto trades 24/7, but structure, costs and volatility vary. Size positions to a predefined risk limit and test session filters before relying on them.`,
      },
      {
        title: `Adapting ICT Killzones for Crypto`,
        content: `Some traders examine whether crypto activity changes around traditional Asian, London and New York hours. Because crypto trades 24/7 and venues differ, those session labels should be tested rather than treated as universal killzones. Use UTC or a clearly defined local time zone, handle daylight-saving changes, and compare the same setup across sessions. Avoid assigning a move to a specific country's institutional activity or assuming that the Asian session sets the day's direction.`,
        highlight: `📌 These are example windows some traders study, not universal crypto killzones. State the timezone and daylight-saving rule, then compare outcomes across windows and valid no-trade periods.`,
      },
      {
        title: `Crypto-Specific Risk Management`,
        content: `Crypto products can have substantial volatility, variable liquidity, funding costs and liquidation mechanics. No single leverage cap or stop-width band is suitable for every asset, exchange or strategy.\n\nPOSITION AND LEVERAGE RISK:\nChoose exposure from a predefined account-risk limit, the instrument's contract rules, entry/stop distance, maintenance margin and possible liquidation price. Leverage magnifies losses relative to account equity and may cause liquidation before a planned stop can execute; a high-confidence label does not remove that risk.\n\nSTOP PLACEMENT:\nDefine invalidation from the setup and size the position to fit the planned risk. Percentage stops can be one way to express a rule, but a fixed percentage may not match volatility or market structure for every crypto asset. Include spread, slippage, funding and exchange-specific execution behavior.\n\nCUSTODY AND VENUE RISK:\nEvaluate exchange counterparty risk, outages, withdrawal rules, security controls and custody needs. Enable account security protections and consider the tradeoffs between exchange-held funds and self-custody; there is no universal allocation percentage that eliminates custody risk. Set a portfolio limit based on the amount you can afford to lose.`,
        highlight: `📌 Crypto volatility and liquidity vary by asset and venue. Use position sizing and invalidation rules suited to the specific market; fixed stop-width bands or a blanket leverage cap are not universally suitable. Consider counterparty and custody risk when choosing where to hold assets.`,
      },
      {
        title: `The Bitcoin Halving Cycle Strategy`,
        content: `Bitcoin halvings reduce the block subsidy at protocol-defined block intervals. The market response is uncertain; the event does not guarantee an accumulation range, a bull run, a specific return, or a predictable bear-market timetable.\n\nSome market commentary describes phases before or after a halving, but those labels are retrospective hypotheses unless precise dates, price conditions and outcomes are defined in advance. Do not assume large holders are accumulating or that reduced issuance alone determines price direction.\n\nIf you study a halving-related strategy, specify the observation window, entry, exit, maximum holding period and invalidation, then compare the results with a baseline and a larger sample of market conditions. A calendar event is not a standalone entry signal.`,
        highlight: `📌 Halving-related phases are market hypotheses, not a fixed cycle. Define rules and compare outcomes with a baseline before using the event in a strategy.`,
      },
    ],
    quiz: [
      { q: `How should leverage be chosen for a crypto trading model?`, options: ['Use 10x on every trade', 'Stay within defined risk limits and account for volatility and liquidation distance', 'Use 20x for higher-confidence setups', 'Use 50x for Bitcoin only'], answer: 1 },
      { q: `What triggers a Bitcoin halving?`, options: ['A calendar date every year', 'A price decline of 50%', 'A block-subsidy reduction every 210,000 blocks, roughly four years at expected block times', 'A vote by major exchanges'], answer: 2 },
      { q: `How should a session window be selected for crypto swing entries?`, options: ['Always choose London', 'Always choose New York', 'Test relevant sessions with the same entry, exit and cost rules', 'Enter only on weekends'], answer: 2 },
      { q: `What should determine a Bitcoin stop distance?`, options: ['Use 1–2% on every trade', 'Define invalidation, account for volatility/execution, then size the position', 'Always use 8–10%', 'Use 15–20% because crypto is volatile'], answer: 1 },
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
    intro: `Risk management affects how a strategy's wins, losses, costs and drawdowns influence account equity. Risk controls cannot guarantee profitability or prevent every large loss, but they can define exposure and help keep a plan within the trader's stated limits. This lesson covers sizing, exit assumptions and examples to adapt to the strategy and account.`,
    sections: [
      {
        title: `The #1 Rule: Protect Your Capital`,
        content: `Risk policy should set a maximum planned loss that fits the account's constraints and the trader's ability to tolerate drawdown. A stop does not guarantee the exact exit price, especially during gaps or fast markets, so planned risk and realized loss can differ.\n\nILLUSTRATIVE DRAWDOWN MATH:\nAssume each losing trade reduces the remaining account equity by a fixed percentage, with no deposits, costs or other effects. After 10 consecutive losses:\n• At 10% of remaining equity per loss, equity is about 34.9% of the starting balance (about a 65.1% drawdown).\n• At 5%, equity is about 59.9% of the starting balance (about a 40.1% drawdown).\n• At 2%, equity is about 81.7% of the starting balance (about an 18.3% drawdown).\n• At 1%, equity is about 90.4% of the starting balance (about a 9.6% drawdown).\n\nThe gain needed to recover from a drawdown is larger than the loss percentage: for example, recovering from a 40.1% drawdown requires roughly a 67% gain on the reduced balance. These are mathematical illustrations, not forecasts or recommended risk percentages; real results include varying outcomes, costs, slippage and possible gaps.`,
        highlight: `📌 Per-trade risk limits vary by strategy and account constraints. A percentage alone does not make a trader professional; consistent execution, transparent performance data and bounded drawdown matter.`,
      },
      {
        title: `Position Sizing: The Formula`,
        content: `For a product quoted in pips, a common position-sizing estimate divides planned monetary risk by stop distance multiplied by the pip value per lot. Contract specifications, account currency, costs and slippage matter, so verify the calculation for the specific instrument.\n\nThe Formula:\nPosition Size = (Account Risk $) / (Stop Loss in Pips x Pip Value)\n\nExample:\n- Account: $10,000\n- Risk per trade: 1% = $100\n- Stop loss: 20 pips on EURUSD\n- Pip value: $10 per standard lot\n\nPosition Size = $100 / (20 x $10) = 0.5 standard lots = 5 mini lots\n\nNever guess your position size. Always calculate it before entering the trade. Most trading platforms have position size calculators -- use them every single time.`,
        highlight: `📌 Calculate position size BEFORE every trade. Never trade based on feeling.`,
      },
      {
        title: `The Risk-Reward Ratio (R:R)`,
        content: `The risk-reward ratio measures planned gain relative to planned loss. No single minimum ratio fits every strategy; the useful filter depends on the observed win rate, average win/loss, costs and drawdown.\n\nGROSS BREAK-EVEN EXAMPLES (BEFORE COSTS):\n• With +1R wins and -1R losses, the gross break-even win rate is 50%.\n• With +2R wins and -1R losses, it is about 33.3%.\n• With +3R wins and -1R losses, it is 25%.\n\nThese are arithmetic examples assuming the stated average outcomes occur consistently; commissions, spread, slippage, partial exits and variation in realized R change the required win rate. Select and test the R:R filter against the full strategy rather than treating 1:3 or 1:2 as a universal gate.`,
        highlight: `📌 Choose an acceptable risk-to-reward profile from tested win rate, execution costs, average win and loss, and drawdown. Do not assign a ratio solely from a subjective A+ label.`,
      },
      {
        title: `Setting Stop Losses Like a Pro`,
        content: `Stops can define the price or condition that invalidates a setup, but they may fill at a worse price during gaps, low liquidity or fast markets. A stop order does not guarantee the amount lost.\n\nPOSSIBLE STOP-PLACEMENT PROCESS:\n1. Define the setup's invalidation condition using a rule that can be applied before the outcome.\n2. Choose the stop level that represents that invalidation under the tested model.\n3. Calculate position size from the stop distance, contract value, planned account risk and costs.\n4. Review gap and slippage risk for the instrument and venue.\n\nA fixed pip distance may not fit every setup, but a structural stop also needs a written definition. Avoid moving stops farther away just to avoid realizing a loss, and avoid changing the stop distance merely to force a desired position size.`,
        highlight: `📌 Place stops at technical invalidation, not at random distances. Adjust position size, not stop distance.`,
      },
      {
        title: `Daily, Weekly & Monthly Loss Limits`,
        content: `Some traders use circuit breakers to stop new entries after a pre-defined level of losses or repeated rule violations. Daily, weekly and monthly thresholds are personal or account-policy choices, not universal recommendations.\n\nWhen a limit is reached, follow the written review procedure: pause new risk, assess open positions according to the plan, review execution and costs, and resume only when your criteria are met. Three consecutive losses do not prove the bias is wrong or that market conditions have changed; inspect the trades against the model and compare with expected variance before deciding what to change.`,
        highlight: `📌 A daily stop or pause after consecutive losses can help limit uncontrolled trading, but its threshold should fit your strategy and account rather than be treated as universal.`,
      },
    ],
    quiz: [
      { q: `What should determine the risk you take on a single trade?`, options: ['A universal percentage used by all ICT traders', 'A predefined cap grounded in tested performance, account rules and total exposure', 'The size of your previous win', 'The setup label alone'], answer: 1 },
      { q: `What should guide a strategy’s minimum risk-to-reward filter?`, options: ['A fixed rule every setup must meet', 'A preferred social-media ratio', 'Tested win rate, execution costs, average win/loss and drawdown', 'The setup label alone'], answer: 2 },
      { q: `What should happen when your predefined daily pause rule is reached?`, options: ['Increase position size', 'Pause new entries and review the plan', 'Switch strategies without reviewing', 'Trade a different pair'], answer: 1 },
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
        content: `Portfolio heat is an estimate of planned loss if the stops on open positions are reached under the stated sizing assumptions. It can be calculated by summing those planned stop risks, while also considering correlated outcomes, gaps, slippage and changes in equity. A portfolio cap should fit your account rules and risk capacity; there is no universal 6% maximum.\n\nEXAMPLE:\nPosition 1 has a planned stop risk of 2% of account equity.\nPosition 2 has a planned stop risk of 1.5%.\nPosition 3 has a planned stop risk of 2%.\nThe sum of these planned stop risks is 5.5% before execution differences, gaps or other exposure. This is an illustrative calculation, not a recommended portfolio limit.\n\nBefore adding another position, reassess the total planned stop risk and plausible joint-loss scenarios. Summing stop risk is useful, but it does not perfectly predict a portfolio loss when markets move together or stops execute away from their levels.`,
        highlight: `📌 Track aggregate open-position risk, correlations and gap risk. Set an exposure ceiling that fits your account and strategy; a fixed 6% figure is not suitable for everyone.`,
      },
      {
        title: `Correlated Pairs: Hidden Risk`,
        content: `Correlated positions can create concentrated exposure because losses may occur together, but correlation is not fixed and does not translate directly into a single portfolio-risk multiplier. Relationships vary by measurement period, timeframe and market regime.\n\nWhen holding positions such as EURUSD and GBPUSD, account for each position's stop risk separately and then consider the possibility of joint losses, changes in correlation, gaps and slippage. Do not assume an 80% or 90% correlation means a fixed reduction or increase in risk.\n\nPortfolio rules may limit the number or size of correlated positions, but they should be calibrated to the instruments, account constraints and tested strategy. SMT or relative-strength observations can be a hypothesis to test; they do not guarantee that one market will lead or that the other will reverse.`,
        highlight: `📌 Correlated positions can concentrate exposure, but correlation is time-varying. Assess planned stop risk and joint-loss scenarios instead of using a fixed multiplier.`,
      },
      {
        title: `Scaling In and Out of Positions`,
        content: `Scaling into or out of positions changes exposure and the distribution of realized wins and losses. Adding to a winning position does not automatically protect capital, and adding to losing positions is not universally wrong or right outside a defined model; either choice must be specified and tested.\n\nIf your strategy permits scaling in, define the trigger for each add, the stop and exit for each position, and the maximum combined planned loss before placing orders. Recalculate total exposure after every add and account for correlated positions, gaps and execution costs. A stop moved to breakeven does not guarantee a risk-free result.\n\nPartial closes are also a strategy choice. A 50% exit at 1:2 does not guarantee profit on the full trade or account; results depend on the entry, realized fill, cost, remaining-position stop and subsequent exit. Compare partial-exit schedules with a full-position baseline using the same signals and costs.`,
        highlight: `📌 Scaling, partial exits and trailing stops are strategy choices. Define them before testing and compare the results; do not assume one management sequence fits all instruments.`,
      },
      {
        title: `The Kelly Criterion for Optimal Risk`,
        content: `The Kelly Criterion is one model for estimating a growth-maximizing fraction when the return distribution and edge are known accurately. Its output is extremely sensitive to estimation error and may be inappropriate when outcomes are nonstationary, correlated or poorly measured.\n\nFORMULA FOR A SIMPLIFIED TWO-OUTCOME MODEL:\nf = (p × b − q) / b, where p is the win probability, q = 1 − p, and b is the average net win measured in units of the average loss.\n\nHYPOTHETICAL EXAMPLE:\nWith p = 0.40, q = 0.60, average win = 3R and average loss = 1R, f = (0.40 × 3 − 0.60) / 3 = (1.20 − 0.60) / 3 = 0.20 or 20% full Kelly under these assumptions. This mathematical output is not a recommendation to risk 20% on a trade.\n\nFractional Kelly simply scales the estimate down, but quarter, half or other fractions are not automatically safe or suitable. Validate the inputs, account for costs and correlation, and compare with conservative fixed-risk limits; if the edge is uncertain, do not rely on Kelly output for live sizing.`,
        highlight: `📌 Full Kelly can be very sensitive to estimation error and produce large drawdowns. Fractional approaches are one option, not a universal rule; use conservative exposure limits and test assumptions carefully.`,
      },
      {
        title: `Risk Management Checklist`,
        content: `PRE-TRADE CHECKLIST (ADAPT TO YOUR STRATEGY):\n- Confirm the scenario and required entry conditions are defined and observable.\n- Mark stop, target and invalidation before entry.\n- Calculate size from planned risk, stop distance, instrument value and execution costs.\n- Check aggregate exposure, including positions that may be correlated.\n- Confirm the order type and slippage assumptions fit the model.\n- Record the setup and the reason for any no-trade decision.\n\nPOST-TRADE REVIEW:\n- Record entry, exit, result and execution costs.\n- Note whether rules were followed and classify any errors.\n- Review wins and losses using the same criteria.\n- Update performance statistics when the sample is sufficient and uncertainty is reported.\n\nA checklist can reduce omissions, but no fixed risk percentage, payoff ratio, portfolio-heat threshold or checklist duration guarantees safety. Tailor it to your tested strategy and account constraints.`,
        highlight: `📌 A short pre-trade checklist can reduce omissions. Tailor it to observable entry, stop, target, risk and invalidation rules rather than treating a fixed duration as a measure of professionalism.`,
      },
    ],
    quiz: [
      { q: `What does portfolio heat estimate?`, options: ['Only the latest trade’s risk', 'Combined planned exposure across open positions, including correlated risk', 'The daily profit target', 'The amount of margin available'], answer: 1 },
      { q: `Which statement about correlation risk is most accurate?`, options: ['Correlation stays fixed at one percentage', 'Correlation can change, so assess relevant data and combined exposure', 'Different tickers never correlate', 'Correlation alone reveals exact portfolio risk'], answer: 1 },
      { q: `When should a trader scale into a position?`, options: ['Whenever it is losing', 'Only when a predefined, tested rule calls for scaling', 'Immediately after the initial entry', 'Never under any strategy'], answer: 1 },
      { q: `What should guide the percentage closed at a partial target?`, options: ['Always close 25%', 'A predefined, tested exit plan', 'Always close 75%', 'Always close the entire position'], answer: 1 },
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
    imageCaption: `Trading psychology affects decisions, but its impact varies by person and context`,
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
