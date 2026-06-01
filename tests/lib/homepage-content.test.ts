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

    expect(homepageContent.triageCards.cards.map((card) => [card.title, card.detailPath])).toEqual([
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

  it("exposes the accepted triage and deliverables copy contract", () => {
    expect(homepageContent.triageCards.heading).toBe(
      "Escolha a base técnica ideal para o seu projeto"
    );
    expect(homepageContent.triageCards.intro).toBe(
      "Selecione o caminho mais próximo da sua demanda. A BLK ajuda a transformar localização e objetivo em escopo, prazo e entregáveis técnicos."
    );
    expect(homepageContent.triageCards.cards.map((card) => card.title)).toEqual([
      "Projeto e Obra",
      "Regularização Rural",
      "Regularização Urbana",
      "Volumetria e Medição",
      "Monitoramento e Inteligência Geográfica"
    ]);
    for (const card of homepageContent.triageCards.cards) {
      expect(card.tags).toBeUndefined();
    }

    expect(homepageContent.deliverables.eyebrow).toBe("O QUE VOCÊ RECEBE");
    expect(homepageContent.deliverables.title).toBe("Bases técnicas para destravar decisões");
    expect(homepageContent.deliverables.groups.map((group) => [group.title, group.tags])).toEqual([
      ["Projeto e Obra", ["DXF", "curvas de nível", "levantamento planialtimétrico", "as-built"]],
      ["Regularização e Aprovação", ["memorial", "LEPAC", "perímetro", "planta ambiental"]],
      ["Medição e Auditoria", ["volumetria", "corte / aterro", "comparativos", "relatório"]],
      ["Alinhamento Visual", ["ortofoto", "nuvem de pontos", "modelo 3D", "MDT"]]
    ]);
  });
});
