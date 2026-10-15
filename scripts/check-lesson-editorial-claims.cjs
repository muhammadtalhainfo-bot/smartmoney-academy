#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const sources = {
  primary: path.join(process.cwd(), 'app/lesson/[id]/lesson-data.js'),
  legacy: path.join(process.cwd(), 'app/lesson/[id]/lessons-data.js'),
};

for (const file of Object.values(sources)) {
  if (!fs.existsSync(file)) {
    console.error('[lesson-editorial] Missing lesson source: ' + file);
    process.exit(1);
  }
}

const text = Object.fromEntries(
  Object.entries(sources).map(([key, file]) => [key, fs.readFileSync(file, 'utf8')]),
);

const forbidden = [
  {
    source: 'primary',
    label: 'entry requirements presented as universal',
    pattern: /What are the 5 required elements of every valid ICT entry\?/i,
  },
  {
    source: 'primary',
    label: 'precision/edge asserted by title',
    pattern: /The Exact Frameworks ICT Uses to Enter Trades With Precision/i,
  },
  {
    source: 'legacy',
    label: 'single highest-probability trading window asserted without evidence',
    pattern: /The Silver Bullet window \(10 AM - 11 AM New York time\) is the single highest-probability trading hour in the entire week/i,
  },
  {
    source: 'legacy',
    label: 'algorithmic delivery asserted as fact',
    pattern: /the algorithm is programmed to deliver price and create reactions/i,
  },
  {
    source: 'legacy',
    label: 'future gap fill stated as certain',
    pattern: /the algorithm will fill this gap at some point during the week/i,
  },
  {
    source: 'legacy',
    label: 'institutional stop-hunt motive asserted as fact',
    pattern: /Banks engineer stop hunts not out of malice but out of necessity/i,
  },
  {
    source: 'legacy',
    label: 'daily stop-hunt pattern asserted as mechanical certainty',
    pattern: /This is the pattern ICT traders trade EVERY DAY/i,
  },
  {
    source: 'legacy',
    label: 'unsourced psychology percentage claim',
    pattern: /Risk management is 80% psychological and 20% mathematical/i,
  },
  {
    source: 'legacy',
    label: 'loss-aversion multiplier presented as universal',
    pattern: /Humans feel losses 2\.5x more intensely than equivalent gains/i,
  },
  {
    source: 'legacy',
    label: 'unsupported fixed trading-return claim',
    pattern: /This setup triggers 3-5 times per year but produces 5-10R each time/i,
  },
  {
    source: 'legacy',
    label: 'fixed minimum trades claimed to guarantee statistical validity',
    pattern: /MINIMUM 100 TRADES:\s*This is the non-negotiable minimum for any statistical analysis/i,
  },
  {
    source: 'primary',
    label: 'unqualified every-time sweep interpretation',
    pattern: /Every time you see price spike above an obvious high and immediately reverse/i,
  },
  {
    source: 'primary',
    label: 'higher-timeframe order block claimed inherently more powerful',
    pattern: /A Daily OB is more powerful than a 5-minute OB/i,
  },
  {
    source: 'primary',
    label: 'Tuesday Judas Swing timing asserted as a market fact',
    pattern: /ICT specifically notes that TUESDAY is the most common day for the weekly Judas Swing/i,
  },
  {
    source: 'legacy',
    label: 'DOL described as guaranteed stop-to-stop price delivery',
    pattern: /The DOL is always a liquidity pool\s+--\s+BSL above a high/i,
  },
  {
    source: 'legacy',
    label: 'LRLR target arrival asserted as reliable',
    pattern: /LRLR setups reach their DOL reliably/i,
  },
  {
    source: 'legacy',
    label: 'premium/discount filter claimed to eliminate most poor trades',
    pattern: /This single rule eliminates the majority of low-probability trades/i,
  },
  {
    source: 'legacy',
    label: 'higher-timeframe range asserted to override lower-timeframe signals',
    pattern: /Higher timeframe dealing ranges override lower timeframe signals/i,
  },
  {
    source: 'legacy',
    label: 'institutional-hours-only rule claimed necessary',
    pattern: /Trade during institutional hours only/i,
  },
  {
    source: 'legacy',
    label: 'alignment claimed to prove institutional support',
    pattern: /every lower timeframe trade in that direction carries institutional support/i,
  },
  {
    source: 'legacy',
    label: 'quarterly sequence stated as a fixed calendar rule',
    pattern: /January establishes the year's direction\. Strong bullish January/i,
  },
  {
    source: 'legacy',
    label: 'BPR reaction attributed to hidden institutional order convergence',
    pattern: /BPR reactions are sharper because two sets of institutional orders converge/i,
  },
  {
    source: 'legacy',
    label: 'BPR midpoint asserted to be the highest-R:R entry',
    pattern: /Target the BPR midpoint \(CE\) for the highest R:R entry/i,
  },
  {
    source: 'legacy',
    label: 'fixed 1:3 risk-to-reward minimum presented as universal',
    pattern: /Never take a trade with less than 1:3 risk-to-reward/i,
  },
  {
    source: 'legacy',
    label: 'index position sizing fixed relative to forex',
    pattern: /Indices need 50% smaller position sizes than forex/i,
  },
  {
    source: 'legacy',
    label: 'asset-specific crypto stop widths stated as universal',
    pattern: /Bitcoin stops: 3-5%\. Ethereum: 4-6%\. Altcoins: 8-12%/i,
  },
  {
    source: 'legacy',
    label: 'exact correlated-pair risk multiplier presented as fact',
    pattern: /effectively 2\.5-2\.8% risk because they move together/i,
  },
  {
    source: 'legacy',
    label: 'fixed portfolio heat threshold presented as universal',
    pattern: /Maximum 6% portfolio heat across all open positions/i,
  },
  {
    source: 'legacy',
    label: 'fixed fractional-Kelly prescription presented as universal',
    pattern: /Use Quarter Kelly \(25% of full Kelly\) for sustainable growth/i,
  },
  {
    source: 'legacy',
    label: 'DOL sequence presented as required every session',
    pattern: /All three levels defined before entry\. No guessing/i,
  },
  {
    source: 'legacy',
    label: 'seasonal tendencies claimed to be probability filters by default',
    pattern: /Seasonal tendencies are probability filters/i,
  },
  {
    source: 'legacy',
    label: 'Judas entry variants asserted to share fixed stop and target rules',
    pattern: /All have stop beyond the sweep wick\. All target the daily\/weekly draw/i,
  },
  {
    source: 'legacy',
    label: 'OB and BPR combination ranked as maximum stacking',
    pattern: /OB \+ BPR confluence = maximum PD Array stacking/i,
  },
  {
    source: 'legacy',
    label: 'order type instructions presented as universal',
    pattern: /Default to limit orders at your PD Array level/i,
  },
  {
    source: 'legacy',
    label: 'loss review claimed to guarantee the filter that fixes a system',
    pattern: /The patterns in your losses reveal the filters that will fix your system/i,
  },
  {
    source: 'legacy',
    label: '50-trade forward sample claimed to certify robustness',
    pattern: /Forward test for minimum 50 trades on demo/i,
  },
  {
    source: 'legacy',
    label: '10-point win-rate difference claimed to certify robustness',
    pattern: /If forward test win rate is within 10% of backtest win rate/i,
  },
  {
    source: 'legacy',
    label: 'price movement described as never random',
    pattern: /price never moves randomly from one level to another/i,
  },
  {
    source: 'legacy',
    label: 'ERL targets described as known institutional destinations',
    pattern: /where major institutional orders are resting and where the algorithm delivers price as its primary objective/i,
  },
  {
    source: 'legacy',
    label: 'IRL fills described as required delivery steps',
    pattern: /price fills these as part of the delivery path before continuing to the ERL target/i,
  },
  {
    source: 'legacy',
    label: 'DOL direction asserted as algorithm knowledge',
    pattern: /which liquidity pool is the algorithm most likely targeting today/i,
  },
  {
    source: 'legacy',
    label: 'fixed standard risk percentage attributed to ICT universally',
    pattern: /Standard ICT position sizing: 1% of account per trade/i,
  },
  {
    source: 'legacy',
    label: 'fixed risk ceiling declared universal',
    pattern: /Never risk more than 2% on any single trade regardless of conviction/i,
  },
  {
    source: 'legacy',
    label: 'monthly trading return target attributed to most ICT traders',
    pattern: /Most ICT traders aim for 5-8% with proper execution/i,
  },
  {
    source: 'legacy',
    label: 'profitable expectancy claimed from win rate and R multiple without assumptions',
    pattern: /A 40% win rate with 1:3 R:R is highly profitable over 100 trades/i,
  },
  {
    source: 'legacy',
    label: 'trading return claimed to beat nearly all investments',
    pattern: /That beats nearly every investment in the world/i,
  },
  {
    source: 'legacy',
    label: 'monthly 5% compound value framed as practical reassurance',
    pattern: /A \$10,000 account compounding at 5% monthly becomes \$186,000 in 5 years/i,
  },
  {
    source: 'legacy',
    label: 'rigid robot checklist mandates fixed R:R and risk for every trader',
    pattern: /If any answer is No, do not take the trade\. No exceptions/i,
  },

  {
    source: 'legacy',
    label: 'unsupported risk-of-ruin probability',
    pattern: /99\.9% chance of blowing your account within 50 trades/i,
  },
  {
    source: 'legacy',
    label: 'risk percentage incorrectly changes break-even win rate',
    pattern: /A trader who risks 5% per trade needs a 60% win rate just to break even/i,
  },
  {
    source: 'legacy',
    label: 'incorrect pip-value position-size example',
    pattern: /\$100 \/ \(20 pips x \$1 per pip\) = 0\.5 mini lots/i,
  },
  {
    source: 'legacy',
    label: 'fixed 2-to-5 pip buffer stated as universal stop rule',
    pattern: /Always add a 2-5 pip buffer to your stop loss/i,
  },
  {
    source: 'legacy',
    label: 'correlation converted into a fixed risk multiplier',
    pattern: /actual risk is closer to 1\.85%/i,
  },
  {
    source: 'legacy',
    label: 'portfolio heat threshold stated as universally recommended',
    pattern: /portfolio heat \(under 6% total\)/i,
  },
  {
    source: 'legacy',
    label: 'full-size position tied to subjective perfect setup grade',
    pattern: /Correct narrative \+ perfect setup = A\+ trade \(full size\)/i,
  },
  {
    source: 'legacy',
    label: 'psychology represented as an unsupported fixed percentage',
    pattern: /Trading is 80% psychology and 20% strategy/i,
  },
  {
    source: 'legacy',
    label: 'quiz asks for a universal maximum risk percentage',
    pattern: /What is the maximum recommended risk per trade\?/i,
  },
  {
    source: 'legacy',
    label: 'quiz asks for a universal minimum ICT risk reward',
    pattern: /What is the minimum acceptable Risk-Reward ratio for an ICT setup\?/i,
  },
  {
    source: 'legacy',
    label: 'quiz asks for a universal maximum portfolio heat',
    pattern: /What is the maximum recommended portfolio heat\?/i,
  },

  {
    source: 'legacy',
    label: 'execution outcome overstated with unsupported 90/10 statistic',
    pattern: /Most ICT learners spend 90% of their time on concepts and 10% on execution/i,
  },
  {
    source: 'legacy',
    label: 'risk management stated as the single most important skill with a guaranteed account outcome',
    pattern: /without proper risk management, you will eventually blow your account/i,
  },
  {
    source: 'legacy',
    label: 'indices promoted as a route to consistent profit',
    pattern: /Indices move differently than forex -- understand the nuances to profit consistently/i,
  },
  {
    source: 'legacy',
    label: 'crypto availability presented as eliminating all session limits and gaps',
    pattern: /Cryptocurrency markets never close\. They run 24\/7, 365 days a year\.[\s\S]{0,200}no killzone limitations, no session gaps/i,
  },
  {
    source: 'legacy',
    label: 'subjective narrative grade mandates half or full position size',
    pattern: /A correct narrative with a mediocre setup should be traded at/i,
  },
  {
    source: 'legacy',
    label: 'beginner risk quiz presents one percentage as a recommendation',
    pattern: /What is the maximum recommended risk per trade for a beginner ICT trader/i,
  },
  {
    source: 'legacy',
    label: 'crypto session quiz asserts one universal best session',
    pattern: /What is the best session for crypto swing entries/i,
  },
  {
    source: 'legacy',
    label: 'crypto quiz mandates a fixed stop width',
    pattern: /What percentage stop is recommended for Bitcoin/i,
  },
  {
    source: 'legacy',
    label: 'index correlation quiz states an unchanging coefficient',
    pattern: /How correlated are NAS100 and US30/i,
  },
  {
    source: 'legacy',
    label: 'quarterly image caption presents a fixed annual script',
    pattern: /the annual market script/i,
  },

  {
    source: 'legacy',
    label: 'TP presented as always DOL-only',
    pattern: /Take profit placement in ICT is always at an identified Draw on Liquidity/i,
  },
  {
    source: 'legacy',
    label: 'fixed 2R/3R-5R target tiers presented as ICT requirements',
    pattern: /This should typically be 2:1 or better R:R from your entry[\s\S]{0,260}This is typically 3:1 to 5:1 R:R/i,
  },
  {
    source: 'legacy',
    label: 'missing liquidity target said to cause reversal before target',
    pattern: /If your TP is not at an actual liquidity pool \(BSL or SSL\), price may stop just before it and reverse/i,
  },
  {
    source: 'legacy',
    label: 'midnight open asserted to start a market algorithm cycle',
    pattern: /the algorithm begins delivering price from midnight onwards/i,
  },
  {
    source: 'legacy',
    label: 'fixed 6% portfolio-heat maximum',
    pattern: /The Rule: Never exceed 6% portfolio heat/i,
  },
  {
    source: 'legacy',
    label: 'portfolio heat incorrectly converted to five-day fixed drawdown claims',
    pattern: /6% heat = 5 consecutive losing days of max heat = 30% drawdown/i,
  },
  {
    source: 'legacy',
    label: 'correlation coefficients fixed across markets',
    pattern: /EURUSD & GBPUSD \(90%\+ correlation\)/i,
  },
  {
    source: 'legacy',
    label: 'correlation stated to create fixed effective risk',
    pattern: /your effective risk is nearly 4% because both pairs will likely move in the same direction/i,
  },
  {
    source: 'legacy',
    label: 'partial exit described as guaranteeing profit',
    pattern: /Close 50% at 1:2 R:R \(covers risk, guarantees profit\)/i,
  },
  {
    source: 'legacy',
    label: 'index products assigned fixed daily point ranges and cleaner setups',
    pattern: /More volatile -- 200-500 point daily ranges[\s\S]{0,240}Cleaner FVGs and Order Blocks/i,
  },
  {
    source: 'legacy',
    label: 'crypto leverage cap declared universal',
    pattern: /NEVER use more than 5x leverage for ICT trading/i,
  },
  {
    source: 'legacy',
    label: 'crypto stop percentages prescribed by coin',
    pattern: /Bitcoin: 3-5% stop minimum[\s\S]{0,120}Ethereum: 4-6% stop minimum[\s\S]{0,120}Altcoins: 8-12% stop minimum/i,
  },
  {
    source: 'legacy',
    label: 'fixed maximum percent of capital on any exchange',
    pattern: /Never keep more than 50% of capital on an exchange/i,
  },
  {
    source: 'legacy',
    label: 'halving used as an unqualified entry calendar strategy',
    pattern: /ICT play: Buy discount zones, hold for 6\+ months/i,
  },
  {
    source: 'legacy',
    label: 'drawdown math says 10% risk destroys account after ten losses',
    pattern: /Risk 10% per trade = 10 consecutive losses = account destroyed/i,
  },
  {
    source: 'legacy',
    label: 'five-percent risk loss sequence uses incorrect 60% drawdown',
    pattern: /Risk 5% per trade = 10 consecutive losses = 60% drawdown/i,
  },
  {
    source: 'legacy',
    label: 'risk management intro promises an account blowup as inevitable',
    pattern: /Without proper risk controls, even the best ICT strategy will eventually blow your account/i,
  },

  {
    source: 'legacy',
    label: 'execution lesson uses unsupported concepts-versus-execution 90/10 split',
    pattern: /Most ICT learners spend 90% of their time on concepts and 10% on execution/i,
  },
  {
    source: 'legacy',
    label: 'execution subtitle assigns a fixed 40/60 split',
    pattern: /Knowing the Setup Is 40% of Trading -- Execution Is the Other 60%/i,
  },
  {
    source: 'legacy',
    label: 'limit orders universally presented as preferred and better R:R',
    pattern: /LIMIT ORDERS \(Preferred for ICT Entries\)[\s\S]{0,650}Better R:R because entry is at the optimal zone/i,
  },
  {
    source: 'legacy',
    label: 'market orders said to consistently create worse entries',
    pattern: /This consistently produces entries at worse prices and tighter R:R/i,
  },
  {
    source: 'legacy',
    label: 'pattern-specific stop boundaries presented as universal rules',
    pattern: /Stop goes beyond the ABSOLUTE EXTREME of the sweep wick[\s\S]{0,250}specifically to survive any secondary wick/i,
  },
  {
    source: 'legacy',
    label: 'stop order portrayed as exact guarantee',
    pattern: /Your stop loss is your insurance policy\. It is not a suggestion -- it is a hard rule/i,
  },
  {
    source: 'legacy',
    label: 'drawdown recovery example uses incorrect five-percent ten-loss math',
    pattern: /Risk 5% per trade = 10 consecutive losses = 60% drawdown/i,
  },

  {
    source: 'primary',
    label: 'weekly AMD weekday sequence promoted as consistently predictive',
    pattern: /Weekly AMD: Monday = accumulate\. Tuesday = Judas Swing \(usually\)\. Thursday-Friday = real directional move\. This works with remarkable consistency/i,
  },
  {
    source: 'primary',
    label: 'daily AMD title claims every trading day is engineered',
    pattern: /The Daily Market Script — How Every Trading Day Is Engineered/i,
  },
  {
    source: 'primary',
    label: 'Silver Bullet fixed 2R minimum treated as universal',
    pattern: /Target: 2:1 minimum to next liquidity/i,
  },
  {
    source: 'primary',
    label: 'sweep-reversal entry presented as fundamental and superior',
    pattern: /The most fundamental ICT entry model[\s\S]{0,500}Master this before anything else/i,
  },
  {
    source: 'primary',
    label: 'OB zone breaks automatically require immediate exit',
    pattern: /If price sweeps through — exit immediately/i,
  },
  {
    source: 'primary',
    label: 'breaker block flip presented as guaranteed',
    pattern: /When an OB is swept through — it becomes a Breaker Block and flips polarity/i,
  },
];

