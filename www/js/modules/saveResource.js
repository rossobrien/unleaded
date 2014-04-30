/**
 * Extend ngResource
 */
var module = angular.module( 'saveResource', [ 'ngResource' ] );

/**
 * Override default ngResource $.save() functionality
 *
 * $.save() will use PUT or POST depending on if the object
 * exists in the DB already. 
 * Based on {@link http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/}
 * 
 * @param $resource Angular ngResource object
 * 
 * @return          New resource object with new $.save() functionality
 */
module.factory( 'Resource', [ '$resource', function( $resource ) {
	return function( url, params, methods ) {
		var defaults = {
			update: { method: 'PUT', isArray: false },
			create: { method: 'POST' }
		};

		methods = angular.extend( defaults, methods );

		var resource = $resource( url, params, methods );

		resource.prototype.$save = function() {
			if ( !this._id ) {
				return this.$create();
			}
			else {
				return this.$update();
			}
		};

		return resource;
	};
}]);