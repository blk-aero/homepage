import { describe, expect, it } from "vitest";
import { homepageContent } from "../../src/lib/homepage-content";

describe("homepage content model", () => {
  it("centralizes canonical hero copy, cluster detail paths, and section order", () => {
    expect(homepageContent.hero.title).toBe("Do terreno real à decisão segura e auditável");
    expect(homepageContent.hero.subheadline).toBe(
      "A BLK transforma áreas, obras e ativos físicos em mapas, medições, peças técnicas e modelos 3D com rastreabilidade visual para reduzir retrabalho, destravar aprovações e tornar decisões técnicas claras para todos os envolvidos."
    );

    expect(homepageContent.sectionOrder).toEqual([
      "hero",
      "compact-proof",
      "triage-cards",
      "deliverables",
      "visualization-platform",
      "technical-confidence",
      "proof-snippets",
      "faq",
      "final-cta"
    ]);

    expect(homepageContent.triageCards.map((card) => [card.title, card.detailPath])).toEqual([
      ["Projeto e Obra", "/solucoes/projeto-e-obra"],
      ["Regularização Rural", "/solucoes/regularizacao-rural"],
      ["Regularização Urbana", "/solucoes/regularizacao-urbana"],
      ["Volumetria e Medição", "/solucoes/volumetria-e-medicao"],
      [
        "Monitoramento e Inteligência Geográfica",
        "/solucoes/monitoramento-e-inteligencia-geografica"
      ]
    ]);
  });
});
