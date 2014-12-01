module.exports = function(router) {
	var auth  = require('./config/auth'),
		tanks = require('./controllers/tanks.js')
		users = require('./controllers/users.js');

	//Dummy base route
	router.get('/', function(req, res) {
		res.json({ message: 'Welcome to the Unleaded.io API' });
	});

	//User group routes
	router.route('/users')
		.post(users.create)
		.get(users.all);

	//Individual user routes
	router.route('/users/:user_id')
		.get(users.find);
		//.put(auth.ensureAuthenticated, users.update);

	//Tanks group routes
	router.route('/tanks')
		.post(tanks.create)
		.get(tanks.all);

	//Individual tank routes
	router.route('/tanks/:tank_id')
		.get(tanks.find)
		.put(tanks.update)
		.delete(tanks.delete);
};