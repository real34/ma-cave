require('angular');
var Cave = require('./cave');
var Bouteille = require('./bouteille');

angular.module('MaCave', [])
.controller('CaveController', ['$scope', function($scope) {
	var cave = new Cave();
	$scope.estVide = function estVide() {
		return cave.estVide();
	}

	initialiseFormAjout();
	$scope.ajouteBouteille = function ajouteBouteille() {
		cave.ajouteBouteille(new Bouteille($scope.nom));
		initialiseFormAjout();
	}

	function initialiseFormAjout(){
		$scope.nom = '';
	}
}]);