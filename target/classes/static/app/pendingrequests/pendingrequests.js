'use strict';

angular.module('regisseur.pendingrequests', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/pendingrequests', {
            templateUrl: 'app/pendingrequests/pendingrequests.html', controller: 'PendingController'
        });
    }])

    .controller('PendingController', ['$scope', '$location', '$routeParams', '$http', 'searchPendingRequests', function ($scope, $location, $routeParams, $http, searchPendingRequests) {

    resetPagination();
    getStatusResults();

    function getStatusResults() {
        searchPendingRequests.search($scope.pagination).then(function (success) {
            var data = success.data;
            $scope.statussen = data.statussen;
            $scope.pagination.count = data.count;
        }, function (error) {
            $scope.errorMelding = "error while fetching pending requests: " + error.data.error;
        });
    }
        function resetPagination() {
            $scope.pagination = {
                pageNum: 1,
                pageSize: 10
            };
        }

        $scope.updateResults = function() {
            getStatusResults();
        };

        $scope.viewDetails = function (status) {
            $location.path('/opdrachten/' + status.oin + '/' + status.idLevering);
        };

    }])

.service('searchPendingRequests', function($http) {
    this.search = function(pagination) {
        var uri = 'regisseur/services/beheer/status/getpendingrequests';
        var params = {};

        params.pageNum = pagination.pageNum;
        params.pageSize = pagination.pageSize;

        return $http.get(uri, { params: params });
    }
});
