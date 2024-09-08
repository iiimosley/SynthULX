import { writable } from "svelte/store";
import { KEYBOARD } from "@/common/keyboard";
import { getSynthInstance } from "@/engines/synth";

const initKeyBoardStore = () => {
  const keys = new Set<string>();

  const { subscribe, update, set } = writable(keys);

  return {
    subscribe,
    down: (event: KeyboardEvent) => {
      // initialize singleton synth by gesture
      const synth = getSynthInstance();

      if (event.key in KEYBOARD) {
        update((k) => k.add(event.key));
        if (keys.has(event.key)) {
          synth.play(event.key);
        }
      }
    },
    up: (event: KeyboardEvent) => {
      // initialize singleton synth by gesture
      const synth = getSynthInstance();

      update((k) => {
        if (event.key in KEYBOARD) {
          k.delete(event.key);
          synth.stop(event.key);
        }
        return k;
      });
    },
    reset: () => set(new Set<string>()),
  };
};

const KeyboardActions = initKeyBoardStore();

export default KeyboardActions;
