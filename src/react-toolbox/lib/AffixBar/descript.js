import React from "react"
import AffixBar from "./"
import Button from "../Button"

export default {

  construct : AffixBar,

  name : "AffixBar",

  path : "components/AffixBar",

  descript : `Permet de faire une barre de menus ou boutons
  qui reste en haut d'écran quand on scrolle, fait apparaître
  le bouton de retour en haut de page, et un spinner si besoin`,

  states : {
    default : () => (
      <div style={ { height : 1000 } }>
        Scrollez pour voir le comportement des boutons
        <AffixBar style={ { margin : 10 } }>
          <Button bsStyle="primary" icon="arrow-left">Go left</Button>
          &nbsp;
          <Button bsStyle="info" icon="arrow-right">Go Right</Button>
          &nbsp;
          <Button bsStyle="warning" icon="arrow-up">Go Up</Button>
          &nbsp;
          <Button bsStyle="danger" icon="arrow-down">Go Down</Button>
        </AffixBar>
      </div>
    ),
    spinner : () => (
      <div style={ { height : 1000 } }>
        Scrollez pour voir le comportement des boutons
        <AffixBar style={ { margin : 10 } } spinner>
          <Button bsStyle="primary" icon="arrow-left">Go left</Button>
          &nbsp;
          <Button bsStyle="info" icon="arrow-right">Go Right</Button>
          &nbsp;
          <Button bsStyle="warning" icon="arrow-up">Go Up</Button>
          &nbsp;
          <Button bsStyle="danger" icon="arrow-down">Go Down</Button>
        </AffixBar>
      </div>
    )
  }
}
