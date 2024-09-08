export class OscillatorController extends OscillatorNode {
  constructor(
    context: AudioContext,
    frequency: number,
    detune: number,
    type: OscillatorType
  ) {
    super(context);
    this.frequency.value = frequency;
    this.detune.value = detune;
    this.type = type;
  }
}