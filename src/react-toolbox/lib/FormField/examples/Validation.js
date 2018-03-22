/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"
import { minLength, maxLength } from "../rules"

function specialChar(value) {
  return /[^\w]/.test(value) ? "Les caractères spéciaux sont interdits" : null
}

const Field = ({ readonly, inline, disabled }) => (
  <FormField
    name="name"
    type="text"
    placeholder="Enter text"
    label="Name"
    validate={ [minLength(2), maxLength(10), specialChar] }
    readonly={ readonly }
    inline={ inline }
    disabled={ disabled }
  />
)

export default wrapForm(Field)
