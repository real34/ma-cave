/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';

import {FormulaireImport} from '../organisms';
// import FormulaireSaisie from './formulaire-saisie.js';

function main (responses) {
  const state$ = responses.Inventaire
    .pluck('cave', 'contenu')
    .tap(x => console.debug('inventaire subscription', x));

  // TODO Improve containment in views to add a 'close' link in forms
  const route$ = Rx.Observable.just({ url: '/', on: view.bind(null, state$) });
  const formulaireImport = FormulaireImport(responses, '/cave');

  return {
    Router: route$.merge(formulaireImport.Router),
    Inventaire: formulaireImport.Inventaire
  };
}

function view (state$) {
  return state$.map(cave => <section className='cave'>
    { cave.estVide() ? renderErreurCaveVide() : renderContent(cave) }
  </section>);
}

function renderErreurCaveVide () {
  return <div className='erreur'>
    <p>Vous n'avez pas encore ajouté de bouteilles à votre cave.</p>
    <p>
     <a className='action' href='#/cave/mettre-des-bouteilles'><i className='fa fa-plus'></i> Mettez des bouteilles en cave</a>
     ou <a className='action' href='#/cave/importer-depuis-opencellar'><i className='fa fa-file'></i> Importez une cave depuis OpenCellar</a>
     afin de pouvoir commencer à utiliser le site
    </p>
  </div>;
}

function renderContent(cave) {
  return <div className='bouteilles'>
    <h2>Vos bouteilles</h2>
    <p>
      <button href='#/cave/mettre-des-bouteilles'>Mettre une bouteille en cave</button>
      <button href='#/cave/importer-depuis-opencellar'>Importer depuis OpenCellar</button>
    </p>

    <ul>
      { cave.bouteilles().map(renderBouteille) }
    </ul>
  </div>;
}

function renderBouteille (bouteille) {
	return <li>{ bouteille.nom } ({ bouteille.couleur.nom })</li>;
}

export default main;
