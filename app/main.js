/** @jsx hJSX */
import {run} from '@cycle/core';
import {makeDOMDriver, hJSX} from '@cycle/dom';
import {makeRouterDriver} from 'cycle-director';
import app from './ui/app.js';

const main = app;

run(main, {
  DOM: makeDOMDriver('#ma-cave-app'),
  Router: makeRouterDriver({
    notfound: () => <h2>Ooops... la page n'a pas été trouvée !</h2>
  })
});
