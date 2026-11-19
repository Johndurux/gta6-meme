// gta6-meme-x-01 — the entry is a post on X, not a program: this file's one job is to hand the
// post's address to the gate. It copies POST.json from the repository root to the output
// directory, byte for byte, so the address the gate reads is the one this entry was built
// around ("url": "https://x.com/<handle>/status/<id>").
//
// The meme beside it is meme/meme.png, drawn by meme/meme.html in this repository and captured
// with headless Chrome; the two variants kept for reference are meme/meme-heist.png and
// meme/meme-mission.png with their own HTML sources.
//
// Run it outside the grader with the repository as the bot directory:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/** Where the repository is mounted in the grader; a local run points this at the repository. */
const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
/** Where the gate reads the entry from. */
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

/** Make the output directory if it is not there yet. */
function ensureOutput(directory: string): void {
  mkdirSync(directory, { recursive: true });
}

/** Copy the post's address across unchanged; anything but a copy fails the entry loudly. */
function handInPost(bot: string, out: string): number {
  const from = join(bot, 'POST.json');
  const to = join(out, 'POST.json');
  copyFileSync(from, to);
  return statSync(to).size;
}

ensureOutput(OUTPUT_DIR);
try {
  const bytes = handInPost(BOT_DIR, OUTPUT_DIR);
  console.log(`POST.json handed in: ${bytes} bytes from ${BOT_DIR}`);
} catch (err) {
  console.error(`POST.json could not be handed in from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
