require('angular');
var Cave = require('./cave');
var Bouteille = require('./bouteille');

angular.module('MaCave', [])
.controller('CaveController', ['$scope', function($scope) {
	var cave = new Cave();
	$scope.estVide = function estVide() {
		return cave.estVide();
	}
	$scope.ajouteBouteille = function ajouteBouteille() {
		cave.ajouteBouteille(new Bouteille());
	}
}]);