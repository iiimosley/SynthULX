<script lang=ts>
  import PatchStore from "@/stores/patch";
  import { get } from "svelte/store";

  let patch = get(PatchStore);

  PatchStore.subscribe(value => {
    patch = value;
  });

  const updateFilterCutoff = () => {
    PatchStore.changeFilter(patch.filter);
  };
</script>

<div id="filter">
  <h4>Filter</h4>
  <div class="textOver">
    <input
      type="range"
      class="v-slide"
      id="filter-cutoff"
      min="100"
      max="15000"
      step="1"
      bind:value={patch.filter.frequency}
      on:input={updateFilterCutoff}
    />
    <label for="filter-cutoff">Frequency</label>
  </div>
  <div class="textOver">
    <input
      type="range"
      class="v-slide"
      id="filter-resonance"
      min="0.01"
      max="40"
      step="0.01"
      bind:value={patch.filter.resonance}
      on:input={updateFilterCutoff}
    />
    <label for="filter-resonance">Resonance</label>
  </div>
</div>
