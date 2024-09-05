//applies all values of patch passed into the argument to the inputs of the synth
//triggers change at the end of function to initiate patch
function applyPatch(patch) {
  let params = Object.keys(patch);
  params.forEach((i) => {
    if (i === "osc") {
      $(`#synthWrap :input:radio[name=${i}][id=${patch[i]}]`).prop(
        "checked",
        true
      );
    } else if (i === "detune") {
      $(`#synthWrap :input:radio[name=${i}][value=${patch[i]}]`).prop(
        "checked",
        true
      );
    } else {
      $(`#synthWrap :input#${i}`).val(patch[i]);
    }
  });
  $("#synthWrap").trigger("change");
  $("#synthVol").trigger("change");
}

// receives patch created in SynthBuilder
module.exports.receivePatch = (patch) => {
    applyPatch(patch);
};

/// load user patch from firebase & apply params to synth
$(document).on("click", "#patchDrop", function(e){
    DataFactory.loadPatch(e.target.id)
    .then(patch=>applyPatch(patch))
    .then($(this).css("display", "none"));
}); 

/// load prebuilt patch for non-registered users & apply params to synth
$("#patchBtns :input:radio").change(function(){
    let pID = $("#patchBtns :input:radio:checked").attr('id');
    DataFactory.setPatch()
    .then((patches)=>{
        applyPatch(patches[pID]);
        $("#synthWrap").trigger("change");
    });
});



///modal-to-data interactions
/////////////////////////////
$(document).on("click", "#savePatch", function() {
    let obj = {};
    obj.patch_name = $("#newPatch").val();
    obj.uid = currentUser;
    $("#synthWrap :input:radio:checked").each(function(set){
        obj[this.name] = this.value;
    });
    $("#synthWrap :input[type=range]").each(function (set) {
        obj[this.id] = this.value;
    });
    DataFactory.savePatch(obj)
        .then(() => {
            view.leaveModal(obj.patch_name, editBool);
            DataFactory.getPatches(currentUser)
                .then(userPatches => view.userAuth(userPatches));
        });
});

//if box is checked, enables edit modal text input
$(document).on('click', '#changeName', ()=>{
    if ($('#changeName').is(':checked')) {
        $('#newName').prop('disabled', false).focus();
    } else {
        $('#newName').prop('disabled', true).val("");
    }
});

$(document).on("click", "#editPatch", function () {
    let patchKey = $("#patchOver").val();
    let obj = {};
    if ($('#changeName').is(':checked') && $('#newName').val() !==""){
        obj.patch_name = $('#newName').val();
    } else {
        obj.patch_name = $("#patchOver option:selected").text();
    }
    obj.uid = currentUser;
    $("#synthWrap :input:radio:checked").each(function (set) {
        obj[this.name] = this.value;
    });
    $("#synthWrap :input[type=range]").each(function (set) {
        obj[this.id] = this.value;
    });
    DataFactory.overwritePatch(patchKey, obj)
        .then(patch => {
            view.leaveModal(patch.patch_name, editBool);
            DataFactory.getPatches(currentUser)
                .then(userPatches => view.userAuth(userPatches));
        });
});


$(document).on("click", "#deletePatch", function () {
    let erasePatch = $(this).prev().attr("patch_id");
    let deletedPatch = $("#toDelete").text();
    let deleteBool = true;
    DataFactory.deletePatch(erasePatch)
        .then(() => {
            view.leaveModal(deletedPatch, deleteBool);
            $(`#${erasePatch}`).parent().remove();
        });
});

