import xs from 'xstream'
import fromEvent from 'xstream/extra/fromEvent'
import PouchDB from 'pouchdb'
window.PouchDB = PouchDB

function makeEventStore (storeName) {
  const db = new PouchDB(storeName)

  const changes = db.changes({
    since: 'now',
    live: true,
    include_docs: true
  })

  const newEvents = fromEvent(changes, 'create')
    .map((v) => v.doc.payload)

  const replayedEvents = xs
    .fromPromise(db.allDocs({ include_docs: true }))
    .map((docs) => xs.fromArray(docs.rows))
    .flatten()
    .map((row) => row.doc)

  const EventBus = {
    next: (event) => {
      console.debug(`event store ${storeName} received: `, event)
      // TODO Error handling
      db.post({
        type: event.type || 'unknown',
        createdAt: Date.now(),
        payload: event
      })
    },
    error: (err) => {
      console.error('The Event Stream gave me an error: ', err)
    },
    complete: () => {
      console.log('The Event Stream told me it is done.')
    }
  }

  return {EventBus, newEvents, replayedEvents}
}

export default makeEventStore
export {makeEventStore}
