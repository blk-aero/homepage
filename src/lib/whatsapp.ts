import type { Attribution } from "./attribution";

export type WhatsAppPayload = {
  service?: string | null;
  city?: string | null;
  attribution?: Attribution;
  intro?: string;
};

function buildAttributionText(attribution: Attribution = {}): string {
  const entries = Object.entries(attribution).filter(([, value]) => Boolean(value));
  if (entries.length === 0) return "";
  return entries.map(([key, value]) => `${key}=${value}`).join(" ");
}

export function buildWhatsAppMessage(payload: WhatsAppPayload = {}): string {
  const parts: string[] = [payload.intro ?? "Olá! Quero orçamento."];

  if (payload.service) {
    parts.push(`Serviço: ${payload.service}.`);
  }

  if (payload.city) {
    parts.push(`Cidade: ${payload.city}.`);
  }

  const attributionText = buildAttributionText(payload.attribution);
  if (attributionText) {
    parts.push(attributionText);
  }

  return parts.join(" ");
}

export function buildWhatsAppUrl(number: string, payload: WhatsAppPayload = {}): string {
  const cleanNumber = number.replace(/\D/g, "");
  const message = buildWhatsAppMessage(payload);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
