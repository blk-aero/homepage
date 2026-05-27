import { describe, it, expect } from "vitest";
import { mergeFirstTouchAttribution, parseAttributionParams } from "../../src/lib/attribution";

describe("attribution parser", () => {
  it("extracts utm and gclid", () => {
    const result = parseAttributionParams("?utm_source=google&utm_campaign=test&gclid=abc123");

    expect(result).toMatchObject({
      utm_source: "google",
      utm_campaign: "test",
      gclid: "abc123"
    });
  });

  it("preserves first-touch attribution when later visits only include partial campaign values", () => {
    const stored = {
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "obra",
      gclid: "first-click"
    };
    const laterVisit = parseAttributionParams("?utm_source=linkedin&utm_content=retargeting");

    expect(mergeFirstTouchAttribution(stored, laterVisit)).toEqual({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "obra",
      utm_content: "retargeting",
      gclid: "first-click"
    });
  });
});
