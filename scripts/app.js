var angularApp = angular.module('angularApp', ['ngRoute', 'ngSanitize']);

angularApp.config(function($routeProvider){
	//routing information
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

angularApp.controller('navController', function($scope, navLinks, navStatus){
	$scope.links = navLinks;

	navStatus.update = function(){
		$scope.navStatus = navStatus;
	};
	navStatus.update();
});

angularApp.service('navStatus', function(){
	this.navbarCollapsed = true;
	this.projectDropdownActive = false;

	this.toggleNavCollapse = function(){
		this.navbarCollapsed = !this.navbarCollapsed;
		this.update();
	};

	this.toggleProjectDropdown = function(){
		this.projectDropdownActive = !this.projectDropdownActive;
		this.update();
	};

	this.collapseNav = function(){
		this.navbarCollapsed = true;
		this.update();
	};

	this.collapseProjectDropdown = function(){
		this.projectDropdownActive = false;
		this.update();
	};
});

angularApp.controller('homeController', function($scope){
});

angularApp.controller('blogController', function($scope, $http, blogPostFormatter){
	$http.get('/cgi-bin/blog_content_aggregator.py').success(function(data){
		$scope.entries = blogPostFormatter(data);
	});
});


angularApp.controller('contactController', function($scope){
});

navLinks = angularApp.factory('navLinks', function(){
	return {
	 	'home': {'text': 'ThundercatDesigns', 'url': '#'},

		'linklist': [{'text': 'Blog', 'url': '#blog'},
		    {'text': 'Contact', 'url': '#contact'}
		    ],

	 	'projectlist': [{'text': 'Reservation App', 'url': '/reservations'},
		    {'text': 'Geography List', 'url': '/geography'}
		    ]
	};
});

angularApp.factory('blogPostFormatter', function(){
	//Transform string into an actual date before displaying
	//and then sort by date, descending
	return function(data){
		return data.map(function(entry){
			return {'title': entry.title, 'date': new Date(entry.date), 'body': entry.body}
		}).sort(function(a,b){
			if (a.date > b.date) {return -1};
			if (a.date < b.date) {return 1};
			return 0;
		})};
});
