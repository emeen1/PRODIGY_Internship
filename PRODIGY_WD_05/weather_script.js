const apiKey = 'd6f9fdee3f5730f6b61332d44e67a62b'; 

const images = {
    'snow': 'images/snow.png',
    'rain': 'images/rain.png',
    'mist': 'images/mist.png',
    'clouds': 'images/cloud.png',
    'clear': 'images/clear.png'
};
async function getWeather() {
    const location = document.getElementById('location').value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    
    if (data.cod === 200) {
        displayWeather(data);
    } else {
        document.getElementById('weather').innerHTML = '<p>Location not found.</p>';
    }
}

async function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                document.getElementById('weather').innerHTML = '<p>Location not found.</p>';
            }
        });
    } else {
        document.getElementById('weather').innerHTML = '<p>Geolocation is not supported by this browser.</p>';
    }
}

function displayWeather(data) {
    const weatherMain = data.weather[0].main.toLowerCase();
    const weatherIcon = images[weatherMain] || images['default'];

    document.getElementById('weather').innerHTML = `
        <div class="weather-left">
            <h2 class="city-name">${data.name}</h2>
            <p class="weather-temp">${data.main.temp}°C</p>
        </div>
        <img src="${weatherIcon}" alt="Weather Icon" class="weather-icon">
        <div class="weather-info">
            <div class="weather-details">
                <div class="weather-detail">
                    <p class="detail-value">${data.main.humidity}%</p>
                    <p><i class="fas fa-tint"></i> Humidity</p>
                </div>
                <div class="weather-detail">
                    <p class="detail-value">${data.wind.speed} km/h</p>
                    <p><i class="fas fa-wind"></i> Wind Speed</p>
                </div>
            </div>
        </div>
    `;
}
