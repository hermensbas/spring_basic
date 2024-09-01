'use strict';

angular.module('regisseur.opnieuwpubliceren', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/opnieuwpubliceren/:oin/:idLevering', {
        templateUrl: 'app/publiceren/opnieuwpubliceren.html',
        controller: 'OpnieuwpublicerenController'
    });
}])

.controller('OpnieuwpublicerenController', ['$scope', '$location', '$routeParams', '$http', 'util', 'searchServicePubliceren', function ($scope, $location, $routeParams, $http, util, searchServicePubliceren) {
    $scope.oin = $routeParams.oin;
    $scope.idLevering = $routeParams.idLevering;
    $scope.util = util;
    $scope.pageSize = [
                              {number : 10},
                              {number : 30},
                              {number : 50},
                              {number : 100},
                              {number : 200}
                          ];

    resetPagination();
    getStatusResults();

    function getStatusResults() {
        searchServicePubliceren.search($scope.oin, $scope.idLevering, $scope.pagination).then(function (success) {
            $scope.publicatieOpdrachten = success.data.xpoReports;
            $scope.pagination.count = success.data.count;
        }, function (error) {
            $scope.error = "Error searching status: " + error.data.error;
        });
    }


    var resendUrl = "regisseur/services/beheer/opnieuwversturenpublicatie/";
    $scope.resend = function(bericht) {
        var fd = new FormData();
        fd.append('oin', $scope.oin);
        fd.append('idlevering', $scope.idLevering);
        fd.append('publicatieid', bericht.publicatieId);

        return $http.post(resendUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function (success) {
                  $scope.result = "Opnieuw verzonden";
               }, function (error) {
                  $scope.result = "";
                  $scope.errorstate = true;
                  $scope.error = "Fout: " + error.data.error;
              });
    }

    function resetPagination() {
        $scope.pagination = {
            pageNum: 1,
            pageSize: 10
        };
    }

    $scope.updatePageSize = function() {
        $scope.pagination.pageSize = $scope.selectedPageSize
        getStatusResults();
    };

    $scope.updateResults = function() {
        getStatusResults();
    };
}])

.service('searchServicePubliceren', function($http) {
    this.search = function(oin, idLevering, pagination) {
        var uri = "regisseur/services/beheer/getpublicatieopdrachtenbyid";
        var params = {};

        params.oin = oin;
        params.idLevering = idLevering;
        params.pageNum = pagination.pageNum;
        params.pageSize = pagination.pageSize;

        return $http.get(uri, { params: params });
    }
});
