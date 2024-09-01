'use strict';

angular.module('regisseur.zipuploadintern', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/zipuploadintern', {
        templateUrl: 'app/zipuploadintern/zipuploadintern.html',
        controller: 'zipUploadInternController'
    });
}])

.controller('zipUploadInternController', ['$scope', 'zipUploadIntern', function ($scope, zipUploadIntern) {

    $scope.zipUploadIntern = function(){
       var file = $scope.zipFile;
       var uploadUrl = "regisseur/services/beheer/uploadopdracht";
        zipUploadIntern.uploadZipToUrl(file, uploadUrl)
        .then(function successCallback(response) {
           $scope.result = "Upload geslaagd";
        }, function errorCallback(response) {
           $scope.result = "Fout: " + response.data.message;
        });
    };

    $scope.emptyResult = function() {
        $scope.result = "";
    };
}])

.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;

          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }])

.service('zipUploadIntern', ['$http', function ($http) {
    this.uploadZipToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        fd.append('verwerkingsrestrictie', '');

        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
    }

 }]);

