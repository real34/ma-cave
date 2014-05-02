require('angular');
var Cave = require('./cave');
var Bouteille = require('./bouteille').Bouteille;
var moduleBouteille = require('./bouteille');

angular.module('MaCave', [])
.controller('CaveController', ['$scope', function($scope) {
	var cave = new Cave();
	$scope.estVide = function estVide() {
		return cave.estVide();
	}

	initialiseFormAjout();
	$scope.ajouteBouteille = function ajouteBouteille() {
		var bouteille = new Bouteille($scope.nom);
		bouteille.setMillesime(new moduleBouteille.Millesime($scope.millesime));
		bouteille.setCouleur(new moduleBouteille.Couleur($scope.couleur));
		bouteille.setContenance(new moduleBouteille.Contenance(
			$scope.contenance.quantite,
			$scope.contenance.unite
		));
		bouteille.setProducteur(new moduleBouteille.Producteur($scope.producteur));
		bouteille.setDenomination(new moduleBouteille.Denomination($scope.denomination));
		bouteille.setRegion(new moduleBouteille.Region($scope.region));
		bouteille.setTauxAlcool(new moduleBouteille.Taux($scope.taux_alcool));
		for (var cepage in $scope.cepages) {
			bouteille.ajouteCepage(new moduleBouteille.Cepage(cepage));
		}
		bouteille.ajouteMedaille(new moduleBouteille.Medaille(
			$scope.medaille.classement,
			$scope.medaille.nom,
			$scope.medaille.annee
		));

		cave.ajouteBouteille(bouteille);
		initialiseFormAjout();
	}

	$scope.listeBouteilles = function listeBouteilles() {
		return cave.bouteilles();
	}

	function initialiseFormAjout(){
		// $scope.nom = '';
		// $scope.cepages = [];
		// $scope.medailles = [];
		// $scope.millesime = '';
		// $scope.couleur = '';
		// $scope.contenance = { quantite = '', unite = '' };
		// $scope.producteur = '';
		// $scope.denomination = '';
		// $scope.region = '';
		// $scope.taux_alcool = '';
		// $scope.medaille = { classement: '', nom: '', annee: '' };

		$scope.nom = 'Fougue';
		$scope.cepages = { 'merlot': true, 'cabernet': true };
		$scope.millesime = 2011;
		$scope.couleur = 'rouge';
		$scope.contenance = { quantite: 75, unite: 'cl' };
		$scope.producteur = 'Château Saincrit';
		$scope.denomination = 'bordeaux supérieur aoc';
		$scope.region = 'bordeaux';
		$scope.taux_alcool = 12.5;
		$scope.medaille = { classement: 2, nom: 'belgique', annee: 2013 };
	}
}]);