import type { FilterCutoff } from "@/common/filter";
import { KEYBOARD } from "@/common/keyboard";
import { INIT_PATCH, type IdentifiedPatch, type Patch } from "@/common/patch";
import { type Voice } from "@/common/synth";
import { DEFAULT_VOLUME } from "@/common/volume";
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
    const { attack, decay, sustain } = this.patch.amp;
    const {
      frequency,
      attack: filterAttack,
      decay: filterDecay,
      sustain: filterSustain,
    } = this.patch.filter;

    vca.gain.cancelScheduledValues(0);
    vcf.frequency.cancelScheduledValues(0);

    const now = this.context.currentTime;
    vca.gain.setValueAtTime(0, now);
    vcf.frequency.setValueAtTime(0, now);

    vca.gain.linearRampToValueAtTime(1, now + attack);
    vcf.frequency.linearRampToValueAtTime(frequency, now + filterAttack);

    vca.gain.linearRampToValueAtTime(sustain, now + attack + decay);
    vcf.frequency.linearRampToValueAtTime(frequency * filterSustain, now + filterAttack + filterDecay);
  }

  stop(key: string) {
    const { vca, vcf } = this.voices[key];
    const { release } = this.patch.amp;
    const { release: filterRelease } = this.patch.filter;

    const currentGain = vca.gain.value;
    const currentFrequency = vcf.frequency.value;
    vca.gain.cancelScheduledValues(0);
    vcf.frequency.cancelScheduledValues(0);

    const now = this.context.currentTime;
    vca.gain.setValueAtTime(currentGain, now);
    vcf.frequency.setValueAtTime(currentFrequency, now);
    vca.gain.linearRampToValueAtTime(0, now + release);
    vcf.frequency.linearRampToValueAtTime(0, now + filterRelease);
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

    for (const key in this.voices) {
      this.voices[key].vcf.frequency.value = this.patch.filter.frequency;
      this.voices[key].vcf.Q.value = this.patch.filter.resonance;
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
