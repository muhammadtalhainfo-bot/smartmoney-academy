const fs = require('node:fs');

const postsPath = 'app/blog/posts.js';
const rendererPath = 'app/blog/[slug]/page.js';
const indexPath = 'app/blog/BlogIndexClient.js';
const posts = fs.readFileSync(postsPath, 'utf8');
const renderer = fs.readFileSync(rendererPath, 'utf8');
const index = fs.readFileSync(indexPath, 'utf8');
const errors = [];

const killzoneMetadataMatch = posts.match(/slug:\s*'ict-killzones-guide',[\s\S]*?(?=\n  \},)/);
const killzoneMetadata = killzoneMetadataMatch ? killzoneMetadataMatch[0] : '';
if (!killzoneMetadata) {
  errors.push('Killzone metadata regression guard could not find the article definition.');
} else {
  if (!/title:\s*'ICT Killzone Times: Asian, London & New York',/.test(killzoneMetadata)) {
    errors.push('Killzone article title should target the core query while staying concise.');
  }
  if (!/description:\s*'ICT Asian, London and New York killzone times in New York local time \(EST\/EDT\), plus model context and testing tips\. Windows vary by source\.'/.test(killzoneMetadata)) {
    errors.push('Killzone article description should disclose New York local time conventions and avoid promising outcomes.');
  }
}

const slugs = [...posts.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
if (slugs.length === 0) errors.push('No static blog posts found.');
if (new Set(slugs).size !== slugs.length) errors.push('Blog slugs must be unique.');

const riskyClaims = [
  ['OTE predicts institutional re-entry', /retracement zone identifies precisely where institutions re-enter/i],
  ['certain swing identification', /most traders identify them incorrectly/i],
  ['universal market-order-flow causation', /the force that drives every significant price move/i],
  ['perfect single daily trade implication', /single perfect trade per session/i],
  ['FVG importance certainty', /the most significant fvg of the trading day/i],
  ['displacement guarantees institutional validity', /no entry has institutional validity/i],
  ['QML high-probability certainty', /high-probability turning points/i],
  ['algorithmic inducement intent', /how the algorithm sets traps after a break of structure/i],
  ['method superiority claim', /smart money concepts are superior for precision trading/i],
  ['SMT proves manipulation', /detect institutional manipulation/i],
  ['algorithmic window certainty', /macro times are specific 20-minute windows when the algorithm actively seeks liquidity/i],
  ['inducement intent assertion', /inducement is the deliberate creation of false entry opportunities to trap retail traders/i],
  ['guaranteed liquidity void traversal', /a near-empty zone that price will move through rapidly once it enters/i],
  ['deterministic premium/discount result', /buying in discount and selling in premium aligns your entries with institutional pricing logic — and eliminates the majority/i],
  ['certain weekly-profile forecast', /using them allows you to anticipate the weekly range expansion before it happens/i],
  ['predictable sweep/run binary', /one is a reversal signal\. one is a continuation signal/i],
  ['algorithm certainty', /\bthe algorithm is programmed to\b/i],
  ['unsubstantiated probability ranking', /\bhighest[- ]probability\b/i],
  ['unsubstantiated reliability ranking', /\bmost reliable\b/i],
  ['win-rate promise', /will almost certainly see your win rate improve dramatically/i],
  ['assured challenge result', /the target will be reached naturally/i],
  ['guaranteed reaction claim', /\bguaranteed reaction zone\b/i],
  ['pre-programmed gap fill', /price is programmed to fill them/i],
  ['all-candles AMD claim', /every daily candle follows/i],
  ['deterministic liquidity path', /price never moves from one arbitrary level to another/i],
  ['unverified institutional-volume claim', /control the vast majority of market volume/i],
  ['unverified order-presence claim', /the same institutional orders that drove price away are still waiting to participate again/i],
  ['deterministic CRT claim', /inside every candle, the algorithm goes through three phases/i],
  ['deterministic algorithmic target', /the algorithm will deliver price to that boundary/i],
  ['certain opening-gap fill', /will be filled at some point during the week or session/i],
  ['certain stop-hunt prediction', /your stop will be hunted before the real move occurs/i],
  ['claimed automatic return', /the algorithm returns to fill them/i],
  ['unsupported divergence intent', /institutions are telling you exactly where the real move is going/i],

  ['bank-order certainty', /exact zones where banks placed their orders/i],
  ['deterministic premium-discount rule', /institutions only buy when price is cheap and sell when it is expensive/i],
  ['invented London profile rate', /60-70% of London sessions/i],
  ['invented AMD rate', /60-70% of days follow the AMD template/i],
  ['SCOB reward-to-risk promise', /you will consistently find R:R ratios of 5:1 to 10:1 on clean SCOB setups/i],
  ['market-maker motive assertion', /the market maker \(institutional algorithm\) needs to build a large long position/i],
  ['universal Judas Swing claim', /every significant daily and weekly move has a Judas Swing/i],
  ['backtest certainty claim', /after 100 backtested trades, you will know your actual win rate/i],
  ['propulsion causation claim', /the algorithm's final compression before release/i],
  ['swing-high liquidity inference', /the more candles required to confirm the swing, the more liquidity has accumulated above it/i],
  ['OTE institutional-entry claim', /precise zone where institutional traders re-enter the market after a displacement move/i],
  ['CRT universal AMD claim', /the weekly candle almost always follows the same AMD pattern/i],

  ['AMD price delivery every day', /how price is delivered every single day/i],
  ['IOFED institutional commitment claim', /identifies the precise moment when institutional order flow has committed to a new direction/i],
  ['IOFED unsupported reward-to-risk ratio', /typically produces R:R ratios of 3:1 to 8:1/i],
  ['liquidity void no-activity assertion', /a price range where almost no trading activity occurred/i],
  ['rejection-block deliberate institutional intent', /a deliberate rejection of that price area by institutional participants/i],
  ['Silver Bullet precision promise', /one of the most precise and repeatable setups in ICT methodology/i],
  ['SMT reveals true intent', /is showing you the true directional intent/i],
  ['BPR unfilled institutional-order claim', /both buyers and sellers have unfilled institutional orders waiting to be satisfied/i],
  ['MMSM universal blueprint', /the blueprint for every significant bearish move/i],
  ['unsupported killzone win-rate statistic', /30-40% lower win rates/i],
  ['CBDR daily-range certainty', /has a direct relationship to the expected daily range/i],

  ['banks engineer retail stop scenarios', /they engineer scenarios that cause retail traders to create the orders the bank needs to fill/i],
  ['algorithm delivery destination asserted as fact', /when the algorithm needs to deliver price higher/i],
  ['institutional volume certainty by session', /the largest volume of institutional orders hit the market/i],
  ['unmeasured session probability profile', /a completely different probability profile than the same setup/i],
  ['midnight open starts AMD cycle', /the reference point from which the day's AMD cycle begins/i],
  ['midnight open identifies AMD phase', /tells you which AMD phase you are in/i],
  ['DOL exact algorithm destination', /a precise level on the chart that price is being magnetically drawn toward/i],
  ['IRL ERL fixed sequential cycle', /price typically moves from ERL collection to IRL retracement, back to ERL collection, in a sequential cycle/i],
  ['breaker assumes institutional exit motive', /they used the retail buying at the OB as an exit opportunity/i],
  ['hidden OB institutional dominance', /institutional orders dominate the reaction/i],
  ['Unicorn high-conviction promise', /one of the highest-conviction entries in the framework/i],
  ['first FVG as algorithm commitment', /the algorithm's first directional commitment of the official session/i],
  ['Seek and Destroy intent assertion', /algorithm's behavior of systematically hunting the stop orders on both sides/i],
  ['top-down institutional backing certainty', /your trade has maximum institutional backing/i],
  ['IRL always precedes ERL', /price almost always delivers to IRL targets first before reaching the ERL/i],
  ['displacement reveals institutional identity', /the fingerprint of institutional/i],

  ['FVG means no participation at the same prices', /both buyers and sellers could not participate at the same prices/i],
  ['FVG reveals algorithm target', /when the algorithm needs to deliver price rapidly to a specific target/i],
  ['SMT proves institutional force', /institutional participants are forcing one market to make a new high/i],
  ['SMT proves buying is false', /the institutional buying driving the first market higher is not genuine or sustainable/i],
  ['Turtle Soup algorithm stop certainty', /the algorithm does not break above a swing high because the market is genuinely bullish/i],
  ['Turtle Soup proves necessary liquidity collection', /the algorithm has collected the sell-side liquidity it needed at that level/i],
  ['Macro algorithmic peak claim', /the precise 20-minute periods of peak algorithmic activity/i],
  ['scalping fixed pip target promise', /targeting 20-50 pip moves during high-probability time windows/i],
  ['identical FVG significance across timeframes', /carries the same institutional significance as a 4-hour FVG/i],
  ['QML predicts reversal', /identifies the moment when a trend has overextended, swept the final liquidity pool, and is about to reverse/i],
  ['short-term swing proves order locations', /hold the smallest pools of liquidity/i],
  ['inducement deliberate trap assertion', /the algorithm's deliberate creation of a setup that appears tradeable but is actually designed to trap traders/i],
  ['liquidity run institutional motive', /the algorithm needed those orders to fill its position before continuing to the larger ERL target beyond/i],
  ['BOS ChoCH universal classification', /every structural change on every timeframe is classified as either a BOS/i],
  ['institutional flow future guarantee', /price will ultimately move higher regardless of what retail sentiment says/i],
  ['institutions only buy discount', /institutions only buy when prices are cheap/i],
  ['70.5 ratio as precise OTE entry', /70.5% (the precise OTE entry)/i],

  ['FTMO fixed challenge figures', /The standard FTMO Challenge requires a 10% profit target with a maximum daily loss of 5% and maximum overall loss of 10%/i],
  ['FTMO unsourced failure timing', /the majority of failed challenges blow out in the first 7 days/i],
  ['FTMO Silver Bullet best-model claim', /is arguably the best FTMO challenge setup/i],
  ['Asian range nightly guarantee', /the Asian session creates a tight consolidation range every night/i],
  ['Asian session systematic-sweep claim', /London and New York sessions systematically sweep one side of that range/i],
  ['Asian range algorithm collects all stops', /it triggers all those stops \(providing the liquidity the algorithm needs\)/i],
  ['CE single most specific entry', /the single most specific, objectively defined entry point within/i],
  ['CE institutional order zone claim', /closer to the actual institutional order zone/i],
  ['TGIF algorithm tendency', /capitalizes on the algorithm's tendency to retrace earlier in the week's extreme/i],
  ['TGIF consistent pattern', /the TGIF reveals a consistent pattern/i],
  ['Friday retracement causal certainty', /All three forces consistently produce a Friday retracement/i],
  ['MSS true delivery certainty', /confirms the Judas Swing has ended and the true delivery has begun/i],
  ['MSS eliminates most trap entries', /eliminates the majority of counter-trend trap entries/i],
  ['Inducement intentional trapping', /the algorithm deliberately creates apparent entry signals/i],
  ['Inducement algorithm knows order placement', /the algorithm knows where these orders will be placed/i],
  ['Deepest PD Array guarantees institutional reaction', /where the true institutional reaction will occur/i],
  ['S&D orders react as fact', /institutional orders are placed in these zones, and when price returns, those orders activate again/i],
  ['FVG unsupported probabilistic edge', /gives FVG entries a probabilistic edge that pure S&D zones lack/i],
  ['Pullback guarantees trend resumption', /a retracement that will resume the trend/i],
  ['Pullback profitability superlative', /the skill that separates profitable ICT traders from struggling ones/i],
  ['Reversal strategy reliability superlative', /the most common and reliable ICT reversal pattern/i],
  ['SMT described as institutional signal', /SMT Divergence \(the institutional signal\)/i],
  ['Mitigation assumes filled institutional orders', /those orders were either fully filled/i],
  ['Mitigation guaranteed sharp first reaction', /the reaction tends to be sharp/i],
  ['Instrument-specific OB failure claim', /NAS100\) break OBs more frequently than others/i],

  ['ICT single underlying theory absolutism', /a single underlying theory: that price may be interpreted through/i],
  ['Venom precision model certainty', /a precision entry model built on the/i],
  ['Venom all stops collected', /collecting the stops and pending orders resting at that level/i],
  ['Suspension algorithmic accumulation claim', /the suspension creates an area of algorithmic accumulation/i],
  ['Suspension institutional significance asserted', /a specific price zone of institutional significance/i],
  ['HRLR participant-interest inference', /institutional interest in the move is moderate, not dominant/i],
  ['LRLR institutional commitment claim', /strong institutional commitment/i],
  ['MSS/ChoCH new-direction certainty', /the change is real and the new direction is established/i],
  ['Weekly profiles as forecasting certainty', /most advanced and powerful forecasting tools/i],
  ['OSOK highest-quality setup certainty', /the single setup is the highest-quality opportunity/i],
  ['Reclaimed OB double institutional confirmation', /double confirmation of institutional interest/i],
  ['2022 model as complete strategy claim', /the culmination of Michael Huddleston's decades of market research and teaching/i],
  ['2022 model arbitrary daily risk rule', /Maximum daily loss: 3% of account/i],
  ['ICT institutional price movement as fact', /based on how institutional traders -- banks, hedge funds, and central banks -- move price/i],
  ['SMC teaches exact institutional replication', /teaches retail traders to trade like smart money \(institutions\)/i],
  ['ICT-SMC zones asserted equal institutional zones', /institutional zones \(Order Blocks in ICT equal Supply and Demand in SMC\)/i],
];
for (const [label, pattern] of riskyClaims) {
  if (pattern.test(posts)) errors.push('Remove or qualify the unsupported blog claim: ' + label + '.');
}

if (!renderer.includes('Framework note:') || !renderer.includes('href="/editorial-policy"')) {
  errors.push('Blog articles must show a visible methodology note linking to the editorial policy.');
}
if (index.includes('delivered weekly')) {
  errors.push('Blog index must not promise a publishing cadence the content source does not establish.');
}


const detailedPostSlugs = [

  'ict-ipda-interbank-price-delivery',
  'backtest-ict-strategies',
  'ict-consequent-encroachment-explained',
  'smt-divergence-ict-explained',
  'ict-sibi-bisi-explained',
  'common-ict-mistakes',
  'ict-tgif-setup-explained',
  'ict-reclaimed-order-block',
  'ict-rdrb-redelivered-rebalanced-price-range',
  'ict-vs-smc-difference',
  'ict-bearish-order-block-complete',
  'ict-central-bank-dealers-range',
  'trading-psychology-complete-guide',
  'ict-bullish-order-block-complete',
  'ict-single-candle-order-block-scob',
  'ict-market-maker-buy-model-mmbm',
  'ict-scalping-strategy',
  'ict-suspension-block-2025',
  'ict-market-maker-sell-model-mmsm',
  'ict-propulsion-block-guide',
  'ict-top-down-analysis-complete',
  'ict-macro-times-explained',
  'ict-institutional-order-flow-entry-drill',
  'daily-bias-ict-how-to-determine',
  'ict-venom-model-2025',
  'ict-liquidity-void-explained',
  'ict-inducement-forex-explained',
  'ict-balanced-price-range-bpr',
  'ict-fibonacci-levels-settings',
  'how-to-pass-ftmo-ict-strategy',
  'ict-asian-range-trading-strategy',
  'ict-weekly-profiles-range-expansion',
  'ict-premium-discount-zone-identification',
  'ict-valid-pullback-guide',
  'ict-implied-fair-value-gap-ifvg',
  'ict-bos-vs-choch-complete',
  'ict-seek-and-destroy-friday',
  'ict-silver-bullet-strategy-complete',
  'ict-liquidity-sweep-vs-run',
  'ict-rejection-block-explained',
  'ict-hidden-order-block',
  'ict-swing-high-swing-low-explained',
  'ict-optimal-trade-entry-ote',
  'ict-market-structure-shift-complete',
  'ict-mss-vs-choch-explained',
  'ict-market-order-flow-explained',
  'ict-one-shot-one-kill-model',
  'ict-reversal-patterns-guide',
  'ict-unicorn-model-explained',
  'ict-mitigation-block-guide',
  'ict-1st-presented-fvg-opening-range',
  'ict-displacement-move-explained',
  'ict-qml-quasimodo-pattern',
  'ict-internal-external-range-liquidity',
  'ict-supply-demand-forex',
  'ict-inducement-after-bos',
  'ict-stl-itl-ltl-market-structure',
  'ict-daily-bias-trick',
  'draw-on-liquidity-ict',
  'ict-smt-divergence-complete-guide',
  'what-is-ict-trading',
  'how-to-trade-fair-value-gaps',
  'understanding-order-blocks',
  'ict-market-structure-complete-guide',
  'liquidity-in-ict-trading',
  'ict-killzones-guide',
  'power-of-three-amd-model',
  'ict-premium-discount-zones',
  'ict-breaker-block-explained',
  'ict-turtle-soup-pattern-guide',
  'ict-pd-array-matrix-explained',
  'ict-cisd-change-in-state-of-delivery',
  'ict-candle-range-theory-crt',
  'ict-intraday-profiles-london',
  'ict-nwog-ndog-opening-gaps',
  'ict-power-of-three-amd-complete',
  'ict-valid-fair-value-gap',
  'ict-hrlr-lrlr-liquidity-run',
  'ict-complete-2022-trading-strategy',
  'ict-liquidity-forex-trading',
  'ict-judas-swing-complete',
];
const starts = [...posts.matchAll(/(?:^|\n)\s*\{\n\s+slug:\s*'([^']+)'/g)];
const postChunks = starts.map((match, index) => {
  const start = match.index + match[0].lastIndexOf('{');
  const next = starts[index + 1];
  const end = next ? next.index + next[0].lastIndexOf('{') : posts.length;
  return { slug: match[1], source: posts.slice(start, end) };
});

if (/\n\s*,\n\s*\{"type":"heading"/.test(posts)) {
  errors.push('Blog content contains an empty array slot before an expanded heading.');
}

const remainingZoneEditorialChecks = [
  {
    slug: 'ict-inducement-forex-explained',
    forbidden: [
      ['inducement attributed to algorithmic pullback plan', /before the algorithm had finished its pullback/i],
      ['structure change asserted to deliberately induce traders', /the algorithm creates a minor ChoCH that makes it appear the trend has reversed/i],
      ['marked level presumed swept before true move', /the algorithm will likely sweep that liquidity first/i],
      ['premium/discount location called inducement as fact', /A bullish FVG in premium is likely inducement/i],
      ['deeper order block assumed more significant by timeframe', /the 4-hour OB is more significant/i],
      ['opposing-side sweep treated as universally required', /Has the algorithm swept the opposing liquidity first/i],
    ],
    required: [
      ['inducement is interpretation, not established intent', /does not establish that a market algorithm deliberately designed the setup to trap traders/i],
      ['zone depth is not universal rank', /depth and timeframe alone do not establish which zone is more significant/i],
      ['reference levels are alternative paths, not presumed algorithmic targets', /Record them as alternative paths the market may reach, not levels an algorithm will likely sweep/i],
    ],
  },
  {
    slug: 'ict-hidden-order-block',
    forbidden: [
      ['hidden order block said fully valid by definition', /a fully valid ICT Order Block/i],
      ['return to hidden zone said to provide an entry', /it should react as a standard OB would/i],
      ['overlapping wicks equated with increased institutional significance', /each one adding to the institutional significance/i],
      ['hidden zones forecast as upcoming session entries', /will often be the commonly discussed entry zones of the upcoming session/i],
      ['hidden zones called powerful categorically', /Why Hidden OBs Are Powerful/i],
      ['hidden institutional orders trigger asserted as fact', /The institutional orders sitting at the Hidden OB level trigger/i],
    ],
    required: [
      ['lower timeframe does not prove cause or reaction', /does not prove that the candidate zone caused the wick or will react on a revisit/i],
      ['zone selection is source-specific and reproducible', /State the confirmation and boundary rules; other valid conventions may choose a different candle or no zone at all/i],
      ['touch is not automatic entry', /A return to the zone is an observation point, not an automatic entry/i],
      ['cluster compared with baseline', /test it against a single-zone and simple wick-reference baseline/i],
    ],
  },
  {
    slug: 'ict-rejection-block-explained',
    forbidden: [
      ['wick claimed to represent institutional interest', /The long wick represents price reaching into an area of institutional interest/i],
      ['order block said to show institutional accumulation', /shows where institutions were accumulating their position/i],
      ['wick claimed definitive algorithmic rejection', /the furthest extreme the algorithm reached and definitively rejected/i],
      ['session wick zones claimed reliable across sessions', /gives you reliable, session-to-session structure/i],
      ['automatic midpoint entry prescription', /Enter at the midpoint of the Rejection Block zone/i],
      ['session extremes claimed particularly powerful', /Rejection Blocks at session extremes are particularly powerful/i],
    ],
    required: [
      ['rejection is interpretation not evidence of motive', /it does not identify institutional interest or establish that price was deliberately rejected/i],
      ['wick percentage is candidate parameter', /A 40–50% wick-to-range ratio is one candidate parameter, not a universal ICT requirement/i],
      ['entry variant has explicit risk and expiry rules', /Specify the trigger, invalidation, maximum risk, expiry and exit in advance/i],
      ['session hypothesis measured instead of assumed', /compare retests, clean breaks and no-revisit cases across sessions/i],
    ],
  },
];
for (const check of remainingZoneEditorialChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing article required for zone editorial checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) errors.push('/blog/' + check.slug + ': zone editorial regression (' + label + ').');
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) errors.push('/blog/' + check.slug + ': required zone safeguard missing (' + label + ').');
  }
}





const remainingSweepEditorialChecks = [
  {
    slug: 'ict-liquidity-sweep-vs-run',
    forbidden: [
      ['sweep/run described as guaranteed reversal versus continuation', /one signals a reversal and the other signals continuation/i],
      ['sweep claimed to trigger known stop orders', /triggering the stop orders resting there/i],
      ['sweep equated with proven manipulation', /The sweep is complete; it was manipulation/i],
      ['run described as using collected stops as fuel', /using that liquidity as fuel to continue/i],
      ['universal one-to-three-bar classification window', /within 1-3 candles of the sweep/i],
      ['larger target asserted to make a run more likely', /making a run more likely than a sweep/i],
      ['PD Array made a binary sweep/run test', /If there is no significant PD Array beyond the sweep level, it may be a run/i],
    ],
    required: [
      ['sweep and run are testable labels not advance signals', /These are chart-classification labels, not reliable advance signals/i],
      ['order presence and motive not inferred from the crossing', /does not confirm that stop orders were present, that they were triggered, or that a participant intended to target them/i],
      ['observation window is a model parameter', /There is no universal one-to-three-candle rule/i],
      ['extra reference filters are tested against baseline', /test the extra filter against the same base rule without it/i],
    ],
  },
  {
    slug: 'ict-turtle-soup-pattern-guide',
    forbidden: [
      ['majority of breakouts claimed to be engineered stop hunts', /the majority of apparent breakouts are engineered stop hunts/i],
      ['bars held said to imply accumulated stop orders', /the longer it holds, the more stop orders have accumulated/i],
      ['killzone sweeps asserted more reliable', /sweeps during killzones are significantly more reliable/i],
      ['sharp return proves manipulation', /confirms the sweep was manipulation/i],
      ['trapped traders claimed to accelerate the move', /The trapped buyers will exit as price falls, accelerating the bearish move/i],
      ['higher timeframe said to ensure a more powerful reversal', /the more powerful the reversal/i],
      ['rejection violence presented as confirmation of a stop hunt', /The violence of the rejection is confirmation of the liquidity sweep/i],
    ],
    required: [
      ['Turtle Soup described as failed-break candidate without motive claims', /a possible failed break of a prior high or low followed by a return/i],
      ['killzone filter explicitly requires comparison', /compare qualifying events inside and outside that window/i],
      ['candidate entry includes missed fill and failure cases', /Include cases with no retracement, a missed fill, a failed trigger or continued movement through the zone/i],
      ['higher-timeframe levels require measured comparison', /compare outcomes on matched samples before claiming added value/i],
      ['displacement filter is a variant rather than universal rule', /a predeclared filter rather than a universal requirement/i],
    ],
  },
];
for (const check of remainingSweepEditorialChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing article required for sweep editorial checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) errors.push('/blog/' + check.slug + ': sweep editorial regression (' + label + ').');
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) errors.push('/blog/' + check.slug + ': required sweep safeguard missing (' + label + ').');
  }
}


const remainingStructuralEditorialChecks = [
  {
    slug: 'ict-stl-itl-ltl-market-structure',
    forbidden: [
      ['nested swing tiers claimed to measure liquidity accumulation', /represent different levels of liquidity accumulation/i],
      ['short-term swing break attributed to algorithmic liquidity collection', /the algorithm breaks an STL while maintaining ITL and LTL intact/i],
      ['intermediate swing break said to prove a deeper retracement', /a deeper retracement is underway — trade the retracement/i],
      ['long-term swing break said to establish trend reversal', /the primary trend is potentially reversing — this warrants a complete re-analysis/i],
      ['nearest ITH/ITL prescribed as target', /targeting the nearest ITH|targeting the nearest ITL/i],
      ['hierarchy promises traders will never be fooled again', /you will never again be fooled by a minor stop hunt/i],
    ],
    required: [
      ['swing tiers are labels under chosen pivot rules', /these labels are built from chosen pivot rules and lookbacks; they organize chart structure but do not measure liquidity or predict future price/i],
      ['ChoCH label varies by source and timeframe', /whether that event is labelled a Change of Character \(ChoCH\) varies by source and timeframe/i],
      ['swing roles are candidate model rules, not universal hierarchy', /treat each role as a separate rule to test rather than a universal hierarchy/i],
      ['practice log is not evidence of predictive skill', /repetition is a way to build a consistent record, not evidence that the hierarchy predicts future moves/i],
    ],
  },
  {
    slug: 'ict-daily-bias-trick',
    forbidden: [
      ['nearest liquidity pool required to determine bias', /you must identify which of these liquidity pools is closest and most likely to be reached/i],
      ['Asian low/high sweep prescribes London bias', /If the Asian low was swept overnight, the bias for London is likely bullish/i],
      ['algorithm alleged to accumulate during consolidation', /The algorithm is accumulating during these periods/i],
      ['pre-session thesis claimed to be the true bias', /True bias is determined in pre-session analysis/i],
      ['prior-day levels claimed the most useful universal anchor', /The Most Useful Daily Bias Anchor/i],
    ],
    required: [
      ['DOL is a candidate and not a required or guaranteed target', /you do not need to select one target to form every directional thesis, and proximity does not establish that price will reach it/i],
      ['Asian range crossing alone does not set directional bias', /A crossing of the Asian high or low is an observation, not a directional rule by itself/i],
      ['bias is a conditional hypothesis rather than known direction', /Pre-session notes document a hypothesis, not a true direction known in advance/i],
      ['range conditions may produce multiple outcomes', /ranging conditions can produce whipsaws, continuation or no trigger/i],
    ],
  },
  {
    slug: 'ict-displacement-move-explained',
    forbidden: [
      ['universal 60-80% body-to-range definition', /the body \(open to close\) represents 60-80% or more of the total candle range/i],
      ['every valid FVG requires displacement', /Every valid FVG requires displacement/i],
      ['FVG/OB attributed to balanced retail participation', /created by balanced retail participation — both buyers and sellers engaged/i],
      ['displacement filter promises elimination of most losing trades', /This single filter will eliminate the majority of losing ICT trades/i],
      ['overlap said to prove balanced participation', /Overlapping candles indicate balanced participation, not displacement/i],
    ],
    required: [
      ['displacement criteria are predeclared candidate measures', /A 60–80% body ratio is one candidate threshold to test, not a universal requirement/i],
      ['FVG and displacement can be defined separately', /A three-candle gap is a chart pattern under that convention, not evidence of institutional activity or a guarantee of predictive value/i],
      ['filter is benchmarked against baseline with failure cases', /Compare the combined rule with the FVG rule alone on the same sample/i],
    ],
  },
  {
    slug: 'ict-bos-vs-choch-complete',
    forbidden: [
      ['BOS presented as proof of continuation', /confirming that the trend is continuing/i],
      ['BOS called green light for trend-following trades', /The BOS is your green light for trend-following trades/i],
      ['BOS said to confirm retracement has ended', /it confirms that the retracement was just a pullback within the trend/i],
      ['ChoCH and MSS sequence claimed universally required for reversal', /The transition from trend to reversal requires: ChoCH first/i],
      ['structural labels directly prescribe buy/sell', /buy when price pulls back to a PD Array after a BOS/i],
      ['daily log promises to prevent countertrend mistakes', /prevents the common mistake of trading counter-trend entries/i],
    ],
    required: [
      ['BOS is a common convention and does not prove continuation', /Under one common convention, a Break of Structure \(BOS\).*?the label does not prove that continuation has occurred/i],
      ['BOS/PD-array trigger must be independently defined', /If using BOS as a trigger or filter, define the entry, invalidation, expiry and exit rules before testing/i],
      ['BOS/ChoCH direction inference requires written rules', /If a strategy maps a BOS or ChoCH\/MSS sequence to direction, specify the exact classification, entry and invalidation rules/i],
    ],
  },
  {
    slug: 'ict-mss-vs-choch-explained',
    forbidden: [
      ['MSS and ChoCH said universally distinct in sequence', /They are related but distinct — they happen at different moments in the structural sequence/i],
      ['daily MSS defined as confirming bearish shift', /confirming the daily structure has shifted bearish/i],
      ['ChoCH/MSS labels treated as universally alert then execution', /The ChoCH gives you the alert to watch for the trade\. The MSS gives you the confirmation to execute the trade/i],
      ['five-minute MSS claimed complete entry signal', /The 5-minute MSS within the 4-hour FVG is the complete entry signal/i],
      ['MSS heading universally presented as confirmation', /Market Structure Shift \(MSS\) — The Confirmation/i],
    ],
    required: [
      ['MSS/ChoCH terms can overlap or differ by source', /their meanings can overlap or differ by source/i],
      ['timeframe cases are examples, not universal definitions', /These are example rules; they do not confirm that daily structure has shifted bearish/i],
      ['lower timeframe trigger is model-specific and incomplete without risk rules', /a 5-minute label is not a complete or universally required entry model/i],
      ['model-specific label distinction is reinforced', /Some ICT models require a second structure event after a ChoCH, while others define their trigger differently/i],
    ],
  },
  {
    slug: 'ict-liquidity-forex-trading',
    forbidden: [
      ['nearest liquidity pool prescribed as the default market direction', /stop thinking about price going .*?and start thinking about price going toward the nearest liquidity pool/i],
      ['nearest liquidity pool implied to be the required daily target', /Before every session, ask: .*?nearest significant liquidity pool/i],
    ],
    required: [
      ['liquidity references framed as scenarios rather than default direction', /the nearest pool is not necessarily the best target and price need not move toward it/i],
      ['alternative directions and invalidation are explicitly recorded', /list plausible upside and downside references, define what evidence would favor each scenario/i],
      ['nearest-pool approach compared against a baseline', /Compare this approach with a baseline that does not require selecting the nearest liquidity pool/i],
    ],
  },
];
for (const check of remainingStructuralEditorialChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing article required for structural editorial checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) {
      errors.push('/blog/' + check.slug + ': structural editorial regression (' + label + ').');
    }
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) {
      errors.push('/blog/' + check.slug + ': required structural safeguard missing (' + label + ').');
    }
  }
}
for (const slug of detailedPostSlugs) {
  const post = postChunks.find((item) => item.slug === slug);
  if (!post) {
    errors.push('Missing article required for content-depth checks: ' + slug);
    continue;
  }
  for (const heading of ['Worked hypothetical example', 'Failure case and what to test', 'Test checklist']) {
    if (!post.source.includes(heading)) errors.push('/blog/' + slug + ': missing ' + heading + '.');
  }
}
const overclaimTitles = [
  ['certain swing-label superiority', /title:\s*'[^']*How to Identify Them Correctly/i],
  ['precise OTE prediction', /title:\s*'[^']*Optimal Trade Entry Explained with Fibonacci/i],
  ['most important daily FVG', /title:\s*'[^']*Most Important FVG of the Day/i],
  ['deterministic price direction', /title:\s*'[^']*The Concept That Changes Everything/i],
  ['universal reversal certainty', /title:\s*'[^']*High-Probability Turning Points/i],
  ['certain algorithmic macro activity', /title:\s*'[^']*Algorithm's Precise 20-Minute Windows/i],
  ['mechanical entry certainty', /title:\s*'[^']*Most Precise Mechanical Entry Model/i],
  ['exact daily direction', /title:\s*'[^']*Exact Method for Determining Direction Every Day/i],
  ['guaranteed prop-firm pass implication', /title:\s*'[^']*How to Pass FTMO Using ICT Strategy/i],
  ['exact Fibonacci settings claim', /title:\s*'[^']*Exact Settings and How to Apply Them/i],
  ['secret zone superiority claim', /title:\s*'[^']*Secret PD Array Most Traders Miss/i],
  ['deterministic rejection zone claim', /title:\s*'[^']*Shows Exactly Where Price Was Rejected/i],
  ['certain day-of-week profile forecast', /title:\s*'[^']*Weekly High and Low Before Friday/i],
  ['fixed daily profit promise', /title:\s*'[^']*How to Book 30-50 Pips a Day/i],
  ['guaranteed day-direction claim', /title:\s*'[^']*CBDR[^']*Predicts the Day/i],
  ['exclusive session promise', /title:\s*'[^']*The Only Hours That Matter/i],
  ['certain reversal promise', /title:\s*'[^']*Catch Institutional Reversals/i],
  ['certain entry power claim', /title:\s*'[^']*Powers Every Entry/i],

  ['overstated swing mastery', /title:\s*'[^']*The Foundation Every Trader Must Master/i],
  ['universal entry promise', /title:\s*'[^']*Defines Every Entry/i],
  ['single-candle transformational promise', /title:\s*'[^']*When One Candle Changes Everything/i],
  ['universal Judas Swing promise', /title:\s*'[^']*Precedes Every Real Move/i],
  ['precision trading promise', /title:\s*'[^']*Trade It Precisely/i],

  ['AMD everyday guarantee', /title:\s*'[^']*Every Single Day/i],
  ['MMSM universal blueprint title', /title:\s*'[^']*Complete Bearish Delivery Framework/i],

  ['liquidity-only price causation title', /title:\s*'[^']*Why Price Really Moves/i],

  ['Turtle Soup cleanest strategy title', /title:\s*'[^']*cleanest reversal strategies/i],
  ['ICT complete guide absolutism title', /title:\s*'[^']*Complete ICT Trading Guide/i],
];
for (const [label, pattern] of overclaimTitles) {
  if (pattern.test(posts)) errors.push('Avoid unsupported blog-title claim: ' + label + '.');
}


