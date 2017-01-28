import xs from 'xstream'
import debounce from 'xstream/extra/debounce'
import {section, h2, p} from '@cycle/dom'
import {FormulaireImport} from '../organisms'

import csv from 'fast-csv'

function main (sources) {
  const formulaireImport = FormulaireImport(sources, 'import-opencellar')
  const { command$ } = model(formulaireImport.events)

  return {
    DOM: formulaireImport.DOM.map((form) => view(form)),
    Router: command$.compose(debounce(100)).mapTo('/'),
    Inventaire: command$
  }
}

function view (formulaire) {
  return section('.import-cave', [
    h2('Importer des Bouteilles'),
    p(`
      Vous pouvez importer des bouteilles depuis un fichier CSV issu d'OpenCellar.
      Utilisez le formulaire ci-dessous.
    `),
    formulaire
  ])
}

function model ({importFile$}) {
  const csvFormat = {
    delimiter: ';',
    headers: true
  }

  const command$ = importFile$
    .map(content => csv.fromString(content, csvFormat))
    .map(parser => xs.create({
      start: (listener) => {
        parser.on('data', listener.next.bind(listener))
        parser.on('end', listener.completed.bind(listener))
      },
      stop: () => {}
    }))
    .flatten()
    .map(row => ({ type: 'ImporterLigneOpenCellar', data: row }))

  return { command$ }
}

export default main
