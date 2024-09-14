<script lang=ts>
    let name: string;
    let isDelete: boolean;
</script>

<div id="leaving">
    {#if isDelete}
        <h2>{name} successfully deleted 🗑️</h2>
    {:else}
        <h2>{name} successfully saved 👍</h2>
    {/if}
</div>