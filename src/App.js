import React, { Component } from "react"
import { hot } from "react-hot-loader"

import { Provider } from "react-redux"
import store from "./store"

import { IntlProvider, addLocaleData } from "react-intl"

import fr from "react-intl/locale-data/fr"
import en from "react-intl/locale-data/en"
import messages from "./locales/"

import AuthChecker from "react-toolbox/lib/AuthChecker"
import Layout from "react-toolbox/lib/Layout"
import MainRouter from "routes"

import ASideMenu from "components/AsideMenu"

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
      <IntlProvider locale={ lang } messages={ messages[lang] }>
        <Provider store={ store }>
          <Router>
            <AuthChecker>
              <Layout charter="mf" sidebar={ <ASideMenu/> }>
                <MainRouter />
              </Layout>
            </AuthChecker>
          </Router>
        </Provider>
      </IntlProvider>
    )
  }

}

export default hot(module)(App)
