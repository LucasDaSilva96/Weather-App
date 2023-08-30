import { renderTodayTemp } from "./render.js";

const temp_switch = document.getElementById("switch");
function is_celsius_or_fahrenheit(Switch) {
  if (Switch.checked === true) {
    return "f";
  } else {
    return "c";
  }
}

export function temp_switch_Listener(data) {
  temp_switch.addEventListener("click", function () {
    renderTodayTemp(data, is_celsius_or_fahrenheit(temp_switch));
  });
}
