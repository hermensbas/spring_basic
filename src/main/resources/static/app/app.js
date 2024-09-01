'use strict';

// Declare app level module which depends on views, and components
angular.module('regisseur', [
  'ngRoute',
  'ngPrettyJson',
  'ui.bootstrap',
  'prettyXml',
  'util.module',
  'regisseur.requestsoverview',
  'regisseur.requestdetail',
  'regisseur.resendforward',
  'regisseur.status',
  'regisseur.version',
  'regisseur.log',
  'regisseur.zipupload',
  'regisseur.zipuploadintern',
  'regisseur.ebmsping',
  'regisseur.login',
  'regisseur.publiceren',
  'regisseur.resendtransformaties',
  'regisseur.afwijkvergunning',
  'regisseur.downloadservice',
  'regisseur.opnieuwpubliceren',
  'regisseur.pendingrequests'
])

.config(['$locationProvider', '$routeProvider', '$sceProvider', '$httpProvider',
    function ($locationProvider, $routeProvider, $sceProvider, $httpProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({ redirectTo: '/' });

        $sceProvider.enabled(false);
        
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }
]);
