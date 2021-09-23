function formatTime(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    } 
    if (hours < 10){
        hours = `0${hours}`;
    }
    return `${hours}:${minutes}`;
}


function showTemperature(response){
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML =Math.round(response.data.main.temp);
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

function search(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-Input");
    let h1 = document.querySelector("#city");
    h1.innerHTML = cityInputElement.value;
    let apiKey ="7796ed76d4738ed90e39d5875eb78f75";
    let cityName =cityInputElement.value;
    let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
