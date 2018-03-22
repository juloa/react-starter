import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import Collapse from "react-bootstrap/lib/Collapse"
import Chevron from "../Chevron"

const styles = {

  link : {
    display : "flex",
    padding : 10,
    alignItems : "center",
    textDecoration : "none"
  },

  light : { color : "#333" },

  lightHover : {
    color : "#333",
    backgroundColor : "#F5F5F5",
    textDecoration : "none"
  },

  dark : { color : "rgba(163,175,183,.9)" },

  darkHover : {
    color : "rgba(255,255,255,.8)",
    backgroundColor : "#364248",
    textDecoration : "none"
  },

  li : {
    margin : 0,
    padding : 0
  },

  icon : {
    width : 20,
    textAlign : "left"
  },

  label : { flex : 1 }
}


export default class Item extends Component {

  constructor(props) {

    super(props)

    this.state = {
      collapsed : true,
      hover : false
    }

    this.toggle = this.toggle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)

  }

  handleMouseOver() {

    this.setState({ hover : true })

  }

  handleMouseOut() {

    this.setState({ hover : false })

  }

  toggle() {

    this.setState({ collapsed : !this.state.collapsed })

  }

  show() {

    this.setState({ collapsed : false })

  }

  hide() {

    this.setState({ collapsed : true })

  }

  componentWillMount() {

    if (this.props.collapsed !== this.state.collapsed) this.toggle()

  }


  createCollapse() {

    const { collapsed } = this.state

    return (
      <Collapse in={ !collapsed }>
        <div>
          { this.props.children }
        </div>
      </Collapse>
    )

  }

  createLabel() {

    return (
      <span style={ styles.label }>
        { this.props.label || this.props.children }
      </span>
    )

  }

  createSpanIcon() {

    const { icon } = this.props

    if (icon && typeof icon === "object") {

      return React.cloneElement(icon, { style : { ...styles.icon, ...icon.props.style } })

    } else return <span style={ styles.icon }>{ icon }</span>

  }

  createChevron() {

    const { collapsed } = this.state

    return <Chevron collapsed={ collapsed }/>

  }

  handleClick() {

    const { onClick, collapsible } = this.props

    if (collapsible) this.toggle()

    if (onClick) onClick()

  }

  getStyleLink() {

    const { dark } = this.props
    const { hover } = this.state

    return { ...styles.link, ...styles[(dark ? "dark" : "light") + (hover ? "Hover" : "")] }

  }

  createLink() {

    let { link, onClick } = this.props
    const spanIcon = this.createSpanIcon()
    const label = this.createLabel()

    if (link) {

      if (link.indexOf("http") === 0) {

        return (
          <a href={ link } onClick={ onClick } style={ this.getStyleLink() }>
            { spanIcon } { label }
          </a>
        )

      } else {

        return (
          <Link to={ link } style={ this.getStyleLink() } onClick={ onClick }>
            { spanIcon } { label }
          </Link>
        )

      }

    } else {

      return (
        <span role="button" style={ this.getStyleLink() } onClick={ this.handleClick }>
          { spanIcon } { label }
        </span>
      )

    }

  }

  createCollapseLink() {

    const { link } = this.props
    const chevron = this.createChevron()
    const spanIcon = this.createSpanIcon()
    const label = this.createLabel()

    if (link) {

      if (link.indexOf("http") === 0) {

        return (
          <a href={ link } onClick={ this.handleClick } style={ this.getStyleLink() }>
            { spanIcon } { label } { chevron }
          </a>
        )

      } else {

        return (
          <Link to={ link } onClick={ this.handleClick } style={ this.getStyleLink() }>
            { spanIcon } { label } { chevron }
          </Link>
        )

      }

    } else {

      return (
        <span role="button" onClick={ this.handleClick } style={ this.getStyleLink() }>
          { spanIcon } { label } { chevron }
        </span>
      )

    }

  }

  render() {

    let link, collapse

    if (this.props.collapsible) {

      link = this.createCollapseLink()
      collapse = this.createCollapse()

    } else {

      link = this.createLink()
      collapse = React.isValidElement(this.props.children) ? this.props.children : null

    }

    return (
      <li style={ styles.li } onMouseOver={ this.handleMouseOver } onMouseOut={ this.handleMouseOut }>
        { link }
        { collapse }
      </li>
    )

  }

}

Item.propTypes = {
  onClick : PropTypes.func,
  link : PropTypes.string,
  label : PropTypes.string,
  icon : PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  collapsed : PropTypes.bool,
  collapsible : PropTypes.bool,
  children : PropTypes.node,
  dark : PropTypes.bool,
  className : PropTypes.string
}
