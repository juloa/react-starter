/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"

const Field = ({ readonly, inline, disabled }) => (
  <FormField
    name="name"
    type="text"
    label="name"
    placeholder="enter text"
    readonly={ readonly }
    inline={ inline }
    disabled={ disabled }
  />
)

const initialValues = {
  name : "Johan"
}

export default wrapForm(Field, initialValues)
