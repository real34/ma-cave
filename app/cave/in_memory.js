export class Cave {
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
