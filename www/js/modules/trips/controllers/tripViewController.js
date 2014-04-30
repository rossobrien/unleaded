/**
 * Controller for trip detail view
 * 
 * @param $scope       Data to pass to view
 * @param $routeParams Data from URL
 * @param Trips        Trip object for interacting with API
 */
angular.module('tripApp').controller('TripViewController', function($scope, $routeParams, Trips) {

	//get trip items
	$scope.trip = Trips.get({id: $routeParams.tripId});
});