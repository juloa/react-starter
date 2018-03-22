import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Select from "../Select"
import { STATE_PROPERTY, fetchAllIfNeeded } from "./ducks"
import Glyphicon from "react-bootstrap/lib/Glyphicon"

// @see https://www.utf8icons.com
const IconFromUTF8 = ({ size, children }) => <b style={ { fontSize : `${size}px` } } >{ children }</b>

IconFromUTF8.propTypes = {
  children : PropTypes.node,
  size : PropTypes.number
}
IconFromUTF8.defaultProps = { size : 20 }

export const icons = {
  email : {
    utf8 : <IconFromUTF8>📧</IconFromUTF8>,
    icon : <Glyphicon glyph="envelope" />,
    description : "Email",
    defaultEFs : ["email"]
  },
  ftp : {
    utf8 : <IconFromUTF8>💽</IconFromUTF8>,
    icon : <Glyphicon glyph="hdd" />,
    description : "FTP server",
    defaultEFs : ["hostname"]
  },
  phone : {
    utf8 : <IconFromUTF8>📱</IconFromUTF8>,
    icon : <Glyphicon glyph="phone" />,
    description : "Phone",
    defaultEFs : ["phone_number"]
  },
  postal : {
    utf8 : <IconFromUTF8>🏠</IconFromUTF8>,
    icon : <Glyphicon glyph="map-marker" />,
    description : "Postal address",
    defaultEFs : ["street", "zipcode"]
  }
}

function mapStateToProps(state) {

  const list = state[STATE_PROPERTY].get("list").toJS()

  return {
    options : list.map(item => ({ label : item.name, value : item.name })),
    name : "protocol"
  }
}

function mapDispatchToProps(dispatch) {

  return {
    onMount() { dispatch(fetchAllIfNeeded()) }
  }
}

const Component = connect(mapStateToProps, mapDispatchToProps)(Select)

Component.displayName = "ProtocolSelect"

export default Component
