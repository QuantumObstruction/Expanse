var myapp = require('../weatherApp.js');

//=================================================================
// Attempt to retrieve the weather for the user's saved locations.
//================================================================= 
function retrieveWeather(req,res,context) {
  console.log('retrieveWeather:');
  retrieveZipCodeWeather(req,res,context);
}

//=================================================================
// Attempt to retrieve the weather based on saved zip codes.
//================================================================= 
function retrieveZipCodeWeather(req,res,context) {
  console.log('retrieveZipCodeWeather:');
  console.log('zipcodes:')
  console.log(context);
  retrieveCityWeather(req,res,context);  
}

//=================================================================
// Attempt to retrieve the weather based on city information.
//================================================================= 
function retrieveCityWeather(req,res,context) {
  console.log('retrieveCityWeather:');
  console.log('cities:')
  console.log(context);
  res.render('weather', context);

}

module.exports = { retrieveWeather };