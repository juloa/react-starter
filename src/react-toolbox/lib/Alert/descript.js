import React from "react"
import Alert from "./"
import AlertExample from "./Example"
import fullCode from "./Example.js?txt"

export default {

  construct : Alert,

  description : "Message d'avertissement",

  categ : "UI components",

  states : { default : { fullCode, render : () => <AlertExample/> } }

}
