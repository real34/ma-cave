/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';
import OpenCellarImporter from '../openCellarImporter';

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
  const command$ = importFile$
    .flatMap(content => OpenCellarImporter.fromString(content))
    .map(row => ({ type: 'ImporterLigneOpenCellar', data: row }));

  return { command$ };
}

export default main;
