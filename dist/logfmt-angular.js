/**
 * Implementation of logfmt in AngularJS
 * @version v0.0.1 - 2014-06-16
 * @link https://github.com/jmataya/logfmt-angular
 * @author Jeff Mataya <jeff.mataya@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */(function() {
  'use strict';

  var module = angular.module('logfmt', ['ui.router']);

  module.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('logfmt', {
      url: '/logs',
      template: '<div><p>Hello</p></div>',
      controller: 'LogFmtCtrl'
    });
  }]);

  module.provider('LogFmt', function() {
    var useLocalStorage = false;

    this.useLocalStorage = function(value) {
      useLocalStorage = !!value;
    }

    this.$get = [function logFmtFactory() {
      return new function() {
        this.log = function(json) {
          var str = "timestamp=" + this.getCurrentTimestamp();
          for(var key in json) {
            var jsonValue = json[key];
            if (jsonValue) {
              if (typeof jsonValue != 'string') {
                jsonValue = jsonValue.toString();
              }
              if (jsonValue.indexOf(' ') != -1) {
                jsonValue = '\"' + jsonValue + '\"';
              }
            } else {
              jsonValue = '\"\"';
            }

            str += " " + key + "=" + jsonValue;
          }

          if (useLocalStorage) {
            // Save to local storage.
            var existing = localStorage["logfmt"];
            if (existing !== undefined) {
              existing += '\n';
            }
            localStorage["logfmt"] = existing + str;
          } else {
            console.log(str);
          }
        };

        this.getCurrentTimestamp = function() {
          var currentDate = new Date();
          return currentDate.getDate() + "-" +
            (currentDate.getMonth() + 1) + "-" +
            currentDate.getFullYear() + "-" +
            currentDate.getHours() + ":" +
            currentDate.getMinutes() + ":" +
            currentDate.getSeconds();
        };

        this.getLogs = function() {
          return localStorage["logfmt"];
        };
      }
    }];
  });

  module.controller('LogFmtCtrl', ['LogFmt', function(LogFmt) {
    console.log("Loaded!");
  }]);
})();
