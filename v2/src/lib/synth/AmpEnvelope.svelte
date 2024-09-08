<script>
  import PatchStore from "@/stores/patch";
</script>

<div id="ampEG">
  <h4>Amp EG</h4>
  <input
    type="range"
    class="v-slide"
    id="amp-attack"
    min="0.01"
    max="3"
    step="0.01"
    value={$PatchStore.amp.attack}
  />
  <input
    type="range"
    class="v-slide"
    id="amp-decay"
    min="0.01"
    max="1"
    step="0.01"
    value={$PatchStore.amp.decay}
  />
  <input
    type="range"
    class="v-slide"
    id="amp-sustain"
    min="0.01"
    max="1"
    step="0.01"
    value={$PatchStore.amp.sustain}
  />
  <input
    type="range"
    class="v-slide"
    id="ampRelease"
    min="0.01"
    max="4.5"
    step="0.01"
    value={$PatchStore.amp.release}
  />
  <div>
    <label for="amp-attack">A</label>
    <label for="amp-decay">D</label>
    <label for="amp-attack">S</label>
    <label for="amp-release">R</label>
  </div>
</div>
