/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"

const Field = ({ readonly, inline, disabled }) => (
  <FormField
    name="conditions"
    type="checkbox"
    label="J'accepte les conditions générales de vente"
    readonly={ readonly }
    inline={ inline }
    disabled={ disabled }
  >
    <option>J'accepte les conditions générales de ventes</option>
  </FormField>
)

const initialValues = {
  conditions : true
}

export default wrapForm(Field, initialValues)
