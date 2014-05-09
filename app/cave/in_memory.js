var Cave = function() {
	this._bouteilles = [];
}

Cave.prototype.estVide = function() {
	return this._bouteilles.length === 0;
};
Cave.prototype.ajouteBouteille = function(bouteille) {
	this._bouteilles.push(bouteille);
};
Cave.prototype.bouteilles = function() {
	return this._bouteilles;
};

module.exports = Cave;