var app = angular.module('Trashy', ['ui.router','nvd3']);
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var offset = new Date().getTimezoneOffset();

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

        .state('monthly-trends', {
            url: '/monthly-trends',
            templateUrl: '/monthly-trends.html',
            controller: 'MonthPlotCtrl'
        })

        .state('weekly-trends', {
            url: '/weekly-trends',
            templateUrl: '/weekly-trends.html',
            controller: 'WeekPlotCtrl'
        })

        .state('daily-trends', {
            url: '/daily-trends',
            templateUrl: '/daily-trends.html',
            controller: 'DayPlotCtrl'
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

app.controller('WeekPlotCtrl', [
'$scope',
'dataSample',
function($scope, dataSample) {
    $scope.dataSample = dataSample.dataSample; 

    $scope.options = {
        chart: {
            type: 'lineChart',
            forceY: [0,100],
            height: 450,
            margin: {
                top: 20,
                right: 55,
                bottom: 40,
                left: 55
            },
            x: function(d){ 
                return d.x; },
            y: function(d){ return d.y; },
            useInteractiveGuideline: true, 
            xAxis: {
                axisLabel: 'Date',
                tickFormat: function(d) {
                    return d3.time.format('%d %X')(new Date(d));
                }
            },
            yAxis: {
                axisLabel: 'Trash Level (%)',
                tickFormat: function(d){
                    return d3.format('.01f')(d);
                },
                axisLabelDistance: -10
            }
        }
    };

       
    $scope.data = [{values: [], key: 'Trash level'}];

    var date = new Date();
    var prevDate = new Date();
    prevDate.setDate(prevDate.getDate()-7);
    $scope.date = (prevDate.getMonth()+1).toString() + '/' + prevDate.getDate().toString() + ' - ' + (date.getMonth()+1).toString() + '/' + date.getDate().toString();

    dataSample.getAll().then(function(result) {
        /*
        console.log(d[0].time_stamp);
        console.log(d[0].time_stamp.substring(0,10));
        console.log(d[0].time_stamp.substring(5,7));
        console.log(d[0].time_stamp.substring(8,10));
        console.log(d[0].time_stamp.substring(11,19));
        console.log(d[0].time_stamp.substring(14,16));
        console.log(d[0].time_stamp.substring(17,19));*/
        var d = dataSample.dataSample;
        var day = date.getDate(); 
        for (var i =0; i < d.length; i++) {
            var tempDate = new Date(d[i].time_stamp.substring(0,10) + ' ' + d[i].time_stamp.substring(11,19));
            tempDate.setMinutes(tempDate.getMinutes()-offset);
            if(tempDate >= prevDate) {

                $scope.data[0].values.push({x: new Date(tempDate.getTime()), y: d[i].trash_level});
            }
        }
    });
}]);

app.controller('DayPlotCtrl', [
'$scope',
'dataSample',
function($scope, dataSample) {
    $scope.dataSample = dataSample.dataSample; 

    $scope.options = {
        chart: {
            type: 'lineChart',
            forceY: [0,100],
            height: 450,
            margin: {
                top: 20,
                right: 55,
                bottom: 40,
                left: 55
            },
            x: function(d){ 
                return d.x; },
            y: function(d){ return d.y; },
            useInteractiveGuideline: true, 
            xAxis: {
                axisLabel: 'Date',
                tickFormat: function(d) {
                    return d3.time.format('%d %X')(new Date(d));
                }
            },
            yAxis: {
                axisLabel: 'Trash Level (%)',
                tickFormat: function(d){
                    return d3.format('.01f')(d);
                },
                axisLabelDistance: -10
            }
        }
    };

       
    $scope.data = [{values: [], key: 'Trash level'}];

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1; 
     
    
    $scope.date = month.toString() + '/' + day.toString();

    dataSample.getAll().then(function(result) {
        var d = dataSample.dataSample;
        for (var i =0; i < d.length; i++) {
            var tempDate = new Date(d[i].time_stamp.substring(0,10) + ' ' + d[i].time_stamp.substring(11,19));
            tempDate.setMinutes(tempDate.getMinutes()-offset);
            if(tempDate.getDate() == day) {
                $scope.data[0].values.push({x: new Date(tempDate.getTime()), y: d[i].trash_level});
            }
        }
    });
/*
    setInterval(function() {
        
    dataSample.getAll().then(function(result) {
        var d = dataSample.dataSample;
        $scope.data[0].values = [];
        for (var i =0; i < d.length; i++) {
            var tempDate = new Date(d[i].time_stamp.substring(0,10) + ' ' + d[i].time_stamp.substring(11,19));
            tempDate.setMinutes(tempDate.getMinutes()-offset);
            if(tempDate.getDate() == day) {
                $scope.data[0].values.push({x: new Date(tempDate.getTime()), y: d[i].trash_level});
            }
        }
    });
    dataSample.create({
        trash_level: Math.floor(Math.random()*100),
    });

    }, 5000); */
}]);

app.controller('MonthPlotCtrl', [
'$scope',
'dataSample',
function($scope, dataSample) {
    $scope.dataSample = dataSample.dataSample; 

    $scope.options = {
        chart: {
            type: 'lineChart',
            forceY: [0,100],
            height: 450,
            margin: {
                top: 20,
                right: 55,
                bottom: 40,
                left: 55
            },
            x: function(d){ 
                return d.x; },
            y: function(d){ return d.y; },
            useInteractiveGuideline: true, 
            xAxis: {
                axisLabel: 'Date',
                tickFormat: function(d) {
                    return d3.time.format('%d %X')(new Date(d));
                }
            },
            yAxis: {
                axisLabel: 'Trash Level (%)',
                tickFormat: function(d){
                    return d3.format('.01f')(d);
                },
                axisLabelDistance: -10
            }
        }
    };

       
    $scope.data = [{values: [], key: 'Trash level'}];

    var date = new Date();
    
    $scope.date = monthNames[date.getMonth()];

    dataSample.getAll().then(function(result) {
        var d = dataSample.dataSample;
        var month = date.getMonth();
        for (var i =0; i < d.length; i++) {
            var tempDate = new Date(d[i].time_stamp.substring(0,10) + ' ' + d[i].time_stamp.substring(11,19));
            tempDate.setMinutes(tempDate.getMinutes()-offset);
            if(tempDate.getMonth() == month) {
                $scope.data[0].values.push({x: new Date(tempDate.getTime()), y: d[i].trash_level});
            }
        }
    });
}]);
