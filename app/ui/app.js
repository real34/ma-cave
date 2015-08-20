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

function intent(DOM) {
  return {};
}

function model(actions) {
  return {};
}

function view(state$) {
  return Rx.Observable.just(
    <div>
    { Layout.Header.view() }
    { Presentation.view() }

    { Layout.Footer.view() }
    </div>
  );
  // <Cave cave={this.state.cave}/>
}

export default {intent, model, view};
