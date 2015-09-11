/** @jsx hJSX */
import {hJSX} from '@cycle/dom';

export default (actions) => <ul className='actions'>
  {actions.map(action => <li><a href={action.href}>{action.title}</a></li>)}
</ul>;
