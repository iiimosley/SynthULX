//Tone Js Synth created on page load:  plays 6 notes at a time
let synth = new Tone.PolySynth(6, Tone.MonoSynth);

// keydown: loops through all notes on keydown
$(document).on("keydown", function (e) {
  for (let i = 0; i < allNotes.length; i++) {
    //stops bubbling of event if text input focused or SynthBuilder open
    if (
      $("input[type=text]").is(":focus") ||
      $("#eduModal").css("display") == "block"
    ) {
      e.stopPropagation();
    }
    // matches non-repeating key event (prevents multiple sounds of same key)
    // colors coresponding key on piano
    // plays note
    else if (e.key == allKeys[i] && !e.originalEvent.repeat) {
      if ($(`#key${allKeyCodes[i]}`).hasClass("flat")) {
        $(`#key${allKeyCodes[i]}`).addClass("keyFillFlat");
      } else {
        $(`#key${allKeyCodes[i]}`).addClass("keyFill");
      }
      synth.triggerAttack(allNotes[i]);
    }
  }
});

// keyup removes key color and ends note played
$(document).on("keyup", function (e) {
  for (let i = 0; i < allNotes.length; i++) {
    if (e.key == allKeys[i]) {
      $(`#key${allKeyCodes[i]}`).removeClass("keyFill");
      $(`#key${allKeyCodes[i]}`).removeClass("keyFillFlat");
      synth.triggerRelease(allNotes[i]);
    }
  }
});

// detects any change made on #synthWrap inputs and adjusts object values of Tone.PolySynth
$("#synthWrap").on("change", function(){
    synth.set({
        detune: $("input[name='detune']:checked").val(),
        oscillator: {
            type: $("input[name='osc']:checked").val()
        },
        filter: {
            Q: $("#filterQ").val(),
            type: 'lowpass',
            rolloff: -24
        },
        envelope: {
            attack: $("#ampAttack").val(),
            decay: $("#ampDecay").val(),
            sustain: $("#ampSustain").val(),
            release: $("#ampRelease").val()
        },
        filterEnvelope: {
            attack: $("#filterAttack").val(),
            decay: $("#filterDecay").val(),
            sustain: $("#filterSustain").val(),
            release: $("#filterRelease").val(),
            baseFrequency: $("#filterFreq").val(),
            octaves: 3,
            exponent: 2
        }
    });
    
});

//synth volume control event listener
$("#synthVol").on("change", () => {
    synth.volume.value = $("#synthVol").val();
});

//connects synth to main audio output
synth.toMaster();


//initialize settings on load
$("#synthWrap").trigger("change");
$("#synthVol").trigger("change");
