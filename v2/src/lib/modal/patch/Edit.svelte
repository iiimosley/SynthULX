<script lang=ts>
    import type { IdentifiedPatch } from "@/common/patch";

    let patch: IdentifiedPatch[];
</script>

<div class="patchModal">
    <div class="modalContent">
        <h2>Edit patch</h2>
        <p>Overwrite all current setting for patch...</p>
        <select id="patchOver">
            {#each patch as p}
            <option>{p.name}</option>
            {/each}
        </select>
        <div>
            <label for="changeName">Rename patch?</label>
            <input type="checkbox" name="changeName" id="changeName">
        </div>
        <input type="text" name="newName" id="newName" disabled>
        <a id="editPatch" class="patchFeat">Overwrite Patch</a>
    </div>
    <span class="closeChip">&times;</span>
</div>
