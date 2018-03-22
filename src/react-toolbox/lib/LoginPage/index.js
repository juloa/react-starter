import React from "react"
import PropTypes from "prop-types"
import { name, version } from "../../../../package.json"
import { connect } from "react-redux"

import { login, STATE_PROPERTY } from "restAPI/Auth/ducks"
import { Button, FormControl, Form, Alert } from "react-bootstrap"
import Spinner from "react-toolbox/lib/Spinner"

import classNames from "./styles.module.css"
import classNames2 from "assets/mfi/custom.module.css"

// import DocumentTitle from "react-document-title" // <DocumentTitle title="Metronome : login">

class LoginPage extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      username : "",
      password : "",
      remember : false
    }

    const methods = ["handleChangePassword", "handleChangeUserName", "handleChangeRemember", "handleSubmit"]

    methods.forEach(m => this[m] = this[m].bind(this))

  }

  handleChangePassword(e) {
    this.setState({ password : e.target.value })
  }

  handleChangeUserName(e) {
    this.setState({ username : e.target.value })
  }

  handleChangeRemember(e) {
    this.setState({ remember : e.target.checked })
  }

  handleSubmit(e) {
    e.preventDefault()

    const { username, password, remember } = this.state

    this.props.dispatch(login(username, password, remember))
  }

  render() {

    const { isFetching, fetchError, ...rest } = this.props
    const { username, password, remember } = this.state

    delete rest.dispatch

    return (
      <div className={ classNames.loginPage }>

        <div className={ classNames.rosas } />
        <div className={ classNames.bleuet } />

        <div className={ classNames.toolbar }>
          <span className={ classNames.ico + " " + classNames.info } />
          <span className={ classNames.ico + " " + classNames.config } />
        </div>
        <div className={ classNames.description }>
          <p />
        </div>


        <div className={ classNames2.loginTitleBox }>
          <div className={ classNames.title }>{ name }</div>
          <div className={ classNames.titleDescription }>Synopsis Production Module</div>
          <div className={ classNames.titleVersion }>{ version }</div>
        </div>

        <div className={ classNames.loginForm }>
          <Form onSubmit={ this.handleSubmit }>

            <label>Username</label>
            <FormControl
              value={ username }
              type="text"
              placeholder="username"
              onChange={ this.handleChangeUserName }
              required
            />

            <label>Password</label>
            <FormControl
              value={ password }
              type="password"
              placeholder="password"
              onChange={ this.handleChangePassword }
              required
            />

            <input
              type="checkbox"
              value="remember-me"
              checked={ remember }
              onChange={ this.handleChangeRemember }
            />
            &nbsp;
            <span>
            Remember me
            </span>

            <Button
              bsStyle="primary"
              bsSize="large"
              block
              type="submit"
              disabled={ isFetching }
            >
              { isFetching ? <Spinner color="white"/> : "Submit" }
            </Button>

            { fetchError ? <Alert bsStyle="danger">{ fetchError }</Alert> : null }

          </Form>
        </div>

        <div className={ classNames.logoMfi } />
        <div className={ classNames2.loginLogoCustomer } />
        <div className={ classNames.earth } />
      </div>)
  }

}

LoginPage.propTypes = {
  dispatch : PropTypes.func,
  username : PropTypes.string,
  password : PropTypes.string,
  remember : PropTypes.bool,
  isFetching : PropTypes.bool,
  fetchError : PropTypes.string
}


function mapStateToProps(state) {

  const dataStore = state[STATE_PROPERTY]

  return {
    isFetching : dataStore.get("isFetching"),
    fetchError : dataStore.get("fetchError")
  }

}

export default connect(mapStateToProps)(LoginPage)

