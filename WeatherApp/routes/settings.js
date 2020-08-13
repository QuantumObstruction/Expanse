var db_loc = require('../db/updateMaxLocations.js');

//=================================================================
// settings (handles gets/posts from settings page)
//================================================================= 

var router = require('express').Router();
var db_user = require('../db/retrieveUserInfo');

// ======================================================
router.get('/', function(req, res) {
    // console.log('settings get /');
    handle_get(req, res);
});

router.get('/settings', function(req, res) {
    // console.log('settings get /settings');
    handle_get(req, res);
});

router.get('/settings.html', function(req, res) {
    // console.log('settings get /settings.html');
    handle_get(req, res);
});

// ======================================================
function handle_get(req, res) {
  // console.log('handle_get:');
  // console.log(req.query);
  var context = {};
  context.title = "settings";
  context.username = req.query.username;
  db_user.retrieveUserInfo(req,res,context,user_cb);
}

// ---------------------------------------------------
function user_cb(req, res, context) {
  // console.log('user_cb:');
  res.render('settings', context);
}

// ======================================================
router.post('/', function(req, res) {
    // console.log('settings post / req.body:')
    // console.log(req.body);
    
    // -----------------------------------------------------  
    if(req.body['submit']){
        if (req.body['submit'] == 'updateMaxLocs') {
          // console.log('handle update max locs request');
          handle_update_max_locs(req,res);
          return;
        }
    }

    var context = {};
    context.title = "settings";
    context.username = req.body.username;
    res.render('settings', context);
});

// ---------------------------------------------------------
function handle_update_max_locs(req,res) {
    // console.log('handle_update_max_locs_request:')
    var context = {};
    context.title = "settings";
    context.username = req.body.username;
    db_loc.updateMaxLocations(req,res,context,update_loc_callback);
    return;    
}

function update_loc_callback(req,res,context) {
    // console.log('update_loc_callback');
    db_user.retrieveUserInfo(req,res,context,user_cb);
    return;
}

module.exports = router;
