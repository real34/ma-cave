import React from 'react';
import Bacon from 'baconjs';
import {Cave} from '../../cave/local_storage';

const ContexteInventaire = {
	commandBus: new Bacon.Bus(),
	cave: new Cave()
}

// TODO Create domain events from command
// TODO Create Cave projection / read model
// OpenCellarImporter.prototype.importRow = function(row) {
// 	var bouteille = new Bouteille(row.Nom);
// 	bouteille.setCouleur(new Couleur(row.Couleur));
// 	this.commandBus.ajouteBouteille(bouteille);
// }
// TODO Persist event store to local storage and replay events on load (initial stream)

ContexteInventaire.commandBus.onValue(
	(event) => console.debug('COMMAND : ', event)
);

export default ContexteInventaire;