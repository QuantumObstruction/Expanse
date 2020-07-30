//=================================================================
// login (handles gets/posts from login page)
//================================================================= 

var router = require('express').Router();
var db_user = require('../db/createUser');

router.get('/', function(req, res) {
    console.log('register get /');
    var context = {};
    context.title = "register";
    res.render('register', context);
});

router.get('/register', function(req, res) {
    console.log('register get /register');
    var context = {};
    context.title = "register";
    res.render('register', context);
});

router.post('/', function(req, res) {
    console.log('register post / req.body:')
    console.log(req.body);
    
    // ------------------------------------------------------------------  
    if(req.body['submit']){
        console.log('handle register submit');
        db_user.createUser(req,res);
        return;
    }

    var context = {};
    context.title = "register";
    res.render('register', context);
});

module.exports = router;