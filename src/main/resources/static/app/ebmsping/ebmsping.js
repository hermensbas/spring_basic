'use strict';

angular.module('regisseur.ebmsping', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/ebmsping', {
        templateUrl: 'app/ebmsping/ebmsping.html',
        controller: 'EbmsPingController'
      });
    }])

    .controller('EbmsPingController', ['$scope', '$http', function ($scope, $http) {
      $scope.ping = function () {
        var fd = new FormData();
        fd.append('CPAid', $scope.CPAid);
        fd.append('from', $scope.from);
        fd.append('to', $scope.to);

        $http.post('regisseur/services/beheer/ping', fd, {
          headers: {'Content-Type': 'multipart/form-data'}
        }).then(function successCallback(response) {
          $scope.result = "Ping verzonden";
        }, function errorCallback(response) {
          $scope.result = "Fout: " + response.data.error;
        });

      }
    }]);


