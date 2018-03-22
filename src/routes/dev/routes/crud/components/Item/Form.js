import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import { STATE_PROPERTY } from "../../actions"
import { Alert } from "react-bootstrap"
import NameField from "./Fields/Name"
import Button from "components/Button"
import Spinner from "components/Spinner"
import classNames from "./style.module.css"
import { injectIntl } from "react-intl"
import messages from "../../messages"

export const formName = "dev/crud"


const Form = ({ handleSubmit, pristine, submitting, isFetching, fetchError, readonly, children }) => {

  let button = null

  if (!readonly) {

    button = (
      <Button
        bsStyle="primary"
        type="submit"
        icon="ok"
        disabled={ pristine || submitting }
        label={ messages.submit }
      />
    )

  }

  return (

    <form onSubmit={ handleSubmit } className={ classNames.form }>

      <NameField readonly={ readonly }/>

      { fetchError && <Alert bsStyle="danger">{ fetchError }</Alert> }

      <div className={ classNames.buttons }>
        { isFetching && <Spinner/> }
        { children }
        { button }
      </div>

    </form>
  )
}


Form.propTypes = {
  pristine : PropTypes.bool,
  submitting : PropTypes.bool,
  handleSubmit : PropTypes.func,
  readonly : PropTypes.bool,
  fetchError : PropTypes.string,
  isFetching : PropTypes.bool,
  children : PropTypes.node
}

function mapStateToProps(state) {

  const dataStore = state[STATE_PROPERTY]
  const values = dataStore.get("item")

  return {
    initialValues : values && values.toJS(),
    fetchError : dataStore.get("fetchError"),
    isFetching : dataStore.get("isFetching")
  }

}


const ReduxForm = reduxForm({ form : formName })(Form)

export default connect(mapStateToProps)(injectIntl(ReduxForm))
