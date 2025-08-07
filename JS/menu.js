const sidebar = document.getElementById("sidebar");
const toggleButton = document.getElementById("toggleButton");
const content = document.querySelector(".content");

toggleButton.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  content.classList.toggle("shifted");
});

document.addEventListener("click", (event) => {
  const isClickInsideSidebar = sidebar.contains(event.target);
  const isClickOnToggleButton = toggleButton.contains(event.target);

  if (!isClickInsideSidebar && !isClickOnToggleButton) {
    sidebar.classList.remove("open");
    content.classList.remove("shifted");
  }
});
