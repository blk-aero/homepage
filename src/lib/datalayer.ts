export type DataLayerEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: { push?: (payload: DataLayerEvent) => void } | DataLayerEvent[];
  }
}

export function pushEvent(payload: DataLayerEvent): void {
  if (typeof window === "undefined") {
    return;
  }

  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  const dataLayer = window.dataLayer as { push?: (value: DataLayerEvent) => void };
  if (typeof dataLayer.push === "function") {
    dataLayer.push(payload);
  }
}
