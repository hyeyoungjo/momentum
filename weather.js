//weather and location using API data(https://openweathermap.org/)

//1. load coords from local storage

//2-1. if there is, get weather
//2-1-1. using that coords, get weather and location using API

//2-2. if there isn't,
//2-2-1. get geo location coordinate (latitude, longitude)
//2-2-2. save that coords to local Storage
//2-2-3. using that coords, get weather and location using API

const weather = document.querySelector(".js-weather");

const LS_COORDS = "coords";
const API_KEY = "ae9e86e4ce965791ff08987a24da31cd";

function getWeather(lat, lon) {
  //get data from API
  //1. fetch url
  //2. and then get response data
  //3. and then get json data only
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      // console.log(json);
      const temp = json.main.temp;
      const city = json.name;
      weather.innerText = `${temp}˚\n${city} `;
    });
}

function handleGeoError() {
  console.log("Can't access to geo location");
}

function saveCoords(obj) {
  localStorage.setItem(LS_COORDS, JSON.stringify(obj)); //obj->str
}

function handleGeoSuccess(pos) {
  const latitude = pos.coords.latitude;
  const longitude = pos.coords.longitude;
  const objCoords = {
    latitude,
    longitude,
  };
  saveCoords(objCoords);
  getWeather(latitude, longitude);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(LS_COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords); //str->obj
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
