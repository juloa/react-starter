/* eslint react/prop-types:0 */
import React from "react"
import PropTypes from "prop-types"
import { injectIntl } from "react-intl"
import Confirm from "react-starter/src/react-toolbox/lib/Confirm"
import messages from "./messages"

class ConfirmWrap extends React.Component {

  constructor(props) {

    super(props)

    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {

    this.confirm.show()
  }

  handleConfirm() {

    const child = this.getChild()

    if (child.props.onClick) child.props.onClick()
  }

  getChild() {

    return React.Children.only(this.props.children)
  }

  render() {

    const child = this.getChild()

    const { intl, values, ...rest } = this.props
    let { message } = this.props

    delete rest.message

    if (typeof message === "object") message = intl.formatMessage(message, values)

    return (
      <span { ...rest }>
        <Confirm
          ref={ elmt => this.confirm = elmt }
          onConfirm={ this.handleConfirm }
        >
          { message }
        </Confirm>
        { React.cloneElement(child, { onClick : this.handleClick }) }
      </span>
    )
  }

}

ConfirmWrap.propTypes = {
  message : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  values : PropTypes.object,
  children : PropTypes.node
}

ConfirmWrap.defaultProps = {
  message : messages.areYouSure
}

export default injectIntl(ConfirmWrap)
