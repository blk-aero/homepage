export type Attribution = Partial<
  Record<
    "utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content" | "gclid",
    string
  >
>;

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid"
] as const;

export function parseAttributionParams(search: string): Attribution {
  const params = new URLSearchParams(search);
  const result: Attribution = {};

  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) {
      result[key] = value;
    }
  }

  return result;
}

export function mergeFirstTouchAttribution(
  stored: Attribution = {},
  current: Attribution = {}
): Attribution {
  return { ...current, ...stored };
}
