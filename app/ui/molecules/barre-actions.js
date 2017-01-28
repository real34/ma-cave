import {ul, li, a} from '@cycle/dom'

export default (actions) => ul(`.actions`, actions.map(
  (action) => li([
    a({attrs: {href: action.href}}, action.title)
  ])
))
