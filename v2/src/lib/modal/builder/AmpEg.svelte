<script lang=ts>
    import type { EnvelopeParam } from "@/common/envelope";

    const EG_DETAILS = {
        attack: "the amount of time it takes for the oscillator to reach it's maximum volume",
        decay: "the amount of time it takes for the oscillator's volume to drop to its sustained amplitude",
        sustain: "the continued volume of the oscillator for the duration of the keypress",
        release: "the amount of time it takes for the oscillator to drop back down to 0 after the keypress release"
    } as const;

    let egTitle: string;
    let egDetail: typeof EG_DETAILS[EnvelopeParam];

    const focusEgParam = (param: EnvelopeParam) => {
        egDetail = EG_DETAILS[param];
        egTitle = param.toUpperCase()
    }
</script>

<div id="ampView">
    <main>
        <h1>Amplitude Envelope Generator</h1>
        <p>where the oscillator sets sail</p>
        <div id="eduAmpEG">
            <input type="range" on:click={() => focusEgParam("attack")} class="v-slide" id="attack" min="0" max="1" step="0.01" value="0.4"> 
            <input type="range" on:click={() => focusEgParam("decay")} class="v-slide" id="decay" min="0" max="1" step="0.01" value="0.8"> 
            <input type="range" on:click={() => focusEgParam("sustain")} class="v-slide" id="sustain" min="0" max="1" step="0.01" value="0.6"> 
            <input type="range" on:click={() => focusEgParam("release")} class="v-slide" id="release" min="0" max="1" step="0.01" value="0.1"> 
            <div>
                <label for="attack">A</label>
                <label for="decay">D</label>
                <label for="sustain">S</label>
                <label for="release">R</label>
            </div>
        </div>
        <div id="ampDetail">
            {#if egTitle && egDetail}
            <h4>{egTitle}</h4>
            <p>{egDetail}</p>
            {/if} 
        </div>
    </main>
    <aside>
        <div id="ampChart">
            <canvas id="ampADSR"></canvas>
        </div>
        <div class="spacebarEvent spacebarAnimate">
            <p>press spacebar to play oscillator</p>
        </div>
    </aside>
    <div class="continueSection">
        <span id="pickAmp">continue with selected parameters</span>
    </div>
</div>
<span class="closeChip">&times;</span>
