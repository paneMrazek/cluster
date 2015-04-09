var app = angular.module('clusterApp', []);

app.controller('MainCtrl',['$scope', 'urls', function($scope, urls){
	$scope.cluster = [];
	$scope.getMyPids = function(){ console.log('inside get my ppids');
	    for(var i=0; i < 50; i++){
		urls.getPids().then(function(data){
			console.log("getAll");
			console.log('data', data);
			$scope.cluster.push(data);
		});
	    }
	}

	$scope.getPids = function(){
		$scope.cluster = [{pid:12},{pid:34}];
	}
}]);


app.factory('urls',['$http', '$q', function($http, $q){
	function getPids(){
		var prom = $q.defer();
		$http.get('/pid')
		.success(function(data){prom.resolve(data);})
		.error(function(e){prom.resolve(e);})
		return prom.promise;
	}
	return{
		getPids: getPids
	}
}]);
