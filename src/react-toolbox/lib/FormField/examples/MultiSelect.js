/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"

const Field = ({ readonly, inline, disabled }) => (
  <FormField
    name="category"
    type="select"
    label="Category"
    multi
    readonly={ readonly }
    inline={ inline }
    disabled={ disabled }
  >
    <option>Sports</option>
    <option>Economie</option>
    <option>Mathématiques</option>
    <option>Philosophie</option>
  </FormField>
)

const initialValues = {
  category : ["Economie"]
}

export default wrapForm(Field, initialValues)
