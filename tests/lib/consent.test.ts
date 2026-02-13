import { describe, it, expect } from "vitest";
import { defaultConsentState } from "../../src/lib/consent";

describe("consent defaults", () => {
  it("starts denied", () => {
    expect(defaultConsentState()).toEqual({
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
  });
});
