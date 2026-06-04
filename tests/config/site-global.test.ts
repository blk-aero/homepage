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
      "Legal",
      "contato@blkaero.com.br",
      "São José dos Campos",
      "/servicos/",
      "/cases/",
      "/ofertas/",
      "/blog/post-1",
      "/cidades/jacarei-sp"
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

  it("uses the current BLK contact email", () => {
    const config = readFileSync("src/content/site/global.yaml", "utf8");

    expect(config).toContain("email: contato@blk.aero");
  });

  it("keeps solution-first navigation with privacy policy in the footer", () => {
    const config = readFileSync("src/content/site/global.yaml", "utf8");

    expect(config).toContain("label: Soluções");
    expect(config).toContain("href: /solucoes");
    expect(config).toContain("label: Cidades");
    expect(config).toContain("href: /cidades");
    expect(config).toContain("label: Blog");
    expect(config).toContain("href: /blog");
    expect(config).toContain("label: Política de Privacidade");
    expect(config).toContain("href: /politica-de-privacidade");
    expect(config).not.toContain("label: Servicos");
  });

  it("keeps the BLK GTM container as the default tracking config", () => {
    const config = readFileSync("src/content/site/global.yaml", "utf8");

    expect(config).toContain("gtm_id: GTM-WL3NKNLP");
  });
});
