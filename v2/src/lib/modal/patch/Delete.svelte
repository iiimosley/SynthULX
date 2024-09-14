<script lang=ts>
    import type { IdentifiedPatch } from "@/common/patch";

    let patch: IdentifiedPatch;
</script>

<div class="patchModal">
    <div class="modalContent">
        <h3>Are you sure you want to delete patch....</h3>
        <h2 id="delete-{patch.id}"><span id="toDelete">{patch.name}</span>?</h2>
        <a id="deletePatch" class="patchFeat">Delete Patch</a>
    </div>
    <span class="closeChip">&times;</span>
</div>
