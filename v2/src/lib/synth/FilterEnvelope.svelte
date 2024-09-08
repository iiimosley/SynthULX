<script>
  import PatchStore from "@/stores/patch";
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
    value={$PatchStore.filter.attack}
  />
  <input
    type="range"
    class="v-slide"
    id="filter-decay"
    min="0"
    max="1"
    step="0.01"
    value={$PatchStore.filter.decay}
  />
  <input
    type="range"
    class="v-slide"
    id="filter-sustain"
    min="0"
    max="1"
    step="0.01"
    value={$PatchStore.filter.sustain}
  />
  <input
    type="range"
    class="v-slide"
    id="filter-release"
    min="0"
    max="4.5"
    step="0.01"
    value={$PatchStore.filter.release}
  />
  <div>
    <label for="filter-attack">A</label>
    <label for="filter-decay">D</label>
    <label for="filter-sustain">S</label>
    <label for="filter-release">R</label>
  </div>
</div>
