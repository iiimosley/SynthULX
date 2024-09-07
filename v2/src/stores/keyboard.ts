import { writable } from "svelte/store";

const initKeyStore = () => {
  const keys = new Set<string>();

  const { subscribe, update, set } = writable(keys);

  return {
    subscribe,
    down: (event: KeyboardEvent) => {
      update((k) => k.add(event.key));
    },
    up: (event: KeyboardEvent) => {
      update((k) => {
        k.delete(event.key)
        return k;
      });
    },
    reset: () => set(new Set<string>()),
  };
}

const KeyActions = initKeyStore();

export default KeyActions;
