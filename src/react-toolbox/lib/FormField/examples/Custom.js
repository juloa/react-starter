import React from "react"
import PropTypes from "prop-types"
import { Tabs, Tab } from "react-bootstrap"
import FormField from "../../FormField"
import wrapForm from "./wrapForm"

const MyTabs = ({ value, onChange, ...rest }) => {

  delete rest.readonly
  delete rest.inline
  delete rest.disabled

  return (
    <Tabs
      id="mytabs"
      onSelect={ onChange }
      activeKey={ value }
      { ...rest }
    >
      <Tab eventKey="Alain" title="Alain">
        Hello Alain
      </Tab>
      <Tab eventKey="Yannick" title="Yannick">
        Hello Yannick
      </Tab>
    </Tabs>
  )
}

MyTabs.propTypes = {
  onChange : PropTypes.func,
  value : PropTypes.string
}


const MyCustomInput = () => (
  <FormField
    name="onglet"
    type={ MyTabs }
  />
)

const initialValues = {
  onglet : "Alain"
}

export default wrapForm(MyCustomInput, initialValues)
