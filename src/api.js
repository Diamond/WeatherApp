var _ = require('lodash');

const kelvinToF = (kelvin) => {
  return Math.round((kelvin - 273.15) * 1.8 + 32) + '˚F';
};

const fetchWeather = (latitude, longitude) => {
  const apiKey = '47bd49997c8b4d32bd5acd244bb812f9';
  const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const fullUrl = `${baseUrl}?lat=${latitude}&lon=${longitude}&APPID=${apiKey}`;
  return fetch(fullUrl)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return {
        city: json.name,
        temperature: kelvinToF(json.main.temp),
        description: _.capitalize(json.weather[0].description),
      };
    });
};

export {fetchWeather};
