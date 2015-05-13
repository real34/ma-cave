import React from 'react';

import Layout from './layout';
import Presentation from './presentation.jsx';
import Cave from './cave.jsx';

import ContexteInventaire from '../metier/inventaire';

class MaCaveApp extends React.Component {
	render() {
		return (
			<div>
				<Layout.Header />

				<Presentation />
				<Cave cave={ContexteInventaire.cave}/>

				<Layout.Footer />
			</div>
		)
	}
}

export default MaCaveApp;