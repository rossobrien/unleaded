var mongoose = require('mongoose'),
	Tank     = require('../models/tank')

/**
 * Get all tanks
 * 
 * @param  req Request object
 * @param  res Result object to send back to the browser
 * 
 * @return Tanks[] All tanks
 */
exports.all = function(req, res) {
	Tank.find(function(err, tanks) {
		if (err)
		{
			res.json(500, err);
		}

		res.json(tanks);
	});
};

/**
 * Get an indivdual tank
 * 
 * @param  req Request object
 * @param  res Result object to send back to the browser
 * 
 * @return Tank Single tank object
 */
exports.find = function(req, res) {
	Tank.findById(req.params.tank_id, function(err, tank) {
		if (err)
		{
			res.send(err);
		}

		res.json(tank);
	});
};

/**
 * Create Tank
 * 
 * @param  req POST request
 * @param  res Result to send back to the browser
 * 
 * @return Tank Created tank object
 */
exports.create = function(req, res) 
{
	//Create tank and load data from request
	var tank       = new Tank(req.body);
	tank.mpg       = tank.mileage / tank.gallons;
	tank.create_by = req.user;

	//Save tank
	tank.save(function(err) {
		if (err) 
		{
			res.json(500, err);
		}

		res.json(tank);
	});
};

/**
 * Update an indivdual tank
 * 
 * @param  req POST request object
 * @param  res Result object to send back to the browser
 * 
 * @return Tank Updated tank object
 */
exports.update = function(req, res) {

	//Load tank object
	Tank.findById(req.params.tank_id, function(err, tank) {

		if (err)
			res.send(err);

		//Update fields
		tank.date    = req.body.date;
		tank.station = req.body.station;
		tank.cost    = req.body.cost;
		tank.gallons = req.body.gallons;
		tank.mileage = req.body.mileage;
		tank.comment = req.body.comment;
		tank.mpg     = tank.mileage / tank.gallons;

		//Save tank
		tank.save(function(err) {
			if (err)
			{
      			res.json(500, err);
			}

			res.json(tank);
		});

	});
};

/**
 * Delete an indivdual tank
 * 
 * @param  req Request object
 * @param  res Result object to send back to the browser
 * 
 * @return JSON message
 */
exports.delete = function(req, res) {
	Tank.remove({
		_id: req.params.tank_id
	}, function(err, tank) {
		if (err)
		{			
      		res.json(500, err);
      	}

		res.json(tank);
	});
};