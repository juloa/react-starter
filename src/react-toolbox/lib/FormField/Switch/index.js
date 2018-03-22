import React from "react"
import PropTypes from "prop-types"
import { injectIntl } from "react-intl"
import RCSwitch from "rc-switch"
import "rc-switch/assets/index.css"
import "./style.css"

const Switch = ({ readonly, value, label, intl, className, bsStyle, ...rest }) => {

  const checked = Boolean(value)

  const labelIntl = (label && label.id) ? intl.formatMessage(label) : label

  if (readonly) {
    if (checked) return <span>{ "\u2713 " + labelIntl }</span>
    else return <span style={ { textDecoration : "line-through" } }>{ labelIntl }</span>
  }

  return (
    <div>
      <RCSwitch
        checked={ checked }
        className={ bsStyle + (className ? " " + className : "") }
        { ...rest }
      />
      { " " }
      { labelIntl }
    </div>
  )

}

Switch.propTypes = {
  readonly : PropTypes.bool,
  value : PropTypes.any,
  label : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  intl : PropTypes.object,
  onChange : PropTypes.func,
  className : PropTypes.string,
  bsStyle : PropTypes.oneOf(["default", "primary", "success", "info", "warning", "danger"])
}

Switch.defaultProps = {
  bsStyle : "default"
}

export default injectIntl(Switch)
