export const soundwaves = ["sine", "triangle", "square", "sawtooth"] as const;

export type Soundwave = (typeof soundwaves)[number];

export type SoundwaveDetails = {
  title: string;
  harmonicContent: number;
  description: string;
};

export const SOUNDWAVE: Record<Soundwave, SoundwaveDetails> = {
  sine: {
    title: "Sine Wave",
    harmonicContent: 1,
    description: "Purest form of a soundwave",
  },
  triangle: {
    title: "Triangle Wave",
    harmonicContent: 25,
    description: "Great for soft, flute-like sounds",
  },
  square: {
    title: "Square Wave",
    harmonicContent: 25,
    description: "Ideal for hollow, eerie, woodwind-like sounds",
  },
  sawtooth: {
    title: "Sawtooth Wave",
    harmonicContent: 50,
    description: "Most complex structure of basic soundwaves",
  },
};
