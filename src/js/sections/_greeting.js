(function() {
	"use strict";

  const navList = document.querySelector(".header__nav-list");
  const navButton = document.querySelector(".hamburger");

  function handleNoneScroll() {
    return window.scrollTo({top: 0});
  }

  navButton.addEventListener("click", function() {
    navList.classList.toggle("header__nav-list-active-menu");

    if (navList.classList.contains("header__nav-list-active-menu")) {
      window.addEventListener("scroll", handleNoneScroll);
    } else {
      window.removeEventListener("scroll", handleNoneScroll);
    }
  });
})();
