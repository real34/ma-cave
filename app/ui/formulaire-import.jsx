import React from 'react';

import OpenCellarImporter from '../openCellarImporter';

class FormulaireImport extends React.Component {
	importerFichier(e) {
		let reader = new FileReader();
		reader.onload = (e) => (new OpenCellarImporter(this.props.cave)).importCsvString(e.target.result);
		reader.readAsText(e.target.files[0]);
	}

	render() {
		return (
			<form>
				<input type="file" onChange={ this.importerFichier.bind(this) } />
				Importer un fichier CSV OpenCellar
			</form>
		);
	}
}

export default FormulaireImport;
