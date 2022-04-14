let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let now = new Date();
let date = now.getDate();
let currentMonth = month[now.getMonth()];
let year = now.getFullYear();
let currentDay = days[now.getDay()];
let dateToday = document.querySelector("#date");
let dayTime = document.querySelector("#dayTime");
dayTime.innerHTML = `${currentDay}, ${now.getHours()}:${now.getMinutes()}`;
dateToday.innerHTML = `${currentMonth} ${date}, ${year}`;

let currentHumidity = document.querySelector("#humidity");
let currentWind = document.querySelector("#wind");
let currentTemperature = document.querySelector("#temperatureValue");
let place = document.querySelector("#place");

function showTemperature(response) {
  let cityTemperature = Math.round(response.data.main.temp);
  let cityHumidity = Math.round(response.data.main.humidity);
  let cityWind = Math.round(response.data.wind.speed);
  currentTemperature.innerHTML = `${cityTemperature}°C`;
  currentHumidity.innerHTML = `Humidity ${cityHumidity}%`;
  currentWind.innerHTML = `Wind ${cityWind} km/h`;
}

function submit(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-input");
  let city = searchCity.value;
  place.innerHTML = `${city}`;
  let apiKey = `49377281846eee971852e0a6a46bc4a0`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;

  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(showTemperature);
}

let searchButton = document.querySelector("#citySearch");
searchButton.addEventListener("submit", submit);

function showNowTemperature(response) {
  let locationTemp = Math.round(response.data.main.temp);
  let locationHumidity = Math.round(response.data.main.humidity);
  let locationWind = Math.round(response.data.wind.speed);
  currentTemperature.innerHTML = `${locationTemp}°C`;
  currentHumidity.innerHTML = `Humidity ${locationHumidity}%`;
  currentWind.innerHTML = `Wind ${locationWind} km/h`;
  place.innerHTML = `Current location`;
}

function showPosition(position) {
  let latitude = Math.round(position.coords.latitude);
  let longitude = Math.round(position.coords.longitude);
  let apiKey = `49377281846eee971852e0a6a46bc4a0`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showNowTemperature);
}

function locTemp() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#getCurrentLocationTemp");
currentLocationButton.addEventListener("click", locTemp);
//function temperature(event) {
//event.preventDefault();
//temperatureValue.innerHTML = "60°";
//}

//let fahrenheihtLink = document.querySelector("#fahrenheit");
//fahrenheihtLink.addEventListener("click", temperature);

//function temperatureCelcius(event) {
//event.preventDefault();
//temperatureValue.innerHTML = "25°";
//}

//let celciusLink = document.querySelector("#celcius");
//celciusLink.addEventListener("click", temperatureCelcius);
