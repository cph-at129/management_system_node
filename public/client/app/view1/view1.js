'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'socket', function($scope, socket) {
  $scope.testDate = new Date();

    socket.emit('client view 1', {test: 'test'});
}]);