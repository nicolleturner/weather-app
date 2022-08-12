function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
  
  // function search(event) {
  //   event.preventDefault();
  //   let cityElement = document.querySelector("#city");
  //   let cityInput = document.querySelector("#city-input");
  //   cityElement.innerHTML = cityInput.value;
  // }
  
  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 66;
  }
  
  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 17;
  }
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  // let searchForm = document.querySelector("#search-form");
  // searchForm.addEventListener("submit", search);
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);
  function searchCity(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city");
  
    let cityInput = document.querySelector("#city-search");
    cityElement.innerHTML = cityInput.value;
    let units = "imperial";
    let apiKey = `2655694fc31706d03a1454b71102f1cc`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
  }
  let citySearch = document.querySelector("#search-form");
  citySearch.addEventListener("submit", searchCity);
  
  function showTemperature(response) {
    let temp = Math.round(response.data.main.temp);
    let displayTemp = document.querySelector("#temperature");
    displayTemp.innerHTML = `${temp}°F`;
  }
  function showCurrentLocationWeather(response) {
    let currentLocationCity = response.data.name;
    let currentTemp = Math.round(response.data.main.temp);
    let displayCity = document.querySelector("#current-city");
    displayCity.innerHTML = `${currentLocationCity}`;
    let displayTemp = document.querySelector("#temperature");
    displayTemp.innerHTML = `${currentTemp}°F`;
  }
  
  function showCurrentLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "2655694fc31706d03a1454b71102f1cc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showCurrentLocationWeather);
  }
  function CurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showCurrentLocation);
    let currentButton = document.querySelector("#current-city-button");
    currentButton.addEventListener("click", CurrentLocation);
  }