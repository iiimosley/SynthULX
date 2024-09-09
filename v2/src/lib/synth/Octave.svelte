<script>
  import { OCTAVES } from '@/common/octaves';
  import { SynthInstance } from '@/engines/synth';
  import PatchStore from '@/stores/patch';

  const octaves = Object.entries(OCTAVES)
    .sort(([,curDetune],[,nextDetune]) => nextDetune - curDetune);
</script>

<div id="octave">
  <h4>transpose</h4>
  {#each octaves as [key, detune]}
    <div>
      <label class="text-right" for={`oct${key}`}>{key}</label>
      <input 
        on:change={() => SynthInstance?.changeDetune(detune)} 
        type="radio" 
        name="detune" 
        id={`oct${key}`}
        value={detune} 
        checked={detune === $PatchStore.detune}
      />
    </div>
  {/each}
</div>
