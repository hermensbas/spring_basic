'use strict';

angular.module('regisseur.version', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/versie', {
        templateUrl: 'app/version/version.html',
        controller: 'VersionController'
    });
}])

.controller('VersionController', ['$scope', '$http', function ($scope, $http) {
    $http.get('regisseur/info').then(function (success) {
        var data = success.data;
        $scope.version = data.build.version;
      //we get a float number in seconds (like 1659531057.379) instead of integer inn milliseconds (like 1659531057379)
      $scope.date = data.build.time * 1000;// from seconds to milliseconds
    }, function (error) {
        $scope.error = "Error reading info.json: " + error.data.error;
    })
}]);