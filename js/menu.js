
$(function() {
    $('.menu__item-title').click(function() {
      $('.menu__item_active').add(
          $(this).toggleClass('switch')
          .parent()
        ).toggleClass('menu__item_active')
        .children('ul')
        .toggle();
    });
  });