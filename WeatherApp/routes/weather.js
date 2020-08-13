var db_loc = require('../db/retrieveLocations.js');
var weather_api = require('../weatherapi/retrieveWeather.js');
var db_save = require('../db/saveLocations.js');
var db_user = require('../db/retrieveUserInfo.js');
var db_sub = require('../db/deleteLocation.js');

//=================================================================
// weather (handles gets/posts from weather page)
//=================================================================

var router = require('express').Router();

//=================================================================
router.get('/', function(req, res) {
  // console.log('weather get /');
  handle_get(req, res);
});

//-----------------------------------------------------------
router.get('/weather', function(req, res) {
  // console.log('weather get /weather');
  handle_get(req, res);
});

//-----------------------------------------------------------
router.get('/weather.html', function(req, res) {
  // console.log('weather get /weather.html');
  handle_get(req, res);
});

//-----------------------------------------------------------
function handle_get(req, res){
  // console.log('req.body:');
  // console.log(req.query);
  var context = {};
  context.title = "weather";
  context.username = req.query.username;
  context.units = "imperial";
  // console.log('context.username=' + context.username);
  // console.log('context.units=' + context.units);

  // Retrieve the user's info and saved locations
  db_user.retrieveUserInfo(req,res,context,max_loc_callback);
  return;
}

//----------------------------------------------------
function max_loc_callback(req,res,context){
  // console.log('max_loc_callback');
  db_loc.retrieveLocations(req,res,context,loc_callback);
  return;
}

//-----------------------------------------------------------
function loc_callback(req,res,context){
  // console.log('loc_callback:');
  // Now that we've retrieve the user's locations,
  // we can retrieve the user's weather.
  weather_api.retrieveWeather(req,res,context,
                              weather_callback);
  return;
}

//-----------------------------------------------------------
function weather_callback(req,res,context){
  // console.log('weather_callback:');
  // console.log(context);
  res.render('weather', context);
  return;
}

//=================================================================
router.post('/', function(req, res) {
    // console.log('weather post / req.body:')
    // console.log(req.body);

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

    if(req.body['subtract']) {
     handle_subtract(req,res);
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
function handle_subtract(req,res){
  // console.log('handle_subtract:');
  var context = {};
  context.title = "weather";
  context.username = req.query.username;
  context.units = "imperial";
  // console.log('context.username=' + context.username);
  // console.log('context.units=' + context.units);

  // Retrieve the user's info and saved locations
  db_sub.deleteLocation(req,res,context,del_callback);
}

function del_callback(req,res,context){
  // console.log('del_callback:');
  db_user.retrieveUserInfo(req,res,context,max_loc_callback);
}

//----------------------------------------------------
function handle_units(req,res){
  // console.log('handle_units');
  context = {};
  context.title = "weather";
  context.username = req.query.username;
  context.units= req.body.units;

  db_user.retrieveUserInfo(req,res,context,max_loc_callback);
  return;
}


//----------------------------------------------------
function handle_search(req,res){
  // console.log('handle_search');
  context = {};
  context.title = "weather";
  context.username = req.body.username;
  context.units = "imperial";
  context.locs = [];
  place = req.body.place.split(",");
  // Did user provide zipcode or city?
  if (isNaN(place[0])){
    loc = place[0] + "," +
          place[1] + "," +
          place[2];
    context.locs.push({"place":loc});
  }
  else {
    context.locs.push({"place":place[0]});
  }

  weather_api.retrieveWeather(req,res,context,
                              weather_callback);
  return;
}

//----------------------------------------------------
function handle_add(req,res){
  // console.log('handle_add');
  context = {};
  context.title = "weather";
  context.units = "imperial";
  context.username = req.body.username;
  context.place = req.body.place.split(",");
  // Has user used up max_locs?
  db_user.retrieveUserInfo(req,res,context,user_callback);
  return;
}

//----------------------------------------------------
function user_callback(req,res,context){
  // console.log('user_callback');
  db_loc.retrieveLocations(req,res,context,check_callback);
  return;
}

//----------------------------------------------------
function check_callback(req,res,context){
  // console.log('check_callback');
  if (context.locs.length < context.max_locs)
  {
    // Did user provide zipcode or city?
    place = req.body.place.split(",");
    if (isNaN(place[0])){
      db_save.saveCity(req,res,context,add_callback);
    }
    else {
      db_save.saveZipCode(req,res,context,add_callback);
    }
  }
  else
  {
    context.err_msg = "max_locs already used";
    add_callback(req,res,context);
  }
  return;
}

//----------------------------------------------------
function add_callback(req,res,context){
  // console.log('add_callback');
  db_loc.retrieveLocations(req,res,context,loc_callback);
  return;
}

module.exports = router;
