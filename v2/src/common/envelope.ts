export const ENVELOPE_PARAMS = [
  "attack",
  "decay",
  "sustain",
  "release",
] as const;

export type EnvelopeParam = (typeof ENVELOPE_PARAMS)[number];
