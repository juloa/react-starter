import React from "react"
import PropTypes from "prop-types"
import { Field } from "redux-form"
import GroupField from "../GroupField"

const FormField = props => (
  <Field { ...props } component={ GroupField }/>
)

FormField.propTypes = {
  validate : PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  readonly : PropTypes.bool
}

export default FormField
