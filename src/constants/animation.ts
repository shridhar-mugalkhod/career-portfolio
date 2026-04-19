export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  reveal: 0.7,
} as const;

export const STAGGER = {
  fast: 0.04,
  normal: 0.08,
} as const;

export const SCROLL_REVEAL = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
} as const;

export const SECTION_IDS = [
  'hero',
  'about',
  'experience',
  'skills',
  'projects',
  'testimonials',
  'education',
  'contact',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
