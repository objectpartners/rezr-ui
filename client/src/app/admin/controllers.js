(function () {
  'use strict';

  var logger = window.debug;

  angular.module('admin.controllers', [])
    .controller('AdminController', [
      '$scope',
      function ($scope) {
         
      }
    ])

    .controller('AdminSeasonsController', [
      '$scope',
      function ($scope) {

      }
    ])

    .controller('AdminTimeSlotsController', [
      '$scope',
      function ($scope) {

      }
    ])

    .controller('AdminPropertiesController', [
      '$scope',
      function ($scope) {

      }
    ]);

  logger.debug('Registered admin.AdminController');

}());