const focusedForbidden = [
  {
    source: 'legacy',
    label: 'daily bias presented as a strict pre-session deadline',
    pattern: /Daily bias is determined BEFORE the session opens[\s\S]{0,180}already too late/i,
  },
  {
    source: 'legacy',
    label: 'breakeven timing prescribed universally despite conditional body',
    pattern: /Move to breakeven when: price moved 1R \+ cleared first PD Array \+ LTF BOS confirmed/i,
  },
  {
    source: 'legacy',
    label: 'narrative walkthrough presents gold session sequence as likely institutional delivery',
    pattern: /London will likely sweep below PDL[\s\S]{0,900}This is a complete institutional narrative/i,
  },
  {
    source: 'legacy',
    label: 'fixed maximum two trades per day presented as universal solution',
    pattern: /Solution: maximum two trades per day\. After two, close all charts/i,
  },
  {
    source: 'legacy',
    label: 'partial at TP1 claimed to solve premature exits',
    pattern: /Solution: partial profits at TP1 reduce this fear/i,
  },
  {
    source: 'legacy',
    label: 'gold narrative reports a fixed return multiple before actual execution',
    pattern: /Target: weekly draw at 2,340\. R:R = 3\.8:1[\s\S]{0,240}This is professional ICT trading/i,
  },
  {
    source: 'legacy',
    label: 'arbitrary directional-accuracy threshold certifies readiness for live trading',
    pattern: /70%\+ direction accuracy = you are ready to trade the narrative live/i,
  },
  {
    source: 'legacy',
    label: 'weekly AMD assigns fixed phases to weekdays',
    pattern: /Monday = accumulation\. Tuesday\/Wednesday = manipulation or early distribution\. Thursday\/Friday = primary distribution or reversal/i,
  },
];
for (const check of focusedForbidden) forbidden.push(check);

