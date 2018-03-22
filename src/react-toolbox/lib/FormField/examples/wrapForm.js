/* eslint react/no-multi-comp:0 */
import React from "react"
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"
import { injectIntl } from "react-intl"
import { reduxForm } from "redux-form"

function injectRedux(WrappedComponent) {

  class Form extends React.Component {

    constructor(props) {

      super(props)

      this.state = {
        readonly : false,
        inline : false,
        wide : false,
        disabled : false
      }

      this.handleReadOnly = this.handleReadOnly.bind(this)
      this.handleInline = this.handleInline.bind(this)
      this.handleWidth = this.handleWidth.bind(this)
      this.handleDisable = this.handleDisable.bind(this)
    }

    handleWidth() {

      this.setState({ wide : !this.state.wide })
    }

    handleReadOnly() {

      this.setState({ readonly : !this.state.readonly })
    }

    handleInline() {

      this.setState({ inline : !this.state.inline })
    }

    handleDisable() {

      this.setState({ disabled : !this.state.disabled })
    }

    render() {

      const { handleSubmit, submitting, ...rest } = this.props
      const { readonly, wide, inline, disabled } = this.state
      const labelWidth = wide ? 300 : 150

      return (
        <form onSubmit={ handleSubmit }>
          <WrappedComponent
            { ...rest }
            readonly={ readonly }
            inline={ inline }
            labelWidth={ labelWidth }
            disabled={ disabled }
          />
          <div style={ { marginTop : 50 } }>
            <Button onClick={ this.handleReadOnly }>Toggle readOnly</Button>
            { " " }
            <Button onClick={ this.handleInline }>Toggle inline</Button>
            { " " }
            <Button onClick={ this.handleDisable }>Toggle disable</Button>
            { " " }
            { /* <Button onClick={ this.handleWidth }>Toggle width</Button>
            { " " } */ }
            <Button type="submit" bsStyle="primary" disabled={ submitting }>Submit</Button>
          </div>
        </form>
      )

    }

  }

  Form.propTypes = {
    handleSubmit : PropTypes.func,
    submitting : PropTypes.bool
  }

  return injectIntl(reduxForm({ form : "formExample" })(Form))

}


export default (WrappedComponent, initialValues) => {

  const FormComponent = injectRedux(WrappedComponent)

  return class extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        submitData : null
      }
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(submitData) {

      this.setState({ submitData })
    }

    render() {

      return (
        <div>
          <FormComponent initialValues={ initialValues } onSubmit={ this.handleSubmit }/>
          <div style={ { display : "flex", marginTop : 50 } }>
            <div style={ { flex : 1 } }>
              <h5>Valeurs initiales</h5>
              <pre>
                { JSON.stringify(initialValues, null, 2) }
              </pre>
            </div>
            <div style={ { flex : 1 } }>
              <h5>Valeurs soumises</h5>
              <pre>
                { JSON.stringify(this.state.submitData, null, 2) }
              </pre>
            </div>
          </div>
        </div>
      )
    }

}

}