const overclaimDescriptions = [
  ["bank orders stated as fact", /exact zones where banks placed their orders/i],
  ["market-structure absolutism", /every other concept falls apart/i],
  ["institutional premium-discount certainty", /institutions only buy when price is cheap/i],
  ["PD Array rank implies probability", /ranked from highest to lowest probability/i],
  ["session profile guarantees direction", /tells you the direction and structure of the entire session before it unfolds/i],
  ["AMD applies to every candle", /behind every candle, every session, and every weekly cycle/i],
  ["FVG validity guarantees quality", /high-probability FVGs from noise/i],
  ["RDRB reveals intent", /reveals institutional intent at key turning points/i],
  ["order-block entry guarantee", /consistently produces high-probability, high-reward trades/i],
  ["SCOB quality certainty", /most precise and reliable OB types/i],
  ["liquidity as universal market engine", /the engine that drives every significant price move/i],
  ["SIBI proves institutional delivery", /identify one-sided institutional delivery/i],
  ["MMBM universal blueprint", /complete blueprint for bullish institutional delivery/i],
  ["Judas Swing intent", /the deliberate false move the algorithm makes to trap retail traders/i],
  ["backtest proves edge", /backtesting is how you prove your edge/i]
];
for (const post of postChunks) {
  const descriptionMatch = post.source.match(/description:\s*'((?:\\.|[^'\\])*)'/);
  const description = (descriptionMatch?.[1] || '').replace(/\\'/g, "'");
  for (const [label, pattern] of overclaimDescriptions) {
    if (pattern.test(description)) errors.push('/blog/' + post.slug + ': unsupported description claim: ' + label + '.');
  }
}


const overclaimDescriptionsBatch4 = [
  ["AMD daily certainty", /every single day/i],
  ["IOFED institutional certainty", /precise moment when institutional order flow has committed/i],
  ["Silver Bullet edge promise", /most precise and repeatable setups/i],
  ["MMSM every-move blueprint", /blueprint for every significant bearish move/i]
];
for (const post of postChunks) {
  const descriptionMatch = post.source.match(/description:\s*'((?:\\.|[^'\\])*)'/);
  const description = (descriptionMatch?.[1] || '').replace(/\\'/g, "'");
  for (const [label, pattern] of overclaimDescriptionsBatch4) {
    if (pattern.test(description)) errors.push('/blog/' + post.slug + ': unsupported description claim: ' + label + '.');
  }
}


const overclaimDescriptionsBatch5 = [
  ["liquidity as sole price driver", /Liquidity is the real reason price moves/i]
];
for (const post of postChunks) {
  const descriptionMatch = post.source.match(/description:\s*'((?:\\.|[^'\\])*)'/);
  const description = (descriptionMatch?.[1] || '').replace(/\\'/g, "'");
  for (const [label, pattern] of overclaimDescriptionsBatch5) {
    if (pattern.test(description)) errors.push('/blog/' + post.slug + ': unsupported description claim: ' + label + '.');
  }
}


