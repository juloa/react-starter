import React from "react"
import PropTypes from "prop-types"
import Select from "./Select"
import Date from "./Dates/Date"
import DateRange from "./Dates/DateRange"
import Checkbox from "./Checkbox"
import Radio from "./Radio"
import Group from "./Group"
import Switch from "./Switch"
import Textarea from "./Textarea"
import Text from "./Text"
import Tree from "./Tree"
import Slider from "./Slider"
import Time from "./Time"
import Cascader from "./Cascader"
import NumberInput from "./Number"

import RadioTabs from "./RadioTabs"
import Clock from "./Clock"


export const InputField = ({ type, ...rest }) => {

  let Constructor

  switch (type) {


  case "clock" :

    Constructor = Clock
    delete rest.label
    break

  case "radiotabs" :

    Constructor = RadioTabs
    delete rest.label
    break

  case "date" :

    Constructor = Date
    delete rest.label
    break

  case "date-range" :

    Constructor = DateRange
    delete rest.label
    break

  case "time" :

    Constructor = Time
    break

  case "select" :

    Constructor = Select
    break

  case "checkbox" :

    Constructor = Checkbox
    break

  case "radio" :

    Constructor = Radio
    break

  case "group" :

    Constructor = Group
    break

  case "switch" :

    Constructor = Switch
    break

  case "textarea" :

    Constructor = Textarea
    break

  case "tree-select" :

    Constructor = Tree
    break

  case "cascader-select" :

    Constructor = Cascader
    break

  case "slider" :

    Constructor = Slider
    break

  case "number" :

    Constructor = NumberInput
    break

  default :

    if (typeof type === "function") {
      Constructor = type
    } else {
      Constructor = Text
      rest.type = type
    }

  }

  return <Constructor { ...rest }/>

}

InputField.propTypes = {
  type : PropTypes.oneOfType([PropTypes.string, PropTypes.func])
}

export default InputField
