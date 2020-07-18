var mysql = require('../dbcon.js');
var myapp = require('../weatherApp.js');
var db_loc = require('./retrieveLocations.js');

//=================================================================
// Attempt to validate the user's password.
//================================================================= 
function createUser(req,res) {
  console.log('createUser:');
  var context = {};
  context.username = req.body.username;
  context.password = req.body.password;
  context.email = req.body.email;

  if (myapp.dbEmulation == true){
    console.log('emulated successful user creation');
    db_loc.retrieveLocations(req,res);
    return;
  }
  
  var queryStr = 
    "INSERT INTO Users" +
    " (`username`, `password`, `email_addr`, `admin_flag`)" +
    " VALUES (?, ?, ?, false)";
  console.log(queryStr);
  var values = [
    req.body.username,
    req.body.password,
    req.body.email
  ];
  console.log(values);
  mysql.pool.query(queryStr, values, function(err, result){
    if(err){
      if (err.code == 'ER_DUP_ENTRY') {
        console.log('username already exists in database');
        context.err_msg = "username already exists in database";
        res.render('register', context);
        return;
      }
      else {
        console.log(err.code);
        console.log("ERROR INSERT !!!!");
        console.log(err);
        context.err_msg = err;
        res.render('register', context);
        return;
      }
    }
    else {
      console.log('username successfully created');
      db_loc.retrieveLocations(req,res);
    }
  });
}

module.exports = { createUser };