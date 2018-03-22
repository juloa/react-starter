/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"
import DueDateSelect from "../../Fields/DueDate"

const Field = ({ readonly, inline, disabled }) => (
  <FormField
    name="duedate"
    type={ DueDateSelect }
    label="due date"
    readonly={ readonly }
    inline={ inline }
    disabled={ disabled }
  />
)

const initialValues = {
  duedate : {
    type : "fixed",
    date : new Date().toISOString()
  }
}

export default wrapForm(Field, initialValues)

