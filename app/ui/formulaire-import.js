// import React from 'react';

// import OpenCellarImporter from '../openCellarImporter';
// import ContexteInventaire from '../metier/inventaire';

// class FormulaireImport extends React.Component {
// 	importerFichier(e) {
// 		let reader = new FileReader();
// 		reader.onload = (e) => (new OpenCellarImporter(ContexteInventaire.commandBus)).importCsvString(e.target.result);
// 		reader.readAsText(e.target.files[0]);
// 	}

// 	render() {
// 		return (
// 			<form>
// 				<input type="file" onChange={ this.importerFichier.bind(this) } />
// 				Importer un fichier CSV OpenCellar
// 			</form>
// 		);
// 	}
// }

// export default FormulaireImport;

/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';

function main(responses, basePath = '/') {
  const route$ = Rx.Observable.just({ url: basePath + "/importer-depuis-opencellar", on: view });

  return {
    Router: route$
  }
}

function view() {
  return <section className="import-opencellar">
    <form>
      <input type="file" />
      Importer un fichier CSV OpenCellar
    </form>
  </section>
  //  onChange={ this.importerFichier.bind(this) }
}

export default main;
