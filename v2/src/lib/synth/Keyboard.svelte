<script lang=ts>
  import { KEYBOARD } from "@/common/keyboard";
  import KeyActions from "@/stores/keyboard";

  let showKeyNames = true;
</script>

<svelte:window on:keydown={KeyActions.down} on:keyup={KeyActions.up}/>

<div>
  <div id="keyMap">
    {#each Object.entries(KEYBOARD) as [key, note]}
      <div class={note.includes('#') ? "flat" : ""} id={`key${key}`}>
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



