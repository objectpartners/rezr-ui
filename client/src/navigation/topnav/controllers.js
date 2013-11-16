(function () {
  'use strict';

  var logger = window.debug;

  angular.module('navigation.topnav.controllers', [
    'common.security.service'
  ])
    .controller('TopnavController', [
      'quickviewSharedEventService',
      'sidenavSharedEventService',
      'securityContext',
      'authorization',
      '$scope',
      function (quickviewSharedEventService, sidenavSharedEventService, securityContext, authorization, $scope){

        //Selected quickview id
        $scope.selected = "";

        //Quickview items
        $scope.quickViewItems = [
          {
            id: 'alerts',
            icon: 'warning-sign',
            title: 'Alerts'
          },
          {
            id: 'events',
            icon: 'list-ul',
            title: 'Events'
          },
          {
            id: 'inbox',
            icon: 'envelope-alt',
            title: 'Messages'
          }
        ]; 

        //Regular link items
        $scope.linkItems = [
          {
            href: '#/settings',
            icon: 'cog',
            title: 'Settings'
          },
          {
            icon: 'user',
            title: 'Profile',
            dropdown: [
              {
                href: '#/user/profile',
                icon: 'user',
                title: 'Profile'
              },
              {
                href: '#/user/settings',
                icon: 'cog',
                title: 'Settings'
              },
              {
                href: '#/user/messages',
                icon: 'envelope-alt',
                title: 'Messages'
              },
              {
                click: 'logout',
                icon: 'off',
                title: 'Logout'
              }
            ]
          }
        ];  

        $scope.getUser = function getUser() {
          var user = securityContext.user;
          user.authenticated = securityContext.authenticated;
          return user;
        };

        $scope.$on('topnav.quickviewItemClicked', function(args) {
          var selectedId = args.targetScope.item.id;
          $scope.selected = selectedId;
          quickviewSharedEventService.activate(selectedId);
        });

        $scope.sideNavOpen = sidenavSharedEventService.isActivated();

        $scope.$on('quickview.activate', function() {
          $scope.quickviewOpen = true;
          $scope.selected = quickviewSharedEventService.getView();
        });

        $scope.$on('quickview.deactivate', function() {
          $scope.quickviewOpen = false;
          $scope.selected = '';
        });

        $scope.expandSideClicked = function() {
          sidenavSharedEventService.toggle();
        };

        $scope.$on('sidenavService.activate', function() {
          $scope.sideNavOpen = true;
        });

        $scope.$on('sidenavService.deactivate', function() {
          $scope.sideNavOpen = false;
        });

        $scope.showInstitutionSelect = false;
        authorization.requireAuthenticatedUser().then(function () {
          $scope.showInstitutionSelect = true;
        });

      }
    ])

    .controller('TopnavQuickviewItemController', [
      '$scope',
      'quickviewSharedEventService',
      'authorization',
      function ($scope, quickviewSharedEventService, authorization){

        authorization.requireAuthenticatedUser().then(function () {
          $scope.showQuickViewItem = true;

          $scope.badgeCount = authorization.requireAuthenticatedUser().then(function() {
            return systemMonitoringNotificationMockDataService.getNotificationCount($scope.item.id); 
          });

          $scope.quickViewItemClicked = function(item, event) {
            authorization.requireAuthenticatedUser().then(function() {
              if(quickviewSharedEventService.isActivated() && quickviewSharedEventService.getView() === item.id) {
                quickviewSharedEventService.deactivate();
              } else {
                quickviewSharedEventService.activate(item.id);
              }
            });
          };
        });

      }
    ])

    .controller('TopnavLinkItemController', [
      '$scope',
      'quickviewSharedEventService',
      'authorization',
      function ($scope, quickviewSharedEventService, authorization) {

        authorization.requireAuthenticatedUser().then(function () {
          $scope.showLinkItem = true;
        });

        authorization.requireAuthenticatedUser().then(function () {
          $scope.linkItemClicked = function(item, event) {
            authorization.requireAuthenticatedUser().then(function() {
              if(quickviewSharedEventService.isActivated()) {
                quickviewSharedEventService.deactivate();
              }
            });
          };
        });

      }
    ]);

    logger.debug('Registered navigation.topnav.TopnavController');

}());
