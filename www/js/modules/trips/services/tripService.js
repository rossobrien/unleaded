/**
 * Define service module to wrap the trip resource object
 * 
 * @module ngResource   Angular module for interaction with RESTful APIs
 */
var tripService = angular.module('TripService', ['saveResource']);

/**
 * Create trip resource object for interaction with API for trip items
 * 
 * @param $resource object for API requests
 */
tripService.factory('Trips', function($resource) {
	
	/**
	 * Define code API wrapper
	 */
	return $resource('/api/trips/:id',
		{id: '@id'}
	);
});