const curriculumBatchForbidden = [
  {
    source: 'primary',
    label: 'order block falsely described as confirmed institutional absorption',
    pattern: /It represents the candle where an institution was absorbing all retail orders[\s\S]{0,180}before launching price in their intended direction/i,
  },
  {
    source: 'primary',
    label: 'order-block structure shift made universally mandatory',
    pattern: /The move must include a BOS or ChoCH — confirming that structure shifted after the OB candle/i,
  },
  {
    source: 'primary',
    label: 'OTE made to require one fixed combination of filters',
    pattern: /It must be combined with a liquidity sweep, a Fair Value Gap or Order Block, and alignment with the higher timeframe narrative/i,
  },
  {
    source: 'legacy',
    label: 'premium and discount stated as universal buy and sell zones',
    pattern: /Premium = sell zone, discount = buy zone/i,
  },
  {
    source: 'legacy',
    label: 'daily draw on liquidity presented as the definite primary target',
    pattern: /This is today's primary target/i,
  },
  {
    source: 'legacy',
    label: 'PD arrays presented as often defining the session turn',
    pattern: /These are high-priority reaction zones that often define the session's key turning point/i,
  },
  {
    source: 'legacy',
    label: 'Turtle Soup described as consistently reliable due to predictable institutional stop hunting',
    pattern: /It is one of the most consistently reliable setups in the entire ICT framework[\s\S]{0,220}single most predictable institutional behavior/i,
  },
  {
    source: 'legacy',
    label: 'Turtle Soup stop prescribed beyond the entire wick as a guarantee',
    pattern: /The stop must be above the (?:maximum sweep point|absolute high of the wick)/i,
  },
  {
    source: 'legacy',
    label: 'Turtle Soup quiz treats higher-timeframe alignment as mandatory',
    pattern: /A Turtle Soup setup requires HTF alignment because/i,
  },
  {
    source: 'legacy',
    label: 'backtesting claims an edge is proven by hundreds of observations',
    pattern: /ICT traders do not think[\s\S]{0,240}provable, statistical edge/i,
  },
  {
    source: 'legacy',
    label: 'backtesting subtitle suggests hundreds prove an edge',
    pattern: /No Edge Can Be Trusted Until It Has Been Proven Across Hundreds of Historical Setups/i,
  },
  {
    source: 'legacy',
    label: 'backtesting sample-size quiz asserts a universal 100-trade minimum',
    pattern: /The minimum number of trades required for statistically significant backtesting/i,
  },
  {
    source: 'legacy',
    label: 'backtest filter changes promoted automatically based on winners and losers',
    pattern: /Add criteria that consistently appear in winners as requirements\. Remove criteria that consistently appear in losers as exclusions/i,
  },
  {
    source: 'legacy',
    label: 'gold presented as rising whenever markets crash or inflation fears rise',
    pattern: /Gold \(XAU\/USD\) is the ultimate safe-haven asset\. When markets crash, gold rises\. When inflation fears spike, gold rises/i,
  },
  {
    source: 'legacy',
    label: 'gold-dollar relationship taught as a fixed inverse correlation',
    pattern: /What is gold inversely correlated with/i,
  },
  {
    source: 'legacy',
    label: 'gold benchmark auction time taught as 10AM GMT',
    pattern: /When is the London Gold Fix[\s\S]{0,180}10AM GMT/i,
  },
  {
    source: 'legacy',
    label: 'gold FVG size taught as fixed pip bands',
    pattern: /How wide are typical gold FVGs/i,
  },
  {
    source: 'legacy',
    label: 'Bitcoin halving presented as an exact four-calendar-year schedule in quiz',
    pattern: /When does Bitcoin halving occur[\s\S]{0,150}Every 4 years/i,
  },
];
for (const check of curriculumBatchForbidden) forbidden.push(check);

const foundationalBatchForbidden = [
  {
    source: 'primary',
    label: 'market structure does not assign total control to buyers or sellers',
    pattern: /Buyers are in full control|Sellers are in full control/i,
  },
  {
    source: 'primary',
    label: 'BOS is not claimed to confirm continuation by itself',
    pattern: /It confirms that the current trend is continuing|confirming continuation of the downtrend/i,
  },
  {
    source: 'primary',
    label: 'ChoCH is not described as proof of a trend reversal',
    pattern: /is the signal that the trend is REVERSING/i,
  },
  {
    source: 'primary',
    label: 'a structure break does not claim to identify buyers stepping in',
    pattern: /It means buyers have stepped in aggressively enough/i,
  },
  {
    source: 'primary',
    label: 'internal structure is not called a precise entry trigger',
    pattern: /THAT is your precise entry trigger/i,
  },
  {
    source: 'primary',
    label: 'a prior BOS does not predict pullback depth',
    pattern: /know how deep the pullback could go/i,
  },
  {
    source: 'primary',
    label: 'BSL does not assert a known, present cluster of short-stop orders',
    pattern: /Retail traders have placed stop-losses on their short positions|Buy-stop orders from breakout traders are waiting/i,
  },
  {
    source: 'primary',
    label: 'a sweep is not presented as institutional buying',
    pattern: /This is the institution filling buys/i,
  },
  {
    source: 'primary',
    label: 'a sweep and structure break do not guarantee reversal',
    pattern: /This confirms the sweep is done and price is reversing/i,
  },
  {
    source: 'primary',
    label: 'FVG is not said to be a zone with no two-sided trading',
    pattern: /a zone where no two-sided trading occurred/i,
  },
  {
    source: 'primary',
    label: 'FVG revisits are not assigned a verified institutional-order cause',
    pattern: /Price returns to FVGs because of the mechanics of how large institutional orders get filled/i,
  },
  {
    source: 'primary',
    label: 'FVGs are not described as unfilled institutional orders',
    pattern: /represent unfilled institutional orders/i,
  },
  {
    source: 'primary',
    label: 'first-presented FVG is not claimed to be universally most important',
    pattern: /FIRST FVG that forms is the most important/i,
  },
  {
    source: 'primary',
    label: 'BPR overlap is not described as double strength',
    pattern: /overlapping FVGs = double strength/i,
  },
  {
    source: 'primary',
    label: 'an SSL sweep is not said to start a reversal',
    pattern: /This starts the reversal/i,
  },
  {
    source: 'primary',
    label: 'FVG alignment is not a universal mandatory filter',
    pattern: /Only use FVGs that align/i,
  },
  {
    source: 'primary',
    label: 'a stop hit is not said to invalidate every FVG',
    pattern: /This invalidates the FVG if hit/i,
  },
];
for (const check of foundationalBatchForbidden) forbidden.push(check);

