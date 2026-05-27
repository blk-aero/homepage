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
      "00.000.000/0001-00",
      "/sobre",
      "/politica-de-privacidade",
      "Política de privacidade",
      "Legal"
    ]) {
      expect(config).not.toContain(staleValue);
    }
  });

  it("keeps only real BLK social profiles in footer config", () => {
    const config = readFileSync("src/content/site/global.yaml", "utf8");

    expect(config).toContain("https://www.linkedin.com/company/blk-aero");
    expect(config).toContain("https://www.youtube.com/@blk-aero");
    expect(config).toContain("https://www.facebook.com/people/BLK-Aerolevantamento/61564931315622/");
    expect(config).toContain("https://www.instagram.com/blk.aero/");
  });
});