const overclaimDescriptionsBatch6 = [
  ["Turtle Soup cleanest strategy promise", /one of ICT's cleanest reversal strategies/i],
  ["FVG most-traded superlative", /the most traded ICT concept — and the most misunderstood/i]
];
for (const post of postChunks) {
  const descriptionMatch = post.source.match(/description:\s*'((?:\\.|[^'\\])*)'/);
  const description = (descriptionMatch?.[1] || '').replace(/\\'/g, "'");
  for (const [label, pattern] of overclaimDescriptionsBatch6) {
    if (pattern.test(description)) errors.push('/blog/' + post.slug + ': unsupported description claim: ' + label + '.');
  }
}


const overclaimDescriptionsBatch7 = [
  ["FTMO guaranteed setup", /is arguably the best FTMO challenge setup because of its defined time window/i],
  ["Asian range probability promise", /high-probability directional bias for the day/i],
  ["Friday setup guarantee", /consistent Friday retracement pattern/i]
];
for (const post of postChunks) {
  const descriptionMatch = post.source.match(/description:\s*'((?:\\.|[^'\\])*)'/);
  const description = (descriptionMatch?.[1] || '').replace(/\\'/g, "'");
  for (const [label, pattern] of overclaimDescriptionsBatch7) {
    if (pattern.test(description)) errors.push('/blog/' + post.slug + ': unsupported description claim: ' + label + '.');
  }
}


const overclaimDescriptionsBatch8 = [
  ["Venom as precision model", /precision entry model built on the combination of/i],
  ["weekly profile forecast certainty", /forecasts the weekly high and low using a predictable five-day pattern/i],
  ["2022 model complete framework superiority", /the complete trading framework Michael Huddleston revealed/i]
];
for (const post of postChunks) {
  const descriptionMatch = post.source.match(/description:\s*'((?:\\.|[^'\\])*)'/);
  const description = (descriptionMatch?.[1] || '').replace(/\\'/g, "'");
  for (const [label, pattern] of overclaimDescriptionsBatch8) {
    if (pattern.test(description)) errors.push('/blog/' + post.slug + ': unsupported description claim: ' + label + '.');
  }
}


