import React from "react"
import { UserName } from "./"

export default {

  construct : UserName,

  path : "components/UserName",

  states : {
    default : () => <UserName name="Yannick Bochatay"/>,
    icon : () => <UserName icon name="Yannick Bochatay"/>
  }
}
