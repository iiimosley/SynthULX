<script lang=ts>
  import { KEYBOARD } from "@/common/keyboard";
  import KeyboardActions from "@/stores/keyboard";

  let showKeyNames = true;
</script>

<svelte:window on:keydown|preventDefault={KeyboardActions.down} on:keyup|preventDefault={KeyboardActions.up}/>

<div>
  <div id="keyMap" class="w-synth">
    {#each Object.entries(KEYBOARD) as [key, { isAccidental }]}
      <div id={`key${key}`} 
        class={(isAccidental ? "flat" : "") + ($KeyboardActions.has(key) ? isAccidental ? " keyFillFlat" : " keyFill" : "")}
      >
        {#if showKeyNames}
          <span class={isAccidental ? "offNote" : ""}>
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



