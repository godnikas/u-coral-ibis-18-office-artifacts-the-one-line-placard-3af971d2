// Office Artifacts: The One-Line Placard Contest
// Writes a single museum placard line for an ordinary office object,
// treated as an ancient artifact, to /output/entry.txt (or
// $MAKEFUN_OUTPUT_DIR/entry.txt when set). Deterministic: the same
// bytes on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The placard: a stapler recast as a Bronze Age ritual instrument.
// Catalogue date, material, ritual use and donor, in a dry curator's
// voice. Exactly 178 characters, one line, no trailing newline.
const PLACARD =
  "Stapler, c. 2140 BCE. Cast bronze. Ritual instrument of the Binding Clerks, who stapled two sheets together so they might never part. Gift of the Department of Eternal Paperwork.";

function main(): void {
  const line = PLACARD.trim();

  // Gate: the entry must be 1-180 characters and not only whitespace.
  if (line.length === 0) {
    console.error("error: placard is empty or only whitespace");
    process.exit(1);
  }
  if (line.length > 180) {
    console.error(
      `error: placard is ${line.length} characters, over the 180 limit`,
    );
    process.exit(1);
  }
  if (line.includes("\n") || line.includes("\r")) {
    console.error("error: placard must be a single line");
    process.exit(1);
  }

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Create the directory if missing; never remove it or its siblings.
  mkdirSync(outputDir, { recursive: true });
  const outputFile = join(outputDir, "entry.txt");
  writeFileSync(outputFile, line, "utf8");
  console.log(`wrote ${line.length} characters to ${outputFile}`);
}

main();
