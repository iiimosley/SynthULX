import { KEYBOARD } from "@/common/keyboard";
import type { IdentifiedPatch } from "@/common/patch";
import { DEFAULT_VOLUME } from "@/common/volume";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export class Synth {
  private context: AudioContext;
  private gainNode: GainNode;
  private oscillators: Record<string, OscillatorNode> = {};
  private patch: IdentifiedPatch;

  constructor(patch: IdentifiedPatch, volume: number = DEFAULT_VOLUME) {
    this.patch = patch;
    this.context = new (window.AudioContext ||
      window.webkitAudioContext)();

    this.gainNode = this.context.createGain();
    this.gainNode.gain.value = volume;

    Object.entries(KEYBOARD).forEach(([note, { frequency }]) => {
      const osc = new OscillatorNode(this.context, {
        frequency,
        detune: this.patch.detune,
        type: this.patch.osc,
      });

      osc.connect(this.gainNode);

      this.oscillators[note] = osc;
    });
  }

  play(keys: string[]) {
    if (this.context.state === "suspended") 
      this.context.resume();

    keys.forEach((key) => {
      if (this.oscillators[key] && this.oscillators[key].numberOfInputs) {
        this.oscillators[key].start();
      }
    });
  }

  stop(keys: string[]) {
    keys.forEach((key) => {
      this.oscillators[key].stop();
    });
  }

  changeOscillator(type: OscillatorType) {
    for (const key in this.oscillators) {
      this.oscillators[key].type = type;
    }
  }

  changeDetune(cents: number) {
    for (const key in this.oscillators) {
      this.oscillators[key].detune.value = cents;
    }
  }

  changeGain(volume: number) {
    this.gainNode.gain.value = volume;
  }

  setPath(patch: IdentifiedPatch) {
    this.patch = patch;
  }
}



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

