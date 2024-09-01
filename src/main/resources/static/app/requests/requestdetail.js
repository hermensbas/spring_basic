'use strict';

angular.module('regisseur.requestdetail', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/opdrachten/:oin/:idLevering', {
        templateUrl: 'app/requests/requestdetail.html',
        controller: 'RequestDetailController'
    });
}])

.controller('RequestDetailController', ['$scope', '$location', '$routeParams', '$http', '$filter', 'searchService', 'util', function ($scope, $location, $routeParams, $http, $filter, searchService, util) {

    $scope.oin = $routeParams.oin;
    $scope.idLevering = $routeParams.idLevering;
    $scope.statusXml = "";
    $scope.exportUrl = "regisseur/services/beheer/export/" + $scope.oin + "/" + $scope.idLevering;
    $scope.util = util;


    var detailStatusUrl = "regisseur/services/beheer/status/" + $scope.oin + "/" + $scope.idLevering;
    var berichtenUrl = "regisseur/services/beheer/berichten/" + $scope.oin + "/" + $scope.idLevering;
    var meldingenUrl = "regisseur/services/beheer/meldingen/" + $scope.oin + "/" + $scope.idLevering;

    $http.get(berichtenUrl).then(function (success) {
        var bestanden = success.data.bestanden;
        $scope.bestanden = [];
        for (var i=0; i<bestanden.length; i++) {
          var bestand = bestanden[i];
          var isZip = bestand.match(/\.zip$/i);

          var item = {
            "naam": bestand,
            "url": '/' + $scope.oin + '/' + $scope.idLevering + bestand,
            "xml": "",
            "isZip": isZip,
            "visible": false
          };
          $scope.bestanden.push(item);
        }

    }, function (error) {
        $scope.error = "Error reading berichten list: " + error.data.error;
    });

    $http.get(meldingenUrl).then(function (success) {
        $scope.meldingen = success.data;
     }, function (error) {
        $scope.error = "Error reading meldingen: " + error.data.error;
    });


    $scope.formatField = function(fieldname, fieldvalue) {
      // datum velden eindigen met de tekst 'datum'
      if (fieldname.match(/datum$/i)) {
        return $filter('date')(fieldvalue, "yyyy-MM-dd HH:mm:ss");
      } else {
        return fieldvalue;
      }
    };

    var filter = {
      oin: $scope.oin,
      idLevering: $scope.idLevering
    };

    var pagination = {
      pageNum: 1,
      pageSize: 1
    };

    searchService.search(filter, pagination).then(function (success) {
        var data = success.data;
        $scope.opdracht = data.statussen[0];
    }, function (error) {
        $scope.error = "Error searching status: " + error.data.error;
    });

    $http.get(detailStatusUrl).then(function (success) {
        $scope.statusXml = success.data;
    }, function (error) {
        $scope.error = "Error reading details: " + error.data.error;
    });

    $scope.viewDetails = function(bericht) {
      var url = "regisseur/services/beheer/berichten" + bericht.url;

      if (bericht.isZip) {
        // download bericht
        window.open(url);
      } else {
        if (bericht.xml) {
          bericht.visible = ! bericht.visible;
        } else {
          $http({ url: url , method: 'GET', transformResponse: undefined }).then(function (success) {
            bericht.xml = success.data;
            bericht.visible = true;
          }, function (error) {
              $scope.error = "Error reading bericht: " + error.data.error;
          });
        }
      }
    };
    $scope.resendTransformatie = function() {
            $location.path('/transformatie/' + $scope.oin + "/" + $scope.idLevering);
    }

    $scope.resendForward = function() {
        $location.path('/forward/' + $scope.oin + "/" + $scope.idLevering);
    }

    $scope.opnieuwPubliceren = function() {
        $location.path('/opnieuwpubliceren/' + $scope.oin + "/" + $scope.idLevering);
    }

}]);


