import React from "react"
import Spinner from "./"

export default {

  construct : Spinner,

  name : "Spinner",

  states : {

    default : () => <Spinner/>,
    fadeIn : () => <Spinner fadeIn/>,
    color : () => <Spinner color="pink"/>,
    size : () => <Spinner size={ 30 }/>

  }
}
