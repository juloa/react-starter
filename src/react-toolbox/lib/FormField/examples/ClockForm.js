/* eslint react/prop-types:0 */
import React from "react"
// import PropTypes from "prop-types"
import wrapForm from "./wrapForm"
import FormField from "../"
import moment from "moment"


const ClockForm = ({ readonly, inline, disabled }) => {

  return (
    <FormField
      name="time"
      type="clock"
      label="Heure"
      readonly={ readonly }
      inline={ inline }
      disabled={ disabled }
    />
  )
}

/*
ClockForm.propTypes = {
  readonly : PropTypes.bool,
  inline : PropTypes.bool,
  labelWidth : PropTypes.number
}
*/

const initialValues = {
  time : moment()
}

export default wrapForm(ClockForm, initialValues)

