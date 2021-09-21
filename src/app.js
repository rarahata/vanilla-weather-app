function formatTime(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[date.getDay()];
    return `${hours}:${minutes}`;
}


function formatDate(timestamp){
    let date = new Date(timestamp);
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[date.getDay()];
    let months = ["January","February","March","April","May","June","July","August","Septemper","Octpber","November","December"];
    let month = months[date.getMonth()];
    return `${day}, ${month}`;
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
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt*1000);
    let timeElement = document.querySelector("#time");
    timeElement.innerHTML = formatTime(response.data.dt*1000);
}

let apiKey ="7796ed76d4738ed90e39d5875eb78f75";
let cityName ="Tokyo";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);