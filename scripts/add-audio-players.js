const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, '../public/interactive_concepts');
const audioDir = path.join(__dirname, '../public/audio');

const audioCss = `
  /* AUDIO PLAYER */
  .nav-audio { display: flex; align-items: center; }
  .nav-audio audio {
    height: 32px;
    border-radius: 8px;
    accent-color: var(--accent);
    max-width: 220px;
  }`;

const htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));
let updated = 0;
let skipped = 0;

for (const htmlFile of htmlFiles) {
  const basename = htmlFile.replace('.html', '');
  const audioFile = `${basename}.mp3`;
  const audioPath = path.join(audioDir, audioFile);

  if (!fs.existsSync(audioPath)) {
    skipped++;
    continue;
  }

  const htmlPath = path.join(htmlDir, htmlFile);
  let content = fs.readFileSync(htmlPath, 'utf8');

  // Skip if already patched
  if (content.includes('nav-audio')) {
    console.log(`Already patched: ${htmlFile}`);
    continue;
  }

  // Inject CSS into existing <style> block
  content = content.replace('</style>', `${audioCss}\n</style>`);

  // Inject audio element before .nav-arrows div
  const audioElement = `  <div class="nav-audio">\n    <audio controls src="../audio/${audioFile}"></audio>\n  </div>\n  `;
  content = content.replace('<div class="nav-arrows">', `${audioElement}<div class="nav-arrows">`);

  fs.writeFileSync(htmlPath, content, 'utf8');
  console.log(`Updated: ${htmlFile}`);
  updated++;
}

console.log(`\nDone: ${updated} pages updated, ${skipped} skipped (no matching audio).`);
