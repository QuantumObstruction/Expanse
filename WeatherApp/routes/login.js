//=================================================================
// login (handles gets/posts from login page)
//================================================================= 

var router = require('express').Router();
var db_pw = require('../db/passwordValidation');

router.get('/', function(req, res) {
    var context = {};
    res.render('login', context);
});

router.get('/login', function(req, res) {
    var context = {};
    res.render('login', context);
});

router.get('/login.html', function(req, res) {
    var context = {};
    res.render('login', context);
});

router.post('/', function(req, res) {
    console.log(req.body);
    
    // ------------------------------------------------------------------  
    if(req.body['login']){
        console.log('handle login request');
        db_pw.passwordValidation(req,res);
        return;
    }

    var context = {};
    res.render('login', context);
});

module.exports = router;