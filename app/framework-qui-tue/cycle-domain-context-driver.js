import xs from 'xstream';
import concat from 'xstream/extra/concat'

function makeDomainContextDriver (domainDefinition, eventStore) {
  // TODO Create an internal subscriber to prevent binding multiple times
  console.debug('making domain driver for context', domainDefinition.name);
  const replayedAndLiveEvent$ = concat(eventStore.replayedEvents, eventStore.newEvents);

  return function (command$) {
    for (let eventFactory of domainDefinition.domainEvents) {
      eventFactory(command$).addListener(eventStore.EventBus);
    }

    const states = domainDefinition.projections.map(
      (projectionFactory) => projectionFactory(replayedAndLiveEvent$)
    )

    command$.addListener({
      next: c => console.debug('command: ', c),
      error: err => console.debug('err:', err),
      complete: () => console.debug('completed')
    });

    return xs
      .combine(...states)
      .map((states) => states.reduce((stateObject, state) => {
        stateObject[state.name] = state;
        return stateObject;
      }, {}))
  };
}

export default makeDomainContextDriver;
export {makeDomainContextDriver};
