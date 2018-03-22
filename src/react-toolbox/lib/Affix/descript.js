import React from "react"
import Affix from "./"
import classNames from "./style.module.css"

export default {

  construct : Affix,

  description : "Bouton collant",

  states : {

    default : () => (
      <div style={ { height : 1000 } }>
        <Affix>Scrollez, je reste toujours en haut de page</Affix>
      </div>
    ),

    className : () => (
      <div style={ { height : 1000 } }>
        <Affix affixClassName={ classNames.affix }>Scrollez, je reste toujours en haut de page</Affix>
      </div>
    ),

    style : () => (
      <div style={ { height : 1000 } }>
        <Affix affixStyle={ { fontWeight : "bold" } }>Scrollez, je reste toujours en haut de page</Affix>
      </div>
    )

  }

}
