import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { destroy, SubmissionError } from "redux-form"
import { actions } from "../../actions"
import List from "../List"
import Form, { formName } from "./Form"
import Button from "react-toolbox/lib/Button"
import { addSuccessNotif } from "react-toolbox/lib/NotifSystem"
import { injectIntl } from "react-intl"
import messages from "../../messages"
import { Panel } from "react-bootstrap"

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

      dispatch(actions.resetItem())
      dispatch(destroy(formName))

      if (id) dispatch(actions.getItem(id))
    }

  }

  componentWillMount() {

    const { dispatch, id, edit } = this.props

    if (!edit) this.setState({ readonly : true })

    dispatch(actions.resetItem())
    dispatch(destroy(formName))

    if (id) dispatch(actions.getItem(id))
  }

  handleClickEdit() {

    this.setState({ readonly : false })
  }

  handleSubmit(values) {

    const { dispatch, id, intl, onSubmit } = this.props

    const { truncList, resetList } = List.actions

    const action = id ? actions.updateItem : actions.createItem

    const successMsg = intl.formatMessage(messages[id ? "updateSuccess" : "createSuccess"])

    dispatch(action(values))
      .then(() => this.setState({ readonly : true }))
      .then(() => dispatch(id ? truncList(id) : resetList()))
      .then(() => onSubmit && onSubmit(values))
      .then(() => dispatch(addSuccessNotif(successMsg)))
      .catch(e => { throw new SubmissionError(e) })

  }

  render() {

    const { id, ...rest } = this.props
    const { readonly } = this.state

    delete rest.edit
    delete rest.dispatch
    delete rest.intl
    delete rest.onSubmit

    return (
      <Panel>
        <Form
          onSubmit={ this.handleSubmit }
          readonly={ readonly }
          enableReinitialize
          id={ id }
          { ...rest }
        />

        { readonly && <Button label={ messages.editExample } onClick={ this.handleClickEdit } className="pull-right" />
        }
      </Panel>
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
