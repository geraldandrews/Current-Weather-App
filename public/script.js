//const { response } = require("express");

const weatherInfo = document.getElementById('weather-info');
const cityName = document. getElementById('city');
const form = document.querySelector('form');
const forecastContainer = document.querySelector('.forecast-container');
const weatherIcon = document.querySelector('.weather-icon');


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityName.value;
    getWeatherInfo(cityValue);
}); 

async function getWeatherInfo(cityValue) {
    try {
        const response = await fetch(`/api?q=${cityValue}&units=imperial`);
        //const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=imperial&appid=${apikey}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
 
        const data = await response.json(); 
        const temperature = Math.round(data.main.temp);
        let description = data.weather[0].description; 
        const icon = data.weather[0].icon; 
        //const icon = `img/weather/${weather[0]['icon']}.svg`;

        const elements = [
            `Feels like: ${Math.round(data.main.feels_like)}°F`,
            `Humidity: ${data.main.humidity}%`,
            `Wind: ${Math.round(data.wind.speed)} mph`,
        ];

      let condition = data.weather[0].icon;
      let backgroundImage = '';
      // Select images based on condition
      switch(condition.toLowerCase()) {
        case '01d': backgroundImage = '/img/clear.jpeg'; break;
        case '01n': backgroundImage = '/img/clear night.jpg'; break;
        case '02d': backgroundImage = '/img/few-clouds.jpg'; break;
        case '02n': backgroundImage = '/img/night clouds.webp'; break;
        case '03d': backgroundImage = '/img/few-clouds.jpg'; break;
        case '03n': backgroundImage = '/img/night clouds.webp'; break;
        case '04d': backgroundImage = '/img/cloudy.webp'; break;
        case '04n': backgroundImage = '/img/night clouds.jpg '; break;
        case '09d': backgroundImage = '/img/rain.jpeg'; break;
        case '09n': backgroundImage = '/img/rain-night.jpg'; break;
        case '10d': backgroundImage = '/img/rain.jpeg'; break;
        case '10n': backgroundImage = '/img/rain-night.jpg'; break;
        case '11d': backgroundImage = '/img/lightning-day.webp'; break;
        case '11n': backgroundImage = '/img/storm.jpeg'; break;
        case '13d': backgroundImage = '/img/snow.webp'; break;
        case '13n': backgroundImage = '/img/snow-night.jpg'; break;
        case '50d': backgroundImage = '/img/mist.webp'; break;
        case '50n': backgroundImage = '/img/mist-night.jpg'; break;
        default: backgroundImage = '/img/default.jpeg';
      }

      // Create a style element and set the selected image as the background
      let styleNode = document.createElement("style");
      document.head.appendChild(styleNode);
      styleNode.innerHTML = `html body { background-image: url('${backgroundImage}'); }`;

        weatherInfo.querySelector('.city-name').innerHTML = `The weather in ${cityValue}`;
        //weatherInfo.querySelector('.weather-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherInfo.querySelector('.weather-icon').innerHTML = `<img src="img/weather/${icon}.png">`;
        weatherInfo.querySelector('.air-temperature').textContent = `${temperature}°F`;
        weatherInfo.querySelector('.weather-description').textContent = description;
        weatherInfo.querySelector('.elements').innerHTML = elements.map((element) => `<div>${element}</div>`).join("");
    } catch (error) {
        weatherInfo.querySelector('.city-name').innerHTML = "";
        //weatherInfo.querySelector('.weather-icon').innerHTML = "";
        weatherInfo.querySelector('.air-temperature').textContent = "";
        weatherInfo.querySelector('.weather-description').textContent = "Please enter a valid city.";
        weatherInfo.querySelector('.elements').innerHTML = "";
    }
}
 