const legacyReversalRiskForbidden = [
  {
    source: 'legacy',
    label: 'Turtle Soup is not attributed to institutional stop-taking',
    pattern: /institutions sweep obvious highs\/lows to collect liquidity/i,
  },
  {
    source: 'legacy',
    label: 'lower-timeframe break does not prove the sweep is complete',
    pattern: /price must break below a recent 1-minute high to confirm that the reversal has begun/i,
  },
  {
    source: 'legacy',
    label: 'FVG pullback is not claimed as usual or certain after a structure break',
    pattern: /price will usually pull back briefly before continuing lower/i,
  },
  {
    source: 'legacy',
    label: 'liquidity target is not prescribed as the only exit',
    pattern: /The take-profit is the next significant Sell-Side Liquidity pool below price/i,
  },
  {
    source: 'legacy',
    label: 'larger timeframe is not said to produce the largest Turtle Soup moves',
    pattern: /4-hour Turtle Soups produce the largest moves/i,
  },
  {
    source: 'legacy',
    label: 'Judas Swing is not described as deception and real institutional delivery',
    pattern: /A false move in the wrong direction that deceives retail traders into positioning opposite to the day's real institutional delivery/i,
  },
  {
    source: 'legacy',
    label: 'Judas Swing does not predict the next direction deterministically',
    pattern: /If the false move goes DOWN, the real move goes UP/i,
  },
  {
    source: 'legacy',
    label: 'New York open reversal is not claimed to usually happen in 15 to 20 minutes',
    pattern: /Within 15-20 minutes, this initial move reverses into the real directional delivery/i,
  },
  {
    source: 'legacy',
    label: 'Judas Swing is not given a universal 60 to 90 minute completion rule',
    pattern: /The London Judas typically completes within the first 60-90 minutes/i,
  },
  {
    source: 'legacy',
    label: 'Asian range is not claimed as the most frequent Judas target without evidence',
    pattern: /The Asian High or Low is the nearest significant liquidity pool and the most frequently swept level in London/i,
  },
  {
    source: 'legacy',
    label: 'FVG contact is not claimed to often end and reverse the Judas move',
    pattern: /The Judas frequently ends precisely when it reaches/i,
  },
  {
    source: 'legacy',
    label: 'an entry variant is not labelled inherently best for beginners',
    pattern: /Lowest risk, smallest R:R, best for beginners/i,
  },
  {
    source: 'legacy',
    label: 'unsupported majority statistic about ICT traders is removed',
    pattern: /majority of traders who learn ICT concepts never systematically backtest/i,
  },
  {
    source: 'legacy',
    label: 'backtesting is not said to prove live execution skill',
    pattern: /Backtesting proves you can execute the strategy/i,
  },
  {
    source: 'legacy',
    label: 'a fixed count is not required before considering live trading',
    pattern: /Minimum 50 forward-tested trades before considering live trading/i,
  },
  {
    source: 'legacy',
    label: 'a 50-trade consecutive streak is not a readiness certificate',
    pattern: /50 consecutive trades following ALL rules/i,
  },
  {
    source: 'legacy',
    label: 'a stop hit is not said to have saved a trader from a bigger loss',
    pattern: /it saved you from a bigger loss/i,
  },
  {
    source: 'legacy',
    label: 'a fixed 2-3 pip stop buffer is not universal',
    pattern: /plus 2-3 pips buffer/i,
  },
  {
    source: 'legacy',
    label: 'malformed backtesting labels must not return',
    pattern: /BACKTNew York timeING|FORWARD TNew York timeING|FOREX TNew York timeER|BNew York time PERFORMING FILTERS|FORWARD TNew York time REQUIREMENTS/i,
  },
];
for (const check of legacyReversalRiskForbidden) forbidden.push(check);

