export const FILTER_PARAM = [
  "cutoff",
  "resonance",
] as const;

export type FilterParam = (typeof FILTER_PARAM)[number];
