function asEvent (ligne) {
  return {
    type: 'LigneOpenCellarImportee',
    ligne: ligne
  }
}

export default (command$) => command$
  .filter(command => command.type === 'ImporterLigneOpenCellar')
  .map((command) => asEvent(command.data))
