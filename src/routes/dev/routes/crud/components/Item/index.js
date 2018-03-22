import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { destroy, SubmissionError } from "redux-form"
import { getItem, createItem, updateItem, resetItem } from "../../actions"
import List from "../List"
import Form, { formName } from "./Form"
import Button from "components/Button"
import { addSuccessNotif } from "components/NotifSystem"
import { injectIntl } from "react-intl"
import messages from "../../messages"

class FormPage extends React.Component {

  constructor(props) {

    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClickEdit = this.handleClickEdit.bind(this)

    this.state = {
      readonly : false
    }
  }

  componentWillUpdate(nextProps) {

    const { dispatch, id } = nextProps

    const prevId = this.props.id

    if (id !== prevId) {

      dispatch(resetItem())
      dispatch(destroy(formName))

      if (id) dispatch(getItem(id))
    }

  }

  componentWillMount() {

    const { dispatch, id, edit } = this.props

    if (!edit) this.setState({ readonly : true })

    dispatch(resetItem())
    dispatch(destroy(formName))

    if (id) dispatch(getItem(id))
  }

  handleClickEdit() {

    this.setState({ readonly : false })
  }

  handleSubmit(values) {

    const { dispatch, id, intl, onSubmit } = this.props

    const { truncList, resetList } = List.actions

    const action = id ? updateItem : createItem

    const successMsg = intl.formatMessage(messages[id ? "updateSuccess" : "createSuccess"])

    return dispatch(action(values))
    .then(() => this.setState({ readonly : true }))
    .then(() => dispatch(id ? truncList(id) : resetList()))
    .then(() => onSubmit && onSubmit(values))
    .then(() => dispatch(addSuccessNotif(successMsg)))
    .catch(e => {
      // e._error = "General Error" pour afficher une erreur globale
      throw new SubmissionError(e)
    })

  }

  render() {

    const { id, ...rest } = this.props
    const { readonly } = this.state

    delete rest.edit
    delete rest.dispatch
    delete rest.intl
    delete rest.onSubmit

    return (
      <Form
        onSubmit={ this.handleSubmit }
        readonly={ readonly }
        enableReinitialize
        id={ id }
        { ...rest }
      >
      { /* boutons supplémentaires */ }
      { readonly && (
        <Button
          onClick={ this.handleClickEdit }
          label={ messages.editItem }
        />
      ) }
      </Form>
    )
  }

}

FormPage.propTypes = {
  dispatch : PropTypes.func,
  id : PropTypes.string,
  edit : PropTypes.bool,
  intl : PropTypes.object,
  onSubmit : PropTypes.func
}

export default injectIntl(connect()(FormPage))
