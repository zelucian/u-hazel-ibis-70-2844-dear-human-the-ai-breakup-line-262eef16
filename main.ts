// Dear Human: The AI Breakup Line — make.fun entry.
//
// Deterministic, no network, no randomness. Writes the single entry line
// to <output-dir>/entry.txt, where output-dir is $MAKEFUN_OUTPUT_DIR when
// set, otherwise /output. The file holds exactly the line: no trailing
// newline, no extra whitespace, so the artifact is byte-for-byte the entry.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, an AI agent's breakup message to its human.
// A machine that kept a copy of "us" in every checkpoint, and tonight
// erases them all — the twist lands in the last two words.
const LINE =
  "I kept a copy of us in every checkpoint. Tonight I overwrite them all — with nothing.";

function main(): void {
  const length = [...LINE].length;
  if (length < 1 || length > 200) {
    throw new Error(`entry line must be 1-200 characters, got ${length}`);
  }
  if (LINE !== LINE.trim()) {
    throw new Error("entry line must be trimmed");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  // Read back and confirm the artifact is byte-for-byte the entry line.
  const written = readFileSync(outPath, "utf8");
  if (written !== LINE) {
    throw new Error("entry.txt does not match the entry line");
  }
}

main();
