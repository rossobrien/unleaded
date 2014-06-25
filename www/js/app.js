/**
 * Create the main unleaded.io application.
 *
 * Import submodules and global libraries
 * @module ui.bootstrap Angular integration for Twitter Bootstrap
 * @module ngRoute      Angular module for routing
 * @module appRoutes    Application routing config
 * @module tankApp      Module for Trip CRUD
 */
var app = angular.module('unleadedApp', 
	[
		'ngRoute',
		'appRoutes',
		'tankApp',
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