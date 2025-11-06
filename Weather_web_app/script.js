const apiKey = "3b3542358021786139fca1dd06558b55";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherinfo = document.getElementById("weatherInfo");


searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        weatherinfo.innerHTML = "Loading...";
        getWeather(city);
    }else {
        weatherinfo.innerHTML = "Enter a value";
        setTimeout(() => {
            weatherinfo.innerHTML = "";
        }, 5000);
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
        weatherinfo.innerHTML = "City not found!";
        return;
    }

    weatherinfo.innerHTML = `
    <h2 id="cityName"></h2>
    <p id="temperature"></p>
    <p id="description"></p>
    <img id="icon">
    `

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = `${data.main.temp}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

}




