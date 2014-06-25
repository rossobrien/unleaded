/**
 * Tank Model
 *
 * Model file for Tank objects
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//Data structure for Tanks
var TankSchema   = new Schema({
	date: Date,
	station: String,
	cost: Number,
	gallons: Number,
	mileage: Number,
	comment: String
});

module.exports = mongoose.model('Tank', TripSchema);