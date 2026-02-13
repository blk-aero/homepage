import { describe, it, expect } from "vitest";
import { buildServiceCityPairs } from "../../src/lib/routes";

describe("route pairing", () => {
  it("builds active cross-product and excludes blocked pairs", () => {
    const pairs = buildServiceCityPairs(
      ["s1", "s2"],
      ["c1", "c2"],
      [{ service: "s2", city: "c1" }]
    );

    expect(pairs).toEqual([
      { service: "s1", city: "c1" },
      { service: "s1", city: "c2" },
      { service: "s2", city: "c2" }
    ]);
  });
});