const focusedSeoRegressions = [
  ['killzone time certainty', /The London Killzone is often the most deceptive period of the trading day/i],
  ['New York session institutional-volume certainty', /The New York AM session is the most important trading window of the entire day/i],
  ['deepest weekly liquidity claim', /creates the deepest liquidity of the week/i],
  ['London reversal certainty', /the classic London session pattern:[\s\S]{0,500}day's true bearish move/i],
  ['breaker institutional-exit motive', /the smart money used the return to the OB to exit, not to enter/i],
  ['breaker retest superlative', /The cleanest Breaker Block entry occurs at the first retest/i],
  ['breaker reward-to-risk promise', /Risk-to-reward ratios of 3:1 or better are common with Breaker Block entries/i],
  ['breaker buy-stop certainty', /taking out all the buy-stop orders above/i],
  ['breaker institutional-control conclusion', /confirms the bears are fully in control/i],
  ['fixed EST session label', /Asian Session \(7 PM – 12 AM EST\)/i],
  ['NYSE regular-session opening mislabeled as 10 AM', /10:00 AM EST — NYSE Open Macro — full NYSE liquidity comes online/i],
  ['IFVG presented as a probability comparison without evidence', /IFVG vs Standard FVG — Probability Comparison/i],
  ['IFVG midpoint entry presented as a prescribed setup', /Enter short at the CE of the IFVG zone/i],
];
for (const [label, pattern] of focusedSeoRegressions) {
  if (pattern.test(posts)) errors.push('Unsupported claim regression: ' + label + '.');
}

const requiredSeoContext = [
  ['killzone title aligns with search wording', /title: 'ICT Killzone Times: Asian, London & New York'/],
  ['killzone clock uses New York local time', /Asian Session \(7 PM – 12 AM New York time\)/],
  ['macro timestamps are described as references to test', /Some ICT sources discuss specific macro timestamps, but labels and definitions can differ/i],
  ['NYSE open is not mislabeled as 10 AM', /the regular NYSE core session opens at 9:30 AM ET/i],
  ['general FVG guide has distinct search-intent metadata', /metaTitle: 'Fair Value Gap \(FVG\): Meaning, Rules & Examples'/],
  ['validated FVG guide targets rule-definition intent', /metaTitle: 'Valid FVG Rules: Define and Test ICT Gaps'/],
  ['CE guide targets midpoint-calculation intent', /metaTitle: 'Consequent Encroachment \(CE\): FVG Midpoint Rules'/],
  ['IFVG page targets inverted-gap intent', /metaTitle: 'What Is an IFVG\? Inverted Fair Value Gap Rules'/],
  ['IFVG comparison is framed as testing separate setups', /IFVG vs Standard FVG — Compare Outcomes as Separate Setups/],
  ['IFVG entries are described as a variant to test', /One setup variant some traders test is a return into a reclassified zone/],
  ['IFVG title uses inverted wording', /title: 'Inverted Fair Value Gap \(IFVG\): ICT Rules and Retests'/],
  ['inducement title targets forex query', /title: 'What Is Inducement in Forex\? ICT Concept and Examples'/],
  ['breaker explanations avoid institutional-motive inference', /Candles do not show whether institutional buyers abandoned the area/i],
  ['breaker retest entry is framed as a variant to test', /One entry variant some ICT traders test is a first retest/i],
];
for (const [label, pattern] of requiredSeoContext) {
  if (!pattern.test(posts)) errors.push('Expected SEO/editorial context missing: ' + label + '.');
}


const articleBodyRegressionChecks = [
  {
    slug: 'ict-pd-array-matrix-explained',
    forbidden: [
      ['PD Array probability hierarchy presented as fact', /ICT ranks PD Arrays from highest to lowest probability/i],
      ['premium and discount as mandatory buy/sell zones', /You only buy PD Arrays in discount[\s\S]{0,120}You only sell PD Arrays in premium/i],
      ['premium/discount claimed to reveal institutional buyers and sellers', /the institutional sellers will be at those levels/i],
      ['BPR reactions ranked as sharpest and fastest', /Reactions at BPRs are typically the sharpest and fastest/i],
      ['BPR overlap treated as stacked institutional orders', /both types of institutional imbalance are stacked at the same price level/i],
    ],
    required: [
      ['PD Array ranking is explicitly unvalidated', /no universal, independently validated probability ranking/i],
      ['premium/discount framed as contextual', /Premium and discount describe location relative to a chosen range midpoint/i],
      ['BPR is defined as visible overlap, not orders', /an overlap of candle-defined price areas; it does not prove that institutional orders remain at that level/i],
    ],
  },
  {
    slug: 'ict-liquidity-forex-trading',
    forbidden: [
      ['BSL described as algorithm-engineered to fill institutional orders', /When the algorithm needs to fill large buy orders, it drives price above BSL levels/i],
      ['SSL described as algorithm-engineered to fill institutional orders', /When the algorithm needs to fill large sell orders[\s\S]{0,300}it drives price below SSL levels/i],
      ['all traders assumed to place stops at equal highs', /every trader who looks at the chart will see those equal highs and place stop orders/i],
      ['equal highs and lows claimed to be the most heavily targeted pools', /the most heavily targeted liquidity pools/i],
      ['sweeps treated as necessary before a directional move', /Expect price to take out equal lows before a bullish move/i],
      ['touch-count claimed to prove more orders and a stronger reaction', /the more liquidity has accumulated there, and the stronger the reaction after the sweep will be/i],
      ['DOL required for every ICT trade', /Every ICT trade has a Draw on Liquidity/i],
      ['nearest liquidity pool promised as the daily target', /The answer to that question is your daily target/i],
    ],
    required: [
      ['liquidity is separated from observed order-book contents', /A chart does not show the complete order book or confirm which orders are present/i],
      ['BSL outcome is described as a hypothesis', /Some ICT narratives hypothesize that a move above a BSL reference may trigger stops/i],
      ['equal highs and lows are candidate areas rather than universal targets', /They are candidate reference areas, not automatically the primary targets in every session/i],
      ['DOL remains a candidate target hypothesis', /Some ICT models use a Draw on Liquidity \(DOL\) as a candidate target hypothesis/i],
    ],
  },
  {
    slug: 'ict-balanced-price-range-bpr',
    forbidden: [
      ['FVG described as proof that one side could not participate', /a gap where (?:sellers|buyers) could not participate/i],
      ['BPR presented as typically producing fixed high R multiples', /typically produces R:R ratios of 5:1 or better/i],
      ['BPR alignment treated as a priority entry by default', /it is your priority entry/i],
      ['counter-bias BPR treated as guaranteed stop-management reaction', /expect a reaction there even while in a profitable trade/i],
    ],
    required: [
      ['BPR definition remains grounded in chart overlap', /The overlap can be marked as a Balanced Price Range/i],
      ['BPR reward-risk claims are explicitly not assumed', /does not establish a typical 5:1-or-better result/i],
      ['BPR boundary and entry rules are model-specific', /Possible test rules include entry at the overlap midpoint/i],
    ],
  },
  {
    slug: 'power-of-three-amd-model',
    forbidden: [
      ['AMD tied to a fixed weekday schedule', /Monday is often the Accumulation day[\s\S]{0,180}Tuesday is often the Manipulation day/i],
      ['London declared the most deceptive session', /the most deceptive session of the day/i],
      ['distribution asserted as institutional delivery', /The Distribution phase is when institutions deliver price to their target/i],
      ['AMD stated as a universal fractal cycle', /The same three-phase pattern that describes a single day also describes an entire week/i],
    ],
    required: [
      ['AMD phase timing is a testable hypothesis', /Those calendar associations are hypotheses, not reliable schedules/i],
      ['AMD timeframe patterns are not universal cycles', /do not establish a universal fractal cycle/i],
    ],
  },
  {
    slug: 'ict-killzones-guide',
    forbidden: [
      ['killzones treated as guaranteed win-rate advantage', /These windows guarantee cleaner price action or higher win rates/i],
    ],
    required: [
      ['session windows are described as filters to test', /do not guarantee cleaner price action or higher win rates/i],
    ],
  },
  {
    slug: 'ict-mss-vs-choch-explained',
    forbidden: [
      ['MSS universally required after every ChoCH', /Never enter on a ChoCH alone[\s\S]{0,180}Wait for the MSS/i],
    ],
    required: [
      ['structure labels treated as model-specific conventions', /Some ICT models require a second structure event after a ChoCH, while others define their trigger differently/i],
    ],
  },
  {
    slug: 'what-is-ict-trading',
    forbidden: [
      ['unverified education-library superlative', /one of the most comprehensive free trading education libraries in the world/i],
      ['all retail traders stereotyped as relying on lagging indicators', /They use lagging indicators designed to describe what already happened\. They chase patterns/i],
    ],
    required: [
      ['retail trading approaches are not generalized as one group', /No single description applies to all retail traders/i],
    ],
  },
  {
    slug: 'ict-mitigation-block-guide',
    forbidden: [
      ['Order Block reaction portrayed as confirmation that it will hold', /the OB has been tested and confirmed[\s\S]{0,100}the original move resumes/i],
      ['mitigation block lifecycle declared universally', /The zone is now a Mitigation Block/i],
    ],
    required: [
      ['mitigation-block terminology is qualified by convention', /Some educators label a zone that price has crossed a mitigation block, while others use different conventions/i],
    ],
  },
  {
    slug: 'ict-sibi-bisi-explained',
    forbidden: [
      ['SIBI/BISI assumed to identify participant absence', /sellers were entirely absent|buyers were entirely absent/i],
      ['SIBI/BISI treated as absolute buy/sell instructions', /Never buy a SIBI and never sell a BISI|Only buy BISI zones in bullish institutional order flow/i],
      ['SIBI/BISI said to reveal institutional buying/selling', /overwhelming institutional buying that drove price|institutional selling so dominant/i],
    ],
    required: [
      ['BISI is a candle-pattern label rather than participant evidence', /A BISI \(bullish FVG\) is one ICT label for a bullish three-candle gap/i],
      ['SIBI/BISI benefits are not presumed without testing', /labels themselves do not prove directional intent or an edge/i],
    ],
  },
  {
    slug: 'draw-on-liquidity-ict',
    forbidden: [
      ['all price movement reduced to deterministic liquidity delivery', /every significant move has a predetermined target/i],
      ['DOL required as every take-profit method', /Your DOL becomes your take-profit target before you ever enter a trade/i],
      ['DOL practice promises fast improvement', /dramatically better at reading the market[\\]?'s intentions within 60-90 days/i],
    ],
    required: [
      ['DOL path is explicitly a hypothesis', /One ICT narrative describes some moves as transitions between candidate liquidity references/i],
      ['DOL is one exit method among alternatives', /A candidate DOL can be one preplanned exit method, alongside fixed-R, time-based or other tested rules/i],
    ],
  },
  {
    slug: 'ict-implied-fair-value-gap-ifvg',
    forbidden: [
      ['IFVG declared to flip automatically after violation', /IFVGs \(fully violated and flipped\)/i],
      ['every violated gap treated as an expensive mistake', /one of the most expensive mistakes in ICT trading/i],
    ],
    required: [
      ['close-through does not guarantee a role reversal', /A close through does not guarantee a role reversal/i],
    ],
  },
  {
    slug: 'ict-market-structure-complete-guide',
    forbidden: [
      ['structure labels said to explain everything about trend', /tells you everything you need to know about trend direction and strength/i],
      ['external swing break declared a genuine reversal', /Only when a major external structural high is taken out does a genuine trend reversal occur/i],
      ['BOS and ChoCH treated as universal outcome rules', /A BOS confirms the trend — it is a continuation signal\. Only a ChoCH signals a potential reversal/i],
      ['ChoCH displacement threshold stated as universal', /The displacement that creates a ChoCH must be significant/i],
      ['BOS directly prescribes a trade on the next pullback', /trend continuation signal = look for longs on the next pullback/i],
      ['weak-looking break universally excluded as a ChoCH', /a weak, hesitant break is not a true ChoCH/i],
      ['ChoCH/MSS stated as universally equivalent and direction-confirming', /also called Market Structure Shift \(MSS\)[\s\S]{0,280}confirm(?:s|ing) the new bearish direction/i]
    ],
    required: [
      ['external/internal structure remains convention-based', /Some ICT conventions call larger swings external structure and smaller swings within the current range internal structure/i],
      ['structure labels do not guarantee outcomes', /Educators define these labels differently; neither label guarantees continuation or reversal/i],
      ['swing-tier terms and pivot rules vary by ICT source', /Some ICT sources distinguish short-term, intermediate-term and long-term swing labels, but terminology and pivot rules vary/i],
      ['ChoCH/MSS definitions are source-dependent', /Some ICT sources use Change of Character \(ChoCH\) and Market Structure Shift \(MSS\) in overlapping ways/i],
      ['BOS classification does not mandate an entry', /Treat it as a condition to test, not an automatic continuation signal or instruction to enter long/i],
      ['ChoCH displacement threshold is predeclared rather than universal', /There is no universal rule that makes a weak-looking break invalid across every source/i]
    ],
  },
  {
    slug: 'ict-1st-presented-fvg-opening-range',
    forbidden: [
      ['opening range claims institutional execution without evidence', /institutional orders that accumulated overnight and during the pre-market session are being executed/i],
      ['opening range targets described as algorithm destination', /liquidity pools that the algorithm will seek during the rest of the session/i],
      ['retracement labeled most common without measured evidence', /The first opportunity is the most common/i],
      ['first-presented FVG ranked as the single most important', /single most important FVG to mark each trading day/i],
      ['opening range highs and lows guaranteed as primary targets', /are the primary liquidity targets of the opening session/i],
    ],
    required: [
      ['first-presented FVG is framed as a reference rule', /The first qualifying FVG after a selected open is one reproducible reference rule/i],
      ['entry rule explicitly accounts for misses and costs', /The setup may not trigger; include missed fills and execution costs in the test/i],
    ],
  },

  {
    slug: 'how-to-trade-fair-value-gaps',
    forbidden: [
      ['CE called the primary entry target and best gap-fill level', /CE is the primary entry target when price returns to an FVG|best balance between entry precision and gap fill probability/i],
      ['FVG definition claims one side could not participate', /buyers were so aggressive that sellers could not participate|sellers moved price down so aggressively that buyers could not participate/i],
      ['all FVGs require high-timeframe agreement', /FVGs only have high probability when they align with the broader institutional order flow direction/i],
      ['displacement proves institutional orders were triggered', /confirmation that institutional orders are being triggered/i],
    ],
    required: [
      ['CE is an optional reference rather than a required target', /Some ICT variants use CE as a possible entry reference/i],
      ['FVG non-revisit and failed-reaction cases are recorded', /log no-revisit, partial-fill, full-fill and continuation cases/i],
    ],
  },
  {
    slug: 'understanding-order-blocks',
    forbidden: [
      ['order block claims to identify institutional accumulation and unfilled orders', /highest concentration of unfilled orders|The final candle of this accumulation phase/i],
      ['order-block revisit said to activate orders and create a strong reaction', /When price returns to this zone, those orders are activated again/i],
      ['breaker block universally ranked above standard OBs', /Breaker Blocks are actually considered higher quality than standard OBs/i],
      ['propulsion block ranked among the strongest entries', /among the strongest entry zones in the entire framework/i],
      ['lower-timeframe move described as proof of institutional activation', /confirmation that institutional orders are being triggered/i],
      ['order-block mechanism asserted as universal institutional execution fact', /Large institutions — banks, hedge funds, central banks — cannot enter positions the way retail traders do/i],
      ['large bank order said inevitably to move price significantly against itself', /A bank with a \$10 billion position cannot do this[\s\S]{0,200}before they have fully built their position/i],
      ['heading states institutional mechanism as fact', /Why Order Blocks Work — The Institutional Logic/i],
      ['valid OB criteria presented as universal', /Criterion 1: There must be a significant displacement move immediately following the OB candle/i],
    ],
    required: [
      ['order-block mechanism claims are framed as interpretations', /A chart cannot identify who traded there, establish hidden accumulation/i],
      ['OB setup includes missed and failed examples', /A zone can fail, be skipped or never be revisited/i],
      ['order-block explanation distinguishes general execution impact from chart evidence', /The effect depends on instrument, venue, order size and conditions; this general market fact does not show that a particular order-block candle marks institutional activity/i],
      ['order blocks are presented as a candidate label', /An Order Block is commonly defined in ICT education as an opposing candle or area before a displacement move/i],
      ['heading describes studying the framework rather than proven mechanism', /Why Some Traders Study Order Blocks/i],
      ['displacement is an optional model rule with measurable criteria', /If your chosen variant requires displacement after the candidate candle, define a measurable threshold/i]
    ],
  },
  {
    slug: 'smt-divergence-ict-explained',
    forbidden: [
      ['SMT examples predict a required reversal', /signal to expect (?:EURUSD|GBPUSD) to reverse/i],
      ['SMT used at an HTF level declared mandatory', /The divergence must occur at a significant price level/i],
      ['killzone timing asserts peak institutional participation', /SMT Divergence works best during killzone hours when institutional volume is present/i],
      ['SMT confluence claimed to provide exceptional confidence', /adding SMT Divergence as the entry trigger gives you exceptional confidence/i],
    ],
    required: [
      ['cross-market relationship is measured, not assumed constant', /Measure the relationship over the timeframe and sample relevant to the model/i],
      ['session performance is an empirical question', /Whether SMT performs differently by session is an empirical question/i],
    ],
  },
  {
    slug: 'ict-valid-fair-value-gap',
    forbidden: [
      ['visual displacement automatically defines a valid FVG', /If yes — genuine displacement, valid FVG\\. If no — the FVG is noise/i],
      ['HTF direction treated as a universal FVG validity rule', /A valid FVG must align with the institutional order flow/i],
      ['first-presented FVG declared to carry full institutional significance', /only the first one[\\s\\S]{0,180}carries full institutional significance/i],
      ['fully crossed FVG banned universally or assigned automatic polarity', /A fully mitigated FVG is no longer a valid entry zone/i],
      ['active sessions treated as required institutional participation', /Valid FVGs for intraday entries should be created and tested during active sessions/i],
      ['five FVG conditions treated as universal requirements', /Only FVGs passing all five criteria qualify for trade consideration/i],
    ],
    required: [
      ['FVG criterion labels do not prove institutional significance', /none of those labels alone demonstrates institutional significance/i],
      ['FVG checklist criteria are model-specific and testable', /Treat each condition as model-specific and test whether it adds value/i],
    ],
  },
  {
    slug: 'ict-bullish-order-block-complete',
    forbidden: [
      ['bullish OB defined as proven institutional accumulation', /institutions needed to fill their buy orders|same institutional buyers are waiting with additional orders/i],
      ['discount location alone described as low probability in premium', /Buying a bullish OB in premium is a low-probability trade/i],
      ['liquidity sweep claimed to have collected orders for institutions', /The SSL sweep collected the sell orders/i],
      ['bullish OB claimed to almost always show immediate momentum', /A valid bullish OB entry almost always shows immediate directional momentum/i],
    ],
    required: [
      ['bullish OB label is not proof of institutional buying', /The visual area cannot show that buyers accumulated there/i],
      ['entry conditions are tested rather than assumed', /The visual area cannot show that buyers accumulated there/i],
    ],
  },
  {
    slug: 'ict-reclaimed-order-block',
    forbidden: [
      ['second retest automatically dictates an entry', /On the second approach to the zone, enter at the midpoint/i],
      ['FVG/BPR confluence automatically creates a top-tier setup', /the confluence makes it a top-tier setup/i],
      ['reclaimed OB is called highly reliable', /Why the Reclaimed OB Is Highly Reliable/i],
    ],
    required: [
      ['reclaim classification depends on predefined rules', /classify a reclaim only if it meets the predefined close, wick or follow-through rule/i],
      ['extra confluence is empirically evaluated', /test whether it improves results rather than ranking the combined setup in advance/i],
    ],
  },
  {
    slug: 'ict-suspension-block-2025',
    forbidden: [
      ['suspension block said to reveal smart-money accumulation', /The suspension indicates more deliberate, extended accumulation by smart money/i],
      ['suspension block said to predict stronger future reaction', /more explosive move when it releases and a more reliable reaction when price returns/i],
      ['suspension block called among the cleanest PD Array reactions', /zones often produce some of the cleanest reactions in the entire PD Array hierarchy/i],
      ['clean reaction attributed to deliberate institutional position loading', /the institutional position loading that created them was so deliberate/i],
    ],
    required: [
      ['suspension-block shape is not participant evidence', /The cluster does not reveal accumulation by smart money or predict a more explosive move or stronger reaction/i],
      ['suspension cluster is not proof of institutional loading or clean reaction', /the cluster does not show deliberate institutional position loading or predict a clean reaction/i],
      ['suspension timeframe is a test choice, not best condition', /The timeframe is a test choice, not a proven best setting/i],
    ],
  },
  {
    slug: 'ict-market-maker-buy-model-mmbm',
    forbidden: [
      ['MMBM phases described as verified market-maker activity', /the market maker is building its long position|the market maker has finished accumulating/i],
      ['MMBM retracement called second-best and lower-risk by default', /second-best MMBM entry|These are lower-risk entries/i],
      ['MMBM session timing described as its greatest predictive feature', /This temporal pattern is the MMBM.s greatest predictive feature/i],
    ],
    required: [
      ['MMBM narrative is not proof of market-maker intent', /chart cannot show that a market maker is building a position/i],
      ['MMBM entry variants require comparison rather than ranking', /should not be ranked as the second-best or lower-risk entry without comparable data/i],
    ],
  },
  {
    slug: 'ict-one-shot-one-kill-model',
    forbidden: [
      ['3:1 ratio presented as a universal ICT recommendation', /ICT typically recommends a minimum of 3:1/i],
      ['single setup discipline claimed to create consistent profitability', /transforms average ICT students into consistently profitable traders/i],
    ],
    required: [
      ['risk-to-reward threshold depends on tested distribution and costs', /A fixed 3:1 ratio is not a universal ICT requirement/i],
      ['OSOK is not treated as a guarantee of profitability', /neither waiting for a single setup nor following the OSOK label guarantees profitability/i],
    ],
  },
  {
    slug: 'ict-scalping-strategy',
    forbidden: [
      ['scalping windows claimed to have the highest setup frequency', /offer the highest frequency of qualifying setups per week/i],
      ['fixed trade count and percentage risk claimed as mandatory', /maximum 3 attempts per session[\\s\\S]{0,180}strict 0\\.5% risk per trade/i],
      ['universal 3–6 month readiness timeline', /spend at least 3-6 months there before moving to 1-minute scalping/i],
    ],
    required: [
      ['scalping stops and targets depend on tested instrument volatility', /set targets and stops from a tested plan and actual instrument volatility/i],
      ['risk rules remain strategy-specific', /Set trade-count, loss-limit, risk and session rules for the particular strategy/i],
      ['readiness is not based on a universal timeline', /Readiness is not established by confidence or a universal 3–6 month timeline/i],
    ],
  },
  {
    slug: 'ict-top-down-analysis-complete',
    forbidden: [
      ['six timeframes presented as the only complete framework', /complete top-down analysis framework spans six timeframes/i],
      ['monthly context said to govern every lower layer', /This context governs everything below it/i],
      ['multi-timeframe alignment labeled high probability by itself', /is a high-conviction, high-probability trade/i],
      ['pre-session analysis claimed to improve performance most dramatically', /single practice that will improve your trading performance most dramatically/i],
      ['traders who skip analysis stereotyped as providing liquidity to others', /The traders who skip it and react in real-time[\\s\\S]{0,120}providing the liquidity/i],
    ],
    required: [
      ['timeframe count is strategy-specific', /there is no universal six-timeframe requirement/i],
      ['timeframe confluence is measured against a baseline', /does not by itself establish high probability or positive expectancy/i],
      ['analysis benefit is not promised or attributed to other traders', /does not guarantee better performance or show that traders who skip it provide liquidity/i],
    ],
  },
  {
    slug: 'ict-single-candle-order-block-scob',
    forbidden: [
      ['SCOB precision claimed to guarantee better reward-to-risk', /Tighter stops \\+ same targets = better risk-to-reward ratios/i],
      ['body size percentage claimed to prove institutional placement', /80%\\+ of its range as body[\\s\\S]{0,160}institutional order placement/i],
      ['SCOB described as free of ambiguity', /In an SCOB, there is no ambiguity/i],
    ],
    required: [
      ['body threshold is only a testable candle-shape filter', /no percentage confirms institutional order placement or makes a SCOB premium/i],
      ['tighter stops are evaluated against stop-outs and expectancy', /A one-candle boundary may create a narrower planned stop.*?compare after-cost outcomes and adverse excursion rather than assuming narrower means better/i],
    ],
  },

  {
    slug: 'ict-premium-discount-zones',
    forbidden: [
      ['premium/discount location presented as universal entry rule', /This framework is applied to every dealing range you identify/i],
      ['discount position asserted to have a much higher probability', /carries significantly higher probability than an Order Block located in the Premium zone/i],
      ['institutional buying inferred from a discount label', /discount location confirms that price has retraced to an area where institutional buyers would find attractive prices/i],
      ['premium/discount presented as fractal on every timeframe', /Premium and Discount is fractal — it applies on every timeframe/i],
      ['multitimeframe confluence said to produce the cleanest trades', /the type of confluence that produces the cleanest/i],
      ['one Fibonacci anchor convention presented as the correct approach', /The correct approach is to draw from the most recently BROKEN swing/i],
      ['OTE levels said to distinguish correction from reversal', /The OTE concept is that the deepest retracement into discount that still represents a genuine correction/i],
    ],
    required: [
      ['premium/discount is described as context and location alone is not a signal', /Location alone is not an entry signal/i],
      ['PD-array overlap is a candidate filter rather than probability proof', /The overlap is a candidate filter, not evidence of institutional buying or a higher-probability setup by itself/i],
      ['multiple timeframes are optional and need explicit rules', /there is no requirement to use every timeframe or to interpret them identically/i],
      ['cross-timeframe confluence is not ranked as cleaner or more profitable', /not evidence that the setup is cleaner or more profitable/i],
      ['Fibonacci anchor convention is documented before review', /document your convention before reviewing the result/i],
      ['OTE ratios are not a correction-versus-reversal rule', /These ratios do not distinguish a correction from a reversal on their own/i],
    ],
  },
  {
    slug: 'ict-optimal-trade-entry-ote',
    forbidden: [
      ['70.5% presented as the most precise OTE entry', /The 70\.5% level is the most precise entry point within the OTE/i],
      ['OTE zone claimed to be where institutions re-enter', /the discount area of any swing where institutions re-enter/i],
      ['70.5% called the primary entry target', /this is your primary entry target/i],
      ['OTE band claimed to identify institutional accumulation prices', /exactly where institutions want to accumulate long positions/i],
      ['OTE/OB/session combination ranked as maximal confluence', /example of maximal confluence/i],
      ['session timing claimed to confirm algorithmic delivery', /session timing confirms the algorithmic delivery window/i],
      ['OTE discipline described as separating profitable and unprofitable traders', /what separates OTE traders who profit from those who do not/i],
    ],
    required: [
      ['OTE ratios described as chart references rather than institutional boundaries', /These are chosen Fibonacci ratios, not objective boundaries for institutional re-entry or measures of entry precision/i],
      ['premium/discount labels are relative to the selected range', /labels are relative to the selected range, not objective valuations of expensive or cheap/i],
      ['large candles are not evidence of institutional participation', /large candles do not establish institutional participation/i],
      ['70.5% is a variant to test instead of a primary entry target', /If testing 70\.5%, record it as one entry variant rather than a default or primary entry target/i],
      ['confluence is not objectively ranked and algorithmic delivery is not inferred', /not an objectively ranked “maximal” setup[\s\S]*?do not confirm algorithmic delivery or institutional intent/i],
      ['OTE band alone does not establish a valid or profitable trade', /zone alone does not make a trade valid or establish profitability/i],
    ],
  },
  {
    slug: 'how-to-pass-ftmo-ict-strategy',
    forbidden: [
      ['NY AM window fixed to EST', /NY AM Killzone \(7 AM–11 AM EST\)/],
      ['fixed winner count promised to hit evaluation target', /you need 5 winners to reach 10% profit target/i],
      ['overtrading called the number one failure cause', /overtrading is the number one killer on FTMO challenges/i],
      ['one loss imposed as a universal stop rule', /Stop trading for the day after one loss/i],
      ['subjective A-plus setups imposed as universal rule', /Only A\+ setups/i],
      ['universal 1R breakeven rule', /Never move stop to breakeven before 1R profit/i],
      ['week-three profit goal prescribed', /Aim to reach 6-7% profit by the end of week 3/i],
      ['evaluation model advertised as best', /The Best ICT Setups for FTMO Challenges/i],
      ['week-four schedule prescribes a 6-7% balance checkpoint', /Week 4 strategy: If you are at 6-7% profit/i],
      ['midnight-to-two fixed EST bias timing', /typically between midnight and 2 AM EST/i],

    ],
    required: [
      ['NY AM time filter uses New York local time and accounts for seasonal offset', /define it in New York local time \(ET; EST\/EDT changes seasonally\)/],
      ['position-size calculation is explicitly an example, not a recommendation', /Treat position-size examples as arithmetic, not a risk recommendation/i],
      ['daily trade cap is strategy- and rule-dependent', /Set a daily trade-count cap based on your written plan and the program terms/i],
      ['daily stop condition is chosen in advance rather than universal', /A single losing trade does not create a universal stop rule for every strategy/i],
      ['objective entry criteria replace A-plus labels', /Replace the subjective label A\+ with measurable criteria/i],
      ['stop-management variants require testing', /test alternatives—such as a fixed stop, a 1R breakeven move or a time-based exit/i],
      ['weekly profit target is not treated as owed', /the market does not owe a weekly profit target/i],
    ],
  },

  {
    slug: 'daily-bias-ict-how-to-determine',
    forbidden: [
      ['neutral-day advice stereotypes professional traders', /Professional ICT traders protect their mental capital/i],
      ['daily-bias timing fixed to standard time year-round', /typically between midnight and 2 AM EST/i],
    ],
    required: [
      ['no-trade context is framed as a plan choice rather than universal rule', /A no-trade decision can be part of a written plan/i],
      ['daily bias timing accounts for source and timezone variation', /Daily-bias review timing varies by the source model and chosen session window/i],
    ],
  },

  {
    slug: 'liquidity-in-ict-trading',
    forbidden: [
      ['equal highs and lows asserted to show known stop placement', /every long trader in that position has their stop loss just below those lows/i],
      ['liquidity algorithm target asserted as nearly certain', /the algorithm is almost certain to target before a major reversal/i],
      ['algorithm target presented as predictable from context', /determine which pool the algorithm is likely to target next/i],
      ['all chart moves described as pool-to-pool delivery', /Every move you see on any chart is a delivery from the last liquidity pool/i],
    ],
    required: [
      ['BSL levels are candidates and do not confirm orders or owners', /The chart alone cannot confirm the orders, their owners or their density/i],
      ['SSL does not confirm orders at all marked levels', /A chart does not confirm that orders are present at every marked level or reveal who placed them/i],
      ['liquidity engineering is a hypothesis rather than intent evidence', /This is a hypothesis about price behavior, not evidence that institutions deliberately create retail patterns/i],
      ['liquidity target is a hypothesis, not a guaranteed destination', /This workflow does not reveal an algorithm target or guarantee that price will reach the chosen level/i],
    ],
  },
  {
    slug: 'ict-cisd-change-in-state-of-delivery',
    forbidden: [
      ['CISD asserts that an algorithm switched gears', /The CISD tells you the algorithm has switched gears right now/i],
      ['bullish CISD guarantees a new delivery direction', /indicating the delivery has transitioned from bearish to bullish/i],
      ['CISD FVG stated as the entry zone for new delivery', /represents the confluence-based entry zone for the new delivery direction/i],
      ['algorithmic repricing and low-risk entry claimed', /The algorithm will often reprice into the CISD FVG/i],
      ['CISD described as the cleanest and most precise signal', /one of the cleanest and most precise entry signals in all of ICT methodology/i],
      ['CISD bullets claim a structural label means delivery has begun', /this is the CISD — (?:bullish|bearish) delivery has begun/i],
    ],
    required: [
      ['CISD does not show that an algorithm switched direction', /does not show that an algorithm switched direction or that a durable trend change has occurred/i],
      ['CISD/FVG combination is tested against components alone', /Compare the combined rule with the CISD or FVG rule alone/i],
      ['revisits and failures are acknowledged', /Price may not return, may trade through the gap, or may fail to continue after a fill/i],
      ['CISD and MSS definitions are source-dependent', /Different ICT sources distinguish CISD from MSS in different ways/i],
      ['CISD direction labels are candidate classifications', /record a close above a preselected short-term high as a bullish CISD candidate under this convention/i],
      ['CISD bearish candidate does not guarantee delivery', /record a close below a preselected short-term low as a bearish CISD candidate under this convention; price can still reclaim the level/i],
    ],
  },
  {
    slug: 'ict-unicorn-model-explained',
    forbidden: [
      ['mitigation block asserted to reveal smart-money offloading', /The break of an OB signifies that the smart money used that zone to offload positions/i],
      ['overlap called maximum institutional interest', /represents the maximum concentration of institutional interest/i],
      ['Unicorn stated to be high probability as fact', /Why the Unicorn Is High Probability/i],
      ['overlap probability described as multiplicative', /the probability is not simply additive — it is multiplicative/i],
      ['institutional interest claimed to activate simultaneously', /both types of institutional interest activate simultaneously/i],
      ['unsupported 20–30 percent frequency claim', /Perhaps 20-30% of Mitigation Blocks will qualify as Unicorns/i],
      ['Unicorn unconditionally prioritized above other zones', /prioritize it above all other entry zones on that timeframe/i],
      ['full-conviction trading instruction', /trade it with full conviction/i],
    ],
    required: [
      ['Unicorn heading frames the overlap as a hypothesis to test', /Testing the Unicorn Overlap Hypothesis/i],
      ['Mitigation Block definition is source-dependent', /the exact boundary and confirmation rules vary/i],
      ['overlap does not prove independent signals', /does not prove two independent signals or reveal a concentration of institutional interest/i],
      ['entry is a candidate event rather than automatic', /The revisit is a candidate event, not an automatic entry/i],
      ['no universal overlap frequency is claimed', /no frequency is established here/i],
      ['filters are treated as hypotheses and risk rules remain defined', /Those filters are hypotheses to evaluate, not reasons to trade with full conviction or to ignore risk/i],
    ],
  },
  {
    slug: 'ict-candle-range-theory-crt',
    forbidden: [
      ['per-candle AMD phases presented as fact', /the algorithmic manipulation phase of that candle's delivery cycle/i],
      ['prior candle low said to be swept before true bullish delivery', /the algorithm collects the sell-side liquidity before the true bullish delivery/i],
      ['prior candle high said to be swept before true bearish delivery', /the algorithm first sweeps the previous candle's high before delivering lower/i],
      ['previous daily extremes called levels the algorithm will likely sweep', /the algorithm will likely sweep during the new day/i],
      ['weekly Monday-to-Friday manipulation schedule asserted as classic pattern', /The classic CRT pattern on the weekly chart/i],
      ['CRT said to reveal the true move exactly', /they tell you exactly where the true move is going/i],
    ],
    required: [
      ['CRT phases are labels and do not prove liquidity was deliberately collected', /labels do not prove that liquidity was deliberately collected/i],
      ['first move does not reliably identify which side will be crossed', /The first move does not reliably identify which side will be crossed/i],
      ['prior candle extremes are references, not confirmed stop locations', /do not label them as confirmed stop locations/i],
      ['weekday phase assignment is not a universal schedule', /Monday-through-Friday phase assignments are not a reliable universal schedule/i],
      ['a wick does not reveal an algorithmic cycle or future direction', /A wick can occur for many reasons and does not reveal a separate algorithmic cycle/i],
    ],
  },
  {
    slug: 'ict-smt-divergence-complete-guide',
    forbidden: [
      ['EURUSD/GBPUSD SMT asserted reliable', /SMT between these two is very common and reliable/i],
      ['New York SMT reveals true intraday direction', /SMT during NY session opening often identifies the true intraday direction/i],
      ['SMT divergence asserted to identify institutional positioning', /Divergence between them identifies institutional positioning/i],
      ['non-confirming instrument said to reveal true intent', /the other reveals the true intent/i],
      ['four SMT filters said to produce very high probability', /the SMT setup becomes a very high-probability trade/i],
      ['fixed timeframe and session filters imposed universally', /Only use SMT on the 5-minute chart or higher, only during high-activity sessions/i],
    ],
    required: [
      ['SMT does not show true intent or require reversal', /does not show that one market was swept or that the other reveals true intent/i],
      ['session label does not prove manipulation or predictive value', /The session label alone does not prove high-volume institutional manipulation or greater predictive value/i],
      ['timeframe and correlation filters are hypotheses to test', /as test parameters rather than universal requirements/i],
      ['SMT setup is compared against a baseline', /test whether the comparison adds information beyond the primary instrument alone/i],
    ],
  },
  {
    slug: 'ict-institutional-order-flow-entry-drill',
    forbidden: [
      ['IOFED stated to require institutional participation', /The IOFED requires institutional participation/i],
      ['FVG retracement asserted to happen', /price will retrace into the FVG/i],
      ['displacement said to confirm institutional activation', /confirms that institutional order flow has activated in your direction/i],
      ['Silver Bullet asserted to be a subset of IOFED', /The Silver Bullet is a subset of the IOFED framework/i],
      ['fixed 1–2 pip stop buffer presented as precise universal parameter', /The IOFED has precise risk parameters/i],
      ['IOFED marketed as complete ICT entry model', /you have the complete ICT entry model/i],
    ],
    required: [
      ['higher-timeframe context does not confirm institutional order flow', /not a confirmation of institutional order flow or a requirement proven to work for every setup/i],
      ['DOL is a planning hypothesis rather than a required destination', /A target is a planning hypothesis, not a destination that price must reach/i],
      ['session filter does not prove participation', /A session label does not prove institutional participation/i],
      ['retrace, missed fill and invalidation risks are specified', /Price may never retrace, may fill beyond the zone or may fail to continue after entry/i],
      ['Silver Bullet/IOFED relationship is not assumed', /Do not assume that Silver Bullet is a subset of IOFED/i],
      ['fixed pip buffer is not suitable for every market', /a fixed 1–2 pip buffer is not suitable for every market/i],
    ],
  },
  {
    slug: 'ict-power-of-three-amd-complete',
    forbidden: [
      ['AMD accumulation asserts institutions build positions', /institutions are quietly accumulating their full position size/i],
      ['AMD manipulation asserts engineered false move and intent', /institutions now engineer a false move in the opposite direction/i],
      ['distribution asserted to reach institutional target', /Price delivers rapidly and decisively to the institutional target/i],
      ['weekday phases described as typical weekly schedule', /The accumulation typically occurs during the Asian session on Sunday night and Monday/i],
      ['weekly direction said to reverse after Monday sweep', /Then, from Tuesday, price reverses and delivers higher through the rest of the week/i],
      ['Asian/London/New York sessions assigned fixed AMD roles', /London Open = Manipulation:[\s\S]{0,170}New York Session = Distribution/i],
      ['Judas Swing declared the key practical skill and common London event', /Identifying it is the key practical skill of AMD trading/i],
      ['displacement/FVG claimed as complete universal AMD entry', /The complete AMD trade entry:/i],
    ],
    required: [
      ['AMD range does not establish institutional positioning', /Price candles alone do not show that institutions are quietly building a position/i],
      ['manipulation label does not prove intent or deliberate stops', /The chart does not prove that the move was engineered, that stops were deliberately triggered/i],
      ['distribution does not establish true direction or target', /It does not establish a true direction or reveal an institutional target or position/i],
      ['weekday phase assignment is not a reliable schedule', /the phase assignment is not a reliable schedule for every week/i],
      ['session names do not establish manipulation or true direction', /Session names alone do not establish manipulation or a true daily direction/i],
      ['Judas Swing timing and sequence are hypotheses to test', /The London timing and sequence should be treated as hypotheses to test/i],
    ],
  },

  {
    slug: 'ict-silver-bullet-strategy-complete',
    forbidden: [
      ['Silver Bullet window asserts routine algorithmic delivery', /The algorithm frequently delivers a Silver Bullet setup/i],
      ['Silver Bullet filters claim to elevate probability as a fact', /The key qualifiers that elevate probability are/i],
      ['daily institutional order flow is treated as confirmed context', /Is the institutional order flow bullish or bearish\?/i],
      ['Silver Bullet is claimed to operate only in set windows', /The Silver Bullet only operates within its defined windows/i],
      ['one attempt per window is claimed to be what makes the model work', /One Silver Bullet per window\.[\s\S]{0,220}makes this model work/i],
      ['afternoon window is presented as a fixed volatility transition', /the transition from the midday doldrums into afternoon directional trading/i],
      ['overnight window has conflicting times stated as interchangeable', /11:00 PM – Midnight New York time \(or 1:00 AM – 2:00 AM\)/i],
      ['sweep/displacement/FVG sequence described as universal mechanism', /The Silver Bullet setup is built on three components/i],
      ['FVG midpoint declared the specific required entry', /The CE of the FVG is your specific entry point/i],
      ['Silver Bullet setup is presented as an automatic target trade', /This FVG is the Silver Bullet entry/i],
    ],
    required: [
      ['Silver Bullet clock window is a source convention not a promise', /One commonly cited Silver Bullet window in ICT education[\s\S]{0,180}does not establish that opening volatility has settled or that a setup will appear/i],
      ['time-window filters are tested rather than treated as inherent edge', /A time filter does not prove the pattern is absent or ineffective at other times/i],
      ['candidate filters do not automatically imply probability lift', /These filters do not automatically elevate probability/i],
      ['attempt count is a risk rule rather than a proven model requirement', /One attempt per window is a possible risk rule, not a proven requirement for the model/i],
      ['Silver Bullet rule is presented as a source-specific variant', /One commonly taught Silver Bullet variant looks for a move beyond a selected swing/i],
      ['FVG midpoint is one entry variant to test', /A limit near the FVG midpoint \(Consequent Encroachment\) is one option to test/i],
      ['stop and nearest level are not universal risk/exit rules', /The nearest marked level is not a required or guaranteed target/i],
    ],
  },
  {
    slug: 'ict-internal-external-range-liquidity',
    forbidden: [
      ['IRL/ERL is presented as an algorithmic target hierarchy for any range', /form the target hierarchy within any ICT dealing range/i],
      ['ERL is described as the algorithm ultimate destination', /represent the algorithm\\?s ultimate delivery destinations/i],
      ['an internal visit is said to guarantee resumed delivery toward opposite ERL', /price will resume toward the opposite ERL/i],
      ['partial exits are described as capturing the full range', /capture the full range of a delivery/i],
      ['outer boundaries are asserted to contain BSL/SSL orders', /the swing high holds Buy-Side Liquidity \(BSL\) above it/i],
      ['all internal arrays are presented as targets and entries', /all the PD Arrays \(FVGs, OBs, BPRs, etc\.\)[\s\S]{0,160}are the retracement targets and entry zones/i],
      ['phase assignment prescribes automatic take-profit levels', /In an IRL delivery phase: target the FVGs and OBs inside the range/i],
      ['entry is prescribed based on an ERL phase', /For entries: enter at IRL elements \(FVGs\/OBs\) when in an ERL delivery phase/i]
    ],
    required: [
      ['IRL/ERL are labels for chart-reference candidates', /labels some ICT traders use to organize price references inside a selected range/i],
      ['internal/external path is a hypothesis rather than sequence rule', /Treat the proposed sequence as a hypothesis and record the actual path rather than assuming price resumes toward the opposite extreme/i],
      ['IRL target is a candidate, with paths that turn early included', /define which internal level qualifies as a candidate target[\s\S]{0,140}price turns first or never reaches it/i],
      ['ERL is a candidate objective not a required destination', /The range extreme is a candidate objective, not a target that every setup must reach/i],
      ['range boundaries do not confirm stop orders', /the price levels do not confirm that buy-stop or sell-stop orders are present there/i],
      ['internal references are selected rather than exhaustive', /Not every pattern must be included, and an internal label does not establish that price will revisit the zone/i],
      ['phase classification is conditional and can remain unclassified', /Classify the current path only if it meets phase rules written before the move; otherwise leave it unclassified/i],
    ],
  },
  {
    slug: 'ict-hrlr-lrlr-liquidity-run',
    forbidden: [
      ['LRLR is used to recommend scaling into positions as default', /consider scaling into additional entries[\s\S]{0,250}The strong institutional momentum suggests the target will be reached quickly/i],
      ['LRLR requires a full-sized position', /this warrants a full-sized position/i],
      ['HRLR automatically reduces position size by a fixed percentage', /reduce position size by 25-50%/i],
      ['breakeven move after first FVG is prescribed', /Move your stop to breakeven after the first FVG is left behind/i],
      ['40 and 20 percent thresholds stated as fixed rules', /More than 40% opposing candles = HRLR\. Less than 20% opposing candles = LRLR/i],
      ['pullback threshold stated as a universal classifier', /Pullbacks retracing more than 50% of the previous swing = HRLR/i],
      ['gap behavior stated as definitive HRLR/LRLR classification', /Immediate FVG fills indicate HRLR/i],
      ['full size and reduced size prescribed from labels', /this warrants a full-sized position[\s\S]{0,350}reduce position size by 25-50%/i],
    ],
    required: [
      ['resistance labels do not independently determine stop management or exposure', /An LRLR label should not by itself determine stop management or justify adding exposure/i],
      ['opposing-candle thresholds are examples, not validated cutoffs', /40% and 20% are examples only, not validated universal cutoffs/i],
      ['position size derives from risk and invalidation, not a visual label', /Do not size a position from an HRLR.LRLR label alone/i],
      ['trailing/breakeven rules are compared against alternatives', /Test any breakeven or trailing-stop rule against fixed-stop alternatives/i],
      ['HRLR definition admits model-specific observable criteria', /The exact measures and thresholds are model choices, not universal definitions/i],
      ['position sizing depends on predeclared risk not a label', /Calculate risk from the entry, invalidation distance, instrument value and your predefined account limit/i],
      ['fast candles do not establish continuation', /A large-bodied candle after entry is an observable event, not a reliable diagnosis of future low-resistance movement/i],
    ],
  },
  {
    slug: 'ict-judas-swing-complete',
    forbidden: [
      ['Judas Swing heading attributes creation to an algorithm', /Why the Algorithm Creates a Judas Swing/i],
      ['Judas Swing explicitly described as an algorithm-created false move', /It finds this liquidity by creating a false move in the opposite direction/i],
      ['bullish setup says to expect London sweep and delivery higher', /expect the London session to sweep the Asian low[\s\S]{0,100}before delivering higher/i],
      ['bearish setup says to expect London sweep and delivery lower', /expect the London session to sweep the Asian high[\s\S]{0,100}before delivering lower/i],
      ['Judas Swing filter claims dramatically higher probability', /the trade has dramatically higher probability because the manipulation phase is complete/i],
      ['waiting guarantees the entry opportunity remains', /The entry opportunity will still be there after the Judas Swing confirms/i],
      ['Judas Swing said to immediately betray the apparent direction', /immediately betrays that apparent direction with a sharp reversal/i],
      ['Asian range labels are called known Judas Swing targets', /these are the Judas Swing targets/i],
      ['bearish bias is told to expect a London sweep and downside delivery', /expect the London session to sweep the Asian high \(Judas Swing higher\) before delivering lower/i],
      ['MSS and FVG are prescribed as entry requirements', /After the sweep, watch for the reversal confirmation[\s\S]{0,200}is your entry/i]
    ],
    required: [
      ['Judas Swing heading describes the label without asserting intent', /How the Judas Swing Label Is Used/i],
      ['Judas Swing does not establish algorithmic intent or deliberate trapping', /Candle data alone does not show that an algorithm created the move, that stop losses were triggered, or that retail traders were deliberately trapped/i],
      ['bullish and bearish variants are conditional hypotheses', /If testing a bullish-bias variant, record whether price moves below the Asian low/i],
      ['a sweep-and-return is a model rule rather than universal requirement', /not a universal requirement for all ICT trades/i],
      ['entry criteria are checked against invalidation before acting', /Before entry, ask whether the written conditions for your chosen setup are met and what would invalidate them/i],
      ['Judas swing label is retrospective unless rules are fixed', /The label is typically applied retrospectively unless the return and timing criteria are fixed in advance/i],
      ['Asian range levels are reference candidates', /they are reference candidates, not known targets/i],
      ['bearish variant admits continuation and no-cross cases', /If testing a bearish-bias variant, record whether price moves above the Asian high/i],
      ['MSS is optional and does not guarantee reversal', /an MSS label does not guarantee a reversal/i],
    ],
  },

  {
    slug: 'ict-reversal-patterns-guide',
    forbidden: [
      ['Upthrust asserted to trigger buy stops and reverse immediately', /The ICT Upthrust is the bearish mirror[\s\S]{0,320}triggering buy stops[\s\S]{0,220}immediately reverses back inside the range/i],
      ['upthrust required to show an aggressive immediate reversal', /Both patterns require the same confirmation[\s\S]{0,150}not a slow grind/i],
      ['SMT plus MSS described as the most sophisticated reversing pattern', /The most sophisticated reversal pattern combines SMT Divergence with a structural break/i],
      ['both instruments said to show MSS and confirm the reversal', /Simultaneously, both instruments show a Market Structure Shift[\s\S]{0,120}confirming the reversal/i],
      ['sweep presented as a necessary difference between every reversal and retracement', /Reversals involve a clear liquidity sweep[\s\S]{0,150}Retracements do not involve liquidity sweeps/i],
      ['MSS and displacement presented as universal reversal requirements', /Reversals show a Market Structure Shift on the lower timeframe[\s\S]{0,180}Retracements maintain the higher timeframe structure throughout/i],
      ['PD Array membership claimed to distinguish reversals from retracements', /Reversals occur at significant PD Array elements[\s\S]{0,150}Retracements often occur at arbitrary price levels/i],
    ],
    required: [
      ['Upthrust is described as an observable candidate, not proof of stop activity', /In one Wyckoff\/ICT comparison, an Upthrust candidate is a move above a selected range boundary followed by a return inside/i],
      ['SMT/structure combination is a hypothesis rather than a ranked signal', /One reversal hypothesis combines SMT divergence with a separately defined structural break/i],
      ['reversal features are model-dependent heuristics', /Some reversal models require a move beyond a selected level followed by return, while others do not/i],
      ['lower-timeframe structure break is a filter rather than proof of reversal', /A lower-timeframe structure break may be used as a reversal filter, but definitions and timeframes vary/i],
      ['PD Array is not required for every reversal or retracement', /Neither reversal nor retracement requires a named zone/i],
    ],
  },

  {
    slug: 'ict-macro-times-explained',
    forbidden: [
      ['pre-market window said often to sweep liquidity', /Price often makes a final liquidity sweep before the opening range is established/i],
      ['post-open macro claimed as origin of many Silver Bullet setups', /Many Silver Bullet setups originate from this window/i],
      ['noon macro said to often produce reversal or break', /often produces a reversal or consolidation break/i],
      ['afternoon macro asserted to set direction frequently', /frequently sets up the afternoon direction/i],
      ['late macro window described as consistently high volatility', /High volatility common/i],
      ['close window said often to resolve the final range', /Final daily range resolution often occurs here/i],
      ['midnight macro said often to deliver Asian opening range', /Often delivers the Asian session opening range/i],
      ['pre-window period asserted to be directionless chop', /these pre-window periods are often periods of directionless chop/i],
      ['practice highlight promises a recurring sweep/FVG pattern', /You will begin to see the pattern of liquidity sweeps and FVG fills/i],
    ],
    required: [
      ['Macro times are explicitly source-dependent and not an edge by themselves', /the existence of a time window does not establish that an algorithm is more active or that a setup has an edge during it/i],
      ['candidate sweep/FVG sequence is not a required event or known target route', /A sweep followed by displacement is a candidate sequence to record, not a required event or a route to a known target/i],
      ['observation plan records no-setup windows and requires comparison outside', /record every interval, including windows without a sweep or FVG revisit/i],
      ['entry/exit time rule is tested against a no-filter baseline', /compare it against the same strategy without the time filter/i],
    ],
  },
  {
    slug: 'ict-market-structure-shift-complete',
    forbidden: [
      ['bearish MSS is said to begin bearish delivery as fact', /This close below the STL is the bearish MSS — bearish delivery has begun/i],
      ['MSS universally requires a displacement candle', /The MSS candle should be a displacement candle/i],
      ['MSS universally requires close rather than wick', /The close of the MSS candle must be beyond the reference STH or STL/i],
      ['MSS universally requires an FVG', /The MSS should create at least one FVG/i],
      ['MSS outside killzone is said to carry less institutional significance', /low-volume MSS signals outside of these windows carry less institutional significance/i],
      ['50 percent body threshold called a reliable universal divider', /A strong MSS has a candle body that is at least 50% of the distance/i],
      ['MSS claimed to apply with fixed meaning to every timeframe', /The MSS concept applies to every timeframe/i],
      ['five-minute MSS prescribed as the entry trigger', /For intraday entries, use the 5-minute MSS as your trigger/i],
      ['three-timeframe stack described as complete precise entry model', /the complete ICT entry model — three timeframes aligned with a precise trigger/i],
    ],
    required: [
      ['MSS is a source-dependent candidate label', /Definitions vary, and a structural break does not guarantee a trend reversal or continuation/i],
      ['displacement, close rule and gap are optional filters to test separately', /Some MSS variants require displacement[\s\S]*?Some variants require an FVG near the structural break, while others do not/i],
      ['time filter is compared against unfiltered results', /compare filtered and unfiltered results on the same sample/i],
      ['threshold sensitivity is measured rather than treated as universal', /The 50% threshold is a model parameter, not a validated universal cutoff/i],
      ['multi-timeframe stack is a variant rather than complete entry model', /This is not a complete or universal ICT entry model/i],
    ],
  },
  {
    slug: 'ict-fibonacci-levels-settings',
    forbidden: [
      ['Fibonacci described as transformation into precision tool', /transform Fibonacci from a guessing game into a precision tool/i],
      ['70.5 percent called the primary OTE entry level', /70\.5% \(the primary OTE entry level\)/i],
      ['OTE list says 70.5 is primary entry', /70\.5% level \(primary entry\)/i],
      ['negative extension described as an algorithmic target before reversal', /the algorithm may target before reversing/i],
      ['Fibonacci/PD Array overlap treated as proof of correct anchor', /that alignment is the confirmation you have found the correct anchor points/i],
      ['instructions tell reader to move anchors until confluence appears', /Reanchor to the next larger swing until the 62-79% zone aligns/i],
    ],
    required: [
      ['Fibonacci level set is source-dependent', /This is a source-dependent set of chart references, not one universally required level set/i],
      ['70.5 percent is an optional reference, not a default primary entry', /Treat 70\.5% as an optional internal reference rather than a primary entry by default/i],
      ['OTE band is location rather than signal', /It is not an entry signal or evidence that price is objectively cheap/i],
      ['Fibonacci extensions are model conventions, not standard target requirements', /Their use is a model convention, not a standard target requirement/i],
      ['anchors are not moved after seeing alignment', /do not keep moving anchors until the chart fits/i],
    ],
  },

  {
    slug: 'ict-tgif-setup-explained',
    forbidden: [
      ['TGIF checklist makes a Friday algorithm reversal a required condition', /During the London or early New York session on Friday, the algorithm reverses/i],
      ['TGIF midpoint or gap midpoint prescribed as the target', /Target: the weekly midpoint[\s\S]{0,180}or the NWOG midpoint if the gap is unfilled/i],
      ['TGIF partial profit and breakeven rule prescribed universally', /Take partial profits at the first significant level[\s\S]{0,170}move the stop to breakeven/i],
      ['TGIF says not to hold into the final half hour as a universal rule', /Do not hold TGIF positions into Friday/i],
      ['Thursday close and Friday reversal treated as required sequence', /Thursday closed near its extreme[sS]{0,300}During the London or early New York session on Friday, the algorithm reverses/i],
      ['weekly midpoint or gap midpoint is prescribed as universal exit', /weekly midpoint[sS]{0,160}NWOG midpoint/i],
    ],
    required: [
      ['weekday setup is explicitly a hypothesis rather than a forecast', /the calendar day does not determine the true direction/i],
      ['Friday reversal is conditional and does not establish algorithmic intent', /A chart does not establish that an algorithm reversed the move/i],
      ['FVG entry is a variant with expiry and missed-fill rules', /One entry variant records an FVG formed after the predefined Friday return and displacement/i],
      ['TGIF risk-management rules are predeclared and tested', /Predefine any time stop, partial exit or breakeven rule and test it against alternatives/i],
      ['TGIF preconditions are optional measurable filters', /A possible filter is a Thursday close near the week-to-date extreme/i],
      ['risk-management choices are tested rather than universal', /Predefine any time stop, partial exit or breakeven rule and test it against alternatives/i],
    ],
  },
  {
    slug: 'ict-weekly-profiles-range-expansion',
    forbidden: [
      ['midweek low is prescribed as the weekly-high entry', /The Wednesday low is the entry point for the weekly high target/i],
      ['midweek high is prescribed as the weekly-low entry', /The Wednesday high is the sell entry for the weekly low target/i],
      ['weekly profile expected to be identified by Tuesday', /By mid-Tuesday, you should be able to identify the likely profile/i],
      ['12 weeks said to provide a clear picture of profile frequencies', /After 12 weeks, you will have a clear picture of the most common profiles/i],
      ['weekly extreme labels said to be the targets for the new week', /these are the BSL and SSL targets for the new week/i],
      ['weekly profiles give a specific Wednesday reversal entry', /Profile 3 — Wednesday Reversal Bullish|Profile 4 — Wednesday Reversal Bearish/i],
      ['weekday profile is treated as an instruction to adjust later-week entries', /Adjust your daily bias entries for Wednesday, Thursday, and Friday based on the identified weekly profile/i],
    ],
    required: [
      ['weekday profiles are hypotheses rather than a forecast', /They are hypotheses, not validated forecasts/i],
      ['Wednesday profiles do not establish a required turning day', /Wednesday is not a required turning point/i],
      ['profile identification can remain unclassified', /Do not require a weekly profile to be identifiable by Tuesday/i],
      ['small samples require separate validation and uncertainty', /Twelve weeks may be too small to estimate stable frequencies/i],
      ['weekly sample size limitations are explicit', /Twelve weeks may be too small to estimate stable frequencies/i],
      ['weekday profile classification is conditional and can remain absent', /Keep the week unclassified until the prewritten conditions are met/i],
    ],
  },
  {
    slug: 'ict-qml-quasimodo-pattern',
    forbidden: [
      ['QML swing sequence said to signal exhausted trend', /This lower low is the structural failure that signals the trend has exhausted/i],
      ['opposite QML structure said to confirm exhausted trend', /This structural failure confirms the downtrend has exhausted its final push/i],
      ['QML retest zone said to be where smart money positioned', /the zone where early smart money positioned before the final sweep/i],
      ['QML described as an engineered sweep designed to trap buyers', /the second shoulder[\s\S]{0,250}specifically designed to trap breakout buyers/i],
      ['QML claimed to confirm manipulation rather than continuation', /The HL breakdown is the confirmation that the sweep was manipulation/i],
      ['QML timeframes/killzones presented as the best conditions', /QML setups are commonly studied on the 1-hour and 4-hour charts during Killzone periods/i],
      ['entry at intermediate swing levels prescribed universally', /Enter short at the HL level/i],
      ['QML intermediate swing says early smart money was positioned there', /the zone where early smart money positioned/i],
      ['QML entry is prescribed automatically at the HL', /Mark the HL level — this is your entry zone on the retest/i],
      ['QML is presented as an engineered sweep that traps buyers', /the second shoulder[sS]{0,250}specifically designed to trap breakout buyers/i],
    ],
    required: [
      ['QML label does not prove exhaustion or predict reversal', /It does not establish that the trend is exhausted or that price will reverse/i],
      ['chart does not reveal institutional positioning or guarantee support/resistance', /the chart does not reveal where “smart money” positioned or guarantee support\/resistance/i],
      ['swing-break pattern is a candidate rather than final confirmation', /record the QML candidate at that point/i],
      ['QML comparison avoids attributing deliberate intent', /The chart does not reveal an engineered sweep or prove an intent to trap breakout traders/i],
      ['timeframes and filters are research choices rather than proven best conditions', /Those are research choices rather than proven best conditions/i],
      ['QML retest is a possible entry candidate, not institutional evidence', /A retest of the selected intermediate swing can be studied as an entry candidate/i],
      ['QML swing points are fixed before evaluation', /Freeze pivot and entry rules before evaluating it/i],
    ],
  },
  {
    slug: 'ict-market-order-flow-explained',
    forbidden: [
      ['market-order-flow paragraph describes institutions as a directional force without evidence', /Institutional order flow specifically refers to the directional pressure from large institutions/i],
      ['structural labels said to prove dominant institutional direction changes', /Each of these events represents a moment when the dominant institutional direction has changed/i],
      ['weekly structure said to require all daily entries to be long', /all daily entries should be long/i],
      ['daily structure said to require all lower-timeframe entries to be long', /all 15-minute and 5-minute entries should be long/i],
      ['lower-timeframe MSS said to confirm institutional orders executing', /The LTF MSS is the real-time confirmation that institutional orders are executing/i],
      ['timeframe agreement called maximum confluence', /you have maximum confluence for your trading bias/i],
      ['structure-based stops claimed to prevent arbitrary stop errors categorically', /This principle prevents the common mistake of placing arbitrary stops/i],
      ['daily entries are all prescribed to follow weekly direction', /all daily entries should be long/i],
      ['intraday entries are all prescribed to follow daily direction', /all 15-minute and 5-minute entries should be long/i],
      ['timeframe agreement claimed to provide maximum confluence', /you have maximum confluence for your trading bias/i],
    ],
    required: [
      ['order-flow analysis is distinct from chart interpretation', /Price candles alone do not identify institutional participants or quantify their directional pressure/i],
      ['ChoCH/MSS/CISD are not evidence that institutions changed direction', /none of these chart events establishes that institutional participants changed direction/i],
      ['weekly and daily structure are optional context filters, not all-entry direction rules', /Weekly higher highs\/higher lows do not require all daily trades to be long/i],
      ['MSS trigger does not confirm institutional order execution', /It does not confirm institutional orders are executing/i],
      ['timeframe agreement is a filter to test', /Agreement across weekly, daily and 4-hour labels is a filter to test/i],
      ['stop placement is compared against alternatives and account risk', /A structural stop is not inherently superior to a volatility- or time-based stop/i],
      ['institutional order flow label is not direct participant-level evidence', /“Institutional order flow” in ICT chart commentary is often an interpretation, not direct participant-level evidence/i],
      ['structural alignment is a tested filter rather than proof of edge', /Agreement across weekly, daily and 4-hour labels is a filter to test/i],
    ],
  },

  {
    slug: 'ict-complete-2022-trading-strategy',
    forbidden: [
      ['2022 model described as the complete practical application of all ICT', /Master the 2022 model and you have mastered the practical application of ICT/i],
      ['all ICT concepts said to serve one core sequence', /Everything else in ICT[\s\S]{0,220}serves to refine and confirm this core sequence/i],
      ['one high-quality trade per session stated as a universal maximum', /One high-quality trade per session, maximum/i],
    ],
    required: [
      ['2022 model is explicitly one source-dependent variant', /One commonly taught 2022-model variant combines a selected liquidity interaction/i],
      ['model is not a complete description of all ICT approaches', /This is one source-dependent framework, not a complete description of every ICT approach/i],
      ['variant requires tests against simpler alternatives', /define each condition and test whether the sequence adds value over simpler alternatives/i],
    ],
  },

  {
    slug: 'power-of-three-amd-model',
    forbidden: [
      ['daily AMD assigned to NY AM as the primary delivery window', /The Distribution phase on a daily timeframe corresponds to the New York AM session — the primary delivery window/i],
      ['weekday/month phases presented as typical AMD schedule', /On a weekly basis, Wednesday through Thursday are typically the Distribution days/i],
      ['daily open stated to be non-random and define the entire delivery sequence', /The Open of the daily candle is not random/i],
      ['candle body/wicks treated as true move and manipulation proof', /The body of the daily candle represents the real move; the wicks represent the manipulation phases/i],
      ['larger wick said to prove more liquidity swept and cleaner distribution', /The bigger the wick in one direction, the more liquidity was swept/i],
      ['weekly distribution used to explain away contrary daily price action', /those daily manipulations are simply the internal AMD cycles within the larger weekly distribution/i],
      ['historical candle inspection promoted as adequate real-time pattern identification', /Once you can consistently identify AMD in completed historical candles, begin watching for the pattern in real time/i],
    ],
    required: [
      ['daily/weekly/monthly AMD phase timing labelled source-specific hypothesis', /These are source-specific hypotheses, not reliable schedules for daily, weekly or monthly price delivery/i],
      ['True Daily Open described as a charting convention', /This is a charting convention, not a universal starting point or proof that the day follows an AMD delivery sequence/i],
      ['candle body and wicks defined descriptively, not as motive evidence', /these shapes do not identify a manipulation phase or explain why price moved/i],
      ['wick size not treated as order-count evidence', /Wick size measures the candle's excursion beyond its body, not how many orders were triggered/i],
      ['higher-timeframe AMD labels are compared against a baseline', /measure whether the added context improves a baseline/i],
      ['AMD study starts with prospective rules and consecutive candles', /define the range, excursion and later-expansion rules before reviewing a sample of consecutive candles/i],
    ],
  },
  {
    slug: 'ict-macro-times-explained',
    forbidden: [
      ['macro heading attributes objective actions to an algorithm', /What the Algorithm Does During Macros/i],
    ],
    required: [
      ['macro heading distinguishes source interpretations from observable behaviour', /What Some ICT Sources Attribute to Macro Windows/i],
      ['macro activity is not treated as verified institutional or algorithmic activity', /not verified periods of peak algorithmic or institutional activity/i],
    ],
  },
  {
    slug: 'ict-candle-range-theory-crt',
    forbidden: [
      ['previous candle extrema described as local liquidity pools without caveat', /The previous candle's high and low are local liquidity pools/i],
      ['CRT imposes a mandatory sweep before buying', /wait for the sweep of the previous 15-minute low before entering/i],
    ],
    required: [
      ['previous candle extremes are local references, not confirmed liquidity', /Those levels do not confirm that stop orders are present or that price must cross either one/i],
      ['CRT bullish sweep is one test variant and not mandatory', /A sweep is not mandatory in every market condition, and the crossing alone is not an entry signal/i],
    ],
  },
  {
    slug: 'ict-one-shot-one-kill-model',
    forbidden: [
      ['a single most significant PD Array said to be the likely target and entry zone', /Identify the single most significant PD Array that price is most likely to deliver to during today's killzone\. This is your entry zone\./i],
    ],
    required: [
      ['PD Array candidate zones and possible exits are separately defined', /mark candidate zones with a written boundary rule and separately define any possible exit reference/i],
      ['PD Array is not automatically the entry or likely target', /Neither a PD Array nor a liquidity target is automatically the entry zone or the level price is most likely to reach/i],
    ],
  },
  {
    slug: 'ict-liquidity-void-explained',
    forbidden: [
      ['liquidity void guarantees acceleration and continued movement', /expect price to accelerate — do not take early profits within the void zone as the absence of resistance means the move will continue/i],
      ['void is guaranteed to fill rapidly and defines a minimum target', /The void will be filled rapidly once price enters it/i],
      ['stop placement inside a void is claimed to be hit even when direction is correct', /A stop in a void will be hit by the rapid price movement through the void/i],
      ['every price inside a void deemed invalid support or resistance', /Any price level within a marked void is not valid support or resistance/i],
      ['take-profit distance automatically extended to void fill', /your realistic minimum target is 30 pips/i],
    ],
    required: [
      ['low-overlap area may accelerate, pause or reverse', /record whether it accelerates, pauses, reverses or remains inside the zone/i],
      ['void fill is not assumed and exits remain rule-based', /do not treat a full fill or a rapid move as a minimum outcome/i],
      ['stop is defined by invalidation and execution characteristics', /Place stops according to the predefined invalidation rule, instrument volatility and execution characteristics/i],
      ['support/resistance inside candidate void is not ruled out automatically', /Do not automatically discard levels within the area as support or resistance without testing that rule/i],
      ['void does not justify increasing take-profit distance', /does not justify increasing a take-profit distance or assuming the full area will be crossed/i],
    ],
  },

  {
    slug: 'how-to-trade-fair-value-gaps',
    forbidden: [
      ['FVG heading presents an institutional-intent explanation as fact', /The Institutional Logic Behind Fair Value Gaps/i],
    ],
    required: [
      ['FVG heading frames the section as an ICT interpretation', /How ICT Interprets Fair Value Gaps/i],
    ],
  },
  {
    slug: 'daily-bias-ict-how-to-determine',
    forbidden: [
      ['midnight open heading claims to be the true daily reference', /The Midnight Open — The True Daily Reference/i],
    ],
    required: [
      ['midnight open heading marks the reference as source-specific', /The Midnight Open — A Source-Specific Reference/i],
    ],
  },
  {
    slug: 'ict-optimal-trade-entry-ote',
    forbidden: [
      ['OTE heading says the retracement zone is inherently institutional', /Why the 62-79% Zone Is Institutional/i],
    ],
    required: [
      ['OTE heading attributes the concept to some ICT sources', /How Some ICT Sources Interpret the 62–79% Zone/i],
    ],
  },
  {
    slug: 'ict-scalping-strategy',
    forbidden: [
      ['scalping heading promises best pairs and sessions', /Best Pairs and Sessions for ICT Scalping/i],
    ],
    required: [
      ['scalping heading frames instruments and sessions as a comparison', /Comparing Pairs and Sessions for ICT Scalping/i],
    ],
  },
  {
    slug: 'ict-asian-range-trading-strategy',
    forbidden: [
      ['Asian-range heading claims best pairs', /Best Pairs for Asian Range Trading/i],
    ],
    required: [
      ['Asian-range heading frames pair choice as a test comparison', /Comparing Pairs for Asian-Range Tests/i],
    ],
  },
  {
    slug: 'ict-displacement-move-explained',
    forbidden: [
      ['displacement heading infers institutional participation from price pattern', /Why Displacement Signals Institutional Participation/i],
    ],
    required: [
      ['displacement heading describes an observable price pattern', /Displacement as an Observable Price Pattern/i],
    ],
  },

  {
    slug: 'trading-psychology-complete-guide',
    forbidden: [
      ['psychology title promises a complete guide to mastering the mind', /Trading Psychology: The Complete Guide to Mastering Your Mind \(2026\)/i],
      ['discipline described as the only real edge', /Chapter 5: Discipline -- The Only Real Edge/i],
      ['confidence promised to be unshakeable', /Chapter 6: Building Unshakeable Confidence/i],
      ['FOMO asserted to mean the optimal entry is gone', /By the time you feel FOMO, the optimal entry is gone/i],
    ],
    required: [
      ['psychology title names the actual topics without mastery promise', /Trading Psychology: Fear, FOMO, Risk and Decision Routines/i],
      ['discipline is positioned alongside execution quality', /Chapter 5: Discipline and Execution Quality/i],
      ['confidence is grounded in evidence and process', /Chapter 6: Building Evidence-Based Confidence/i],
      ['FOMO is not treated as evidence that an opportunity is gone', /the feeling alone does not show whether an opportunity has passed or remains available/i],
      ['psychology copy says performance also depends on other factors', /Psychology is one part of trading performance alongside strategy quality, risk management, market conditions, and execution/i],
    ],
  },

];

for (const check of articleBodyRegressionChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing article required for body-regression checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) errors.push('/blog/' + check.slug + ': body overclaim regression: ' + label + '.');
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) errors.push('/blog/' + check.slug + ': expected body safeguard missing: ' + label + '.');
  }
}


const remainingLongTailEditorialChecks = [
  {
    slug: 'ict-propulsion-block-guide',
    forbidden: [
      ['first return claimed as an entry opportunity', /The first retracement back to the Propulsion Block zone is your entry opportunity/i],
      ['zone said to show maximum institutional intent', /the area of maximum institutional intent/i],
      ['midpoint limit and target prescription presented as universal', /Entry: a limit order at the midpoint of the Propulsion Block candle/i],
      ['confluence described as particularly powerful', /creates one of the commonly studied entry structures in the entire advanced ICT toolkit/i],
    ],
    required: [
      ['definitions vary and need a prewritten boundary rule', /Definitions of a Propulsion Block vary by ICT source/i],
      ['first retest may fail or never happen', /Price may not return, may trade through it or may react without a tradable entry/i],
      ['entry, invalidation and exit rules are written before replay', /Specify the confirmation, invalidation and exit rules before replay/i],
      ['confluence must be benchmarked rather than ranked', /Overlap is a candidate filter, not proof of independent confirmations or superior performance/i],
    ],
  },
  {
    slug: 'ict-breaker-block-explained',
    forbidden: [
      ['breaker and mitigation block claimed as one universal lifecycle', /A Mitigation Block is simply a failed Order Block[\s\S]{0,300}the Breaker Block trade is the entry/i],
      ['retest assumed to confirm role reversal', /the polarity flip has been confirmed/i],
    ],
    required: [
      ['breaker and mitigation terminology is educator-dependent', /Terminology around mitigation blocks and breakers varies by educator/i],
      ['a revisit is not sufficient confirmation or an entry', /A revisit is not itself confirmation, and neither label is an entry until the trigger, invalidation and exit rules are met/i],
    ],
  },
  {
    slug: 'backtest-ict-strategies',
    forbidden: [
      ['positive sample expectancy equated with strategy profitability', /A positive expectancy equals a profitable strategy/i],
      ['profit factor threshold called universally good or excellent', /Above 1\.5 is good\. Above 2\.0 is excellent/i],
      ['20 trades stated to tell nothing', /20 trades tells you nothing/i],
      ['one fixed pip adjustment applied to every win', /subtract 1-2 pips from every win to simulate real spread costs/i],
      ['filter search guaranteed to reveal which rules to keep', /Results will show which filters to require and which to exclude/i],
    ],
    required: [
      ['positive historical expectancy not treated as durable edge', /Positive historical expectancy does not establish a durable edge/i],
      ['cost modelling is instrument and execution specific', /model spread, commission, slippage and any relevant financing costs/i],
      ['filter comparisons require held-out validation', /validate any selected filter on untouched chronological data/i],
      ['sample size and break-even treatment are disclosed', /report sample size and treatment of break-even trades/i],
    ],
  },
  {
    slug: 'ict-bearish-order-block-complete',
    forbidden: [
      ['a 3:1 to 8:1 ratio presented as standard', /a 3:1 to 8:1 ratio should be presented as standard/i],
      ['bearish OB label mandates institutional interpretation', /confirms institutional selling or guarantees a reaction/i],
    ],
    required: [
      ['reward-to-risk ratios require supporting data', /a 3:1 to 8:1 ratio should not be presented as standard without data/i],
      ['bearish OB boundaries are selected and declared in advance', /State the boundary convention in advance/i],
      ['no-retest and failed-retest outcomes are logged', /Track reactions, full traversal, no-retest and missed-entry outcomes/i],
    ],
  },
  {
    slug: 'ict-ipda-interbank-price-delivery',
    forbidden: [
      ['IPDA levels described as certain targets', /(?:The model guarantees|IPDA guarantees|Price must reach) all six levels/i],
      ['algorithm asserted to dictate the path', /(?:IPDA proves|IPDA establishes|IPDA confirms)\s+(?:that\s+)?one algorithm governs markets/i],
    ],
    required: [
      ['IPDA is presented as a conceptual model rather than independent proof', /it is not independent evidence that one algorithm governs markets/i],
      ['misses and untouched reference levels remain in the record', /Mark selected ranges, document the reason for each hypothesis, and record misses as well as hits/i],
      ['quarterly context remains a scenario to test', /Treat the quarterly direction as a scenario to test/i],
    ],
  },
];
for (const check of remainingLongTailEditorialChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing long-tail article for editorial checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) errors.push('/blog/' + check.slug + ': long-tail claim regression (' + label + ').');
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) errors.push('/blog/' + check.slug + ': long-tail safeguard missing (' + label + ').');
  }
}

const remainingModelSessionGapChecks = [
  {
    slug: 'ict-market-maker-sell-model-mmsm',
    forbidden: [
      ['MSS claimed to confirm reversal', /The bearish MSS on the 5-minute chart confirms the reversal/i],
      ['price delivery and distribution asserted as a completed lifecycle', /Phase Five — Bearish Distribution: Price is delivered lower aggressively/i],
      ['short covering and retail panic inferred from candles', /The algorithm covers its short position into the selling panic of retail traders/i],
      ['model said to provide complete structural context', /Identifying the model gives you the complete structural context/i],
      ['model labels credited with consistent performance', /what produces consistent, repeatable performance/i],
    ],
    required: [
      ['phases are not a verified institutional lifecycle', /They do not have to contain every lower-timeframe setup/i],
      ['bearish structure label does not establish a lasting reversal', /An MSS label does not establish a lasting reversal/i],
      ['SSL target is a candidate rather than guaranteed destination', /A nearby SSL is a candidate exit reference, not a guaranteed target/i],
      ['baseline and failure cases are compared', /Compare a written model with a simpler range-break baseline on chronological and held-out samples/i],
    ],
  },
  {
    slug: 'ict-intraday-profiles-london',
    forbidden: [
      ['institutional agenda and largest-player claims', /the largest institutional players in the world/i],
      ['daily institutional objectives stated as fact', /They have specific daily objectives: fill the Asian range gaps/i],
      ['institutional execution claimed systematic and predictable', /the systematic execution of institutional order flow within predictable time structures/i],
      ['London sweep/reverse called most common', /This is the most common London profile/i],
      ['London continuation causally explained by bias overriding manipulation', /overrides the typical manipulation phase/i],
      ['consolidation profile ranked least common and predicts NY move', /This is the least common London profile and typically precedes a significant New York session move/i],
      ['Asian range declared target London will most likely seek', /These levels represent the buy-side and sell-side liquidity pools that London will most likely target/i],
      ['daily bias said to predict which side London sweeps first', /A bearish daily bias suggests London will sweep the Asian high first/i],
      ['London close described as a consistent profile tied to bank books', /The London close .* produces its own consistent profile/i],
    ],
    required: [
      ['profiles are hypotheses and require chronological sample', /Test each profile against a chronological sample and include sessions that do not fit/i],
      ['timezone and outcomes are consistently tracked', /Record no-cross, one-side, two-side and continuation outcomes/i],
      ['London-close time filter does not prove bank motives', /does not establish that banks are closing positions or that a retracement will occur/i],
      ['frequency and incremental value tested against baseline', /compare its frequency with a simple range or volatility baseline/i],
    ],
  },
  {
    slug: 'ict-nwog-ndog-opening-gaps',
    forbidden: [
      ['opening gaps described as algorithmic price levels', /algorithmic price levels created at the opening of each new trading week/i],
      ['algorithm said to seek gap fill', /The algorithm seeks to fill this zone/i],
      ['NWOG fill asserted to occur during the week', /price will at some point rally back up to fill the gap/i],
      ['Monday/Tuesday fill frequency asserted without data', /Weekly gaps are commonly filled on Monday or Tuesday/i],
      ['gap confluence said to significantly increase probability', /the probability and conviction behind that setup significantly increases/i],
      ['midpoint alignment treated as a directional target', /gap fill represents a potential daily upside target/i],
    ],
    required: [
      ['opening gap can remain open', /a gap may remain open/i],
      ['gap revisit outcomes include no, partial and full fill', /separately count no revisit, partial fill and full fill/i],
      ['gap midpoints are candidates not validated targets', /Its position relative to the opening price is not by itself a validated upside or downside target/i],
      ['opening gap and external-range sequence is tested not assumed', /test any sequence between internal and external references rather than assuming an order in which price must visit them/i],
    ],
  },
];
for (const check of remainingModelSessionGapChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing article required for model/session/gap checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) errors.push('/blog/' + check.slug + ': model/session/gap regression (' + label + ').');
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) errors.push('/blog/' + check.slug + ': required model/session/gap safeguard missing (' + label + ').');
  }
}


