import { existsSync } from "node:fs";
import { describe, it, expect } from "vitest";

describe("phase1 content files", () => {
  it("has all 3 service markdown files", () => {
    expect(existsSync("src/content/services/levantamento-planialtimetrico-para-projeto-arquitetonico.md")).toBe(true);
    expect(existsSync("src/content/services/georreferenciamento-de-imovel-rural.md")).toBe(true);
    expect(existsSync("src/content/services/viabilidade-de-terraplenagem.md")).toBe(true);
  });

  it("has 5 city markdown files", () => {
    expect(existsSync("src/content/cities/sao-jose-dos-campos-sp.md")).toBe(true);
    expect(existsSync("src/content/cities/jacarei-sp.md")).toBe(true);
    expect(existsSync("src/content/cities/cacapava-sp.md")).toBe(true);
    expect(existsSync("src/content/cities/taubate-sp.md")).toBe(true);
    expect(existsSync("src/content/cities/pindamonhangaba-sp.md")).toBe(true);
  });
});
