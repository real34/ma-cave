var Bouteille = require('../app/bouteille');

describe('Bouteille', function () {

    describe('création', function () {
        it('doit avoir un nom', function(){
            var bouteille = new Bouteille('Chateau DevOpenSud');
            bouteille.should.have.property('nom');
            bouteille.nom.should.equal('Chateau DevOpenSud');
        })
    });

});


/**

Propriétés d'une bouteille (à affiner) :

nom (terme exact ? cuvée ?)
millésime
domaine
type
dénomination (par exemple « vin de pays », « vin de table », « AOC »)
quantité ("75cl")
apogée
pourcentage du volume d'alcool
Voir http://fr.wikipedia.org/wiki/%C3%89tiquette_de_vin et http://fr.wikipedia.org/wiki/%C5%92nologie

Il faudra fournir le nombre de bouteilles à mettre en cave, et permettre d'ajouter facilement de nouvelles bouteilles identiques.
Par exemple : mettre un carton de 6 bouteilles en cave

*/