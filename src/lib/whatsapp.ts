import type { Attribution } from "./attribution";

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

  if (payload.location) {
    parts.push(`Localização: ${payload.location}.`);
  }

  if (payload.approximateAreaOrPerimeter) {
    parts.push(`Área/perímetro aproximado: ${payload.approximateAreaOrPerimeter}.`);
  }

  if (payload.objective) {
    parts.push(`Objetivo: ${payload.objective}.`);
  }

  if (payload.deadline) {
    parts.push(`Prazo desejado: ${payload.deadline}.`);
  }

  if (payload.desiredDeliverable) {
    parts.push(`Entrega desejada: ${payload.desiredDeliverable}.`);
  }

  if (payload.selectedCluster) {
    parts.push(`Cluster selecionado: ${payload.selectedCluster}.`);
  }

  if (payload.ctaLocation) {
    parts.push(`CTA: ${payload.ctaLocation}.`);
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
