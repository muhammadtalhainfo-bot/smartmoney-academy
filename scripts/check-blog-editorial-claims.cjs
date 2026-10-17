const fs = require('node:fs');

const postsPath = 'app/blog/posts.js';
const rendererPath = 'app/blog/[slug]/page.js';
const indexPath = 'app/blog/BlogIndexClient.js';
const posts = fs.readFileSync(postsPath, 'utf8');
const renderer = fs.readFileSync(rendererPath, 'utf8');
const index = fs.readFileSync(indexPath, 'utf8');
const errors = [];

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
];
for (const [label, pattern] of focusedSeoRegressions) {
  if (pattern.test(posts)) errors.push('Unsupported claim regression: ' + label + '.');
}

const requiredSeoContext = [
  ['killzone title aligns with search wording', /title: 'ICT Killzone Times: Asian, London & New York Sessions'/],
  ['killzone clock uses New York local time', /Asian Session \(7 PM – 12 AM New York time\)/],
  ['macro timestamps are described as references to test', /Some ICT sources discuss specific macro timestamps, but labels and definitions can differ/i],
  ['NYSE open is not mislabeled as 10 AM', /the regular NYSE core session opens at 9:30 AM ET/i],
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
    readTime: /readTime:\s*'4 min read'/,
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
    readTime: /readTime:\s*'3 min read'/,
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
    readTime: /readTime:\s*'3 min read'/,
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
    readTime: /readTime:\s*'4 min read'/,
  },
  {
    slug: 'ict-killzones-guide',
    forbidden: [
      ['killzones treated as guaranteed win-rate advantage', /These windows guarantee cleaner price action or higher win rates/i],
    ],
    required: [
      ['session windows are described as filters to test', /do not guarantee cleaner price action or higher win rates/i],
    ],
    readTime: /readTime:\s*'4 min read'/,
  },
  {
    slug: 'ict-mss-vs-choch-explained',
    forbidden: [
      ['MSS universally required after every ChoCH', /Never enter on a ChoCH alone[\s\S]{0,180}Wait for the MSS/i],
    ],
    required: [
      ['structure labels treated as model-specific conventions', /Some ICT models require a second structure event after a ChoCH, while others define their trigger differently/i],
    ],
    readTime: /readTime:\s*'3 min read'/,
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
    readTime: /readTime:\s*'5 min read'/,
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
    readTime: /readTime:\s*'3 min read'/,
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
    readTime: /readTime:\s*'3 min read'/,
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
    readTime: /readTime:\s*'6 min read'/,
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
    readTime: /readTime:\s*'3 min read'/,
  },
  {
    slug: 'ict-market-structure-complete-guide',
    forbidden: [
      ['structure labels said to explain everything about trend', /tells you everything you need to know about trend direction and strength/i],
      ['external swing break declared a genuine reversal', /Only when a major external structural high is taken out does a genuine trend reversal occur/i],
      ['BOS and ChoCH treated as universal outcome rules', /A BOS confirms the trend — it is a continuation signal\. Only a ChoCH signals a potential reversal/i],
    ],
    required: [
      ['external/internal structure remains convention-based', /Some ICT conventions call larger swings external structure and smaller swings within the current range internal structure/i],
      ['structure labels do not guarantee outcomes', /Educators define these labels differently; neither label guarantees continuation or reversal/i],
    ],
    readTime: /readTime:\s*'4 min read'/,
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
    readTime: /readTime:\s*'3 min read'/,
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
    ],
    required: [
      ['order-block mechanism claims are framed as interpretations', /A chart cannot identify who traded there, establish hidden accumulation/i],
      ['OB setup includes missed and failed examples', /A zone can fail, be skipped or never be revisited/i],
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
    readTime: /readTime:\s*'11 min read'/,
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
    ],
    required: [
      ['suspension-block shape is not participant evidence', /The cluster does not reveal accumulation by smart money or predict a more explosive move or stronger reaction/i],
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
      ['tighter stops are evaluated against stop-outs and expectancy', /A tighter stop can change the nominal ratio while also increasing stop-outs/i],
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
  if (check.readTime && !check.readTime.test(post.source)) {
    errors.push('/blog/' + check.slug + ': reading-time label no longer matches the audited estimate.');
  }
}

if (errors.length) {
  for (const error of errors) console.error('Blog editorial guard failed: ' + error);
  process.exit(1);
}
console.log('Blog editorial guard passed for ' + slugs.length + ' posts: unique slugs, key certainty claims, and visible methodology context.');