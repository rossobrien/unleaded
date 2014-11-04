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

		//Tanks list routes
		.when('/tanks', {
			controller: 'TankListController',
			templateUrl: '/js/modules/tanks/views/list.html',	
		})

		.when('/tanks/create', {
			controller: 'TankFormController',
			templateUrl: '/js/modules/tanks/views/create.html',
		})

		//Individual tank routes
		.when('/tanks/:tankId', {
			controller: 'TankViewController',
			templateUrl: '/js/modules/tanks/views/view.html',
		})

		//Individual tank routes
		.when('/tanks/:tankId/update', {
			controller: 'TankFormController',
			templateUrl: '/js/modules/tanks/views/update.html',
		})

		//Trends view
		.when('/trends', {
			controller: 'TrendsController',
			templateUrl: '/js/modules/trends/views/tends.html',	
		})
		

	//Use HTML5 URLs instead of hash prefixes
	$locationProvider.html5Mode(true);
}]);