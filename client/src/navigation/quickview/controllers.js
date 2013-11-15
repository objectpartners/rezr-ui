(function () {
  'use strict';

  var logger = window.debug;

  angular.module('navigation.quickview.controllers', ['common.routing.directives'])

    .controller('QuickviewController', [
      'quickviewSharedEventService',
      '$scope',
      function (quickviewSharedEventService, $scope){

        $scope.open = false;

        //Triggered from the quicknav service
        $scope.$on('quickview.activate', function() {
          $scope.open = true;
          $scope.view = quickviewSharedEventService.getView();
        });

        //Triggered from the quicknav service
        $scope.$on('quickview.deactivate', function() {
          $scope.open = false;
        });

        $scope.closeQuickNav = function() {
          quickviewSharedEventService.deactivate();
        };
         
      }
    ])

    .controller('QuickviewNavController', [
      '$scope',
      '$location',
      'quickviewSharedEventService',
      function ($scope, $location, quickviewSharedEventService){
        $scope.closeQuickView = function() {
          quickviewSharedEventService.deactivate();
        };

        $scope.viewMore = function(item) {
          var currentView = quickviewSharedEventService.getView();
          $location.path(['system', currentView].join('/'));
          quickviewSharedEventService.deactivate();
        };
      }
    ])

    .controller('QuickviewAlertsController', [
      '$scope',
      '$state',
      'alertMockDataService',
      'quickviewSharedEventService',
      function ($scope, $state, alertMockDataService, quickviewSharedEventService){
        $scope.alerts = alertMockDataService.list();
      }
    ])

    .controller('QuickviewEventsController', [
      '$scope',
      '$location',
      'eventMockDataService',
      'quickviewSharedEventService',
      function ($scope, $location, eventMockDataService, quickviewSharedEventService){
        $scope.events = eventMockDataService.list();
      }
    ])

    .controller('QuickviewInboxController', [
      '$scope',
      '$location',
      'inboxMockDataService',
      'quickviewSharedEventService',
      function ($scope, $location, inboxMockDataService, quickviewSharedEventService){
        $scope.messages = inboxMockDataService.list();
      }
    ]);

    logger.debug('Registered quickview.QuickviewController');

}());
