/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"
import moment from "moment"

const Field = ({ readonly, inline, disabled }) => (
  <FormField
    name="time"
    type="time"
    label="Time"
    readonly={ readonly }
    inline={ inline }
    disabled={ disabled }
    multiple
  />
)

const initialValues = {
  time : moment.utc()
}

export default wrapForm(Field, initialValues)
