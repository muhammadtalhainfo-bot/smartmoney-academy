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

];

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

];

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
