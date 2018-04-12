import React, { Component } from "react"
import { hot } from "react-hot-loader"

import "bootstrap/dist/css/bootstrap.css"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-select/dist/react-select.css"
import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css"
import "react-starter/src/index.css"

import { Provider } from "react-redux"
import store from "./store"

import { IntlProvider, addLocaleData } from "react-intl"

import fr from "react-intl/locale-data/fr"
import en from "react-intl/locale-data/en"

import AuthChecker from "react-starter/src/react-toolbox/lib/AuthChecker"
import Layout from "react-starter/src/react-toolbox/lib/Layout"

import ASideMenu from "react-starter/src/components/AsideMenu"

import {
  BrowserRouter as Router
} from "react-router-dom"


let lang = navigator.language

// force fr
lang = "fr"

if (lang.indexOf("-") !== -1) {
  lang = lang.split("-")[0]
}

addLocaleData([...en, ...fr])

class App extends Component {

  render() {
    return (
      <IntlProvider locale={ lang } messages={ this.props.messages[lang] }>
        <Provider store={ store }>
          <Router>
            <AuthChecker>
              <Layout charter="mf" sidebar={ <ASideMenu/> }>
                { this.props.children }
              </Layout>
            </AuthChecker>
          </Router>
        </Provider>
      </IntlProvider>
    )
  }

}

export default hot(module)(App)
