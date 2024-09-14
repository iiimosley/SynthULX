import type { Envelope } from "@/common/envelope";
import type { FilterCutoff } from "@/common/filter";
import { KEYBOARD } from "@/common/keyboard";
import { INIT_PATCH, type IdentifiedPatch, type Patch } from "@/common/patch";
import { type Voice } from "@/common/synth";
import { DEFAULT_VOLUME } from "@/common/volume";

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

  constructor(patch: Patch | IdentifiedPatch = INIT_PATCH) {
    this.patch = patch;
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.output = this.context.createGain();
    this.output.connect(this.context.destination);

    Object.entries(KEYBOARD).forEach(([note, { frequency }]) => {
      const vco = new OscillatorNode(this.context, {
        frequency,
        detune: this.patch.detune,
        type: this.patch.osc,
      });

      const vcf = this.context.createBiquadFilter();
      vcf.type = "lowpass";
      vcf.frequency.value = this.patch.filter.frequency;
      vcf.Q.value = this.patch.filter.resonance;

      const vca = this.context.createGain();
      vca.gain.value = 0;

      vco.connect(vcf);
      vcf.connect(vca);
      vca.connect(this.output);
      vco.start();

      this.voices[note] = { vco, vca, vcf };
    });

    this.output.gain.value = DEFAULT_VOLUME;
  }

  get currentOsc() {
    return this.patch.osc;
  }

  get amp() {
    return this.patch.amp;
  }

  get filter() {
    return this.patch.filter;
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

  changeOscillator(type: Exclude<OscillatorType, "custom">) {
    this.patch.osc = type;

    for (const key in this.voices) {
      this.voices[key].vco.type = this.patch.osc;
    }
  }

  changeDetune(cents: number) {
    this.patch.detune = cents;

    for (const key in this.voices) {
      this.voices[key].vco.detune.value = cents;
    }
  }

  changeOutputVolume(volume: number) {
    this.output.gain.value = volume;
  }

  changeAmpEnvelope(eg: Envelope) {
    this.patch.amp = eg;
  }

  changeFilterCutoff(cutoff: FilterCutoff) {
    this.changeFilter(cutoff);

    const now = this.context.currentTime;
    for (const key in this.voices) {
      this.voices[key].vcf.frequency.setValueAtTime(this.patch.filter.frequency, now);
      this.voices[key].vcf.Q.setValueAtTime(this.patch.filter.resonance, now);
    }
  }

  changeFilter(filter: FilterCutoff | Envelope) {
    this.patch.filter = {
      ...this.patch.filter,
      ...filter,
    };
  }

  changePatch(patch: Patch | IdentifiedPatch) {
    this.patch = patch;
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
