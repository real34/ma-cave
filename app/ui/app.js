/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';

import {Header, Footer, Presentation} from './organisms';
import {Cave, ImportCave} from './pages';

import styles from './app.css';

function main (responses) {
  // TODO Make it generic for all pages
  const cave = Cave(responses);
  const importCave = ImportCave(responses, '/cave');
  const route$ = Rx.Observable.merge(cave.Router, importCave.Router);
  const inventaire$ = Rx.Observable.merge(cave.Inventaire, importCave.Inventaire);

  const view$ = responses.Router.map(children => <div className={ styles.root }>
    { Header() }

    { Presentation() }
    { children }

    { Footer() }
  </div>);

  return {
    DOM: view$,
    Router: route$,
    Inventaire: inventaire$
  };
}

export default main;
