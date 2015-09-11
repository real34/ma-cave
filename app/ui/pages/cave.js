/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';

import {BarreActions} from '../molecules';
import {FormulaireImport, MessageErreur, ListeBouteilles} from '../organisms';
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
  return MessageErreur(
    "Vous n'avez pas encore ajouté de bouteilles à votre cave.",
    <span>
      <a className='action' href='#/cave/mettre-des-bouteilles'><i className='fa fa-plus'></i> Mettez des bouteilles en cave</a>
      ou <a className='action' href='#/cave/importer-depuis-opencellar'><i className='fa fa-file'></i> Importez une cave depuis OpenCellar</a>
      afin de pouvoir commencer à utiliser le site
    </span>
  );
}

function renderContent(cave) {
  const actions = [
    { href: '#/cave/mettre-des-bouteilles', title: 'Mettre une bouteille en cave' },
    { href: '#/cave/importer-depuis-opencellar', title: 'Importer depuis OpenCellar' }
  ];
  return <div>
    {BarreActions(actions)}
    {ListeBouteilles("Vos bouteilles", cave.bouteilles())}
  </div>;
}

export default main;
