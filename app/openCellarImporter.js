var csv = require('csv');
var Bouteille = require('./bouteille').Bouteille;

var csvFormatOptions = { delimiter: ';', columns: true };

var OpenCellarImporter = function (cave) {
	this.cave = cave;
}

OpenCellarImporter.prototype.importCsv = function(csvFilePathOrString, callback) {
	csv()
		.from(csvFilePathOrString, csvFormatOptions)
		.on('record', this.importRow.bind(this))
		.on('end', callback);
};

OpenCellarImporter.prototype.importCsvString = function(content, callback) {
	csv()
		.from.string(content, csvFormatOptions)
		.on('record', this.importRow.bind(this))
		.on('end', callback);
};

OpenCellarImporter.prototype.importRow = function(row) {
	this.cave.ajouteBouteille(new Bouteille(row.Nom));
}

module.exports = OpenCellarImporter;