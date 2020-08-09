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
            handleWeatherGet);

    function handleWeatherGet(err, response, body){
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
        weatherIcon = weatherIconParser(description)
        currentlySelected= false;

        //tidy up the format for nice display
        currently = Math.round(currently.slice(0, 2))

        //check to see if the selected city number is the same one we're lookng at
        if (context.selectCityNumber==idx)
        {
          currentlySelected=true;
        }

        current = {"weatherTitle":weather_title,
                   "currently":currently,
                   "description":description,
                   "feelsLike":feelsLike,
                   "max":max,
                   "min":min,
                   "pressure":pressure,
                   "humid":humid,
                   "visib":visib,
                   "wind":wind,
                   "isCurrentlySelected":currentlySelected,
                   "weatherIcon":weatherIcon};
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
  console.log('retrieveForecastWeather: idx=' + idx);

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
            handleForecastGet);

    function handleForecastGet(err, response, body){
      idx += 1;
      console.log('handleForecastGet: idx=' + idx);
      if(!err && response.statusCode < 400){
        let forecast = JSON.parse(body);
        // console.log(forecast);

        let cnt = forecast.cnt;
        console.log('cnt=' + cnt);

        var x;
        var y = 0;   // this is essentially a date index
        var new_day = true;
        var temp_min;
        var temp_max;
        var temp_date;
        var temp_main;
        var temp_description;
        var weatherIcon;

        // We typically expect to get 40 lists (8 3-hour intervals per
        // day x five-day forecast). But the 3-hour interval forecasts
        // typically won't start neatly on whole-day boundaries so
        // we'll usually end up with six days.
        for (x = 0; x < cnt; x++)
        {
          if (!new_day)
          {
            temp_date = forecast.list[x].dt_txt.split(" ");
            if (temp_date[0] != context.locs[idx-1].forecast[y].date)
            {
              new_day = true;
              y += 1;
            }
          }

          var temp_min = forecast.list[x].main.temp_min;
          var temp_max = forecast.list[x].main.temp_max;
          var temp_date = forecast.list[x].dt_txt.split(" ");
          var temp_main = forecast.list[x].weather[0].main;
          var temp_description = forecast.list[x].weather[0].description;
          var weatherIcon = weatherIconParser(temp_description)


          var tempAverage = -42
          var niceDate = -42
          var niceMin = -42
          var niceMax = -42;

          if (new_day)
          {

            temps = {"hi":temp_max,
                     "lo":temp_min,
                     "date":temp_date[0],
                     "main":temp_main,
                     "desc":temp_description,
                     "weatherIcon":weatherIcon,
                     "niceMin":niceMin,
                     "niceMax":niceMax,
                     "tempAvg":tempAverage,
                     "niceDate":niceDate};

            context.locs[idx-1].forecast.push(temps);
            new_day = false;
          }
          else
          {
            // Determine if this 3-hour interval has a 'higher' hi
            // or 'lower' lo than we've previously detected for
            // this date.
            if (temp_min < context.locs[idx-1].forecast[y].lo)
            {
              context.locs[idx-1].forecast[y].lo = temp_min;
            }

            if (temp_max > context.locs[idx-1].forecast[y].hi)
            {
              context.locs[idx-1].forecast[y].hi = temp_max;
            }



          }
        }

        //adding some prettier data to the forecasts for the frontend
        for (x in context.locs[idx-1].forecast)
        {
          context.locs[idx-1].forecast[x].tempAvg = (context.locs[idx-1].forecast[x].lo + context.locs[idx-1].forecast[x].hi)/2
          context.locs[idx-1].forecast[x].tempAvg = Math.round(context.locs[idx-1].forecast[x].tempAvg)
          context.locs[idx-1].forecast[x].niceMin = Math.round(context.locs[idx-1].forecast[x].lo)
          context.locs[idx-1].forecast[x].niceMax = Math.round(context.locs[idx-1].forecast[x].hi)

          var dateString = context.locs[idx-1].forecast[x].date.toString().slice(5-10)
          context.locs[idx-1].forecast[x].niceDate = dateString


        }

      }
      else
      {
        console.log(err);
        console.log(response.statusCode);
      }

      // If there are more locations, then get the forecast
      // for the next location.
      if (idx < context.locs.length) {
        context.locs[idx].forecast = [];
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














// -------------------------------------------------------
// The weather will often change during the day, so
// the description for one 3-hour interval could below
// different than the description for another 3-hour
// interval during the same day. For our purposes,
// we'll assume the user is most interested in the
// 'worst' weather on a given day. Here's the order
// of weather conditions I'm implementing (see
// https://openweathermap.org/weather-conditions):
//   thunderstorm
//   snow
//   rain
//   shower rain
//   mist
//   broken clouds
//   scattered clouds
//   few clouds
//   clear sky

function weatherIconParser(weatherString)
{
  const cloudrain = 'rain';
	const bolt = 'storm';
	const snowflake = 'snow';
	const cloudsun = 'partly';
	const cloud =  'cloud';
	const sun = 'clear';

  weatherString = weatherString.toLowerCase()

	if(weatherString.includes(sun))
	{
		return 'sun';
	}
	else if(weatherString.includes(snowflake))
	{
		return 'snowflake';
	}
	else if(weatherString.includes(bolt) || weatherString.includes('thunderstorm') )
	{
		return 'bolt';
	}
	else if(weatherString.includes(cloudrain) || weatherString.includes("shower") )
	{
		return 'cloud-rain';
	}
	else if(weatherString.includes(cloud) || weatherString.includes("clouds"))
	{
		return 'cloud';
	}
	else if(weatherString.includes(cloudsun) || weatherString.includes("mist"))
	{
		return 'cloud-sun';
	}
	else
	{
		return 'question';
	}


}













module.exports = { retrieveWeather };
