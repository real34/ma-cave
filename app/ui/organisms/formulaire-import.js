/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';

import csv from 'fast-csv';

function main (responses, basePath = '/') {
  const route$ = Rx.Observable.just({ url: basePath + '/importer-depuis-opencellar', on: view });

  const { command$ } = model(intent(responses));

  return {
    Router: route$,
    Inventaire: command$
  };
}

function view () {
  return <section className='import-opencellar'>
    <form>
      <input type='file' />
      Importer un fichier CSV OpenCellar
    </form>
  </section>;
}

function intent (responses) {
  const importFile$ = responses.DOM.select('.import-opencellar input').events('change')
    .map(e => e.target.files[0])
    .flatMap(file => Rx.Observable.create(function (observer) {
      let reader = new window.FileReader();
      reader.onload = e => observer.onNext(e.target.result);
      reader.readAsText(file);
    }));

  return { importFile$ };
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
