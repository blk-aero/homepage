export type HeroCarouselOptions = {
  slideCount: number;
  reducedMotion: boolean;
};

export type HeroCarousel = {
  current: () => number;
  autoCycling: () => boolean;
  advance: () => number;
  pause: () => void;
  resume: () => void;
  select: (index: number) => number;
};

export function createHeroCarousel(options: HeroCarouselOptions): HeroCarousel {
  const slideCount = Math.max(1, options.slideCount);
  let currentIndex = 0;
  let paused = false;
  let autoCycling = !options.reducedMotion;

  return {
    current: () => currentIndex,
    autoCycling: () => autoCycling,
    advance: () => {
      if (!autoCycling || paused) return currentIndex;
      currentIndex = (currentIndex + 1) % slideCount;
      return currentIndex;
    },
    pause: () => {
      paused = true;
    },
    resume: () => {
      paused = false;
    },
    select: (index: number) => {
      currentIndex = Math.max(0, Math.min(slideCount - 1, index));
      autoCycling = false;
      paused = false;
      return currentIndex;
    }
  };
}
