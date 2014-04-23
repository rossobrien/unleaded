angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/trips', {
			templateUrl: 'views/trip.html',
			controller: 'TripController'	
		});

	$locationProvider.html5Mode(true);

}]);