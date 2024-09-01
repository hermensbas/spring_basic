'use strict';

angular.module('regisseur.publiceren', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/publiceren', {
            templateUrl: 'app/publiceren/publiceren.html', controller: 'PublicerenController'
        });
    }])

    .controller('PublicerenController', ['$scope', '$location', '$routeParams', '$http', function ($scope, $location, $routeParams, $http) {

        const berichtenUrltr = "regisseur/services/beheer/gettransformaties";
        const berichtenUrlpo = "regisseur/services/beheer/getpublicatieopdrachten";
        const berichtenUrlng = "regisseur/services/beheer/getpublicatieopdrachtennietgehaald";
        const errorList = ["Fout", "AanleverFout", "NietAfgebroken", "Onbekend"];

        $http.get(berichtenUrltr).then(function (success) {
            $scope.transformaties = success.data;
            if (success.data.length > 0) {
                $scope.errorTr = true;
            }
        }, function (error) {
            $scope.errorMelding = "Fout ophalen transformatielijst: " + error.data.error;
        });

        $http.get(berichtenUrlpo).then(function (success) {
            $scope.publicatieopdrachten = success.data;
            for (let i = 0; i < success.data.length; i++) {
                if ("status" in success.data[i] && errorList.indexOf(success.data[i].status) !== -1) {
                    $scope.errorPo = true;
                }
            }
        }, function (error) {
            $scope.errorMelding = "Fout ophalen publicatieopdrachtenlijst: " + error.data.error;
        });

        $http.get(berichtenUrlng).then(function (success) {
            $scope.publicatieopdrachtennietgehaald = success.data;
            if (success.data.length > 0) {
                $scope.errorNg = true;
            }
        }, function (error) {
            $scope.errorMelding = "Fout ophalen publicatieopdrachtennietgehaald: " + error.data.error;
        });

        $scope.viewDetails = function (bericht) {
            $location.path('/opdrachten/' + bericht.oin + '/' + bericht.idLevering);
        };

    }]);
