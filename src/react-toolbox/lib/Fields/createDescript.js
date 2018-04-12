import React from "react"

import createSimpleEx from "./examples/simple"
import createGroupEx from "./examples/groupfield"
import createReduxEx from "./examples/withredux"

import fullCodeSimple from "./examples/simple.js?txt"
import fullCodeGroup from "./examples/groupfield.js?txt"
import fullCodeRedux from "./examples/withredux.js?txt"

export default function createDescript(Component) {

  const Simple = createSimpleEx(Component)
  const GroupField = createGroupEx(Component)
  const ReduxForm = createReduxEx(Component)

  return {

    construct : Component,

    name : Component.displayName,

    path : "react-starter/src/components/Fields/" + Component.displayName.replace(/Select/, ""),

    states : {

      simple : {
        render : () => <Simple/>,
        fullCode : fullCodeSimple
      },

      groupField : {
        render : () => <GroupField/>,
        fullCode : fullCodeGroup
      },

      withRedux : {
        render : () => <ReduxForm/>,
        fullCode : fullCodeRedux
      }

    }
  }
}
