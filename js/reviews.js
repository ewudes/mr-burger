$(function() {
    $('.btn_color_dark').click(function() {
      $('.overlay').toggleClass('overlay-active')
      $('.coontainer').toggleClass('coontainer-active')
    });
  });

  $(function() {
    $('.cllose').click(function() {
      $('.overlay').removeClass('overlay-active')
      $('.coontainer').removeClass('coontainer-active')
    });
  });