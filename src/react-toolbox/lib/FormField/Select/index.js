/* eslint max-statements:0 */
import React from "react"
import PropTypes from "prop-types"
import { injectIntl } from "react-intl"
import RCSelect from "react-select"
import "react-select/dist/react-select.css"
import messages from "./messages"
import "./style.css"

class Select extends React.Component {

  constructor(props) {

    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(val) {

    const { onChange } = this.props

    if (onChange) {

      let value

      if (!val) value = val
      else if (Array.isArray(val)) value = val.map(item => item.value)
      else value = val.value

      onChange(value)
    }
  }

  handleBlur() {

    const { onBlur, value } = this.props

    if (onBlur) onBlur(value)
  }

  normalizeOptions() {

    const { children, options, intl } = this.props

    if (options) {

      return options.map(option => {

        if (option.value == null) {

          if (option.label == null) {
            return { value : option, label : option }
          } else {
            return { value : option.label, label : option.label, disabled : Boolean(option.disabled) }
          }

        } else {

          if (option.label == null) option.label = option.value

          return option
        }
      })

    } else {

      return React.Children.map(children, ({ props }) => {

        let label

        if (props.label) {

          if (typeof label === "object") label = intl.formatMessage(props.label)
          else label = props.label

        } else label = props.children

        return {
          value : props.value || props.children,
          label,
          disabled : Boolean(props.disabled)
        }
      })
    }

  }

  render() {

    const { intl, placeholder, readonly, value, ...rest } = this.props

    for (const n in this.constructor.propTypes) delete rest[n]

    const options = this.normalizeOptions()

    const noResultsText = intl.formatMessage(messages.noResultsText)

    let placeholderIntl

    if (typeof placeholder === "string") {
      placeholderIntl = placeholder

    } else if (typeof placeholder === "object") {
      placeholderIntl = intl.formatMessage(placeholder)
    } else {
      placeholderIntl = intl.formatMessage(messages.placeholderSelect)
    }

    if (readonly) {

      let textContent

      if (rest.multi) {

        textContent = options
          .filter(opt => value.indexOf(opt.value) !== -1)
          .map(opt => opt.label)
          .join(", ")

      } else {

        const selected = options.find(opt => opt.value === value)

        textContent = selected && selected.label
      }

      return (
        <div style={ { padding : "7px 0", minHeight : 34 } }>
          { textContent }
        </div>
      )
    }

    return (
      <RCSelect
        { ...rest }
        options={ options }
        onChange={ this.handleChange }
        onBlur={ this.handleBlur }
        value={ value }
        noResultsText={ noResultsText }
        placeholder={ placeholderIntl }
      />
    )
  }

}

Select.propTypes = {
  value : PropTypes.any,
  onChange : PropTypes.func,
  onBlur : PropTypes.func,
  intl : PropTypes.object,
  placeholder : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  readonly : PropTypes.bool,
  children : PropTypes.node,
  options : PropTypes.array
}

export default injectIntl(Select)
