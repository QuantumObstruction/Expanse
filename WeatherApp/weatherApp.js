//=================================================================
// weatherApp (main app)
//================================================================= 

var express = require('express');
var mysql = require('./dbcon.js');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 54322);

app.use('/', require('./routes/login'));
app.use('/login', require('./routes/login'));
app.use('/login.html', require('./routes/login'));
app.use('/index', require('./routes/login'));
app.use('/index.html', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/register.html', require('./routes/register'));
app.use('/settings', require('./routes/settings'));
app.use('/settings.html', require('./routes/settings'));
app.use('/weather', require('./routes/weather'));
app.use('/weather.html', require('./routes/weather'));

//=================================================================
// General error handlers
//================================================================= 

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

//=================================================================
// Update message below based on where app is running
//================================================================= 

app.listen(app.get('port'), function(){
  console.log('Express started on port ' + 
              app.get('port') + 
              '; press Ctrl-C to terminate.');
});
