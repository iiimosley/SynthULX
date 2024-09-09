<script lang=ts>
  import { DEFAULT_VOLUME } from "@/common/volume";
  import { SynthInstance } from "@/engines/synth";
</script>

<div>
  <div class="textOver">
    <input
      on:input={(event) => SynthInstance?.changeGain(event.currentTarget?.valueAsNumber)}
      type="range"
      class="v-slide"
      name="volume"
      id="volume"
      step=".01"
      min="0"
      max="0.6"
      value={DEFAULT_VOLUME}
    />
    <label for="volume">volume</label>
  </div>
</div>
