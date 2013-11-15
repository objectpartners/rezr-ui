(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering api.resources");

  var resources = angular.module('app.resources', [])
    .factory('$control', [
      '$q',
      '$api',
      'authorization',
      function ($q, $api, authorization) {

        var control = {

          getAll : function (resource, query) {
              return $api[resource].query(query || {}).$promise;
          },

          get : function (resource, id) {
              return $api[resource].get({id: id}).$promise;
          },

          create : function (resource, model) {
              return new $api[resource](model).$save().$promise;
          }, 

          update : function (resource, model) {
            return $api[resource].update(model).$promise;
          }
        };

        return control;
      }
    ])

    .factory('$api', [
      '$resource',
      '$apiUrl',
      function ($resource, $apiUrl) {

        var api = {

          // security
          login : $resource($apiUrl + '/login', {}, {
            'login' : {
              method: 'POST'
            },
            'current' : {
              method: 'GET'
            }
          }),
          logout : $resource($apiUrl + '/logout', {}, {
            'logout' : {
              method: 'POST'
            }
          }),
          
          // Internal Users
          internalUser : $resource(
            $apiUrl + '/internal/users/:id', 
            {id: '@id'},
            {
              'query' : {
                method: 'GET',
                params: {
                  page: '@page',
                  size: '10'
                }
              },
              'update' : {
                method: 'PUT'
              }
            }
          ),

          internalUserRole : $resource(
            $apiUrl + '/internal/users/:userId/roles/:id',
            {userId: '@userId', id: '@id'}
          ),

          internalUserRolePermission : $resource(
            $apiUrl + '/internal/users/:userId/roles/:roleId/permissions/:id',
            {userId: '@userId', roleId: '@roleId', id: '@id'}
          ),

          // Roles
          role : $resource(
            $apiUrl + '/roles/:id', 
            {id: '@id'}
          ),

          rolePermission : $resource(
            $apiUrl + '/roles/:roleId/permissions/:id', 
            {roleId: '@roleId', id: '@id'}
          ),

          // Permissions
          permission : $resource(
            $apiUrl + '/permissions/:id', 
            {id: '@id'}
          ),

          // ui 
          sidenav : $resource($apiUrl + '/ui/sidenav/items')

        };

        return api;
      }
    ]);
  
  resources.value('$apiUrl', '/d3-control-rest/api');

  logger.debug("Registered api.resources");

}());
