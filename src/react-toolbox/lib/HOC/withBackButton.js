import React from "react"
import PropTypes from "prop-types"
import Button from "react-starter/src/react-toolbox/lib/Button"
import { connect } from "react-redux"
// import { push } from "react-router-redux"
import { withRouter } from "react-router-dom"

export default (url, Component) => {

  const WithBackButton = ({ onClick, ...rest }) => {

    return (
      <div>
        <Button
          onClick={ onClick }
          label="Retour"
          icon="arrow-left"
          style={ { marginBottom : 30 } }
        />
        <br/>
        <Component { ...rest }/>
      </div>
    )
  }

  WithBackButton.propTypes = {
    onClick : PropTypes.func
  }

  WithBackButton.displayName = `WithBackButton(${Component.displayName || Component.name})`

  function mapDispatchToProps(dispatch, ownProps) {

    return {
      onClick() { ownProps.history.push(url) } // dispatch(push(url)) }
    }
  }

  return withRouter(connect(null, mapDispatchToProps)(WithBackButton))
}
