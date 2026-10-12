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

if (errors.length) {
  for (const error of errors) console.error('Retired site claim guard failed: ' + error);
  process.exit(1);
}

console.log('Retired site claim guard passed: ' + RETIRED_CLAIMS.length +
  ' claim patterns self-tested across app/, lib/, and public/.');
