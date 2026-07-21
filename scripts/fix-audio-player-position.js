// Repositions the per-concept audio player that add-audio-players.js injected.
//
// That script left two inconsistent layouts: a `.fixed-audio-player` pinned to the
// bottom-right on 55 pages, and a `.nav-audio` control woven into the nav bar (wherever
// that template happened to have a slot) on 9 pages. Nav markup differs wildly between
// modules (brand/nav-links here, bare <a> siblings there), so there's no single "first
// child of <nav>" insertion point that works everywhere without risking overlap with
// each template's own nav content.
//
// This normalizes every page to the same thing: a plain in-flow bar directly below
// <nav>, pinned left. Being in-flow (not `position: fixed`) means it can never overlap
// nav content regardless of that template's layout.

const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, '../public/interactive_concepts');

// Two shapes exist in the wild: the full block (nav-audio + fixed-audio-player CSS,
// injected by the current script version on pages that had no <audio> yet) and a
// partial block (nav-audio CSS only, left by an earlier script version on pages that
// already had their <audio> inserted so the current version's "already patched" check
// skipped them before it could add the fixed-audio-player rules). Match either via a
// span from the marker comment to just before `</style>` rather than an exact string.
const oldCssBlockPattern = /\n {2}\/\* AUDIO PLAYER \*\/[\s\S]*?(?=\n<\/style>)/;

const newCssBlock = `
  /* AUDIO PLAYER */
  .page-audio-player {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 32px;
    background: rgba(15,17,23,.6);
    border-bottom: 1px solid var(--border);
  }
  .page-audio-player audio {
    height: 32px;
    border-radius: 8px;
    accent-color: var(--accent);
    max-width: 260px;
  }`;

const htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));
let fixed = 0;
let skipped = 0;

for (const htmlFile of htmlFiles) {
  const htmlPath = path.join(htmlDir, htmlFile);
  let content = fs.readFileSync(htmlPath, 'utf8');

  const audioMatch = content.match(/<audio controls src="([^"]+)"><\/audio>/);
  if (!audioMatch) {
    skipped++;
    continue;
  }
  const audioSrc = audioMatch[1];

  if (content.includes('.page-audio-player')) {
    // Already migrated. Checked before the oldCssBlockPattern test below because that
    // pattern (marker comment -> lazily up to `</style>`) matches the new block's shape
    // just as well as the old one's, so testing it first would re-migrate — and re-insert
    // the player markup a second time — on pages already done.
    skipped++;
    continue;
  }
  if (!oldCssBlockPattern.test(content)) {
    throw new Error(`${htmlFile}: unrecognized audio CSS block, aborting`);
  }

  content = content.replace(oldCssBlockPattern, newCssBlock);

  // Strip whichever wrapper the old script used (fixed floating div right after <body>,
  // or the inline nav-audio div wherever it landed inside <nav>).
  content = content.replace(
    /<div class="fixed-audio-player">\s*<audio controls src="[^"]+"><\/audio>\s*<\/div>\s*/,
    ''
  );
  content = content.replace(
    /\s*<div class="nav-audio">\s*<audio controls src="[^"]+"><\/audio>\s*<\/div>/,
    ''
  );

  const playerMarkup = `<div class="page-audio-player">\n  <audio controls src="${audioSrc}"></audio>\n</div>`;

  if (content.includes('</nav>')) {
    content = content.replace('</nav>', `</nav>\n${playerMarkup}`);
  } else if (/<div class="nav">[\s\S]*?<\/div>/.test(content)) {
    // A few module-4/5 templates use a plain <div class="nav"> instead of a real <nav>.
    content = content.replace(/<div class="nav">[\s\S]*?<\/div>/, (block) => `${block}\n${playerMarkup}`);
  } else {
    throw new Error(`${htmlFile}: no <nav> or <div class="nav"> found, can't place player`);
  }

  fs.writeFileSync(htmlPath, content, 'utf8');
  fixed++;
}

console.log(`Done: ${fixed} pages repositioned, ${skipped} skipped.`);
