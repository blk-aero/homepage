import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { staleBuildInputs } from "./built-output";

const homepageHtml = () => readFileSync("dist/index.html", "utf8");
const homepageRenderInputs = [
  "src/pages/index.astro",
  "src/components",
  "src/layouts",
  "src/lib",
  "src/content",
  "src/styles"
];

describe("crawlable built HTML foundation", () => {
  it("uses fresh built homepage HTML for crawlability assertions", () => {
    expect(staleBuildInputs("dist/index.html", homepageRenderInputs)).toEqual([]);
  });

  it("keeps primary homepage meaning in built output before client JavaScript runs", () => {
    const html = homepageHtml();

    for (const expectedContent of [
      "<h1",
      "Do terreno real à decisão segura e auditável",
      "A BLK transforma áreas, obras e ativos físicos",
      "Escolha a base técnica ideal para o seu projeto",
      "Bases técnicas para destravar decisões",
      "Envie localização e objetivo do projeto"
    ]) {
      expect(html).toContain(expectedContent);
    }
  });

  it("keeps crawler-relevant links, CTAs, and metadata in built output", () => {
    const html = homepageHtml();

    for (const expectedMarkup of [
      '<meta name="description"',
      '<link rel="canonical"',
      '<meta property="og:title"',
      'href="/solucoes"',
      'href="/cidades"',
      'href="/blog"',
      'href="https://wa.me/5512988062737',
      'data-cta-location="home-hero"',
      'data-final-whatsapp-submit'
    ]) {
      expect(html).toContain(expectedMarkup);
    }
  });

  it("documents the homepage check as prior art for future public templates", () => {
    const testingGuide = readFileSync("docs/agents/testing.md", "utf8");

    expect(testingGuide).toContain("crawlable built HTML foundation check");
    expect(testingGuide).toContain("tests/config/crawlable-built-html.test.ts");
  });
});
