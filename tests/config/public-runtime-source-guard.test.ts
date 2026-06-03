import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  allowlistPath,
  findSourceRuntimeFiles,
  loadAllowlist,
  originFor,
  runtimeUrlsInMarkup,
  runtimeUrlsInSource,
  unresolvedRuntimeReferencesInSource
} from "./public-runtime-guard";

describe("source public runtime third-party guard", () => {
  it("keeps approved third-party runtime exceptions named with a business purpose", () => {
    expect(existsSync(allowlistPath)).toBe(true);

    const allowlist = loadAllowlist();

    expect(allowlist).toContainEqual({
      origin: "https://www.googletagmanager.com",
      purpose: "Google Tag Manager loads analytics and conversion tags when PUBLIC_GTM_ID is configured."
    });

    for (const exception of allowlist) {
      expect(exception.origin).toMatch(/^https:\/\/[a-z0-9.-]+$/);
      expect(exception.purpose.length).toBeGreaterThan(40);
    }
  });

  it("blocks source-level third-party runtime URLs without an allowlist entry", () => {
    const approvedOrigins = new Set(loadAllowlist().map((entry) => entry.origin));
    const sourceFindings = findSourceRuntimeFiles().map((file) => {
      const source = readFileSync(file, "utf8");
      return {
        file,
        unresolvedReferences: unresolvedRuntimeReferencesInSource(source),
        urls: runtimeUrlsInSource(source)
      };
    });

    for (const { file, unresolvedReferences } of sourceFindings) {
      expect(unresolvedReferences, `${file} has unresolved runtime source expressions`).toEqual([]);
    }

    for (const { file, urls } of sourceFindings) {
      for (const url of urls) {
        expect(approvedOrigins.has(originFor(url)), `${file} uses unapproved runtime URL ${url}`).toBe(true);
      }
    }
  });

  it("discovers Astro source files for env-gated runtime checks", () => {
    const sourceFiles = findSourceRuntimeFiles();

    expect(sourceFiles.length).toBeGreaterThan(0);
    expect(sourceFiles).toEqual(expect.arrayContaining([
      "src/components/GtmHead.astro",
      "src/layouts/BaseLayout.astro",
      "src/pages/index.astro",
      "src/pages/solucoes/index.astro"
    ]));
    expect(sourceFiles.every((file) => file.endsWith(".astro"))).toBe(true);
  });

  it("detects runtime URLs in quoted HTML attributes across runtime-bearing elements", () => {
    const markup = `
      <script src="https://cdn.example.com/widget.js"></script>
      <iframe src='https://maps.example.com/embed'></iframe>
      <embed src="https://video.example.com/player"></embed>
      <object data='https://media.example.com/app'></object>
    `;

    expect(runtimeUrlsInMarkup(markup)).toEqual([
      "https://cdn.example.com/widget.js",
      "https://maps.example.com/embed",
      "https://video.example.com/player",
      "https://media.example.com/app"
    ]);
  });

  it("detects common third-party runtime URL forms without flagging same-origin relative URLs", () => {
    const markup = `
      <script src="http://cdn.example.com/widget.js"></script>
      <iframe src="//maps.example.com/embed"></iframe>
      <script src="/_astro/local.js"></script>
    `;

    expect(runtimeUrlsInMarkup(markup)).toEqual([
      "http://cdn.example.com/widget.js",
      "https://maps.example.com/embed"
    ]);
  });

  it("detects dynamic source-level runtime URLs before env-gated build output exists", () => {
    const source = `
---
const widgetSrc = "https://cdn.example.com/widget.js";
const loaderSrc = "https://loader.example.com/boot.js";
---
<script src={widgetSrc}></script>
<script>
  const script = document.createElement("script");
  script.src = loaderSrc;
  document.head.appendChild(script);
</script>
`;

    expect(runtimeUrlsInSource(source)).toEqual([
      "https://cdn.example.com/widget.js",
      "https://loader.example.com/boot.js"
    ]);
  });

  it("flags unresolved source-level runtime expressions before env-gated build output exists", () => {
    const source = `
---
import { widgetSrc } from "../lib/widget";
---
<script src={widgetSrc}></script>
<script>
  const script = document.createElement("script");
  script.src = widgetSrc;
</script>
`;

    expect(unresolvedRuntimeReferencesInSource(source)).toEqual([
      "runtime attribute src={widgetSrc}",
      "runtime assignment script.src = widgetSrc"
    ]);
  });
});
