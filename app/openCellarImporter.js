var csv = require('csv');
var Bouteille = require('./bouteille').Bouteille;

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
	return csv()
		.on('record', this.importRow.bind(this))
		.on('end', callback);
}

OpenCellarImporter.prototype.importRow = function(row) {
	this.cave.ajouteBouteille(new Bouteille(row.Nom));
}

module.exports = OpenCellarImporter;