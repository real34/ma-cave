import xs from 'xstream'
import {div} from '@cycle/dom'
import {Header, Footer, Presentation} from './organisms';
import {Cave, ImportCave} from './pages';

import styles from './app.css';

function main (sources) {
  // TODO Make it generic for all pages
  // const cave = Cave(sources);
  // const importCave = ImportCave(responses, '/cave');
  // const importCave = {};
  // const route$ = xs.merge(cave.Router || xs.empty(), importCave.Router || xs.empty());
  // const inventaire$ = xs.merge(cave.Inventaire || xs.empty(), importCave.Inventaire || xs.empty());

  const match$ = sources.Router.define({
    '/': Cave
    // '/other': OtherComponent
  });

  const page$ = match$.map(({path, value}) => value(
    Object.assign({}, sources, {
      router: sources.Router.path(path)
    }
  )));

  const view$ = page$
    .map((page) => page.DOM)
    .flatten()
    .map((content) => div(`.${styles.root}`, [
      Header(),
      Presentation(),
      content,
      Footer()
    ]));

  return {
    DOM: view$,
    Router: xs.of('/'),
    Inventaire: page$.map((page) => page.Inventaire || xs.empty()).flatten()
  };
}

export default main;
