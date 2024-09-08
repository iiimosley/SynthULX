<script lang=ts>
  import { KEYBOARD } from "@/common/keyboard";
  import KeyActions from "@/stores/keyboard";

  let showKeyNames = true;

  const getKeyClass = (key: string, note: string) => {
    let keyClasses = [];

    if (note.includes('#')) {
      keyClasses.push("flat");
    }

    if ($KeyActions.has(key)) {
      keyClasses.push(note.includes('#') ? "keyfillFlat" : "keyfill");
    }

    return keyClasses.join(" ");
  }

</script>

<svelte:window on:keydown|preventDefault={KeyActions.down} on:keyup|preventDefault={KeyActions.up}/>

<!-- <h1>{[...$KeyActions].join(", ")}</h1> -->
<div>
  <div id="keyMap">
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



