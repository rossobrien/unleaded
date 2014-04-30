/**
 * Trip Model
 *
 * Model file for Trip objects
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//Data structure for Trips
var TripSchema   = new Schema({
	date: Date,
	station: String,
	cost: Number,
	gallons: Number,
	mileage: Number,
	comment: String
});

module.exports = mongoose.model('Trip', TripSchema);