import React from "react"
import PropTypes from "prop-types"
import Section from "../Section/"

function findPropType(propType) {

  for (const typ in PropTypes) {

    if (propType === PropTypes[typ]) return typ
    else if (propType === PropTypes[typ].isRequired) return typ + " required"

  }

  return null

}

function findDefaultProp(construct, prop) {

  const { defaultProps } = construct

  let defaultValue = defaultProps && defaultProps[prop]

  if (typeof defaultValue === "function") defaultValue = defaultValue.toString()
  else if (defaultValue) defaultValue = JSON.stringify(defaultValue)

  return defaultValue ? ` (default : ${defaultValue})` : null

}

const Properties = ({ construct }) => (

  <Section title="Propriétés">
    <ul>{
      construct.propTypes && Object.keys(construct.propTypes).map(prop => (
        <li key={ "propType " + prop } >
          <strong>{ prop }</strong> : { findPropType(construct.propTypes[prop]) }
          { findDefaultProp(construct, prop) }
        </li>
      ))
    }</ul>
  </Section>
)

Properties.propTypes = { construct : PropTypes.func.isRequired }

export default Properties
