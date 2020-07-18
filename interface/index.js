const express = require('express');
const request = require('request');
const argv = require('yargs').argv;
const path = require('path');
const app=express();

const http = require('http');
const hostname = '127.0.0.1';

app.get('/*', (req, res) => {
res.sendFile(path.join(__dirname, './index.html'));
})
const port =8080;
app.listen(port,()=>{
console.log(`App running on ${port}`);
})

let zip = argv.z || '97303';
let countrycode = 'US';
let apiKey = '843397ebf59e59ab18f5e5733c88938e';
let city = argv.c || 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
let units = argv.u || 'imperial';

let url1 = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},${countrycode}&units=${units}&appid=${apiKey}`;
//console.log(zip);

request(url1, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
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
    
  }
});
