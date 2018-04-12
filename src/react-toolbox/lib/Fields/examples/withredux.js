import React from "react"
import PropTypes from "prop-types"
import FormField from "react-starter/src/react-toolbox/lib/FormField"
import Button from "react-starter/src/react-toolbox/lib/Button"
import { reduxForm } from "redux-form"

export default function createExample(Component) {

  const name = Component.displayName

  const Form = ({ handleSubmit }) => {

    return (
      <form onSubmit={ handleSubmit }>
        <FormField
          name={ name }
          label={ name }
          type={ Component }
          inline
        />
        <Button type="submit">Submit</Button>
      </form>
    )
  }

  Form.propTypes = {
    handleSubmit : PropTypes.func
  }

  const ReduxForm = reduxForm({ form : "formExample" })(Form)

  function onSubmit(values) {
    console.log(values)
  }

  return () => <ReduxForm onSubmit={ onSubmit }/>
}

