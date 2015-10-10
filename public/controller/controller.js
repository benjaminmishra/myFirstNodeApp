var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

var socket = io();

socket.on('new',function(){
	//console.log(data);
		$http.get('/contactlist').success(function(response){
		console.log('I got the data i requested');
		$scope.contactList = response;
	});
	//$scope.contactList.push(data);
});

socket.on('del',function(){
	//console.log(data);
		$http.get('/contactlist').success(function(response){
		console.log('I deleted the data as requested');
		$scope.contactList = response;
	});
	//$scope.contactList.push(data);
});

$http.get('/contactlist').success(function(response){
	console.log('I got the data i requested');
	$scope.contactList = response;
});


$scope.addContact= function(){
	$http.post('/contactlist',$scope.contact).success(function(response){
		//console.log(response);
		//refresh();
		$scope.contact ='';
		$scope.contactList.push(response);
	});
};

$scope.remove= function(id){
	$http.delete('/contactlist/'+ id).success(function(response){
		$http.get('/contactlist').success(function(response){
			console.log('I got the data i requested');
			$scope.contactList = response;
		});
	});
};


$scope.edit= function(id){
	
};

}]);

