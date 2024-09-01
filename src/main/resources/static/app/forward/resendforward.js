'use strict';

angular.module('regisseur.resendforward', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/forward/:oin/:idLevering', {
        templateUrl: 'app/forward/resendforward.html',
        controller: 'ResendForwardController'
    });
}])

.controller('ResendForwardController', ['$scope', '$routeParams', '$http', '$window', '$filter', 'searchService', 'util', function ($scope, $routeParams, $http, $window, $filter, searchService, util) {

    $scope.oin = $routeParams.oin;
    $scope.idLevering = $routeParams.idLevering;
    $scope.statusXml = "";
    $scope.util = util;

    var resendUrl = "regisseur/services/beheer/doorlevering/";
    var resendUrl2 = "regisseur/services/beheer/getstatus/";

    // Retrieve the message from localStorage if it exists
    $scope.result = localStorage.getItem('resendMessage');
    localStorage.removeItem('resendMessage'); // Clear the message after retrieving

    $scope.resendToestand = function() {
        var fd = new FormData();
        fd.append('oin', $scope.oin);
        fd.append('idlevering', $scope.idLevering);
        fd.append('soort', 'toestand');

        return $http.post(resendUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function (success) {
                  localStorage.setItem('resendMessage', 'Opnieuw verzonden');
                  // Reload the page
                  $window.location.reload();
               }, function (error) {
                  $scope.result = "";
                  $scope.error = "Fout: " + error.data.error;
              });
    }

    var berichtenUrl = resendUrl2 + $scope.oin +"/"+ $scope.idLevering;

    $http.get(berichtenUrl).then(function (success) {
        $scope.meldingen = success.data;
     }, function (error) {
          $scope.errorMelding = "Fout ophalen meldingenlijst: " + error.data.error;
    });


}]);



