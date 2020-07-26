var myapp = require('../weatherApp.js');
var credentials = require('./credentials.js');
const request = require('request');

//=================================================================
// Attempt to retrieve the weather for the user's saved locations.
//================================================================= 
function retrieveWeather(req,res,context,callback) {
  console.log('retrieveWeather:');
  console.log('context:');
  console.log(context);
  if ("zipcodes" in context) {
    if (context.zipcodes.length > 0){
      retrieveZipCodeWeather(req,res,context,callback);
      return;
    }
  }
  // If no zipcodes, attempt to retrieve weather 
  // from cities array.
  retrieveCityWeather(req,res,context,callback);
}

//=================================================================
// Attempt to retrieve the weather based on saved zip codes.
//================================================================= 
function retrieveZipCodeWeather(req,res,context,callback) {
  console.log('retrieveZipCodeWeather:');
  console.log('zipcodes:')
  console.log(context);
  
  if (context.zipcodes.length > 0) {
    request('http://api.openweathermap.org/data/2.5/weather?zip=' +
            context.zipcodes[0].zipcode +
            '&units=imperial&APPID=' + 
            credentials.owmKey, 
            handleGet);
    
    function handleGet(err, response, body){
      if(!err && response.statusCode < 400){
        let weather = JSON.parse(body);
        let message0 = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        let message1 = `In ${weather.name} the forecast is currently ${weather.weather[0].description}`;
        let message2 = `It feel's like ${weather.main.feels_like} degrees in ${weather.name}!`;
        let message3 = `${weather.name} has projected High's of ${weather.main.temp_max} degrees`;
        let message4 = `${weather.name} has projected Low's of ${weather.main.temp_min} degrees`;
        let message5 = `${weather.name} Atmospheric Pressure ${weather.main.pressure} hPa`;
        let message6 = `${weather.name} Humidity ${weather.main.humidity} %`;
        let message7 = `${weather.name} Visibilty ${(weather.visibility)} ft`;
        let message8 = `${weather.name} Wind Speed: ${(weather.wind.speed)} mph`;
        let message9 = `${weather.name} Wind Speed: ${(weather.wind.speed)} mph`;
        
        console.log(message0);
        console.log(message1);
        console.log(message2);
        console.log(message3);
        console.log(message4);
        console.log(message5);
        console.log(message6);
        console.log(((weather.visibility)/5280).toPrecision(2) + " miles");
        console.log(message8);
        console.log(message9);

        context.weather_city = `${weather.name}`;
        context.weather_current_temp = `${weather.main.temp}`;
        callback(req,res,context);
        return;
      } else {
        console.log(err);
        console.log(response.statusCode);
        callback(req,res,context);
        return;
      }
    }
  } else {
    callback(req,res,context);
    return;
  }
}

//=================================================================
// Attempt to retrieve the weather based on city information.
//================================================================= 
function retrieveCityWeather(req,res,context,callback) {
  console.log('retrieveCityWeather:');
  console.log('cities:')
  console.log(context);
  
  if (context.cities.length > 0) {
    request('http://api.openweathermap.org/data/2.5/weather?q=' +
            context.cities[0].city +
            ',' +
            context.cities[0].state +
            ',' +
            context.cities[0].country +
            '&units=imperial&APPID=' + 
            credentials.owmKey, 
            handleGet);
    
    function handleGet(err, response, body){
      if(!err && response.statusCode < 400){
        let weather = JSON.parse(body);
        let message0 = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        let message1 = `In ${weather.name} the forecast is currently ${weather.weather[0].description}`;
        let message2 = `It feel's like ${weather.main.feels_like} degrees in ${weather.name}!`;
        let message3 = `${weather.name} has projected High's of ${weather.main.temp_max} degrees`;
        let message4 = `${weather.name} has projected Low's of ${weather.main.temp_min} degrees`;
        let message5 = `${weather.name} Atmospheric Pressure ${weather.main.pressure} hPa`;
        let message6 = `${weather.name} Humidity ${weather.main.humidity} %`;
        let message7 = `${weather.name} Visibilty ${(weather.visibility)} ft`;
        let message8 = `${weather.name} Wind Speed: ${(weather.wind.speed)} mph`;
        let message9 = `${weather.name} Wind Speed: ${(weather.wind.speed)} mph`;
        
        console.log(message0);
        console.log(message1);
        console.log(message2);
        console.log(message3);
        console.log(message4);
        console.log(message5);
        console.log(message6);
        console.log(((weather.visibility)/5280).toPrecision(2) + " miles");
        console.log(message8);
        console.log(message9);

        context.weather_city = `${weather.name}`;
        context.weather_current_temp = `${weather.main.temp}`;
        callback(req,res,context);
        return;
      } else {
        console.log(err);
        console.log(response.statusCode);
        callback(req,res,context);
        return;
      }
    }
  } else {
    callback(req,res,context);
    return;
  }
}

module.exports = { retrieveWeather };