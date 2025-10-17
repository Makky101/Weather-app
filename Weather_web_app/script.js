const apiKey = "3b3542358021786139fca1dd06558b55";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const suggestions = document.getElementById("suggestions");
const weatherinfo = document.getElementById("weatherInfo")


searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    document.getElementById("cityName").textContent = "Loading...";
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
        alert("City not found!");
        return;
    }

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = `${data.main.temp}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
}

cityInput.addEventListener("input", async () => {
    const query = cityInput.value;
    if (!query) {
        suggestions.innerHTML = "";
        return;
    }

    //Fetch cities from GeoDB API
    const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`,
        {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "128ad28389mshb953e64ec8c312ap1ac6dfjsnf06d7a3b77db",
                "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
            }
        }
    );

    const data = await response.json();
    const cities = data.data.map(city => city.city);


    suggestions.innerHTML = "";
    cities.forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;
        li.addEventListener("click", () => {
            cityInput.value = city;
            suggestions.innerHTML = "";
        });
        suggestions.appendChild(li);
    });
});