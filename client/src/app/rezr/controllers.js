(function () {
  'use strict';

  var logger = window.debug;

  angular.module('rezr.controllers', [
    'ui.calendar'
  ])
    .controller('RezrController', [
      '$scope',
      function ($scope) {
        
         
      }
    ])

    .controller('RezrDashboardController', [
      '$scope',
      function ($scope) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $scope.events = [
          {title: 'Some Reservation',start: new Date(y, m - 1, 27), end: new Date(y, m, 1)},
          {title: 'Some Reservation',start: new Date(y, m , 4), end: new Date(y, m, 7)},
          {title: 'Some Reservation',start: new Date(y, m , 10), end: new Date(y, m, 16)},
          {title: 'Some Reservation',start: new Date(y, m , 19), end: new Date(y, m, 26)},
        ];

        $scope.eventSources = [$scope.events];

        $scope.uiConfig = {
          calendar:{
            //height: 450,
            editable: true,
            header:{
              left: '',
              right: 'today prev,next'
            },
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
          }
        };
         
      }
    ])


    .controller('RezrTimeslotsController', [
      '$scope',
      function ($scope) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $scope.reservation = {
          startDate: null,
          endDate: null
        };

        $scope.reservationEvents = [];

        $scope.$watch('reservation', function() {
          var startDate = null,
            endDate = null;


          if ($scope.reservation.startDate) {
            startDate = moment($scope.reservation.startDate, "YYYY-MM-DD").toDate();
          }

          if ($scope.reservation.endDate) {
            endDate = moment($scope.reservation.endDate, "YYYY-MM-DD").toDate();
          } else {
            endDate = startDate;
          }

          // Clear the reservation array
          for(var i = 0; i < $scope.reservationEvents.length; i++){
            $scope.reservationEvents.shift();
          }

          // Push the new Reservation
          $scope.reservationEvents.push(
            {
              title: 'My Reservation',
              start: startDate,
              end: endDate,
              borderColor: '#777',
              backgroundColor: '#777'
            }
          );
        }, true);

        $scope.events = [
          {title: 'Another Reservation',start: new Date(y, m - 1, 27), end: new Date(y, m, 1)},
          {title: 'Another Reservation',start: new Date(y, m , 4), end: new Date(y, m, 7)},
          {title: 'Another Reservation',start: new Date(y, m , 19), end: new Date(y, m, 26)},
        ];

        $scope.eventSources = [$scope.events, $scope.reservationEvents];

        $scope.uiConfig = {
          calendar:{
            editable: false,
            header:{
              left: '',
              right: 'today prev,next'
            },
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
          }
        };

      }
    ])

    .controller('RezrAdminController', [
      '$scope',
      function ($scope) {
        
      }
    ]);

  logger.debug('Registered rezr.RezrController');

}());