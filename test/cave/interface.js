require('chai').should()

import { Bouteille } from '../../app/bouteille'

module.exports = function (CaveImplementation) {
  xdescribe('Cave à vin', function () {
    var cave

    beforeEach(function () {
      cave = new CaveImplementation()
    })

    describe('création', function () {
      it('est initialement vide', function () {
        cave.estVide().should.be.true
      })
    })

    describe('ajout de bouteille', function () {
      it('n\'est plus vide après un ajout de bouteille', function () {
        var bouteille = new Bouteille()
        cave.ajouteBouteille(bouteille)
        cave.estVide().should.be.false
      })
    })

    describe('fournir son contenu', function () {
      it('ne contient aucune bouteille initialement', function () {
        cave.bouteilles().should.be.empty
      })

      it('renvoie les bouteilles ajoutées', function () {
        var bouteille1 = new Bouteille('bouteille 1')
        var bouteille2 = new Bouteille('bouteille 2')
        cave.ajouteBouteille(bouteille1)
        cave.ajouteBouteille(bouteille2)
        cave.bouteilles().should.contain(bouteille1)
        cave.bouteilles().should.contain(bouteille2)
      })
    })
  })
}

// Quand on ajoute une même bouteille, sa quantité est mise à jour
