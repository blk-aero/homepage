import type { Attribution } from "./attribution";

export type WhatsAppMarkerPlacement = "prefix" | "after-greeting-word";

export type SourceCodedWhatsAppGreeting = {
  id: string;
  touchpoint: string;
  visibleText: string;
  marker: string;
  placement: WhatsAppMarkerPlacement;
  source?: string;
  medium?: string;
  campaign?: string;
};

export type WhatsAppPayload = {
  service?: string | null;
  city?: string | null;
  location?: string | null;
  approximateAreaOrPerimeter?: string | null;
  objective?: string | null;
  deadline?: string | null;
  desiredDeliverable?: string | null;
  selectedCluster?: string | null;
  ctaLocation?: string | null;
  attribution?: Attribution;
  intro?: string;
};

export const sourceCodedWhatsAppGreetings: SourceCodedWhatsAppGreeting[] = [
  {
    id: "google-cpc-home.home-hero.v1",
    source: "google",
    medium: "cpc",
    campaign: "home",
    touchpoint: "home-hero",
    visibleText: "Oi, quero falar com a BLK.",
    marker: "\u200E\u00A0\u200B",
    placement: "prefix"
  },
  {
    id: "default.nav.v1",
    touchpoint: "nav",
    visibleText: "Oi, quero falar com a BLK.",
    marker: "\u200E\u00A0",
    placement: "prefix"
  },
  {
    id: "default.home-hero.v1",
    touchpoint: "home-hero",
    visibleText: "Oi, quero falar com a BLK.",
    marker: "\u200B",
    placement: "prefix"
  },
  {
    id: "default.triage-section.v1",
    touchpoint: "triage-section",
    visibleText: "Oi, gostaria de falar com a BLK.",
    marker: "\u200C",
    placement: "after-greeting-word"
  },
  {
    id: "default.final-cta.v1",
    touchpoint: "final-cta",
    visibleText: "Oi, quero falar com a BLK.",
    marker: "\u200D",
    placement: "prefix"
  },
  {
    id: "default.footer.v1",
    touchpoint: "footer",
    visibleText: "Olá, quero falar com a BLK.",
    marker: "\u2800",
    placement: "prefix"
  },
  {
    id: "default.site.v1",
    touchpoint: "site",
    visibleText: "Oi, quero falar com a BLK.",
    marker: "\u00A0",
    placement: "prefix"
  }
];

function normalizeTouchpoint(ctaLocation?: string | null): string {
  return ctaLocation && ctaLocation.trim().length > 0 ? ctaLocation.trim() : "site";
}

function matchesAttribution(
  entry: SourceCodedWhatsAppGreeting,
  attribution: Attribution,
  requirements: Pick<SourceCodedWhatsAppGreeting, "source" | "medium" | "campaign">
): boolean {
  return (
    entry.source === requirements.source &&
    entry.medium === requirements.medium &&
    entry.campaign === requirements.campaign &&
    (!entry.source || entry.source === attribution.utm_source) &&
    (!entry.medium || entry.medium === attribution.utm_medium) &&
    (!entry.campaign || entry.campaign === attribution.utm_campaign)
  );
}

export function selectSourceCodedWhatsAppGreeting(
  payload: Pick<WhatsAppPayload, "ctaLocation" | "attribution"> = {}
): SourceCodedWhatsAppGreeting {
  const touchpoint = normalizeTouchpoint(payload.ctaLocation);
  const attribution = payload.attribution ?? {};
  const source = attribution.utm_source;
  const medium = attribution.utm_medium;
  const campaign = attribution.utm_campaign;
  const attributionFallbacks = [
    { source, medium, campaign },
    { source, medium, campaign: undefined },
    { source, medium: undefined, campaign: undefined },
    { source: undefined, medium: undefined, campaign: undefined }
  ];

  for (const requirements of attributionFallbacks) {
    const match = sourceCodedWhatsAppGreetings.find(
      (entry) => entry.touchpoint === touchpoint && matchesAttribution(entry, attribution, requirements)
    );
    if (match) return match;
  }

  return (
    sourceCodedWhatsAppGreetings.find((entry) => entry.id === "default.site.v1") ??
    sourceCodedWhatsAppGreetings[0]
  );
}

export function applySourceCodedWhatsAppMarker(entry: SourceCodedWhatsAppGreeting): string {
  if (entry.placement === "prefix") {
    return `${entry.marker}${entry.visibleText}`;
  }

  const greetingWord = entry.visibleText.match(/^[\p{L}\p{N}]+/u)?.[0];
  if (!greetingWord) {
    return `${entry.marker}${entry.visibleText}`;
  }

  return `${greetingWord}${entry.marker}${entry.visibleText.slice(greetingWord.length)}`;
}

function append(parts: string[], label: string, value?: string | null): void {
  if (value) parts.push(`${label}: ${value}.`);
}

export function buildWhatsAppMessage(payload: WhatsAppPayload = {}): string {
  const greeting = selectSourceCodedWhatsAppGreeting(payload);
  const parts: string[] = [applySourceCodedWhatsAppMarker(greeting)];

  if (normalizeTouchpoint(payload.ctaLocation) === "final-cta") {
    append(parts, "Localização", payload.location);
    append(parts, "Objetivo", payload.objective);
  }

  return parts.join("\n\n");
}

export function decodeSourceCodedWhatsAppMessage(
  message: string
): SourceCodedWhatsAppGreeting | null {
  return (
    sourceCodedWhatsAppGreetings
      .map((entry) => ({ entry, markedText: applySourceCodedWhatsAppMarker(entry) }))
      .sort((a, b) => b.markedText.length - a.markedText.length)
      .find(({ markedText }) => message.startsWith(markedText))?.entry ?? null
  );
}

export function buildWhatsAppUrl(number: string, payload: WhatsAppPayload = {}): string {
  const cleanNumber = number.replace(/\D/g, "");
  const message = buildWhatsAppMessage(payload);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
