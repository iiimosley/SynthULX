<script lang="ts">
  import { soundwaves } from '@/common/constants/soundwaves';
</script>

<div id="oscType">
  {#each soundwaves as wave}
    <div>
      <label for={wave}>{wave}</label>
      <input type="radio" name="osc" id={wave} value={wave} checked={wave === 'sine'}/>
    </div>
  {/each}
</div>
