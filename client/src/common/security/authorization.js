(function () {
  'use strict';

  var logger = window.debug;

  angular.module('common.security.authorization', [
    'common.security.retry.queue',
    'common.security.authentication'
  ])

  // This service provides guard methods to protect application states.
  // You can add them as resolves to states to require authorization levels
  // before allowing a state change to complete
  .provider('authorization', {

    requireAuthenticatedUser: [
      'authorization',
      function(authorization) {
        return authorization.requireAuthenticatedUser();
      }
    ],

    requireAuthorizedUser: function (permission) {
      return [
        'authorization',
        function(authorization) {
          return authorization.requireAuthorizedUser(permission);
        }
      ];
    },

    requireInstitutionContext: [
      'authorization',
      function(authorization) {
        return authorization.requireInstitutionContext();
      }
    ],

    $get: [
      '$q',
      '$injector',
      'authentication',
      'securityContext',
      function($q, $injector, authentication, securityContext) {
        var service = {

          // Require that there is an authenticated user
          // (use this in a state resolve to prevent non-authenticated users from entering that state)
          requireAuthenticatedUser: function() {
            var queue = $injector.get('security.retry.queue');

            var promise = authentication.requestCurrentUser().then(function(userInfo) {
              if ( !securityContext.authenticated ) {
                return queue.pushRetryFn('unauthenticated-client', function() {
                  return service.requireAuthenticatedUser();
                });
              }
            });
            return promise;
          },

          requireAuthorizedUser: function (authorization) {
            var queue = $injector.get('security.retry.queue');

            var promise = authentication.requestCurrentUser().then(function(userInfo) {
              if ( !service.hasAuthorization(authorization) ) {
                return queue.pushRetryFn('unauthorized-client', service.requireAuthorizedUser);
              }
            });
            return promise;
          },

          requireInstitutionContext : function () {
            var deferred = $q.defer();
            var queue = $injector.get('security.retry.queue');
            var institutionContext = +securityContext.institutionContext;

            if (institutionContext > 0) {
              deferred.resolve(institutionContext);
            }
            else {
              service.requireAuthenticatedUser().then(function() {
                securityContext.institutionContext = securityContext.user.companyId;
                deferred.resolve(securityContext.institutionContext);
              });
            }

            return deferred.promise;
          },

          hasAuthorization : function (authorization) {
            // TODO - Bruce - refactor after integrating new security. 
            // var auth = _.find(securityContext.permissions, function(permission) {
            //   return permission === authorization;
            // });

            // return !!auth;
            return true;
          }

        };

        return service;
      }
    ]
  });

}());