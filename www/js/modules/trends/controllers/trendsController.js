/**
 * Controller for tank list view
 * 
 * @param  $scope    Data to pass to view
 * @param  Tanks Tank object for interacting with API
 */
angular.module('trendsApp').controller('TrendsController', function($scope, Tanks) {
	$scope.FormatXAxisTick = function() {
		return function(d) {
			return d3.time.format('%x')(new Date(d));
		}
	}

	Tanks.query('', function(data) {
		var values = data.map(function(tank, i) {return [i, d3.round(tank.mpg, 2)]});
		$scope.chartData = [
			{
				"key": "Miles Per Gallon",
				"values": values
			}
		];
	});
				

});