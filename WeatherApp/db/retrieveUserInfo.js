var mysql = require('../dbcon.js');

//=================================================================
// Attempt to retrieve the user's information.
//================================================================= 
function retrieveUserInfo(req,res,context,callback) {
  // console.log('retrieveUserInfo:');
  
  var query = 
    "SELECT email_addr, max_locs, admin_flag FROM Users" +
    " WHERE Users.username = ?";
  // console.log(query);
  var values = [
    context.username
  ];
  // console.log(values);
  mysql.pool.query(query, values, function(err, rows, fields) {
    if(err){
      console.log("ERROR SELECT !!!!");
      console.log(err);
      context.err_msg = err
      callback(req, res, context);
      return;
    }
    else {
      // console.log('user rows:')
      // console.log(rows);
      if (rows.length > 0)
      {
        context.email = rows[0].email_addr;
        context.max_locs = rows[0].max_locs;
        context.admin = rows[0].admin_flag;
        callback(req, res, context);
        return;
      }
      else
      {
        err_msg = 'no match for user in database';
        console.log(err_msg);
        context.err_msg = err_msg;    
        callback(req, res, context);
        return;
      }
    }
  });
}

module.exports = { retrieveUserInfo };
