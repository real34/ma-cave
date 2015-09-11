/** @jsx hJSX */
import {hJSX} from '@cycle/dom';
import {h2, p} from '../atoms';

function main () {
  return <section className='presentation'>
    {h2("Qu'est-ce que c'est ?")}
    {p(`
      Cette application vous permet de gérer, visualiser et organiser
      le contenu de votre cave à vin.
    `)}
  </section>;
}

export default main;
