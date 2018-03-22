import React from "react"
import PropTypes from "prop-types"
import { FormControl } from "react-bootstrap"
import RCTimePicker from "rc-time-picker"
import "rc-time-picker/assets/index.css"
import "./style.css"

export const TimePicker = ({ readonly, value, ...rest }) => {

  if (readonly) return <FormControl.Static { ...rest }>{ value }</FormControl.Static>

  return (
    <RCTimePicker value={ value } { ...rest }/>
  )

}

TimePicker.propTypes = {
  readonly : PropTypes.bool,
  value : PropTypes.string
}

export default TimePicker
