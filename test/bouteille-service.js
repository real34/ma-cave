require('chai').should();

var Cave = require('../app/cave');
var Bouteille = require('../app/bouteille');

describe('Cave à vin', function () {
    var cave;

    beforeEach (function() {
            cave = new Cave();
    });

    describe('création', function() {
        it('est initialement vide', function() {
            cave.estVide().should.be.true;
        });
    });

    describe('ajout de bouteille', function() {
        it('n\'est plus vide après un ajout de bouteille', function() {
            var bouteille = new Bouteille();
            cave.ajouteBouteille(bouteille);
            cave.estVide().should.be.false;
        });

    });

});

describe('Service de Bouteilles', function () {

    // Cave.ajouteBouteille(bouteille);
    // bouteille.metDans(cave);

    describe('mettre une bouteille en cave', function () {
        // it('', function (done) {
        //     var contenu = opencellar('test/fixtures/opencellar.csv');
        //     contenu.on('end', function (nombredeLignes) {
        //         nombredeLignes.should.equal(5);
        //         done();
        //     });
        // });
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