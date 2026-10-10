const fs = require('node:fs');

const readme = fs.readFileSync('README.md', 'utf8');
const checklist = fs.readFileSync('PUBLISH_CHECKLIST.md', 'utf8');
const errors = [];

const requiredReadme = [
  'Rotate/revoke the exposed credential before using the revised project in production.',
  'Source-code removal does not invalidate an already exposed key.',
];
for (const phrase of requiredReadme) {
  if (!readme.includes(phrase)) errors.push('README.md is missing the credential-rotation warning: ' + phrase);
}

const requiredChecklist = [
  'Confirm the previously exposed Finnhub key has been revoked',
  'Add any replacement as `FINNHUB_API_KEY` only in the production deployment environment',
  'fails closed without fabricated prices',
];
for (const phrase of requiredChecklist) {
  if (!checklist.includes(phrase)) errors.push('PUBLISH_CHECKLIST.md is missing the credential-rotation/release check: ' + phrase);
}


const deploymentGate = [
  'The most recent verified GitHub Vercel commit status for the current `main` SHA must be `success`',
  'Deployment verification and failure recovery gate',
  'If the latest `main` deployment fails, inspect that specific deployment',
  'Recheck the exact `main` SHA\'s Vercel status after every production release',
];

for (const phrase of deploymentGate) {
  if (!checklist.includes(phrase)) errors.push('PUBLISH_CHECKLIST.md is missing the deployment-status release gate: ' + phrase);
}

if (errors.length) {
  for (const error of errors) console.error('Release security documentation guard failed: ' + error);
  process.exit(1);
}
console.log('Release security documentation guard passed: exposed-credential rotation and deployment-secret steps are documented.');
