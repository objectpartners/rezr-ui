(function () {
  'use strict';

  var logger = window.debug;

  angular.module('rezr.controllers', [
    'ui.calendar'
  ])
    .controller('RezrController', [
      '$scope',
      function ($scope) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $scope.events = [
          {title: 'All Day Event',start: new Date(y, m, 1)},
          {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
          {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
          {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
          {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
          {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
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