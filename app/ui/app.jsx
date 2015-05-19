import React from 'react';
import Bacon from 'baconjs';

import ContexteInventaire from '../metier/inventaire';

import Layout from './layout';
import Presentation from './presentation.jsx';
import Cave from './cave.jsx';

class MaCaveApp extends React.Component {
	constructor(props) {
		super(props);
		this.stateValues = Bacon.combineTemplate({
			cave: ContexteInventaire.cave
		});
	}
	componentWillMount() {
		this.stateValues.onValue(this.setState.bind(this));
	}
	render() {
		return (
			<div>
				<Layout.Header />

				<Presentation />
				<Cave cave={this.state.cave}/>

				<Layout.Footer />
			</div>
		)
	}
}

export default MaCaveApp;