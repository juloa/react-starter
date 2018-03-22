import React from "react"

import Simple from "./Simple"
import SimpleSource from "./Simple.js?txt"

import WithDelete from "./WithDelete"
import WithDeleteSource from "./WithDelete.js?txt"

import WithAdd from "./WithAdd"
import WithAddSource from "./WithAdd.js?txt"

import FixedHeight from "./FixedHeight"
import FixedHeightSource from "./FixedHeight.js?txt"

import WithSearch from "./WithSearch"
import WithSearchSource from "./WithSearch.js?txt"

export default {

  construct : Simple,

  name : "Table",

  path : "components/Table",

  states : {
    default : {
      render : () => <Simple triggerPoint={ 800 }/>,
      fullCode : SimpleSource
    },
    fixedHeight : {
      render : () => <FixedHeight/>,
      fullCode : FixedHeightSource
    },
    withDelete : {
      render : () => <WithDelete/>,
      fullCode : WithDeleteSource
    },
    withAdd : {
      render : () => <WithAdd/>,
      fullCode : WithAddSource
    },
    withSearch : {
      render : () => <WithSearch/>,
      fullCode : WithSearchSource
    }
  }
}
