//applies all values of patch passed into the argument to the inputs of the synth

import type { Patch, PatchSet } from "@/common/patch";

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

