/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';

import Layout from './layout';
import Presentation from './presentation.js';
import Cave from './cave.js';

function main (responses) {
  let cave = Cave(responses);

  let route$ = Rx.Observable.merge(cave.Router);
  let view$ = responses.Router.map(children => <div>
    { Layout.Header() }

    { Presentation() }
    { children }

    { Layout.Footer() }
  </div>);

  return {
    DOM: view$,
    Router: route$,
    Inventaire: cave.Inventaire
  };
}

export default main;
