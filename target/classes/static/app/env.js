
(function() {

    var environment = 'prod';
    var hostname = document.location.hostname;

    if (hostname.match(/localhost/)) {
        environment = 'local';
    } if (hostname.match(/koop-lvbb-dev\./)) {
        environment = 'dev';
    } else if (hostname.match(/koop-lvbb-tst\./)) {
        environment = 'test';
    } else if (hostname.match(/koop-lvbb-acc\./)) {
        environment = 'acc';
    } else if (hostname.match(/koop-lvbb-perf-acc\./)) {
        environment = 'perf-acc';
    } else if (hostname.match(/koop-lvbb-preprd\./)) {
         environment = 'preprod';
    }

    document.body.className = environment;
}());
