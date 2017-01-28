import {div, p} from '@cycle/dom';

export default (title, content) => div('.erreur', [
  p(title),
  p(content)
]);
