var csv = require('csv');
var Bouteille = require('./bouteille').Bouteille;
var Couleur = require('./bouteille').Couleur;

var csvFormatOptions = { delimiter: ';', columns: true };

var OpenCellarImporter = function (cave) {
	this.cave = cave;
}

OpenCellarImporter.prototype.importCsv = function(csvFilePathOrString, callback) {
	this.csvParser(callback).from(csvFilePathOrString, csvFormatOptions);
};

OpenCellarImporter.prototype.importCsvString = function(content, callback) {
	this.csvParser(callback).from.string(content, csvFormatOptions);
};

OpenCellarImporter.prototype.csvParser = function(callback) {
	callback = callback || function() {};
	return csv()
		.on('record', this.importRow.bind(this))
		.on('end', callback);
}

OpenCellarImporter.prototype.importRow = function(row) {
	var bouteille = new Bouteille(row.Nom);
	bouteille.setCouleur(new Couleur(row.Couleur));
	this.cave.ajouteBouteille(bouteille);
}

module.exports = OpenCellarImporter;