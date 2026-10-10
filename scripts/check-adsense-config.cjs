const fs = require('node:fs');

const loaderPath = 'app/components/ThirdPartyScripts.js';
const adSlotPath = 'app/components/AdSlot.js';
const layoutPath = 'app/layout.js';
const adsTxtPath = 'public/ads.txt';

const loader = fs.readFileSync(loaderPath, 'utf8');
const loaderClient = loader.match(/const ADSENSE_CLIENT = process\\.env\\.NEXT_PUBLIC_ADSENSE_CLIENT \\|\\| ['"`]{0,1}([^'"`]*)['"`]/)?.[1];
const adSlot = fs.readFileSync(adSlotPath, 'utf8');
const layout = fs.readFileSync(layoutPath, 'utf8');
const adsTxt = fs.readFileSync(adsTxtPath, 'utf8');
const errors = [];

if (/NEXT_PUBLIC_ADSENSE_CLIENT\s*\|\|\s*['"`]ca-pub-/.test(loader)) {
  errors.push('Do not silently fall back to a hard-coded AdSense publisher ID.');
}
if (!loader.includes("const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';")) {
  errors.push('Resolve the optional publisher ID explicitly from NEXT_PUBLIC_ADSENSE_CLIENT.');
}
if (!loader.includes('{ADSENSE_CLIENT ? (')) {
  errors.push('Only load the AdSense script when the resolved publisher ID is configured.');
}
if (!loader.includes('client=${ADSENSE_CLIENT}')) {
  errors.push('The AdSense script URL must use the same resolved publisher ID used by the loader guard.');
}
if (!adSlot.includes('const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;') ||
    !adSlot.includes('if (!client || !adSlot)')) {
  errors.push('Ad slots must remain disabled unless both publisher and slot IDs are explicitly configured.');
}
const publisherMeta = layout.match(/name="google-adsense-account" content="([^"]+)"/)?.[1];
const adsTxtPublisher = adsTxt.match(/^google\.com,\s*pub-(\d+),\s*DIRECT,/m)?.[1];
if (!publisherMeta || !/^ca-pub-\d+$/.test(publisherMeta)) {
  errors.push('The AdSense account meta tag must contain a valid configured-style publisher ID.');
}
if (!adsTxtPublisher) {
  errors.push('ads.txt must contain the first-party Google seller line.');
} else if (publisherMeta !== `ca-pub-${adsTxtPublisher}`) {
  errors.push('The AdSense meta publisher ID and ads.txt publisher ID must match.');
}

if (errors.length) {
  for (const error of errors) console.error('AdSense configuration guard failed: ' + error);
  process.exit(1);
}
console.log('AdSense configuration guard passed: no hidden publisher fallback, ad-slot gating, and publisher/ads.txt consistency.');
