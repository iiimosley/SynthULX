import { writable } from "svelte/store";
import { type Patch } from "../common/patch";

export const BUILDER_STATES = {
  OSC: "osc",
  FILTER: "filter",
  FILTER_EG: "filter-eg",
  AMP_EG: "amp-eg",
} as const;

const initPatchBuilderStore = () => {
  type BuilderState = {
    state: typeof BUILDER_STATES[keyof typeof BUILDER_STATES],
    patch?: Partial<Patch>,
  }

  const BUILDER_STATE_INIT: BuilderState = {
    state: BUILDER_STATES.OSC,
  };

  const { subscribe, update, set } = writable<BuilderState>(BUILDER_STATE_INIT);

  return {
    subscribe,
    setState: ({ state, patch }: BuilderState) =>
      update((buildState) => ({
        patch: {
          ...buildState.patch,
          ...patch,
        },
        state,
      })),
    clear: () => set(BUILDER_STATE_INIT),
  };
};

const PatchBuilderStore = initPatchBuilderStore();

export default PatchBuilderStore;
