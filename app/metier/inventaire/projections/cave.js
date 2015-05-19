import Bacon from 'baconjs';
import { Bouteille, Couleur } from '../bouteille';

class Cave {
	constructor() {
		this._bouteilles = [];
	}
	estVide() {
		return this._bouteilles.length === 0;
	}
	ajouteBouteille(bouteille) {
		this._bouteilles.push(bouteille);
	}
	bouteilles() {
		return this._bouteilles;
	}
}

function init(eventBus) {
	const ligneImportee = eventBus.flatMap(
		(e) => e.type === 'LigneOpenCellarImportee' ? e.ligne : Bacon.never()
	);

	return Bacon.update(
		new Cave(),
		[ligneImportee], nouvelleBouteilleOpenCellar
	);
}

function nouvelleBouteilleOpenCellar(cave, ligne) {
	let bouteille = new Bouteille(ligne.Nom);
	bouteille.setCouleur(new Couleur(ligne.Couleur));
	cave.ajouteBouteille(bouteille);
	return cave;
}

export default {
	projectFrom: init
}