import React from "react"
import FormField from "../"

import Text from "./Text"
import TextSource from "./Text.js?txt"

import Intl from "./Intl"
import IntlSource from "./Intl.js?txt"

import Addon from "./Addon"
import AddonSource from "./Addon.js?txt"

import Validation from "./Validation"
import ValidationSource from "./Validation.js?txt"

import Checkbox from "./Checkbox"
import CheckboxSource from "./Checkbox.js?txt"

import Switch from "./Switch"
import SwitchSource from "./Switch.js?txt"

import Select from "./Select"
import SelectSource from "./Select.js?txt"

import TextArea from "./TextArea"
import TextAreaSource from "./TextArea.js?txt"

import MultiSelect from "./MultiSelect"
import MultiSelectSource from "./MultiSelect.js?txt"

import Date from "./Date"
import DateSource from "./Date.js?txt"

import Time from "./Time"
import TimeSource from "./Time.js?txt"

import DateRange from "./DateRange"
import DateRangeSource from "./DateRange.js?txt"

import Group from "./Group"
import GroupSource from "./Group.js?txt"

import Tree from "./Tree"
import TreeSource from "./Tree.js?txt"

import Slider from "./Slider"
import SliderSource from "./Slider.js?txt"

import MultiSlider from "./MultiSlider"
import MultiSliderSource from "./MultiSlider.js?txt"

import Cascader from "./Cascader"
import CascaderSource from "./Cascader.js?txt"

import NumberInput from "./Number.js"
import NumberSource from "./Number.js?txt"

import Custom from "./Custom"
import CustomSource from "./Custom.js?txt"

import FullForm from "./FullForm"
import FullFormSource from "./FullForm.js?txt"

import ClockForm from "./ClockForm"
import ClockFormSource from "./ClockForm.js?txt"

/* import DueDate from "./DueDate"
import DueDateSource from "./DueDate.js?txt" */

export default {

  construct : FormField,

  path : "components/FormField",

  name : "FormField",

  descript : "Champs de formulaire pour redux-form.",

  states : {
    default : {
      render : () => <Text/>,
      fullCode : TextSource
    },
    intl : {
      render : () => <Intl/>,
      fullCode : IntlSource
    },
    addon : {
      render : () => <Addon/>,
      fullCode : AddonSource
    },
    validation : {
      render : () => <Validation/>,
      fullCode : ValidationSource
    },
    number : {
      render : () => <NumberInput/>,
      fullCode : NumberSource
    },
    checkbox : {
      render : () => <Checkbox/>,
      fullCode : CheckboxSource
    },
    switch : {
      render : () => <Switch/>,
      fullCode : SwitchSource
    },
    textarea : {
      render : () => <TextArea/>,
      fullCode : TextAreaSource
    },
    group : {
      render : () => <Group/>,
      fullCode : GroupSource
    },
    select : {
      render : () => <Select/>,
      fullCode : SelectSource
    },
    multiSelect : {
      render : () => <MultiSelect/>,
      fullCode : MultiSelectSource
    },
    date : {
      render : () => <Date/>,
      fullCode : DateSource
    },
    dateRange : {
      render : () => <DateRange/>,
      fullCode : DateRangeSource
    },
    time : {
      render : () => <Time/>,
      fullCode : TimeSource
    },
    tree : {
      render : () => <Tree/>,
      fullCode : TreeSource
    },
    cascader : {
      render : () => <Cascader/>,
      fullCode : CascaderSource
    },
    slider : {
      render : () => <Slider/>,
      fullCode : SliderSource
    },
    multiSlider : {
      render : () => <MultiSlider/>,
      fullCode : MultiSliderSource
    },
    custom : {
      render : () => <Custom/>,
      fullCode : CustomSource
    },
    FullForm : {
      render : () => <FullForm/>,
      fullCode : FullFormSource
    },
    ClockForm : {
      render : () => <ClockForm/>,
      fullCode : ClockFormSource
    }/* ,
    DueDate : {
      render : () => <DueDate/>,
      fullCode : DueDateSource
    }*/
  }
}
