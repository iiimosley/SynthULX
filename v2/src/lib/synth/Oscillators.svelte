<script lang="ts">
  import { SOUNDWAVE } from '@/common/soundwaves';
</script>

<div id="oscType">
  {#each Object.entries(SOUNDWAVE) as [key, {title}]}
    <div>
      <label for={key}>{title}</label>
      <input type="radio" name="osc" id={key} value={key} checked={key === 'sine'}/>
    </div>
  {/each}
</div>
