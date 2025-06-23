// API Key dari OpenWeatherMap (Daftar gratis di https://openweathermap.org/)
const API_KEY = '7b9cc2c23f2e42843686bd2fbebdc9dd'; 

// Elemen DOM
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const currentDate = document.getElementById('current-date');
const temp = document.getElementById('temp');
const weatherIcon = document.getElementById('weather-icon');
const weatherDesc = document.getElementById('weather-desc');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

// Format tanggal
function formatDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('id-ID', options);
}

// Fetch data cuaca
async function getWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=id`
        );
        
        if (!response.ok) {
            throw new Error('Kota tidak ditemukan');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
        return null;
    }
}

// Update UI dengan data cuaca
function updateWeatherUI(data) {
    cityName.textContent = data.name;
    temp.textContent = Math.round(data.main.temp);
    weatherDesc.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/jam`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    currentDate.textContent = formatDate();
}

// Event listeners
searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (city) {
        const weatherData = await getWeatherData(city);
        if (weatherData) {
            updateWeatherUI(weatherData);
        }
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Load data default saat pertama kali buka
window.addEventListener('load', async () => {
    const defaultCity = 'Jakarta';
    const weatherData = await getWeatherData(defaultCity);
    if (weatherData) {
        updateWeatherUI(weatherData);
    }
});