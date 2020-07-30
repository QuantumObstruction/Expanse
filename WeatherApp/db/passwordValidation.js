var mysql = require('../dbcon.js');
var myapp = require('../weatherApp.js');
var db_loc = require('./retrieveLocations.js');

//=================================================================
// Attempt to validate the user's password.
//================================================================= 
function passwordValidation(req,res,pwcallback) {
  console.log('passwordValidation:');

  if (myapp.dbEmulation == true){
    console.log('emulated successful password validation');
    db_loc.retrieveLocations(req,res);
    pwcallback(req,res,true,"");
    return;
  }
  
  var query = 
    "SELECT * from Users" +
    " WHERE username = ? AND password = ?";
  console.log(query);
  var values = [
    req.body.username,
    req.body.password
  ];
  console.log(values)
  mysql.pool.query(query, values, function(err, rows, fields) {
    if(err){
      console.log("ERROR SELECT !!!!");
      console.log(err);
      pwcallback(req,res,false,err);
      return;
    }
    else {
      console.log(rows);
      if (rows.length == 1)
      {
        // Match is found.
        console.log('match found for username/password');
        pwcallback(req,res,true,"");
        return;
      }
      else
      {
        err_msg = 'no match for username/password';
        console.log(err_msg);
        pwcallback(req,res,false,err_msg);
        return;
      }
    }
  });
}

module.exports = { passwordValidation };