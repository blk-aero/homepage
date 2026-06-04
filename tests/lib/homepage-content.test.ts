import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
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
      "portfolio",
      "faq",
      "final-cta"
    ]);
    expect(homepageContent.sectionOrder).not.toContain("proof-snippets");
    expect(homepageContent).not.toHaveProperty("proofSnippets");

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

  it("exposes the accepted app, portfolio, FAQ, and final CTA contracts", () => {
    expect(homepageContent.visualizationPlatform.eyebrow).toBe(
      "App de Visualização e Compartilhamento"
    );
    expect(homepageContent.visualizationPlatform.headline).toBe(
      "Visualize e compartilhe o projeto sem depender de software especializado"
    );
    expect(homepageContent.visualizationPlatform.imageAlt).toContain(
      "App de Visualização e Compartilhamento"
    );

    expect(homepageContent.portfolio.eyebrow).toBe("PORTFÓLIO");
    expect(homepageContent.portfolio.title).toBe("Exemplos de projeto e evidência entregue");
    expect(homepageContent.portfolio.intro).toBe(
      "Uma amostra dos tipos de entrega que a BLK organiza para projeto, regularização, medição e gestão territorial."
    );
    expect(homepageContent.portfolio.cards.map((card) => [card.cluster, card.title, card.tags])).toEqual([
      ["Projeto e Obra", "Terreno em Condomínio", ["topografia", "modelo 3D", "curvas de nível"]],
      ["Regularização Rural", "Parcelamento em Chácaras", ["INCRA/SIGEF", "CAR", "plantas", "memoriais"]],
      ["Regularização Urbana", "REURB-E", ["LEPAC", "planta ambiental", "planta de perímetro"]],
      [
        "Volumetria e Medição",
        "Viabilidade de Platô para Galpões",
        ["simulação de cenários", "movimentação de terra", "decisão de compra"]
      ],
      [
        "Monitoramento e Inteligência Geográfica",
        "Aterro Sanitário de São José dos Campos",
        ["previsão", "ritmo de uso", "gestão de ativo"]
      ]
    ]);

    expect(
      homepageContent.faq.items.find((item) => item.question.includes("software"))?.answer
    ).toContain("App de Visualização e Compartilhamento");

    expect(homepageContent.finalCta.title).toBe("Envie localização e objetivo do projeto");
    expect(homepageContent.finalCta.supportCopy).toBe(
      "Com essas duas informações, a BLK já consegue orientar o escopo inicial e indicar o próximo passo pelo WhatsApp."
    );
    expect(homepageContent.finalCta.location).toEqual({
      label: "Localização do projeto",
      placeholder: "Cidade, bairro, endereço ou link do mapa",
      maxLength: 300
    });
    expect(homepageContent.finalCta.objectives).toContain("Ainda não sei, preciso de orientação");
  });

  it("exposes the approved homepage proof groups with sorted links and fallback items", () => {
    expect(homepageContent.proofBand.groups.map((group) => group.title)).toEqual([
      "Credenciais e Associações",
      "Clientes e Projetos Atendidos"
    ]);

    for (const group of homepageContent.proofBand.groups) {
      expect(group.items.map((item) => item.name)).toEqual(
        [...group.items.map((item) => item.name)].sort((a, b) => a.localeCompare(b, "pt-BR"))
      );

      for (const item of group.items) {
        expect(item.name).toBeTruthy();
        expect(item.href).toMatch(/^https?:\/\//);
      }
    }

    expect(homepageContent.proofBand.groups[0]?.items).toEqual([
      expect.objectContaining({ name: "ACONVAP", href: "https://www.aconvap.com.br/" }),
      expect.objectContaining({ name: "BR-UTM", href: "https://br-utm.decea.mil.br/" }),
      expect.objectContaining({ name: "CREA-SP", href: "https://www.creasp.org.br/" }),
      expect.objectContaining({ name: "Enredes", href: "https://enredes.com.br/" }),
      expect.objectContaining({ name: "INCRA", href: "https://www.gov.br/incra/pt-br" }),
      expect.objectContaining({
        name: "Ministério da Defesa",
        href: "https://www.gov.br/defesa/pt-br/assuntos/aerolevantamento"
      }),
      expect.objectContaining({ name: "UNICAMP", href: "https://unicampventures.org.br/" })
    ]);

    expect(homepageContent.proofBand.groups[1]?.items).toEqual([
      expect.objectContaining({
        name: "Construtora Oliveira Roxo",
        href: "https://www.instagram.com/construtoraoliveiraroxo/"
      }),
      expect.objectContaining({
        name: "Lia Blanco Arquitetura",
        href: "https://www.instagram.com/blancolia/"
      }),
      expect.objectContaining({
        name: "Lucas Diniz Arquitetura",
        href: "https://www.instagram.com/lucasdinizarquitetura/"
      }),
      expect.objectContaining({ name: "Macaw Studio", href: "https://macawstudio.myportfolio.com/" }),
      expect.objectContaining({ name: "Mobilidade Urbana SJC", href: "https://www.sjc.sp.gov.br/secretarias/mobilidade-urbana/" }),
      expect.objectContaining({ name: "Montante", href: "https://montante.com.br/" }),
      expect.objectContaining({ name: "Polimix Ambiental", href: "https://www.polimixambiental.com.br/" }),
      expect.objectContaining({ name: "Sahyoun Properties", href: "https://sahyounproperties.com/" }),
      expect.objectContaining({ name: "Sergio Porto Engenharia", href: "https://www.sergioporto.com.br/" }),
      expect.objectContaining({ name: "Six Engenharia", href: "https://sixengenharia.com.br/" }),
      expect.objectContaining({ name: "SN Saneamento", href: "http://snsaneamento.com.br" }),
      expect.objectContaining({ name: "URBAM", href: "https://www.urbam.com.br/" })
    ]);
    expect(homepageContent.proofBand.groups[1]?.items.find((item) => item.name === "Lia Blanco Arquitetura")).not.toHaveProperty("logo");
  });

  it("points logo-backed proof items at production logo assets only", () => {
    const logoItems = homepageContent.proofBand.groups.flatMap((group) =>
      group.items.filter((item) => item.logo)
    );

    expect(logoItems).toHaveLength(18);
    for (const item of logoItems) {
      const logoPath = join("src/assets/homepage/proof-logos", item.logo || "");
      expect(existsSync(logoPath), `${item.name} logo asset exists`).toBe(true);
      expect(statSync(logoPath).size, `${item.name} logo stays performance-conscious`).toBeLessThan(
        100_000
      );
    }

    const creaSp = logoItems.find((item) => item.name === "CREA-SP");
    expect(creaSp?.logo).toBe("crea-sp.png");
    expect(
      statSync(join("src/assets/homepage/proof-logos", creaSp?.logo || "")).size,
      "CREA-SP logo stays small enough for runtime delivery"
    ).toBeLessThanOrEqual(25_000);

    expect(logoItems.map((item) => item.logo)).not.toContain("logos.csv");
  });
});
