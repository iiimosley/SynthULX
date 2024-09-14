<script lang=ts>
  import { SynthInstance } from "@/engines/synth";
  import PatchStore from "@/stores/patch";

  let { filter } = SynthInstance ?? $PatchStore;

  const updateFilterEg = () => {
    SynthInstance?.changeFilter(filter);
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
    bind:value={filter.attack}
    on:input={updateFilterEg}
  />
  <input
    type="range"
    class="v-slide"
    id="filter-decay"
    min="0"
    max="1"
    step="0.01"
    bind:value={filter.decay}
    on:input={updateFilterEg}
  />
  <input
    type="range"
    class="v-slide"
    id="filter-sustain"
    min="0"
    max="1"
    step="0.01"
    bind:value={filter.sustain}
    on:input={updateFilterEg}
  />
  <input
    type="range"
    class="v-slide"
    id="filter-release"
    min="0"
    max="4.5"
    step="0.01"
    bind:value={filter.release}
    on:input={updateFilterEg}
  />
  <div>
    <label for="filter-attack">A</label>
    <label for="filter-decay">D</label>
    <label for="filter-sustain">S</label>
    <label for="filter-release">R</label>
  </div>
</div>
