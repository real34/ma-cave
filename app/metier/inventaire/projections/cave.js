import {Rx} from '@cycle/core';
import { Bouteille, Couleur } from '../bouteille';

class Cave {
	constructor() {
		this._bouteilles = [];
	}
	estVide() {
		return this._bouteilles.length === 0;
	}
	ajouteBouteille(infos, dateAjout = Date.now()) {
		this._bouteilles.push({infos, dateAjout});
	}
	bouteilles() {
		return this._bouteilles;
	}
}

const event$ = new Rx.Subject();

const importMod$ = event$
	.filter(e => e.type === 'LigneOpenCellarImportee')
	.map(event => function(cave) {
		const ligne = event.payload.ligne;
		let bouteille = new Bouteille(ligne.Nom);

		bouteille.setCouleur(new Couleur(ligne.Couleur));
		cave.ajouteBouteille(bouteille, event.createdAt);
		return cave;
	});

const state$ = Rx.Observable.just(Rx.helpers.identity)
	.merge(importMod$)
	.scan((acc, mod) => mod(acc), new Cave())
	.map(cave => ({name: 'cave', contenu: cave}));

export default { event$, state$ };