const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const curriculumPath = path.join(process.cwd(), 'lib/curriculum.js');
const templatePath = path.join(process.cwd(), 'scripts/og-image-template.svg');
const outputPath = path.join(process.cwd(), 'public/og-image.png');

async function main() {
  const curriculum = fs.readFileSync(curriculumPath, 'utf8');
  const template = fs.readFileSync(templatePath, 'utf8');
  const moduleCount = [...curriculum.matchAll(/^\s*id:\s*\d+,\s*module:\s*["'][^"']+["']/gm)].length;
  const lessonCounts = [...curriculum.matchAll(/^\s*lessons:\s*(\d+)/gm)].map((match) => Number(match[1]));
  const lessonCount = lessonCounts.reduce((total, count) => total + count, 0);

  if (!moduleCount || !lessonCounts.length || !lessonCount) {
    throw new Error('Could not derive curriculum counts for the Open Graph image.');
  }
  if (template.split('{{MODULE_COUNT}}').length !== 2 || template.split('{{LESSON_COUNT}}').length !== 2) {
    throw new Error('Open Graph template must contain each curriculum count placeholder exactly once.');
  }

  const svg = template
    .replace('{{MODULE_COUNT}}', String(moduleCount))
    .replace('{{LESSON_COUNT}}', String(lessonCount) + '+');
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const metadata = await sharp(png).metadata();

  if (metadata.format !== 'png' || metadata.width !== 1200 || metadata.height !== 630) {
    throw new Error('Open Graph image render must be a valid 1200x630 PNG.');
  }

  fs.writeFileSync(outputPath, png);
  const saved = fs.readFileSync(outputPath);
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (saved.length < 24 || !saved.subarray(0, 8).equals(signature) ||
      saved.readUInt32BE(16) !== 1200 || saved.readUInt32BE(20) !== 630) {
    throw new Error('Generated Open Graph image failed PNG signature/dimension verification.');
  }

  console.log('Generated valid Open Graph PNG: ' + metadata.width + 'x' + metadata.height +
    ', ' + moduleCount + ' modules, ' + lessonCount + '+ lessons.');
}

main().catch((error) => {
  console.error('Open Graph image generation failed:', error);
  process.exit(1);
});
