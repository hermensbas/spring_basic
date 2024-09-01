'use strict';

angular.module('regisseur.login', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginController'
    });
}])

.service('authInterceptor', function($rootScope, $q) {
    var service = this;
    service.responseError = function(response) {
        if (response.status === 401) {
            $rootScope.authenticated = false;
            window.location = "#!/login";
        }
        return $q.reject(response);
    };
})
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}])

.controller('LoginController', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location) {
    var authenticate = function(credentials, callback) {
        var headers = credentials ? {authorization : "Basic "
            + btoa(credentials.username + ":" + credentials.password)
        } : {};

        $http({ url: '/public/account/logon', method: 'GET', headers : headers, transformResponse: undefined}).then(function (data) {
            $rootScope.authenticated = true;
          callback && callback();
        }, function (error) {
          $rootScope.authenticated = false;
          callback && callback();
        });

      }
    
      authenticate();
      $scope.credentials = {};
      $scope.login = function() {
          authenticate($scope.credentials, function() {
            if ($rootScope.authenticated) {
              $location.path("/");
              $scope.error = false;
            } else {
              $location.path("/login");
              $scope.error = true;
            }
          });
      };
      $scope.logout = function() {
          $http.post('logout', {}).then(function(success) {
            $rootScope.authenticated = false;
            $location.path("/");
          }, function (error) {
            $rootScope.authenticated = false;
          });
      };
    
}]);