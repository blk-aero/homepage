import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";

const removedLegacyFiles = [
  "src/pages/servicos/[service].astro",
  "src/pages/servicos/[service]/[city].astro",
  "src/pages/cidades/[city].astro",
  "src/pages/blog/[slug].astro",
  "src/pages/cases/[slug].astro",
  "src/pages/ofertas/guia-georreferenciamento.astro",
  "src/content/services/georreferenciamento-de-imovel-rural.md",
  "src/content/cities/jacarei-sp.md",
  "src/content/blog/post-1.md",
  "src/content/cases/case-1.md",
  "src/lib/routes.ts",
  "src/lib/rollout.ts",
  "src/lib/schema.ts",
  "scripts/indexnow.mjs",
  "data/rollout-control.json"
];

const removedLegacyComponents = [
  "src/components/ComparisonTable.astro",
  "src/components/Hero.astro",
  "src/components/LeadMagnetCta.astro",
  "src/components/LiteYouTube.astro",
  "src/components/TrustBar.astro",
  "src/components/LazyIframe.astro",
  "src/components/ContactLinks.astro"
];

const activeSurfaceFiles = [
  "src/pages/index.astro",
  "src/pages/solucoes/index.astro",
  "src/pages/solucoes/[cluster].astro",
  "src/pages/cidades/index.astro",
  "src/pages/blog/index.astro",
  "src/components/HomeHeroShowcase.astro",
  "src/components/WhatsAppCTA.astro",
  "src/layouts/BaseLayout.astro"
];

const activePlanningFiles = [
  "docs/backlog_prd.md",
  "docs/to-be-grilled.md",
  "docs/proof-logo-assets-prd.md"
];

describe("current homepage branch surface", () => {
  it("keeps only the homepage and temporary support route files", () => {
    for (const file of activeSurfaceFiles) {
      expect(existsSync(file), `${file} should exist`).toBe(true);
    }

    for (const file of removedLegacyFiles) {
      expect(existsSync(file), `${file} should be removed`).toBe(false);
    }
  });

  it("removes components that only supported legacy generated pages", () => {
    for (const file of removedLegacyComponents) {
      expect(existsSync(file), `${file} should be removed`).toBe(false);
    }
  });

  it("keeps current planning docs available outside Archive", () => {
    for (const file of activePlanningFiles) {
      expect(existsSync(file), `${file} should exist`).toBe(true);
    }
  });
});
