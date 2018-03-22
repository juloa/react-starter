import React from "react"
import BackToTop from "./"

const style = {
  position : "fixed",
  top : 10,
  right : 10,
  cursor : "pointer",
  fontSize : 25
}

export default {

  construct : BackToTop,

  description : "Bouton de retour en haut de page",

  states : {

    default : () => (
      <div style={ { height : 1000 } }>
        Scrollez pour voir apparaître le bouton
        <BackToTop style={ style }>Revenir en haut</BackToTop>
      </div>
    ),

    displayPoint : () => (
      <div style={ { height : 1000 } }>
        Permet d'ajuster l'apparition du bouton
        <BackToTop style={ style } displayPoint={ 10 }>Revenir en haut</BackToTop>
      </div>
    )
  }

}
