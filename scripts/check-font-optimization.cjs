const fs = require('node:fs');

const layout = fs.readFileSync('app/layout.js', 'utf8');
const css = fs.readFileSync('app/globals.css', 'utf8');
const errors = [];

for (const family of ['Bebas_Neue', 'DM_Sans', 'DM_Mono']) {
  if (!layout.includes(family)) errors.push('Root layout must import ' + family + ' from next/font/google.');
}
for (const variable of ['bebasNeue.variable', 'dmSans.variable', 'dmMono.variable']) {
  if (!layout.includes(variable)) errors.push('Root layout must expose the ' + variable + ' font variable.');
}
if (/fonts\.googleapis\.com\/css2\?family=/.test(layout) || /fonts\.gstatic\.com/.test(layout)) {
  errors.push('Remove external Google Fonts stylesheet and preconnect tags after migration to next/font.');
}
if (!css.includes('font-family: var(--font-dm-sans), sans-serif;')) {
  errors.push('Global body font must use the generated DM Sans variable.');
}
for (const name of ['--font-bebas-neue', '--font-dm-sans', '--font-dm-mono']) {
  if (!layout.includes(name)) errors.push('Root layout configuration is missing ' + name + '.');
  if (!css.includes('[style*="' + name.replace('--font-', '').replaceAll('-', ' ') + '"]')) {
    const legacyName = name === '--font-bebas-neue' ? 'Bebas Neue' : name === '--font-dm-sans' ? 'DM Sans' : 'DM Mono';
    if (!css.includes('[style*="' + legacyName + '"]')) errors.push('Legacy inline styles must map to the generated ' + name + ' font.');
  }
}

if (errors.length) {
  for (const error of errors) console.error('Font optimization guard failed: ' + error);
  process.exit(1);
}
console.log('Font optimization guard passed: all three font families use next/font variables and no external Google Fonts stylesheet remains.');
