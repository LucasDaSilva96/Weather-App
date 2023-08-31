import { renderTodayTemp } from "./render.js";

const temp_switch = document.getElementById("switch");
// This function is for returning the right temp unit depending on the switch-element statement
function is_celsius_or_fahrenheit(Switch) {
  if (Switch.checked === true) {
    return "f";
  } else {
    return "c";
  }
}

// This function is for getting the temp unit and rendering the right temp regarding the unit (C° / F°)
export function temp_switch_Listener(data) {
  temp_switch.addEventListener("click", function () {
    renderTodayTemp(data, is_celsius_or_fahrenheit(temp_switch));
  });
}
