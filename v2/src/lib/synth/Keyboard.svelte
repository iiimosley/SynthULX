<script lang=ts>
  import { KEYBOARD } from "@/common/keyboard";
  import PatchActions from "./PatchActions.svelte";

  let showKeyNames = true;

  const keys = new Set();

  function handleKeydown(event: KeyboardEvent) {
    keys.add(event.key);
  }

  function handleKeyup(event: KeyboardEvent) {
    keys.delete(event.key);
  }
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup}/>

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
    <PatchActions />
  </div>
</div>



