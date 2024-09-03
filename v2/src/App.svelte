<!-- <script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style> -->
<script lang="ts">

  import Counter from './lib/Counter.svelte'
</script>

<style>
  .v-slide {
    writing-mode: vertical-lr;
    direction: rtl;
  }
</style>

<main>
    <div id="nav"></div>
    <div id="registerModal"></div>
    <div id="eduModal"></div>
    <div id="editModal"></div>
    <div id="saveModal"></div>
    <div id="deleteModal"></div>
    <div id="completeModal"></div>
    <div id="synthWrap">
        <h3 id="brand">SynthULX</h3>
        <div id="octave">
            <h4>transpose</h4>
            <div>
                <label for="plus2">+2</label>
                <input type="radio" name="detune" id="plus2" value="2400">
            </div>
            <div>
                <label for="plus1">+1</label>
                <input type="radio" name="detune" id="plus1" value="1200">
            </div>
            <div>
                <label for="none">0</label>
                <input type="radio" name="detune" id="none" value="0" checked>
            </div>
            <div>
                <label for="down1">-1</label>
                <input type="radio" name="detune" id="down1" value="-1200">
            </div>
            <div>
                <label for="down2">-2</label>
                <input type="radio" name="detune" id="down2" value="-2400">
            </div>
        </div>
        <div id="oscType">
            <div>
                <label for="sine">sine</label>
                <input type="radio" name="osc" id="sine" value="sine" checked>
            </div>
            <div>
                <label for="triangle">triangle</label>
                <input type="radio" name="osc" id="triangle" value="triangle">
            </div>
            <div>
                <label for="square">square</label>
                <input type="radio" name="osc" id="square" value="square">
            </div>
            <div>
                <label for="sawtooth">sawtooth</label>
                <input type="radio" name="osc" id="sawtooth" value="sawtooth">
            </div>
        </div>
        <div id="ampEG">
            <h4>Amp EG</h4>
            <input type="range" class="v-slide" id="ampAttack" min="0.01" max="3" step="0.01" value="0.01">
            <input type="range" class="v-slide" id="ampDecay" min="0.01" max="1" step="0.01" value="1">
            <input type="range" class="v-slide" id="ampSustain" min="0.01" max="1" step="0.01" value="1">
            <input type="range" class="v-slide" id="ampRelease" min="0.01" max="4.5" step="0.01" value="0.01">
            <div>
                <label for="ampAttack">A</label>
                <label for="ampDecay">D</label>
                <label for="ampAttack">S</label>
                <label for="ampRelease">R</label>
            </div>
        </div>
        <div id="filter">
            <h4>Filter</h4>
            <div class="textOver">
                <input type="range" class="v-slide" id="filterFreq" min="100" max="8000" step="10" value="300">
                <label for="filterFreq">Cutoff</label>
            </div>
            <div class="textOver">
                <input type="range" class="v-slide" id="filterQ" min="0" max="18" step="1" value="0">
                <label for="filterQ">Resonance</label>
            </div>
        </div>
        <div id="filterEG">
            <h4>Filter EG</h4>
            <input type="range" class="v-slide" id="filterAttack" min="0" max="3" step="0.01" value="0.01">
            <input type="range" class="v-slide" id="filterDecay" min="0" max="1" step="0.01" value="1">
            <input type="range" class="v-slide" id="filterSustain" min="0" max="1" step="0.01" value="1">
            <input type="range" class="v-slide" id="filterRelease" min="0" max="4.5" step="0.01" value="0.01">
            <div>
                <label for="filterAttack">A</label>
                <label for="filterDecay">D</label>
                <label for="filterAttack">S</label>
                <label for="filterRelease">R</label>
            </div>
        </div>
        <div>
            <div class="textOver">
                <input type="range" class="v-slide" name="synthVol" id="synthVol" step=".01" min="-20" max="1" value="-1">
                <label for="synthVol">volume</label>
            </div>
        </div>
    </div>
    <div id="keyMap">
        <div><span style="display: none">A</span></div>
        <div class="flat"><span style="display: none" class="offNote">W</span></div>
        <div><span style="display: none">S</span></div>
        <div class="flat"><span style="display: none" class="offNote">E</span></div>
        <div><span style="display: none">D</span></div>
        <div><span style="display: none">F</span></div>
        <div class="flat"><span style="display: none" class="offNote">T</span></div>
        <div><span style="display: none">G</span></div>
        <div class="flat"><span style="display: none" class="offNote">Y</span></div>
        <div><span style="display: none">H</span></div>
        <div class="flat"><span style="display: none" class="offNote">U</span></div>
        <div><span style="display: none">J</span></div>
        <div><span style="display: none">K</span></div>
        <div class="flat"><span style="display: none" class="offNote">O</span></div>
        <div><span style="display: none">L</span></div>
        <div class="flat"><span style="display: none" class="offNote">P</span></div>
        <div><span style="display: none">;</span></div>
        <div><span style="display: none">'</span></div>
    </div>
    <div id="keyCheck">
        <input type="checkbox" id="showKeys" checked>
        <label for="showKeys">Show Key Map
            <sup>QWERTY</sup>
        </label>
        <div id="userTools"></div>
    </div>
    <div id="patchWrap">
        <h3>patches</h3>
        <div id="patchBtns">
            <input type="radio" name="patch" id="patch1">
            <input type="radio" name="patch" id="patch2">
            <input type="radio" name="patch" id="patch3">
            <input type="radio" name="patch" id="patch4">
        </div>
    </div>
</main>