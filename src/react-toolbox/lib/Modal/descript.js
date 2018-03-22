import React from "react"
import Modal from "./"
import ModalExample from "./example"
import ModalSource from "./example.js?txt"

export default {

  categ : "UI components",

  construct : Modal,

  path : "react-bootstrap/lib/Modal",

  link : "https://react-bootstrap.github.io/components.html#modals",

  states : {
    default : {
      fullCode : ModalSource,
      render : () => <ModalExample/>
    }
  }
}
