import "./style.css";
import { activateShowBarAni, activateHideSearchBar } from "./animation.js";

document.querySelector("body").classList.add("cold-weather");

window.addEventListener("DOMContentLoaded", function () {
  activateShowBarAni();
  activateHideSearchBar();
});
