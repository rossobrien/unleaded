/**
 * Controller for tank detail view
 * 
 * @param $scope       Data to pass to view
 * @param $routeParams Data from URL
 * @param Tanks        Tank object for interacting with API
 */
angular.module('tankApp').controller('TankViewController', function($scope, $routeParams, Tanks) {
	$scope.dateFormat = 'EEEE, MMMM dd, yyyy, h:mm a';
	
	//get tank items
	$scope.tank = Tanks.get({id: $routeParams.tankId});

	$scope.deleteTank = function() {
		Tanks.delete({id: $routeParams.tankId});
	}
});