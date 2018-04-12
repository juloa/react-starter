import React from "react"
import BBox from "../"

import Edit from "./Edit"
import EditSource from "./Edit.js?txt"

import Draw from "./Draw"
import DrawSource from "./Draw.js?txt"

import Static from "./Static"
import StaticSource from "./Static.js?txt"

export default {

  construct : BBox,

  name : "OpenLayersBBox",

  path : "react-starter/src/components/OpenLayers/BBox",

  states : {
    static : {
      render : () => <Static/>,
      fullCode : StaticSource
    },
    edit : {
      render : () => <Edit/>,
      fullCode : EditSource
    },
    draw : {
      render : () => <Draw/>,
      fullCode : DrawSource
    }
  }
}
