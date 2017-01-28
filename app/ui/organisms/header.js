import {header, h1, a} from '@cycle/dom';

function main() {
  return header([
    h1([
      a({attrs: {href: "/#"}}, 'Ma cave à vin sq!')
    ])
  ]);
}

export default main;
