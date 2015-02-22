import { Cave as InMemoryCave } from './in_memory';
import { Bouteille } from '../bouteille';

const STORAGE_KEY = 'cave';

export class Cave extends InMemoryCave {
	constructor() {
		super();
		this._storage = window.localStorage;
		this._bouteilles = unserializeBouteilles(this._storage.getItem(STORAGE_KEY) || '[]');
	}
	ajouteBouteille(bouteille) {
		super.ajouteBouteille(bouteille);
		this._storage.setItem(STORAGE_KEY, serializeBouteilles(this._bouteilles));
	};
}

function serializeBouteilles(bouteilles) {
	return JSON.stringify(bouteilles);
}

function unserializeBouteilles(bouteilles) {
	return JSON.parse(bouteilles).map(Bouteille.fromJSON);
}