<script lang=ts>
  import PatchStore from "@/stores/patch";
  import { SynthInstance } from "../../engines/synth";

  let { attack, decay, sustain, release } = SynthInstance?.amp ?? $PatchStore?.amp;

  const updateAmp = () => {
    SynthInstance?.changeAmpEnvelope({attack, decay, sustain, release});
  };
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
    bind:value={attack}
    on:input={updateAmp}
  />
  <input
    type="range"
    class="v-slide"
    id="amp-decay"
    min="0.01"
    max="1"
    step="0.01"
    bind:value={decay}
    on:input={updateAmp}
  />
  <input
    type="range"
    class="v-slide"
    id="amp-sustain"
    min="0.01"
    max="1"
    step="0.01"
    bind:value={sustain}
    on:input={updateAmp}
  />
  <input
    type="range"
    class="v-slide"
    id="ampRelease"
    min="0.01"
    max="4.5"
    step="0.01"
    bind:value={release}
    on:input={updateAmp}
  />
  <div>
    <label for="amp-attack">A</label>
    <label for="amp-decay">D</label>
    <label for="amp-attack">S</label>
    <label for="amp-release">R</label>
  </div>
</div>
