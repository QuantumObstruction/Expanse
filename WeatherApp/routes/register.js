//=================================================================
// login (handles gets/posts from login page)
//================================================================= 

var router = require('express').Router();
var db_user = require('../db/createUser');

router.get('/', function(req, res) {
    var context = {};
    res.render('login', context);
});

router.get('/register', function(req, res) {
    var context = {};
    res.render('register', context);
});

router.post('/', function(req, res) {
    console.log(req.body);
    
    // ------------------------------------------------------------------  
    if(req.body['login']){
        console.log('handle login request');
        context = {};
        res.render('login', context);
        return;
    }
    
    // ------------------------------------------------------------------  
    if(req.body['submit']){
        console.log('handle register submit');
        db_user.createUser(req,res);
        return;
    }

    var context = {};
    res.render('register', context);
});

module.exports = router;