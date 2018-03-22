import React from "react"
import { connect } from "react-redux"
import { STATE_PROPERTY } from "restAPI/Auth/ducks"
import LoginPage from "react-toolbox/lib/LoginPage"
import { withRouter } from 'react-router-dom'

const AuthChecker = ({ logged, children }) => (
  <div>
    { logged ? <div>{ children }</div> : <LoginPage/> }
  </div>
)


function mapStateToProps(state) {

  const token = state[STATE_PROPERTY].get("token")

  return {
    logged : Boolean(token)
  }

}

export default withRouter(connect(mapStateToProps)(AuthChecker))


