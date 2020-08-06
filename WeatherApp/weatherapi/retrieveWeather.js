var myapp = require('../weatherApp.js');
var credentials = require('./credentials.js');
const request = require('request');

//=================================================================
// Attempt to retrieve the weather for the user's saved locations.
//================================================================= 
function retrieveWeather(req,res,context,callback) {
  console.log('retrieveWeather:');
  console.log(context);
  retrieveCurrentWeather(req,res,context,0,callback);
}

//=================================================================
// Attempt to retrieve the current weather.
//================================================================= 
function retrieveCurrentWeather(req,res,context,idx,callback) {
  console.log('retrieveCurrentCodeWeather:');
  
  if (idx < context.locs.length) {
    if (isNaN(context.locs[idx].place)){
      req_type = 'q'
    }
    else {
      req_type = 'zip'
    }

    request('http://api.openweathermap.org/data/2.5/weather?' +
            req_type + '=' +
            context.locs[idx].place +
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
        
        current = {"weatherTitle":weather_title,
                   "currently":currently,
                   "description":description,
                   "feelsLike":feelsLike,
                   "max":max,
                   "min":min,
                   "pressure":pressure,
                   "humid":humid,
                   "visib":visib,
                   "wind":wind};
        context.locs[idx-1].current = current;
        
      } else {
        console.log(err);
        console.log(response.statusCode);
      }
      // If there are more zipcodes, then get the weather
      // for the next zipcode. Otherwise, attempt to get
      // weather for city locations.
      if (idx < context.locs.length) {
        retrieveCurrentWeather(req,res,context,idx,callback);
      }
      else {
        context.locs[0].forecast = [];
        retrieveForecastWeather(req,res,context,0,callback);
      }
      return;
    }
  } else {
    // No locations.
    callback(req,res,context);
    return;
  }
}

//=================================================================
// Attempt to retrieve the forecast weather.
//================================================================= 
function retrieveForecastWeather(req,res,context,idx,callback) {
  console.log('retrieveForecastWeather:');
  
  if (idx < context.locs.length) {
    if (isNaN(context.locs[idx].place)){
      req_type = 'q'
    }
    else {
      req_type = 'zip'
    }

    request('http://api.openweathermap.org/data/2.5/forecast?' +
            req_type + '=' +
            context.locs[idx].place +
            '&units='+ context.units +'&APPID=' + 
            credentials.owmKey, 
            handleGet);
    
    function handleGet(err, response, body){
      idx += 1;
      if(!err && response.statusCode < 400){
        let forecast = JSON.parse(body);
        console.log(forecast);

        // Need to parse forecast here to get five-day
        // weather forecast. Forecast data is in a
        // list of 40 entries for each 3-hour interval
        // in the next five days (8 intervals per day *
        // five days). (Technically, you should look at
        // the cnt entry to ensure there are actually
        // 40 entries in the list.)
        //
        // The idea is that we would create five 'forecast'
        // objects in an array that would be appended to
        // context.locs[idx-1] so that the handlebars
        // file could operate on them.
        //
        // The code below is horrible, but it is a start
        // and gets minimal forecast info to the 
        // weather_future.handlebars file.
        let cnt = forecast.cnt;
        console.log('cnt=' + cnt);
        
        var temp_min;
        var temp_max;
        
        temp_min = forecast.list[0].main.temp_min;
        console.log('temp_min=' + temp_min);
        temp_max = forecast.list[0].main.temp_max;
        console.log('temp_max=' + temp_max);
        temps = {"hi":temp_max,"lo":temp_min};
        context.locs[idx-1].forecast.push(temps);
        
        temp_min = forecast.list[8].main.temp_min;
        console.log('temp_min=' + temp_min);
        temp_max = forecast.list[8].main.temp_max;
        console.log('temp_max=' + temp_max);
        temps = {"hi":temp_max,"lo":temp_min};
        context.locs[idx-1].forecast.push(temps);
        
        temp_min = forecast.list[16].main.temp_min;
        console.log('temp_min=' + temp_min);
        temp_max = forecast.list[16].main.temp_max;
        console.log('temp_max=' + temp_max);
        temps = {"hi":temp_max,"lo":temp_min};
        context.locs[idx-1].forecast.push(temps);
        
        temp_min = forecast.list[24].main.temp_min;
        console.log('temp_min=' + temp_min);
        temp_max = forecast.list[24].main.temp_max;
        console.log('temp_max=' + temp_max);
        temps = {"hi":temp_max,"lo":temp_min};
        context.locs[idx-1].forecast.push(temps);
        
        temp_min = forecast.list[32].main.temp_min;
        console.log('temp_min=' + temp_min);
        temp_max = forecast.list[32].main.temp_max;
        console.log('temp_max=' + temp_max);
        temps = {"hi":temp_max,"lo":temp_min};
        context.locs[idx-1].forecast.push(temps);
        
        console.log(context.locs[idx-1].forecast);
      } else {
        console.log(err);
        console.log(response.statusCode);
      }
      // If there are more zipcodes, then get the weather
      // for the next zipcode. Otherwise, attempt to get
      // weather for city locations.
      if (idx < context.locs.length) {
        context.locs[0].forecast = [];
        retrieveForecastWeather(req,res,context,idx,callback);
      }
      else {
          callback(req,res,context);
      }
      return;
    }
  } else {
    // No locations.
    callback(req,res,context);
    return;
  }
}

module.exports = { retrieveWeather };
