import React from "react"
import Button from "./"

export default {

  construct : Button,

  name : "Button",

  path : "react-starter/src/components/Button",

  descript : `Surcouche de react-bootstrap/Button permettant d'ajouter facilement une icône (Glyph),
  un lien, avoir un mode compact (le label passe en infobulle), en mode rond (type material design).`,

  states : {

    default : () => <Button>MyButton</Button>,
    bsStyle : () => <Button bsStyle="primary">MyButton</Button>,
    icon : () => <Button bsStyle="primary" icon="plus">Add element</Button>,
    compact : () => <Button bsStyle="primary" icon="plus" compact>MyButton</Button>,
    rounded : () => (
      <Button
        bsStyle="primary"
        icon="plus"
        compact
        rounded
      > MyButton </Button>
    ),
    intl : () => (
      <Button
        bsStyle="primary"
        icon="plus"
        label={ { id : "addElement", defaultMessage : "Add element" } }
      />
    ),
    link : () => <Button bsStyle="primary" icon="home" link="/">Back to home</Button>

  }
}
