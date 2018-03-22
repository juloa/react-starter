import React from "react"
import PropTypes from "prop-types"
import { SingleDatePicker } from "react-dates"
import "react-dates/lib/css/_datepicker.css"
import { injectIntl } from "react-intl"
import moment from "moment"
import "./style.css"
import messages from "./messages"

class DatePicker extends React.Component {

  constructor(props) {

    super(props)

    this.state = { focused : false }

    this.handleFocus = this.handleFocus.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  handleFocus({ focused }) {

    this.setState({ focused })
  }

  handleChange(date) {

    this.props.onChange(date)
  }

  setDate(value) {

    if (!value) return null

    let date

    if (typeof value === "string") {

      date = moment(value)

      if (!date.isValid()) date = null

    } else if (value instanceof moment) {
      date = value
    } else {
      throw new TypeError("value must be a Moment instance or a valid string date")
    }

    return date
  }

  setPlaceholder(placeholder) {

    const { intl } = this.props

    let placeholderIntl

    if (typeof placeholder === "string") {
      placeholderIntl = placeholder

    } else if (typeof placeholder === "object") {
      placeholderIntl = intl.formatMessage(placeholder)

    } else {
      placeholderIntl = intl.formatMessage(messages.placeholderDate)

    }

    return placeholderIntl
  }

  render() {

    const { intl, placeholder, value, readonly, ...rest } = this.props

    moment.locale(intl.locale)

    const date = this.setDate(value)
    const placeholderIntl = this.setPlaceholder(placeholder);

    ["name", "onBlur", "onChange", "onDragStart", "onDrop", "onFocus", "value"].forEach(prop => delete rest[prop])

    if (readonly) {

      let format = rest.displayFormat || SingleDatePicker.defaultProps.displayFormat || ""

      if (typeof format === "function") format = format()

      return (
        <div style={ { padding : "7px 0", minHeight : 34 } }>
          { (date && date.format(format)) || " " }
        </div>
      )
    }

    return (
      <SingleDatePicker
        numberOfMonths={ 1 }
        placeholder={ placeholderIntl }
        { ...rest }
        date={ date }
        onDateChange={ this.handleChange }
        onFocusChange={ this.handleFocus }
        focused={ this.state.focused }
      />
    )
  }

}

DatePicker.propTypes = {
  value : PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange : PropTypes.func,
  intl : PropTypes.object,
  placeholder : PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  readonly : PropTypes.bool
}

export default injectIntl(DatePicker)
