import React from "react"
import PropTypes from "prop-types"
import "perfect-scrollbar/css/perfect-scrollbar.css"
import Ps from "perfect-scrollbar"

export default class Scrollbar extends React.Component {

  componentDidMount() {

    const ps = new Ps(this.div)
    this.setState({ps})
  }

  componentDidUpdate() {

    this.state.ps.update(this.div)

  }

  componentWillUnMount() {

    this.state.ps.destroy(this.div)

  }

  render() {

    const style = {
      position : "relative",
      height : "100%",
      overflow : "hidden",
      ...(this.props.style || {})
    }

    const htmlProps = { ...this.props }

    for (const n in Scrollbar.propTypes) delete htmlProps[n]

    return React.createElement(
      this.props.tag,
      { ...htmlProps, style, ref : node => (this.div = node) },
      this.props.children
    )

  }

}

Scrollbar.propTypes = {
  tag : PropTypes.string,
  style : PropTypes.object,
  children : PropTypes.node
}

Scrollbar.defaultProps = { tag : "div" }
