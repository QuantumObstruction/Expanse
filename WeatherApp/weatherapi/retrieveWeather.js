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
  context.current = []
  if ("zipcodes" in context) {
    if (context.zipcodes.length > 0){
      retrieveZipCodeWeather(req,res,context,0,callback);
      return;
    }
  }
  // If no zipcodes, attempt to retrieve weather 
  // from cities array.
  retrieveCityWeather(req,res,context,0,callback);
}

//=================================================================
// Attempt to retrieve the weather based on saved zip codes.
//================================================================= 
function retrieveZipCodeWeather(req,res,context,idx,callback) {
  console.log('retrieveZipCodeWeather:');
  console.log('zipcodes:');
  console.log(context);
  
  if (idx < context.zipcodes.length) {
    request('http://api.openweathermap.org/data/2.5/weather?zip=' +
            context.zipcodes[idx].zipcode +
            '&units='+ context.units +'&APPID=' + 
            credentials.owmKey, 
            handleGet);
    
    function handleGet(err, response, body){
      idx += 1;
      if(!err && response.statusCode < 400){
        let weather = JSON.parse(body);
        
          let message00 = `${weather.name}`;
          let message0 = `${weather.main.temp} degrees`;
          let message1 = `${weather.weather[0].description}`;
          let message2 = `${weather.main.feels_like} degrees`;
          let message3 = `${weather.main.temp_max} degrees`;
          let message4 = `${weather.main.temp_min} degrees`;
          let message5 = `${weather.main.pressure} hPa`;
          let message6 = `${weather.main.humidity}%`;
          let message7 = `${(weather.visibility)} ft`;
          let message8 = `${(weather.wind.speed)} mph`;

          console.log(message0);
          console.log(message1);
          console.log(message2);
          console.log(message3);
          console.log(message4);
          console.log(message5);
          console.log(message6);
          console.log(((weather.visibility)/5280).toPrecision(2) + " miles");
          console.log(message8);

          weather_title = message00;
          currently = message0;
          description = message1;
          feelsLike = message2;
          max = message3;
          min = message4;
          pressure = message5;
          humid = message6;
          visib = message7;
          wind = message8;
          
          context.current.push({"weatherTitle":weather_title});
          context.current.push({"currently":currently});
          context.current.push({"description":description});
          context.current.push({"feelsLike":feelsLike});
          context.current.push({"max":max});
          context.current.push({"min":min});
          context.current.push({"pressure":pressure});
          context.current.push({"humid":humid});
          context.current.push({"visib":visib});
          context.current.push({"wind":wind});
        
      } else {
        console.log(err);
        console.log(response.statusCode);
      }
      // If there are more zipcodes, then get the weather
      // for the next zipcode. Otherwise, attempt to get
      // weather for city locations.
      if (idx < context.zipcodes.length) {
        retrieveZipCodeWeather(req,res,context,idx,callback);
      }
      else {
        retrieveCityWeather(req,res,context,0,callback);
      }
      return;
    }
  } else {
    // No zipcodes. Attempt to get weather for city
    // locations.
    retrieveCityWeather(req,res,context,0,callback);
    return;
  }
}

//=================================================================
// Attempt to retrieve the weather based on city information.
//================================================================= 
function retrieveCityWeather(req,res,context,idx,callback) {
  console.log('retrieveCityWeather:');
  console.log('cities:');
  console.log(context);
  
  if ("cities" in context) {
    if (idx < context.cities.length) {
      request('http://api.openweathermap.org/data/2.5/weather?q=' +
              context.cities[idx].city +
              ',' +
              context.cities[idx].state +
              ',' +
              context.cities[idx].country +
              '&units='+ context.units +'&APPID=' + 
              credentials.owmKey, 
              handleGet);
      
      function handleGet(err, response, body){
        idx += 1;
        if(!err && response.statusCode < 400){
          let weather = JSON.parse(body);
          
          let message00 = `${weather.name}`;
          let message0 = `${weather.main.temp} degrees`;
          let message1 = `${weather.weather[0].description}`;
          let message2 = `${weather.main.feels_like} degrees`;
          let message3 = `${weather.main.temp_max} degrees`;
          let message4 = `${weather.main.temp_min} degrees`;
          let message5 = `${weather.main.pressure} hPa`;
          let message6 = `${weather.main.humidity}%`;
          let message7 = `${(weather.visibility)} ft`;
          let message8 = `${(weather.wind.speed)} mph`;

          console.log(message0);
          console.log(message1);
          console.log(message2);
          console.log(message3);
          console.log(message4);
          console.log(message5);
          console.log(message6);
          console.log(((weather.visibility)/5280).toPrecision(2) + " miles");
          console.log(message8);

          weather_title = message00;
          currently = message0;
          description = message1;
          feelsLike = message2;
          max = message3;
          min = message4;
          pressure = message5;
          humid = message6;
          visib = message7;
          wind = message8;
        
          context.current.push({"weatherTitle":weather_title});
          context.current.push({"currently":currently});
          context.current.push({"description":description});
          context.current.push({"feelsLike":feelsLike});
          context.current.push({"max":max});
          context.current.push({"min":min});
          context.current.push({"pressure":pressure});
          context.current.push({"humid":humid});
          context.current.push({"visib":visib});
          context.current.push({"wind":wind});

        } else {
          console.log(err);
          console.log(response.statusCode);
        }
        // If there are more zipcodes, then get the weather
        // for the next zipcode. Otherwise, attempt to get
        // weather for city locations.
        if (idx < context.cities.length) {
          retrieveCityWeather(req,res,context,idx,callback);
        }
        else {
          callback(req,res,context);
        }
        return;
      }
    } else {
      callback(req,res,context);
      return;
    }
  }
  else
  {
    callback(req,res,context);
    return;
  }
}

module.exports = { retrieveWeather };
