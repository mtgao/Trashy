var app = angular.module('Trashy', ['ui.router','nvd3']);

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
            controller: 'PlotCtrl'
        });
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

    o.getArray = function() {
        var j = 0;
   /*     for(var i = 0; i < o.dataSample.length; i++) {
            j++
            return o.dataSample[i];
        }
        alert(j)*/
        return o.dataSample;
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
    dataSample.getAll().then(function(result) {
        var l = dataSample.dataSample;
        alert(l.length)
        for (v in dataSample.dataSample) {
            alert(v.trash_level);
        }
    });
    
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

app.controller('PlotCtrl', [
'$scope',
'dataSample',
function($scope, dataSample) {
    $scope.dataSample = dataSample.dataSample; 

    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 450,
            margin: {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            useInteractiveGuideline: true, 
            xAxis: {
                axisLabel: 'Date'
            },
            yAxis: {
                axisLabel: 'Trash Level (%)',
                tickFormat: function(d){
                    return d3.format('.01f')(d);
                },
                axisLabelDistance: -10
            }
        },
        title: {
            enable: true,
            text: 'Weekly Trash Level'
        }
    };

       
    $scope.data = [{values: [], key: 'Trash level'}];

    dataSample.getAll().then(function(result) {
        var d = dataSample.dataSample;
        for (var i =0; i < d.length; i++) {
            $scope.data[0].values.push({x: i, y: d[i].trash_level});
        }
    });
}]);

