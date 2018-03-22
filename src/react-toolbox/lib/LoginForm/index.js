import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { login, STATE_PROPERTY } from "restAPI/Auth/ducks"
import { Button, FormControl, Form, Alert } from "react-bootstrap"
import styles from "./styles"
import Spinner from "react-toolbox/lib/Spinner"

class LoginForm extends React.Component {

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

    const { style, isFetching, fetchError, ...rest } = this.props
    const { username, password, remember } = this.state

    delete rest.dispatch

    return (

      <Form { ...rest } style={ { ...styles.form, ...style } } onSubmit={ this.handleSubmit }>

        <FormControl
          style={ { ...styles.input, ...styles.email } }
          value={ username }
          type="text"
          placeholder="username"
          onChange={ this.handleChangeUserName }
          required
        />

        <FormControl
          style={ { ...styles.input, ...styles.password } }
          value={ password }
          type="password"
          placeholder="password"
          onChange={ this.handleChangePassword }
          required
        />

        <label style={ styles.checkbox }>
          <input
            type="checkbox"
            value="remember-me"
            checked={ remember }
            onChange={ this.handleChangeRemember }
          />
          &nbsp;
          Remember me
        </label>

        <Button
          bsStyle="primary"
          bsSize="large"
          block
          type="submit"
          disabled={ isFetching }
        >
          { isFetching ? <Spinner style={ styles.spinner } color="white"/> : "Submit" }
        </Button>

        { fetchError ? <Alert bsStyle="danger" style={ styles.alert }>{ fetchError }</Alert> : null }

      </Form>
    )

  }

}

LoginForm.propTypes = {
  style : PropTypes.object,
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

export default connect(mapStateToProps)(LoginForm)
