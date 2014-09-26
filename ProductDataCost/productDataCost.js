var angularApp = angular.module('productDataApp', ['ui.bootstrap']);


angularApp.controller('productDataAppController', function($scope, peopleData, taxonomyData) {
	$scope.people = peopleData;
	$scope.taxonomy = taxonomyData;

	//set initial values for input form
	var reset = function() {
		$scope.chosenPerson = {"name": "Nobody", "rate": 0};
		$scope.chosenTaxonomy = {"name": "Nothing", "annualCreation": 0, "lifeSpanMonths": 0};
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
		if ($scope.chosenTaxonomy.name != "Nothing" && $scope.chosenPerson.name != "Nobody" && (typeof($scope.dataInputMonthsToRecheck)=="number")
				&& (typeof($scope.dataInputTimeToCreate)=="number")) {

					var l = $scope.dataInputMonthsToRecheck / 12.0;
					var R = $scope.chosenTaxonomy.annualCreation;
					var t0 = $scope.chosenTaxonomy.lifeSpanMonths / 12.0;

					var auditPeriods = [];
					for (i=0; i < 50; i++) {
						auditPeriods.push(i*l);
					}

					var auditCount = 0;

					for (i = 0; i < auditPeriods.length; i++) {
						var age = auditPeriods[i];
						var touchesThisPeriod = R * (1 - age/(2*t0));
						if (touchesThisPeriod > 0) {auditCount += touchesThisPeriod};
					}

					var annualCost = auditCount * ($scope.chosenPerson.rate / 3600) * $scope.dataInputTimeToCreate;

				}

		$scope.newDataFields.push(
				{	
					"name": $scope.newFieldName,
					"responsible": $scope.chosenPerson,
					"annualCost": annualCost
				});

		reset();
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
{"name": "Marketing", "rate": 20},
{"name": "Unit Man", "rate": 1}
];
});


angularApp.factory('taxonomyData', function() {
	return [
		{"name": "sku", "annualCreation": 532000, "lifeSpanMonths": 6},
		{"name": "style", "annualCreation": 41000, "lifeSpanMonths": 6},
		{"name": "brand", "annualCreation": 400, "lifeSpanMonths": 48},
		{"name": "100 items with 6 month lifespan", "annualCreation": 100, "lifeSpanMonths": 6}
	];
});
