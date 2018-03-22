import React from "react"
import PropTypes from "prop-types"
import { Glyphicon } from "react-bootstrap"
import { connect } from "react-redux"
import { STATE_PROPERTY } from "restAPI/Auth/ducks"
import styles from "./styles"

const Icon = () => (
  <div style={ styles.icon }>
    <Glyphicon glyph="user" style={ styles.glyph }/>
  </div>
)

export const UserName = ({ name, icon, ...rest }) => {

  delete rest.dispatch

  return (
    <span { ...rest }>
      { icon && <Icon/> }
      { name }
    </span>
  )
}

UserName.propTypes = {
  style : PropTypes.object,
  name : PropTypes.string,
  icon : PropTypes.bool
}

function mapStateToProps(state) {

  const username = state[STATE_PROPERTY].get("username") || ""

  return {
    name : username.replace(/^(\w+?)\.(\w+?)(@.*?)$/, (s, s1, s2) => s1 + " " + s2)
  }

}

export default connect(mapStateToProps)(UserName)