const remainingSupplySuspensionChecks = [
  {
    slug: 'ict-supply-demand-forex',
    forbidden: [
      ['ICT claimed a more precise institutional framework', /ICT elevates and refines those concepts into a more precise institutional framework/i],
      ['prior buying pressure claimed to activate again', /expecting the buying pressure that previously reversed price there to activate again/i],
      ['tighter stop said to improve reward-to-risk automatically', /tighter stop = better R:R/i],
      ['premium/discount treated as mandatory ICT rule', /only buy in discount \(below 50% of range\)/i],
      ['zone break said to create a short entry automatically', /it will flip to resistance and become a short entry on the retest/i],
      ['ICT terminology promised immediate accuracy improvement', /you will immediately improve your entry accuracy/i],
    ],
    required: [
      ['zone labels do not establish superiority', /Compare explicit versions of both methods on the same sample before drawing a performance conclusion/i],
      ['tighter stop risk tradeoff is explicit', /A tighter stop can increase the nominal reward-to-risk ratio while also increasing stop-outs/i],
      ['added filters tested against a simpler baseline', /Compare each added condition with a simpler baseline on the same sample/i],
      ['zone labels do not verify institutional orders', /it does not prove that institutional orders remain in a zone/i],
    ],
  },
  {
    slug: 'ict-suspension-block-2025',
    forbidden: [
      ['3-7 candle cluster presented as universal definition', /Look for a cluster of 3-7 candles with very small bodies/i],
      ['powerful displacement assumed after every suspension', /Immediately following the suspension cluster, a powerful displacement move occurs/i],
      ['suspension zone automatically becomes a valid block', /The suspension zone itself becomes the Suspension Block/i],
      ['retest said to act as support or resistance', /acts as support \(if the move after it was bullish\) or resistance/i],
      ['quiet sessions described as institutional accumulation', /The most valid Suspension Blocks form during accumulation periods/i],
    ],
    required: [
      ['candle count is a model choice to test', /Three to seven bars can be tested as one choice, not treated as a universal definition/i],
      ['post-cluster failure cases are recorded', /record clusters that are followed by a small move, a reversal or no clear move/i],
      ['retest may fail or never occur', /the marked zone may hold, fail, or not be revisited/i],
      ['session timing does not prove accumulation', /A quiet session does not establish institutional accumulation/i],
    ],
  },
];
for (const check of remainingSupplySuspensionChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing article required for supply/suspension checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) errors.push('/blog/' + check.slug + ': supply/suspension regression (' + label + ').');
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) errors.push('/blog/' + check.slug + ': required supply/suspension safeguard missing (' + label + ').');
  }
}


