import { describe, it, expect } from "vitest";
import { grantedConsentState } from "../../src/lib/consent";

describe("simple cookie notice measurement defaults", () => {
  it("starts granted", () => {
    expect(grantedConsentState()).toEqual({
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted"
    });
  });
});
