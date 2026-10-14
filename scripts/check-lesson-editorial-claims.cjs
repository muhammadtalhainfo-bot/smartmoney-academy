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
