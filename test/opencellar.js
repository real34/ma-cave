require('chai').should();

var Cave = require('../app/cave/in_memory');
var OpenCellarImporter = require('../app/openCellarImporter');
var fs = require('fs');

describe('Import Opencellar', function () {
    describe('Import de bouteilles', function () {
        var maCave;
        var importer;

        beforeEach(function() {
            maCave = new Cave();
            importer = new OpenCellarImporter(maCave);
        });

        it('doit créer 5 bouteilles en détectant un fichier', function (done) {
            importer.importCsv('test/fixtures/opencellar.csv', function () {
                maCave.bouteilles().length.should.equal(5);
                done();
            });
        });

        it('doit créer 5 bouteilles en détectant une chaine de caractères', function (done) {
            var contenu = fs.readFileSync('test/fixtures/opencellar.csv', { encoding: 'utf-8'});
            importer.importCsv(contenu, function () {
                maCave.bouteilles().length.should.equal(5);
                done();
            });
        });

        it('doit créer 5 bouteilles depuis une chaine de caractères', function (done) {
            var contenu = fs.readFileSync('test/fixtures/opencellar.csv', { encoding: 'utf-8'});
            importer.importCsvString(contenu, function () {
                maCave.bouteilles().length.should.equal(5);
                done();
            });
        });
    });
});