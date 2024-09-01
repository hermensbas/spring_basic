'use strict';

angular.module('regisseur.resendtransformaties', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/transformatie/:oin/:idLevering', {
        templateUrl: 'app/transformatie/resendtransformaties.html',
        controller: 'ResendTransformatiesController'
    });
}])

.controller('ResendTransformatiesController', ['$scope', '$location', '$routeParams', '$http', 'util', function ($scope, $location, $routeParams, $http, util) {
    $scope.oin = $routeParams.oin;
    $scope.idLevering = $routeParams.idLevering;
    $scope.autorefresh = true;
    $scope.util = util;

    var url = "regisseur/services/beheer/gettransformatiesoin/";
    var berichtenUrl = url + $scope.oin +"/"+ $scope.idLevering;

    $http.get(berichtenUrl).then(function (success) {
        $scope.transformaties= success.data;
        $scope.showButton = false;

        var transformaties = success.data;
            for (var i=0; i<transformaties.length; i++) {
             if (transformaties[i].status.match("MISLUKT")) {
                $scope.showButton = true;
             }
            }

     }, function (error) {

    });

    var resendUrl = "regisseur/services/beheer/opnieuwversturentransformaties/";
    $scope.resendToestand = function() {
        var fd = new FormData();
        fd.append('oin', $scope.oin);
        fd.append('idlevering', $scope.idLevering);

        return $http.post(resendUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function (success) {
                  $scope.result = "Opnieuw verzonden";
               }, function (error) {
                  $scope.result = error.data.error;
              });
    }

    $scope.viewDetails = function(bericht) {
      $location.path('/opdrachten/' + bericht.oin + '/' + bericht.idLevering);
    };
}]);
