import React from "react"
import PropTypes from "prop-types"

import { Tabs, Tab } from "react-bootstrap"
// import FormField from "../"


// class RadioTabs extends Component {
const RadioTabs = ({ value, onChange }) => {

  return (

    <div>

      <Tabs
        activeKey={ value }
        onSelect={ onChange }
      >
        <Tab
          eventKey="SECONDLY" title="Secondly"
        >
          <p>SECONDLY...</p>

        </Tab>
        <Tab
          eventKey="MINUTELY" title="Minutely"
        >
          <p>MINUTELY...</p>
        </Tab>
        <Tab
          eventKey="HOURLY" title="Hourly"
        >
          <p>HOURLY...</p>
        </Tab>
        <Tab
          eventKey="DAILY" title="Daily"
        >
          <p>DAILY...</p>
        </Tab>
        <Tab
          eventKey="WEEKLY" title="Weekly"
        >
          <p>WEEKLY...</p>
        </Tab>
        <Tab
          eventKey="MONTHLY" title="Monthly"
        >
          <p>MONTHLY...</p>
        </Tab>
        <Tab
          eventKey="YEARLY" title="Yearly"
        >
          <p>YEARLY...</p>
        </Tab>
      </Tabs>

    </div>

  )


}

RadioTabs.propTypes = {
  value : PropTypes.string.isRequired,
  onChange : PropTypes.func
}


export default RadioTabs

