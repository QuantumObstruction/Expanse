var db_loc = require('../db/retrieveLocations.js');
var weather_api = require('../weatherapi/retrieveWeather.js');

//=================================================================
// weather (handles gets/posts from weather page)
//================================================================= 

var router = require('express').Router();

router.get('/', function(req, res) {
  console.log('weather get /');
  handle_get(req, res);
});

router.get('/weather', function(req, res) {
  console.log('weather get /weather');
  handle_get(req, res);
});

router.get('/weather.html', function(req, res) {
  console.log('weather get /weather.html');
  handle_get(req, res);
});

function handle_get(req, res){
  console.log('req.body:');
  console.log(req.query);
  var context = {};
  context.title = "weather";
  context.username = req.query.username;
  console.log('context.username=' + context.username);
  // Retrieve the user's saved locations
  db_loc.retrieveLocations(req,res,context,loc_callback);
  return;
}

function loc_callback(req,res,context){
  console.log('loc_callback:');
  // Now that we've retrieve the user's locations,
  // we can retrieve the user's weather.
  weather_api.retrieveWeather(req,res,context,
                              weather_callback);
  return;
}

function weather_callback(req,res,context){
  console.log('weather_callback:');
  res.render('weather', context);
  return;
}

router.post('/', function(req, res) {
    console.log('weather post / req.body:')
    console.log(req.body);
    
    // ------------------------------------------------------------------  
    if(req.body['search']){
      handle_search(req,res);
      return;
    }

    var context = {};
    context.title = "weather";
    res.render('weather', context);
});

function handle_search(req,res){
  console.log('handle_search');
  context = {};
  context.title = "weather";
  context.username = req.body.username;
  place = req.body.place.split(",");
  // Did user provide zipcode or city?
  if (isNaN(place[0])){
    cities = [];
    cities.push({"city":place[0],
                 "state":place[1],
                 "country":place[2]
                });
    context.cities = cities;
  }
  else {
    zipcodes = [];
    zipcodes.push({"zipcode":place[0]});
    context.zipcodes = zipcodes;
  }
    
  weather_api.retrieveWeather(req,res,context,
                              weather_callback);
  return;
}

module.exports = router;