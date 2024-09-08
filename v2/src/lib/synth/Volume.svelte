<script>
  import { DEFAULT_VOLUME } from "@/common/volume";
</script>

<div>
  <div class="textOver">
    <input
      type="range"
      class="v-slide"
      name="volume"
      id="volume"
      step=".01"
      min="-20"
      max="1"
      value={DEFAULT_VOLUME}
    />
    <label for="volume">volume</label>
  </div>
</div>
