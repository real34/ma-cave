var moduleBouteille = require('../app/bouteille')
var Bouteille = moduleBouteille.Bouteille
var Millesime = moduleBouteille.Millesime
var Couleur = moduleBouteille.Couleur

describe('Bouteille', function () {
  describe('création', function () {
    it('doit avoir un nom', function () {
      var bouteille = new Bouteille('Chateau DevOpenSud')
      bouteille.should.have.property('nom')
      bouteille.nom.should.equal('Chateau DevOpenSud')
    })
  })

  describe('enrichissement des informations', function () {
    	var bouteille

    	beforeEach(function () {
    		bouteille = new Bouteille('Fougue')
    	})

    	it('peut définir le millésime', function () {
    		var millesime = new Millesime(2011)
    		bouteille.setMillesime(millesime)
    		bouteille.millesime.should.equal(millesime)
    	})

    	it('peut définir la  couleur', function () {
    		var couleur = new Couleur('rouge')
    		bouteille.setCouleur(couleur)
    		bouteille.couleur.should.equal(couleur)
    	})

    	xit('peut définir ... le reste !', function () {
    		// TODO !
    	})
  })
})

/**

Propriétés d'une bouteille (à affiner) :
Voir http://fr.wikipedia.org/wiki/%C3%89tiquette_de_vin et http://fr.wikipedia.org/wiki/%C5%92nologie

Il faudra fournir le nombre de bouteilles à mettre en cave, et permettre d'ajouter facilement de nouvelles bouteilles identiques.
Par exemple : mettre un carton de 6 bouteilles en cave

Exemple :
cuvée : Fougue
couleur : rouge
contenance : 75cl
domaine : Château Saincrit
dénomination bordeaux supérieur aoc
millésime : 2011
région : bordeaux
cépages: merlot, cabernet sauvignon
taux alcool
Producteur :
    nom
    propriétaire
     adresse
Médailles

(evaluation perso, prix, commentaires, )
*/
