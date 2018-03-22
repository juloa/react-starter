import React, { Component } from 'react';
import PageContent from "react-toolbox/lib/Layout/PageContent"
import { injectIntl } from "react-intl"
import messages from "./messages"

class NotFound extends Component {
  render() {
    return <PageContent title={ this.props.intl.formatMessage(messages.notfound) } />
  }
}


export default injectIntl(NotFound) 
