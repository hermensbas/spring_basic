'use strict';

angular.module('regisseur.status', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/status', {
        templateUrl: 'app/status/status.html',
        controller: 'StatusController'
    });
}])

.controller('StatusController', ['$scope', '$http', function ($scope, $http) {
    $http.get('regisseur/health').then(function (success) {
        $scope.data = success.data;

        // $scope.data = JSON.stringify(success.data, null, 2);
    }, function (error) {
        $scope.data = error.data;

        if (typeof error.data.error !== 'undefined') {
            $scope.error = "Error reading health.json: " + error.data.error;
        }
    })
}]);