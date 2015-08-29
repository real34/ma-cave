// import React from 'react';
// import Bacon from 'baconjs';

// import ContexteInventaire from '../metier/inventaire';

// import Layout from './layout';
// import Presentation from './presentation.jsx';
// import Cave from './cave.jsx';

// class MaCaveApp extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.stateValues = Bacon.combineTemplate({
// 			cave: ContexteInventaire.cave
// 		});
// 	}
// 	componentWillMount() {
// 		this.stateValues.onValue(this.setState.bind(this));
// 	}
// 	render() {
// 		return (
// 			<div>
// 				<Layout.Header />

// 				<Presentation />
// 				<Cave cave={this.state.cave}/>

// 				<Layout.Footer />
// 			</div>
// 		)
// 	}
// }

/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';

import Layout from './layout';
import Presentation from './presentation.js';
import Cave from './cave.js';

function main (responses) {
  let cave = Cave(responses);

  let route$ = Rx.Observable.merge(cave.Router);
  let view$ = responses.Router.map(children => <div>
    { Layout.Header() }

    { Presentation() }
    { children }

    { Layout.Footer() }
  </div>);

  return {
    DOM: view$,
    Router: route$
  };
}

export default main;
