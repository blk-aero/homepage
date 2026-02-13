import { describe, it, expect } from "vitest";
import { parseRolloutControl, isServiceActive, isCityActive } from "../../src/lib/rollout";

describe("rollout control", () => {
  const control = parseRolloutControl({
    active_services: ["levantamento-planialtimetrico-para-projeto-arquitetonico"],
    active_cities: ["sao-jose-dos-campos-sp"]
  });

  it("marks active service", () => {
    expect(isServiceActive(control, "levantamento-planialtimetrico-para-projeto-arquitetonico")).toBe(true);
  });

  it("marks inactive city", () => {
    expect(isCityActive(control, "jacarei-sp")).toBe(false);
  });
});
