<script lang="ts">
  import { SOUNDWAVE } from '@/common/soundwaves';
  import { SynthInstance } from '@/engines/synth';
  import PatchStore from '@/stores/patch';

  const soundwaves = Object.entries(SOUNDWAVE) as [OscillatorType, { title: string }][];
</script>

<div id="oscType">
  {#each soundwaves as [osc, {title}]}
    <div>
      <label for={osc}>{title}</label>
      <input 
        on:change={() => SynthInstance?.changeOscillator(osc)} 
        type="radio" 
        name="osc" 
        id={osc} 
        value={osc} 
        checked={osc === (SynthInstance?.currentOsc ?? $PatchStore.osc)}
      />
    </div>
  {/each}
</div>
