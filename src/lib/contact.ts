import { buildWhatsAppUrl, type WhatsAppPayload } from "./whatsapp";

const DEFAULT_WHATSAPP_NUMBER = "5512988062737";

export function getWhatsAppNumber(): string {
  const fromEnv = (import.meta.env.PUBLIC_WHATSAPP_NUMBER as string | undefined)?.trim();
  const candidate = fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_WHATSAPP_NUMBER;
  return candidate.replace(/\D/g, "");
}

export function buildDefaultWhatsAppUrl(payload: WhatsAppPayload = {}): string {
  return buildWhatsAppUrl(getWhatsAppNumber(), payload);
}
