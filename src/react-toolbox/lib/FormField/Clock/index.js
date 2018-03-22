import React from "react"
import PropTypes from "prop-types"
import TimePicker from "react-times"
import { FormControl } from "react-bootstrap"

import moment from "moment"

// use material theme
import "react-times/css/material/default.css"
// or you can use classic theme
// import "react-times/css/classic/default.css"


class Clock extends React.Component {


  constructor(props) {

    super(props)

    this.state = {
      focusStatue : null,
      hour : null,
      minute : null,
      meridien : null
    }

    this.handleFocus = this.handleFocus.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleHourChange = this.handleHourChange.bind(this)
    this.handleMinuteChange = this.handleMinuteChange.bind(this)

  }

  handleFocus(focusStatue) {
    this.setState({ focusStatue })
  }

  handleChange(time) {
    console.log("time:" + time)
    // this.setState(moment(time))
    this.props.onChange(time)
  }


  handleHourChange(hour) {
    this.setState({ hour })
  }

  handleMinuteChange(minute) {
    this.setState({ minute })
  }

  handleMeridienChange(meridien) {
    this.setState({ meridien })
  }


  setTime(value) {

    if (!value) return null

    let time

    if (typeof value === "string") {
      console.log("value == string: " + value)

      time = moment(value)

      if (!time.isValid()) time = moment()

    } else if (value instanceof moment) {
      console.log("value == moment: " + value)

      time = value

    } else {
      throw new TypeError("value must be a Moment instance or a valid string date")
    }

    return time
  }

  render() {

    const { value, readonly, ...rest } = this.props
    let { hour, minute, focusStatue } = this.state

    if (!hour && value) hour = this.setTime(value).format("HH")
    if (!minute && value) minute = this.setTime(value).format("mm")

    console.log("render(): hour: " + hour + " minute: " + minute)

    const time = hour + ":" + minute

    /*
    if (readonly) {
      return (
        <div>
          { (time) || " ??? " }
        </div>
      )
    }
    */
    if (readonly) {
      return <FormControl.Static { ...rest }>{ time }</FormControl.Static>
    }

    ["name", "onBlur", "onChange", "onDrop", "onFocus"].forEach(prop => delete rest[prop])

    return (
      <TimePicker
        theme="material"
        // theme="classic"

        time={ time }

        timeFormat="HH-MM"


        focused={ focusStatue }
        onFocusChange={ this.handleFocus }

        onTimeChange={ this.handleChange }

        onHourChange={ this.handleHourChange }
        onMinuteChange={ this.handleMinuteChange }

        onMeridiemChange={ this.handleMeridienChange }

        { ...rest }
      />
    )

  }

}

Clock.propTypes = {
  value : PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange : PropTypes.func,
  readonly : PropTypes.bool
}

export default Clock
