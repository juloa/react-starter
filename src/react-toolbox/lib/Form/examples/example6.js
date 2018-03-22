import React from "react"
import Form from "../"
import FormField from "../../FormField"
import { reduxForm } from "redux-form/immutable"

const ReduxForm = reduxForm({ form : "formExample" })(() => (
  <Form readonly inline>
    <FormField
      name="firstName"
      type="text"
      label="First name"
      placeholder="enter text"
    />
    <FormField
      name="lastName"
      type="text"
      label="Last name"
      placeholder="enter text"
    />
    <FormField
      name="password"
      type="password"
      label="Password"
      placeholder="enter text"
      readonly={ false }
    />
  </Form>
))

const initialValues = { firstName : "Yannick", lastName : "Bochatay", password : "djzaio" }

export default () => <ReduxForm initialValues={ initialValues }/>
