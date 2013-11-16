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
        templateUrl: 'assets/templates/common/modules/page-main.html',
        data : {
          title: 'Administration'
        }
      })

      .state('admin.seasons', {
        url: '/season',
        controller: 'AdminSeasonsController',
        templateUrl: 'assets/templates/app/admin/seasons/index.html',
        data : {
          section: 'Seasons'
        }
      })

      .state('admin.timeslots', {
        url: '/timeslots',
        controller: 'AdminTimeSlotsController',
        templateUrl: 'assets/templates/app/admin/timeslots/index.html',
        data : {
          section : 'Time Slots'
        }
      })

      .state('admin.properties', {
        url: '/properties',
        controller: 'AdminPropertiesController',
        templateUrl: 'assets/templates/app/admin/properties/index.html',
        data: {
          section: 'Properties'
        }
      })

      .state('admin.properties.detail', {
        url: '/detail',
        controller: 'AdminPropertiesDetailController',
        templateUrl: 'assets/templates/app/admin/properties/detail.html',
        data : {
          section: 'Property Detail'
        }
      });
  }]);

	logger.debug("admin module bootstrapped.");
	logger.groupEnd();
}());
