import React, { Component } from "react"
import PropTypes from "prop-types"

const styles = {
  affix : {
    position : "fixed",
    top : 0,
    zIndex : 1
  },
  hidden : { visibility : "hidden" }
}

export default class Affix extends Component {

  constructor(props) {

    super(props)

    this.state = { affix : false }

    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {

    window.addEventListener("scroll", this.handleScroll)

    this.offset = this.node.getBoundingClientRect().top + window.scrollY

  }

  componentWillUnmount() {

    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll() {

    this.setState({ affix : window.scrollY + this.props.offset >= this.offset })
  }

  render() {

    const { affix } = this.state
    const { children, style, className, affixClassName, affixStyle, offset, ...rest } = this.props

    styles.affix.top = offset

    return (
      <div style={ style }>
        { affix && (
          <div
            style={ { ...style, ...styles.hidden } }
            { ...rest }
          >
            { children }
          </div>
        ) }
        <div
          style={ { ...style, ...(affix ? { ...styles.affix, ...affixStyle } : null) } }
          className={ (affix ? affixClassName : "") + (className ? " " + className : "") }
          ref={ node => this.node = node }
          { ...rest }
        >
          { children }
        </div>
      </div>
    )
  }

}


Affix.propTypes = {
  className : PropTypes.string,
  children : PropTypes.node,
  style : PropTypes.object,
  affixClassName : PropTypes.string,
  affixStyle : PropTypes.object,
  offset : PropTypes.number
}

Affix.defaultProps = {
  offset : 0
}
