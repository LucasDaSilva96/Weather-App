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
  const forecastIconsElement = document.querySelectorAll(".day_icon-forecast");
}

const weather_conditions = [
  {
    code: 1000,
    day: "Sunny",
    night: "Clear",
    icon: 113,
  },
  {
    code: 1006,
    day: "Cloudy",
    night: "Cloudy",
    icon: 119,
  },
  {
    code: 1087,
    day: "Thundery outbreaks possible",
    night: "Thundery outbreaks possible",
    icon: 200,
  },

  {
    code: 1192,
    day: "Heavy rain at times",
    night: "Heavy rain at times",
    icon: 305,
  },

  {
    code: 1225,
    day: "Heavy snow",
    night: "Heavy snow",
    icon: 338,
  },
];

function findIconN(icon_code) {
  let index = weather_conditions.findIndex((el) => {
    return el.code === icon_code;
  });

  return weather_conditions[index].icon;
}
