export const FILTER_PARAM = [
  "frequency",
  "resonance",
] as const;

export type FilterCutoff = {
  frequency: number;
  resonance: number;
}

export type FilterParam = (typeof FILTER_PARAM)[number];
