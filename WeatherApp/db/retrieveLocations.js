var mysql = require('../dbcon.js');
var myapp = require('../weatherApp.js');
var myweather = require('../weatherapi/retrieveWeather.js')

//=================================================================
// Attempt to retrieve the user's saved locations.
//================================================================= 
function retrieveLocations(req,res) {
  console.log('retrieveLocations:');
  context = {};
  context.username = req.body.username;
  retrieveCities(req,res,context);
}

//=================================================================
// Attempt to retrieve the user's saved zip codes.
//================================================================= 
function retrieveZipCodes(req,res,context) {
  console.log('retrieveZipCodes:');
  zipcodes = [];
  
  if (myapp.dbEmulation == true){
    console.log('emulated successful zip code retrieval');
    // Plug in some representative zipcodes like
    // we might get with a live database.
    zipcodes.push({"zipcode":"71655"});
    zipcodes.push({"zipcode":"75028"});
    context.zipcodes = zipcodes;
    retrieveCities(req,res,context);
    return;
  }
  
  var query = 
    "SELECT zipcode FROM CodeLocations" +
    " INNER JOIN UserCodeLocations" + 
    " ON UserCodeLocations.username = ?" +
    " WHERE UserCodeLocations.code_id = CodeLocations.code_id";
  console.log(query);
  var values = [
    req.body.username
  ];
  console.log(values);
  mysql.pool.query(query, values, function(err, rows, fields) {
    if(err){
      console.log("ERROR SELECT !!!!");
      console.log(err);
      context.err_msg = "Error retrieving zip codes from database"
      context.zipcodes = zipcodes;    
      retrieveCities(req, res, context);
    }
    else {
      console.log('zipcode rows:')
      console.log(rows);
      if (rows.length > 0)
      {
        for (var x in rows)
        {
          zipcodes.push({"zipcode":rows[x].zipcode
                    });
        }
        context.zipcodes = zipcodes;    
        retrieveCities(req, res, context);
      }
      else
      {
        console.log('no match for zip codes');
        context.zipcodes = zipcodes;    
        retrieveCities(req, res, context);
      }
    }
  });

}

//=================================================================
// Attempt to retrieve the user's saved city information.
//================================================================= 
function retrieveCities(req,res,context) {
  console.log('retrieveCities:');
  cities = [];
  
  if (myapp.dbEmulation == true){
    console.log('emulated successful city retrieval');
    // Plug in some representative city data like
    // we might get with a live database.
    cities.push({"city":"Corvallis",
                 "state":"OR",
                 "country":"US"
                 });
    cities.push({"city":"Portland",
                 "state":"OR",
                 "country":"US"
                 });
    cities.push({"city":"Portland",
                 "state":"ME",
                 "country":"US"
                 });
    context.cities = cities;
    myweather.retrieveWeather(req, res, context);
    return;
  }
  
  var query = 
    "SELECT Users.user_id, city, state, country FROM Users" +
    " INNER JOIN UserCityLocations" + 
    " ON UserCityLocations.user_id = Users.user_id" +
    " INNER JOIN CityLocations" +
    " ON UserCityLocations.city_id = CityLocations.city_id" +
    " WHERE Users.username = ?";
  console.log(query);
  var values = [
    req.body.username
  ];
  console.log(values);
  mysql.pool.query(query, values, function(err, rows, fields) {
    if(err){
      console.log("ERROR SELECT !!!!");
      console.log(err);
      context.err_msg = "Error retrieving cities from database"
      console.log(context);
      myweather.retrieveWeather(req, res, context);
    }
    else {
      console.log('cities rows:');
      console.log(rows);
      if (rows.length > 0)
      {
        for (var x in rows)
        {
          cities.push({"city":rows[x].city,
                       "state":rows[x].state,
                       "country":rows[x].country
                       });
        }
        context.cities = cities;
        context.user_id = rows[0].user_id;
        console.log('context:');
        console.log(context);
        myweather.retrieveWeather(req, res, context);
      }
      else
      {
        console.log('no match for cities');
        context.cities = cities;
        console.log('context:');
        console.log(context);
        myweather.retrieveWeather(req, res, context);
      }
    }
  });

}

module.exports = { retrieveLocations };