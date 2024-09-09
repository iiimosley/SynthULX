import { writable } from "svelte/store";
import { KEYBOARD } from "@/common/keyboard";
import { getSynthInstance } from "@/engines/synth";

const initializeKeyboardStore = () => {
  const keys = new Set<string>();

  const { subscribe, update, set } = writable(keys);

  return {
    subscribe,
    down: (event: KeyboardEvent) => {
      // initialize singleton synth by gesture
      const synth = getSynthInstance();

      if (event.key in KEYBOARD && !keys.has(event.key)) {
        update((k) => k.add(event.key));
        synth.play(event.key);
      }
    },
    up: (event: KeyboardEvent) => {
      // initialize singleton synth by gesture
      const synth = getSynthInstance();
      
      if (event.key in KEYBOARD) {
        update((k) => {
          k.delete(event.key);
          return k;
        });
        synth.stop(event.key);
      }
    },
    reset: () => set(new Set<string>()),
  };
};

const KeyboardActions = initializeKeyboardStore();

export default KeyboardActions;
