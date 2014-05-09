var InMemoryCave = require('./in_memory');
var util = require('util');
var Bouteille = require('../bouteille').Bouteille;

var STORAGE_KEY = 'cave';

var Cave = function() {
	InMemoryCave.call(this);
	this._storage = window.localStorage;
	this._bouteilles = unserializeBouteilles(this._storage.getItem(STORAGE_KEY) || '[]');
}

util.inherits(Cave, InMemoryCave)

Cave.prototype.ajouteBouteille = function(bouteille) {
	InMemoryCave.prototype.ajouteBouteille.apply(this, arguments);
	this._storage.setItem(STORAGE_KEY, serializeBouteilles(this._bouteilles));
};

function serializeBouteilles(bouteilles) {
	return JSON.stringify(bouteilles);
}

function unserializeBouteilles(bouteilles) {
	// async.js
	return JSON.parse(bouteilles).map(Bouteille.fromJSON);
}

module.exports = Cave;