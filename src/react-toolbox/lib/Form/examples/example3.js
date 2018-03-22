import React from "react"
import Form from "../"
import FormField from "../../FormField"
import { reduxForm } from "redux-form/immutable"

const ReduxForm = reduxForm({ form : "formExample" })(() => (
  <Form readonly>
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


export default () => <ReduxForm initialValues={ { name : "Yannick", password : "djzaio" } }/>
