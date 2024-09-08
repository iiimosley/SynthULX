<script>
  import { OCTAVES } from '@/common/octaves';
  import PatchStore from '@/stores/patch';
</script>

<div id="octave">
  <h4>transpose</h4>
  {#each Object.entries(OCTAVES) as [key, detune]}
    <div>
      <label class="text-right" for={key}>{detune > OCTAVES.NONE ? "+" : ""}{detune / 1200}</label>
      <input type="radio" name="detune" id={key} value={detune} checked={detune === $PatchStore.detune}/>
    </div>
  {/each}
</div>
