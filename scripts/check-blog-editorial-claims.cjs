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

if (errors.length) {
  for (const error of errors) console.error('Blog editorial guard failed: ' + error);
  process.exit(1);
}
console.log('Blog editorial guard passed for ' + slugs.length + ' posts: unique slugs, key certainty claims, and visible methodology context.');