import { describe, expect, it } from "vitest";
import { createHeroCarousel } from "../../src/lib/homepage-carousel";

describe("hero carousel behavior", () => {
  it("advances automatically, pauses temporarily, stops after manual selection, and respects reduced motion", () => {
    const carousel = createHeroCarousel({ slideCount: 5, reducedMotion: false });

    expect(carousel.current()).toBe(0);
    expect(carousel.autoCycling()).toBe(true);

    carousel.advance();
    expect(carousel.current()).toBe(1);

    carousel.pause();
    carousel.advance();
    expect(carousel.current()).toBe(1);

    carousel.resume();
    carousel.advance();
    expect(carousel.current()).toBe(2);

    carousel.select(4);
    expect(carousel.current()).toBe(4);
    expect(carousel.autoCycling()).toBe(false);

    carousel.advance();
    expect(carousel.current()).toBe(4);

    const reducedMotionCarousel = createHeroCarousel({ slideCount: 5, reducedMotion: true });
    expect(reducedMotionCarousel.current()).toBe(0);
    expect(reducedMotionCarousel.autoCycling()).toBe(false);
    reducedMotionCarousel.advance();
    expect(reducedMotionCarousel.current()).toBe(0);
  });
});
