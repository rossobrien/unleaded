var LocalStrategy = require('passport-local').Strategy,
	User          = require('../models/user');

module.exports = function(passport) {

	/**
	 * Serialize user object for storage in session
	 */
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	/**
	 * Read user from session
	 */
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	/**
	 * Local Login config
	 */
	passport.use('local', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, email, password, done) {

		// User lookup
		User.findOne({ 'local.email' :  email }, function(err, user) {
			if (err) 
			{
				return done(err);
			}

			if (!user) 
			{
				return done(null, false, {
					'errors': {
						'email': { type: 'Email is not registered.' }
					}
				});
			}

			if (!user.validPassword(password)) 
			{
				return done(null, false, {
					'errors': {
						'password': { type: 'Oops! Password is incorrect.' }
					}
				});
			}

			return done(null, user);
		});

	}));


};