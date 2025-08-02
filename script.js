const searchForm = document.querySelector(".weather_search");
const searchInput = document.getElementById("search");
const w_city = document.querySelector(".city_name");
const dateTime = document.querySelector(".date_time");
const w_forecast = document.querySelector(".weather_forecast");
const body = document.querySelector(".weather_body");

const w_icon = document.querySelector(".weather_icon");
const w_temparature = document.querySelector(".temparature");

const min = document.querySelector(".min_temp");
const max = document.querySelector(".max_temp");


const w_feels = document.querySelector(".feels_like");
const w_humidity = document.querySelector(".humidity_value");
const w_speed = document.querySelector(".wind_speed");
const w_pressure = document.querySelector(".pressure_value");

// to get the Country code
let city = "New Delhi";

// searchForm.addEventListener("submit", (e) => {
//     e.preventDefault(); // Prevent page reload
//     city = searchInput.value.trim();
//     if (city !== "") {
//         getWeatherData();
//     }
// });
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = document.getElementById("search");
    city = cityName.value;

    getWeatherData();

    cityName.value = "";

});

const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
};
//to get the current date and time  
const getDateTime = (dt) => {
    const currDate = new Date(dt * 1000);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(currDate);
};

const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5231a61f5e9667c5356ef7b4834e3016`;
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();

        const { main, name, weather, wind, sys, dt } = data;
        // console.log(data);
        w_city.innerHTML = `${name},${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML = ` ${weather[0].main}`;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" />`;

        w_temparature.innerHTML = `${main.temp}&#176`;
        min.innerHTML = `Min:${main.temp_min.toFixed()}&#176`;
        max.innerHTML = `Max:${main.temp_max.toFixed()}&#176`;

        w_feels.innerHTML = `${main.feels_like.toFixed(2)} &#176`;
        w_humidity.innerHTML = `${main.humidity} %`;
        w_speed.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;

    } catch (error) {
        console.log(error);

    }
}

document.body.addEventListener("load", getWeatherData());