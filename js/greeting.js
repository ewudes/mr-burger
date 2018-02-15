const openButton = document.querySelector(".hamburger-menu-link");

function openOverlay(content) {
  const overlayElement = document.createElement("div");
  overlayElement.classList.add("overlay");

  const containerElement = document.createElement("div");
  containerElement.classList.add("container");

  const contentElement = document.createElement("div");
  contentElement.classList.add("content");
  contentElement.innerHTML = content;

  const closeElement = document.createElement("a");
  closeElement.classList.add("close");
  closeElement.textContent = "x";
  closeElement.href = "#";
  closeElement.addEventListener("click", function() {
    document.body.removeChild(overlayElement);
  });

  overlayElement.appendChild(containerElement);
  containerElement.appendChild(closeElement);
  containerElement.appendChild(contentElement);

  return overlayElement;
}

openButton.addEventListener("click", function(event) {
  event.preventDefault(); //nav--large-width
  var mainMenu = document.getElementsByClassName('nav')[0].cloneNode(true);
  mainMenu.classList.remove('nav--large-width');
  mainMenu.classList.add('nav--small-width');
  const overlay = openOverlay(mainMenu.outerHTML);
  document.body.appendChild(overlay);
});

