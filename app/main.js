require('angular');
var Cave = require('./cave');
var Bouteille = require('./bouteille').Bouteille;
var moduleBouteille = require('./bouteille');
var OpenCellarImporter = require('./openCellarImporter');

angular.module('MaCave', [])
.service('CaveService', [function() {
	var cave = new Cave();
	return cave;
}])
.controller('CaveController', ['$scope', 'CaveService', function($scope, CaveService) {
	$scope.estVide = function estVide() {
		return CaveService.estVide();
	}

	$scope.listeBouteilles = function listeBouteilles() {
		return CaveService.bouteilles();
	}

	$scope.importCsvFile = function() {
		var reader = new FileReader();
		reader.onload = function() {
			var importateur = new OpenCellarImporter(CaveService);
			importateur.importCsvString(this.result, function() {
				$scope.$apply();
			});
		};
		reader.readAsText($scope.opencellarCsvFile);
	}
}])
.directive('uploadFile', ['$parse',  function ($parse) {
	return {
		restrict: "EA",
		template: "<input type='file' />",
		replace: true,
		link: function (scope, element, attrs) {
			var modelGet = $parse(attrs.uploadFile);
			var modelSet = modelGet.assign;
			var onChange = $parse(attrs.onChange);

			var updateModel = function () {
				scope.$apply(function () {
					modelSet(scope, element[0].files[0]);
					onChange(scope);
				});
			};

			element.bind('change', updateModel);
		}
	};
}])

.controller('AjoutBouteilleController', ['$scope', 'CaveService', function($scope, CaveService) {
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

		CaveService.ajouteBouteille(bouteille);
		initialiseFormAjout();
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