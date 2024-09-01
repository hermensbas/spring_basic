'use strict';

angular.module('regisseur.requestsoverview', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/opdrachten', {
        templateUrl: 'app/requests/requestsoverview.html',
        controller: 'RequestsOverviewController'
    });
}])

.controller('RequestsOverviewController', ['$scope', '$location', '$http', '$timeout', '$filter', 'searchService', function ($scope, $location, $http, $timeout, $filter, searchService) {
    var timer;

    $scope.filter = {};

    resetPagination();
    getStatusResults();

    $scope.dateOptions = {
        showWeeks: false
    };

    $scope.openFrom = function() {
        $scope.from.opened = true;
    };

    $scope.openTo = function() {
        $scope.to.opened = true;
    };

    $scope.from = {
        opened: false
    };

    $scope.to = {
        opened: false
    };

    function getStatusResults() {
        searchService.search($scope.filter, $scope.pagination).then(function (success) {
            var data = success.data;
            $scope.statussen = data.statussen;
            $scope.pagination.count = data.count;
        }, function (error) {
            $scope.error = "Error searching status: " + error.data.error;
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

    $scope.filterResults = function() {
        if (timer) {
            $timeout.cancel(timer);
        }
        timer = $timeout(function() {
            resetPagination();
            getStatusResults();
        }, 500);
    };

    $scope.viewDetails = function(opdracht) {
      $location.path('/opdrachten/' + opdracht.oin + '/' + opdracht.idLevering);
    };
}])

.service('searchService', function($http, $filter) {
    this.search = function(filter, pagination) {
        var uri = 'regisseur/services/beheer/status/_zoek';
        var params = {};

        angular.forEach(filter, function(value, item) {
            params[item] = value;
        });

        params.fromDate = $filter('date')(filter.fromDate, 'yyyy-MM-dd');
        params.toDate = $filter('date')(filter.toDate, 'yyyy-MM-dd');

        params.pageNum = pagination.pageNum;
        params.pageSize = pagination.pageSize;

        return $http.get(uri, { params: params });
    }
});


