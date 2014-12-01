var mongoose = require('mongoose'),
	bcrypt   = require('bcrypt-nodejs');

/**
 * User Schema Model
 * 
 * @type Schema
 */
var userSchema = mongoose.Schema({

	email: {
		type     : String,
		unique   : true,
		required : true
	},
	password   : String,
	first_name : String,
	last_name  : String,
	admin      : Boolean
});

/**
 * Getter and setter for password field
 */
userSchema.path('password')
	.set(function(password) {
		this.password = this.generateHash(this.password);
	})
	.get(function() {
		return this.password;
	});

/**
 * User Info virtual field
 */
userSchema.virtual('user_info')
	.get(function () {
		return { '_id': this._id, 'email': this.email, 'first_name': this.first_name, 'last_name': this.last_name, 'admin': this.admin };
	});

/**
 * Email format validation
 * 
 * @param  String email Email address input
 * @return Boolean
 */
userSchema.path('email').validate(function (email) {
	var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

	return emailRegex.test(email);
}, 'The specified email is invalid.');

/**
 * Duplicate Email Validation
 * 
 * @param  value   Input value
 * @param  respond Response (true or false) object
 */
userSchema.path('email').validate(function(value, respond) {
	mongoose.models["User"].findOne({email: value}, function(err, user) {
		if(err) 
		{
			throw err;
		}

		if(user)
		{ 
			return respond(false);
		}

		respond(true);
	});
}, 'The specified email address is already in use.');

/**
 * Generate Hash
 *
 * Create a hashed password for storage in DB
 * 
 * @param  String password User entered password
 * 
 * @return String          Hashed password
 */
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Authenticate
 *
 * Compare a plain text password to a hashed password
 * 
 * @param  String password User entered password
 * 
 * @return Boolean         True if passwords match
 */
userSchema.methods.authenticate = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

// Create model
module.exports = mongoose.model('User', userSchema);