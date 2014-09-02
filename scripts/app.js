var angularApp = angular.module('angularApp', ['ngRoute', 'ngSanitize']);

angularApp.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl: 'pages/home.html',
		controller: 'homeController'
		})
	.when('/blog', {
		templateUrl: 'pages/blog.html',
		controller: 'blogController'
	})
	.when('/contact', {
		templateUrl: 'pages/contact.html',
		controller: 'contactController'
	})
});

angularApp.controller('navController', function($scope, navLinks){
	$scope.links = navLinks;
	$scope.dropdownActive = false;
	$scope.toggleDropdown = function(){
		$scope.dropdownActive = !$scope.dropdownActive;
		console.log('toggling dropdown');
	}
	$scope.dropdownMouseleave = function(){
		$scope.dropdownActive = false;
	}
});

angularApp.controller('homeController', function($scope){
	$scope.message = "Welcome to the main page";
});

angularApp.controller('blogController', function($scope, $http){
	$scope.message = "This is where the blog is";

	 $http.get('/cgi-bin/blog_content_aggregator.py').success(function(data){
		console.log(data);
		$scope.entries = data;	
	});
});

angularApp.controller('contactController', function($scope){
	$scope.message = "Why don't you contact us?";
});

navLinks = angularApp.factory('navLinks', function(){
	return {
	 	'home': {'text': 'Home', 'url': '#'},

		'linklist': [{'text': 'Blog', 'url': '#blog'},
		    {'text': 'Contact', 'url': '#contact'}
		    ],

	 	'projectlist': [{'text': 'Reservation App', 'url': '/reservations'},
		    {'text': 'Geography List', 'url': '/geography'}
		    ]
	};
});
