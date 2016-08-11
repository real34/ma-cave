import {li, em} from '@cycle/dom';

export default ({infos, dateAjout}) => li([
  `${infos.nom} - ${infos.couleur.nom}`,
  em(` (${(new Date(dateAjout)).toLocaleString()})`)
]);
