/** @jsx hJSX */
import {run} from '@cycle/core';
import {makeDOMDriver, hJSX} from '@cycle/dom';
import app from './ui/app.js';

function main(responses) {
  return {
    DOM: app.view(app.model(app.intent(responses.DOM)))
  };
}

run(main, {
  DOM: makeDOMDriver('#ma-cave-app')
});
