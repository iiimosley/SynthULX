<script>
  import PatchStore from "@/stores/patch";
</script>

<div id="filter">
  <h4>Filter</h4>
  <div class="textOver">
    <input
      type="range"
      class="v-slide"
      id="filter-cutoff"
      min="100"
      max="8000"
      step="10"
      value={$PatchStore.filter.cutoff}
    />
    <label for="filter-cutoff">Cutoff</label>
  </div>
  <div class="textOver">
    <input
      type="range"
      class="v-slide"
      id="filter-resonance"
      min="0"
      max="18"
      step="1"
      value={$PatchStore.filter.resonance}
    />
    <label for="filter-resonance">Resonance</label>
  </div>
</div>
