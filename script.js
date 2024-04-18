// Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
const apiKey = 'a3d761eb54ed0c73e7268d4c0776f6d2';

// Function to fetch weather data by city name
function searchWeather() {
  const searchInput = document.getElementById('searchInput').value;
  if (searchInput) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;

    fetchWeatherData(apiUrl);
  }
}

// Function to fetch weather data based on current location
function fetchWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      fetchWeatherData(apiUrl);
    }, error => {
      console.error('Error getting location:', error);
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}

// Function to fetch weather data from API and display it on the webpage
function fetchWeatherData(apiUrl) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

// Function to display current weather data
function displayCurrentWeather(data) {
  const locationElement = document.getElementById('location');
  const currentTempElement = document.getElementById('currentTemp');
  const descriptionElement = document.getElementById('description');
  const dateTimeElement = document.getElementById('dateTime');

  const date = new Date();
  const dateTimeString = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  dateTimeElement.textContent = dateTimeString;

  locationElement.textContent = data.name + ', ' + data.sys.country;
  currentTempElement.textContent = 'Temperature: ' + Math.round(data.main.temp) + '°C';
  descriptionElement.textContent = 'Description: ' + data.weather[0].description;
}
