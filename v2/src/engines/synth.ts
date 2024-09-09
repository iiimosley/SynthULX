import { KEYBOARD } from "@/common/keyboard";
import { INIT_PATCH, type IdentifiedPatch } from "@/common/patch";
import { DEFAULT_VOLUME, NOMINAL_GAIN } from "@/common/volume";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

///// Terms /////
// VCO: Voltage Controlled Oscillator -- soundwave generator
// VCA: Voltage Controlled Amplifier -- soundwave amplitude controller
// VCF: Voltage Controlled Filter -- soundwave frequency modulation controller
// EG:  Envelope Generator -- controls the transition of soundwaves from one state to another
// Voices: aka, polyphony -- the number of notes that can be played simultaneously
// Patch: a set of parameters that define the sound of the synthesizer
/////////////////
export class Synth {
  private patch: IdentifiedPatch;
  private context: AudioContext;
  private output: GainNode;
  private voices: Record<string, { vco: OscillatorNode; vca: GainNode }> = {};

  constructor(patch: IdentifiedPatch, volume: number) {
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

      const vca = this.context.createGain();
      vca.gain.value = NOMINAL_GAIN;

      vco.connect(vca);

      this.voices[note] = {
        vco: vco,
        vca,
      };

      vco.start();
    });

    this.output.gain.value = DEFAULT_VOLUME;
  }

  get currentOsc() {
    return this.patch.osc;
  }

  play(key: string) {
    if (this.context.state === "suspended") this.context.resume();

    this.voices[key]?.vca.connect(this.output);
  }

  stop(key: string) {
    this.voices[key]?.vca.disconnect(this.output);
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
    this.output.gain.value = volume
  }

  setPath(patch: IdentifiedPatch) {
    this.patch = patch;
  }
}

// Singleton instance
export let SynthInstance: Synth | null = null;

// Function to get the singleton instance
export const getSynthInstance = (): Synth =>
  (SynthInstance ??= new Synth(INIT_PATCH, DEFAULT_VOLUME));

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
