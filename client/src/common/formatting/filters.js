(function () {
  
  'use strict';

  var logger = window.debug;
  logger.group("Registering common.formatting.filters module");

  var app = angular.module('common.formatting.filters', [])

    .filter('userLocalDateTime', function() {
      return function(dateString, targetFormat) {
        if ((_.isUndefined(dateString) || dateString === null)) {
          return 'None';
        } else {
          var localMoment = moment(dateString, 'YYYY-MM-DDTHH:mm:ss.SSSZ').local();
          if (!_.isUndefined(targetFormat)) {
            return localMoment.format(targetFormat);
          } else {
            return localMoment.format('M/D/YYYY h:mm:ss A');
          }
        }
      };
    })

    .filter('momentFromNow', function() {
      return function(dateString) {
        return moment(new Date(dateString)).fromNow(true);
      };
    })

    .filter('momentFromNowAgo', function() {
      return function(dateString) {
        return moment(new Date(dateString)).fromNow();
      };
    })

    .filter('momentDateWithoutTime', function() {
      return function(dateString) {
        return moment(new Date(dateString)).format("M/D/YYYY");
      };
    })

    .filter('momentCalendar', function() {
      return function(dateString) {
        return moment(new Date(dateString)).calendar();
      };
    });

  logger.debug("common.formatting.filters module bootstrapped.");
  logger.groupEnd(); 

}());
