const API_KEY = "737a84240c479e0d83ccf8059d402475";
const LAT = 5.638018;
const LON = -0.062313;
const UNITS = "metric";
const UNIT_LABEL = "°C";

function getDayName(unixTimestamp) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(unixTimestamp * 1000);
    return days[date.getDay()];
}

function capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getWeatherEmoji(iconCode) {
    const emojiMap = {
        "01d": "☀️",   // clear sky - day
        "01n": "🌙",   // clear sky - night
        "02": "🌤️",   // few clouds
        "03": "🌥️",   // scattered clouds
        "04": "☁️",   // broken / overcast clouds
        "09": "🌧️",   // shower rain
        "10": "🌦️",   // rain
        "11": "⛈️",   // thunderstorm
        "13": "❄️",   // snow
        "50": "🌫️",   // mist / fog / haze
    };
    const prefix = iconCode.slice(0, 2);
    return emojiMap[iconCode] || emojiMap[prefix] || "🌡️";
}

function formatLocalTime(unixTimestamp, timezoneOffsetSeconds) {
    const localMs = (unixTimestamp + timezoneOffsetSeconds) * 1000;
    const date = new Date(localMs);

    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    minutes = minutes.toString().padStart(2, "0");

    return `${hours}:${minutes} ${ampm}`;
}

async function fetchCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather`
        + `?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=${UNITS}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Current weather error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const iconCode = data.weather[0].icon;
    const emoji = getWeatherEmoji(iconCode);
    const temp = Math.round(data.main.temp);
    const description = capitalise(data.weather[0].description);
    const high = Math.round(data.main.temp_max);
    const low = Math.round(data.main.temp_min);
    const humidity = data.main.humidity;
    const timezone = data.timezone;
    const sunrise = formatLocalTime(data.sys.sunrise, timezone);
    const sunset = formatLocalTime(data.sys.sunset, timezone);
    const city = data.name;
    const country = data.sys.country;

    document.getElementById("weather-icon").textContent = emoji;
    document.getElementById("weather-temp").textContent = `${temp}${UNIT_LABEL}`;
    document.getElementById("weather-desc").textContent = description;
    document.getElementById("weather-high").textContent = `High: ${high}${UNIT_LABEL}`;
    document.getElementById("weather-low").textContent = `Low: ${low}${UNIT_LABEL}`;
    document.getElementById("weather-humidity").textContent = `Humidity: ${humidity}%`;
    document.getElementById("weather-sunrise").textContent = `Sunrise: ${sunrise}`;
    document.getElementById("weather-sunset").textContent = `Sunset: ${sunset}`;
}

async function fetchForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast`
        + `?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=${UNITS}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Forecast error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const noonReadings = data.list.filter(entry => entry.dt_txt.includes("12:00:00"));

    const threeDays = noonReadings.slice(0, 3);

    threeDays.forEach((entry, index) => {
        const dayName = getDayName(entry.dt);
        const temp = Math.round(entry.main.temp);
        const desc = capitalise(entry.weather[0].description);

        const container = document.getElementById(`forecast-day-${index}`);

        container.querySelector(".label").textContent = `${dayName}:`;
        container.querySelector(".f-temp").textContent = `${temp}${UNIT_LABEL} — ${desc}`;
    });
}

function showError(message) {
    const el = document.getElementById("weather-error");
    el.textContent = message;
    el.style.display = "block";
}

async function loadWeather() {
    try {
        await Promise.all([
            fetchCurrentWeather(),
            fetchForecast()
        ]);
    } catch (error) {
        console.error("Weather load failed:", error);
        showError("Weather data unavailable. Please check your API key or connection.");
    }
}

document.addEventListener("DOMContentLoaded", loadWeather);