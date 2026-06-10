import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("GTM Container Recipe", () => {
  it("contains valid, parsable JSON matching the GTM format", () => {
    const recipePath = path.join(process.cwd(), "docs", "gtm-container-recipe.json");
    expect(fs.existsSync(recipePath)).toBe(true);

    const content = fs.readFileSync(recipePath, "utf-8");
    const json = JSON.parse(content);

    expect(json).toHaveProperty("exportFormatVersion");
    expect(json).toHaveProperty("containerVersion");
    expect(json.containerVersion).toHaveProperty("container");
    expect(json.containerVersion.container.publicId).toBe("GTM-WL3NKNLP");
    expect(json.containerVersion).toHaveProperty("variable");
    expect(json.containerVersion).toHaveProperty("trigger");
    expect(json.containerVersion).toHaveProperty("tag");
  });
});
