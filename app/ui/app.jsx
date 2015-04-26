import React from 'react';

import Layout from './layout';
import Presentation from './presentation.jsx';
import Cave from './cave.jsx';

class MaCaveApp extends React.Component {
	render() {
		return (
			<div>
				<Layout.Header />

		    	<Presentation />
		    	<Cave />

		    	<Layout.Footer />
			</div>
		)
	}
}

export default MaCaveApp;