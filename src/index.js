// function changeToF(event) {
//   event.preventDefault();
//   celsius = document.querySelector("h2");
//   celsius.innerHTML = "19°🌤️";
// }

// //function changeToC(event) {
//   event.preventDefault();
//   feahrenheit = document.querySelector("h2");
//   feahrenheit.innerHTML = "66°🌤️";
// }

let now = new Date();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let month = now.getMonth() + 1;
let minutes = now.getMinutes();
if (minutes <= 9) {
  minutes = `0${minutes} `;
}

let hour = now.getHours();
if (hour <= 9) {
  hour = `0${hour} `;
}
let time = `${hour}: ${minutes}`;

let currentDate = document.querySelector(".date");
currentDate.innerHTML = `${day} ${date}/${month}`;

let currentTime = document.querySelector(".time");
currentTime.innerHTML = `${time}`;

// let celsius = document.querySelector("#c");
// celsius.addEventListener("click", changeToF);

// let feahrenheit = document.querySelector("#f");
// feahrenheit.addEventListener("click", changeToC);

let myLocationButton = document.querySelector(".location");
myLocationButton.addEventListener("click", getCurrentlocation);

function getCurrentlocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCoordinates);
}

function currentCoordinates(position) {
  navigator.geolocation.getCurrentPosition(currentCoordinates);
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentLocation);

  function currentLocation(response) {
    let cityName = document.querySelector("h1");
    cityName.innerHTML = response.data.name;
    let cityTemp = document.querySelector("h2");
    let currentTemp = Math.round(response.data.main.temp);
    cityTemp.innerHTML = currentTemp;
  }
}
function processSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  changeCity(city);
}

let currentSearch = document.querySelector(".searching");
currentSearch.addEventListener("submit", processSubmit);

changeCity("Tel Aviv");

function changeCity(city) {
  let units = "metric";
  let apiKey = "1dbf926d3b4417bf379db7043bec1047";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(weatherConditions);
}

function weatherConditions(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;

  let temp = document.querySelector("h2");
  temp.innerHTML = Math.round(response.data.main.temp);

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = ` ${Math.round(response.data.main.humidity)}`;

  let wind = document.querySelector(".wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
}
