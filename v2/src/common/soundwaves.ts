export const SOUNDWAVES = ["sine", "triangle", "square", "sawtooth"] as const;

export type Soundwave = Exclude<OscillatorType, "custom">;

export type SoundwaveDetails = {
  title: string;
  harmonicContent: number;
  description: string;
};

export const SOUNDWAVE: Record<Soundwave, SoundwaveDetails> = {
  sine: {
    title: "Sine",
    harmonicContent: 1,
    description: "Purest form of a soundwave",
  },
  triangle: {
    title: "Triangle",
    harmonicContent: 25,
    description: "Great for soft, flute-like sounds",
  },
  square: {
    title: "Square",
    harmonicContent: 25,
    description: "Ideal for hollow, eerie, woodwind-like sounds",
  },
  sawtooth: {
    title: "Sawtooth",
    harmonicContent: 50,
    description:
      "Most complex structure of basic soundwave. Used brass- and string-like sounds.",
  },
};
