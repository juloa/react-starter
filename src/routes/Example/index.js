import React from "react"
import PropTypes from "prop-types"
import PageContent from "react-toolbox/lib/Layout/PageContent"
import { injectIntl } from "react-intl"
import messages from "./messages"
import List from "./components/List"
import Item from "./components/Item"
import { Route, Switch } from 'react-router-dom'

import { hot } from 'react-hot-loader'

import { withBackButton } from "react-toolbox/lib/HOC"

const backUrl = "/examples"

const HocItem = withBackButton(backUrl, Item)

const Main = ({ children, intl }) => {

  const title = intl.formatMessage(messages.examples)

  return (
    <PageContent title={ title }>
      <Switch>
        <Route path="/examples/new" exact component={(props) => ( <HocItem edit />) } />
        <Route path="/examples/:id/edit" exact component={(props) => ( <HocItem id={props.match.params.id} edit />) } />
        <Route path="/examples/:id" exact component={(props) => ( <HocItem id={props.match.params.id} />) } />
        
        <Route path="/examples" exact component={List} />
      </Switch>
    </PageContent>
  )

}

Main.propTypes = {
  intl : PropTypes.object
}

export default hot(module)(injectIntl(Main))

