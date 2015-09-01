// import React from 'react';
// import Bacon from 'baconjs';
import Cave from './projections/cave';
import Trololo from './projections/trololo';

// import EventStore from '../../framework-qui-tue/eventstore';

import LigneOpenCellarImportee from './LigneOpenCellarImportee';

// let eventStore = new EventStore('inventaire');
// let eventBus = new Bacon.Bus();
// let replayedEventBus = eventStore.replayAll().concat(eventBus);

// eventBus.plug(eventStore.newEvents());

const ContexteInventaire = {
	name: 'Inventaire',
	domainEvents: [LigneOpenCellarImportee],
	projections: [Cave, Trololo]
	// TODO sideEffects: []
	// commandBus: new Bacon.Bus(),
	// cave: Cave.projectFrom(replayedEventBus)
}

// Bacon.fromArray(domainEvents)
// 	.map((domainEvent) => domainEvent.attachTo(ContexteInventaire.commandBus))
// 	.onValue((eventStream) => eventStream.onValue(eventStore.append.bind(eventStore)));

export default ContexteInventaire;