import React from "react"
import { PropTypes } from "prop-types"
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap"
import classNames from "./style.module.css"
import { injectIntl } from "react-intl"
import messages from "./messages"

class Search extends React.Component {

  constructor(props) {

    super(props)

    this.state = { focus : false, value : "" }

    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  handleFocus() {

    this.setState({ focus : true })
  }

  handleBlur() {

    this.setState({ focus : false })
  }

  handleClick(e) {

    if (this.state.value === "") return

    this.setState({ value : "" })

    if (this.props.onChange) this.props.onChange("", e)
  }

  handleChange(e) {

    const value = e.target.value

    this.setState({ value })

    if (this.props.onChange) this.props.onChange(value, e)
  }

  componentWillMount() {

    const { initialValue } = this.props

    if (initialValue) this.setState({ value : initialValue })
  }

  render() {

    const { className, intl, placeholder, ...rest } = this.props
    const { focus, value } = this.state

    delete rest.dispatch
    delete rest.onChange
    delete rest.initialValue

    let placeholderMess

    if (placeholder) {

      if (typeof placeholder === "string") placeholderMess = placeholder
      else placeholderMess = intl.formatMessage(placeholder)

    } else placeholderMess = intl.formatMessage(messages.search)

    return (
      <FormGroup
        className={ classNames.container + (className ? " " + className : "") }
        { ...rest }
        validationState={ focus || value ? "warning" : null }
      >
        <InputGroup className={ classNames[focus ? "focus" : "blur"] }>
          <FormControl
            type="text"
            value={ this.state.value }
            placeholder={ placeholderMess }
            onFocus={ this.handleFocus }
            onBlur={ this.handleBlur }
            onChange={ this.handleChange }
          />
          <InputGroup.Addon className={ focus || value ? classNames.remove : null } onMouseDown={ this.handleClick }>
            <Glyphicon glyph={ focus || value ? "remove" : "search" }/>
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
    )
  }

}

Search.propTypes = {
  className : PropTypes.string,
  onChange : PropTypes.func,
  initialValue : PropTypes.string,
  intl : PropTypes.object,
  placeholder : PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

export default injectIntl(Search)
