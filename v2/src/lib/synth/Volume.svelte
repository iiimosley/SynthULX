<script lang=ts>
  import { DEFAULT_VOLUME } from "@/common/volume";
  import { getSynthInstance } from "@/engines/synth";

  const synth = getSynthInstance();
</script>

<div>
  <div class="textOver">
    <input
      on:input={(event) => synth.changeOutputVolume(event.currentTarget?.valueAsNumber)}
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
