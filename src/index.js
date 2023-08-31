import "./style.css";
import { activateShowBarAni, activateHideSearchBar } from "./animation.js";
import { searFunction, getSearchValue, getUserLocation } from "./apiCall.js";

// This is for invoking the necessary functions in order for the app to work properly when the page is loaded
window.addEventListener("DOMContentLoaded", function () {
  activateShowBarAni();
  activateHideSearchBar();
  getUserLocation();
  getSearchValue();
  searFunction();
});
