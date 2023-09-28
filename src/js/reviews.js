$(function () {
  $(".btn_color_dark").click(function () {
    $(".overrlay").toggleClass("overlay-active");
    $(".coontainer").toggleClass("coontainer-active");
  });
});

$(function () {
  $(".cllose").click(function () {
    $(".overrlay").removeClass("overlay-active");
    $(".coontainer").removeClass("coontainer-active");
  });
});
