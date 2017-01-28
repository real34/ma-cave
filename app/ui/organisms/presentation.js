import {section, h2, p} from '@cycle/dom';

function main () {
  return section('.presentation', [
    h2("Qu'est-ce que c'est ?"),
    p(`
      Cette application vous permet de gérer, visualiser et organiser
      le contenu de votre cave à vin.
    `)
  ]);
}

export default main;
