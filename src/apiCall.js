import {
  renderTodayTemp,
  renderPlace,
  renderForecastAnimation,
  renderForecastText,
  renderBackgroundImage,
  renderDaysForecast,
} from "./render.js";

import { temp_switch_Listener } from "./switchTemp.js";

const WEATHER_API_KEY = "97552f1e6b0147febda60655232708";

export let RESPONSE = undefined;

export async function Make_API_call(place) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${place}&days=4`
    );
    const data = await response.json();

    RESPONSE = data;
    console.log(data);
    renderBackgroundImage(data.current.temp_c);
    renderTodayTemp(data, "c");
    renderForecastText(data.forecast.forecastday[0].day.condition.text);
    renderPlace(data.location.name, data.location.country);
    renderForecastAnimation(
      data.forecast.forecastday[0].day.daily_chance_of_rain,
      data.forecast.forecastday[0].day.daily_chance_of_snow,
      data.forecast.forecastday[0].day.condition.icon
    );

    // Call temp_switch_Listener function after API call is complete
    temp_switch_Listener(data);
    renderDaysForecast(data);
  } catch (error) {
    throw new Error("Failed to fetch data, Error: ", error);
  }
}
