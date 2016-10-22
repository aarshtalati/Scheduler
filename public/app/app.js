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
    $scope.hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
    $scope.booked = [];
    $scope.appointments = [];
    $scope.editName = '';
    $scope.editPhone = '';
    $scope.selected = undefined;
    $scope.showValidationErrors = false;
    $scope.phoneRegEx = '^\([0-9]){10}$';

    $scope.trackSelectedItem = function (id) {
        $scope.selected = id;
        $scope.checkAppointment(id);
    }

    $scope.checkAppointment = function (id) {
        $scope.editName = '';
        $scope.editPhone = '';
        if ($scope.booked.indexOf(id) == -1) {
            return;
        }
        console.log('checking, ', id);
        angular.forEach($scope.appointments, function (value, key) {
            if (value.startHour == id) {
                $scope.editName = value.name;
                $scope.editPhone = value.phone;
            }
        });
    }

    $scope.upsertAppointment = function (id) {
        if (!isFormValid()) {
            return;
        }
        $scope.showValidationErrors = false;
        var update = false;
        angular.forEach($scope.appointments, function (value, key) {
            if (value.startHour == id) {
                value.name = $scope.editName;
                value.phone = $scope.editPhone;
                update = true;
            }
        });
        if (!update) {
            var a = new appoointment();
            a.startHour = id;
            a.name = $scope.editName;
            a.phone = $scope.editPhone;
            $scope.appointments.push(a);
        }
        if ($scope.booked.indexOf(id) == -1) {
            $scope.booked.push(id);
        }
        $scope.editName = '';
        $scope.editPhone = '';
        $('#myModal').modal('hide');
    };

    var isFormValid = function () {
        $scope.showValidationErrors = true;
        return $scope.frmUpsertAppointment.$valid;
    };

    var appoointment = function () {
        this.startHour = undefined;
        this.name = '';
        this.phone = '';
    };
});

app.value('$', $);