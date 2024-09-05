import { KEYBOARD } from "../../common/keyboard";

//sets id for each piano key for UI coloring
let keyboard = $("#keyMap").children();

const KEY_CODES = Object.keys(KEYBOARD);

for (let i = 0; i < keyboard.length; i++) {
  keyboard[i].id = `key${KEY_CODES[i]}`;
}

/// show/hide coordinating key presses to piano
$("#showKeys").on("change", function(){
    if ($("#showKeys").is(":checked")){
        $("#keyMap>div>span").show();
    } else {
        $("#keyMap>div>span").hide();
    }
});


$("#showKeys").trigger("change");
