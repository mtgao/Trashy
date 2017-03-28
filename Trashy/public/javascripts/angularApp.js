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
    // default url
    $urlRouterProvider.otherwise('home');
}]);

app.factory('dataSample', ['$http', function($http){
    var o = {
        dataSample: []
    };

    o.getAll = function() {
        return $http.get('/data').success(function (data) {
            angular.copy(data, o.dataSample);
        });
    };

    o.create = function(data) {
        return $http.post('/data', data).success(function (data) {
            o.dataSample.push(data);
        }); 
            
    };
    
    return o;
}]);

app.controller('MainCtrl', [
'$scope',
'dataSample',
function($scope, dataSample){
    $scope.dataSample = dataSample.dataSample;
    dataSample.getAll();
    

    // function to manually add data sample
    $scope.addData = function(){
        // user can't enter a blank title
        if(!$scope.level || $scope.level === '') {
            return;
        }
       
        dataSample.create({
            trash_level: $scope.level,
        });
        // reset title after entry added
        $scope.level = '';
    };
}]);