const remainingSwingPullbackChecks = [
  {
    slug: 'ict-swing-high-swing-low-explained',
    forbidden: [
      ['additional confirming bars said to prove significance', /more confirming candles on each side = more significant swing low/i],
      ['swing highs asserted to be where liquidity accumulates', /Swing highs are where buy-side liquidity accumulates/i],
      ['timeframe alone said to determine liquidity pool size', /daily swing highs are major structural levels with large liquidity pools/i],
      ['fixed confirmation count prescribed by timeframe', /On the 5-minute chart, use the minimum definition.*?On the daily chart, use 3-5 confirming candles/i],
      ['swing practice promises automatic accuracy in two weeks', /Within two weeks, swing identification will be automatic/i],
      ['pivot labels said universally to determine correct OB', /Wrong swing = wrong OB/i],
    ],
    required: [
      ['confirming bars change recognition but do not prove order density', /they do not by themselves prove greater significance or a larger pool of orders/i],
      ['higher timeframe is not evidence of larger order pool', /timeframe alone does not prove a larger order pool, more important level or better entry/i],
      ['confirmation count is a testable variant', /neither is a universal requirement or proof of greater structural significance/i],
      ['practice is not a guarantee of accuracy', /Repeated practice can improve consistency, but it does not guarantee automatic identification or greater trading accuracy/i],
    ],
  },
  {
    slug: 'ict-valid-pullback-guide',
    forbidden: [
      ['one HL break universally means pullback is invalid or ChoCH', /this is a ChoCH, not a valid pullback/i],
      ['prior mitigation universally invalidates FVG', /a previously mitigated FVG is no longer valid for re-entry/i],
      ['open space assumed to have no institutional zone', /no institutional zone to react from/i],
      ['news flow contrasted with institutional order flow as if known', /rather than institutional order flow/i],
      ['slow overlap claimed to diagnose structural reversal', /this suggests potential structural reversal rather than a healthy trend retracement/i],
    ],
    required: [
      ['HL rule is a selected variant, not universal', /This is not a universal definition of every pullback or ChoCH/i],
      ['prior mitigation is an optional filter to test', /prior contact alone does not make every gap universally invalid for re-entry/i],
      ['news and liquidity are context variables, not participant identification', /they do not identify whether a move came from institutional or other order flow/i],
      ['pace filter is predeclared and captures both outcomes', /include both continuations and reversals in the results/i],
    ],
  },
];
for (const check of remainingSwingPullbackChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing article required for swing/pullback checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) errors.push('/blog/' + check.slug + ': swing/pullback regression (' + label + ').');
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) errors.push('/blog/' + check.slug + ': required swing/pullback safeguard missing (' + label + ').');
  }
}


