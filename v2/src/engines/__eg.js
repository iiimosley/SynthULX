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
  a = 0.1,
  d = 0.1, 
  r = 0.1,
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

// helper functions
function frequencyFromNote(note) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

// check obj to see if it's empty
function isEmptyObj(obj) {
  return Object.keys(obj).length === 0;
}

// // create our oscilloscope
// var analyser = audioContext.createAnalyser();
// var contentWidth = document.getElementById("content").offsetWidth;
// var oscilloscope = new Oscilloscope(audioContext, analyser, contentWidth, 150);
// master.connect(oscilloscope.analyser);


// EG function
function envGenOn(vcaGain, a, d, s) {
  // a *= egMode;
  // d *= egMode;
  var now = audioContext.currentTime;
  
  vcaGain.cancelScheduledValues(0);
  vcaGain.setValueAtTime(0, now);
  vcaGain.linearRampToValueAtTime(1, now + a);
  vcaGain.linearRampToValueAtTime(s, now + a + d);
}

function envGenOff(vcaGain, r) {
  // r *= egMode;
  var now = audioContext.currentTime;
  
  vcaGain.cancelScheduledValues(0);
  vcaGain.setValueAtTime(vcaGain.value, now);
  vcaGain.linearRampToValueAtTime(0, now + r);
}

function noteOn(note, velocity) {
  if (audioContext.state !== "running") audioContext.resume();
  var now = audioContext.currentTime;
  vco.frequency.cancelScheduledValues(0);
  vco.frequency.setValueAtTime(frequencyFromNote(note), now);
  envGenOn(vca.gain, a, d, s);
}

function noteOff() {
  var now = audioContext.currentTime;
  vco.frequency.cancelScheduledValues(0);
  vco.frequency.setValueAtTime(vco.frequency.value, now);
  if (isEmptyObj(activeKeys)) {
    envGenOff(vca.gain, r);
  }
}

function keynote(e) {
  if (e.target.classList[0] != "key") return;
  if (audioContext.state !== "running") audioContext.resume();

  switch (e.type) {
    case "mousedown":
      vco.frequency.setValueAtTime(vco.frequency.value, 0);
      envGenOn(vca.gain, a, d, s);
      break;
    case "mouseup":
      //vca.gain.value = 0;
      envGenOff(vca.gain, r);
      break;
  }
}
// // svg
// function svgnote(midiNote, velocity) {
//   console.log(midiNote, velocity);
//   // ignore notes outside of our svg keyboard range
//   if (midiNote >= 48 && midiNote <= 72) {
//     var keyClass = "key" + midiNote,
//       key = document.querySelector("." + keyClass),
//       keyClassList = key.classList;
//     velocity ? keyClassList.add("active") : keyClassList.remove("active");
//   }
// }
// //
// function searchIndex(list, value) {
//   value = new RegExp(value);
//   for (var i in list) {
//     if (list[i].match(value)) {
//       return i;
//     }
//   }
//   return 0;
// }
