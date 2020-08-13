var mysql = require('../dbcon.js');

//=================================================================
// Attempt to validate the user's password.
//================================================================= 
function deleteLocation(req,res,context,callback) {
  // console.log('deleteLocation:');
  // console.log(req.body.place);
  place = req.body.place.split(",");
  if (isNaN(place[0])){
    deleteCityLocation(req,res,context,callback);
  }
  else {
    deleteZipcodeLocation(req,res,context,callback);
  }
}

function deleteCityLocation(req,res,context,callback) {
  // console.log('deleteCityLocation:');
  place = req.body.place.split(",");
  var queryStr = 
    "DELETE FROM UserCityLocations " +
    "WHERE UserCityLocations.user_id = " +
    "(SELECT user_id from Users WHERE username = ?) " +
    "AND " +
    "UserCityLocations.city_id = " +
    "(SELECT city_id from CityLocations WHERE " +
    "city = ? AND " +
    "state = ? AND " +
    "country = ?)";  
  // console.log('queryStr=' + queryStr);
  var values = [
    req.body.username,
    place[0],
    place[1],
    place[2]
  ];
  // console.log('values=' + values);
  mysql.pool.query(queryStr, values, function(err, result){
    if(err){
      console.log(err.code);
      console.log("ERROR DELETE !!!!");
      console.log(err);
      context.err_msg = err;
      callback(req,res,context);
      return;
    }
    else {
      // console.log('location connection successfully deleted');
      callback(req,res,context);
      return;
    }
  });
}

function deleteZipcodeLocation(req,res,context,callback) {
  // console.log('deleteZipcodeLocation:');
  var queryStr = 
    "DELETE FROM UserCodeLocations " +
    "WHERE UserCodeLocations.user_id = " +
    "(SELECT user_id from Users WHERE username = ?) " +
    "AND " +
    "UserCodeLocations.code_id = " +
    "(SELECT code_id from CodeLocations WHERE " +
    "zipcode = ?)";  
  // console.log('queryStr=' + queryStr);
  var values = [
    req.body.username,
    req.body.place
  ];
  // console.log('values=' + values);
  mysql.pool.query(queryStr, values, function(err, result){
    if(err){
      console.log(err.code);
      console.log("ERROR DELETE !!!!");
      console.log(err);
      context.err_msg = err;
      callback(req,res,context);
      return;
    }
    else {
      // console.log('location connection successfully deleted');
      callback(req,res,context);
      return;
    }
  });
}

module.exports = { deleteLocation };
