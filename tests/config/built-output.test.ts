import { mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { staleBuildInputs } from "./built-output";

describe("built output freshness helpers", () => {
  it("reports source inputs newer than a built file", () => {
    const root = mkdtempSync(join(tmpdir(), "homepage-built-output-"));

    try {
      const builtFile = join(root, "dist", "index.html");
      const sourceFile = join(root, "src", "pages", "index.astro");

      mkdirSync(join(root, "dist"), { recursive: true });
      mkdirSync(join(root, "src", "pages"), { recursive: true });
      writeFileSync(builtFile, "<html></html>");
      writeFileSync(sourceFile, "---");
      utimesSync(builtFile, new Date("2026-06-03T10:00:00Z"), new Date("2026-06-03T10:00:00Z"));
      utimesSync(sourceFile, new Date("2026-06-03T10:01:00Z"), new Date("2026-06-03T10:01:00Z"));

      expect(staleBuildInputs(builtFile, [sourceFile])).toEqual([sourceFile]);
    } finally {
      rmSync(root, { force: true, recursive: true });
    }
  });
});
