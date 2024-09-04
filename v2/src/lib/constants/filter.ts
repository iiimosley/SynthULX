export const filterParams = [
  "cutoff",
  "resonance",
] as const;

export type FilterParam = (typeof filterParams)[number];
