reservationApp = angular.module("reservationApp",['firebase', 'ui.bootstrap']);

reservationApp.controller("reservationController", function($scope, $firebase){

	var userRef = new Firebase('https://sizzling-inferno-9499.firebaseio.com/users');
	var eventRef = new Firebase('https://sizzling-inferno-9499.firebaseio.com/events');

	//Scope variables
	$scope.users = $firebase(userRef).$asArray();
	$scope.events = $firebase(eventRef).$asArray();

	$scope.currentUser = null;
	$scope.newEventInputs = {};
	$scope.newUsername = null;
	$scope.errorMessage = null;
	$scope.newEventInputs = {reserved: false};
	console.log($scope.errorMessage);

	$scope.saveNewEvent = function(newEventInputs, events){
		if ($scope.newEventInputs.name && $scope.newEventInputs.date && typeof($scope.newEventInputs.date)=="object"){
			newEventInputs['date'] = newEventInputs['date'].toLocaleDateString();
			events.$add(newEventInputs);
			$scope.resetNewEventInputs();
			$scope.errorMessage = null;
		} else {
			$scope.errorMessage = "Enter Name & Date Before Creating New Event";
		}
	};

	$scope.resetNewEventInputs = function(){
		$scope.newEventInputs = {reserved: false};
	};

	$scope.saveNewUser = function(newUsername){
		$scope.users.$add({'name': newUsername, 'points': 0});
		newUsername = null
	}

	$scope.reserveEvent = function(reservationEvent){
		if ($scope.currentUser){
			reservationEvent.reserved = true;
			reservationEvent['reservedBy'] = $scope.currentUser.name;
			$scope.events.$save(reservationEvent);
		} else {
			$scope.errorMessage = 'Choose User To Make a Reservation';
		}
	};

	$scope.unreserveEvent = function(reservationEvent){
		reservationEvent.reserved = false;
		reservationEvent.reservedBy = null;
		$scope.events.$save(reservationEvent);
	};

	$scope.setUser = function(user){
		$scope.currentUser = user;
		$scope.errorMessage = null;
	};

	$scope.datepickerOpen = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.datepickerOpened = true;
	};
});

