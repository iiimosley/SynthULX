<script lang="ts">
  import { SOUNDWAVE } from '@/common/soundwaves';
  import PatchStore from '@/stores/patch';
  import { SynthInstance } from '../../engines/synth';

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
