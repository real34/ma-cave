import {Rx} from '@cycle/core';
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

const event$ = new Rx.Subject();

const importMod$ = event$
	.filter(e => e.type === 'LigneOpenCellarImportee')
	.pluck('ligne')
	.map(ligne => function(cave) {
		let bouteille = new Bouteille(ligne.Nom);
		bouteille.setCouleur(new Couleur(ligne.Couleur));
		cave.ajouteBouteille(bouteille);
		return cave;
	});

const state$ = Rx.Observable.just(Rx.helpers.identity)
	.merge(importMod$)
	.scan((acc, mod) => mod(acc), new Cave())
	.map(cave => ({name: 'cave', contenu: cave}));

export default { event$, state$ };