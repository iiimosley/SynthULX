<script lang="ts">
  import type { User } from "@/common/user";

  let user: User;
</script>

<div id="nav">
  <div>
    {#if user}
      <a id="logout">Logout</a>
    {:else}
      <a id="login">Login</a>
    {/if}
  </div>
  {#if user}
    <div id="userPatches">
      <a id="dropdown">Patches</a>
      <div id="patchDrop">
        {#each user.patches as patch}
          <div class="patchSelect">
            {patch.name}<span class="deleteChip">&times;</span>
          </div>
        {/each}
      </div>
    </div>
  {/if}
  <div id="startBuild">
    <span>Start SynthBuilder</span>
  </div>
</div>