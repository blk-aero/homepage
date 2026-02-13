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
});
