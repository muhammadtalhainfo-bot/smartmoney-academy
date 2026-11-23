async function main() {
  const { POSTS } = await import('../app/blog/posts.js');

const EXPECTED = {
  'understanding-order-blocks': 'ICT Order Blocks: Definitions, Boundaries and Retest Rules',
  'smt-divergence-ict-explained': 'ICT SMT Divergence: Comparing Correlated-Market Swings',
  'how-to-pass-ftmo-ict-strategy': 'Prop-Firm Evaluation Planning: Rules, Risk and ICT Setups',
  'daily-bias-ict-how-to-determine': 'ICT Daily Bias: Building and Testing a Conditional Thesis',
  'draw-on-liquidity-ict': 'ICT Draw on Liquidity: Candidate Targets and Invalidations',
  'ict-turtle-soup-pattern-guide': 'ICT Turtle Soup: Defining Sweep-and-Return Conditions',
  'ict-silver-bullet-strategy-complete': 'ICT Silver Bullet: Session Windows, Conditions and Risk',
  'ict-pd-array-matrix-explained': 'ICT PD Array Matrix: Comparing Common Price Reference Zones',
  'ict-macro-times-explained': 'ICT Macro Times: Session Windows and Testable Conditions',
  'ict-cisd-change-in-state-of-delivery': 'ICT CISD: Defining a Change in Delivery Hypothesis',
  'ict-unicorn-model-explained': 'ICT Unicorn Model: Defining Mitigation and FVG Overlap',
  'ict-smt-divergence-complete-guide': 'ICT SMT Divergence: Comparing Correlated Instruments',
  'ict-intraday-profiles-london': 'ICT London Intraday Profiles: Session Patterns to Test',
  'ict-venom-model-2025': 'ICT Venom Model: Setup Definitions and Testing Limitations',
  'ict-suspension-block-2025': 'ICT Suspension Blocks: Candidate Zones and Retest Rules',
  'ict-reversal-patterns-guide': 'ICT Reversal Patterns: Sweep, Spring and SMT Hypotheses',
  'ict-rdrb-redelivered-rebalanced-price-range': 'ICT RDRB: Defining Redelivery and Rebalancing Zones',
  'ict-1st-presented-fvg-opening-range': 'ICT First-Presented FVG: A Session-Based Hypothesis',
  'ict-scalping-strategy': 'ICT Scalping: Entries, Execution Costs and Risk Limits',
  'ict-top-down-analysis-complete': 'ICT Top-Down Analysis: A Multi-Timeframe Planning Workflow',
  'ict-stl-itl-ltl-market-structure': 'ICT STL, ITL and LTL: Rules for Swing Classification',
  'ict-asian-range-trading-strategy': 'ICT Asian Range: Session Boundaries and Scenarios to Test',
  'ict-daily-bias-trick': 'ICT Daily Bias: A Pre-Session Thesis and Invalidation Rules',
  'ict-mss-vs-choch-explained': 'ICT MSS vs ChoCH: Structural Labels and Confirmation Rules',
  'ict-liquidity-sweep-vs-run': 'ICT Liquidity Sweep vs Run: Defining Observable Differences',
  'ict-weekly-profiles-range-expansion': 'ICT Weekly Profiles: Weekday Hypotheses to Record and Test',
  'ict-one-shot-one-kill-model': 'ICT One Shot One Kill: Session Limits and Rule Testing',
  'ict-balanced-price-range-bpr': 'ICT Balanced Price Range (BPR): Defining Overlapping FVGs',
  'ict-internal-external-range-liquidity': 'ICT IRL vs ERL: Internal and External Reference Levels',
  'ict-displacement-move-explained': 'ICT Displacement: Measurable Candle-Movement Criteria',
  'ict-bos-vs-choch-complete': 'ICT BOS vs ChoCH: Structural Labels and Confirmation Rules',
  'ict-propulsion-block-guide': 'ICT Propulsion Block: Definition and Retest Testing',
  'ict-liquidity-void-explained': 'ICT Liquidity Voids: Low-Overlap Price Areas and Risk',
  'ict-fibonacci-levels-settings': 'ICT Fibonacci Levels: Ratios, Anchors and Testing Rules',
  'ict-swing-high-swing-low-explained': 'ICT Swing Highs and Lows: Confirmation Rules for Structure',
  'ict-bearish-order-block-complete': 'ICT Bearish Order Block: Identification and Risk Rules',
  'ict-complete-2022-trading-strategy': 'ICT 2022 Model: Setup Rules, Context and Limitations',
  'ict-liquidity-forex-trading': 'Liquidity in Forex and ICT: Order Flow Terms and Limits',
  'ict-ipda-interbank-price-delivery': 'ICT IPDA Explained: Lookback Ranges as Testable References',
  'ict-single-candle-order-block-scob': 'ICT Single-Candle Order Block (SCOB): Rules and Test Design',
  'ict-sibi-bisi-explained': 'ICT SIBI and BISI: Naming Bullish and Bearish Imbalances',
  'ict-market-maker-buy-model-mmbm': 'ICT Market Maker Buy Model (MMBM): A Framework to Evaluate',
  'ict-tgif-setup-explained': 'ICT TGIF: Friday Price-Action Scenarios and Testing',
  'ict-judas-swing-complete': 'ICT Judas Swing: Session Reversals and Liquidity Sweeps',
  'ict-vs-smc-difference': 'ICT vs SMC: Comparing Terminology, Frameworks and Evidence',
  'common-ict-mistakes': 'Common ICT Trading Mistakes: Process, Risk and Evidence',
  'backtest-ict-strategies': 'How to Backtest ICT Strategies: Rules, Samples and Review',
  'liquidity-in-ict-trading': 'Liquidity in ICT Trading: Levels & Market Drivers',
  'ict-premium-discount-zones': 'ICT Premium & Discount: Midpoint Context',
  'ict-optimal-trade-entry-ote': 'ICT OTE: Retracement Zone Rules & Testing',
  'ict-candle-range-theory-crt': 'Candle Range Theory (CRT): Rules & Testing',
  'ict-institutional-order-flow-entry-drill': 'ICT Order Flow Entry Drill: Rules & Tests',
  'ict-nwog-ndog-opening-gaps': 'ICT NWOG & NDOG: Opening Gap Rules',
  'ict-mitigation-block-guide': 'ICT Mitigation Blocks: Rules & Retests',
  'ict-central-bank-dealers-range': 'ICT CBDR: Range Measurement & Scenarios',
  'ict-power-of-three-amd-complete': 'ICT Power of Three (AMD): Phases & Testing',
  'ict-hidden-order-block': 'ICT Hidden Order Blocks: Definitions & Tests',
  'ict-seek-and-destroy-friday': 'ICT Seek & Destroy Friday: A Testable Idea',
  'ict-qml-quasimodo-pattern': 'ICT Quasimodo (QML): Structure & Confirmation',
  'ict-inducement-after-bos': 'ICT Inducement After BOS: Rules & Evidence',
  'ict-hrlr-lrlr-liquidity-run': 'ICT HRLR & LRLR: Movement Toward Levels',
  'ict-market-order-flow-explained': 'Market Order Flow vs ICT Chart Interpretation',
  'ict-premium-discount-zone-identification': 'ICT Premium & Discount: Midpoint Rules',
  'ict-reclaimed-order-block': 'ICT Reclaimed Order Blocks: Zone & Retest Rules',
  'ict-bullish-order-block-complete': 'ICT Bullish Order Block: Identification & Risk',
  'ict-market-maker-sell-model-mmsm': 'ICT Market Maker Sell Model (MMSM): Rules & Tests',
  'ict-valid-pullback-guide': 'ICT Pullback Rules: Structure & Invalidation',
  'ict-rejection-block-explained': 'ICT Rejection Blocks: Wick Zones & Testing',
  'ict-market-structure-shift-complete': 'ICT Market Structure Shift (MSS): Rules & Limits',
  'ict-supply-demand-forex': 'Supply & Demand vs ICT: Comparing Chart Zones',
  'how-to-trade-nas100-ict': 'How to Study NAS100 With ICT Concepts',
  'ict-2026-mentorship-concepts': 'ICT Mentorship Concepts: Source Checks & Testing',
  'how-to-trade-fair-value-gaps': 'Fair Value Gap (FVG): Meaning, Rules & Examples',
  'ict-valid-fair-value-gap': 'Valid FVG Rules: Define and Test ICT Gaps',
  'ict-consequent-encroachment-explained': 'Consequent Encroachment (CE): FVG Midpoint Rules',
  'ict-implied-fair-value-gap-ifvg': 'What Is an IFVG? Inverted Fair Value Gap Rules',
  'ict-inducement-forex-explained': 'What Is Inducement in Forex? ICT Definition',
  'ict-breaker-block-explained': 'ICT Breaker Block vs Order Block: Rules & Examples',
  'trading-psychology-complete-guide': 'Best Trading Psychology Tips: Fear, FOMO & Risk',
  'what-is-ict-trading': 'What Is ICT Trading? Concepts, Meaning & Risk',
  'ict-killzones-guide': 'ICT Killzone Times: Asian, London & New York',
  'ict-market-structure-complete-guide': 'ICT Market Structure: BOS, CHoCH & Swing Points',
  'power-of-three-amd-model': 'ICT Power of Three (AMD): Accumulation, Manipulation & Distribution',
};

const errors = [];
const bySlug = new Map(POSTS.map((post) => [post.slug, post]));
const titles = new Set();
const descriptions = new Set();

for (const post of POSTS) {
  const slug = String(post?.slug || '').trim();
  const title = String(post?.title || '').trim();
  const description = String(post?.description || '').trim();
  const effectiveTitle = String(post?.metaTitle || (title ? title + ' | ICT Flow' : '')).trim();
  const effectiveDescription = String(post?.metaDesc || description).trim();

  if (!slug || !title || !description || !post?.date) {
    errors.push((slug || '(unknown article)') + ': every static blog article needs a slug, visible title, description and publication date.');
    continue;
  }
  if (Boolean(post.metaTitle) !== Boolean(post.metaDesc)) {
    errors.push(slug + ': custom metaTitle and metaDesc must be supplied together.');
  }
  if (post.metaTitle && (post.metaTitle.length < 30 || post.metaTitle.length > 70)) {
    errors.push(slug + ': custom metaTitle must be 30–70 characters.');
  }
  if (post.metaDesc && (post.metaDesc.length < 120 || post.metaDesc.length > 170)) {
    errors.push(slug + ': custom metaDesc must be 120–170 characters.');
  }
  const normalizedTitle = effectiveTitle.toLowerCase();
  if (titles.has(normalizedTitle)) errors.push(slug + ': rendered article title duplicates another article.');
  titles.add(normalizedTitle);
  const normalizedDescription = effectiveDescription.toLowerCase();
  if (descriptions.has(normalizedDescription)) errors.push(slug + ': rendered article description duplicates another article.');
  descriptions.add(normalizedDescription);
}

for (const [slug, expectedTitle] of Object.entries(EXPECTED)) {
  const post = bySlug.get(slug);
  if (!post) {
    errors.push('Missing target article: ' + slug);
    continue;
  }
  if (post.metaTitle !== expectedTitle) {
    errors.push(slug + ': metaTitle must target its observed query intent.');
  }
  if (typeof post.metaTitle !== 'string' || post.metaTitle.length < 30 || post.metaTitle.length > 70) {
    errors.push(slug + ': metaTitle must be 30–70 characters.');
  }
  if (typeof post.metaDesc !== 'string' || post.metaDesc.length < 120 || post.metaDesc.length > 170) {
    errors.push(slug + ': metaDesc must be 120–170 characters.');
  }
  if (!post.title || !post.description) errors.push(slug + ': visible title and description must remain present.');
}

if (errors.length) {
  for (const error of errors) console.error('Blog search snippet guard failed: ' + error);
  process.exit(1);
}

  console.log('Blog search snippet guard passed: ' + Object.keys(EXPECTED).length + ' query-aligned article titles and descriptions, within length limits.');
}

main().catch((error) => {
  console.error('Blog search snippet guard could not complete:', error);
  process.exit(1);
});
