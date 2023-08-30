export function renderTodayTemp(data, cel_fah) {
  let fahrenheit = data.current.temp_f;
  let celsius = data.current.temp_c;
  const today_H1 = document.getElementById("today_temp");
  if (cel_fah === "c") {
    return (today_H1.textContent = `${celsius}°C`);
  } else if (cel_fah === "f") {
    return (today_H1.textContent = `${fahrenheit}°F`);
  }

  return (today_H1.textContent = "Wrong call");
}

export function renderPlace(city, country) {
  const place_H4 = document.getElementById("place");

  return (place_H4.textContent = `${city}, ${country}`);
}

export function renderForecastAnimation(willRain, willSnow, _iconUrl) {
  const snow_element = document.querySelector(".snow");
  const rain_element = document.querySelector(".rain");
  const sun_element = document.querySelector(".sun");
  const default_element = document.querySelector(".default-icon-box");

  if (willRain > 0) {
    snow_element.classList.add("hidden");
    sun_element.classList.add("hidden");
    default_element.classList.add("hidden");
    rain_element.classList.remove("hidden");
  } else if (willSnow > 0) {
    sun_element.classList.add("hidden");
    default_element.classList.add("hidden");
    rain_element.classList.add("hidden");
    snow_element.classList.remove("hidden");
  } else {
    sun_element.classList.add("hidden");
    rain_element.classList.add("hidden");
    snow_element.classList.add("hidden");
    default_element.classList.remove("hidden");
    renderForecastIcon(_iconUrl);
  }
}

function renderForecastIcon(iconUrl) {
  const icon_Image_element = document.getElementById("day_icon");
  try {
    fetch(`https:${iconUrl}`).then((res) => {
      icon_Image_element.src = res.url;
    });
  } catch (error) {
    throw new Error("Failed to fetch icon-image, Error: ", error);
  }
}

export function renderForecastText(text) {
  const today_forecast_text_h3 = document.getElementById("today_text");
  return (today_forecast_text_h3.textContent = text);
}

export function renderBackgroundImage(temp) {
  const Html_body = document.querySelector("body");
  Html_body.className = "none";

  if (temp <= 5) {
    return Html_body.classList.add("cold-weather");
  } else if (temp > 5 && temp <= 15) {
    return Html_body.classList.add("raining-weather");
  } else if (temp > 15) {
    return Html_body.classList.add("warm-weather");
  }
}

export async function renderDaysForecast(ForecastArray) {
  let iconsURL = [];
  const forecastIconsElement = document.querySelectorAll(".day_icon-forecast");

  for (let i = 1; i < ForecastArray.forecast.forecastday.length; i++) {
    iconsURL[i] = ForecastArray.forecast.forecastday[i].day.condition.icon;
  }

  let URL_1 = iconsURL[1];
  let URL_2 = iconsURL[2];
  let URL_3 = iconsURL[3];

  try {
    const response_1 = await fetch(`https:${URL_1}`);
    const response_2 = await fetch(`https:${URL_2}`);
    const response_3 = await fetch(`https:${URL_3}`);
    forecastIconsElement[0].src = response_1.url;
    forecastIconsElement[1].src = response_2.url;
    forecastIconsElement[2].src = response_3.url;
  } catch (error) {
    throw new Error("Failed to fetch icon-image, Error: ", error);
  }
}
