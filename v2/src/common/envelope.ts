export interface Envelope {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
};

export type EnvelopeParam = keyof Envelope;