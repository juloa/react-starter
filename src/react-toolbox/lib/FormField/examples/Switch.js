/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"

const Field = ({ readonly, inline, disabled }) => (
  <FormField
    name="conditions"
    type="switch"
    label="J'accepte les conditions générales de ventes"
    readonly={ readonly }
    inline={ inline }
    disabled={ disabled }
  />
)

const initialValues = {
  conditions : true
}

export default wrapForm(Field, initialValues)
