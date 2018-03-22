import React from "react"
import Form from "../"
import FormField from "../../FormField"
import { reduxForm } from "redux-form/immutable"

export default reduxForm({ form : "formExample" })(() => (
  <Form>
    <FormField
      name="name"
      type="text"
      label="name"
      placeholder="enter text"
    />
    <FormField
      name="password"
      type="text"
      label="password"
      placeholder="enter text"
    />
  </Form>
))
