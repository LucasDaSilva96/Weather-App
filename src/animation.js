const search_glass = document.getElementById("search-glass");
const search_arrow = document.getElementById("search-arrow");
const search_bar = document.getElementById("search-bar");

function showSearchBar() {
  search_glass.classList.add("hidden");
  search_bar.classList.remove("hidden");
  search_arrow.classList.remove("hidden");

  setTimeout(() => {
    search_arrow.classList.remove("slide");
  }, 300);
}

function hideSearchBar() {
  setTimeout(() => {
    search_bar.classList.add("hidden");
    search_arrow.classList.add("slide");
    search_arrow.classList.add("hidden");
    search_arrow.classList.remove("slide-out");
    search_glass.classList.remove("hidden");
  }, 500);
  search_arrow.classList.add("slide-out");
}

export function activateShowBarAni() {
  search_glass.addEventListener("click", showSearchBar);
}
export function activateHideSearchBar() {
  search_arrow.addEventListener("click", hideSearchBar);
}
