/** @jsx hJSX */
import {run, Rx} from '@cycle/core';
import {makeDOMDriver, hJSX} from '@cycle/dom';
import {makeRouterDriver} from 'cycle-director';

import makeEventStore from './framework-qui-tue/eventstore';

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

function makeDomainContextDriver (domainDefinition, eventStore) {
  // TODO Create an internal subscriber to prevent binding multiple times
  console.debug('making domain driver for context', domainDefinition.name);

  return function (command$) {
    console.debug('new subscription');
    for (let event of domainDefinition.domainEvents) {
      command$.subscribe(event.commands);
      event.events.subscribe(eventStore.EventBus);
    }

    eventStore.newEvents.subscribe(e => console.debug('new event ', e));

    command$.subscribe(
      c => console.debug('command: ', c),
      err => console.debug('err:', err),
      () => console.debug('completed')
    );
    return Rx.Observable.interval(500);
  };
}
