/**
 * Controller for tank forms
 * 
 * @param  $scope    Data to pass to view
 * @param  Tanks Tank object for interacting with API
 */
angular.module('tankApp').controller('TankFormController', function($scope) {

	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();

	$scope.clear = function () {
		$scope.dt = null;
	};

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened = true;
	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1,
		showWeeks: false
	};

	$scope.initDate = new Date();
	$scope.format = 'MMMM dd, yyyy';
});