const remainingInducementPremiumDiscountChecks = [
  {
    slug: 'ict-inducement-after-bos',
    forbidden: [
      ['inducement described as deliberate algorithmic trap', /a deliberate algorithmic trap designed to attract entries at the wrong level/i],
      ['deeper zone described as the real entry after a trap', /The real entry zone was the deeper PD Array/i],
      ['deeper 62-79% zone assumed necessary', /the shallow retracement is inducement/i],
      ['algorithm said to need to collect stops', /the algorithm still needs to collect that liquidity/i],
      ['entry alignment failure called almost certainly inducement', /is almost certainly inducement/i],
      ['deeper liquidity target assumed to be swept first', /price will likely take that liquidity first/i],
      ['all entries required to pass four filters', /You need a confirmed HTF PD Array,[\s\S]{0,180}If your entry cannot satisfy all four criteria/i],
    ],
    required: [
      ['inducement cannot be inferred from a stop-out', /does not explain why the event occurred, identify who held orders, or establish a deliberate algorithmic trap/i],
      ['earlier and deeper zone variants are compared', /Compare the earlier-zone and deeper-zone variants using prewritten triggers, invalidation, missed fills and costs/i],
      ['stop orders are not assumed from a chart', /Candle charts do not show that stop orders are present there or that price needs to cross it/i],
      ['lower liquidity can be an alternative path', /Do not assume price will cross it first/i],
    ],
  },
  {
    slug: 'ict-premium-discount-zone-identification',
    forbidden: [
      ['midpoint called objective fair value', /the 50% midpoint of this range is the equilibrium — the fair value price/i],
      ['premium/discount imposed as only buy/sell rule', /only consider buy entries when price is below the 50% level/i],
      ['OTE called ideal entry point', /is the ideal entry point — deeply discounted within the range/i],
      ['premium/discount used as absolute FVG/OB ban', /Never buy a premium FVG or sell a discount FVG/i],
      ['multiple timeframe discount called double confirmation', /you have double confirmation of favorable pricing/i],
      ['midpoint check promised to eliminate suboptimal entries', /will eliminate a large percentage of suboptimal entries/i],
    ],
    required: [
      ['midpoint is arithmetic location not objective fair value', /that wording does not make it an objectively fair value or show where orders should be active/i],
      ['premium/discount eligibility is a tested variant', /treat below-midpoint location as eligibility only/i],
      ['OTE ratios are chosen conventions, not universal entry', /These ratios are not a universally ideal entry or a validated requirement/i],
      ['multiple ranges are not independent confirmation by definition', /log that alignment as a condition rather than independent confirmation of favorable pricing/i],
      ['filter requires with/without comparison', /compare performance with and without the filter/i],
    ],
  },
];
for (const check of remainingInducementPremiumDiscountChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing article required for inducement/premium-discount checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) errors.push('/blog/' + check.slug + ': inducement/premium-discount regression (' + label + ').');
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) errors.push('/blog/' + check.slug + ': required inducement/premium-discount safeguard missing (' + label + ').');
  }
}


const remainingMmbmOsokChecks = [
  {
    slug: 'ict-market-maker-buy-model-mmbm',
    forbidden: [
      ['MMBM session timing claimed as a consistent pattern', /You will find a consistent pattern: the Judas Swing most often occurs during the Asian session/i],
      ['phase timing presented as a recurring session rule', /the true distribution \(Phase Five\) occurs during the London and New York sessions/i],
    ],
    required: [
      ['phase/session sample is selected without looking ahead', /preselect a consecutive sample of daily charts and define each phase without looking ahead/i],
      ['session timing is compared with baseline and includes exceptions', /compared with a baseline and reported with the sample size; do not assume phase timing repeats/i],
    ],
  },
  {
    slug: 'ict-one-shot-one-kill-model',
    forbidden: [
      ['DOL imposed as the exact target for every OSOK setup', /the exact target \(the DOL\)/i],
    ],
    required: [
      ['DOL is a candidate target, not a required destination', /a Draw on Liquidity \(DOL\) can be one candidate reference if the model uses it, but it is not a destination price must reach/i],
      ['entry and exit rules are defined separately', /define the entry trigger, invalidation and stop rule/i],
    ],
  },
];
for (const check of remainingMmbmOsokChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing article required for MMBM/OSOK checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) errors.push('/blog/' + check.slug + ': MMBM/OSOK regression (' + label + ').');
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) errors.push('/blog/' + check.slug + ': required MMBM/OSOK safeguard missing (' + label + ').');
  }
}


const remaining2022ModelChecks = [
  {
    slug: 'ict-complete-2022-trading-strategy',
    forbidden: [
      ['quarterly move said to have institutional delivery overriding short-term fluctuations', /Each quarter has an institutional directional delivery that overrides short-term fluctuations/i],
      ['monthly direction implied to be determined by quarterly shift', /Within the quarterly shift, determine the current month/i],
      ['DOL described as the target price is targeting this week', /a higher timeframe PD Array that price is targeting this week/i],
      ['daily PD Array said to be most likely target', /that price is most likely to deliver to during the current or next trading session/i],
      ['AMD pattern described as true directional move', /the distribution phase \(true directional move\)/i],
      ['daily DOL prescribed as every setup target', /Target: the daily DOL/i],
      ['3:1 ratio imposed as universal minimum', /at least a 3:1 minimum R:R for any 2022 model trade/i],
    ],
    required: [
      ['quarterly context is a testable scenario', /It is a higher-timeframe scenario to test, not evidence of institutional delivery/i],
      ['weekly DOL is a candidate reference', /Its presence does not establish that price is targeting it or will reach it this week/i],
      ['AMD/Judas labels do not prove manipulation or true direction', /not proof of manipulation or the “true” direction/i],
      ['entry includes no-trigger and missed-fill cases', /Include no-trigger, missed-fill and failed-trade cases/i],
      ['3:1 minimum is not universal', /A 3:1 minimum reward-to-risk ratio is not a universal requirement/i],
      ['risk rules and documented invalidation are preserved', /honoring predefined invalidation and risk limits/i],
    ],
  },
];
for (const check of remaining2022ModelChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing article required for 2022-model checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) errors.push('/blog/' + check.slug + ': 2022-model regression (' + label + ').');
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) errors.push('/blog/' + check.slug + ': required 2022-model safeguard missing (' + label + ').');
  }
}


