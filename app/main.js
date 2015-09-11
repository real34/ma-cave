/** @jsx hJSX */
import {run} from '@cycle/core';
import {makeDOMDriver, hJSX} from '@cycle/dom';
import {makeRouterDriver} from 'cycle-director';

import {makeEventStore} from './framework-qui-tue/eventstore';
import {makeDomainContextDriver} from './framework-qui-tue/cycle-domain-context-driver';

import inventaireContext from './metier/inventaire';

import app from './ui/app.js';

const main = app;

run(main, {
  DOM: makeDOMDriver('#ma-cave-app'),
  Inventaire: makeDomainContextDriver(inventaireContext, makeEventStore('inventaire')),
  Router: makeRouterDriver({
    notfound: () => <h2>Ooops... la page na pas été trouvée !</h2>
  })
});
