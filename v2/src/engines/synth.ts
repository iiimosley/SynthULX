import type { Envelope } from "@/common/envelope";
import { KEYBOARD } from "@/common/keyboard";
import { type IdentifiedPatch, type Patch } from "@/common/patch";
import { type Voice } from "@/common/synth";
import { DEFAULT_VOLUME } from "@/common/volume";
import PatchStore from "@/stores/patch";
import { get } from "svelte/store";

////// Terms //////
// VCO: Voltage Controlled Oscillator -- soundwave generator
// VCA: Voltage Controlled Amplifier -- soundwave loudness controller
// VCF: Voltage Controlled Filter -- soundwave harmonic content controller
// EG:  Envelope Generator -- controls the transition of soundwave properties over time
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

  constructor() {
    this.patch = get(PatchStore);
    this.context = new (window.AudioContext || window.webkitAudioContext)();

    this.output = this.context.createGain();
    this.output.gain.value = DEFAULT_VOLUME;
    this.output.connect(this.context.destination);

    Object.entries(KEYBOARD).forEach(([note, { frequency }]) => {
      const vco = new OscillatorNode(this.context, {
        frequency,
      });

      const vcf = this.context.createBiquadFilter();
      vcf.type = "lowpass";

      const vca = this.context.createGain();
      vca.gain.value = 0;

      vco.connect(vcf);
      vcf.connect(vca);
      vca.connect(this.output);
      vco.start();

      this.voices[note] = { vco, vca, vcf };
    });

    PatchStore.subscribe((patch) => {
      this.patch = patch;
      this.setPatch();
    });
  }

  changeOutputVolume(volume: number) {
    this.output.gain.value = volume;
  }

  play(key: string) {
    if (this.context.state === "suspended") this.context.resume();

    const { vca, vcf } = this.voices[key];
    const { amp, filter } = this.patch;

    this.engageEnvelope(vca.gain, amp, 1);
    this.engageEnvelope(vcf.frequency, filter, this.patch.filter.frequency);
  }

  stop(key: string) {
    const { vca, vcf } = this.voices[key];
    const { amp, filter } = this.patch;

    this.disengageEnvelope(vca.gain, amp);
    this.disengageEnvelope(vcf.frequency, filter);
  }

  private setPatch() {
    const now = this.context.currentTime;
    for (const key in this.voices) {
      let { vco, vcf } = this.voices[key];

      vco.type = this.patch.osc;
      vco.detune.value = this.patch.detune;
      vcf.frequency.setValueAtTime(this.patch.filter.frequency, now);
      vcf.Q.setValueAtTime(this.patch.filter.resonance, now);
    }
  }

  private engageEnvelope(param: AudioParam, eg: Envelope, peak: number) {
    const { attack, decay, sustain } = eg;

    param.cancelScheduledValues(0);
    const now = this.context.currentTime;

    param.setValueAtTime(0, now);
    param.linearRampToValueAtTime(peak, now + attack);
    param.linearRampToValueAtTime(peak * sustain, now + attack + decay);
  }

  private disengageEnvelope(param: AudioParam, eg: Envelope) {
    const { release } = eg;

    const currentValue = param.value;
    param.cancelScheduledValues(0);

    const now = this.context.currentTime;
    param.setValueAtTime(currentValue, now);
    param.linearRampToValueAtTime(0, now + release);
  }
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
