// WEATHER APP
const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "d9c1c767d2cc416990b23807240401";

weatherForm.addEventListener('submit', async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
            // console.log('ok');
        } catch(error) {
            console.error(err);
            displayError(error)
        }
    } else {
        displayError("Please enter a city");
    }

});

async function getWeatherData(city) {
    const apiURL = `http://api.weatherapi.com/v1/current.json?key=d9c1c767d2cc416990b23807240401&q=${city}&aqi=no`;

    const response = await fetch(apiURL);
    if(!response.ok) {
        displayError("Could not fetch Weather data / Invalid City");
    } 
    return await response.json();
}

function displayWeatherInfo(data) {
    console.log(data);
    const {
        location: {
            name: city,
            region: region,
            country: country,
            localtime: localtime,
        },
        current: {
            temp_c,
            humidity,
            condition =  [{
                text, icon,
            }],
        },
    } = data;

    card.textContent = "";
    card.style.display = "flex";

    const WeatherDesc = document.createElement('div');
    const cityInfo = document.createElement('div');
    const cityDisplay = document.createElement('h1');
    const time = document.createElement('p'); 
    const tempDisplay = document.createElement('p'); 
    const humidityDisplay = document.createElement('p'); 
    const descDisplay = document.createElement('p'); 
    const weatherEmoji = document.createElement('img'); 

    cityDisplay.textContent = `${city}, ${region}, ${country}`;
    time.textContent = `Date : ${localtime}`
    tempDisplay.textContent = `${temp_c}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`
    descDisplay.textContent = condition.text;

    WeatherDesc.classList.add('weatherDesc');
    weatherEmoji.classList.add('weatherEmoji');
    cityInfo.classList.add('cityInfo');
    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add('humidityDisplay');
    descDisplay.classList.add('weatherDesc');

    card.appendChild(WeatherDesc);
    WeatherDesc.appendChild(cityInfo);
    cityInfo.appendChild(cityDisplay);
    cityInfo.appendChild(time);
    cityInfo.appendChild(tempDisplay);
    cityInfo.appendChild(weatherEmoji);
    cityInfo.appendChild(humidityDisplay);
    cityInfo.appendChild(descDisplay);

    weatherEmoji.setAttribute('src', `https://${condition.icon}`);
};

function displayError(message) {
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent =  message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
};

// weatherapi.com account
// email : dejic88996@ubinert.com
// pass : kitabacabukulama123