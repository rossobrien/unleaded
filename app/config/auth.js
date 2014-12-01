/**
 * Auth.js
 *
 * https://github.com/DaftMonk/angular-passport/blob/master/lib/config/auth.js
 */

/**
 *  Route middleware to ensure user is authenticated.
 */
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) 
{
	if (req.isAuthenticated()) 
	{ 
		return next(); 
	}

	res.send(401);
}

/**
* Blog authorizations routing middleware
*/
exports.tank = {
	hasAuthorization: function(req, res, next) 
	{
		if (req.tank.create_by._id.toString() !== req.user._id.toString()) 
		{
			return res.send(403);
		}

		next();
	}
};