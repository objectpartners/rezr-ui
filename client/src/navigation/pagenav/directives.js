(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering pagenav.directives");

  angular.module('navigation.pagenav.directives', [])

    .directive('d3Pagenav',[
      function () {
        return {
          replace: true,
          restrict: 'A',
          scope: {
            items: "="
          },
          templateUrl: 'assets/templates/navigation/pagenav/pagenav.html'
        };
      }]
    )

    .directive('d3PagenavItem',
      function () {
        return {
          replace: false,
          transclude: true,
          restrict: 'A',
          controller : 'PagenavItemController',
          scope: {
            item: "="
          },
          template: '<a ng-transclude></a>'
        };
      }
    );

}());
