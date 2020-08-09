var mysql = require('../dbcon.js');
var myweather = require('../weatherapi/retrieveWeather.js')

//=================================================================
// Attempt to retrieve the user's saved locations.
//================================================================= 
function retrieveLocations(req,res,context,callback) {
  console.log('retrieveLocations:');
  context.locs = []
  retrieveZipCodes(req,res,context,callback);
}

//=================================================================
// Attempt to retrieve the user's saved zip codes.
//================================================================= 
function retrieveZipCodes(req,res,context,callback) {
  console.log('retrieveZipCodes:');
  
  var query = 
    "SELECT Users.user_id, zipcode FROM Users" +
    " INNER JOIN UserCodeLocations" + 
    " ON UserCodeLocations.user_id = Users.user_id" +
    " INNER JOIN CodeLocations" +
    " ON UserCodeLocations.code_id = CodeLocations.code_id" +
    " WHERE Users.username = ?";
  console.log(query);
  var values = [
    context.username
  ];
  console.log(values);
  mysql.pool.query(query, values, function(err, rows, fields) {
    if(err){
      console.log("ERROR SELECT !!!!");
      console.log(err);
      context.err_msg = "Error retrieving zip codes from database"
      retrieveCities(req, res, context, callback);
      return;
    }
    else {
      console.log('zipcode rows:')
      console.log(rows);
      if (rows.length > 0)
      {
        for (var x in rows)
        {
          if (context.locs.length >= context.max_locs)
          {
            context.err_msg = "max_locs exceeded - locs truncated";
            callback(req, res, context);
            return;
          }
          else
          {
            context.locs.push({"place":rows[x].zipcode});
          }
        }
        retrieveCities(req, res, context, callback);
        return;
      }
      else
      {
        console.log('no match for zip codes');
        retrieveCities(req, res, context, callback);
        return;
      }
    }
  });

}

//=================================================================
// Attempt to retrieve the user's saved city information.
//================================================================= 
function retrieveCities(req,res,context,callback) {
  console.log('retrieveCities:');
  
  var query = 
    "SELECT Users.user_id, city, state, country FROM Users" +
    " INNER JOIN UserCityLocations" + 
    " ON UserCityLocations.user_id = Users.user_id" +
    " INNER JOIN CityLocations" +
    " ON UserCityLocations.city_id = CityLocations.city_id" +
    " WHERE Users.username = ?";
  console.log(query);
  var values = [
    context.username
  ];
  console.log(values);
  mysql.pool.query(query, values, function(err, rows, fields) {
    if(err){
      console.log("ERROR SELECT !!!!");
      console.log(err);
      context.err_msg = "Error retrieving cities from database"
      console.log(context);
      callback(req, res, context);
      return;
    }
    else {
      console.log('cities rows:');
      console.log(rows);
      if (rows.length > 0)
      {
        for (var x in rows)
        {
          if (context.locs.length >= context.max_locs)
          {
            context.err_msg = "max_locs exceeded - locs truncated";
            callback(req, res, context);
            return;
          }
          else
          {
            loc = rows[x].city + "," +
                  rows[x].state + "," +
                  rows[x].country;
            context.locs.push({"place":loc});
          }
        }
        context.user_id = rows[0].user_id;
        callback(req, res, context);
      }
      else
      {
        console.log('no match for cities');
        callback(req, res, context);
      }
    }
  });

}

module.exports = { retrieveLocations };