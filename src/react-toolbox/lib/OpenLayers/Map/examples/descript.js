import React from "react"

import Simple from "./Simple"
import SimpleSource from "./Simple.js?txt"

import BackgroundLayer from "./BackgroundLayer"
import BackgroundLayerSource from "./BackgroundLayer.js?txt"

import ViewControl from "./ViewControl"
import ViewControlSource from "./ViewControl.js?txt"

// import Synopsis from "./Synopsis"
// import SynopsisSource from "./Synopsis.js?txt"

import Layers from "./Layers"
import LayersSource from "./Layers.js?txt"

export default {

  construct : Simple,

  name : "OpenLayersMap",

  path : "react-starter/src/components/OpenLayers/Map",

  states : {
    default : {
      render : () => <Simple/>,
      fullCode : SimpleSource
    },
    BackgroundLayer : {
      render : () => <BackgroundLayer/>,
      fullCode : BackgroundLayerSource
    },
    /*  synopsis : {
      render : () => <Synopsis/>,
      fullCode : SynopsisSource
    },*/
    viewControl : {
      render : () => <ViewControl/>,
      fullCode : ViewControlSource
    },
    layers : {
      render : () => <Layers/>,
      fullCode : LayersSource
    }
  }
}
