// import React from 'react';

// import MaCaveApp from './ui/app.jsx';

// React.render(<MaCaveApp />, document.getElementById('ma-cave-app'));

/** @jsx hJSX */
import {run, Rx} from '@cycle/core';
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
