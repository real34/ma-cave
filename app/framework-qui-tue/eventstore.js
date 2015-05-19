import Bacon from 'baconjs';
import PouchDB from 'pouchdb';
window.PouchDB = PouchDB;

class EventStore {
	constructor(storeName) {
		this.db = new PouchDB(storeName);
	}
	append(event) {
		// TODO Error handling
		this.db.post({
			type: event.type || 'unknown',
			payload: event
		});
	}
	newEvents() {
		var changes = this.db.changes({
			since: 'now',
			live: true,
			include_docs: true
		});
		return Bacon
			.fromEvent(changes, 'create')
			.map('.doc.payload');
	}
	replayAll() {
		return Bacon
			.fromPromise(this.db.allDocs({ include_docs: true }))
			.map('.rows')
			.flatMap((rows) => Bacon.fromArray(rows))
			.map('.doc.payload');
	}
}

export default EventStore;