/**
 * server.js
 *
 * Define Node Server
 */

// Import modules 
var express    = require('express');
var app        = express();
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');

/**
 * Backend config
 */

//Set application port
var port = process.env.PORT || 8080;

// DB config
var db = require('./config/db');
mongoose.connect(db.url);

//Import models
var Trip = require('./app/models/trip');


/**
 * API config
 */

//Read POST data
app.use(bodyParser());
app.use(express.static(__dirname + '/www'));

//Setup API routes
var router = express.Router();
router.get('/', function(req, res) {
	res.json({ message: 'Welcome to the Unleaded.io API' });	
});

//Trips group routes
router.route('/trips')
	
	/**
	 * Create Trip
	 * 
	 * @param  req POST request
	 * @param  res Result to send back to the browser
	 * 
	 * @return JSON message
	 */
	.post(function(req, res) {
		
		//Create trip and load data from request
		var trip = new Trip();
		trip.date    = req.body.date;
		trip.station = req.body.station;
		trip.cost    = req.body.cost;
		trip.gallons = req.body.gallons;
		trip.mileage = req.body.mileage;
		trip.comment = req.body.comment;

		//Save trip
		trip.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Trip created!' });
		});
		
	})

	/**
	 * Get all trips
	 * 
	 * @param  req Request object
	 * @param  res Result object to send back to the browser
	 * 
	 * @return Trips[] All trips
	 */
	.get(function(req, res) {
		Trip.find(function(err, trips) {
			if (err)
				res.send(err);

			res.json(trips);
		});
	});

//Individual trip routes
router.route('/trips/:trip_id')

	/**
	 * Get an indivdual trip
	 * 
	 * @param  req Request object
	 * @param  res Result object to send back to the browser
	 * 
	 * @return Trip Single trip object
	 */
	.get(function(req, res) {
		Trip.findById(req.params.trip_id, function(err, trip) {
			if (err)
				res.send(err);

			res.json(trip);
		});
	})

	/**
	 * Update an indivdual trip
	 * 
	 * @param  req POST request object
	 * @param  res Result object to send back to the browser
	 * 
	 * @return JSON message
	 */
	.put(function(req, res) {

		//Load trip object
		Trip.findById(req.params.trip_id, function(err, trip) {

			if (err)
				res.send(err);

			//Update fields
			trip.date    = req.body.date;
			trip.station = req.body.station;
			trip.cost    = req.body.cost;
			trip.gallons = req.body.gallons;
			trip.mileage = req.body.mileage;
			trip.comment = req.body.comment;

			//Save trip
			trip.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Trip updated!' });
			});

		});
	})

	/**
	 * Delete an indivdual trip
	 * 
	 * @param  req Request object
	 * @param  res Result object to send back to the browser
	 * 
	 * @return JSON message
	 */
	.delete(function(req, res) {
		Trip.remove({
			_id: req.params.trip_id
		}, function(err, trip) {
			if (err)
				res.send(err);

			res.json({ message: 'Trip deleted!' });
		});
	});


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