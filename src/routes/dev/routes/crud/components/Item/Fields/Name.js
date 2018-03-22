import React from "react"
import PropTypes from "prop-types"
import messages from "../../../messages"
import FormField from "components/FormField"
import { minLength, maxLength, required } from "components/FormField/rules"

const NameField = props => (
  <FormField
    name="name"
    label={ messages.name }
    validate={ [minLength(2), maxLength(20), required] }
    { ...props }
  />
)

NameField.propTypes = {
  readonly : PropTypes.bool
}

export default NameField
