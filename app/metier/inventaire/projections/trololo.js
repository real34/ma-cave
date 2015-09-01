import {Rx} from '@cycle/core';

const event$ = new Rx.Subject();

const state$ = Rx.Observable.just({name: 'trololo', bouteilles: ['baz', 'bar']});

export default { event$, state$ };