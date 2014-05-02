var Cave = function() {
	this.bouteilles = [];
}
Cave.prototype.estVide = function() {
	return this.bouteilles.length === 0;
};
Cave.prototype.ajouteBouteille = function(bouteille) {
	this.bouteilles.push(bouteille);
};

module.exports = Cave;