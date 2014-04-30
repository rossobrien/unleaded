/**
 * Controller for trip list view
 * 
 * @param  $scope    Data to pass to view
 * @param  Trips Trip object for interacting with API
 */
angular.module('tripApp').controller('TripListController', function($scope, Trips) {

	//get code items from API
	$scope.trips = Trips.query();

});