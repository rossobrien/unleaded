/**
 * Controller for tank list view
 * 
 * @param  $scope    Data to pass to view
 * @param  Tanks Tank object for interacting with API
 */
angular.module('tankApp').controller('TankListController', function($scope, Tanks, ngTableParams, $filter, $timeout) {
	$scope.tagline = 'Fill ups';

	$scope.dateFormat = 'EEEE, MMMM dd, yyyy, h:mm a';

	$scope.tableParams = new ngTableParams({
		page: 1,
		count: 10,
		filter: {},
		sorting: {
			date: 'desc'
		}
	}, {
		total: 0,
		getData: function($defer, params) {
			Tanks.query(params.url(), function(data) {
				$timeout(function() {
					var filteredData = params.filter() ?
							$filter('filter')(data, params.filter()) :
							data;
					var orderedData = params.sorting() ?
							$filter('orderBy')(filteredData, params.orderBy()) :
							data;

					params.total(orderedData.length); // set total for recalc pagination
					$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				}, 500);
			});	
		}
	});
});