import descriptions from "./descriptions"
import { getDisplayName } from "react-toolbox/lib/jsx-serializer"

function getName(elmt) {

  return elmt.name || getDisplayName(elmt.construct || elmt.constructor)

}

function getFirstState(states) {

  for (const n in states) return n

  return ""

}

function createItem(descript) {

  const name = getName(descript)

  const firstState = getFirstState(descript.states)

  const link = "/dev/catalog/" + name + "/"

  const item = {
    label : name,
    collapsed : true,
    icon : "•",
    link : link + firstState,
    items : []
  }

  for (const state in descript.states) {

    item.items.push({
      icon : "↳",
      label : state,
      link : link + state
    })

  }

  return item

}

export default descriptions.map(createItem).sort((a, b) => { return (a.label > b.label) ? 1 : -1 })
