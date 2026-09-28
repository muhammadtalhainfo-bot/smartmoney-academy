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
  },
]
