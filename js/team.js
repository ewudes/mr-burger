
$(function() {
  $('.team-list__title').click(function() {
    $('.team-list__item--active').add(
        $(this).toggleClass('switch')
        .parent()
      ).toggleClass('team-list__item--active')
      .children('ul')
      .toggle();
  });
});