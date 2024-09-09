import type { Envelope } from "./envelope";

export interface Voice {
  vco: OscillatorNode;
  vca: AmplifierNode;
}

export interface AmplifierNode {
  node: GainNode;
  eg: Envelope;
}
