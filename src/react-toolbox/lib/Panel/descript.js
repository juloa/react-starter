import React from "react"
import Component from "./"
import Example from "./example"
import Source from "./example.js?txt"

export default {

  categ : "UI components",

  construct : Component,

  // path : "react-bootstrap/lib/Panel",

  link : "https://react-bootstrap.github.io/components.html#panels",

  states : {
    default : {
      fullCode : Source,
      render : () => <Example/>
    }
  }
}
