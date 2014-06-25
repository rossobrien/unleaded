/**
 * Define service module to wrap the tank resource object
 * 
 * @module ngResource   Angular module for interaction with RESTful APIs
 */
var tankService = angular.module('TankService', ['saveResource']);

/**
 * Create tank resource object for interaction with API for tank items
 * 
 * @param $resource object for API requests
 */
tankService.factory('Tanks', function($resource) {
	
	/**
	 * Define code API wrapper
	 */
	return $resource('/api/tanks/:id',
		{id: '@id'}
	);
});