var mysql = require('../dbcon.js');

//=================================================================
// Attempt to update the max locations for the indicated user.
//================================================================= 
function updateMaxLocations(req,res,context,callback) {
  console.log('updateMaxLocations:');
  
  var values = [
    req.body.max_locs,
    req.body.user_username
    ];
  var queryStr = "UPDATE Users SET" +
                 " max_locs=?" +
                 " WHERE username=?";
  console.log("queryStr:");
  console.log(queryStr);
  console.log("values:");
  console.log(values);
  mysql.pool.query(queryStr, values, function(err, result){
    if(err){
      console.log("ERROR UPDATE !!!!");
      console.log(err);
      context.err_msg = err;
      callback(req,res,context);
    }
    else {
      // Max locations successfully updated.
      msg = "max_locs updated in Users table for " +
            req.body.user_username;
      console.log(msg);
      context.err_msg = msg;
      callback(req,res,context);
    }
  });
  
}

module.exports = { updateMaxLocations };