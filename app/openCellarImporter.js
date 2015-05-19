var Bacon = require('baconjs');
var csv = require('csv');
var csvFormatOptions = { delimiter: ';', columns: true };

var OpenCellarImporter = function (commandBus) {
	this.commandBus = commandBus;
}

OpenCellarImporter.prototype.importCsv = function(csvFilePathOrString, callback) {
	this.csvParser(callback).from(csvFilePathOrString, csvFormatOptions);
};

OpenCellarImporter.prototype.importCsvString = function(content, callback) {
	this.csvParser(callback).from.string(content, csvFormatOptions);
};

OpenCellarImporter.prototype.csvParser = function(callback) {
	let parser = csv();
	callback = callback || function() {};

	this.commandBus.plug(
		Bacon.fromEvent(parser, 'record', (row) => {
			return {
				type: 'ImporterLigneOpenCellar',
				data: row
			}
		})
	);

	return parser.on('end', callback);
}

module.exports = OpenCellarImporter;