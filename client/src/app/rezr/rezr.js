(function () {
	'use strict';

	var logger = window.debug;
	logger.group("Registering rezr module");

	var app = angular.module('rezr', [
    'rezr.directives',
    'rezr.controllers',
    'ui.router'
  ]);

  logger.debug("Registering states for rezr");

  app.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('rezr', {
        url: '/rezr',
        controller: 'RezrController',
        templateUrl: 'assets/templates/app/rezr/index.html'
      })

      .state('rezr.timeslots', {
        url: '/timeslots',
        controller: 'RezrTimeslotsController',
        templateUrl: 'assets/templates/app/rezr/timeslots/index.html'
      })

      .state('rezr.admin', {
        url: '/admin',
        controller: 'RezrAdminController',
        templateUrl: 'assets/templates/app/rezr/admin/index.html'
      });
  }]);

	logger.debug("rezr module bootstrapped.");
	logger.groupEnd();
}());
