import xs from 'xstream'
import {div} from '@cycle/dom'
import {Header, Footer, Presentation} from './organisms'
import {Cave, ImportCave} from './pages'

import styles from './app.css'

function main (sources) {
  const match$ = sources.Router.define({
    '/': Cave,
    '/cave/importer-depuis-opencellar': ImportCave
  })

  const page$ = match$.map(({path, value}) => {
    return value(Object.assign({}, sources, {
      Router: sources.Router.path(path)
    }))
  })

  const view$ = page$
    .map((page) => page.DOM)
    .flatten()
    .map((content) => div(`.${styles.root}`, [
      Header(),
      Presentation(),
      content,
      Footer()
    ]))

  return {
    DOM: view$,
    Router: page$.map((c) => c.Router || xs.never()).flatten(),
    Inventaire: page$.map((page) => page.Inventaire || xs.never()).flatten()
  }
}

export default main
