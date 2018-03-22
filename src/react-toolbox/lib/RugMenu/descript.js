import React from "react"
import RugMenu from "./"
import { NavItem } from "react-bootstrap"

export default {

  categ : "Presentation",

  construct : RugMenu,

  states : {

    default : () => (
      <RugMenu>
        <NavItem eventKey={ 1 }>Home</NavItem>
        <NavItem eventKey={ 2 }>NavItem 1</NavItem>
        <NavItem eventKey={ 3 } disabled>Disabled</NavItem>
        <NavItem eventKey={ 4 }>NavItem 4</NavItem>
        <NavItem eventKey={ 5 }>NavItem 5</NavItem>
        <NavItem eventKey={ 6 } disabled>NavItem 6</NavItem>
        <NavItem eventKey={ 7 }>NavItem 7</NavItem>
        <NavItem eventKey={ 8 }>NavItem 8</NavItem>
      </RugMenu>
    )

  }
}
