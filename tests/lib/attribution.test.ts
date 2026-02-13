import { describe, it, expect } from "vitest";
import { parseAttributionParams } from "../../src/lib/attribution";

describe("attribution parser", () => {
  it("extracts utm and gclid", () => {
    const result = parseAttributionParams("?utm_source=google&utm_campaign=test&gclid=abc123");

    expect(result).toMatchObject({
      utm_source: "google",
      utm_campaign: "test",
      gclid: "abc123"
    });
  });
});
