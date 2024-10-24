document.addEventListener("DOMContentLoaded", () => {
  let sidebar = document.querySelector(".sidebar");
  let closeBtn = document.querySelector("#toggle-btn");
  let searchBtn = document.querySelector(".bx-search");

  if (closeBtn) { // Check if closeBtn exists
      closeBtn.addEventListener("click", () => {
          sidebar.classList.toggle("open");
      });
  }
});

