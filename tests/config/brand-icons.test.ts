import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("brand icons", () => {
  it("keeps brand icon SVG data outside the base layout", () => {
    const layout = readFileSync("src/layouts/BaseLayout.astro", "utf8");

    expect(layout).toContain('import BrandIcon from "../components/BrandIcon.astro"');
    expect(layout).not.toContain("const socialIcons");
    expect(layout).not.toContain("M17.472 14.382");
    expect(layout).not.toContain("M20.447 20.452");
  });

  it("uses a shared local component and icon registry for header and footer brands", () => {
    expect(existsSync("src/components/BrandIcon.astro")).toBe(true);
    expect(existsSync("src/lib/brand-icons.ts")).toBe(true);

    const component = readFileSync("src/components/BrandIcon.astro", "utf8");
    const registry = readFileSync("src/lib/brand-icons.ts", "utf8");

    expect(component).toContain("../lib/brand-icons");
    for (const iconName of ["whatsapp", "linkedin", "youtube", "facebook", "instagram"]) {
      expect(registry).toContain(`${iconName}:`);
    }
  });
});
