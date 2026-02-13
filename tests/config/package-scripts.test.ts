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
});
