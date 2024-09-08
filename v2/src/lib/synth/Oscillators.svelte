<script lang="ts">
  import { SOUNDWAVE } from '@/common/soundwaves';
  import PatchStore from '@/stores/patch';
</script>

<div id="oscType">
  {#each Object.entries(SOUNDWAVE) as [osc, {title}]}
    <div>
      <label for={osc}>{title}</label>
      <input type="radio" name="osc" id={osc} value={osc} checked={osc === $PatchStore.osc}/>
    </div>
  {/each}
</div>
