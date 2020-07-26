//=================================================================
// settings (handles gets/posts from settings page)
//================================================================= 

var router = require('express').Router();

router.get('/', function(req, res) {
    console.log('settings get /');
    var context = {};
    res.render('settings', context);
});

router.get('/settings', function(req, res) {
    console.log('settings get /settings');
    var context = {};
    res.render('settings', context);
});

router.get('/settings.html', function(req, res) {
    console.log('settings get /settings.html');
    var context = {};
    res.render('settings', context);
});


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