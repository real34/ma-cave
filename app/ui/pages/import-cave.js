import xs from 'xstream';
import {FormulaireImport} from '../organisms';

import csv from 'fast-csv';

function main (sources, basePath = '/') {
  const formulaireImport = FormulaireImport(sources, 'import-opencellar');
  const route$ = sources.Router
    .define({ [basePath + '/importer-depuis-opencellar']: view })
    .map(({value}) => value(formulaireImport.DOM));
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
    .map(parser => xs.create({
      start: (listener) => {
        parser.on('data', listener.next.bind(listener));
        parser.on('end', listener.completed.bind(listener));
      }
    }))
    .flatten()
    .map(row => ({ type: 'ImporterLigneOpenCellar', data: row }));

  return { command$ };
}

export default main;
