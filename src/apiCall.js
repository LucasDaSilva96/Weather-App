import {
  renderPlace,
  renderForecastAnimation,
  renderForecastText,
  renderBackgroundImage,
  renderDaysForecast,
  renderForecastIcon,
} from "./render.js";
import { temp_switch_Listener } from "./switchTemp.js";
import { getDaysName } from "./date.js";

// OpenWeather API-Key (FREE-PLAN)
const OPEN_WEATHER_API_KEY = "64eda751657841e56332c0e524e654b6";

// This function is for calling the openWeather API with the wanted city name and invoking the necessary functions to render the content
export async function Make_API_call_Weather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
      {
        mode: "cors",
      }
    );
    const data = await response.json();
    // These functions are in charge of rendering the content of the APP
    renderBackgroundImage(data);
    renderPlace(data);
    renderDaysForecast(data, "c");
    renderForecastText(data);
    renderForecastIcon(data);
    renderForecastAnimation(data);
    // This function is in charge of switching the temp unit from C° to F° and rendering the right temp in the APP
    temp_switch_Listener(data);
    // This function is in charge of rendering the days name in the APP
    getDaysName();
  } catch (error) {
    throw new Error("Failed to fetch openWeather, Error: ", error);
  }
}

// This function is for getting the user location and calling the Make_API_call_Weather function with the user current location
export function getUserLocation() {
  navigator.geolocation.getCurrentPosition(async function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    try {
      const data = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
        {
          mode: "cors",
        }
      );
      const response = await data.json();
      const user_city = response.city;
      Make_API_call_Weather(user_city);
    } catch (error) {
      Make_API_call_Weather("London");
      throw new Error("Failed to fetch user location, Error: " + error);
    }
  });
}

// This function is for invoke the Make_API_call_Weather function with the search value as input,
// then reset the search bar value/textContent
export function searFunction() {
  const search_btn = document.getElementById("search-arrow");
  const searchbar = document.getElementById("search-bar");
  search_btn.addEventListener("click", function () {
    Make_API_call_Weather(SEARCH_VALUE);
    SEARCH_VALUE = undefined;
    setTimeout(() => {
      searchbar.value = "";
      searchbar.textContent = "";
    }, 600);
  });
}

// This global variable is for saving the user input value
let SEARCH_VALUE = undefined;

// This function is for getting the user input value
export function getSearchValue() {
  const searchbar = document.getElementById("search-bar");
  searchbar.addEventListener("input", function () {
    SEARCH_VALUE = searchbar.value;
  });
}
