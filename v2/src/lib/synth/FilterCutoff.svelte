<script lang=ts>
  import { SynthInstance } from "@/engines/synth";
  import PatchStore from "@/stores/patch";

  let { filter } = SynthInstance ?? $PatchStore;

  const updateFilterCutoff = () => {
    SynthInstance?.changeFilterCutoff(filter);
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
      bind:value={filter.frequency}
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
      bind:value={filter.resonance}
      on:input={updateFilterCutoff}
    />
    <label for="filter-resonance">Resonance</label>
  </div>
</div>
