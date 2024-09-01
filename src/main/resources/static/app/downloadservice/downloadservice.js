'use strict';

angular.module('regisseur.downloadservice', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/downloadservice', {
        templateUrl: 'app/downloadservice/downloadservice.html',
        controller: 'DownloadController'
    });
}])

.controller('DownloadController', ['$scope', '$location', '$http', '$timeout', '$filter', 'searchServiceDownload', 'util', function ($scope, $location, $http, $timeout, $filter, searchServiceDownload, util) {
    var timer;

    $scope.filter = {};
    $scope.util = util;

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
        searchServiceDownload.search($scope.filter, $scope.pagination).then(function (success) {
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

.service('searchServiceDownload', function($http, $filter) {
    this.search = function(filter, pagination) {
        var uri = 'regisseur/services/downloadservice/_searchdownload';
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


