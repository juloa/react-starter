/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"

const Field = ({ readonly, inline, disabled }) => (
  <FormField
    name="age"
    type="number"
    label="age"
    placeholder="enter age"
    readonly={ readonly }
    inline={ inline }
    disabled={ disabled }
    mobile
  />
)

const initialValues = {
  age : 25
}

export default wrapForm(Field, initialValues)
