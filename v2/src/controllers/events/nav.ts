/// dropdown menu listener
$(document).on("click", "#dropdown", () => {
  if ($("#patchDrop").css("display") == "none") {
    $("#patchDrop").css("display", "block");
  } else {
    $("#patchDrop").css("display", "none");
  }
});

//
$(document).on("click", (e) => {
  if (
    $("#patchDrop").css("display") === "block" &&
    e.target.id !== "dropdown"
  ) {
    $("#patchDrop").css("display", "none");
  }
});
