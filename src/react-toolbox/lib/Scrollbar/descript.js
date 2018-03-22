import React from "react"
import Scrollbar from "./"
import src from "./satellite.jpg"

export default {

  categ : "Presentation",

  construct : Scrollbar,

  externalLink : "https://noraesae.github.io/perfect-scrollbar/",

  states : {

    default : () => (
      <Scrollbar style={ { width : 400, height : 400 } }>
        <img src={ src } alt="satellite"/>
      </Scrollbar>
    )

  }
}
