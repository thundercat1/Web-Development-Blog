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
});

angularApp.controller('homeController', function($scope){
	$scope.message = "Welcome to the main page";
});

angularApp.controller('blogController', function($scope, $http){
	$scope.message = "This is where the blog is";

	 $http.get('http://127.0.0.1/cgi-bin/blog_content_aggregator.py').success(function(data){
		console.log(data);
		$scope.entries = data;	
	});
	

});

angularApp.controller('contactController', function($scope){
	$scope.message = "Why don't you contact us?";
});

navLinks = angularApp.factory('navLinks', function(){
	return {
		'linklist': [{'text': 'Blog', 'url': '#blog'},
		    {'text': 'Contact', 'url': '#contact'}
		    ],
	 	'home': {'text': 'Home', 'url': '#'}
	};
});
