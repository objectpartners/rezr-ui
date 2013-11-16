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
      '$control',
      function ($scope, $state, $control) {

        $scope.getSeasons = function (page) {
          $control.getAll('seasons', page).then(function (seasons) {
            $scope.seasons = seasons;
          });
        };

        $scope.seasons = [
          {
            "id" : 1,
            "name" : "Summer 2011",
            "startDate" : moment(new Date()).subtract('years', 2).format("YYYY-MM-DD"),
            "endDate" : moment(new Date()).subtract('years', 2).format("YYYY-MM-DD"),
            "state" : "OPEN"
          },
          {
            "id" : 2,
            "name" : "Winter 2011",
            "startDate" : moment(new Date()).subtract('years', 2).format("YYYY-MM-DD"),
            "endDate" : moment(new Date()).subtract('years', 2).format("YYYY-MM-DD"),
            "state" : "OPEN"
          },
          {
            "id" : 3,
            "name" : "Summer 2012",
            "startDate" : moment(new Date()).subtract('years', 1).format("YYYY-MM-DD"),
            "endDate" : moment(new Date()).subtract('years', 1).format("YYYY-MM-DD"),
            "state" : "OPEN"
          },
          {
            "id" : 4,
            "name" : "Winter 2012",
            "startDate" : moment(new Date()).subtract('years', 1).format("YYYY-MM-DD"),
            "endDate" : moment(new Date()).subtract('years', 1).format("YYYY-MM-DD"),
            "state" : "OPEN"
          },
          {
            "id" : 5,
            "name" : "Summer 2013",
            "startDate" : moment(new Date()).format("YYYY-MM-DD"),
            "endDate" : moment(new Date()).format("YYYY-MM-DD"),
            "state" : "OPEN"
          },
          {
            "id" : 6,
            "name" : "Winter 2013",
            "startDate" : moment(new Date()).format("YYYY-MM-DD"),
            "endDate" : moment(new Date()).format("YYYY-MM-DD"),
            "state" : "OPEN"
          },

        ];

        logger.debug($scope.seasons);

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
      '$control',
      function ($scope, $state, $stateParams, $control) {

        $scope.requestSeason = function () {
          $control.get('season', {id: $stateParams.seasonId}).then(function (season) {
            $scope.season = season;
          });
        };

        $scope.season = $scope.seasons[$stateParams.id];

        $scope.update = function update () {
          $scope.season.$update(function(data){
            notifications.displayMessage({message : "Season " + data.name + " was updated.", type: 'success'});   
          }, function(err){
            notifications.displayMessage({message : "There was a problem updating " + data.name + ".", type: 'error'});  
          });
        };

        $scope.cancel = function cancel () {
          $state.go('admin.seasons');
        };

        $scope.requestSeason();
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
      '$control',
      function ($scope, $state, $control) {

        $scope.getProperties = function (page) {
          $control.getAll('vacationProperty', page).then(function (properties) {
            $scope.properties = properties;
          });
        };

        $scope.search = function () {
          // $control.getPage('internalUser', 0, {q : $scope.q}).then(function (pageConfig){
          //   $scope.pagination = pageConfig;
          // });
        };

        $scope.showDetail = function showDetail (propertyId) {
          $state.go('admin.properties.detail', {id: propertyId});
        };

        $scope.createNew = function createNew () {
          $state.go('admin.properties.create');
        };
      }
    ])

    .controller('AdminPropertiesCreateController', [
      '$scope',
      '$state',
      function ($scope, $state) {

        $scope.cancel = function cancel () {
          // refresh the model
          $state.go('admin.properties');
        };

        $scope.getProperties(0);
      }
    ])

    .controller('AdminPropertiesDetailController', [
      '$scope',
      '$state',
      '$control',
      '$stateParams',
      function ($scope, $state, $control, $stateParams) {

        $scope.requestVacationProperty = function (propertyId) {
          $control.get('vacationProperty', propertyId).then(function (property) {
            $scope.property = property;
          });
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

        $scope.requestVacationProperty($stateParams.id);
      }
    ]);

  logger.debug('Registered admin.AdminController');

}());