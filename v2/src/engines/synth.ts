import { KEYBOARD } from "@/common/keyboard";
import { INIT_PATCH, type IdentifiedPatch, type Patch } from "@/common/patch";
import { DEFAULT_VOLUME, NOMINAL_GAIN } from "@/common/volume";
import { type AmplifierNode, type Voice } from "@/common/synth";
import type { Envelope } from "../common/envelope";

////// Terms //////
// VCO: Voltage Controlled Oscillator -- soundwave generator
// VCA: Voltage Controlled Amplifier -- soundwave amplitude controller
// VCF: Voltage Controlled Filter -- soundwave frequency modulation controller
// EG:  Envelope Generator -- controls the transition of soundwaves from one state to another
// Voices: aka, polyphony -- the number of notes that can be played simultaneously
// Patch: a set of parameters that define the sound of the synthesizer
///////////////////

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export class Synth {
  private patch: Patch | IdentifiedPatch;
  private context: AudioContext;
  private output: GainNode;
  private voices: Record<string, Voice> = {};

  constructor(patch: Patch | IdentifiedPatch = INIT_PATCH) {
    this.patch = patch;
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.output = this.context.createGain();
    this.output.connect(this.context.destination);

    Object.entries(KEYBOARD).forEach(([note, { frequency }]) => {
      const vco = this.createOscillator(frequency);
      const vca = this.createAmplifier();
      
      vco.connect(vca.node);
      vca.node.connect(this.output);
      vco.start();

      this.voices[note] = { vco, vca };
    });

    this.output.gain.value = DEFAULT_VOLUME;
  }

  get currentOsc() {
    return this.patch.osc;
  }

  play(key: string) {
    if (this.context.state === "suspended") this.context.resume();

    const { vca } = this.voices[key];

    let now = this.context.currentTime;
    vca.node.gain.cancelScheduledValues(0);
    vca.node.gain.setValueAtTime(0, now);
    vca.node.gain.linearRampToValueAtTime(1, now + vca.eg.attack);
    
    vca.node.gain.linearRampToValueAtTime(
      vca.eg.sustain,
      now + vca.eg.attack + vca.eg.decay
    );
  }

  stop(key: string) {
    const { vca } = this.voices[key];

    let now = this.context.currentTime;
    vca.node.gain.cancelScheduledValues(0);
    vca.node.gain.setValueAtTime(vca.node.gain.value, now);
    vca.node.gain.linearRampToValueAtTime(0, now + vca.eg.release);
  }

  changeOscillator(type: OscillatorType) {
    for (const key in this.voices) {
      this.voices[key].vco.type = type;
    }
  }

  changeDetune(cents: number) {
    for (const key in this.voices) {
      this.voices[key].vco.detune.value = cents;
    }
  }

  changeOutputVolume(volume: number) {
    this.output.gain.value = volume;
  }

  changeAmpEnvelope(eg: Envelope) {
    for (const key in this.voices) {
      this.voices[key].vca.eg = eg;
    }
  }

  changePatch(patch: Patch | IdentifiedPatch) {
    this.patch = patch;
  }

  private createOscillator = (frequency: number) =>
    new OscillatorNode(this.context, {
      frequency,
      detune: this.patch.detune,
      type: this.patch.osc,
    });

  private createAmplifier = (): AmplifierNode => {
    const node = this.context.createGain();
    node.gain.value = 0;

    return { node, eg: this.patch.amp };
  };
}

// Singleton instance
export let SynthInstance: Synth | null = null;

// Fetch singleton instance
export const getSynthInstance = (): Synth => (SynthInstance ??= new Synth());

// /* ios enable sound output */
// window.addEventListener('touchstart', function(){
// if(audioContext.state !== 'running') audioContext.resume();
//   //create empty buffer
//   var buffer = audioContext.createBuffer(1, 1, 22050);
//   var source = audioContext.createBufferSource();
//   source.buffer = buffer;
//   source.connect(audioContext.destination);
//   source.start(0);
// }, false);
