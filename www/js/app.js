/**
 * Create the main unleaded.io application.
 *
 * Import submodules and global libraries
 * @module ui.bootstrap Angular integration for Twitter Bootstrap
 * @module ngRoute      Angular module for routing
 * @module appRoutes    Application routing config
 * @module tripApp      Module for Trip CRUD
 */
var app = angular.module('unleadedApp', 
	[
		'ngRoute',
		'appRoutes',
		'tripApp',
	] 
);

/**
 * Controller for homepage
 * 
 * @param  $scope    Data to pass to view
 */
app.controller('unleadedController', function($scope) {

	$scope.tagline = 'Keep track of your gas usage';	

});