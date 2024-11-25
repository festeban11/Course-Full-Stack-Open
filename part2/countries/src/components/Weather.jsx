import React, { useState, useEffect } from 'react';

import axios from 'axios';
const Weather = ({ city }) => {
    const VITE_OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const [weather, setWeather] = useState([]);
  
    useEffect(() => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${VITE_OPENWEATHER_API_KEY}`
        )
        .then((response) => {
          setWeather(response.data);
        });
    }, []);

    return (
        <>
            {weather.main ? (
                <>
            <h2>Weather in {city}</h2>
            <p>Temperature: {weather.main.temp} Celsius</p>
            <img
            alt="weather icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
            <p>Wind: {weather.wind.speed} m/s</p>
            </>) : null}

        </>
    );
};
export default Weather;