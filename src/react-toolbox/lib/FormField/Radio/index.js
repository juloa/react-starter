import React from "react"
import { injectIntl } from "react-intl"
import PropTypes from "prop-types"
import { Radio as BsRadio } from "react-bootstrap"

const Radio = ({ readonly, checked, label, intl, ...rest }) => {

  const labelIntl = (label && label.id) ? intl.formatMessage(label) : label

  if (readonly) {
    if (checked) return <span>{ "\u2713 " + labelIntl }</span>
    else return <span style={ { textDecoration : "line-through" } }>{ labelIntl }</span>
  }

  return <BsRadio inline checked={ checked } { ...rest }>{ labelIntl }</BsRadio>
}

Radio.propTypes = {
  readonly : PropTypes.bool,
  checked : PropTypes.bool,
  label : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  intl : PropTypes.object
}

export default injectIntl(Radio)
