/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"

const Field = ({ readonly, inline, disabled }) => (
  <FormField
    name="name"
    type="text"
    label={ { id : "core.name", defaultMessage : "International\u00A0name" } }
    placeholder={ { id : "core.enter_text", defaultMessage : "International enter text" } }
    readonly={ readonly }
    inline={ inline }
    disabled={ disabled }
  />
)

export default wrapForm(Field)
