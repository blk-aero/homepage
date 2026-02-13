import { describe, it, expect } from "vitest";
import { buildServiceGraph } from "../../src/lib/schema";

describe("schema graph", () => {
  it("includes WebPage, Service and BreadcrumbList ids", () => {
    const graph = buildServiceGraph({
      siteUrl: "https://example.com",
      slug: "georreferenciamento-de-imovel-rural",
      title: "Georreferenciamento de Imovel Rural"
    });

    const types = graph["@graph"].map((node: { "@type": string }) => node["@type"]);
    expect(types).toContain("WebPage");
    expect(types).toContain("Service");
    expect(types).toContain("BreadcrumbList");
  });
});
