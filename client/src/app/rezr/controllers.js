(function () {
  'use strict';

  var logger = window.debug;

  angular.module('rezr.controllers', [])
    .controller('RezrController', [
      '$scope',
      function ($scope) {
         
      }
    ])

    .controller('RezrTimeslotsController', [
      '$scope',
      function ($scope) {

      }
    ])

    .controller('RezrAdminController', [
      '$scope',
      function ($scope) {
        
      }
    ]);

  logger.debug('Registered rezr.RezrController');

}());