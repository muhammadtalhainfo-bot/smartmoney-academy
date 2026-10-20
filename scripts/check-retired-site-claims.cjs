const fs = require('node:fs');
const path = require('node:path');

const TEXT_EXTENSIONS = new Set([
  '.cjs', '.css', '.html', '.js', '.jsx', '.json', '.md',
  '.mjs', '.svg', '.ts', '.tsx', '.txt', '.xml',
]);

const RETIRED_CLAIMS = [
  {
    name: 'legacy 28-module count',
    pattern: /\b28\+?\s+modules\b/i,
    examples: ['28 modules', '28+ modules'],
  },
  {
    name: 'legacy 80-lesson count',
    pattern: /\b80\+?\s+lessons\b/i,
    examples: ['80 lessons', '80+ lessons'],
  },
  {
    name: 'legacy 192-lesson count',
    pattern: /\b192\+?\s+lessons\b/i,
    examples: ['192 lessons', '192+ lessons'],
  },
  {
    name: 'Discord join promotion',
    pattern: /\bjoin\s+(?:the\s+)?discord\b/i,
    examples: ['join the discord', 'Join Discord'],
  },
  {
    name: 'Discord invite link',
    pattern: /\bdiscord\.gg\b/i,
    examples: ['discord.gg/example'],
  },
  {
    name: 'legacy ten-section claim',
    pattern: /\b10\s+sections\b/i,
    examples: ['10 sections', '10 Sections'],
  },
  {
    name: 'retired monthly price',
    pattern: /\$19\s*\/\s*month\b/i,
    examples: ['$19/month', '$19 / month'],
  },
  {
    name: 'retired yearly price',
    pattern: /\$149\s*\/\s*year\b/i,
    examples: ['$149/year', '$149 / year'],
  },
  {
    name: 'mentorship metadata claims timestamps for episodes with no timestamp data',
    pattern: /Every ICT 2022 YouTube mentorship episode summarised with key concepts, timestamps and takeaways\./i,
    examples: ['Every ICT 2022 YouTube mentorship episode summarised with key concepts, timestamps and takeaways.'],
  },
  {
    name: 'mentorship metadata claims to be the fastest way to absorb the full curriculum',
    pattern: /The fastest way to absorb the full ICT 2022 curriculum\./i,
    examples: ['The fastest way to absorb the full ICT 2022 curriculum.'],
  },
  {
    name: 'strategy metadata claims complete strategy playbooks',
    pattern: /complete ICT strategy playbooks with entry rules/i,
    examples: ['complete ICT strategy playbooks with entry rules'],
  },
];

const errors = [];

// Guard the guard: each pattern must match examples of the retired claim it protects.
for (const claim of RETIRED_CLAIMS) {
  for (const example of claim.examples) {
    if (!claim.pattern.test(example)) {
      errors.push('Self-test failed for ' + claim.name + ': ' + JSON.stringify(example));
    }
  }
}

function collectTextFiles(directory, collected = []) {
  if (!fs.existsSync(directory)) return collected;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectTextFiles(fullPath, collected);
    } else if (entry.isFile() && TEXT_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      collected.push(fullPath);
    }
  }
  return collected;
}

for (const root of ['app', 'lib', 'public']) {
  for (const file of collectTextFiles(root)) {
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const claim of RETIRED_CLAIMS) {
        if (claim.pattern.test(line)) {
          errors.push(path.relative(process.cwd(), file) + ':' + (index + 1) +
            ' contains retired claim (' + claim.name + '): ' + line.trim());
        }
      }
    });
  }
}


const homepagePath = path.join(process.cwd(), 'app/page.js');
const homepage = fs.readFileSync(homepagePath, 'utf8');
const homepageSessionForbidden = [
  {
    name: 'session card uses a fixed EST label for New York local time',
    pattern: /time:'(?:8PM–12AM|2AM–5AM|7AM–12PM|10AM–12PM) EST'/,
  },
  {
    name: 'session cards present the four narrative phases as fixed roles',
    pattern: /phase:'(?:ACCUMULATION|MANIPULATION|DISTRIBUTION|REVERSAL)'/,
  },
];
const homepageSessionRequired = [
  {
    name: 'New York time and seasonal EST/EDT change are disclosed',
    pattern: /Times use New York local time \(ET; EST\/EDT changes seasonally\)/,
  },
  {
    name: 'session-map copy says source and market conventions vary',
    pattern: /broad reference windows and phase interpretations vary by source and market; they are not a required four-phase script/,
  },
  {
    name: 'Asian phase is qualified as possible accumulation',
    pattern: /phase:'POSSIBLE ACCUMULATION'/,
  },
  {
    name: 'London phase is qualified as possible manipulation',
    pattern: /phase:'POSSIBLE MANIPULATION'/,
  },
  {
    name: 'New York card is identified as a session rather than a fixed phase',
    pattern: /phase:'NY AM SESSION'/,
  },
  {
    name: 'London close is identified as a window rather than a reversal phase',
    pattern: /phase:'LONDON CLOSE'/,
  },
];

