import React from "react"
import PropTypes from "prop-types"
import { DateRangePicker } from "react-dates"
import "react-dates/lib/css/_datepicker.css"
import { injectIntl } from "react-intl"
import moment from "moment"
import messages from "./messages"
import "./style.css"

class DatePicker extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      focusedInput : null,
      startDate : null,
      endDate : null
    }

    this.handleFocus = this.handleFocus.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  handleFocus(focusedInput) {

    this.setState({ focusedInput })
  }

  handleChange(dates) {

    this.setState(dates)
    this.props.onChange(dates)
  }

  setDate(value) {

    if (!value) return null

    let date

    if (typeof value !== "object") {

      date = moment(value)

      if (!date.isValid()) date = moment()

    } else if (value instanceof moment) {
      date = value
    } else {
      throw new TypeError("value must be a Moment instance or a valid string date")
    }

    return date
  }

  render() {

    const { intl, value, readonly, ...rest } = this.props
    let { startDate, endDate, focusedInput } = this.state

    moment.locale(intl.locale)

    if (!startDate && value) startDate = this.setDate(value.startDate)
    if (!endDate && value) endDate = this.setDate(value.endDate)

    const startDatePlaceholder = intl.formatMessage(messages.startDate)
    const endDatePlaceholder = intl.formatMessage(messages.endDate)

    if (readonly) {

      let format = rest.displayFormat || DateRangePicker.defaultProps.displayFormat || ""

      if (typeof format === "function") format = format()

      return (
        <div style={ { display : "flex", alignItems : "center", padding : "7px 0", minHeight : 34 } }>

          { (startDate && startDate.format(format)) || " " }
          { " \u279C " }
          { (endDate && endDate.format(format)) || " " }

        </div>
      )
    }

    ["name", "onBlur", "onChange", "onDragStart", "onDrop", "onFocus", "placeholder"].forEach(prop => delete rest[prop])

    return (
      <DateRangePicker
        { ...rest }
        startDate={ startDate }
        endDate={ endDate }
        onDatesChange={ this.handleChange }
        onFocusChange={ this.handleFocus }
        focusedInput={ focusedInput }
        startDatePlaceholderText={ startDatePlaceholder }
        endDatePlaceholderText={ endDatePlaceholder }
      />
    )
  }

}

DatePicker.propTypes = {
  value : PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange : PropTypes.func,
  intl : PropTypes.object,
  readonly : PropTypes.bool
}

export default injectIntl(DatePicker)
