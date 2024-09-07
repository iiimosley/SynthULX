<script lang=ts>
    let filterFocus: 'cutoff' | 'resonance' | undefined = undefined;
</script>

<div id="cutoffWrap">
    <main>
        <h1>Filter</h1>
        <h3>LPF: Low Pass Filter</h3>
        <p>sets highest harmonic frequency to be heard from the oscillator</p>
        <div id="eduFilter">
            <div class="textOver">
                <input type="range" on:click={() => { filterFocus = 'cutoff' }} class="v-slide" id="fCutoff" min="200" max="10000" step="10" value="6000">
                <label for="fCutoff">Cutoff</label>
            </div>
            <div class="textOver">
                <input type="range" on:click={() => { filterFocus = 'resonance' }} class="v-slide" id="fResonance" min="1" max="7" step="0.1" value="1">
                <label for="fResonance">Resonance</label>
            </div>
        </div>
        <div id="cutoffDetail">
            {#if filterFocus === 'cutoff'}
                <h3>Frequency Cutoff</h3>
                <p>Sets the highest frequency of arranged harmonics to be heard.</p>
                <p class="detail">With a LPF (the most common of synth filters): the filter allows for any frequencies set BELOW the set frequency cutoff to be heard</p>
                <p class="note">Other filters that can be found on synths: High Pass Filters (HPF), Band Pass Filters (BPF), or Notch/Band Stop Filters (BSF)</p>
            {:else if filterFocus === 'resonance'}
                <h3>Resonance</h3>
                <h4>aka Q (for Quality)</h4>
                <p>a small group (or <i>band</i>) of frequencies set at the filter cutoff that can be increased to accentuate the overall sound of the filter</p>
            {/if}
        </div>
    </main>
    <aside>
        <div id="cutoffChart">
            <canvas id="cutoffView"></canvas>
        </div>
        <div class="spacebarEvent">
            <p>press spacebar to play oscillator</p>
        </div>
    </aside>
    <div class="continueSection">
        <span id="pickCutoff">continue with selected parameters</span>
    </div>
</div>
<span class="closeChip">&times;</span>