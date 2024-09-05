<script>
  import { KEYBOARD } from "@/common/keyboard";
</script>

<div>
  <div id="keyMap">
    {#each Object.entries(KEYBOARD) as [code, values]}
      <div class={values.note.includes('#') ? "flat" : ""} id={`key${code}`}>
        <span style="display: none" class={values.note.includes('#') ? "offNote" : ""}>
          {values.key.toUpperCase()}
        </span>
      </div>
    {/each}
  </div>
  <div id="keyCheck">
    <input type="checkbox" id="showKeys" checked />
    <label for="showKeys"
      >Show Key Map
      <sup>QWERTY</sup>
    </label>
    <div id="userTools"></div>
  </div>
</div>
