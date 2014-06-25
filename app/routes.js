module.exports = function(router) {
	
	//Import models
	var Tank = require('./models/tank');

	router.get('/', function(req, res) {
		res.json({ message: 'Welcome to the Unleaded.io API' });	
	});

	//Tanks group routes
	router.route('/tanks')
		
		/**
		 * Create Tank
		 * 
		 * @param  req POST request
		 * @param  res Result to send back to the browser
		 * 
		 * @return JSON message
		 */
		.post(function(req, res) {
			
			//Create tank and load data from request
			var tank = new Tank();
			tank.date    = req.body.date;
			tank.station = req.body.station;
			tank.cost    = req.body.cost;
			tank.gallons = req.body.gallons;
			tank.mileage = req.body.mileage;
			tank.comment = req.body.comment;

			//Save tank
			tank.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Tank created!' });
			});
			
		})

		/**
		 * Get all tanks
		 * 
		 * @param  req Request object
		 * @param  res Result object to send back to the browser
		 * 
		 * @return Tanks[] All tanks
		 */
		.get(function(req, res) {
			Tank.find(function(err, tanks) {
				if (err)
					res.send(err);

				res.json(tanks);
			});
		});

	//Individual tank routes
	router.route('/tanks/:tank_id')

		/**
		 * Get an indivdual tank
		 * 
		 * @param  req Request object
		 * @param  res Result object to send back to the browser
		 * 
		 * @return Tank Single tank object
		 */
		.get(function(req, res) {
			Tank.findById(req.params.tank_id, function(err, tank) {
				if (err)
					res.send(err);

				res.json(tank);
			});
		})

		/**
		 * Update an indivdual tank
		 * 
		 * @param  req POST request object
		 * @param  res Result object to send back to the browser
		 * 
		 * @return JSON message
		 */
		.put(function(req, res) {

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

				//Save tank
				tank.save(function(err) {
					if (err)
						res.send(err);

					res.json({ message: 'Tank updated!' });
				});

			});
		})

		/**
		 * Delete an indivdual tank
		 * 
		 * @param  req Request object
		 * @param  res Result object to send back to the browser
		 * 
		 * @return JSON message
		 */
		.delete(function(req, res) {
			Tank.remove({
				_id: req.params.tank_id
			}, function(err, tank) {
				if (err)
					res.send(err);

				res.json({ message: 'Tank deleted!' });
			});
		});
};