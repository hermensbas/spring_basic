var util = angular.module("util.module", []);
util.factory('util', function() {
    return {
        toDate: function(date) {
            return date * 1000;
        }
    }
});
