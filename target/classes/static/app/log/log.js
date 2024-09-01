'use strict';

angular.module('regisseur.log', ['ngRoute', 'luegg.directives'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/log', {
        templateUrl: 'app/log/log.html',
        controller: 'LogController'
    });
}])

.controller('LogController', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
    $scope.autoscroll = true;
    $scope.linewrap = true;
    $scope.autorefresh = true;
    var autorefreshTimer = null;

    $scope.reload = function () {
        $http.get('regisseur/logfile').then(function (success) {
            $scope.data = success.data;
        }, function (error) {
            $scope.data = "Error reading logfile: " + error.data.error;
        })
    };

    $scope.toggleAutoRefresh = function () {
        $scope.autorefresh = !$scope.autorefresh;
        updateAutoRefreshTimer();
    };

    $scope.reload();
    updateAutoRefreshTimer();

    // make sure the timer is cancelled when we navigate away from the page, or it will keep requesting the log
    $scope.$on("$destroy",function(){
        if (angular.isDefined(autorefreshTimer)) {
            $interval.cancel(autorefreshTimer);
        }
    });

    function updateAutoRefreshTimer() {
        if ($scope.autorefresh) {
            autorefreshTimer = $interval($scope.reload, 1000);
        } else {
            if (angular.isDefined(autorefreshTimer)) {
                $interval.cancel(autorefreshTimer);
            }
        }
    }
}]);