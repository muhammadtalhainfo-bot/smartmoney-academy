export const SEO_PAGES = [
  {
    slug:'what-is-ict-trading',
    title:'What Is ICT Trading? A Beginner-Friendly Guide',
    meta:'Learn what ICT trading means, how the methodology is structured, and how concepts such as market structure, liquidity, FVGs and time-based models fit together.',
    category:'Beginners',
    description:'A plain-English introduction to ICT trading and the main concepts beginners encounter.',
    intro:'ICT trading refers to a methodology associated with Michael J. Huddleston, known online as The Inner Circle Trader. The framework uses concepts including market structure, liquidity, fair value gaps, order blocks, premium/discount and time-based models. ICT Flow presents these ideas as an educational framework—not as a guarantee of trading results.',
    sections:[
      ['What does ICT mean?','ICT commonly refers to Inner Circle Trader, the educational brand associated with Michael J. Huddleston. Traders who follow the methodology use a vocabulary for describing price structure, liquidity, imbalances and time-of-day behavior.'],
      ['Core ICT concepts','A beginner usually encounters market structure first, followed by liquidity, displacement, fair value gaps (FVGs), order blocks, premium/discount and session timing. These concepts are often combined into a specific trade model rather than used as isolated signals.'],
      ['How a typical workflow looks','A common educational workflow is to establish higher-timeframe context, mark relevant highs/lows and liquidity, wait for a setup during a chosen session, then define an entry, invalidation level and target before risking capital. The exact rules vary between ICT models and individual traders.'],
      ['Does ICT guarantee profits?','No trading methodology guarantees profits. Chart interpretation can be subjective, and a setup that looks compelling in hindsight may behave differently in live markets. Backtesting, forward testing, position sizing and a written trading plan are essential.'],
    ],
    related:['ict-market-structure','ict-liquidity','fair-value-gap-trading','ict-risk-management']
  },
  {
    slug:'ict-market-structure',
    title:'ICT Market Structure: BOS, CHOCH and MSS Explained',
    meta:'Understand ICT market structure, including higher highs, lower lows, Break of Structure, CHOCH and Market Structure Shift, with a practical top-down workflow.',
    category:'Core Concepts',
    description:'Understand the structure language used throughout ICT trading.',
    intro:'Market structure is the study of how price forms successive highs and lows. In ICT education, structure is often used to describe directional context and potential changes in that context.',
    sections:[
      ['Higher highs and higher lows','A sequence of higher highs (HH) and higher lows (HL) is commonly described as bullish structure. Lower highs (LH) and lower lows (LL) describe bearish structure. These labels describe what price has already done; they do not guarantee what it will do next.'],
      ['Break of Structure (BOS)','BOS is commonly used for a break of a relevant prior swing in the direction of the existing structure. Traders use it as evidence of continuation within their chosen framework. The exact swing selected matters, so the rule should be defined before testing.'],
      ['CHOCH and MSS','CHOCH (Change of Character) and MSS (Market Structure Shift) are terms used for a meaningful change against the prior short-term structure. Different educators use the terms differently, so a trading plan should state exactly which swing must break and whether a candle close is required.'],
      ['Top-down use','One practical workflow is to use a higher timeframe for broad context and a lower timeframe for execution. Avoid changing the definition of a swing after seeing the outcome; that creates hindsight bias.'],
    ],
    related:['what-is-ict-trading','ict-liquidity','ict-order-block','how-to-backtest-ict']
  },
  {
    slug:'ict-liquidity',
    title:'ICT Liquidity: Buy-Side, Sell-Side and Liquidity Sweeps',
    meta:'Learn how ICT traders define liquidity, including buy-side liquidity, sell-side liquidity, equal highs, equal lows and liquidity sweeps.',
    category:'Core Concepts',
    description:'A practical explanation of liquidity terminology used in ICT and SMC trading.',
    intro:'Liquidity is one of the most-used terms in ICT and Smart Money Concepts. In the framework, traders mark areas around obvious highs and lows where orders may be concentrated and then study how price interacts with those areas.',
    sections:[
      ['Buy-side and sell-side liquidity','Buy-side liquidity (BSL) is commonly marked above prominent highs, while sell-side liquidity (SSL) is commonly marked below prominent lows. These labels describe locations on a chart; they do not prove who placed every order there.'],
      ['Equal highs and equal lows','Repeated or closely matched highs can be treated as a visible area of potential buy-side liquidity, while repeated lows can be treated as potential sell-side liquidity. The important skill is defining a consistent rule for what counts as equal.'],
      ['What is a liquidity sweep?','A liquidity sweep describes price moving through a previously marked high or low and then reacting. Traders often look for additional confirmation after the sweep rather than treating the sweep alone as an entry signal.'],
      ['Avoiding the common mistake','Do not assume every wick is a stop hunt or that every sweep must reverse. Record the setup conditions before the outcome and test them over a meaningful sample.'],
    ],
    related:['what-is-ict-trading','ict-market-structure','fair-value-gap-trading','ict-silver-bullet']
  },
  {
    slug:'fair-value-gap-trading',
    title:'Fair Value Gap (FVG) Trading: ICT Explanation',
    meta:'Learn what a Fair Value Gap is in ICT trading, how the three-candle imbalance is identified, and how traders use FVGs within a broader setup.',
    category:'Core Concepts',
    description:'Understand bullish and bearish FVGs and how they fit into an ICT trading plan.',
    intro:'A Fair Value Gap (FVG) is commonly described in ICT education as a three-candle imbalance where the first and third candles do not overlap across the relevant wicks. Traders use the zone as one piece of a broader price-action setup.',
    sections:[
      ['Bullish FVG','A commonly used bullish FVG occurs when the low of the third candle is above the high of the first candle, leaving an intervening price area. Traders may mark that area and observe how price reacts if it returns.'],
      ['Bearish FVG','A bearish FVG is the inverse: the high of the third candle is below the low of the first candle. The resulting area is marked as an imbalance zone.'],
      ['FVG is not a complete strategy','An FVG by itself does not tell you direction, risk, position size or target. ICT traders often combine it with higher-timeframe context, liquidity, displacement and a defined invalidation point.'],
      ['Testing FVG ideas','If you want to test an FVG model, define the exact timeframe, entry rule, invalidation, session, target and maximum risk before collecting results. This makes the test repeatable instead of selecting only attractive historical examples.'],
    ],
    related:['ict-liquidity','ict-market-structure','ict-silver-bullet','how-to-backtest-ict']
  },
  {
    slug:'ict-order-block',
    title:'ICT Order Blocks Explained: What They Are and How Traders Use Them',
    meta:'Learn the ICT order block concept, how traders identify bullish and bearish order blocks, and why context and invalidation rules matter.',
    category:'Core Concepts',
    description:'A practical guide to the order block concept without treating it as a guaranteed institutional signal.',
    intro:'An order block is a chart concept used in ICT and related Smart Money Concepts education. Traders generally identify a candle or small area before an impulsive move and study whether price later reacts from that area.',
    sections:[
      ['Bullish and bearish order blocks','A bullish order block is commonly associated with the last bearish candle or bearish area before an upward displacement. A bearish order block is commonly associated with the last bullish candle or area before downward displacement. Exact definitions differ across educators.'],
      ['Context matters','An order block becomes part of a trading idea only when the trader has defined context, such as market structure, liquidity and a directional hypothesis. Marking every opposite-color candle creates too many zones to be useful.'],
      ['Define invalidation first','Before entry, decide what price action would invalidate the setup. A zone that is continually redefined after price moves against it cannot be tested objectively.'],
      ['Order blocks and FVGs','Some traders use an order block together with a nearby FVG or displacement leg. Treat these as confluence rules to be tested, not as proof that an institution placed a specific order at that exact candle.'],
    ],
    related:['fair-value-gap-trading','ict-liquidity','ict-market-structure','how-to-backtest-ict']
  },
  {
    slug:'ict-silver-bullet',
    title:'ICT Silver Bullet Strategy: Time Windows, FVG and Rules',
    meta:'Understand the ICT Silver Bullet model, its time-window concept, liquidity context, displacement and Fair Value Gap entry structure.',
    category:'Models',
    description:'A focused guide to the Silver Bullet model and how to turn its concepts into testable rules.',
    intro:'The ICT Silver Bullet is a time-based trading model associated with the ICT methodology. Public explanations commonly describe one-hour windows in New York time and combine a liquidity event, displacement and an FVG-based entry. Session times should always be converted using the correct New York daylight-saving date.',
    sections:[
      ['The time-window idea','The commonly cited Silver Bullet windows are 3:00–4:00 AM, 10:00–11:00 AM and 2:00–3:00 PM New York time. The exact clock displayed by a platform can differ because of timezone and daylight-saving settings, so traders should verify their chart timezone.'],
      ['The setup sequence','A commonly taught sequence is: establish context and a liquidity objective, observe the chosen time window, wait for displacement, identify an FVG created by that move, and consider an entry on a retracement according to the trader’s rules.'],
      ['What not to assume','A time window does not make every FVG a Silver Bullet setup. Likewise, a sweep does not guarantee a reversal. The setup needs explicit conditions that can be recorded and tested.'],
      ['Backtesting the model','Keep the window, instrument, timeframe, entry, stop, target and trade-management rules fixed during a test. Record skipped setups as well as taken setups so the sample is not selectively curated.'],
    ],
    related:['fair-value-gap-trading','ict-liquidity','how-to-backtest-ict','ict-risk-management']
  },
  {
    slug:'how-to-backtest-ict',
    title:'How to Backtest an ICT Trading Strategy',
    meta:'Learn a repeatable process for backtesting ICT setups, defining rules, recording samples, measuring results and avoiding hindsight bias.',
    category:'Process',
    description:'Turn an ICT idea into measurable rules before risking real money.',
    intro:'Backtesting is the process of applying a defined trading rule set to historical market data and recording the outcomes. For ICT setups, the biggest challenge is turning discretionary chart language into rules that can be applied consistently.',
    sections:[
      ['1. Write the setup as rules','Specify instrument, timeframe, session, directional filter, liquidity condition, entry trigger, stop placement, target and trade-management rules. If a rule contains words like “looks strong,” define what that means.'],
      ['2. Fix the sample','Choose a date range and test every eligible setup in sequence. Do not stop after a few attractive winners. A larger consecutive sample gives you more information about variation in outcomes.'],
      ['3. Track more than win rate','Record number of trades, wins, losses, average R, largest losing streak, drawdown and results by session or setup type. Win rate alone does not determine whether a strategy has positive expectancy.'],
      ['4. Separate development from validation','Use one historical period to develop the rules and a different period to test them. Changing rules after seeing validation results weakens the test.'],
      ['5. Forward test before scaling','A historical result is not a promise of future performance. Demo or very small-risk forward testing can reveal execution, spread, slippage and discipline problems that a clean chart review misses.'],
    ],
    related:['ict-risk-management','fair-value-gap-trading','ict-silver-bullet','ict-market-structure']
  },
  {
    slug:'ict-2022-model',
    title:'ICT 2022 Model Explained: A Practical Guide',
    meta:'Learn the core ideas commonly associated with the ICT 2022 model, including liquidity, displacement, market structure and FVG-based execution.',
    category:'Models',
    description:'A practical, test-focused introduction to the ICT 2022 model.',
    intro:'The ICT 2022 model is a trading model associated with the ICT methodology. Explanations can vary, so this guide focuses on the commonly described sequence and emphasizes defining each condition before backtesting.',
    sections:[
      ['Core idea','A commonly taught sequence combines directional context, a liquidity event, a market-structure shift or displacement, and an entry around a Fair Value Gap or related price-delivery concept.'],
      ['Define the liquidity event','Decide in advance which high or low qualifies as the liquidity reference. Avoid changing the reference after seeing the outcome.'],
      ['Define the entry','Write down the exact confirmation, FVG condition, stop placement and target before testing. This turns a visual idea into a repeatable model.'],
      ['Backtest before risking capital','Record every qualifying setup across a fixed sample. Measure win rate, average R, drawdown and rule adherence rather than judging the model from a few attractive examples.'],
    ],
    related:['ict-market-structure','ict-liquidity','fair-value-gap-trading','how-to-backtest-ict']
  },
  {
    slug:'ict-vs-smc',
    title:'ICT vs SMC: What Is the Difference?',
    meta:'Compare ICT and Smart Money Concepts terminology, overlap, differences in teaching style, and how traders can define their own rules.',
    category:'Beginners',
    description:'Understand where ICT and SMC concepts overlap and where terminology can differ.',
    intro:'ICT and Smart Money Concepts (SMC) share many chart concepts, including liquidity, market structure, order blocks and Fair Value Gaps. The labels and exact rules can differ between educators, so terminology should not be treated as universal.',
    sections:[
      ['Where they overlap','Both communities commonly discuss liquidity, structure, imbalances, order blocks and price reactions around significant highs and lows.'],
      ['Why terminology differs','Terms such as BOS, CHOCH, MSS and order block can have different definitions depending on the educator. A written trading plan should define the version being tested.'],
      ['ICT-specific terminology','ICT education includes a broader vocabulary around concepts such as Killzones, Silver Bullet, IPDA and specific time-and-price models.'],
      ['How to study both','Learn the definition used by your chosen source, then test the rule consistently. Avoid mixing definitions from multiple educators without documenting the change.'],
    ],
    related:['what-is-ict-trading','ict-market-structure','ict-order-block','how-to-backtest-ict']
  },
  {
    slug:'ict-trading-plan',
    title:'How to Build an ICT Trading Plan',
    meta:'Create a structured ICT trading plan covering markets, sessions, bias, entry rules, risk limits, journaling and review.',
    category:'Process',
    description:'Turn ICT concepts into a written and testable trading plan.',
    intro:'An ICT trading plan should convert concepts into explicit decisions: what you trade, when you trade, what qualifies as a setup, how much you risk and when you stay out.',
    sections:[
      ['Choose your market and session','Limit the initial test to a defined instrument, session and timeframe. Narrow rules make performance easier to measure.'],
      ['Define the setup','Write the required context, liquidity condition, confirmation, entry trigger, invalidation and target. Avoid discretionary phrases that cannot be measured.'],
      ['Set risk rules','Define maximum risk per trade, daily loss limits, maximum simultaneous exposure and conditions that require stopping for the day.'],
      ['Review and improve','Journal every eligible setup, including skipped trades. Change one rule at a time and validate the change on a new sample before adopting it.'],
    ],
    related:['what-is-ict-trading','ict-risk-management','how-to-backtest-ict','ict-2022-model']
  },
  {
    slug:'nas100-ict-strategy',
    title:'NAS100 ICT Trading: A Framework for Studying the Index',
    meta:'Learn how traders apply ICT concepts to NAS100, including session timing, liquidity, volatility and risk considerations.',
    category:'Markets',
    description:'An educational framework for studying NAS100 with ICT concepts.',
    intro:'NAS100 is an index instrument that can exhibit substantial intraday movement. ICT concepts can be applied to it, but instrument behavior, broker specifications, spreads and execution conditions should be included in any test.',
    sections:[
      ['Start with context','Mark higher-timeframe structure, significant highs and lows, and the liquidity areas relevant to the session you plan to trade.'],
      ['Use session timing','Choose a specific New York or other session window and keep it fixed during testing. Session definitions should account for New York daylight-saving changes.'],
      ['Account for volatility','Large moves can increase slippage and stop distance requirements. Position size should be calculated from the predefined monetary risk and stop distance.'],
      ['Test the exact rules','Do not assume an ICT setup behaves identically across markets. Compare NAS100 results separately from forex, gold or crypto results.'],
    ],
    related:['ict-liquidity','ict-market-structure','ict-risk-management','how-to-backtest-ict']
  },
  {
    slug:'xauusd-ict-trading',
    title:'XAUUSD ICT Trading: Gold, Sessions and Risk',
    meta:'Learn how traders study gold with ICT concepts, including liquidity, session timing, volatility and position sizing.',
    category:'Markets',
    description:'An educational guide to applying ICT concepts to XAUUSD.',
    intro:'XAUUSD refers to gold priced in US dollars. Gold can experience sharp intraday moves, so applying an ICT framework requires attention to volatility, execution and risk as well as chart structure.',
    sections:[
      ['Map the important levels','Mark higher-timeframe highs and lows, liquidity references and relevant price-delivery zones before looking for an entry.'],
      ['Study the session','Choose a defined session window and record how the setup behaves during that period. Do not assume a model transfers unchanged between sessions.'],
      ['Control position size','Calculate position size from your maximum monetary risk and the distance to invalidation. Gold volatility can make fixed lot sizes inappropriate.'],
      ['Keep a separate sample','Track XAUUSD results separately so its behavior does not get mixed with results from other instruments.'],
    ],
    related:['ict-liquidity','ict-risk-management','how-to-backtest-ict','ict-silver-bullet']
  },
  {
    slug:'ict-risk-management',
    title:'ICT Trading Risk Management: Position Size, Stops and R-Multiples',
    meta:'Learn the risk-management principles that should sit underneath any ICT trading plan, including position sizing, invalidation, R-multiples and drawdown control.',
    category:'Risk Management',
    description:'A practical risk framework for traders using ICT or other discretionary strategies.',
    intro:'Risk management is independent of whether a trader uses ICT, price action, indicators or another methodology. A trading idea needs a defined invalidation point and position size before the order is placed.',
    sections:[
      ['Risk per trade','Choose a fixed maximum loss as a percentage or fixed amount of account equity. The appropriate level depends on the trader and account; there is no universal percentage that guarantees safety.'],
      ['Position size from the stop','Position size should be calculated from the amount you are willing to lose and the distance to the invalidation point. A tighter stop should not automatically mean a larger position if the market structure does not justify the tighter invalidation.'],
      ['Think in R','R represents the amount initially risked. A trade that risks $50 and makes $100 returns +2R; a trade that loses $50 is -1R. R-multiples make results easier to compare across different account sizes.'],
      ['Protect against drawdown','Set daily and weekly loss limits, avoid increasing size to recover losses, and keep a journal. A strategy can have positive historical expectancy while a trader still fails through inconsistent execution or oversized positions.'],
    ],
    related:['how-to-backtest-ict','what-is-ict-trading','ict-market-structure','fair-value-gap-trading']
  },,
  {
    slug:'ict-killzones',
    title:'ICT Killzones Explained: London, New York and Session Timing',
    meta:'Learn how ICT Killzones organize analysis around market sessions and how to test time-based setups.',
    category:'Sessions',
    description:'Understand ICT Killzones and how session timing fits into a testable trading process.',
    intro:'ICT Killzones are defined time windows used in the ICT methodology to focus attention on liquidity, volatility and execution. A time window is a filter, not a guarantee that a setup will occur.',
    sections:[
      ['What is an ICT Killzone?','A Killzone is a defined period on the trading clock used to focus analysis and execution. Write the timezone and daylight-saving convention into the trading plan.'],
      ['London and New York','Traders often study London and New York activity because these sessions can produce meaningful changes in liquidity and volatility. Define the exact window rather than relying on a vague session label.'],
      ['Combine timing with price','A Killzone should be combined with predefined market context, liquidity references and entry conditions. Entering simply because the clock reached a certain time is not a complete strategy.'],
      ['Backtest the window','Fix the instrument, timezone, session, setup, stop and target. Record every qualifying occurrence instead of selecting only attractive historical examples.'],
    ],
    related:['ict-liquidity','ict-silver-bullet','how-to-backtest-ict','ict-risk-management']
  },
  {
    slug:'ict-displacement',
    title:'ICT Displacement Explained: What Traders Look For',
    meta:'Learn how displacement is described in ICT trading and how to turn the concept into testable rules.',
    category:'Core Concepts',
    description:'A practical explanation of displacement within an ICT trading framework.',
    intro:'Displacement is commonly used in ICT education to describe a decisive price move with notable expansion in range or momentum. Traders may study it as evidence of strong price movement, but the definition must be tested.',
    sections:[
      ['What displacement means','There is no single universal numerical threshold. Traders may define displacement using candle range, consecutive closes, speed or an imbalance. Fix your definition before testing.'],
      ['Displacement and FVGs','A strong move can create a Fair Value Gap, which is why ICT traders often study displacement and FVGs together. An FVG does not guarantee a later reaction.'],
      ['Displacement after liquidity','One common sequence is a liquidity event followed by displacement and then a retracement toward a price-delivery area. Treat this as a hypothesis to test.'],
      ['Make it measurable','Define the minimum candle characteristics, timeframe, session, entry trigger and invalidation. Do not change the definition after seeing the result.'],
    ],
    related:['fair-value-gap-trading','ict-liquidity','ict-market-structure','how-to-backtest-ict']
  },
  {
    slug:'ict-ote',
    title:'ICT Optimal Trade Entry (OTE): Fibonacci Retracement Guide',
    meta:'Learn how OTE is commonly described in ICT trading and how to test Fibonacci-based entry rules.',
    category:'Core Concepts',
    description:'Understand the ICT OTE concept and how to test Fibonacci-based entry rules.',
    intro:'Optimal Trade Entry, commonly abbreviated OTE, is an ICT concept using a Fibonacci retracement range to identify a preferred area for a potential entry. The zone is a planning framework, not proof of a reversal.',
    sections:[
      ['What is OTE?','OTE is commonly associated with the 62%–79% Fibonacci retracement area of a selected price swing. The exact swing and levels should be fixed before testing.'],
      ['Choose the dealing leg','Define whether the range comes from a displacement leg, a specific high-to-low move or another objective rule.'],
      ['Use OTE with context','Traders may combine OTE with structure, liquidity, displacement or an order block. Confluence does not remove market risk.'],
      ['Backtest the rule','Record the exact range, entry zone, stop, target, timeframe and session. Test consecutive examples rather than only charts where price respected the zone.'],
    ],
    related:['ict-market-structure','ict-liquidity','ict-order-block','how-to-backtest-ict']
  },
  {
    slug:'ict-smt-divergence',
    title:'ICT SMT Divergence Explained: Correlated Markets and Confirmation',
    meta:'Learn the ICT SMT divergence concept, how traders compare correlated instruments, and how to define it objectively.',
    category:'Advanced Concepts',
    description:'A practical guide to SMT divergence and correlated-market analysis.',
    intro:'SMT divergence is an ICT concept that compares the price behavior of two markets considered related. Traders study differences in significant highs or lows as contextual information.',
    sections:[
      ['What SMT divergence means','A commonly described example is one correlated market making a new high while another fails to make a corresponding high, or the inverse at lows.'],
      ['Why correlation matters','Correlation is not constant. Two markets can move together during one period and diverge during another, so the relationship should be tested rather than assumed.'],
      ['SMT is not a complete trade','An SMT observation does not define entry, stop or target by itself. Traders may combine it with liquidity, structure and an execution model.'],
      ['How to test SMT','Define the pair, timeframe, swing rule, maximum time difference and entry trigger. Record false signals as well as successful examples.'],
    ],
    related:['ict-market-structure','ict-liquidity','how-to-backtest-ict','ict-risk-management']
  },
  {
    slug:'ict-power-of-three',
    title:'ICT Power of Three (AMD) Explained',
    meta:'Learn the ICT Power of Three framework—Accumulation, Manipulation and Distribution—and how to study it without treating it as guaranteed.',
    category:'Models',
    description:'Understand the AMD framework and how to turn it into a testable market hypothesis.',
    intro:'Power of Three, often shortened to AMD, describes Accumulation, Manipulation and Distribution. ICT traders use the model to organize ideas about how price may behave around a range or session.',
    sections:[
      ['Accumulation','Accumulation is commonly used to describe a period where price develops within a range before a larger move. It is an interpretation, not direct evidence of who is accumulating orders.'],
      ['Manipulation','Manipulation refers to a move beyond a visible high or low interpreted as a false break or liquidity event. Not every breakout is a manipulation phase.'],
      ['Distribution','Distribution is the directional phase some AMD interpretations expect after the range and liquidity event. Markets can remain range-bound or behave differently.'],
      ['How to study AMD','Define the range, reference high/low, sweep rule and directional confirmation. Backtest the complete sequence rather than labeling it after the outcome.'],
    ],
    related:['ict-liquidity','ict-market-structure','ict-killzones','how-to-backtest-ict']
  },
  {
    slug:'ict-breaker-block',
    title:'ICT Breaker Block Explained: From Failed Order Block to New Role',
    meta:'Learn how breaker blocks are described in ICT trading and how they relate to failed order blocks and market structure.',
    category:'Advanced Concepts',
    description:'A practical explanation of breaker blocks within the ICT framework.',
    intro:'A breaker block is commonly described as an area that changes role after a prior order-block idea fails and price breaks through it. Traders study the area within a broader market-structure sequence.',
    sections:[
      ['The basic idea','A commonly taught breaker sequence begins with an order-block reference, a move through that area that invalidates the original expectation, and later use of the area from the opposite side.'],
      ['Why structure matters','Define which swing has broken and what qualifies as a meaningful structural change. Otherwise failed zones can be relabeled after the fact.'],
      ['Breaker and liquidity','Some traders combine breaker blocks with a liquidity sweep or other context. Treat the combination as a hypothesis with measurable conditions.'],
      ['Backtest it','Record the original zone, invalidation event, retest condition, stop, target and session. Include failed retests in the sample.'],
    ],
    related:['ict-order-block','ict-market-structure','ict-liquidity','how-to-backtest-ict']
  },
  {
    slug:'ict-mitigation-block',
    title:'ICT Mitigation Block Explained: A Practical Framework',
    meta:'Learn how mitigation blocks are described in ICT trading and how to define the concept objectively.',
    category:'Advanced Concepts',
    description:'Understand the mitigation block concept without treating it as a guaranteed support or resistance level.',
    intro:'Mitigation block is a term used in ICT and SMC education for a price area that traders believe can become relevant when an earlier directional idea is being unwound or invalidated. Definitions vary.',
    sections:[
      ['The concept','A mitigation block is generally studied around a prior price area after a directional move or structural change. It is an interpretation, not direct evidence of a specific institution closing an order.'],
      ['Define the reference','Decide which candle, range or swing qualifies. If the reference changes from chart to chart, the idea becomes difficult to test.'],
      ['Use market context','Liquidity, structure and displacement can provide context for a mitigation-block hypothesis. Avoid treating the zone as an automatic entry signal.'],
      ['Create a repeatable test','Fix the timeframe, reference rule, retest condition, invalidation, target and session. Track both successful and unsuccessful interactions.'],
    ],
    related:['ict-order-block','ict-market-structure','ict-liquidity','how-to-backtest-ict']
  },
  {
    slug:'ict-premium-discount',
    title:'ICT Premium and Discount: Dealing Range Explained',
    meta:'Learn how ICT traders divide a dealing range into premium and discount, how equilibrium is used, and how to test the framework.',
    category:'Core Concepts',
    description:'Understand premium, discount and equilibrium within an ICT dealing range.',
    intro:'Premium and discount are terms used in ICT education to describe where price sits within a defined dealing range. The framework can organize directional ideas and preferred entry areas.',
    sections:[
      ['Define the dealing range','A dealing range needs an objective high and low. Its midpoint or equilibrium divides the range into upper and lower halves.'],
      ['Premium and discount','The upper portion is commonly called premium and the lower portion discount. Some ICT traders use the distinction to prefer short ideas in premium and long ideas in discount when other conditions align.'],
      ['Equilibrium is not a signal','The midpoint is a reference level, not proof that price will reverse there. A strong trend can continue through equilibrium.'],
      ['Test the full rule','Specify range selection, directional filter, entry condition, stop and target. Compare results with and without the premium/discount filter.'],
    ],
    related:['ict-market-structure','ict-order-block','ict-risk-management','how-to-backtest-ict']
  },

]