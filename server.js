/**
 * server.js
 *
 * Define Node Server
 */

// Import modules 
var express      = require('express');
var app          = express();
var mongoose     = require('mongoose'),
	bodyParser   = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session      = require('express-session')
	passport     = require('passport');

/**
 * Backend config
 */

//Set application port
var port = process.env.PORT || 8080;

// DB config
var db = require('./app/config/db');
mongoose.connect(db.url);

// Configure Passport for authentication
require('./app/config/passport')(passport);
app.use(cookieParser());
app.use(session({ 
	secret: 'unl3aded app', 
	resave: false, 
	saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * API config
 */

//Read POST data
app.use(bodyParser());
app.use(express.static(__dirname + '/www'));

//Setup API routes
var router = express.Router();
require('./app/routes')(router);

//Register routes
app.use('/api', router);

/**
 * Frontend config
 */

//Load index file to use AngularJS routes
app.get('*', function(req, res) {
	res.sendfile('./www/index.html');
});

// Run app
app.listen(port);
console.log('Magic happens on port ' + port); 
exports = module.exports = app;