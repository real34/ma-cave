import riot from 'riot';

export class Cave {
	constructor() {
		riot.observable(this);
		this._bouteilles = [];
	}
	estVide() {
		return this._bouteilles.length === 0;
	}
	ajouteBouteille(bouteille) {
		this._bouteilles.push(bouteille);
		this.trigger('update');
	}
	bouteilles() {
		return this._bouteilles;
	}
}
