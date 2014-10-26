/**
 * Controller for tank list view
 * 
 * @param  $scope    Data to pass to view
 * @param  Tanks Tank object for interacting with API
 */
angular.module('tankApp').controller('TankListController', function($scope, Tanks) {
	$scope.dateFormat = 'EEEE, MMMM dd, yyyy, h:mm a';

	//get code items from API
	$scope.tanks = Tanks.query();
});