import {div, h2, p, ul} from '@cycle/dom';
import {Bouteille} from '../molecules';

export default (title, bouteilles) => div(`.${bouteilles}`, [
  h2(title),
  ul(bouteilles.map(Bouteille))
]);
