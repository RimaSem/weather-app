const searchForm = document.querySelector("form");
const tempConversionBtn = document.querySelector(".temp-type-btn");
const temperature = document.querySelector(".temperature");
const temperatureType = document.querySelector(".temperature-type");
const feelsLikeTemp = document.querySelector(".temp");
const feelsLikeTempType = document.querySelector(".type");

searchForm.addEventListener("submit", (e) => e.preventDefault());

// temperature conversion
tempConversionBtn.addEventListener("click", (e) => {
  if (tempConversionBtn.textContent === "°F") {
    temperature.textContent = Math.round(convertToF(+temperature.textContent));
    temperatureType.textContent = "F";
    feelsLikeTemp.textContent = Math.round(
      convertToF(+feelsLikeTemp.textContent)
    );
    feelsLikeTempType.textContent = "F";
    tempConversionBtn.textContent = "°C";
  } else {
    temperature.textContent = Math.round(convertToC(+temperature.textContent));
    temperatureType.textContent = "C";
    feelsLikeTemp.textContent = Math.round(
      convertToC(+feelsLikeTemp.textContent)
    );
    feelsLikeTempType.textContent = "C";
    tempConversionBtn.textContent = "°F";
  }
});

function convertToF(celsius) {
  return (celsius * 9) / 5 + 32;
}

function convertToC(fahrenheit) {
  return (fahrenheit - 32) * (5 / 9);
}
