import React from "react"
import Search from "./"

const log = value => console.log(value)

export default {

  construct : Search,

  path : "react-starter/src/components/Search",

  states : {
    default : () => <Search onChange={ log }/>
  }
}
