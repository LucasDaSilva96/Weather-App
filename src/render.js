import { getFormatedDate } from "./date.js";

// All of the following functions is based on the response JSON from the openWeather API ↓

// This function is for rendering the right temp depending on the unit (C° / F°)
export function renderTodayTemp(data, cel_fah) {
  if (cel_fah === "c") {
    return renderDaysForecast(data, cel_fah);
  } else if (cel_fah === "f") {
    return renderDaysForecast(data, cel_fah);
  }

  return (today_H1.textContent = "Wrong call");
}

// This function is for rendering the user search location / current location
export function renderPlace(data) {
  const place_H4 = document.getElementById("place");
  const city = data.city.name;
  const country = data.city.country;

  return (place_H4.textContent = `${city}, ${country}`);
}

// This function is for showing the snow/rain animation depending on the forecast description
export function renderForecastAnimation(data) {
  const snow_element = document.querySelector(".snow");
  const rain_element = document.querySelector(".rain");

  const today_index = findData(data.list, getFormatedDate(0));
  const today_object_str = `${data.list[today_index].weather[0].description}`;
  today_object_str.toLocaleLowerCase();

  if (today_object_str.includes("rain")) {
    snow_element.classList.add("hidden");
    rain_element.classList.remove("hidden");
  } else if (today_object_str.includes("snow")) {
    rain_element.classList.add("hidden");
    snow_element.classList.remove("hidden");
  } else {
    rain_element.classList.add("hidden");
    snow_element.classList.add("hidden");
  }
}

// This function is for rendering the weather icons from the openWeather API
export async function renderForecastIcon(data) {
  const icon_Image_element_head = document.getElementById("day_icon");
  const icon_Image_element_forecasts =
    document.querySelectorAll(".day_icon-forecast");

  const today_index = findData(data.list, getFormatedDate(0));
  const day_2_index = findData(data.list, getFormatedDate(1));
  const day_3_index = findData(data.list, getFormatedDate(2));
  const day_4_index = findData(data.list, getFormatedDate(3));

  const today_object = data.list[today_index];
  const day_2_object = data.list[day_2_index];
  const day_3_object = data.list[day_3_index];
  const day_4_object = data.list[day_4_index];

  const today_icon_url = await fetch(
    `http://openweathermap.org/img/w/${today_object.weather[0].icon}.png`
  );
  const day_2_icon_url = await fetch(
    `http://openweathermap.org/img/w/${day_2_object.weather[0].icon}.png`
  );
  const day_3_icon_url = await fetch(
    `http://openweathermap.org/img/w/${day_3_object.weather[0].icon}.png`
  );
  const day_4_icon_url = await fetch(
    `http://openweathermap.org/img/w/${day_4_object.weather[0].icon}.png`
  );

  icon_Image_element_head.src = today_icon_url.url;
  icon_Image_element_forecasts[0].src = day_2_icon_url.url;
  icon_Image_element_forecasts[1].src = day_3_icon_url.url;
  icon_Image_element_forecasts[2].src = day_4_icon_url.url;
}

// This function is for rendering the today's weather condition from the openWeather API
export function renderForecastText(data) {
  const today_index = findData(data.list, getFormatedDate(0));
  const today_object = data.list[today_index];
  const today_description = today_object.weather[0].description;
  const today_forecast_text_h3 = document.getElementById("today_text");
  return (today_forecast_text_h3.textContent = today_description);
}

// This function is for rendering the background image on the HTML-body depending on the current temp
export function renderBackgroundImage(data) {
  const Html_body = document.querySelector("body");
  Html_body.className = "none";
  const today_index = findData(data.list, getFormatedDate(0));
  const today_object = data.list[today_index];
  const temp = Math.floor(today_object.main.temp);
  const today_object_str = `${data.list[today_index].weather[0].description}`;
  today_object_str.toLocaleLowerCase();

  if (temp <= 5 || today_object_str.includes("snow")) {
    Html_body.className = "";
    return Html_body.classList.add("cold-weather");
  } else if (today_object_str.includes("rain")) {
    Html_body.className = "";
    return Html_body.classList.add("raining-weather");
  } else if (temp >= 20 || today_object_str.includes("clear")) {
    Html_body.className = "";
    return Html_body.classList.add("warm-weather");
  }
}

// This function is for rendering the temp of today, day 2, day 3 and day 4 depending on the unit (C° / F°)
export async function renderDaysForecast(data, unit) {
  const forecastTempElement = document.querySelectorAll(".day-temp");
  const today_H1 = document.getElementById("today_temp");

  const today_index = findData(data.list, getFormatedDate(0));
  const day_2_index = findData(data.list, getFormatedDate(1));
  const day_3_index = findData(data.list, getFormatedDate(2));
  const day_4_index = findData(data.list, getFormatedDate(3));

  const today_object = data.list[today_index];
  const day_2_object = data.list[day_2_index];
  const day_3_object = data.list[day_3_index];
  const day_4_object = data.list[day_4_index];

  const today_avg_temp_C = Math.floor(today_object.main.temp);
  const today_avg_temp_F = Math.floor(today_avg_temp_C * (9 / 5) + 32);

  const day_2_avg_temp_C = Math.floor(day_2_object.main.temp);
  const day_2_avg_temp_F = Math.floor(day_2_avg_temp_C * (9 / 5) + 32);

  const day_3_avg_temp_C = Math.floor(day_3_object.main.temp);
  const day_3_avg_temp_F = Math.floor(day_3_avg_temp_C * (9 / 5) + 32);

  const day_4_avg_temp_C = Math.floor(day_4_object.main.temp);
  const day_4_avg_temp_F = Math.floor(day_4_avg_temp_C * (9 / 5) + 32);

  if (unit === "c") {
    today_H1.textContent = `${today_avg_temp_C}°C`;
    forecastTempElement[0].textContent = `${day_2_avg_temp_C}°C`;
    forecastTempElement[1].textContent = `${day_3_avg_temp_C}°C`;
    forecastTempElement[2].textContent = `${day_4_avg_temp_C}°C`;
  } else if (unit === "f") {
    today_H1.textContent = `${today_avg_temp_F}°F`;
    forecastTempElement[0].textContent = `${day_2_avg_temp_F}°F`;
    forecastTempElement[1].textContent = `${day_3_avg_temp_F}°F`;
    forecastTempElement[2].textContent = `${day_4_avg_temp_F}°F`;
  }
}

// This function is for finding the right object-index inside the list array from the openWeather API response JSON, with the help of the date(YYYY/MM/DD)
function findData(listArray, date) {
  let index = undefined;
  const dt_txt_Array = [];
  listArray.forEach((el, i) => {
    dt_txt_Array[i] = el.dt_txt.split(" ")[0];
  });

  index = dt_txt_Array.findIndex((el) => {
    return el === date;
  });

  return index;
}
