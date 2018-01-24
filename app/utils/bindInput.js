import {
  isFunction,
  merge,
} from "lodash"
import dotty from "dotty"

export default function bindInput (component, key, cb) {

  return function onChange (event, index, value) {
    event.persist()
    const update = {}
    value = value || event.target.value
    if ("number" == event.target.getAttribute("type"))
      value = value
        ? parseFloat(value)
        : ""
    dotty.put(update, key, value)
    component.setState(merge({}, component.state, update))
    if (isFunction(cb))
      setTimeout(_ => cb.call(component, event, value, key), 1)
  }
}
