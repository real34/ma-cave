/** @jsx hJSX */
import {hJSX} from '@cycle/dom';
import {h2, p} from '../atoms';
import {Bouteille} from '../molecules';

export default (title, bouteilles) => <div className="bouteilles">
  {h2(title)}
  <ul>
    { bouteilles.map(Bouteille) }
  </ul>
</div>;
