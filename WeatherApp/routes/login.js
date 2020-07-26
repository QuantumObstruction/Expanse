//=================================================================
// login (handles gets/posts from login page)
//================================================================= 

var router = require('express').Router();
var db_pw = require('../db/passwordValidation');

router.get('/', function(req, res) {
    console.log('login get /');
    var context = {};
    res.render('login', context);
});

router.get('/login', function(req, res) {
    console.log('login get /login');
    var context = {};
    res.render('login', context);
});

router.get('/login.html', function(req, res) {
    console.log('login get /login.html');
    var context = {};
    context.title = "login";
    res.render('login', context);
});

router.get('/index', function(req, res) {
    console.log('login get /index');
    var context = {};
    context.title = "login";
    res.render('login', context);
});

router.get('/index.html', function(req, res) {
    console.log('login get /index.html');
    var context = {};
    context.title = "login";
    res.render('login', context);
});

router.post('/', function(req, res) {
    console.log('login post / req.body:')
    console.log(req.body);
    
    // ------------------------------------------------------------------  
    if(req.body['login']){
        if (req.body['login'] == 'Login') {
          console.log('handle login request');
          db_pw.passwordValidation(req,res,pwcallback);
            return;
        }
    }

    var context = {};
    context.title = "login";
    res.render('login', context);
});

function pwcallback(req,res,status){
  console.log('pwcallback');
  if (status) {
    res.redirect('weather?username=' +
                 req.body.username);
    return;
  }
  
  var context = {};
  context.err_msg = "No match for username/password";
  res.render('login', context);
}

module.exports = router;