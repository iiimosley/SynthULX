<script lang=ts>
  import PatchStore from "@/stores/patch";
  import { get } from "svelte/store";

  let patch = get(PatchStore);

  PatchStore.subscribe(value => {
    patch = value;
  });

  const updateFilterEg = () => {
    PatchStore.changeFilter(patch.filter);
  };
</script>

<div id="filterEG">
  <h4>Filter EG</h4>
  <input
    type="range"
    class="v-slide"
    id="filter-attack"
    min="0"
    max="3"
    step="0.01"
    bind:value={patch.filter.attack}
    on:input={updateFilterEg}
  />
  <input
    type="range"
    class="v-slide"
    id="filter-decay"
    min="0"
    max="1"
    step="0.01"
    bind:value={patch.filter.decay}
    on:input={updateFilterEg}
  />
  <input
    type="range"
    class="v-slide"
    id="filter-sustain"
    min="0"
    max="1"
    step="0.01"
    bind:value={patch.filter.sustain}
    on:input={updateFilterEg}
  />
  <input
    type="range"
    class="v-slide"
    id="filter-release"
    min="0"
    max="4.5"
    step="0.01"
    bind:value={patch.filter.release}
    on:input={updateFilterEg}
  />
  <div>
    <label for="filter-attack">A</label>
    <label for="filter-decay">D</label>
    <label for="filter-sustain">S</label>
    <label for="filter-release">R</label>
  </div>
</div>
