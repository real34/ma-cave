import {Rx} from '@cycle/core';
import PouchDB from 'pouchdb';
window.PouchDB = PouchDB;

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
export {makeEventStore};
