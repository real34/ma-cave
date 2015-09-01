// import Bacon from 'baconjs';
import PouchDB from 'pouchdb';
window.PouchDB = PouchDB;

// class EventStore {
//   constructor (storeName) {
//     this.db = new PouchDB(storeName);
//   }
//   append (event) {
//     // TODO Error handling
//     this.db.post({
//       type: event.type || 'unknown',
//       payload: event
//     });
//   }
//   newEvents () {
//     var changes = this.db.changes({
//       since: 'now',
//       live: true,
//       include_docs: true
//     });
//     return Bacon
//       .fromEvent(changes, 'create')
//       .map('.doc.payload');
//   }
//   replayAll () {
//     return Bacon
//       .fromPromise(this.db.allDocs({ include_docs: true }))
//       .map('.rows')
//       .flatMap((rows) => Bacon.fromArray(rows))
//       .map('.doc.payload');
//   }
// }

import {Rx} from '@cycle/core';

function makeEventStore(storeName) {
  const db = new PouchDB(storeName);
  const EventBus = new Rx.Subject();

  const changes = db.changes({
    since: 'now',
    live: true,
    include_docs: true
  });

  const newEvents = Rx.Observable
    .fromEvent(changes, 'create')
    .pluck('doc', 'payload');

  const replayedEvents = Rx.Observable
    .fromPromise(db.allDocs({ include_docs: true }))
    .pluck('rows')
    .flatMap(rows => Rx.Observable.from(rows))
    .pluck('doc', 'payload');

  EventBus
    .tap(e => console.debug(`event store ${storeName} received: `, e))
    .subscribe(event => {
      // TODO Error handling
      db.post({
        type: event.type || 'unknown',
        payload: event
      });
    });

  return {EventBus, newEvents, replayedEvents};
}


export default makeEventStore;
