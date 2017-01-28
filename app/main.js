import xs from 'xstream';
import {run} from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import {makeRouterDriver} from 'cyclic-router';
import {createHistory, createHashHistory} from 'history';
import switchPath from 'switch-path';

import {makeEventStore} from './framework-qui-tue/eventstore';
import {makeDomainContextDriver} from './framework-qui-tue/cycle-domain-context-driver';

import inventaireContext from './metier/inventaire';

import app from './ui/app.js';

const main = app;

run(main, {
  DOM: makeDOMDriver('#ma-cave-app'),
  Inventaire: makeDomainContextDriver(inventaireContext, makeEventStore('inventaire')),
  Router: makeRouterDriver(createHashHistory(), switchPath, { capture: true })
});
