(function () {
  'use strict';

  var logger = window.debug;

  angular.module('admin.controllers', [
    'common.formatting.filters'
  ])
    .controller('AdminController', [
      '$scope',
      function ($scope) {
         
      }
    ])

    .controller('AdminSeasonsController', [
      '$scope',
      '$state',
      function ($scope, $state) {

        $scope.seasons = [
          {
            "id" : 1,
            "name" : "Summer 2011",
            "startDate" : moment(new Date()).subtract('years', 2).toISOString(),
            "endDate" : moment(new Date()).subtract('years', 2).toISOString(),
            "state" : "OPEN"
          },
          {
            "id" : 2,
            "name" : "Winter 2011",
            "startDate" : moment(new Date()).subtract('years', 2).toISOString(),
            "endDate" : moment(new Date()).subtract('years', 2).toISOString(),
            "state" : "OPEN"
          },
          {
            "id" : 3,
            "name" : "Summer 2012",
            "startDate" : moment(new Date()).subtract('years', 1).toISOString(),
            "endDate" : moment(new Date()).subtract('years', 1).toISOString(),
            "state" : "OPEN"
          },
          {
            "id" : 4,
            "name" : "Winter 2012",
            "startDate" : moment(new Date()).subtract('years', 1).toISOString(),
            "endDate" : moment(new Date()).subtract('years', 1).toISOString(),
            "state" : "OPEN"
          },
          {
            "id" : 5,
            "name" : "Summer 2013",
            "startDate" : moment(new Date()).toISOString(),
            "endDate" : moment(new Date()).toISOString(),
            "state" : "OPEN"
          },
          {
            "id" : 6,
            "name" : "Winter 2013",
            "startDate" : moment(new Date()).toISOString(),
            "endDate" : moment(new Date()).toISOString(),
            "state" : "OPEN"
          },

        ];

        $scope.createNew = function createNew () {
          $state.go('admin.seasons.create');
        };

        $scope.showDetail = function showDetail (propertyId) {
          $state.go('admin.seasons.detail', {id: propertyId});
        };

      }
    ])

    .controller('AdminSeasonsCreateController', [
      '$scope',
      '$state',
      function ($scope, $state) {

        $scope.season = {
          startDate: null,
          endDate: null
        };

        $scope.create = function create () {
          $state.go('admin.seasons');
        };

        $scope.cancel = function cancel () {
          $state.go('admin.seasons');
        };

      }
    ])

    .controller('AdminSeasonsDetailController', [
      '$scope',
      '$state',
      '$stateParams',
      function ($scope, $state, $stateParams) {

        $scope.season = $scope.seasons[$stateParams.id];

        $scope.create = function create () {
          $state.go('admin.seasons');
        };

        $scope.cancel = function cancel () {
          $state.go('admin.seasons');
        };

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