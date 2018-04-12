import React, { Component } from "react"
import PageContent from "react-starter/src/react-toolbox/lib/Layout/PageContent"
import { injectIntl } from "react-intl"
import messages from "./messages"
import { hot } from "react-hot-loader"

class NotFound extends Component {

  render() {
    return <PageContent title={ this.props.intl.formatMessage(messages.notfound) } />
  }

}

export default hot(module)(injectIntl(NotFound))
