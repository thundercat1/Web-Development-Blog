var angularApp = angular.module('productDataApp', ['ui.bootstrap']);


angularApp.controller('productDataAppController', function($scope, peopleData, taxonomyData) {
	$scope.people = peopleData;
	$scope.taxonomy = taxonomyData;

	//set initial values for input form
	var reset = function() {
		$scope.chosenPerson = {"name": "Nobody", "rate": 0};
		$scope.chosenTaxonomy = {"name": "Nothing", "annualCreation": 0, "lifeSpanYears": 0};
		$scope.dataInputTimeToCreate = null;
		$scope.dataInputMonthsToRecheck = null;
		$scope.newFieldName = null;
	}

	reset();

	$scope.setChosenPerson = function(person) {
		$scope.chosenPerson = person;
	};

	$scope.setChosenTaxonomy = function(tax) {
		$scope.chosenTaxonomy = tax;
	};


	$scope.newDataFields = [];
	
	$scope.totalCost = function() {
		return $scope.newDataFields.reduce(function(previousValue, currentValue) {return previousValue + currentValue.annualCost}, 0);
	};

	$scope.addNewDataField = function(field) {
		if ($scope.chosenTaxonomy.name != "Nothing" && $scope.chosenPerson.name != "Nobody" && (typeof($scope.dataInputMonthsToRecheck)=="number") && (typeof($scope.dataInputTimeToCreate)=="number")) {

			var creationCount = $scope.chosenTaxonomy.annualCreation;
			var maintenanceCount = creationCount * $scope.chosenTaxonomy.lifeSpanYears * (12 / $scope.dataInputMonthsToRecheck);

			var annualCost = ((creationCount + maintenanceCount) * ($scope.dataInputTimeToCreate / 3600) * $scope.chosenPerson.rate);

			$scope.newDataFields.push(
					{	"name": $scope.newFieldName,
						"responsible": $scope.chosenPerson,
				"annualCost": annualCost
					}
					);

			reset();
		}
	};

	$scope.remove = function(field) {
		var index = $scope.newDataFields.indexOf(field);
		if (index > -1) $scope.newDataFields.splice(index, 1);
	};

});


angularApp.factory('peopleData', function() {
	return [
		{"name": "Buyer", "rate": 23},
		{"name": "Product Data", "rate": 15},
		{"name": "Visual Merch", "rate": 14},
		{"name": "Marketing", "rate": 20}
	];
});


angularApp.factory('taxonomyData', function() {
	return [
		{"name": "sku", "annualCreation": 500000, "lifeSpanYears": 3},
		{"name": "style", "annualCreation": 100000, "lifeSpanYears": 5},
		{"name": "brand", "annualCreation": 500, "lifeSpanYears": 7}
	];
});
