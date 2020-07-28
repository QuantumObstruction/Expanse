
//=================================================================
// settings (handles gets/posts from settings page)
//================================================================= 

var router = require('express').Router();
var db_user = require('../db/retrieveUserInfo');

// ======================================================
router.get('/', function(req, res) {
    console.log('settings get /');
    handle_get(req, res);
});

router.get('/settings', function(req, res) {
    console.log('settings get /settings');
    handle_get(req, res);
});

router.get('/settings.html', function(req, res) {
    console.log('settings get /settings.html');
    handle_get(req, res);
});

// ======================================================
function handle_get(req, res) {
  console.log(req.query);
  var context = {};
  context.title = "weather";
  context.username = req.query.username;
  db_user.retrieveUserInfo(req,res,context,user_cb);
}

// ---------------------------------------------------
function user_cb(req, res, context) {
  res.render('settings', context);
}

// ======================================================
router.post('/', function(req, res) {
    console.log('settings post / req.body:')
    console.log(req.body);
    
    // ------------------------------------------------------------------  
    if(req.body['settings']){
        if (req.body['login'] == 'Login') {
          console.log('handle login request');
          return;
        }
        else if (req.body['login'] == 'Register') {
          console.log('handle register request');
          context = {};
          res.render('register', context);
          return;
        }
    }

    var context = {};
    context.title = "settings";
    res.render('settings', context);
});

module.exports = router;