const remainingVenomModelChecks = [
  {
    slug: 'ict-venom-model-2025',
    forbidden: [
      ['daily bias stated as verified institutional order flow', /Determine whether institutional order flow is bullish or bearish on the daily chart/i],
      ['counter-side crossing required as a universal stop sweep', /wait for price to sweep the liquidity level opposite to your bias/i],
      ['MSS said to require a fixed 5-minute confirmation', /Price must break above the most recent short-term high.*?with a displacement candle/i],
      ['FVG retracement entry treated as certain', /Wait for price to retrace into this FVG and enter at the CE/i],
      ['sweep stop claimed to prevent significant damage', /the stop is triggered before significant damage is done/i],
      ['sweep/MSS sequence said to protect from false signals', /Both forms of patience protect you from false signals/i],
      ['three components said to be the only model that works', /The model only works when all three components/i],
    ],
    required: [
      ['daily context is a tested filter, not proof of order flow', /Candle structure does not verify institutional order flow; test whether limiting entries to that direction changes outcomes/i],
      ['crossing does not prove stops were collected', /A crossing does not prove that stops were present or collected/i],
      ['structure condition is source-specific', /This is a model-specific confirmation, not proof of a reversal or a universal requirement/i],
      ['retrace may not occur and expiry is specified', /Price may not return, may pass through the zone or may never qualify/i],
      ['stop is an invalidation rule with execution risk', /it can still be hit by continuation or volatility/i],
      ['combined model is compared with its components and failure cases', /Compare the combined rule with each component alone and include failed, absent and missed-fill cases/i],
    ],
  },
];
for (const check of remainingVenomModelChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing article required for Venom-model checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) errors.push('/blog/' + check.slug + ': Venom-model regression (' + label + ').');
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) errors.push('/blog/' + check.slug + ': required Venom-model safeguard missing (' + label + ').');
  }
}


const remainingRdrbNewsAsianChecks = [
  {
    slug: 'ict-rdrb-redelivered-rebalanced-price-range',
    forbidden: [
      ['RDRB described as creating new institutional significance', /creates the RDRB — the zone now has a new type of institutional significance/i],
      ['RDRB described as double institutional significance', /The RDRB has a double layer/i],
      ['gap fill said to confirm institutional presence', /institutions confirmed their presence there by filling it/i],
      ['RDRB midpoint entry prescribed automatically', /Enter at the CE of the lower timeframe FVG/i],
    ],
    required: [
      ['RDRB sequence is a source-specific label', /The classification does not establish new institutional significance/i],
      ['fill/redelivery boundaries are predeclared', /Define what counts as a complete fill and redelivery under the chosen source/i],
      ['label does not show unfilled institutional orders', /Neither label shows that unfilled institutional orders remain at the zone/i],
      ['entry/exit are variants with expiry and candidate target', /an external-range level can be a candidate exit, not a required destination/i],
    ],
  },
  {
    slug: 'ict-seek-and-destroy-friday',
    forbidden: [
      ['NFP assigned a fixed first-Friday schedule', /NFP is released at 8:30 AM New York time on the first Friday of each month/i],
      ['fixed 50-150 pip move claimed from release', /produces moves of 50-150 pips in seconds/i],
      ['pre-release institutional positioning asserted as fact', /institutional traders are positioning, hedging, and accumulating/i],
      ['algorithm said to collect both sides before true move', /The algorithm takes advantage of this positioning period to collect liquidity from both sides/i],
      ['universal pre-event size reduction prescribed', /significantly reduce your position sizing or avoid trading altogether during the pre-event period/i],
    ],
    required: [
      ['release schedule checked on current calendar', /check the current release calendar and timezone rather than assuming a fixed weekday rule/i],
      ['candles do not reveal participant positioning or motive', /Candles do not reveal institutional positioning or show that an algorithm collects liquidity/i],
      ['event-risk action follows predeclared policy', /follow a written event-risk policy/i],
      ['event move size is instrument and event dependent', /the size of a move varies by instrument and event/i],
    ],
  },
  {
    slug: 'ict-asian-range-trading-strategy',
    forbidden: [
      ['narrow Asian range said to contain more institutional orders', /A narrow Asian range has more accumulated institutional orders/i],
      ['bullish bias predicts the Asian low is swept first', /If bullish, expect the London session to first sweep the Asian low/i],
      ['bearish bias predicts the Asian high is swept first', /expect London to first sweep the Asian high/i],
      ['first FVG after crossing prescribed as entry', /Enter at the first FVG created by the reversal displacement/i],
      ['opposite side and external pool prescribed in sequence', /the opposite side of the Asian range first, then the next higher timeframe liquidity pool beyond it/i],
    ],
    required: [
      ['range width is measured and does not reveal orders', /A narrow range does not reveal order placement or predict a larger London or New York move/i],
      ['alternative London paths are recorded', /count cases that cross the high, both sides or neither/i],
      ['entry is a defined variant, not automatic', /a crossing alone does not create an automatic trade/i],
      ['range boundaries are candidate exits not required sequence', /Price may reach neither or visit them in a different order/i],
    ],
  },
];
for (const check of remainingRdrbNewsAsianChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing article required for RDRB/news/Asian-range checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) errors.push('/blog/' + check.slug + ': RDRB/news/Asian-range regression (' + label + ').');
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) errors.push('/blog/' + check.slug + ': required RDRB/news/Asian-range safeguard missing (' + label + ').');
  }
}


const remainingLiquidityMechanicsCbdrChecks = [
  {
    slug: 'liquidity-in-ict-trading',
    forbidden: [
      ['retail stops claimed as liquidity filled by institutions', /Retail traders provide liquidity through their stop losses[\s\S]{0,180}the institution on the other side of the trade can fill against/i],
    ],
    required: [
      ['stop order interaction does not identify the counterparty', /Execution can involve a range of counterparties and liquidity providers; candle data does not show that a stop belonged to a retail trader or that an institution was on the other side of a particular fill/i],
    ],
  },
  {
    slug: 'ict-central-bank-dealers-range',
    forbidden: [
      ['CBDR attributed to central-bank desk inventory management', /the major institutional participants \(the central bank dealing desks and their associated market makers\) are either winding down for the day or managing overnight inventory/i],
      ['range claimed to be an accumulation phase', /The high and low of this range represent the outer boundaries of the accumulation phase/i],
      ['London breakout treated as typical and decisive', /price will typically break out of the CBDR and move decisively in one direction/i],
      ['narrow CBDR prescribed to yield large daily range', /expect a large daily range once the breakout occurs/i],
      ['wide CBDR said to guarantee a modest move', /The breakout will still occur, but the move is likely to be more modest/i],
      ['break above CBDR treated as session-long bullish bias', /bias is bullish for the session/i],
      ['London assumes a sweep then opposite-direction delivery', /watch for the London session to sweep one side before delivering in the other direction/i],
      ['large/small CBDR stated as a deterministic forecast', /Large CBDR = modest day; small CBDR = potentially large day/i],
    ],
    required: [
      ['CBDR is a selected measurement interval not an institutional activity observation', /price candles alone cannot identify which institutions were active, what inventory they managed, or who caused the interval’s high and low/i],
      ['subsequent session outcomes include multiple paths', /price may break one side, stay inside, cross both sides or continue ranging/i],
      ['range-width hypothesis is tested with no-break cases', /Include days with no breakout or limited movement, and compare results with a baseline/i],
      ['CBDR break is a candidate condition not a direction guarantee', /The crossing does not guarantee a bearish session/i],
      ['CBDR width is compared with baseline instead of assumed', /do not assume a large CBDR means a modest day or a small CBDR predicts expansion/i],
    ],
  },
];
for (const check of remainingLiquidityMechanicsCbdrChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing article required for liquidity/CBDR checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) errors.push('/blog/' + check.slug + ': liquidity/CBDR regression (' + label + ').');
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) errors.push('/blog/' + check.slug + ': required liquidity/CBDR safeguard missing (' + label + ').');
  }
}


const remainingFrameworkComparisonRiskChecks = [
  {
    slug: 'ict-vs-smc-difference',
    forbidden: [
      ['guide claims to settle history with facts', /This guide settles the debate with facts, history, and practical advice/i],
      ['single origin timeline asserted for all SMC', /SMC evolved from the community around 2015-2020/i],
      ['successful traders said to all learn both frameworks', /Most successful traders eventually learn both ICT and SMC/i],
      ['course success and superiority asserted without sourcing', /thousands of successful students|more comprehensive than most paid courses/i],
      ['frameworks described as a path to profitable institutional replication', /understanding how institutional traders move price and using that knowledge to trade profitably/i],
    ],
    required: [
      ['frameworks are not proof of market cause or intent', /Neither label proves that the trader can observe institutional activity or guarantees profitable trading/i],
      ['success and course-quality claims require sources', /Claims about student success, years of teaching, and relative course quality require reliable sourcing/i],
      ['rules are compared using costs and risk controls', /test with costs, risk controls and out-of-sample examples/i],
    ],
  },
  {
    slug: 'common-ict-mistakes',
    forbidden: [
      ['midnight open automatically determines direction', /Above midnight open = bullish bias \(look for longs\)\. Below midnight open = bearish bias/i],
      ['revenge trading assigned an unsourced 70% loss rate', /Revenge trading after a loss produces 70%\+ loss rates/i],
      ['news event setups called automatic traps', /ICT setups before NFP or FOMC are traps/i],
      ['1% risk and two consecutive losses imposed as universal rules', /Risk 1% or less\?[\s\S]{0,100}Stop after 2 consecutive losses/i],
      ['checklist score equated to professionalism', /Score 10\/10 = professional trader/i],
      ['FVG/OB stop boundary prescribed for all variants', /For OB entries: stop beyond the OB\. For FVG entries: stop beyond the FVG/i],
    ],
    required: [
      ['midnight open is a variant reference not a complete bias rule', /price above or below it does not by itself establish a bullish or bearish bias/i],
      ['unsourced revenge-trading rate is removed', /Do not use an unsourced 70%\+ loss-rate claim for revenge trading/i],
      ['news risk is handled with a strategy-specific window', /define whether a tested strategy excludes particular windows/i],
      ['risk and pause rules are plan-specific', /respect the account\\?'s risk limit[\s\S]*as a universal measure of professionalism/i],
      ['backtesting is not described as proof of future performance', /cannot prove future results/i],
    ],
  },
];
for (const check of remainingFrameworkComparisonRiskChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing article required for framework/mistake checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) errors.push('/blog/' + check.slug + ': framework/mistake regression (' + label + ').');
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) errors.push('/blog/' + check.slug + ': required framework/mistake safeguard missing (' + label + ').');
  }
}


const fvgMidpointAndEntryChecks = [
  {
    slug: 'how-to-trade-fair-value-gaps',
    forbidden: [
      ['displacement presented as required by the base three-candle definition', /Step 1: Identify a displacement move — a series of large-bodied candles/i],
      ['higher-timeframe alignment is universal validity requirement', /Step 6: Confirm the FVG aligns with your HTF bias before considering it as an entry zone/i],
      ['FVG without displacement called just a gap as a universal rule', /An FVG without a displacement move that created it is just a gap/i],
    ],
    required: [
      ['displacement is an optional separately tested filter', /Apply a displacement filter only if your chosen model requires one/i],
      ['HTF alignment is model-dependent', /record alignment as a candidate condition rather than a universal validity requirement/i],
      ['FVG geometry is separated from claims of institutional activity', /A three-candle FVG is a chart classification under a chosen boundary rule/i],
    ],
  },
  {
    slug: 'ict-single-candle-order-block-scob',
    forbidden: [
      ['SCOB candle presented as full institutional order-placement range', /represents the full price range of the institutional order placement/i],
      ['entry is prescribed as universal CE limit', /Set a limit order at the CE/i],
      ['liquidity target treated as prescribed outcome', /Target: the next liquidity pool in the direction/i],
      ['lower timeframe reaction FVG promises maximum precision', /enter at its CE for maximum precision/i],
      ['precision advantage heading implies established benefit', /SCOB vs Standard OB — The Precision Advantage/i],
    ],
    required: [
      ['single candle is a candidate zone, not confirmed institutional placement', /a chart does not confirm that the candle contains institutional orders/i],
      ['one-candle stop trade-off is explicit', /compare after-cost outcomes and adverse excursion rather than assuming narrower means better/i],
      ['entries are variants with predeclared execution rules', /One entry variant tests a limit at the body midpoint; define invalidation, missed fills and slippage in advance/i],
      ['lower-timeframe confirmation is optional and not guaranteed to improve expectancy', /added steps do not guarantee greater precision or expectancy/i],
    ],
  },
  {
    slug: 'ict-consequent-encroachment-explained',
    forbidden: [
      ['bullish/bearish FVG boundary labels reversed', /high of candle 1 and the low of candle 3 \(for a bearish FVG\) or the low of candle 1 and the high of candle 3 \(for a bullish FVG\)/i],
      ['FVG midpoint presented as the universal most common CE application', /The most common application of the CE is within a Fair Value Gap/i],
      ['CE prescribed as every OB/FVG/BPR entry', /set limit order at the CE of the FVG|set limit order at the CE of the OB body|is your entry level/i],
    ],
    required: [
      ['bullish FVG midpoint boundaries are stated in correct order', /a bullish FVG lies between candle one\\?'s high and candle three\\?'s low when the first is lower/i],
      ['bearish FVG midpoint boundaries are stated in correct order', /a bearish FVG lies between candle three\\?'s high and candle one\\?'s low when the former is lower/i],
      ['midpoint and premium/discount terms depend on chosen convention', /document the exact range and anchors because terminology and boundary selection can vary/i],
      ['midpoint entry is a testable variant rather than a directive', /a test can compare the overlap midpoint, zone boundaries and a separate confirmation trigger/i],
    ],
  },
  {
    slug: 'ict-nwog-ndog-opening-gaps',
    forbidden: [
      ['gap marking is prescribed as a universal recurring rule', /Mark the NWOG at the start of every week|Mark the NDOG at the start of every day/i],
      ['gaps described as only confluence targets', /use them as confluence targets when other PD Arrays align/i],
    ],
    required: [
      ['NWOG timestamps and feed convention are stated', /record the chosen Friday-close and Sunday-open timestamps and feed/i],
      ['NDOG time convention is model-specific', /record the specific daily boundary and timezone/i],
      ['confluence is not a guarantee of fill or reaction', /Confluence with another zone does not guarantee a fill or a favorable reaction/i],
    ],
  },
];
for (const check of fvgMidpointAndEntryChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing article required for FVG/midpoint editorial checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) errors.push('/blog/' + check.slug + ': FVG/midpoint regression (' + label + ').');
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) errors.push('/blog/' + check.slug + ': required FVG/midpoint safeguard missing (' + label + ').');
  }
}


const editorialHeadingAndFramingChecks = [
  {
    slug: 'draw-on-liquidity-ict',
    forbidden: [
      ['weekly DOL wording treats Friday delivery as an expected answer', /where do you believe price will deliver by Friday/i],
      ['weekly target exercise called powerful and framed as price delivery', /A single powerful exercise:/i],
    ],
    required: [
      ['weekly target is recorded as a falsifiable hypothesis', /Weekly Target-Hypothesis Exercise:[\s\S]*condition that would invalidate the hypothesis/i],
      ['review counts alternative levels and no-target outcomes', /whether another level came first and whether no clear target was reached/i],
    ],
  },
  {
    slug: 'ict-ipda-interbank-price-delivery',
    forbidden: [
      ['IPDA heading implies an established delivery mechanism', /How IPDA Delivers Price/i],
    ],
    required: [
      ['IPDA heading describes observed reference use rather than causal delivery', /How Traders Use IPDA References/i],
      ['IPDA is explicitly treated as a conceptual framework', /it is not independent evidence that one algorithm governs markets/i],
    ],
  },
  {
    slug: 'ict-supply-demand-forex',
    forbidden: [
      ['section title claims ICT improves supply and demand as a fact', /How ICT Improves S&D — The Key Advances/i],
    ],
    required: [
      ['section compares methods rather than ranking one as superior', /How ICT and Supply-and-Demand Use Different Filters/i],
      ['methods are compared on the same sample before conclusions', /Compare clearly written versions of each method against the same sample/i],
    ],
  },
  {
    slug: 'what-is-ict-trading',
    forbidden: [
      ['trader failure attributed to one universal lack of understanding', /The traders who fail with ICT are those who learn the vocabulary without understanding the logic/i],
    ],
    required: [
      ['learning pitfalls are framed as one possible explanation, not a diagnosis of all traders', /A possible learning pitfall is memorizing labels without a written definition or testable rule/i],
      ['article allows for multiple causes of poor trading outcomes', /no single explanation applies to all traders/i],
    ],
  },
  {
    slug: 'power-of-three-amd-model',
    forbidden: [
      ['accumulation heading states institutions are building a position', /Phase 1: Accumulation — Building the Position/i],
    ],
    required: [
      ['accumulation heading describes a chart-label convention', /Phase 1: Accumulation — Labeling a Range/i],
      ['body text says a consolidation label does not confirm institutional positioning', /The chart alone does not confirm that institutions are building positions/i],
    ],
  },
];
for (const check of editorialHeadingAndFramingChecks) {
  const post = postChunks.find((item) => item.slug === check.slug);
  if (!post) {
    errors.push('Missing article required for heading/framing checks: ' + check.slug);
    continue;
  }
  for (const [label, pattern] of check.forbidden) {
    if (pattern.test(post.source)) {
      errors.push('/blog/' + check.slug + ': framing regression (' + label + ').');
    }
  }
  for (const [label, pattern] of check.required) {
    if (!pattern.test(post.source)) {
      errors.push('/blog/' + check.slug + ': required framing safeguard missing (' + label + ').');
    }
  }
}

if (errors.length) {
  for (const error of errors) console.error('Blog editorial guard failed: ' + error);
  process.exit(1);
}
console.log('Blog editorial guard passed for ' + slugs.length + ' posts: unique slugs, key certainty claims, and visible methodology context.');