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
