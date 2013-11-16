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
      '$state',
      function ($scope, $state) {

        $scope.properties = [
          {
            "name" : "Cabin",
            "address" : "123 opi lane",
            "city" : "cabintown",
            "state" : "WI", 
            "zip" : "12345"
          },
          {
            "name" : "Condo",
            "address" : "123 condo lane",
            "city" : "condotown",
            "state" : "WI",
            "zip" : "12345"
          }
        ];      

        $scope.search = function () {
          // $control.getPage('internalUser', 0, {q : $scope.q}).then(function (pageConfig){
          //   $scope.pagination = pageConfig;
          // });
        };

        $scope.showDetail = function showDetail (propertyId) {
          $state.go('admin.properties.detail', {id: propertyId});
        };

        $scope.createNew = function createNew () {
          $state.go('admin.properties.new');
        };
      }
    ])

    .controller('AdminPropertiesDetailController', [
      '$scope',
      '$state',
      function ($scope, $state) {

        $scope.property = {
          "name" : "Cabin",
          "address" : "123 opi lane",
          "city" : "cabintown",
          "state" : "WI", 
          "zip" : "12345"
        };

        $scope.update = function update () {
          $control.update('property', $scope.property).then(function (updatedProperty) {
            if (updatedUser.exception) {
              return notifications.displayMessage({message: 'Failed to update, ' + $scope.property.name + '.', type: 'error'});
            }
            else {
              return notifications.displayMessage({type: 'success', message: 'Updated ' + $scope.property.name + '.'});
            }
          });
        };

        $scope.cancel = function cancel () {
          // refresh the model
          $state.go('admin.properties');
        };
      }
    ]);

  logger.debug('Registered admin.AdminController');

}());