function formatTime(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    let day = days[date.getDay()];
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    } 
    if (hours < 10){
        hours = `0${hours}`;
    }
    return `${day} ${hours}:${minutes}`;
}

function showFahrenheit(event){
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let fahrenheitTemp = document.querySelector("#temp");
  fahrenheitTemp.innerHTML = Math.round((celciusTemperature * 9/5) + 32);
}

function showCelsius(event){
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemp = document.querySelector("#temp");
  celsiusTemp.innerHTML = Math.round(celciusTemperature);
}

function showTemperature(response){
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML =Math.round(response.data.main.temp);
    celciusTemperature = response.data.main.temp;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let timeElement = document.querySelector("#time");
    timeElement.innerHTML = formatTime(response.data.dt*1000);  
    let iconElement = document.querySelector("#weather-icon");
    iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
}

function search(city){
    let apiKey ="7796ed76d4738ed90e39d5875eb78f75";
    let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-Input");
    search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

search("New York");

