import { describe, it, expect } from "vitest";
import {
  applySourceCodedWhatsAppMarker,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  decodeSourceCodedWhatsAppMessage,
  selectSourceCodedWhatsAppGreeting,
  sourceCodedWhatsAppGreetings
} from "../../src/lib/whatsapp";

function textFromUrl(url: string): string {
  return new URL(url).searchParams.get("text") || "";
}

function codePoints(value: string): string[] {
  return Array.from(value).map((char) => char.codePointAt(0)?.toString(16) || "");
}

describe("whatsapp url", () => {
  it("builds a source-coded greeting without exposing attribution text", () => {
    const url = buildWhatsAppUrl("5511999999999", {
      ctaLocation: "home-hero",
      attribution: { utm_source: "google", utm_medium: "cpc", utm_campaign: "home", gclid: "abc123" }
    });
    const text = textFromUrl(url);
    const decoded = decodeSourceCodedWhatsAppMessage(text);

    expect(url).toContain("wa.me/5511999999999");
    expect(decoded?.id).toBe("google-cpc-home.home-hero.v1");
    expect(text).toContain("Oi, quero falar com a BLK.");
    expect(text).not.toContain("orçamento");
    expect(text).not.toContain("CTA:");
    expect(text).not.toContain("utm_source");
    expect(text).not.toContain("gclid");
  });

  it("keeps exact hidden marker code points in explicit dictionary entries", () => {
    const nav = sourceCodedWhatsAppGreetings.find((entry) => entry.id === "default.nav.v1");
    const triage = sourceCodedWhatsAppGreetings.find((entry) => entry.id === "default.triage-section.v1");

    expect(nav).toBeDefined();
    expect(triage).toBeDefined();
    expect(codePoints(nav?.marker || "")).toEqual(["200e", "a0"]);
    expect(codePoints(triage?.marker || "")).toEqual(["200c"]);
    expect(triage?.placement).toBe("after-greeting-word");
  });

  it("keeps every dictionary marker approved and decodable", () => {
    const approvedCodePoints = new Set(["200e", "a0", "200b", "200c", "200d", "2800"]);
    const markedMessages = new Set<string>();

    for (const entry of sourceCodedWhatsAppGreetings) {
      expect(["prefix", "after-greeting-word"]).toContain(entry.placement);
      for (const codePoint of codePoints(entry.marker)) {
        expect(approvedCodePoints.has(codePoint)).toBe(true);
      }

      const marked = applySourceCodedWhatsAppMarker(entry);
      expect(markedMessages.has(marked)).toBe(false);
      markedMessages.add(marked);
      expect(decodeSourceCodedWhatsAppMessage(marked)?.id).toBe(entry.id);
    }
  });

  it("decodes prefix and after-greeting-word hidden markers", () => {
    const prefix = buildWhatsAppMessage({ ctaLocation: "nav" });
    const afterGreetingWord = buildWhatsAppMessage({ ctaLocation: "triage-section" });

    expect(decodeSourceCodedWhatsAppMessage(prefix)?.id).toBe("default.nav.v1");
    expect(decodeSourceCodedWhatsAppMessage(afterGreetingWord)?.id).toBe("default.triage-section.v1");
  });

  it("falls back from campaign attribution to the default touchpoint greeting", () => {
    const exact = selectSourceCodedWhatsAppGreeting({
      ctaLocation: "home-hero",
      attribution: { utm_source: "google", utm_medium: "cpc", utm_campaign: "home" }
    });
    const fallback = selectSourceCodedWhatsAppGreeting({
      ctaLocation: "home-hero",
      attribution: { utm_source: "unknown", utm_campaign: "missing" }
    });

    expect(exact.id).toBe("google-cpc-home.home-hero.v1");
    expect(fallback.id).toBe("default.home-hero.v1");
  });

  it("includes final composer fields without internal CTA or raw attribution text", () => {
    const url = buildWhatsAppUrl("5511999999999", {
      location: "São José dos Campos",
      objective: "Regularização Rural",
      ctaLocation: "final-cta",
      attribution: { utm_source: "google", gclid: "abc123" }
    });
    const text = textFromUrl(url);

    expect(decodeSourceCodedWhatsAppMessage(text)?.id).toBe("default.final-cta.v1");
    expect(text).toContain("Localização: São José dos Campos.");
    expect(text).toContain("Objetivo: Regularização Rural.");
    expect(text).not.toContain("CTA:");
    expect(text).not.toContain("Cluster selecionado");
    expect(text).not.toContain("utm_source");
    expect(text).not.toContain("gclid");
  });
});
