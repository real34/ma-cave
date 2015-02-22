var Bouteille  = function Bouteille(nom) {
	this.nom = nom;
	this.cepages = [];
	this.medailles = [];
};

Bouteille.prototype.setMillesime = function(millesime) {
	this.millesime = millesime;
};
Bouteille.prototype.setCouleur = function(couleur) {
	this.couleur = couleur;
};
Bouteille.prototype.setContenance = function(contenance) {
	this.contenance = contenance;
};
Bouteille.prototype.setProducteur = function(producteur) {
	this.producteur = producteur;
};
Bouteille.prototype.setDenomination = function(denomination) {
	this.denomination = denomination;
};
Bouteille.prototype.setRegion = function(region) {
	this.region = region;
};
Bouteille.prototype.setTauxAlcool = function(taux_alcool) {
	this.taux_alcool = taux_alcool;
};
Bouteille.prototype.ajouteCepage = function(cepage) {
	this.cepages.push(cepage);
};
Bouteille.prototype.ajouteMedaille = function(medaille) {
	this.medailles.push(medaille);
};
Bouteille.fromJSON = function(data) {
	let bouteille = new Bouteille(data.nom);
	// TODO Set correct data
	bouteille.setMillesime(Millesime.fromJSON(data.millesime));
	bouteille.setCouleur(Couleur.fromJSON(data.couleur));
	return bouteille;
};

var Millesime = function Millesime(annee){
	this.annee = annee;
};
Millesime.fromJSON = function(data) {
	data = data || { annee: ''};
	return new Millesime(data.annee);
};

var Couleur = function Couleur(nom) {
	this.nom = nom;
};
Couleur.fromJSON = function(data) {
	data = data || { nom: ''};
	return new Couleur(data.nom);
};

var Contenance = function Contenance(quantité, unité) {
	this.quantité = quantité;
	this.unité = unité;
}

var Producteur = function Producteur(nom) {
	this.nom = nom;
	// TODO Ajouter les informations détaillées
	// domaine : Château Saincrit
	//    nom
	//    propriétaire
	//     adresse
}

var Denomination = function Denomination(nom) {
	this.nom = nom;
}

var Region = function Region(nom) {
	this.nom = nom;
}

var Cepage = function Cepage(nom) {
	this.nom = nom;
}

var Taux = function Taux(pourcentage) {
	this.pourcentage = pourcentage;
}

var Medaille = function Medaille(classement, nom, annee) {
	this.classement	 = classement;
	this.nom = nom;
	this.annee = annee;
}

module.exports = {
	Bouteille: Bouteille,
	Millesime: Millesime,
	Couleur: Couleur,
	Contenance: Contenance,
	Producteur: Producteur,
	Denomination: Denomination,
	Region: Region,
	Cepage: Cepage,
	Taux: Taux,
	Medaille: Medaille
}