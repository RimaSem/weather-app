const APIkey = "13e50692f650e4663cbb5ad7302e4d31";
const searchForm = document.querySelector("form");
const userInput = document.querySelector("form input");
const tempConversionBtn = document.querySelector(".temp-type-btn");
const errorDisplay = document.querySelector(".error-message");

const cityName = document.querySelector(".location");
const weatherIcon = document.querySelector(".weather-icon img");
const temperature = document.querySelector(".temperature");
const temperatureType = document.querySelector(".temperature-type");
const weatherDescription = document.querySelector(".weather-description");

const feelsLikeTemp = document.querySelector(".temp");
const feelsLikeTempType = document.querySelector(".type");
const humidity = document.querySelector(".humidity .data");
const precipitation = document.querySelector(".precipitation .data");
const windSpeed = document.querySelector(".wind .data");

// search weather by city
searchForm.addEventListener("submit", (e) => {
  errorDisplay.style.display = "none";
  e.preventDefault();
  getWeather(userInput.value).catch((err) => {
    errorDisplay.style.display = "block";
  });
});

// fetch and display weather data
async function getWeather(city) {
  const cityResponse = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`,
    { mode: "cors" }
  );
  const cityData = await cityResponse.json();
  cityName.textContent = `${cityData[0].name}, ${cityData[0].country}`;

  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData[0].lat}&lon=${cityData[0].lon}&appid=${APIkey}&units=metric`,
    { mode: "cors" }
  );
  const weatherData = await weatherResponse.json();

  weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@4x.png`;
  temperature.textContent = Math.round(+weatherData.list[0].main.temp);
  temperatureType.textContent = "C";
  weatherDescription.textContent = weatherData.list[0].weather[0].main;
  feelsLikeTemp.textContent = Math.round(+weatherData.list[0].main.feels_like);
  feelsLikeTempType.textContent = "C";
  humidity.textContent = `${weatherData.list[0].main.humidity}%`;
  precipitation.textContent = `${+weatherData.list[0].pop * 100}%`;
  windSpeed.textContent = `${Math.round(weatherData.list[0].wind.speed)} m/s`;

  tempConversionBtn.textContent = "F";
}

// temperature conversion
tempConversionBtn.addEventListener("click", (e) => {
  if (tempConversionBtn.textContent === "F") {
    temperature.textContent = Math.round(convertToF(+temperature.textContent));
    temperatureType.textContent = "F";
    feelsLikeTemp.textContent = Math.round(
      convertToF(+feelsLikeTemp.textContent)
    );
    feelsLikeTempType.textContent = "F";
    tempConversionBtn.textContent = "C";
  } else {
    temperature.textContent = Math.round(convertToC(+temperature.textContent));
    temperatureType.textContent = "C";
    feelsLikeTemp.textContent = Math.round(
      convertToC(+feelsLikeTemp.textContent)
    );
    feelsLikeTempType.textContent = "C";
    tempConversionBtn.textContent = "F";
  }
});

function convertToF(celsius) {
  return (celsius * 9) / 5 + 32;
}

function convertToC(fahrenheit) {
  return (fahrenheit - 32) * (5 / 9);
}

// display Klaipėda weather on page load
getWeather("klaipeda");
