<script>
  import AmpEnvelope from "./synth/AmpEnvelope.svelte";
  import DefaultPatches from "./synth/DefaultPatches.svelte";
  import FilterEg from "./synth/FilterEnvelope.svelte";
  import FilterCutoff from "./synth/FilterCutoff.svelte";
  import Keyboard from "./synth/Keyboard.svelte";
  import Octave from "./synth/Octave.svelte";
  import Oscillators from "./synth/Oscillators.svelte";
  import Volume from "./synth/Volume.svelte";
</script>

<div>
  <div id="synthWrap" class="w-synth">
    <h3 id="brand">SynthULX</h3>
    <Octave />
    <Oscillators />
    <AmpEnvelope />
    <FilterCutoff />
    <FilterEg />
    <Volume />
  </div>
  <Keyboard />
  <DefaultPatches />
</div>
