import { writable } from "svelte/store";
import { KEYBOARD } from "@/common/keyboard";
import { getSynthInstance } from "@/engines/synth";

const synth = getSynthInstance();

const initKeyStore = () => {
  const keys = new Set<string>();

  const { subscribe, update, set } = writable(keys);

  return {
    subscribe,
    down: (event: KeyboardEvent) => {
      if (event.key in KEYBOARD) {
        update((k) => k.add(event.key));
        if (keys.has(event.key)) {
          synth.play(event.key);
        }
      }
    },
    up: (event: KeyboardEvent) => {
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

const KeyActions = initKeyStore();

export default KeyActions;
