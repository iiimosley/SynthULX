<script lang="ts">
  import { DEFAULT_PATCHES, type PatchSet } from "@/common/patch";

  const userPatchSet: PatchSet = DEFAULT_PATCHES;
</script>

<div>
  <a id="logout">Logout</a>
</div>
<div id="userPatches">
  <a id="dropdown">Patches</a>
  <div id="patchDrop">
    {#each Object.values(userPatchSet) as patch}
      <div class="patchSelect">
        {patch.name}<span class="deleteChip">&times;</span>
      </div>
    {/each}
  </div>
</div>
<div id="startBuild">
  <span>Start SynthBuilder</span>
</div>
