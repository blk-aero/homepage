export type ConsentValue = "granted" | "denied";

export type ConsentState = {
  ad_storage: ConsentValue;
  analytics_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
};

export function grantedConsentState(): ConsentState {
  return {
    ad_storage: "granted",
    analytics_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted"
  };
}
