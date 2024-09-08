import { KEYBOARD } from "@/common/keyboard";
import { INIT_PATCH, type IdentifiedPatch } from "@/common/patch";
import { DEFAULT_VOLUME } from "@/common/volume";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export class Synth {
  private patch: IdentifiedPatch;
  private context: AudioContext;
  private gainNode: GainNode;
  private voices: Record<
    string,
    { state: "playing" | "stopped"; osc: OscillatorNode; gain: GainNode }
  > = {};

  constructor(patch: IdentifiedPatch, volume: number) {
    this.patch = patch;
    this.context = new (window.AudioContext || window.webkitAudioContext)();

    this.gainNode = this.context.createGain();
    
    Object.entries(KEYBOARD).forEach(([note, { frequency }]) => {
      const osc = new OscillatorNode(this.context, {
        frequency,
        detune: this.patch.detune,
        type: this.patch.osc,
      });
      
      const gain = this.context.createGain();
      gain.gain.value = volume;
      
      osc.connect(gain);

      this.voices[note] = {
        state: "stopped",
        osc,
        gain,
      };

      osc.start(0);
    });
  }

  play(key: string) {
    if (this.context.state === "suspended") this.context.resume();

    const voice = this.voices[key];

    if (voice && voice.state === "stopped") {
      console.log("PLAYING", key);

      voice.state = "playing";
      voice.gain.connect(this.context.destination);
    }
  }

  stop(key: string) {
    const voice = this.voices[key];

    if (voice) {
      console.log("STOPPING", key);

      voice.state = "stopped";
      voice.gain.disconnect(this.context.destination);
    }
  }

  changeOscillator(type: OscillatorType) {
    for (const key in this.voices) {
      this.voices[key].osc.type = type;
    }
  }

  changeDetune(cents: number) {
    for (const key in this.voices) {
      this.voices[key].osc.detune.value = cents;
    }
  }

  changeGain(volume: number) {
    for (const key in this.voices) {
      this.voices[key].gain.gain.value = volume;
    }
  }

  setPath(patch: IdentifiedPatch) {
    this.patch = patch;
  }
}

// Singleton instance
let synthInstance: Synth | null = null;

// Function to get the singleton instance
export const getSynthInstance = (): Synth =>
  (synthInstance ??= new Synth(INIT_PATCH, DEFAULT_VOLUME));

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
