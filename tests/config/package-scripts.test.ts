import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

describe("project scripts", () => {
  it("defines required scripts", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8"));
    expect(pkg.scripts).toMatchObject({
      dev: "astro dev",
      build: "astro build",
      preview: "astro preview",
      test: "vitest run",
      "test:e2e": "playwright test"
    });
  });

  it("runs Playwright against the built preview server", () => {
    const config = readFileSync("playwright.config.ts", "utf8");
    expect(config).toContain("npm run build && npm run preview -- --host 127.0.0.1 --port 4321");
    expect(config).toContain("reuseExistingServer: process.env.PLAYWRIGHT_REUSE_SERVER === \"1\"");
  });

  it("keeps hero image IDs type-checked instead of casting lookups", () => {
    const hero = readFileSync("src/components/HomeHeroShowcase.astro", "utf8");
    expect(hero).toContain("type HeroImageId = keyof typeof heroImages;");
    expect(hero).not.toContain("as keyof typeof heroImages");
  });
});
