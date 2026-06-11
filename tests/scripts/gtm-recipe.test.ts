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

  it("keeps unstructured final CTA fields out of ad-platform mappings", () => {
    const recipePath = path.join(process.cwd(), "docs", "gtm-container-recipe.json");
    const content = fs.readFileSync(recipePath, "utf-8");
    const json = JSON.parse(content);
    const variables = json.containerVersion.variable.map((variable: { name: string }) => variable.name);
    const serializedTags = JSON.stringify(json.containerVersion.tag);

    expect(variables).not.toContain("DLV - location");
    expect(variables).not.toContain("DLV - objective");
    expect(serializedTags).not.toContain("{{DLV - location}}");
    expect(serializedTags).not.toContain("{{DLV - objective}}");
  });

  it("contains a replaceable GA4 Measurement ID placeholder for GA4 event tags", () => {
    const recipePath = path.join(process.cwd(), "docs", "gtm-container-recipe.json");
    const content = fs.readFileSync(recipePath, "utf-8");
    const json = JSON.parse(content);
    const variables = json.containerVersion.variable;
    const tags = json.containerVersion.tag;

    expect(variables).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Constant - GA4 Measurement ID"
        })
      ])
    );

    for (const eventName of ["whatsapp_click", "email_click", "social_click"]) {
      const tag = tags.find((candidate: { name: string }) => candidate.name === `GA4 Event - ${eventName}`);
      expect(JSON.stringify(tag)).toContain("{{Constant - GA4 Measurement ID}}");
    }
  });
});
