/* 
* First, patch the gate output of your keyboard into the EG’s gate input, this will trigger the voltage envelope each time you hit a key.

* Next patch from the EG’s output into the VCA’s CV input. Now when you hit a key you will hear articulated and dynamic notes according to your Envelope Generator settings.
*/

// set up our Audio Context
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// set up an oscillator, gain, and master gain
var vco = audioContext.createOscillator(),
  vca = audioContext.createGain(),
  master = audioContext.createGain(),
  a = (d = r = 0.1),
  s = 1,
  egMode = 1,
  velocity = 1;

// keep track of active keys
var activeKeys = {};

// connect all modules to master
vco.connect(vca);
vca.connect(master);
master.connect(audioContext.destination);

//set params
vca.gain.value = 0;
master.gain.value = 1;

// start the vco
vco.start(0);

addEventListenerBySelector(
  '[name="egMode"]',
  "change",
  function () {
    egMode = this.value;
  },
  true
);

masterGain.oninput = function () {
  changeMaster(masterGain.value);
};

// EG function
function envGenOn(vcaGain, a, d, s) {
  var now = audioContext.currentTime;
  a *= egMode;
  d *= egMode;
  vcaGain.cancelScheduledValues(0);
  vcaGain.setValueAtTime(0, now);
  vcaGain.linearRampToValueAtTime(1, now + a);
  vcaGain.linearRampToValueAtTime(s, now + a + d);
}

function envGenOff(vcaGain, r) {
  var now = audioContext.currentTime;
  r *= egMode;
  vcaGain.cancelScheduledValues(0);
  vcaGain.setValueAtTime(vcaGain.value, now);
  vcaGain.linearRampToValueAtTime(0, now + r);
}

// UI functions
function changeWaveType(type) {
  vco.type = type;
}

function changeAttack(val) {
  a = +val;
  attackDisplay.innerHTML = val;
}

function changeDecay(val) {
  d = +val;
  decayDisplay.innerHTML = val;
}

function changeSustain(val) {
  s = +val;
  sustainDisplay.innerHTML = val;
}

function changeRelease(val) {
  r = +val;
  releaseDisplay.innerHTML = val;
}

function changeMaster(vol) {
  master.gain.value = vol;
  masterGain.value = vol;
  masterGainDisplay.innerHTML = vol;
}

// helper functions
function frequencyFromNote(note) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

function addEventListenerBySelector(selector, event, fn) {
  var list = document.querySelectorAll(selector);
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fn, false);
  }
}

// check obj to see if it's empty
function isEmptyObj(obj) {
  return Object.keys(obj).length === 0;
}

// create our oscilloscope
var analyser = audioContext.createAnalyser();
var contentWidth = document.getElementById("content").offsetWidth;
var oscilloscope = new Oscilloscope(audioContext, analyser, contentWidth, 150);
master.connect(oscilloscope.analyser);

// Everything below here is related to setting up Web MIDI

// MIDI
var midi, data, cmd, channel, type, note, velocity;
if (navigator.requestMIDIAccess) {
  navigator
    .requestMIDIAccess({
      sysex: false,
    })
    .then(MIDISuccess, MIDIFailure);
}

function MIDISuccess(midi) {
  var inputs = midi.inputs,
    device = {};
  inputs.forEach(function (port) {
    port.onmidimessage = onMIDIMessage;
  });
}

function MIDIFailure() {
  console.log("Your browser does not support Web MIDI");
}

function onMIDIMessage(message) {
  console.log("MIDI Message", message.data);
  (data = message.data),
    (cmd = data[0] >> 4),
    (channel = data[0] & 0xf),
    (type = data[0] & 0xf0),
    (note = data[1]),
    (velocity = data[2]);

  // Step: Patch from the Keyboard note output into the VCO CV input
  if (velocity == 0) {
    noteOff();
  } else {
    switch (type) {
      case 144:
        noteOn(note, velocity);
        break;
      case 128:
        noteOff();
        break;
      case 176:
        pressure(note, velocity);
        break;
      case 224:
        bend(note, velocity);
        break;
    }
  }
}

function noteOn(note, velocity) {
  if (audioContext.state !== "running") audioContext.resume();
  var now = audioContext.currentTime;
  svgnote(note, velocity);
  activeKeys[note] = true;
  vco.frequency.cancelScheduledValues(0);
  vco.frequency.setValueAtTime(frequencyFromNote(note), now);
  envGenOn(vca.gain, a, d, s);
  changeMaster(+(velocity / 127).toFixed(2));
}

function noteOff() {
  var now = audioContext.currentTime;
  svgnote(note, 0);
  delete activeKeys[note];
  vco.frequency.cancelScheduledValues(0);
  vco.frequency.setValueAtTime(frequencyFromNote(note), now);
  if (isEmptyObj(activeKeys)) {
    envGenOff(vca.gain, r);
  }
}

function bend(note, velocity) {
  console.log("bend", note, velocity);
}

function pressure(note, velocity) {
  console.log("pressure", note, velocity);
}

// svg keyboard functions
var keyboard = document.getElementById("controller");
var k = document.getElementsByClassName("key");
keyboard.addEventListener("mousedown", keynote);
keyboard.addEventListener("mouseup", keynote);

function keynote(e) {
  if (e.target.classList[0] != "key") return;
  if (audioContext.state !== "running") audioContext.resume();
  var keyClasses = e.target.classList,
    midiNote = keyClasses[searchIndex(keyClasses, "key[0-9]+")].replace(
      "key",
      ""
    ),
    now = audioContext.currentTime;

  switch (e.type) {
    case "mousedown":
      vco.frequency.setValueAtTime(frequencyFromNote(midiNote), 0);
      //vca.gain.value = 0.9;
      envGenOn(vca.gain, a, d, s);
      keyClasses.add("active");
      break;
    case "mouseup":
      //vca.gain.value = 0;
      envGenOff(vca.gain, r);
      keyClasses.remove("active");
      break;
  }
}
// svg
function svgnote(midiNote, velocity) {
  console.log(midiNote, velocity);
  // ignore notes outside of our svg keyboard range
  if (midiNote >= 48 && midiNote <= 72) {
    var keyClass = "key" + midiNote,
      key = document.querySelector("." + keyClass),
      keyClassList = key.classList;
    velocity ? keyClassList.add("active") : keyClassList.remove("active");
  }
}
//
function searchIndex(list, value) {
  value = new RegExp(value);
  for (var i in list) {
    if (list[i].match(value)) {
      return i;
    }
  }
  return 0;
}
