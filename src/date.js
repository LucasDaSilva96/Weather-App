// This function is for getting the date of the wanted day in the format YYYY/MM/DD, this
// function will be used for finding the weather information on the wanted date from the openWeather response JSON
export function getFormatedDate(daysToAdd) {
  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + daysToAdd);
  return nextDay.toISOString().split("T")[0];
}

// This function is for rendering the right day-name on the APP
export function getDaysName() {
  const daysElement = document.querySelectorAll(".day");
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  const day_2_index = (date.getDay() + 1) % 7;
  const day_3_index = (date.getDay() + 2) % 7;
  const day_4_index = (date.getDay() + 3) % 7;

  const day_2_name = days[day_2_index];
  const day_3_name = days[day_3_index];
  const day_4_name = days[day_4_index];

  daysElement[0].textContent = day_2_name;
  daysElement[1].textContent = day_3_name;
  daysElement[2].textContent = day_4_name;
}
