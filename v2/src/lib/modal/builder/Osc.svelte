<script lang=ts>
    import { SOUNDWAVE, SOUNDWAVES, type SoundwaveDetails, type Soundwave } from "@/common/soundwaves";

    let oscDetail: SoundwaveDetails;
    let setOsc: Soundwave | undefined;

    const oscPreview = (wave: Soundwave) => {
        oscDetail = SOUNDWAVE[wave];
        setOsc = wave
    }

    const oscClear = () => {
        setOsc = undefined;
    }
</script>

<div id="eduWrap">
<div id="oscAlert"><h2>please select an oscillator</h2></div>
<div id="oscView">
    <main>
        <h1>Oscillator</h1>
        <p>the core of any synthesizer</p>
        <div id="oscDetail">
            {#if oscDetail}
            <h3>{oscDetail.title}</h3>
            <h4><span>Harmonic Content:</span> {oscDetail.harmonicContent}</h4>
            <h5>({oscDetail.description})</h5>
                {#if oscDetail.harmonicContent === 1}
                    <p><strong class="attention">Note:</strong> Filter modifications will have little to no affect on sine waves as they have no additive harmonics</p>
                {/if}
            {/if}
        </div>
    </main>
    <aside>
        {#each SOUNDWAVES as wave}
            <div id={`${wave}-preview`}>
                <button id="startSine" on:mousedown={() => oscPreview(wave)} on:mouseup={() => oscClear()}><div></div></button>
                <div class="oscScope" id="{`${wave}Animate`}"></div>
            </div>
        {/each}
    </aside>
    <div class="continueSection"><span id="pickOsc">continue with selected soundwave</span></div>
</div>
    <span class="closeChip">&times;</span>
</div>