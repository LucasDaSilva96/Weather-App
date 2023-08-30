import "./style.css";
import { activateShowBarAni, activateHideSearchBar } from "./animation.js";
import { Make_API_call, Make_API_call_2 } from "./apiCall.js";

document.querySelector("body").classList.add("warm-weather");
window.addEventListener("DOMContentLoaded", function () {
  activateShowBarAni();
  activateHideSearchBar();
  Make_API_call("Elverum");
  Make_API_call_2("Elverum");
});
