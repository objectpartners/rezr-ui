(function () {
	'use strict';

	var logger = window.debug;
	logger.group("Registering admin module");

	var app = angular.module('admin', [
    'admin.directives',
    'admin.controllers',
    'ui.router'
  ]);

  logger.debug("Registering states for admin");

  app.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('admin', {
        url: '/admin',
        controller: 'AdminController',
        templateUrl: 'assets/templates/app/admin/index.html'
      })

      .state('admin.seasons', {
        url: '/season',
        controller: 'AdminSeasonsController',
        templateUrl: 'assets/templates/app/admin/seasons/index.html'
      })

      .state('admin.timeslots', {
        url: '/timeslots',
        controller: 'AdminTimeSlotsController',
        templateUrl: 'assets/templates/app/admin/timeslots/index.html'
      })

      .state('admin.properties', {
        url: '/properties',
        controller: 'AdminPropertiesController',
        templateUrl: 'assets/templates/app/admin/properties/index.html'
      });
  }]);

	logger.debug("admin module bootstrapped.");
	logger.groupEnd();
}());
