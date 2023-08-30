import "./style.css";
import { activateShowBarAni, activateHideSearchBar } from "./animation.js";
import { Make_API_call, RESPONSE } from "./apiCall.js";

document.querySelector("body").classList.add("warm-weather");
window.addEventListener("DOMContentLoaded", function () {
  activateShowBarAni();
  activateHideSearchBar();
  Make_API_call("Elverum");
});
