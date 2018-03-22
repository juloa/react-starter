/* eslint react/prop-types:0 */

import React from "react"
import Main from "./components/Main"
import Item from "./components/Item"
import store from "store"
import { push } from "react-router-redux"
import { withBackButton } from "components/HOC"

const backUrl = "dev/crud"

const HocItem = withBackButton(backUrl, Item)

function goBack() {
  store.dispatch(push(backUrl))
}

module.exports = {

  path : "crud",

  component : Main,

  childRoutes : [{
    path : "new",
    component : () => <HocItem edit onSubmit={ goBack }/>
  }, {
    path : ":id/edit",
    component : ({ params : { id } }) => <HocItem id={ id } edit onSubmit={ goBack }/>
  }, {
    path : ":id",
    component : ({ params : { id } }) => <HocItem id={ id }/>
  }]

}
