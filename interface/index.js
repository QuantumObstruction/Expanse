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
const port =8081;
app.listen(port,()=>{
console.log(`App running on ${port}`);
})


let apiKey = '843397ebf59e59ab18f5e5733c88938e';
let city = argv.c || 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`


request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    console.log(message);
  }
});
