<script>
  export const octaves = {
    up2: 2,
    up1: 1,
    none: 0,
    down1: -1,
    down2: -2
  };
</script>

<div id="octave">
  <h4>transpose</h4>
  {#each Object.entries(octaves) as [key, detune]}
    <div>
      <label for={key}>{detune > 0 && "+"}{detune < 0 && "-"}{detune}</label>
      <input type="radio" name="detune" id={key} value={detune * 1200} checked={detune === 0}/>
    </div>
  {/each}
</div>
