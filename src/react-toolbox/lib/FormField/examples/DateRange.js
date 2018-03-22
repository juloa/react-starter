/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"
import moment from "moment"

const Field = ({ readonly, inline, disabled }) => (
  <FormField
    name="date"
    type="date-range"
    label="Date"
    readonly={ readonly }
    inline={ inline }
    disabled={ disabled }
  />
)

const initialValues = {
  date : {
    startDate : moment(),
    endDate : moment()
  }
}

export default wrapForm(Field, initialValues)
