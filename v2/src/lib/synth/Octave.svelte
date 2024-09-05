<script>
  import { OCTAVES } from '@/common/octaves';
</script>

<div id="octave">
  <h4>transpose</h4>
  {#each Object.entries(OCTAVES) as [key, detune]}
    <div>
      <label for={key}>{detune > OCTAVES.NONE && "+"}{detune < 0 && "-"}{detune}</label>
      <input type="radio" name="detune" id={key} value={detune * 1200} checked={detune === OCTAVES.NONE}/>
    </div>
  {/each}
</div>
