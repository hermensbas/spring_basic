'use strict';

angular.module('regisseur.zipupload', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/zipupload', {
        templateUrl: 'app/zipupload/zipupload.html',
        controller: 'ZipUploadController'
    });
}])

.controller('ZipUploadController', ['$scope', 'zipUpload', function ($scope, zipUpload) {

    $scope.restrictie = "";

    $scope.uploadZip = function(){
       var file = $scope.zipFile;
       var uploadUrl = "regisseur/services/beheer/uploadopdracht";
       zipUpload.uploadZipToUrl(file, uploadUrl)
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

.service('zipUpload', ['$http', function ($http) {
    this.uploadZipToUrl = function(file, uploadUrl){
       var fd = new FormData();
       fd.append('file', file);

       return $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })
    }

 }]);

