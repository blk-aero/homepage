import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("global site config", () => {
  it("does not keep old template or legacy Hugo data", () => {
    const config = readFileSync("src/content/site/global.yaml", "utf8");

    for (const staleValue of [
      "legacy_hugo",
      "hugo-fresh",
      "quicklinks",
      "Follow Us",
      "StefMa",
      "Dribbble",
      "Bitbucket",
      "Great power comes",
      "Lorem ipsum",
      "00.000.000/0001-00"
    ]) {
      expect(config).not.toContain(staleValue);
    }
  });
});
