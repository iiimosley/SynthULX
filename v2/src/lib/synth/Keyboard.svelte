<script lang=ts>
  import { KEYBOARD } from "@/common/keyboard";
  import KeyActions from "@/stores/keyboard";

  let showKeyNames = true;

</script>

<svelte:window on:keydown|preventDefault={KeyActions.down} on:keyup|preventDefault={KeyActions.up}/>

<div>
  <div id="keyMap" class="w-synth">
    {#each Object.entries(KEYBOARD) as [key, note]}
      <div id={`key${key}`} 
        class={(note.includes('#') ? "flat" : "") + ($KeyActions.has(key) ? note.includes('#') ? " keyFillFlat" : " keyFill" : "")}
      >
        {#if showKeyNames}
          <span class={note.includes('#') ? "offNote" : ""}>
            {key.toUpperCase()}
          </span>
        {/if}
      </div>
    {/each}
  </div>

  <div id="keyCheck">
    <input type="checkbox" bind:checked={showKeyNames}/>
    <label for="showKeys">
      Show Key Map
      <sup>QWERTY</sup>
    </label>
    <!-- Only allow if User is logged in -->
    <button id="callSave">Save Patch</button>
    <button id="callEdit">Edit Patch</button>
  </div>
</div>



