import React from 'react';
import Bacon from 'baconjs';
import Cave from './projections/cave';

import EventStore from '../../framework-qui-tue/eventstore';

import LigneOpenCellarImportee from './LigneOpenCellarImportee';

let eventStore = new EventStore('inventaire');
let eventBus = new Bacon.Bus();
let replayedEventBus = eventStore.replayAll().concat(eventBus);

eventBus.plug(eventStore.newEvents());

const ContexteInventaire = {
	commandBus: new Bacon.Bus(),
	cave: Cave.projectFrom(replayedEventBus)
}

let domainEvents = [LigneOpenCellarImportee];
Bacon.fromArray(domainEvents)
	.map((domainEvent) => domainEvent.attachTo(ContexteInventaire.commandBus))
	.onValue((eventStream) => eventStream.onValue(eventStore.append.bind(eventStore)));

ContexteInventaire.commandBus.log('COMMANDE :'); // during development only

export default ContexteInventaire;