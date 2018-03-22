import React from "react"
import PropTypes from "prop-types"
import { FormControl } from "react-bootstrap"
import RCSlider from "rc-slider"
import "rc-slider/assets/index.css"
import "./style.css"

export const Slider = ({ readonly, value, bsStyle, className, ...rest }) => {

  if (readonly) return <FormControl.Static { ...rest }>{ value }</FormControl.Static>

  const Construct = Array.isArray(value) ? RCSlider.Range : RCSlider

  return (
    <Construct
      value={ value }
      className={ bsStyle + (className ? " " + className : "") }
      { ...rest }
    />
  )

}

Slider.propTypes = {
  readonly : PropTypes.bool,
  value : PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  bsStyle : PropTypes.oneOf(["default", "primary", "success", "info", "warning", "danger"]),
  className : PropTypes.string
}

Slider.defaultProps = {
  bsStyle : "default"
}

export default RCSlider.createSliderWithTooltip(Slider)
