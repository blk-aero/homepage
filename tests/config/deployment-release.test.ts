import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("deployment release checks", () => {
  it("documents production cache-header checks against live HTML and hashed Astro assets", () => {
    const guide = readFileSync("docs/agents/deployment-release.md", "utf8");

    expect(guide).toContain("Cache headers must be checked against production, not local build output.");
    expect(guide).toContain("curl -sSI https://blk.aero/");
    expect(guide).toContain("curl -sSI https://blk.aero/_astro/<hashed-asset>");
    expect(guide).toContain("HTML remains short-lived");
    expect(guide).toContain("content-hashed Astro assets are candidates for long immutable caching");
  });

  it("documents the immutable asset caching decision for the current hosting path", () => {
    const guide = readFileSync("docs/agents/deployment-release.md", "utf8");

    expect(guide).toContain("Immutable Asset Caching Decision");
    expect(guide).toContain("GitHub Pages workflow does not provide a repo-managed custom-header surface");
    expect(guide).toContain("Cloudflare cache rule or response-header rule");
    expect(guide).toContain("public, max-age=31536000, immutable");
    expect(guide).toContain("Do not add `_headers` for the current GitHub Pages deployment");
  });
});
