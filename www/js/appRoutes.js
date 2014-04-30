/**
 * Define controllers and views for routes
 * 
 * @param $routeProvider    Angular route object
 * @param $locationProvider Angular module to configure URL paths
 */
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		//Homepage
		.when('/', {
			controller: 'unleadedController',
			templateUrl: 'views/home.html',
		})

		//Trips list routes
		.when('/trips', {
			controller: 'TripListController',
			templateUrl: '/js/modules/trips/views/list.html',	
		})

		//Individual trip routes
		.when('/trips/:tripId', {
			controller: 'TripViewController',
			templateUrl: '/js/modules/trips/views/view.html',
		});

	//Use HTML5 URLs instead of hash prefixes
	$locationProvider.html5Mode(true);
}]);