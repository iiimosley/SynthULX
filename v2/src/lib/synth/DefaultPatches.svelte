<script>
  import PatchStore from "@/stores/patch";
  import { DEFAULT_PATCHES } from "@/common/patch";
</script>

<div id="patchWrap">
  <h3>patches</h3>
  <div id="patchBtns">
    {#each DEFAULT_PATCHES as patch}
      <input type="radio" name="default-patch" id={patch.id} on:click={() => PatchStore.set(patch)}>
    {/each}
  </div>
</div>
