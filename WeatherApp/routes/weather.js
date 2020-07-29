var db_loc = require('../db/retrieveLocations.js');
var weather_api = require('../weatherapi/retrieveWeather.js');
var db_save = require('../db/saveLocations.js');

//=================================================================
// weather (handles gets/posts from weather page)
//================================================================= 

var router = require('express').Router();

//================================================================= 
router.get('/', function(req, res) {
  console.log('weather get /');
  handle_get(req, res);
});

//-----------------------------------------------------------
router.get('/weather', function(req, res) {
  console.log('weather get /weather');
  handle_get(req, res);
});

//-----------------------------------------------------------
router.get('/weather.html', function(req, res) {
  console.log('weather get /weather.html');
  handle_get(req, res);
});

//-----------------------------------------------------------
function handle_get(req, res){
  console.log('req.body:');
  console.log(req.query);
  var context = {};
  context.title = "weather";
  context.username = req.query.username;
  context.units = "imperial";
  console.log('context.username=' + context.username);
  console.log('context.units=' + context.units);
  
  // Retrieve the user's saved locations
  db_loc.retrieveLocations(req,res,context,loc_callback);
  return;
}

//-----------------------------------------------------------
function loc_callback(req,res,context){
  console.log('loc_callback:');
  // Now that we've retrieve the user's locations,
  // we can retrieve the user's weather.
  weather_api.retrieveWeather(req,res,context,
                              weather_callback);
  return;
}

//-----------------------------------------------------------
function weather_callback(req,res,context){
  console.log('weather_callback:');
  res.render('weather', context);
  return;
}

//================================================================= 
router.post('/', function(req, res) {
    console.log('weather post / req.body:')
    console.log(req.body);
    
    // ------------------------------------------------------------------  
    if(req.body['search']){
      handle_search(req,res);
      return;
    }

    // ------------------------------------------------------------------  
    if(req.body['add']){
      handle_add(req,res);
      return;
    }
    
   if(req.body['units']) {
     handle_units(req,res);
     return;
    }

    var context = {};
    context.title = "weather";
    res.render('weather', context);
});

//----------------------------------------------------
function handle_units(req,res){
  console.log('handle_units');
  context = {};
  context.title = "weather";
  context.username = req.query.username;
  context.units= req.body.units;
  
 db_loc.retrieveLocations(req,res,context,loc_callback);
  return;
}


//----------------------------------------------------
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

//----------------------------------------------------
function handle_add(req,res){
  console.log('handle_add');
  context = {};
  context.title = "weather";
  context.username = req.body.username;
  place = req.body.place.split(",");
  context.place = place;
  // Did user provide zipcode or city?
  if (isNaN(place[0])){
    db_save.saveCity(req,res,context,add_callback);
  }
  else {
    db_save.saveZipCode(req,res,context,add_callback);
  }
  return;
}

//----------------------------------------------------
function add_callback(req,res,context){
  console.log('add_callback');
  db_loc.retrieveLocations(req,res,context,loc_callback);
  return;
}

module.exports = router;
