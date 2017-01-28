import {footer, div, h4, p, i, a} from '@cycle/dom'
import styles from './footer.css'

function main () {
  return footer(`.${styles.root}`, [
    div(`.${styles.aPropos}`, [
      h4('Qui sommes-nous ?'),
      p([
        i('.fa.fa-twitter'),
        'Le projet principalement maintenu par ',
        a(
          {attrs: {href: 'http://twitter.com/pierremartin'}},
          'Pierre Martin'
        )
      ]),
      p([
        i('.fa.fa-github'),
        'Le code source est disponible sur ',
        a(
          {attrs: {href: 'http://github.com/real34/ma-cave'}},
          'Github'
        )
      ])
    ])
  ])
}

export default main
