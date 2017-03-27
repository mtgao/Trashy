var app = angular.module('Trashy', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl'
        })

        .state('trends', {
            url: '/trends',
            templateUrl: '/trends.html',
            controller: 'TrendsCtrl'
        });  

    // default url
    $urlRouterProvider.otherwise('home');
}]);

app.factory('dataSample', [function(){
    var o = {
        dataSample: []
    };
    return o;
}]);

app.controller('MainCtrl', [
'$scope',
'dataSample',
function($scope, dataSample){
    $scope.test = 'Trash Level Sample:';
    $scope.dataSample = dataSample.dataSample;

    // format for data samples
    $scope.dataSample = [
        {title: 'data', level: 10},
        {title: 'data', level: 30}
    ];

    // function to manually add data sample
    $scope.addData = function(){
        // user can't enter a blank title
        if(!$scope.level || $scope.level === '') {
            return;
        }

        // push entry into our dataSample
        $scope.dataSample.push({title: 'data', level: $scope.level});
        
        // reset title after entry added
        $scope.level = '';
    };
}]);

app.controller('TrendsCtrl', [
'$scope',
'dataSample',
function($scope, $stateParams, dataSample) {

}]);

