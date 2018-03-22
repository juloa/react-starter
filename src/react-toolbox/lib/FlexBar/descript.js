import React from "react"
import FlexBar from "./"
import Button from "../Button"

export default {

  construct : FlexBar,

  path : "components/FlexBar",

  states : {

    default : () => (
      <FlexBar>
        <Button bsStyle="primary" label="mon 1er bouton"/>
        <Button bsStyle="info" label="mon 2eme bouton"/>
        <Button bsStyle="warning" label="mon 3eme bouton"/>
        <Button bsStyle="danger" label="mon 4eme bouton"/>
        <Button bsStyle="success" label="mon 5eme bouton"/>
      </FlexBar>
    )
  }
}
