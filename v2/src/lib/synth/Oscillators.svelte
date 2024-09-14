<script lang="ts">
  import { SOUNDWAVE, type Soundwave } from '@/common/soundwaves';
  import PatchStore from '@/stores/patch';
  import { get } from 'svelte/store';

  let patch = get(PatchStore);

  PatchStore.subscribe(value => {
    patch = value;
  });

  const soundwaves = Object.entries(SOUNDWAVE) as [Soundwave, { title: string }][];
</script>

<div id="oscType">
  {#each soundwaves as [osc, {title}]}
    <div>
      <label for={osc}>{title}</label>
      <input 
        bind:group={patch.osc}
        on:change={() => PatchStore.changeOscillator(osc)} 
        type="radio" 
        name="osc" 
        id={osc} 
        value={osc} 
      />
    </div>
  {/each}
</div>
