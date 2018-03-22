import React from "react"
import Panel from "./"
import Alert from "react-bootstrap/lib/Alert"


export default () => (
  <Panel
    defaultExpanded={ false }
    title="titre de mon panneau"
    footer="mon pied !"
  >
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <Alert bsStyle="info" >avec un peitit "hack" pour ne pas afficher le soulignement du titre</Alert>
    <Alert bsStyle="danger" >ça parche pas bien avec un titre = Element</Alert>

  </Panel>
)
