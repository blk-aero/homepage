import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { findBuiltHtmlFiles, staleBuildInputs } from "./built-output";
import {
  builtRuntimeInputs,
  loadAllowlist,
  originFor,
  runtimeUrlsInMarkup
} from "./public-runtime-guard";

describe("built public runtime third-party guard", () => {
  it("scans every built public HTML page", () => {
    const builtHtmlFiles = findBuiltHtmlFiles("dist");

    expect(builtHtmlFiles.length).toBeGreaterThan(0);
    expect(builtHtmlFiles).toEqual(expect.arrayContaining([
      "dist/index.html",
      "dist/blog/index.html",
      "dist/cidades/index.html",
      "dist/solucoes/index.html",
      "dist/solucoes/projeto-e-obra/index.html"
    ]));
  });

  it("blocks built public pages from emitting unapproved third-party script sources", () => {
    const approvedOrigins = new Set(loadAllowlist().map((entry) => entry.origin));
    const builtHtmlFiles = findBuiltHtmlFiles("dist");

    for (const file of builtHtmlFiles) {
      expect(staleBuildInputs(file, builtRuntimeInputs), `${file} is older than render-sensitive inputs`).toEqual([]);
    }

    const externalScriptUrls = builtHtmlFiles.flatMap((file) => {
      const html = readFileSync(file, "utf8");
      return runtimeUrlsInMarkup(html).map((url) => ({
        file,
        url
      }));
    });

    for (const { file, url } of externalScriptUrls) {
      expect(approvedOrigins.has(originFor(url)), `${file} emits unapproved runtime URL ${url}`).toBe(true);
    }
  });
});