for (const check of homepageSessionForbidden) {
  if (check.pattern.test(homepage)) {
    errors.push('Homepage session-map guard failed (' + check.name + ').');
  }
}
for (const check of homepageSessionRequired) {
  if (!check.pattern.test(homepage)) {
    errors.push('Required homepage session-map convention missing (' + check.name + ').');
  }
}


const metadataCopyChecks = [
  {
    path: 'app/mentorship/layout.js',
    name: 'mentorship metadata describes the 41 available episode summaries without promising timestamps',
    required: [
      /ICT 2022 Mentorship — 41 Episode Summaries \| ICT Flow/,
      /Browse 41 organized summaries of the ICT 2022 mentorship, with key concepts, lessons and listed episode durations/,
      /Study key concepts and lessons from 41 organized episode summaries, with listed durations for reference/,
    ],
    forbidden: [/timestamps and takeaways/i, /fastest way to absorb the full ICT 2022 curriculum/i],
  },
  {
    path: 'app/strategies/layout.js',
    name: 'strategy metadata presents example framework criteria without claiming completeness',
    required: [
      /Explore ICT-style strategy frameworks, example entry conditions, risk rules and testable criteria/,
      /Outcomes vary by rules, market and execution\./,
      /complete ICT strategy playbooks/i,
    ],
    forbidden: [/complete ICT strategy playbooks with entry rules/i],
  },
];

for (const check of metadataCopyChecks) {
  const source = fs.readFileSync(path.join(process.cwd(), check.path), 'utf8');
  for (const pattern of check.required) {
    if (!pattern.test(source)) {
      errors.push('Required metadata copy missing (' + check.name + '): ' + pattern);
    }
  }
  for (const pattern of check.forbidden) {
    if (pattern.test(source)) {
      errors.push('Metadata copy guard failed (' + check.name + '): ' + pattern);
    }
  }
}

const curriculumCardsPath = path.join(process.cwd(), 'lib/curriculum.js');
const curriculumCardsSource = fs.readFileSync(curriculumCardsPath, 'utf8');
const curriculumCardForbidden = [
  {
    name: 'Market Structure card implies structure breaks signal reversals',
    pattern: /The foundation of everything — how price creates trends, breaks structure, and signals reversals\./,
  },
  {
    name: 'Top-Down Analysis card promises completeness and one-minute precision',
    pattern: /The complete multi-timeframe methodology — from Monthly bias to 1-minute entry precision\./,
  },
  {
    name: 'Daily Bias card implies bias can be determined before price moves',
    pattern: /A key decision in many trading approaches — determining directional bias before price moves and building a narrative to guide entries\./,
  },
  {
    name: 'PD Array card claims all twelve arrays have a universal ranking',
    pattern: /Full PD Array Matrix — All 12 Arrays Ranked/,
  },
  {
    name: 'SCOB card expands the acronym as Silver Bullet Order Block',
    pattern: /SCOB — Silver Bullet Order Block/,
  },
  {
    name: 'Session curriculum maps London to manipulation and New York AM to primary distribution',
    pattern: /London Session — Manipulation & Displacement/,
  },
  {
    name: 'Session curriculum maps New York AM to a fixed distribution phase',
    pattern: /New York AM — Primary Distribution/,
  },
  {
    name: 'Session curriculum presents London close and New York PM reversals as fixed logic',
    pattern: /London Close & NY PM Reversal Logic/,
  },
  {
    name: 'Asian session is described as a required range-building phase',
    pattern: /Asian Session — Range Building/,
  },
  {
    name: 'Macro-time curriculum claims a universal set of eight precise windows',
    pattern: /Macro Time Windows \(8 precise windows\)/,
  },
  {
    name: 'Turtle Soup curriculum describes a stop hunt as engineered intent',
    pattern: /Engineering the Stop Hunt/,
  },
  {
    name: 'Turtle Soup curriculum describes equal highs and lows as bait',
    pattern: /Identifying the Setup: EQH\/EQL as Bait/,
  },
  {
    name: 'Turtle Soup curriculum claims a single post-sweep entry logic',
    pattern: /Entry Logic After the Sweep/,
  },
  {
    name: 'Turtle Soup curriculum promises trade-killing error diagnoses',
    pattern: /Common Errors That Kill the Trade/,
  },
  {
    name: 'Risk checklist is presented as protecting an account',
    pattern: /the daily checklist that protects your account/i,
  },
  {
    name: 'Kelly Criterion topic claims universally optimal risk',
    pattern: /The Kelly Criterion for Optimal Risk/,
  },
  {
    name: 'Risk-control topic ranks risk management above strategy as a universal claim',
    pattern: /Why Risk Management Beats Strategy/,
  },
  {
    name: 'Risk curriculum encourages breaking the one-percent rule without context',
    pattern: /The 1% Rule & When to Break It/,
  },
  {
    name: 'Psychology topic frames four emotions as universally deadly',
    pattern: /The Four Deadly Emotions/,
  },
  {
    name: 'QML curriculum uses the unsupported expansion Quasi Market Level',
    pattern: /QML — Quasi Market Level/,
  },
  {
    name: 'PD Array topic asserts a universal priority between block types',
    pattern: /Breaker vs Mitigation vs Order Block Priority/,
  },
  {
    name: 'PD Array topic promotes stacking as a universal confluence method',
    pattern: /How to Stack PD Arrays for Confluence/,
  },
];

