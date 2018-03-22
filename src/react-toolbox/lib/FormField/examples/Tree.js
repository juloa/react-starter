/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"

const Field = ({ readonly, inline, disabled }) => (
  <FormField
    name="category"
    type="tree-select"
    label="Category"
    readonly={ readonly }
    inline={ inline }
    disabled={ disabled }
    multiple
  >
    <option label="Sports">
      <option>Basket</option>
      <option label="Karaté">
        <option value="shotokan">Shotokan</option>
        <option value="wadoryu" disabled>Wado-Ryu</option>
        <option value="shitoryu" label="Shito-Ryu"/>
      </option>
      <option>Gym</option>
    </option>
    <option>Economie</option>
    <option>Mathématiques</option>
    <option>Philosophie</option>
  </FormField>
)

const initialValues = {
  category : "shotokan"
}

export default wrapForm(Field, initialValues)
