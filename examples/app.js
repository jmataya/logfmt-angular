(function() {
  'use strict';

  var module = angular.module('logfmt-test', ['logfmt']);

  module.controller('MainCtrl', ['$scope', 'LogFmt', function($scope, LogFmt) {
    $scope.message = "Hello, this is from Angular";

    $scope.test_log = function() {
      var json = { test: "Hello, World" };
      LogFmt.log(json);
    }

    $scope.show_log = function() {
      alert(LogFmt.getLogs());
    }
  }]);
})();
