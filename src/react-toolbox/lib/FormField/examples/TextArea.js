/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"

const Field = ({ readonly, inline, disabled }) => (
  <FormField
    name="comment"
    type="textarea"
    label="commentaire"
    placeholder="your comment..."
    readonly={ readonly }
    inline={ inline }
    disabled={ disabled }
  />
)

const initialValues = {
  comment : "Texte par défaut"
}

export default wrapForm(Field, initialValues)
