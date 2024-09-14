<script>
  import { OCTAVES } from '@/common/octaves';
  import PatchStore from '@/stores/patch';
  import { get } from "svelte/store";

  let patch = get(PatchStore);

  PatchStore.subscribe(value => {
    patch = value;
  });

  const octaves = Object.entries(OCTAVES)
    .sort(([,curDetune],[,nextDetune]) => nextDetune - curDetune);
</script>

<div id="octave">
  <h4>transpose</h4>
  {#each octaves as [key, detune]}
    <div>
      <label class="text-right" for={`oct${key}`}>{key}</label>
      <input 
        bind:group={patch.detune}
        on:change={() => PatchStore.changeDetune(detune)} 
        type="radio" 
        name="detune" 
        id={`oct${key}`}
        value={detune} 
        checked={detune === patch.detune}
      />
    </div>
  {/each}
</div>
