function preLoader() {
  // setTimeout(hiddenOverflow, 0);
  setTimeout(function () {
    document.querySelector(".main-content").style.visibility = "visible";
    const loader = document.querySelector(".loader");
    loader.className += " hidden";
  }, 3000);
}

preLoader();
