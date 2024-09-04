export const envelopeParams = [
  "attack",
  "decay",
  "sustain",
  "release",
] as const;

export type EnvelopeParam = (typeof envelopeParams)[number];
