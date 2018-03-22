import React from "react"
import PropTypes from "prop-types"
import { FormControl } from "react-bootstrap"
import NumberInput from "react-numeric-input"

const NumberField = ({ className, readonly, value, ...rest }) => {

  if (readonly) {
    return <FormControl.Static { ...rest }>{ value }</FormControl.Static>
  }

  return (
    <NumberInput
      className={ "form-control" + (className ? " " + className : "") }
      value={ value }
      { ...rest }
    />
  )
}

NumberField.propTypes = {
  className : PropTypes.string,
  readonly : PropTypes.bool,
  value : PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default NumberField
