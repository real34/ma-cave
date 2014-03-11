require('chai').should();

var csv = require('csv');
var opencellar = function (fichier) {
    return csv().from(fichier, { delimiter: ';', columns: true });
};

describe('Parser Opencellar', function () {
    describe('la lecture du fichier', function () {
        it('doit contenir 5 élements', function (done) {
            var contenu = opencellar('test/fixtures/opencellar.csv');
            contenu.on('end', function (nombredeLignes) {
                nombredeLignes.should.equal(5);
                done();
            });
        });
    });
});