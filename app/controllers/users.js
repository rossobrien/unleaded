var mongoose = require('mongoose'),
	User     = require('../models/user'),
	ObjectId = mongoose.Types.ObjectId;

/**
 * Get all users
 * 
 * @param  req Request object
 * @param  res Result object to send back to the browser
 * 
 * @return Users[] All users
 */
exports.all = function(req, res) {
	User.find(function(err, users) {
		if (err)
		{
			res.json(500, err);
		}

		res.json(users);
	});
};

/**
 * Get an indivdual user
 * 
 * @param  req Request object
 * @param  res Result object to send back to the browser
 * 
 * @return User Single user object
 */
exports.find = function (req, res, next) {
	var userId = req.params.user_id;

	User.findById(ObjectId(userId), function (err, user) {
		if (err) 
		{
			return next(new Error('Failed to load User'));
		}

		if (user) 
		{
			res.send({email: user.email});
		} 
		else 
		{
			res.send(404, 'USER_NOT_FOUND')
		}
	});
};

/**
 * Create a user
 * 
 * @param  req Request object
 * @param  res Result object to send back to the browser
 * 
 * @return User Single user object
 */
exports.create = function (req, res, next) {
	var user = new User(req.body);

	user.save(function(err) {
		if (err) 
		{
			return res.json(400, err);
		}

		req.logIn(user, function(err) {
			if (err) 
			{
				return next(err);
			}

			return res.json(user.user_info);
		});
	});
};

/**
 * Update an indivdual user
 * 
 * @param  req POST request object
 * @param  res Result object to send back to the browser
 * 
 * @return User Updated user object
 */
exports.update = function(req, res) {

	//Load user object
	User.findById(req.params.user_id, function(err, user) {

		if (err)
			res.send(err);

		//Update fields
		user.email      = req.body.email;
		user.password   = req.body.password;
		user.first_name = req.body.first_name;
		user.last_name  = req.body.last_name;
		user.admin      = req.body.admin;

		//Save user
		user.save(function(err) {
			if (err)
			{
				res.json(500, err);
			}

			res.json(user);
		});

	});
};

/**
 * Delete an indivdual user
 * 
 * @param  req Request object
 * @param  res Result object to send back to the browser
 * 
 * @return User Deleted user object
 */
exports.delete = function(req, res) {
	User.remove({
		_id: req.params.user_id
	}, function(err, user) {
		if (err)
		{			
			res.json(500, err);
		}

		res.json(user);
	});
};