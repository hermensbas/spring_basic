'use strict';

angular.module('regisseur.afwijkvergunning', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/afwijkvergunning', {
        templateUrl: 'app/afwijkvergunning/overview.html',
        controller: 'OverviewController'
    });
}])

.controller('OverviewController', ['$scope', '$location', '$http', '$timeout', '$filter', 'searchServiceAfwijk', function ($scope, $location, $http, $timeout, $filter, searchServiceAfwijk) {
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
        searchServiceAfwijk.search($scope.filter, $scope.pagination).then(function (success) {
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
}])

.service('searchServiceAfwijk', function($http, $filter) {
    this.search = function(filter, pagination) {
        var uri = 'regisseur/services/afwijkvergunning/_zoekafwijkvergunning';
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


