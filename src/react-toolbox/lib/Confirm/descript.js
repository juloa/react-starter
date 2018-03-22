import React from "react"
import ConfirmExample from "./Example"
import fullCode from "./Example.js?txt"
import Confirm from "./"

export default {

  categ : "UI Components",

  construct : Confirm,

  description : "Boîte de dialogue de type confirmation",

  states : { default : { fullCode, render : () => <ConfirmExample/> } }

}
