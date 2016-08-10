/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';

function main (responses, name) {
  const { importFile$ } = intent(responses, name);

  return {
    DOM: view(name),
    events: {importFile$ }
  };
}

function view (name) {
  return <form className={name}>
    <input type='file' />
    Importer un fichier CSV OpenCellar
  </form>;
}

function intent (responses, name) {
  const importFile$ = responses.DOM.select(`.${name} input`).events('change')
    .map(e => e.target.files[0])
    .flatMap(file => Rx.Observable.create(function (observer) {
      let reader = new window.FileReader();
      reader.onload = e => observer.onNext(e.target.result);
      reader.readAsText(file, 'ISO-8859-1');
    }));

  return { importFile$ };
}

export default main;
