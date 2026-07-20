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
  }
  .fixed-audio-player {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    background: rgba(15,17,23,.95);
    backdrop-filter: blur(12px);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 8px 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,.4);
  }
  .fixed-audio-player audio {
    height: 32px;
    border-radius: 8px;
    accent-color: var(--accent);
    max-width: 220px;
  }`;

// Leftover CSS-only injection from an earlier buggy run of this script: it added the
// `.nav-audio` rule via a `</style>` replace (which always matches) even on pages where
// the follow-up `<div class="nav-arrows">` replace found no match, so no <audio> element
// was ever actually inserted. Strip it so re-running this script doesn't leave duplicates.
const staleCss = `
  /* AUDIO PLAYER */
  .nav-audio { display: flex; align-items: center; }
  .nav-audio audio {
    height: 32px;
    border-radius: 8px;
    accent-color: var(--accent);
    max-width: 220px;
  }`;

const htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));
let updatedInline = 0;
let updatedFloating = 0;
let alreadyPatched = 0;
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

  // Skip only if a real <audio> element is already present.
  if (content.includes('<audio')) {
    alreadyPatched++;
    continue;
  }

  content = content.split(staleCss).join('');
  content = content.replace('</style>', `${audioCss}\n</style>`);

  if (content.includes('<div class="nav-arrows">')) {
    // Template with a dedicated nav-arrows slot: weave the player into the nav bar.
    const audioElement = `  <div class="nav-audio">\n    <audio controls src="../audio/${audioFile}"></audio>\n  </div>\n  `;
    content = content.replace('<div class="nav-arrows">', `${audioElement}<div class="nav-arrows">`);
    updatedInline++;
  } else {
    // Every other template uses its own nav markup, so fall back to a
    // fixed-position player that works regardless of the page's layout.
    const audioElement = `<div class="fixed-audio-player">\n  <audio controls src="../audio/${audioFile}"></audio>\n</div>\n`;
    content = content.replace('<body>', `<body>\n${audioElement}`);
    updatedFloating++;
  }

  fs.writeFileSync(htmlPath, content, 'utf8');
}

console.log(
  `Done: ${updatedInline} inline nav players, ${updatedFloating} floating fallback players, ` +
  `${alreadyPatched} already patched, ${skipped} skipped (no matching audio).`
);
