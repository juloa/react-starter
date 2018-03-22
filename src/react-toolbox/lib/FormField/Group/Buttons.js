import React from "react"
import PropTypes from "prop-types"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"

const Buttons = ({ value, options, name, onChange, multi, bsStyle, disabled, ...rest }) => {

  delete rest.intl
  delete rest.onBlur

  return (
    <ToggleButtonGroup
      { ...rest }
      onChange={ onChange }
      type={ multi ? "checkbox" : "radio" }
      name={ name }
      defaultValue={ value }
      disabled={ disabled }
    >
      { options.map((opt, i) => {

        const selected = multi ? (value.indexOf(opt.value) !== -1) : (opt.value === value)

        return (
          <ToggleButton
            key={ i }
            value={ opt.value }
            bsStyle={ selected ? bsStyle : "default" }
            className={ selected ? "active" : "" }
            disabled={ opt.disabled || disabled }
          >
            { opt.label }
          </ToggleButton>
        )

      }) }
    </ToggleButtonGroup>
  )
}

Buttons.propTypes = {
  name : PropTypes.string,
  onChange : PropTypes.func,
  label : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  intl : PropTypes.object,
  value : PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  multi : PropTypes.bool,
  options : PropTypes.array,
  bsStyle : PropTypes.oneOf(["default", "primary", "success", "info", "warning", "danger"]),
  disabled : PropTypes.bool
}

Buttons.defaultProps = {
  bsStyle : "info"
}

export default Buttons
