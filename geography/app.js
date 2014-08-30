console.log('hi');
angularApp = angular.module("angularApp",['ui.bootstrap']);

angularApp.controller("appCtrl", function($scope, initialData){
	$scope.wasatchFeatures = initialData.wasatchFeatures;
	$scope.newFeatureInputs = {};

	$scope.saveNewFeature = function(){
		$scope.newFeatureInputs.activities = $scope.newFeatureInputs.activities.split(',');
		$scope.wasatchFeatures.push($scope.newFeatureInputs);
		$scope.newFeatureInputs = {};
	}
});







angularApp.factory("initialData", function(){
	return {wasatchFeatures: [
		{name: 'Mount Olympus', activities: ['Hiking', 'Climbing'], type: 'Mountain', description: 'Mount Olympus rises steeply over Salt Lake City and provides a challenging hike or climb for fit adventurers. Be prepared for ice near the summit in winter.'},
		{name: 'Pentapitch', activities: ['Climbing'], type: 'Crag', description: 'The Pentapitch area offers a shadier Little Cottonwood climbing option than the crags on the north side of the canyon. Moderate trad climbing is the name of the game.'},
		{name: 'Big Cottonwood Creek', activities: ['Fly Fishing', 'Toe Dipping'], type: 'Creek'},
		{name: 'Emigration Canyon', activities: ['Road Biking', 'Running']},
		{name: 'Point of the Mountain', activities: ['Flying', 'Paragliding'], type: 'Mountain'}
	]};
});