const curriculumCardRequired = [
  {
    name: 'Market Structure card describes possible behavior shifts without guaranteeing a reversal',
    pattern: /Study how traders describe trends and structure breaks, including possible shifts in market behavior; these patterns do not guarantee a reversal\./,
  },
  {
    name: 'Top-Down card labels its workflow as a hypothesis to define and test',
    pattern: /A top-down multi-timeframe workflow from higher-timeframe context to lower-timeframe execution; timeframe choices are hypotheses to define and test, not a precision guarantee\./,
  },
  {
    name: 'Daily Bias card frames pre-session bias as a revisable hypothesis',
    pattern: /Develop a pre-session directional hypothesis from higher-timeframe context, then revisit it when predefined rules or new information require a change\./,
  },
  {
    name: 'PD Array topic avoids a universal list and ranking claim',
    pattern: /PD Array Matrix — Commonly Taught Types & Conventions/,
  },
  {
    name: 'SCOB acronym follows the lesson definition',
    pattern: /SCOB — Single Candle Order Block/,
  },
  {
    name: 'Asian session is framed as a reference range rather than a required phase',
    pattern: /Asian Session — Range as a Reference/,
  },
  {
    name: 'London session topic describes common patterns without asserting manipulation',
    pattern: /London Session — Commonly Studied Patterns/,
  },
  {
    name: 'New York morning is framed as session context rather than primary distribution',
    pattern: /New York AM — Session Context and Models/,
  },
  {
    name: 'London close and New York PM topic calls for evaluating outcomes',
    pattern: /London Close & NY PM — Outcomes to Evaluate/,
  },
  {
    name: 'Macro time curriculum acknowledges named windows and source variants',
    pattern: /Named Macro Time Windows and Source Variants/,
  },
  {
    name: 'Price delivery topic treats time-price relationships as hypotheses to test',
    pattern: /Testing Time-and-Price Hypotheses/,
  },
  {
    name: 'Time-based reversals are described as hypotheses to evaluate',
    pattern: /Evaluating Time-Based Reversal Hypotheses/,
  },
  {
    name: 'Turtle Soup curriculum defines a false-breakout condition rather than a stop hunt',
    pattern: /Defining a False-Breakout Condition/,
  },
  {
    name: 'Equal highs and lows are described as reference levels, not bait',
    pattern: /EQH\/EQL as Reference Levels/,
  },
  {
    name: 'Turtle Soup entries are identified as variants after a sweep',
    pattern: /Entry Variants After the Sweep/,
  },
  {
    name: 'Turtle Soup topic names definition and execution errors without promising outcomes',
    pattern: /Definition and Execution Errors/,
  },
  {
    name: 'Risk copy says checklist supports consistency but cannot eliminate risk',
    pattern: /A daily checklist can support consistency, but it cannot eliminate trading risk\./,
  },
  {
    name: 'Advanced risk curriculum describes Kelly assumptions and limitations',
    pattern: /Study portfolio heat, correlated exposure, scaling and position sizing, including the assumptions and limitations of the Kelly Criterion\./,
  },
  {
    name: 'Kelly topic covers assumptions and sizing trade-offs',
    pattern: /Kelly Criterion: Assumptions and Sizing Trade-offs/,
  },
  {
    name: 'Risk controls are positioned alongside strategy',
    pattern: /Why Risk Controls Matter Alongside Strategy/,
  },
  {
    name: 'One-percent topic includes its assumptions and exceptions',
    pattern: /The 1% Rule, Its Assumptions and Exceptions/,
  },
  {
    name: 'Psychology curriculum uses neutral wording for emotional triggers',
    pattern: /Common Emotional Triggers in Trading/,
  },
  {
    name: 'QML curriculum reflects the source-dependent Quasimodo terminology',
    pattern: /QML — Quasimodo Pattern\/Level \(Definitions Vary\)/,
  },
  {
    name: 'PD Array topic compares block variants without claiming a universal priority',
    pattern: /Comparing Breaker, Mitigation & Order Block Variants/,
  },
  {
    name: 'PD Array topic frames confluence as something to evaluate',
    pattern: /Evaluating PD Array Confluence/,
  },
];

for (const check of curriculumCardForbidden) {
  if (check.pattern.test(curriculumCardsSource)) {
    errors.push('Curriculum card guard failed (' + check.name + ').');
  }
}
for (const check of curriculumCardRequired) {
  if (!check.pattern.test(curriculumCardsSource)) {
    errors.push('Required curriculum card wording missing (' + check.name + ').');
  }
}

if (errors.length) {
  for (const error of errors) console.error('Retired site claim guard failed: ' + error);
  process.exit(1);
}

console.log('Retired site claim guard passed: ' + RETIRED_CLAIMS.length +
  ' claim patterns self-tested across app/, lib/, and public. Homepage session-map checks passed (' +
  homepageSessionForbidden.length + ' forbidden patterns, ' + homepageSessionRequired.length + ' required conventions).');
