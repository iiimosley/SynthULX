import { writable } from "svelte/store";
import { INIT_PATCH, type IdentifiedPatch } from "@/common/patch";

const initPatchStore = () => {
  const { subscribe, set } = writable<IdentifiedPatch>(INIT_PATCH);

  return {
    subscribe,
    set,
    clear: () => set(INIT_PATCH),
  };
};

const PatchStore = initPatchStore();

export default PatchStore;
