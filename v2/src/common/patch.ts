import type { FilterCutoff } from "@/common/filter";
import type { Envelope } from "./envelope";
import type { Soundwave } from "./soundwaves";

export interface Patch {
  detune: number;
  osc: Soundwave;
  amp: Envelope;
  filter: Envelope & FilterCutoff;
}

export type PatchSet = Record<string, Patch>;
export type PatchId = keyof PatchSet;
export type IdentifiedPatch = Patch & { id: PatchId, name: string };


  // a = 0.1,
  // d = 0.1, 
  // r = 0.1,
  // s = 1,
export const INIT_AMP_EG = {
  attack: 0.1,
  decay: 0.1,
  sustain: 1,
  release: 0.1,
};

export const INIT_PATCH: IdentifiedPatch = {
  id: "init",
  name: "init",
  detune: 0,
  osc: "sine",
  amp: INIT_AMP_EG,
  filter: {
    attack: 0.01,
    decay: 1,
    sustain: 1,
    release: 1,
    frequency: 300,
    resonance: 0,
  },
};

export const DEFAULT_PATCHES: IdentifiedPatch[] = [
  {
    id: "patch1",
    name: "patch1",
    detune: 0,
    osc: "square",
    amp: {
      attack: 1.35,
      decay: 0.84,
      sustain: 1,
      release: 2.03,
    },
    filter: {
      attack: 1.21,
      decay: 1,
      sustain: 1,
      release: 1.65,
      frequency: 740,
      resonance: 5,
    },
  },
  {
    id: "patch2",
    name: "patch2",
    detune: 0,
    osc: "sawtooth",
    amp: {
      attack: 1.38,
      decay: 1,
      sustain: 1,
      release: 2.87,
    },
    filter: {
      attack: 0.01,
      decay: 0.69,
      sustain: 1,
      release: 2.34,
      frequency: 710,
      resonance: 0,
    },
  },
  {
    id: "patch3",
    name: "patch3",
    detune: 0,
    osc: "triangle",
    amp: {
      attack: 1.14,
      decay: 1,
      sustain: 1,
      release: 2.29,
    },
    filter: {
      attack: 0.01,
      decay: 0.01,
      sustain: 0.01,
      release: 1.42,
      frequency: 780,
      resonance: 6,
    },
  },
  {
    id: "patch4",
    name: "patch4",
    detune: 0,
    osc: "square",
    amp: {
      attack: 0.01,
      decay: 1,
      sustain: 1,
      release: 2.73,
    },
    filter: {
      attack: 2.24,
      decay: 1,
      sustain: 1,
      release: 2.44,
      frequency: 680,
      resonance: 10,
    },
  },
];
