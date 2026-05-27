import { describe, it, expect, vi } from "vitest";
import { pushEvent } from "../../src/lib/datalayer";

describe("datalayer", () => {
  it("pushes event into window.dataLayer", () => {
    const push = vi.fn();
    (globalThis as any).window = { dataLayer: { push } };

    pushEvent({ event: "click_to_call", page_path: "/solucoes" });

    expect(push).toHaveBeenCalledWith({ event: "click_to_call", page_path: "/solucoes" });
  });
});
