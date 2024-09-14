import { writable } from "svelte/store";
import { INIT_PATCH, type IdentifiedPatch } from "@/common/patch";
import type { Soundwave } from "@/common/soundwaves";
import type { Envelope } from "@/common/envelope";
import type { FilterCutoff } from "@/common/filter";

const initPatchStore = () => {
  const { subscribe, set, update } = writable<IdentifiedPatch>(INIT_PATCH);

  return {
    subscribe,
    set,
    changeOscillator: (type: Soundwave) => {
      update((patch) => ({ ...patch, osc: type }));
    },
    changeDetune: (cents: number) => {
      update((patch) => ({ ...patch, detune: cents }));
    },
    changeAmpEnvelope: (eg: Envelope) => {
      update((patch) => ({ ...patch, amp: eg }));
    },
    changeFilter: (filter: FilterCutoff | Envelope) => {
      update((patch) => ({ ...patch, filter: { ...patch.filter, ...filter } }));
    },
    clear: () => set(INIT_PATCH),
  };
};

const PatchStore = initPatchStore();

export default PatchStore;
