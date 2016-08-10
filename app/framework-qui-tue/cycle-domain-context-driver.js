import {Rx} from '@cycle/core';

function makeDomainContextDriver (domainDefinition, eventStore) {
  // TODO Create an internal subscriber to prevent binding multiple times
  console.debug('making domain driver for context', domainDefinition.name);
  const replayedAndLiveEvent$ = eventStore.replayedEvents.concat(eventStore.newEvents);

  return function (command$) {
    console.debug('new subscription');
    for (let event of domainDefinition.domainEvents) {
      command$.subscribe(event.commands);
      event.events.subscribe(eventStore.EventBus);
    }

    for (let projection of domainDefinition.projections) {
      replayedAndLiveEvent$.subscribe(projection.event$);
    }

    command$.subscribe(
      c => console.debug('command: ', c),
      err => console.debug('err:', err),
      () => console.debug('completed')
    );

    // TODO Add a "get()" method to directly access a path
    return Rx.Observable.from(domainDefinition.projections)
      .pluck('state$')
      .toArray()
      .flatMap(states => Rx.Observable.combineLatest(states, (...states) => {
        return states.reduce((stateObject, state) => {
          stateObject[state.name] = state;
          return stateObject;
        }, {});
      }));
  };
}

export default makeDomainContextDriver;
export {makeDomainContextDriver};