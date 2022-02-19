const https = require('https');
//const http = require('http');
const api = require('./api.json');

// Print out temperature details
function printWeather(weather) {
  const message = `
    Location: ${weather.location.name}
    Forecast:  ${weather.current.condition.text}
    Temperature: ${weather.current.temp_c} C  
  `;
  console.log(message);
}
// Print out error message
function printError(error) {
  console.error(error.message);
}

function get(location) {
  const request = https.get(
    `https://api.weatherapi.com/v1/current.json?key=${api.key}&q=${location}&aqi=no`,
    (response) => {
      try {
        if (response.statusCode === 200) {
          let body = '';
          // Read the data
          response.on('data', (chunk) => {
            body += chunk;
          });
          response.on('end', () => {
            //console.log(body);
            // Parse the data
            const city = JSON.parse(body);
            // Print the data
            printWeather(city);
          });
        } else {
          const errorCode = new Error(
            `${location} is not found. (${response.statusMessage}-${
              response.statusCode
            })`
          );
          printError(errorCode);
        }
        request.on('error', printError);
      } catch (error) {
        printError(error);
      }
    }
  );
}

module.exports.get = get;
