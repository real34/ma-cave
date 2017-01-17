import xs from 'xstream';
import {section, span, a, i, div} from '@cycle/dom';
import {BarreActions} from '../molecules';
import {MessageErreur, ListeBouteilles} from '../organisms';

function main (sources) {
  const state$ = sources.Inventaire
    .map((data) => data.cave.contenu);

  return {
    DOM: view(state$)
  }
}

function view (state$) {
  return state$
    .map((cave) => section(
      '.cave',
      [cave.estVide() ? renderErreurCaveVide() : renderContent(cave)]
    ));
}

function renderErreurCaveVide () {
  return MessageErreur(
    "Vous n'avez pas encore ajouté de bouteilles à votre cave.",
    [
      a('.action', {attrs: {href: '#/cave/mettre-des-bouteilles'}}, [
        i('.fa.fa-plus'),
        ' Mettez des bouteilles en cave'
      ]),
      ' ou ',
      a('.action', {attrs: {href: '#/cave/importer-depuis-opencellar'}}, [
        i('.fa.fa-file'),
        ' Importez une cave depuis OpenCellar'
      ]),
      ' afin de pouvoir commencer à utiliser le site'
    ]
  );
}

function renderContent(cave) {
  const actions = [
    { href: '#/cave/mettre-des-bouteilles', title: 'Mettre une bouteille en cave' },
    { href: '#/cave/importer-depuis-opencellar', title: 'Importer depuis OpenCellar' }
  ];
  return div([
    BarreActions(actions),
    ListeBouteilles("Vos bouteilles", cave.bouteilles())
  ]);
}

export default main;
