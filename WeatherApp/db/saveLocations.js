var mysql = require('../dbcon.js');

//=================================================================
// Attempt to save the user's location.
//================================================================= 

//-----------------------------------------------------
function saveZipCode(req,res,context,callback){
  // console.log('saveZipCode:');
  // console.log('zipcode=' + context.place[0]);
  
  // Attempt to add zip code to CodeLocations table. (It
  // may already exist there. If so, that's okay.)
  var queryStr = 
    "INSERT INTO CodeLocations" +
    " (`zipcode`)" +
    " VALUES (?)";
  // console.log(queryStr);
  var values = [
    context.place[0]
  ];
  // console.log(values);
  mysql.pool.query(queryStr, values, function(err, result){
    if(err){
      if (err.code == 'ER_DUP_ENTRY') {
        // Zipcode already exists in database.
        // Attempt to connect username to zipcode
        // via UserCodeLocations table.
        console.log(err.code);
        saveUserZipCode(req,res,context,callback);
        return;
      }
      else {
        console.log(err.code);
        console.log("ERROR INSERT !!!!");
        console.log(err);
        context.err_msg = err;
        callback(req,res,context);
      }
    }
    else {
      // console.log('zipcode successfully inserted');
      saveUserZipCode(req,res,context,callback);
      return;
    }
  });
}

//-----------------------------------------------------
function saveUserZipCode(req,res,context,callback){
  // console.log('saveUserZipCode:');
  // console.log('username=' + context.username);
  // console.log('zipcode=' + context.place[0]);

  // Attempt to connect the username with the zip code 
  // via the UserCodeLocations table. (It may
  // already exist there. If so, that's okay.)
  var queryStr = 
    "INSERT INTO UserCodeLocations" +
    " (`user_id`,`code_id`)" +
    " VALUES (" +
    "(SELECT user_id FROM Users WHERE username=?)," +
    "(SELECT code_id FROM CodeLocations WHERE zipcode=?)" +
    ")";
  // console.log(queryStr);
  var values = [
    context.username,
    context.place[0]
  ];
  // console.log(values);
  mysql.pool.query(queryStr, values, function(err, result){
    if(err){
      if (err.code == 'ER_DUP_ENTRY') {
        console.log(err.code);
        // Connection already exists in database.
        // Nothing more to do.
        callback(req,res,context);
        return;
      }
      else {
        console.log(err.code);
        console.log("ERROR INSERT !!!!");
        console.log(err);
        context.err_msg = err;
        callback(req,res,context);
      }
    }
    else {
      // console.log('connection successfully inserted');
      callback(req,res,context);
    }
  });
}

//-----------------------------------------------------
function saveCity(req,res,context,callback){
  // console.log('saveZipCode:');
  // console.log('place=' + context.place);
  
  // Attempt to add zip code to CodeLocations table. (It
  // may already exist there. If so, that's okay.)
  var queryStr = 
    "INSERT INTO CityLocations" +
    " (`city`,`state`,`country`)" +
    " VALUES (?,?,?)";
  // console.log(queryStr);
  var values = [
    context.place[0],
    context.place[1],
    context.place[2]
  ];
  // console.log(values);
  mysql.pool.query(queryStr, values, function(err, result){
    if(err){
      if (err.code == 'ER_DUP_ENTRY') {
        // City already exists in database.
        // Attempt to connect username to zipcode
        // via UserCodeLocations table.
        console.log(err.code);
        saveUserCity(req,res,context,callback);
        return;
      }
      else {
        console.log(err.code);
        console.log("ERROR INSERT !!!!");
        console.log(err);
        context.err_msg = err;
        callback(req,res,context);
      }
    }
    else {
      // console.log('city successfully inserted');
      saveUserCity(req,res,context,callback);
      return;
    }
  });
}

//-----------------------------------------------------
function saveUserCity(req,res,context,callback){
  // console.log('saveUserZipCode:');
  // console.log('username=' + context.username);
  // console.log('place=' + context.place);

  // Attempt to connect the username with the city 
  // via the UserCityLocations table. (It may
  // already exist there. If so, that's okay.)
  var queryStr = 
    "INSERT INTO UserCityLocations" +
    " (`user_id`,`city_id`)" +
    " VALUES (" +
    "(SELECT user_id FROM Users WHERE username=?)," +
    "(SELECT city_id FROM CityLocations " +
    "WHERE city=? AND state=? AND country=?)" +
    ")";
  // console.log(queryStr);
  var values = [
    context.username,
    context.place[0],
    context.place[1],
    context.place[2]
  ];
  // console.log(values);
  mysql.pool.query(queryStr, values, function(err, result){
    if(err){
      if (err.code == 'ER_DUP_ENTRY') {
        console.log(err.code);
        // Connection already exists in database.
        // Nothing more to do.
        callback(req,res,context);
        return;
      }
      else {
        console.log(err.code);
        console.log("ERROR INSERT !!!!");
        console.log(err);
        context.err_msg = err;
        callback(req,res,context);
      }
    }
    else {
      // console.log('connection successfully inserted');
      callback(req,res,context);
    }
  });
}

module.exports = { saveZipCode, saveCity };
