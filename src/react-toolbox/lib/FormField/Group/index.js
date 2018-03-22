import React from "react"
import PropTypes from "prop-types"
import { injectIntl } from "react-intl"
import Buttons from "./Buttons"
import Classic from "./Classic"

class Group extends React.Component {

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

    const { readonly, value, display, multi, ...rest } = this.props

    const options = this.normalizeOptions()

    let currentValue

    if (multi && !Array.isArray(value)) currentValue = value ? [value] : []
    else if (!multi && Array.isArray(value)) currentValue = value[0]
    else currentValue = value

    for (const n in this.constructor.propTypes) delete rest[n]

    if (readonly) {

      let textContent

      if (multi) {

        textContent = options
          .filter(opt => currentValue.indexOf(opt.value) !== -1)
          .map(opt => opt.label)
          .join(", ")

      } else {

        const selected = options.find(opt => opt.value === currentValue)

        textContent = selected && selected.label
      }

      return (
        <div { ...rest } >
          { textContent }
        </div>
      )

    }

    const Construct = (display === "buttons") ? Buttons : Classic

    return (
      <Construct
        { ...rest }
        multi={ multi }
        value={ currentValue }
        options={ options }
      />
    )
  }

}


Group.propTypes = {
  readonly : PropTypes.bool,
  intl : PropTypes.object,
  children : PropTypes.node,
  value : PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  multi : PropTypes.bool,
  display : PropTypes.oneOf(["default", "buttons"]),
  options : PropTypes.array
}

export default injectIntl(Group)
