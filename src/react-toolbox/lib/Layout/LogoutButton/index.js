import React from "react"
import PropTypes from "prop-types"
import Button from "react-starter/src/react-toolbox/lib/Button"
import { connect } from "react-redux"
import { logout } from "react-starter/src/restAPI/Auth/ducks"

export const LogoutButton = ({ onClick, children, icon, ...rest }) => (
  <Button
    bsStyle="default"
    icon={ icon ? "log-out" : null }
    onClick={ onClick }
    { ...rest }
  >
    { children }
  </Button>
)

LogoutButton.propTypes = {
  onClick : PropTypes.func,
  icon : PropTypes.bool,
  children : PropTypes.node
}

LogoutButton.defaultProps = {
  icon : false
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick(e) {
    dispatch(logout())
    if (ownProps.onClick) ownProps.onClick(e)
  }
})

export default connect(null, mapDispatchToProps)(LogoutButton)
