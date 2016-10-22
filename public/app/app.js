var app = angular.module('app', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: '/partials/main',
                controller: 'mainController'
            })
            .when('/about', {
                templateUrl: '/partials/about'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);

app.controller('mainController', function ($scope) {
});