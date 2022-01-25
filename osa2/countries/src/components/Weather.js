import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital, country }) => {
  const location = [capital, country].join(", ");
  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: location,
  };

  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", { params })
      .then((response) => {
        setWeather(response.data.current);
        console.log(weather);
      });
  }, []);

  return (
    <div>
      <h2>
        Weather in {capital}, {country}
      </h2>
      <p>temperature: {weather.temperature}</p>
      <p>feels like: {weather.feelslike}</p>
      <p>uv-index: {weather.uv_index}</p>
      <p>wind speed: {weather.wind_speed}</p>
      <p>observed at: {weather.observation_time}</p>
    </div>
  );
};

export default Weather;
