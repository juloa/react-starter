/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"

const Field = ({ readonly, inline, disabled }) => (
  <FormField
    name="equipe"
    type="cascader-select"
    label="Equipe de Sport"
    readonly={ readonly }
    inline={ inline }
    disabled={ disabled }
  >
    <option label="Basket" value="basket">
      <option value="asvel">ASVEL</option>
      <option value="limoges">Limoges</option>
    </option>
    <option label="Foot" value="foot">
      <option value="psg">PSG</option>
      <option value="om">OM</option>
    </option>
    <option label="Rugby" value="rugby">
      <option value="toulouse">Stade Toulousain</option>
      <option value="paris" disabled>Stade Français</option>
    </option>
  </FormField>
)

const initialValues = {
  equipe : ["foot", "om"]
}

export default wrapForm(Field, initialValues)