const bprResidualForbidden = [
  {
    source: 'legacy',
    label: 'Turtle Soup does not assume that later reversal is the expected outcome',
    pattern: /watches the real trade work without them/i,
  },
  {
    source: 'legacy',
    label: 'higher-timeframe mismatch is not assumed to prove a continuation stop hunt',
    pattern: /many "Turtle Soups" are actually continuation stop hunts/i,
  },
  {
    source: 'legacy',
    label: 'Judas outcomes are not classified by a fixed categorical stereotype',
    pattern: /Genuine Judas: fast sweep → immediate reversal → large reversal candles with FVGs/i,
  },
  {
    source: 'legacy',
    label: 'BPR is not claimed to create the sharpest reactions',
    pattern: /dual institutional zone that creates the sharpest reactions/i,
  },
  {
    source: 'legacy',
    label: 'BPR overlap is not claimed to concentrate institutional interest most',
    pattern: /most concentrated institutional interest of any entry zone/i,
  },
  {
    source: 'legacy',
    label: 'BPR is not described as simultaneously triggering both institutional order sets',
    pattern: /BOTH sets of orders are triggered simultaneously/i,
  },
  {
    source: 'legacy',
    label: 'BPR is not presented as stronger or more complete by default',
    pattern: /Reactions from BPRs are typically sharper, faster, and more complete/i,
  },
  {
    source: 'legacy',
    label: 'narrow BPR is not said to indicate precise institutional concentration',
    pattern: /The smaller the overlap zone, the more precise the institutional concentration/i,
  },
  {
    source: 'legacy',
    label: 'BPR reaction section title does not promise extreme reactions',
    pattern: /title: \`Why BPR Creates Extreme Reactions\`/i,
  },
  {
    source: 'legacy',
    label: 'BPR invalidation is not universalized through a quiz answer',
    pattern: /Consider the BPR mitigated and remove it from your chart/i,
  },
];
for (const check of bprResidualForbidden) forbidden.push(check);

const sessionTimingForbidden = [
  {
    source: 'legacy',
    label: 'market liquidity is not equated to institutional order volume',
    pattern: /volume of institutional orders hitting the market/i,
  },
  {
    source: 'legacy',
    label: 'lunch-time price chop is not stated as a universal rule',
    pattern: /When European traders are at lunch and New York has not fully engaged, price chops/i,
  },
  {
    source: 'legacy',
    label: 'session timing is not called the primary determinant of strategy success',
    pattern: /primary environmental factor that determines whether your setups work at all/i,
  },
  {
    source: 'legacy',
    label: 'Asian range levels are not prescribed as the primary London targets',
    pattern: /they become the London session's primary liquidity targets/i,
  },
  {
    source: 'legacy',
    label: 'London session does not have a mandatory first-hour sweep and reversal',
    pattern: /first hour → immediately reverses → real daily direction begins/i,
  },
  {
    source: 'legacy',
    label: 'post-11AM probability is not asserted without evidence',
    pattern: /After 11 AM New York time, probability drops significantly/i,
  },
  {
    source: 'legacy',
    label: 'London is not universally labelled the AMD manipulation phase in the quiz',
    pattern: /Which session is described as the "Manipulation Phase" of the AMD cycle/i,
  },
];
for (const check of sessionTimingForbidden) forbidden.push(check);

const pdOrderFlowForbidden = [
  {
    source: 'legacy',
    label: 'DOL is not presented as separating superior traders from retail',
    pattern: /concept that separates traders who anticipate from traders who react/i,
  },
  {
    source: 'legacy',
    label: 'PD Array expertise is not presented as a subjective ranking advantage',
    pattern: /what separates advanced ICT practitioners from beginners who draw random boxes/i,
  },
  {
    source: 'legacy',
    label: 'PD Array matrix heading does not imply a universal strength ranking',
    pattern: /The Full PD Array Matrix\s+--\s+Ranked by Strength/i,
  },
  {
    source: 'legacy',
    label: 'CE is not described as the primary entry for every FVG',
    pattern: /your primary entry level within the gap/i,
  },
  {
    source: 'legacy',
    label: 'Breaker Blocks are not assigned an inevitable support/resistance role',
    pattern: /it becomes resistance for a bullish OB that was broken/i,
  },
  {
    source: 'legacy',
    label: 'mitigated arrays are not universally described as consumed',
    pattern: /Only active, unmitigated arrays belong on your working chart/i,
  },
  {
    source: 'legacy',
    label: 'a quiz does not claim institutions buy in a range discount zone as a fact',
    pattern: /In a dealing range, institutions buy in/i,
  },
  {
    source: 'legacy',
    label: 'PD Array quiz does not imply a universal highest-ranked type',
    pattern: /Which PD Array ranks highest in the matrix/i,
  },
  {
    source: 'legacy',
    label: 'AMD distribution does not have a universal exit event',
    pattern: /The Distribution phase ends when/i,
  },
  {
    source: 'legacy',
    label: 'DOL sequence is not a mandatory ERL-to-IRL trade path',
    pattern: /The correct DOL trade sequence is/i,
  },
  {
    source: 'legacy',
    label: 'time is not described as directly predicting price',
    pattern: /Using Time to Predict Price/i,
  },
];
for (const check of pdOrderFlowForbidden) forbidden.push(check);

const quarterlyGapRiskForbidden = [
  {
    source: 'legacy',
    label: 'quarter mapping is not presented as clean and deterministic',
    pattern: /Q1 = accumulation \(clean trend\)\. Q2 = manipulation/i,
  },
  {
    source: 'legacy',
    label: 'Q2 is not called the most dangerous quarter',
    pattern: /Q2 is the most dangerous quarter for trend followers/i,
  },
  {
    source: 'legacy',
    label: 'unsupported EURUSD quarterly direction claims are removed',
    pattern: /tends to be weak in Q1 and Q3, stronger in Q2 and Q4/i,
  },
  {
    source: 'legacy',
    label: 'unsupported GBPUSD month pattern is removed',
    pattern: /historically stronger in April-May and weaker in September-October/i,
  },
  {
    source: 'legacy',
    label: 'unsupported gold calendar direction claim is removed',
    pattern: /January historically strong, August-September frequently bullish/i,
  },
  {
    source: 'legacy',
    label: 'unsupported index seasonality is not called well-documented without a source',
    pattern: /January Effect, summer dip in Q3, year-end rally in Q4 are well-documented/i,
  },
  {
    source: 'legacy',
    label: 'quarterly labels are not claimed to transform trading bias',
    pattern: /The Macro Rhythm That Transforms Your Bias/i,
  },
  {
    source: 'legacy',
    label: 'narrative backtesting is not presented as the only way to trust a method',
    pattern: /The only way to trust your narrative-building skill/i,
  },
  {
    source: 'legacy',
    label: 'narrative scoring does not ask for the correct bias after the result',
    pattern: /what was the correct daily bias/i,
  },
  {
    source: 'legacy',
    label: 'daily AMD phase labels are not presented as direct facts',
    pattern: /Price near midnight open with minimal movement = Accumulation/i,
  },
  {
    source: 'legacy',
    label: '30 sessions are not presented as an automatic review threshold',
    pattern: /A journal of 30 or more sessions can reveal/i,
  },
  {
    source: 'legacy',
    label: 'gap full-fill does not predict continuation',
    pattern: /After a full fill, the zone is typically neutralized and price continues in the pre-fill direction/i,
  },
  {
    source: 'legacy',
    label: 'CE is not described as triggering institutional orders',
    pattern: /price fills to the CE and immediately reacts as institutional orders at the CE level are triggered/i,
  },
  {
    source: 'legacy',
    label: 'gaps are not expected to fill to CE as the primary entry',
    pattern: /expect a partial fill to CE as the primary entry zone/i,
  },
  {
    source: 'legacy',
    label: 'gaps are not said frequently to fill midpoint and react',
    pattern: /Gaps frequently fill to the 50% midpoint/i,
  },
  {
    source: 'legacy',
    label: 'gap geometry does not imply the path of least resistance',
    pattern: /path of least resistance between current price and the DOL/i,
  },
  {
    source: 'legacy',
    label: 'a gap is not automatically called support or resistance',
    pattern: /Gaps below a rising market are bullish support zones/i,
  },
  {
    source: 'legacy',
    label: 'fixed 100-trade sample is not used to forecast losing streak drawdown',
    pattern: /longest losing streak in your 100-trade sample/i,
  },
  {
    source: 'legacy',
    label: 'future losing periods are not described as inevitable bad runs',
    pattern: /inevitable bad runs/i,
  },
  {
    source: 'legacy',
    label: 'backtest records are not dismissed as nearly useless',
    pattern: /nearly useless for analysis/i,
  },
  {
    source: 'legacy',
    label: 'win rate alone is not claimed to be required for correct position sizing',
    pattern: /Without knowing your win rate, you cannot size positions correctly/i,
  },
  {
    source: 'legacy',
    label: 'a missed trade is not said to cost nothing',
    pattern: /Missing a trade costs nothing/i,
  },
];
for (const check of quarterlyGapRiskForbidden) forbidden.push(check);

const strategyRiskUnitsForbidden = [
  {
    source: 'legacy',
    label: 'Judas-style move is not asserted to occur in the New York AM session as a fixed fact',
    pattern: /The Judas Swing also occurs during the New York AM session/i,
  },
  {
    source: 'legacy',
    label: 'aggressive Judas entry is not promised to provide a better price',
    pattern: /better price if correct/i,
  },
  {
    source: 'legacy',
    label: 'London Judas quiz does not prescribe an opposite-direction move',
    pattern: /After the London Judas Swing completes, price should/i,
  },
  {
    source: 'legacy',
    label: 'risk management is not said to ensure a loss series cannot destroy an account',
    pattern: /ensuring that no single loss \(or series of losses\) can destroy your account/i,
  },
  {
    source: 'legacy',
    label: '1 percent risk is not framed as a rule to break',
    pattern: /The 1% Rule \(And When to Break It\)/i,
  },
  {
    source: 'legacy',
    label: 'risk controls are not marketed as how all professional ICT traders protect capital',
    pattern: /How Professional ICT Traders Protect Capital in All Market Conditions/i,
  },
  {
    source: 'legacy',
    label: 'risk management is not ungroundedly branded as a science used by professionals',
    pattern: /Professional traders treat risk management as a science/i,
  },
  {
    source: 'legacy',
    label: 'correlation is not labelled the hidden account killer',
    pattern: /Correlation Risk: The Hidden Account Killer/i,
  },
  {
    source: 'legacy',
    label: 'position-size formula does not claim exact sizing in all products',
    pattern: /calculate exactly how many lots to trade based on your stop loss distance and account size/i,
  },
  {
    source: 'legacy',
    label: 'gold stop width is not assigned a universal 15 to 25 pip range',
    pattern: /usually 15-25 pips/i,
  },
  {
    source: 'legacy',
    label: 'gold targets are not assigned a fixed usual 3 to 5R return',
    pattern: /usually 3-5R/i,
  },
  {
    source: 'legacy',
    label: 'gold $25 stop distance is not called 25 pips without quote-unit qualification',
    pattern: /25 pips below FVG/i,
  },
  {
    source: 'legacy',
    label: 'crypto windows are not prescribed as fixed universal killzones',
    pattern: /Crypto killzones: Asian \(8PM-12AM\), London \(3-5AM\), NY \(9:30AM-4PM\)/i,
  },
  {
    source: 'legacy',
    label: 'a fixed 10 to 20 percent drawdown does not trigger a universal stop-trading prescription',
    pattern: /What should you do during a 10-20% drawdown/i,
  },
];
for (const check of strategyRiskUnitsForbidden) forbidden.push(check);

const required = [
  {
    source: 'primary',
    label: 'lesson 8 checklist is described as non-universal',
    pattern: /One commonly taught ICT entry checklist includes the following candidate conditions; no single list is a universal requirement for every strategy/i,
  },
  {
    source: 'primary',
    label: 'lesson 11 explains limits of algorithmic inference',
    pattern: /a chart cannot independently verify the existence, intent or operation of a specific market algorithm/i,
  },
  {
    source: 'legacy',
    label: 'sample-size limitations are described without a universal threshold',
    pattern: /There is no universal number of trades that guarantees statistical significance/i,
  },
  {
    source: 'legacy',
    label: 'session and price behavior are framed as testable hypotheses',
    pattern: /These are candidate price patterns, not proof that European institutions initiate a manipulation phase/i,
  },
  {
    source: 'legacy',
    label: 'DOL is qualified as a candidate objective',
    pattern: /a DOL is a candidate price objective often marked around a prior high/i,
  },
  {
    source: 'legacy',
    label: 'risk-to-reward thresholds are tied to tested evidence',
    pattern: /No single risk-to-reward ratio suits every setup/i,
  },
  {
    source: 'legacy',
    label: 'correlation risk is described without a fixed multiplier',
    pattern: /Correlated positions can concentrate risk because losses may occur together/i,
  },
  {
    source: 'legacy',
    label: 'portfolio heat is explicitly contextual',
    pattern: /a fixed 6% figure is not suitable for everyone/i,
  },
  {
    source: 'primary',
    label: 'Tuesday Judas Swing timing is described as a hypothesis',
    pattern: /attributed hypothesis rather than an established market regularity/i,
  },
  {
    source: 'primary',
    label: 'SMT test question marks stable rules as correct',
    pattern: /What should remain consistent during an SMT test\?.*answer:\s*1/,
  },
  {
    source: 'primary',
    label: 'new ICT concepts quiz requires precise testing rules',
    pattern: /How should newer ICT concepts be handled when testing them\?.*answer:\s*1/,
  },
  {
    source: 'primary',
    label: 'source-model quiz marks rule separation as correct',
    pattern: /What is the purpose of separating a source model from your variation\?.*answer:\s*1/,
  },

  {
    source: 'legacy',
    label: 'forward-testing text rejects universal sample and win-rate thresholds',
    pattern: /A 50-trade minimum or a 10-percentage-point win-rate difference cannot certify robustness on its own/i,
  },
  {
    source: 'legacy',
    label: 'execution guidance acknowledges fill and slippage tradeoffs',
    pattern: /Limit and market orders have different fill, slippage and missed-trade tradeoffs/i,
  },
  {
    source: 'legacy',
    label: 'losses are reviewed as hypotheses rather than guaranteed fixes',
    pattern: /review loss types as hypotheses for process improvements/i,
  },

  {
    source: 'legacy',
    label: 'DOL body treats price objectives as hypotheses',
    pattern: /Actual moves can be influenced by many factors and may not reach a marked level/i,
  },
  {
    source: 'legacy',
    label: 'ERL and IRL labels do not prove orders or required delivery',
    pattern: /The label does not prove that institutional orders are resting there/i,
  },
  {
    source: 'legacy',
    label: 'position sizing is calculated using the risk cap and instrument specifics',
    pattern: /Convert the stop distance into monetary risk using the instrument's contract size/i,
  },
  {
    source: 'legacy',
    label: 'drawdown thresholds are explicitly examples, not universal guidance',
    pattern: /EXAMPLE OF A REVIEW PROCESS \(NOT UNIVERSAL THRESHOLDS\)/i,
  },
  {
    source: 'legacy',
    label: 'account growth arithmetic is explicitly hypothetical',
    pattern: /This is an illustration, not an achievable or expected return target/i,
  },
  {
    source: 'legacy',
    label: 'expected strategy value example states its assumptions and costs caveat',
    pattern: /That is an illustration, not a forecast; fees, slippage, changing conditions and estimation error/i,
  },
  {
    source: 'legacy',
    label: 'discipline rules are described as adaptable examples',
    pattern: /The following are examples to adapt to a specific strategy, not universal requirements/i,
  },
  {
    source: 'legacy',
    label: 'risk quiz assesses risk calculation inputs instead of a universal percentage',
    pattern: /Which inputs matter most when calculating position risk/i,
  },
  {
    source: 'legacy',
    label: 'correlated-pair quiz asks for combined exposure assessment',
    pattern: /Consider their correlation and combined exposure before choosing position sizes/i,
  },

  {
    source: 'legacy',
    label: 'risk-of-ruin section states its assumptions limitation',
    pattern: /There is no universal probability of ruin based only on a stated risk percentage and win rate/i,
  },
  {
    source: 'legacy',
    label: 'break-even win rate is separated from risk percentage',
    pattern: /does not by itself change the break-even win rate when the payoff ratio is unchanged/i,
  },
  {
    source: 'legacy',
    label: 'position-size example uses consistent standard-lot pip value',
    pattern: /\$100 \/ \(20 pips × \$10 per pip\) = 0\.5 standard lots/i,
  },
  {
    source: 'legacy',
    label: 'correlation is not translated directly into a risk multiplier',
    pattern: /Do not convert a correlation coefficient directly into a portfolio-risk multiplier/i,
  },
  {
    source: 'legacy',
    label: 'Kelly formula includes correct parentheses and caveats',
    pattern: /f = \(p × b − q\) \/ b, where p is the win probability/i,
  },
  {
    source: 'legacy',
    label: 'risk quiz asks for account-specific risk inputs',
    pattern: /What should determine the risk you take on a single trade/i,
  },
  {
    source: 'legacy',
    label: 'portfolio-heat quiz asks what it measures',
    pattern: /What does portfolio heat estimate/i,
  },
  {
    source: 'legacy',
    label: 'position size is not based on subjective narrative grading',
    pattern: /A narrative or setup grade should not override the account risk cap/i,
  },

  {
    source: 'legacy',
    label: 'execution lesson states performance depends on several testable factors',
    pattern: /Execution quality can affect realized trading results alongside strategy design, market conditions, costs and risk management/i,
  },
  {
    source: 'legacy',
    label: 'indices lesson compares products instead of promoting consistent returns',
    pattern: /Index products have distinct hours, costs, volatility and gap risks/i,
  },
  {
    source: 'legacy',
    label: 'crypto lesson caveats around-the-clock availability',
    pattern: /Around-the-clock availability does not remove session-based behavior, gaps in liquidity or event risk/i,
  },
  {
    source: 'legacy',
    label: 'narrative sizing quiz reinforces tested rules and account risk caps',
    pattern: /A predefined, tested sizing rule within the account risk cap/i,
  },
  {
    source: 'legacy',
    label: 'beginner risk quiz recommends a small predefined risk during testing',
    pattern: /Choose a small predefined amount that fits account rules and validate in simulation/i,
  },
  {
    source: 'legacy',
    label: 'crypto leverage and stop quizzes require model-specific sizing',
    pattern: /Define invalidation, account for volatility\/execution, then size the position/i,
  },

  {
    source: 'legacy',
    label: 'target-selection lesson permits tested exit alternatives',
    pattern: /Some ICT traders use candidate Draws on Liquidity \(DOL\) as targets; others use a fixed-R multiple, timed exit, volatility-based exit or a combination/i,
  },
  {
    source: 'legacy',
    label: 'midnight open does not confirm a phase or forecast direction',
    pattern: /it does not establish that a daily AMD cycle begins at midnight/i,
  },
  {
    source: 'legacy',
    label: 'portfolio heat sums planned risks with a caveat',
    pattern: /The sum of these planned stop risks is 5\.5% before execution differences/i,
  },
  {
    source: 'legacy',
    label: 'correlated pair body acknowledges variable relationships',
    pattern: /Relationships vary by measurement period, timeframe and market regime/i,
  },
  {
    source: 'legacy',
    label: 'scaling body rejects guaranteed profit from partial closes',
    pattern: /A 50% exit at 1:2 does not guarantee profit on the full trade or account/i,
  },
  {
    source: 'legacy',
    label: 'index comparison requires common assumptions and product details',
    pattern: /Compare the same entry and exit definitions, express outcomes in risk units, and account for fees and slippage/i,
  },
  {
    source: 'legacy',
    label: 'crypto leverage and stop distances depend on product risk inputs',
    pattern: /Choose exposure from a predefined account-risk limit, the instrument's contract rules, entry\/stop distance, maintenance margin and possible liquidation price/i,
  },
  {
    source: 'legacy',
    label: 'drawdown math explains its assumptions and gives corrected values',
    pattern: /After 10 consecutive losses:[\s\S]{0,220}about a 65\.1% drawdown[\s\S]{0,250}about a 40\.1% drawdown/i,
  },
  {
    source: 'legacy',
    label: 'stop-loss section explains execution can exceed planned risk',
    pattern: /A stop order does not guarantee the amount lost/i,
  },

  {
    source: 'legacy',
    label: 'execution lesson warns concept knowledge cannot ensure profitability',
    pattern: /knowing a concept or executing it consistently does not guarantee a profitable result/i,
  },
  {
    source: 'legacy',
    label: 'order types are compared with missed fills and execution costs',
    pattern: /Test missed fills as well as completed trades; a backtest that assumes every limit order fills when touched can overstate results/i,
  },
  {
    source: 'legacy',
    label: 'pattern-specific stop placement is defined before the outcome',
    pattern: /Choose the stop from a rule that can be applied before knowing the outcome/i,
  },
  {
    source: 'legacy',
    label: 'risk example states assumptions for compounded losses',
    pattern: /Assume each losing trade reduces the remaining account equity by a fixed percentage/i,
  },
  {
    source: 'legacy',
    label: 'drawdown recovery math uses corrected compounded figures',
    pattern: /about a 65\.1% drawdown[\s\S]{0,250}about a 40\.1% drawdown/i,
  },

  {
    source: 'primary',
    label: 'weekly AMD timing is framed as a hypothesis',
    pattern: /Treat this as a calendar hypothesis to define and test, not a reliable Monday-to-Friday market script/i,
  },
  {
    source: 'primary',
    label: 'entry model body encourages testing all qualifying examples',
    pattern: /The sequence can fail or never trigger\. Candle counts, entry location and target behavior vary/i,
  },
  {
    source: 'primary',
    label: 'Silver Bullet claims account for timezone and testing limits',
    pattern: /A 2:1 target is one possible strategy rule, not a universal requirement for the Silver Bullet label/i,
  },
  {
    source: 'primary',
    label: 'Asian range sweep does not determine New York bias',
    pattern: /The initial sweep does not prove the next move will go in the opposite direction or establish a New York bias/i,
  },
  {
    source: 'legacy',
    label: 'daily bias can be reassessed when rules or information change',
    pattern: /A pre-session bias can organize a plan, but it is a conditional scenario, not a deadline/i,
  },
  {
    source: 'legacy',
    label: 'breakeven highlight qualifies trigger as model-specific',
    pattern: /none is a universal breakeven rule/i,
  },
  {
    source: 'legacy',
    label: 'gold walkthrough is explicitly hypothetical rather than a forecast',
    pattern: /HYPOTHETICAL XAUUSD SCENARIO \(NOT A FORECAST\)[\s\S]{0,1400}not an institutional narrative, guaranteed sequence or recommendation to trade gold/i,
  },
  {
    source: 'legacy',
    label: 'position management avoids universal daily trade-count prescription',
    pattern: /there is no universal two-trade daily limit/i,
  },
  {
    source: 'legacy',
    label: 'partial exit is identified as a variant to test',
    pattern: /A partial at TP1 is one variant to test, not a guaranteed way to reduce fear or improve returns/i,
  },
  {
    source: 'legacy',
    label: 'breakeven stop rule quiz tests model-specific decision-making',
    pattern: /How should a breakeven-stop rule be chosen[\s\S]{0,300}Use a predefined, tested trigger that fits the strategy and accounts for costs and stop-out tradeoffs/i,
  },
  {
    source: 'legacy',
    label: 'narrative testing does not use directional accuracy as readiness certificate',
    pattern: /Directional accuracy alone, including a 70% result, does not establish a durable edge or prove readiness for live trading/i,
  },
  {
    source: 'legacy',
    label: 'conditional scenario notes setup may not trigger',
    pattern: /Price may instead continue lower, reverse without reaching the FVG, or never trigger the entry/i,
  },
  {
    source: 'legacy',
    label: 'weekly phase definitions are testable hypotheses',
    pattern: /no weekday is a reliable phase assignment by itself/i,
  },

  {
    source: 'primary',
    label: 'order-block chart candle is not proof of institutional absorption',
    pattern: /a chart pattern cannot show whether institutions absorbed retail orders, who traded, or what participants intended/i,
  },
  {
    source: 'primary',
    label: 'OB confirmation rule is framed as a model-specific filter',
    pattern: /Some OB definitions require a BOS or ChoCH after the candidate candle/i,
  },
  {
    source: 'primary',
    label: 'OTE filters are identified as variant-specific and testable',
    pattern: /Some OTE variants combine a liquidity sweep, an FVG or Order Block reference, and higher-timeframe context/i,
  },
  {
    source: 'legacy',
    label: 'premium and discount are contextual rather than automatic trade directions',
    pattern: /premium may be studied as potential short context and discount as potential long context\. Neither is an entry signal by itself/i,
  },
  {
    source: 'legacy',
    label: 'daily targets are candidate reference areas',
    pattern: /These are candidate reference areas, not necessarily today's target/i,
  },
  {
    source: 'legacy',
    label: 'Turtle Soup description allows a breakout to continue',
    pattern: /This pattern does not establish that retail stops were targeted, predict a reversal, or rank the setup's reliability; breakouts can continue/i,
  },
  {
    source: 'legacy',
    label: 'Turtle Soup stop is selected from model invalidation and sized to distance',
    pattern: /Define the stop from the model's invalidation rule, then size the position for that distance/i,
  },
  {
    source: 'legacy',
    label: 'backtesting acknowledges uncertain inference and out-of-sample performance',
    pattern: /Backtesting can help evaluate a trading hypothesis, but it does not prove a durable edge/i,
  },
  {
    source: 'legacy',
    label: 'backtest sample-size quiz does not impose a fixed threshold',
    pattern: /What determines how much backtest data is needed[\s\S]{0,300}there is no universal threshold/i,
  },
  {
    source: 'legacy',
    label: 'backtest filter selection warns about overfitting and uses untouched data',
    pattern: /More filters and rule changes increase the risk of fitting noise[\s\S]{0,240}untouched out-of-sample data/i,
  },
  {
    source: 'legacy',
    label: 'gold intro describes safe-haven behavior as conditional',
    pattern: /Gold is often treated as a potential safe-haven asset, but it does not always rise during market stress or every inflation scare/i,
  },
  {
    source: 'legacy',
    label: 'gold-dollar relationship is framed as varying',
    pattern: /It has often been negative over some periods, but varies and can sometimes turn positive/i,
  },
  {
    source: 'legacy',
    label: 'LBMA Gold Price auctions stated at official commencement times',
    pattern: /When do the LBMA Gold Price auctions commence[\s\S]{0,300}10:30 and 15:00 London time/i,
  },
  {
    source: 'legacy',
    label: 'gold FVG sizing uses a consistent product-specific convention',
    pattern: /Use a consistent product-specific price\/tick convention, then measure outcomes with costs and market conditions/i,
  },
  {
    source: 'legacy',
    label: 'Bitcoin halving quiz ties subsidy reduction to 210,000 blocks',
    pattern: /A block-subsidy reduction every 210,000 blocks, roughly four years at expected block times/i,
  },

];

const foundationalBatchRequired = [
  {
    source: 'primary',
    label: 'BOS and ChoCH/MSS definitions are model-dependent interpretations',
    pattern: /Terminology and swing-selection rules differ among ICT variants; the label marks a possible change, not proof that a reversal is underway/i,
  },
  {
    source: 'primary',
    label: 'liquidity labels do not expose actual participant orders',
    pattern: /The chart does not reveal the actual orders or prove that a particular level contains a large cluster of stops/i,
  },
  {
    source: 'primary',
    label: 'sweep examples do not identify the trader or cause of a move',
    pattern: /the chart alone cannot identify who traded or why/i,
  },
  {
    source: 'primary',
    label: 'FVG definition distinguishes candle geometry from actual trading',
    pattern: /The chart pattern describes candle ranges; it does not mean that no trading occurred in the zone/i,
  },
  {
    source: 'primary',
    label: 'FVG revisit performance must be evaluated rather than presumed',
    pattern: /does not verify a particular cause or guarantee a revisit[\s\S]{0,220}consistent FVG definition and recorded outcomes/i,
  },
  {
    source: 'primary',
    label: 'FVG execution considers missed fills and stop placement rules',
    pattern: /a limit order may be missed or filled without a favorable reaction[\s\S]{0,350}does not universally invalidate the chart pattern/i,
  },
  {
    source: 'primary',
    label: 'FVG targets are presented as alternatives instead of guaranteed destinations',
    pattern: /a fixed risk multiple or a time-based exit[\s\S]{0,220}not a guaranteed destination/i,
  },
];
required.push(...foundationalBatchRequired);

const legacyReversalRiskRequired = [
  {
    source: 'legacy',
    label: 'Turtle Soup includes continuations as possible outcomes',
    pattern: /The chart does not establish institutional intent or guarantee a return inside the level; include continuations in the test/i,
  },
  {
    source: 'legacy',
    label: 'Judas Swing label does not establish institutional delivery',
    pattern: /does not establish deception, institutional delivery, or that a reversal will occur/i,
  },
  {
    source: 'legacy',
    label: 'Judas time cutoff is not assumed without instrument-specific evidence',
    pattern: /Do not assume a fixed 60–90-minute completion rule without instrument-specific evidence/i,
  },
  {
    source: 'legacy',
    label: 'backtesting is distinguished from live execution skill',
    pattern: /Backtesting can estimate how a written rule performed on historical data, but it cannot prove live execution skill/i,
  },
  {
    source: 'legacy',
    label: 'forward-test sample size is not a universal readiness threshold',
    pattern: /no fixed count certifies readiness/i,
  },
  {
    source: 'legacy',
    label: 'stop policy avoids discretionary widening outside the plan',
    pattern: /Do not widen a stop outside the predefined risk plan/i,
  },
  {
    source: 'legacy',
    label: 'pause procedure is tied to a written threshold',
    pattern: /Pause new entries and review the written plan/i,
  },
  {
    source: 'legacy',
    label: 'backtesting labels are restored to readable terminology',
    pattern: /BACKTESTING[\s\S]{0,500}FOREX TESTER|FOREX TESTER[\s\S]{0,500}BACKTESTING/i,
  },
];
required.push(...legacyReversalRiskRequired);

const bprResidualRequired = [
  {
    source: 'legacy',
    label: 'BPR predictive strength is framed as an empirical question',
    pattern: /Whether price reacts there more often, more sharply or more completely than at other zones is an empirical question/i,
  },
  {
    source: 'legacy',
    label: 'BPR test compares with individual FVGs and a simple reference',
    pattern: /Test this hypothesis against each individual FVG and a simple reference strategy/i,
  },
  {
    source: 'legacy',
    label: 'BPR geometry does not imply a stronger order book',
    pattern: /A narrow overlap is more precise geometrically, but that does not establish a more concentrated order book or better trading performance/i,
  },
  {
    source: 'legacy',
    label: 'BPR direction convention is not presented as a universal outcome rule',
    pattern: /One naming convention may label an overlap bullish or bearish using a predefined dealing-range reference/i,
  },
  {
    source: 'legacy',
    label: 'BPR quiz uses a predefined invalidation rule',
    pattern: /Apply your predefined invalidation rule; some models mark the zone inactive after a close through it/i,
  },
];
required.push(...bprResidualRequired);

const sessionTimingRequired = [
  {
    source: 'legacy',
    label: 'session activity and institutional attribution are treated cautiously',
    pattern: /Liquidity is not simply the volume of institutional orders, and a chart cannot identify which participant groups caused a change/i,
  },
  {
    source: 'legacy',
    label: 'London range interactions include continued moves as alternatives',
    pattern: /Neither a sweep nor a reversal is required, and the eventual daily direction is not known from the first move/i,
  },
  {
    source: 'legacy',
    label: 'later-session trading restrictions are based on evidence and prewritten rules',
    pattern: /a time alone does not establish a lower probability or a reversal[\s\S]{0,240}rather than imposing a universal ban/i,
  },
  {
    source: 'legacy',
    label: 'timing filters are compared with a baseline',
    pattern: /Test whether it adds value beyond a clear baseline before restricting your trading hours/i,
  },
];
required.push(...sessionTimingRequired);

const pdOrderFlowRequired = [
  {
    source: 'legacy',
    label: 'DOL is framed as a conditional objective',
    pattern: /Draw on Liquidity \(DOL\) is an ICT term some traders use to record a possible price objective/i,
  },
  {
    source: 'legacy',
    label: 'CE midpoint is presented as a reference to test, not a universal entry',
    pattern: /treat it as one possible reference to test, not a universally optimal entry/i,
  },
  {
    source: 'legacy',
    label: 'order-block polarity conventions are framed as variants to define',
    pattern: /Define the violation and retest criteria in advance; a former zone is not guaranteed to act as support or resistance/i,
  },
  {
    source: 'legacy',
    label: 'array mitigation uses a prewritten, model-specific rule',
    pattern: /Specify whether your rule uses a touch, partial fill, full traversal or close beyond a boundary/i,
  },
  {
    source: 'legacy',
    label: 'DOL scenario does not guarantee the objective',
    pattern: /a hypothesis rather than a destination price must reach/i,
  },
  {
    source: 'legacy',
    label: 'distribution exit is tied to a tested prewritten rule',
    pattern: /Apply a predefined exit or invalidation condition that fits the tested model/i,
  },
];
required.push(...pdOrderFlowRequired);

const quarterlyGapRiskRequired = [
  {
    source: 'legacy',
    label: 'quarterly labels are explicitly described as a template to test',
    pattern: /No quarter must behave this way; define the classification and test its value against a baseline/i,
  },
  {
    source: 'legacy',
    label: 'seasonal filters require out-of-sample evaluation',
    pattern: /Test whether it adds out-of-sample value beyond the base strategy after costs/i,
  },
  {
    source: 'legacy',
    label: 'narrative testing guards against hindsight bias',
    pattern: /what bias would my prewritten rules have assigned before the session/i,
  },
  {
    source: 'legacy',
    label: 'gap fill does not predict later movement',
    pattern: /it does not by itself predict continuation, reversal/i,
  },
  {
    source: 'legacy',
    label: 'CE is one reference rather than a required entry',
    pattern: /CE is one possible reference, not a required fill or guaranteed reaction point/i,
  },
  {
    source: 'legacy',
    label: 'gap-based exits follow prewritten rules',
    pattern: /follow the strategy's predefined, tested rules/i,
  },
  {
    source: 'legacy',
    label: 'losing streak is described as a sample observation',
    pattern: /It describes that sample, not a guaranteed maximum or a prediction of future drawdown/i,
  },
  {
    source: 'legacy',
    label: 'position sizing includes risk cap, stop and instrument costs',
    pattern: /defined risk cap, stop distance, instrument value, costs/i,
  },
];
required.push(...quarterlyGapRiskRequired);

const strategyRiskUnitsRequired = [
  {
    source: 'legacy',
    label: 'risk limits acknowledge that ruin remains possible',
    pattern: /Risk management does not eliminate the possibility of ruin/i,
  },
  {
    source: 'legacy',
    label: 'one percent is presented as an example and not a universal requirement',
    pattern: /Choosing a Risk Ceiling \(1% as One Example\)/i,
  },
  {
    source: 'legacy',
    label: 'position sizing formula is qualified by product conventions and costs',
    pattern: /verify the calculation for the specific instrument/i,
  },
  {
    source: 'legacy',
    label: 'gold stop example expresses price distance and warns about quote units',
    pattern: /a \$25\.00 price-distance from the \$1,920 entry; verify the broker's XAU\/USD quote units/i,
  },
  {
    source: 'legacy',
    label: 'gold target multiple is not assumed in advance',
    pattern: /calculate R from the actual entry, stop and target rather than assuming a fixed multiple/i,
  },
  {
    source: 'legacy',
    label: 'crypto session windows are explicitly non-universal and testable',
    pattern: /These are example windows some traders study, not universal crypto killzones/i,
  },
  {
    source: 'legacy',
    label: 'drawdown response is tied to a predefined threshold',
    pattern: /If you reach your predefined drawdown review threshold/i,
  },
];
required.push(...strategyRiskUnitsRequired);


const sessionLabelResidualForbidden = [
  {
    source: 'primary',
    label: 'order block incorrectly claims to identify institutional entry',
    pattern: /Order Block = WHERE institutions entered|the candle they used to build their position/i,
  },
  {
    source: 'primary',
    label: 'session-window subtitle claims timing itself is an edge',
    pattern: /Time Is Your Edge — Studying Institutional Trading Windows/i,
  },
  {
    source: 'primary',
    label: 'Asian-session boundaries stated as critical every-day levels',
    pattern: /The high and low of the Asian session = critical levels|Mark them every single day/i,
  },
  {
    source: 'primary',
    label: 'New York killzone definitions are mixed with an unqualified alternate window',
    pattern: /New York AM Killzone \(7:00 AM – 10:00 AM EST\) — or 8:30-11:00 AM/i,
  },
  {
    source: 'primary',
    label: 'Silver Bullet window incorrectly asserted to fit wholly inside one killzone definition',
    pattern: /Silver Bullet trade runs entirely within this window/i,
  },
  {
    source: 'primary',
    label: 'macro time labels are universally EST',
    pattern: /The key Macro Times \(all EST\)|20-minute precision windows/i,
  },
  {
    source: 'primary',
    label: 'killzone quiz treats session labels as fixed roles',
    pattern: /The London Killzone is primarily known for|The New York AM Killzone serves the role of/i,
  },
  {
    source: 'primary',
    label: 'Order Blocks and FVGs are universally ranked by trading timeframe',
    pattern: /OBs are better for swing trades and higher timeframe setups|FVGs are better for intraday precision entries/i,
  },
  {
    source: 'primary',
    label: 'Asian range is tied to a mandatory fixed EST routine',
    pattern: /At midnight EST, mark the Asian Range High and Low/i,
  },
];

const sessionLabelResidualRequired = [
  {
    source: 'primary',
    label: 'order-block label does not imply observable institutional entry',
    pattern: /The chart does not reveal where institutions entered or whether they used that candle to build a position/i,
  },
  {
    source: 'primary',
    label: 'time windows are explicitly tied to a documented daylight-saving convention',
    pattern: /confirm the source's ET\/daylight-saving convention/i,
  },
  {
    source: 'primary',
    label: 'alternate Silver Bullet and killzone windows are not treated as identical',
    pattern: /Do not treat that window as wholly inside the 7:00–10:00 convention/i,
  },
  {
    source: 'primary',
    label: 'macro times are tested against a baseline rather than treated as a schedule',
    pattern: /test whether they add useful information beyond a baseline/i,
  },
  {
    source: 'primary',
    label: 'Asian range journaling allows no sweep, one sweep or two sweeps',
    pattern: /neither, one, or both boundaries were crossed/i,
  },
  {
    source: 'primary',
    label: 'killzone quiz identifies the Judas Swing label as a variable hypothesis',
    pattern: /possible Judas Swing hypothesis whose frequency and outcome vary/i,
  },
  {
    source: 'primary',
    label: 'New York AMD role is described as a possible label, not a fixed fact',
    pattern: /A possible distribution phase, not a fixed session role/i,
  },
];

forbidden.push(...sessionLabelResidualForbidden);
required.push(...sessionLabelResidualRequired);


const amdOteResidualForbidden = [
  {
    source: 'primary',
    label: 'daily candle described as a definitive AMD insight',
    pattern: /One of the most profound insights ICT offers is that you can read the STRUCTURE of a single daily candle as an AMD story/i,
  },
  {
    source: 'primary',
    label: 'daily candle boundary assumed to be midnight for every provider',
    pattern: /Open \(midnight open\)/i,
  },
  {
    source: 'primary',
    label: 'upper wick attributed directly to a London Close reversal',
    pattern: /Small wick UP = sometimes a minor London Close reversal/i,
  },
  {
    source: 'primary',
    label: 'bullish daily wick quiz treats Judas Swing as a known fact',
    pattern: /On a bullish AMD day, the lower wick of the daily candle represents/i,
  },
  {
    source: 'primary',
    label: 'equilibrium entry asserted to cause getting chopped up',
    pattern: /Many traders try to enter at exactly 50% and get chopped up/i,
  },
  {
    source: 'primary',
    label: 'students instructed to take a new shallow entry after missing OTE',
    pattern: /if price gives you a clear signal at a shallower retracement with a valid order block, take it/i,
  },
];

const amdOteResidualRequired = [
  {
    source: 'primary',
    label: 'AMD candle phase labels are explicitly hypotheses',
    pattern: /The candle's shape is observable; phase labels are hypotheses rather than verified events/i,
  },
  {
    source: 'primary',
    label: 'daily session boundary is qualified by provider and timezone',
    pattern: /chart's daily-session boundary; the boundary can vary by provider and timezone/i,
  },
  {
    source: 'primary',
    label: 'AMD quiz does not equate a wick with a proven Judas Swing',
    pattern: /possible move below the range, not proof of a Judas Swing/i,
  },
  {
    source: 'primary',
    label: 'missed OTE is not permission to add a post-hoc entry rule',
    pattern: /That is a possible missed setup, not a reason to add a new entry rule after seeing the outcome/i,
  },
  {
    source: 'primary',
    label: 'unqualified OTE variant results in no trade rather than an improvised entry',
    pattern: /record no trade under the OTE rules/i,
  },
];

forbidden.push(...amdOteResidualForbidden);
required.push(...amdOteResidualRequired);

const failures = [];
for (const check of forbidden) {
  if (check.pattern.test(text[check.source])) {
    failures.push('Forbidden claim remains (' + check.label + ') in ' + sources[check.source]);
  }
}
for (const check of required) {
  if (!check.pattern.test(text[check.source])) {
    failures.push('Expected editorial safeguard missing (' + check.label + ') in ' + sources[check.source]);
  }
}

if (failures.length > 0) {
  console.error('[lesson-editorial] Failed:');
  for (const failure of failures) console.error(' - ' + failure);
  process.exit(1);
}

console.log(
  '[lesson-editorial] Passed: ' + forbidden.length + ' legacy claim checks and ' + required.length + ' safeguard checks.',
);
