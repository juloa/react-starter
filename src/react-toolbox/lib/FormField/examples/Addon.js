/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"
import Glyphicon from "react-bootstrap/lib/Glyphicon"

const Field = ({ readonly, inline, disabled }) => (
  <FormField
    name="name"
    type="text"
    placeholder="Name"
    label="name"
    addon={ <Glyphicon glyph="user"/> }
    readonly={ readonly }
    inline={ inline }
    disabled={ disabled }
  />
)

const initialValues = {
  name : "Johan"
}

export default wrapForm(Field, initialValues)

