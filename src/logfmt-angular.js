(function() {
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
          var currentDate = new Date();
          var timestamp = currentDate.getDate() + "-" +
            (currentDate.getMonth() + 1) + "-" +
            currentDate.getFullYear() + "-" +
            currentDate.getHours() + ":" +
            currentDate.getMinutes() + ":" +
            currentDate.getSeconds();
          var str = "timestamp=" + timestamp;
          for(var key in json) {
            str += " " + key + "=" + json[key];
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

        this.getLogs = function() {
          return localStorage["logfmt"];
        }
      }
    }];
  });

  module.controller('LogFmtCtrl', ['LogFmt', function(LogFmt) {
    console.log("Loaded!");
  }]);
})();
