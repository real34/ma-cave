import xs from 'xstream'
import {form, input} from '@cycle/dom'

function main (sources, name) {
  const { importFile$ } = intent(sources, name)

  return {
    DOM: xs.of(view(name)),
    events: {importFile$}
  }
}

function view (name) {
  return form(`.${name}`, [
    input({attrs: {type: 'file'}}),
    'Importer un fichier CSV OpenCellar'
  ])
}

function intent (responses, name) {
  const importFile$ = responses.DOM.select(`.${name} input`).events('change')
    .map((e) => e.target.files[0])
    .map((file) => xs.create({
      start: (observer) => {
        let reader = new window.FileReader()
        reader.onload = e => observer.next(e.target.result)
        reader.readAsText(file, 'ISO-8859-1')
      },
      stop: () => {}
    }))
    .flatten()

  return { importFile$ }
}

export default main
