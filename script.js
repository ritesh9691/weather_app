const apiKey = "763c8ee2186c2f1e831d06b5fd7c7e08";
const weatherData = document.getElementById("weather-data");

const city = document.getElementsByClassName("app-title");

const cityInput = document.getElementById("city-name");
console.log(cityInput.value);

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInput.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);

    const temperature = data.main.temp;
    weatherData.querySelector(".temprature").innerHTML = `${Math.round(
      temperature
    )} ℃`;
    const description = data.weather[0].description;
    weatherData.querySelector(".description").innerHTML = description;
    const icon = data.weather[0].icon;
    weatherData.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather Icon" height="200" width="200" >`;

    // const details = [
    //   (humidity = data.main.humidity),
    //   (windSpeed = data.wind.speed),
    //   (feelsLike = data.main.feels_like),
    // ];

   
     const humidity = document.getElementById("humidity");
     humidity.textContent = `humidity : ${data.main.humidity} %`
    const wind = document.getElementById("wind");
    wind.textContent = `wind speed : ${data.wind.speed} m/s`

    const feelsElement = document.getElementById("feels");
    feelsElement.textContent = `feels like : ${Math.round(data.main.feels_like)} ℃`
  } catch (error) {}
}
