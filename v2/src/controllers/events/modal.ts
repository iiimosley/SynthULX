///display modals - event listeners
/////////////////////////////
$(document).on("click", "#promptLogin", function () {
  AuthFactory.authUser()
    .then((account) => (currentUser = account.user.uid))
    .then($(this).parent().parent().hide());
});

$(document).on("click", "#callSave", () => view.saveView());

$(document).on("click", "#callEdit", () => {
  DataFactory.getPatches(currentUser).then((patches) => {
    view.editView(patches);
  });
});

// calls delete from 'x' in patch dropdown next to patch name
$(document).on("click", ".deleteChip", function () {
  view.deleteView($(this).prev().attr("id"), $(this).prev().text());
});

// closes all modals with no data changes (cancels action)
$(document).on("click", ".closeChip", function () {
  $(this).parent().parent().fadeOut(100);
});
