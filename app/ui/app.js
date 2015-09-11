/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';

import {Header, Footer, Presentation} from './organisms';
import {Cave} from './pages';

function main (responses) {
  let cave = Cave(responses);

  let route$ = Rx.Observable.merge(cave.Router);
  let view$ = responses.Router.map(children => <div>
    { Header() }

    { Presentation() }
    { children }

    { Footer() }
  </div>);

  return {
    DOM: view$,
    Router: route$,
    Inventaire: cave.Inventaire
  };
}

export default main;
