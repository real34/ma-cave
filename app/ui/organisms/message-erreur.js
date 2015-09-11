/** @jsx hJSX */
import {hJSX} from '@cycle/dom';
import {p} from '../atoms';

export default (title, content) => <div className='erreur'>
  {p(title)}
  {p(content)}
</div>;
