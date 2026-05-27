import { describe, it, expect } from "vitest";
import { buildWhatsAppUrl } from "../../src/lib/whatsapp";

describe("whatsapp url", () => {
  it("includes service city and attribution in text", () => {
    const url = buildWhatsAppUrl("5511999999999", {
      service: "georreferenciamento-de-imovel-rural",
      city: "jacarei-sp",
      attribution: { utm_source: "google", gclid: "abc123" }
    });

    expect(url).toContain("wa.me/5511999999999");
    expect(decodeURIComponent(url)).toContain("georreferenciamento-de-imovel-rural");
    expect(decodeURIComponent(url)).toContain("jacarei-sp");
    expect(decodeURIComponent(url)).toContain("gclid=abc123");
  });

  it("includes homepage CTA qualification and segmentation fields in text", () => {
    const url = buildWhatsAppUrl("5511999999999", {
      location: "São José dos Campos",
      approximateAreaOrPerimeter: "12 ha",
      objective: "regularizar matrícula",
      deadline: "10 dias",
      desiredDeliverable: "mapa e memorial",
      selectedCluster: "Regularização Rural",
      ctaLocation: "triage-card",
      attribution: { utm_source: "google", gclid: "abc123" }
    });
    const text = decodeURIComponent(url);

    expect(text).toContain("Localização: São José dos Campos.");
    expect(text).toContain("Área/perímetro aproximado: 12 ha.");
    expect(text).toContain("Objetivo: regularizar matrícula.");
    expect(text).toContain("Prazo desejado: 10 dias.");
    expect(text).toContain("Entrega desejada: mapa e memorial.");
    expect(text).toContain("Cluster selecionado: Regularização Rural.");
    expect(text).toContain("CTA: triage-card.");
    expect(text).toContain("utm_source=google");
    expect(text).toContain("gclid=abc123");
  });
});
