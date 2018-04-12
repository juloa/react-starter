import React, { Children } from "react"
import PropTypes from "prop-types"
import PageContent from "react-starter/src/components/Layout/PageContent"
import { injectIntl } from "react-intl"
import messages from "../messages"
import List from "./List"

const Main = ({ children, intl }) => {

  const title = intl.formatMessage(messages.crud)

  return (
    <PageContent title={ title }>
      { (children && Children.only(children)) || <List/> }
    </PageContent>
  )

}

Main.propTypes = {
  children : PropTypes.node,
  intl : PropTypes.object
}

export default injectIntl(Main)
