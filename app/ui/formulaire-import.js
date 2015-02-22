import riot from 'riot';

import OpenCellarImporter from '../openCellarImporter';

riot.tag('formulaire-import',

	`
	<form>
		<input type="file" onchange="{ importerFichier }"></div>
		Importer un fichier CSV OpenCellar
	</form>
	`,

	function(opts) {
		let cave = this.opts.cave;

		this.importerFichier = (e) => {
			let reader = new FileReader();
			reader.onload = (e) => (new OpenCellarImporter(cave)).importCsvString(e.target.result);
			reader.readAsText(e.target.files[0]);
		};

	}

);