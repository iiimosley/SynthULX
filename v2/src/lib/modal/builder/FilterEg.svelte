<script lang=ts>
    import type { EnvelopeParam } from "@/common/envelope";

    const EG_DETAILS = {
        attack: "the amount of time it takes for the filter to reach it's highest frequency from the cutoff and accentuates the volume of those frequencies",
        decay: "the amount of time it takes for the filter's frequency to drop to its sustained frequency",
        sustain: "the continued frequency level of the modulated filter for the duration of the keypress",
        release: "the amount of time it takes for the filter to drop back down to it's original state after the keypress release"
    } as const;

    let egTitle: string;
    let egDetail: typeof EG_DETAILS[EnvelopeParam];

    const focusEgParam = (param: EnvelopeParam) => {
        egDetail = EG_DETAILS[param];
        egTitle = param.toUpperCase()
    }
</script>

<div id="filterEGView">
    <main>
        <h1>Filter Envelope Generator</h1>
        <p>where the real fun starts</p>
        <div id="eduFilterEG">
            <input type="range" on:click={() => focusEgParam("attack")} class="v-slide" id="attack" min="0" max="1" step="0.01" value="0">
            <input type="range" on:click={() => focusEgParam("decay")} class="v-slide" id="decay" min="0" max="1" step="0.01" value="0">
            <input type="range" on:click={() => focusEgParam("sustain")} class="v-slide" id="sustain" min="0" max="1" step="0.01" value="0">
            <input type="range" on:click={() => focusEgParam("release")} class="v-slide" id="release" min="0" max="1" step="0.01" value="0">
            <div>
                <label for="attack">A</label>
                <label for="decay">D</label>
                <label for="attack">S</label>
                <label for="release">R</label>
            </div>
        </div>
        <div id="filterDetail">
            {#if egTitle && egDetail}
            <h4>{egTitle}</h4>
            <p>{egDetail}</p>
            {/if} 
        </div>
    </main>
    <aside>
        <div id="filterChart">
            <canvas id="filterADSR"></canvas>
        </div>
        <div class="spacebarEvent">
            <p>press spacebar to play oscillator</p>
        </div>
    </aside>
    <div class="continueSection">
        <span id="pickFilter">continue with selected parameters</span>
    </div>
</div>
<span class="closeChip">&times;</span>