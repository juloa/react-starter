import React from "react"
import { injectIntl } from "react-intl"
import PropTypes from "prop-types"
import { Checkbox as BsCheckbox } from "react-bootstrap"

const Checkbox = ({ readonly, checked, label, intl, ...rest }) => {

  const labelIntl = (label && label.id) ? intl.formatMessage(label) : label

  if (readonly) {
    if (checked) return <span>{ "\u2713 " + labelIntl }</span>
    else return <span style={ { textDecoration : "line-through" } }>{ labelIntl }</span>
  }

  return <BsCheckbox inline checked={ checked } { ...rest }>{ labelIntl }</BsCheckbox>
}

Checkbox.propTypes = {
  readonly : PropTypes.bool,
  checked : PropTypes.bool,
  label : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  intl : PropTypes.object
}

export default injectIntl(Checkbox)
