import React from "react"
import PropTypes from "prop-types"

class Form extends React.Component {

  renderChildren() {

    const { inline, children, readonly, labelWidth } = this.props

    return React.Children.map(children, child => (
      React.cloneElement(child, { inline, readonly, labelWidth, ...child.props })
    ))
  }

  render() {

    return (
      <form { ...this.props }>
        { this.renderChildren() }
      </form>
    )
  }

}

Form.propTypes = {
  children : PropTypes.node,
  inline : PropTypes.bool,
  readonly : PropTypes.bool,
  onSubmit : PropTypes.func,
  labelWidth : PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Form

