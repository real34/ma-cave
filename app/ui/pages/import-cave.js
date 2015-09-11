/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';
import {FormulaireImport} from '../organisms';

import csv from 'fast-csv';

function main (responses, basePath = '/') {
  const formulaireImport = FormulaireImport(responses, 'import-opencellar');
  const route$ = Rx.Observable.just({ url: basePath + '/importer-depuis-opencellar', on: view.bind(null, formulaireImport.DOM) });
  const { command$ } = model(formulaireImport.events);

  return {
    Router: route$,
    Inventaire: command$
  };
}

function view (formulaire) {
  return <section className='import-cave'>
    <h2>Importer des Bouteilles</h2>
    <p>
      Vous pouvez importer des bouteilles depuis un fichier CSV issu d'OpenCellar.
      Utilisez le formulaire ci-dessous.
    </p>
    {formulaire}
  </section>;
}

function model ({importFile$}) {
  const csvFormat = {
    delimiter: ';',
    headers: true
  };

  const command$ = importFile$
    .map(content => csv.fromString(content, csvFormat))
    .flatMap(parser => Rx.Observable.create(observer => {
      parser.on('data', observer.onNext.bind(observer));
      parser.on('end', observer.onCompleted.bind(observer));
    }))
    .map(row => ({ type: 'ImporterLigneOpenCellar', data: row }));

  return { command$ };
}

export default main;
