var mysql = require('../dbcon.js');
var myapp = require('../weatherApp.js');
var db_loc = require('./retrieveLocations.js');

//=================================================================
// Attempt to validate the user's password.
//================================================================= 
function passwordValidation(req,res) {
  console.log('passwordValidation:');
  var context = {}
  context.username = req.body.username;

  if (myapp.dbEmulation == true){
    console.log('emulated successful password validation');
    db_loc.retrieveLocations(req,res);
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
      context.err_msg = "Error retrieving user data from database"
      res.render('login', context);
    }
    else {
      console.log(rows);
      if (rows.length == 1)
      {
        // Match is found.
        console.log('match found for username/password');
        db_loc.retrieveLocations(req,res);
      }
      else
      {
        console.log('no match for username/password');
        context.err_msg = "No match for username/password"
        res.render('login', context);
      }
    }
  });
}

module.exports = { passwordValidation };