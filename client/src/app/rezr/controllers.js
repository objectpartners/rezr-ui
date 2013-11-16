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

      }
    ])

    .controller('RezrAdminController', [
      '$scope',
      function ($scope) {
        
      }
    ]);

  logger.debug('Registered rezr.RezrController');

}());