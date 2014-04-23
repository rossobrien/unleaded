// server.js

// Import modules 
var express    = require('express');
var app        = express();
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
	
//Set application port
var port = process.env.PORT || 8080;

// DB config
var db = require('./config/db');
//mongoose.connect(db.url);

//Read POST data
app.use(bodyParser());
app.use(express.static(__dirname + '/www'));

// Route config
var router = express.Router();

// Default API route
router.get('/', function(req, res) {
	res.json({ message: 'Welcome to the Unleaded.io API' });	
});

// API routes
app.use('/api', router);

// Frontend routes
app.get('*', function(req, res) {
	res.sendfile('./www/index.html');
});

// Run app
app.listen(port);
console.log('Magic happens on port ' + port); 
exports = module.exports = app;