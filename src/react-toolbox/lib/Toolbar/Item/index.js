import React from "react"
import PropTypes from "prop-types"
import { Glyphicon } from "react-bootstrap"
import classNames from "./style.module.css"
import { Link } from "react-router-dom"

class Item extends React.Component {

  constructor(props) {

    super(props)

    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.displaySubItems = this.displaySubItems.bind(this)

    this.state = { displaySubItems : false }
  }

  displaySubItems() {

    this.setState({ displaySubItems : true })
  }

  hideSubItems() {

    this.setState({ displaySubItems : false })
  }

  handleMouseOver() {

    if (!this.state.displaySubItems) {
      this.timeout = window.setTimeout(this.displaySubItems, this.props.delay)
    }

    if (this.props.onMouseOver) this.props.onMouseOver()
  }

  handleMouseOut(e) {

    if (this.node.contains(e.relatedTarget)) return

    window.clearTimeout(this.timeout)

    this.hideSubItems()

    if (this.props.onMouseOut) this.props.onMouseOut()
  }

  setIcon() {

    const { icon } = this.props

    if (typeof icon === "string") return <Glyphicon glyph={ icon } className={ classNames.icon }/>

    const className = classNames.icon + (icon.props.className ? " " + icon.props.className : "")

    return React.cloneElement(icon, { className })

  }

  /* eslint-disable max-statements */

  render() {

    const { className, children, label, orientation, dark, link, ...rest } = this.props
    const { displaySubItems } = this.state

    delete rest.delay
    delete rest.icon

    let classNameSubItems = classNames.subItems + " " + classNames[orientation]

    if (dark) classNameSubItems += " " + classNames.dark

    if (!displaySubItems) classNameSubItems += " " + classNames.hide

    let content

    if (link) {

      if (link.indexOf("http") === 0) {
        content = (<a href={ link } className={ classNames.link }>
          { this.setIcon() }<span className={ classNames.label }>{ label }</span>
        </a>)
      } else {
        content = (<Link to={ link } className={ classNames.link }>
          { this.setIcon() }<span className={ classNames.label }>{ label }</span>
        </Link>)
      }
    } else {
      content = <div>{ this.setIcon() }<span className={ classNames.label }>{ label }</span></div>
    }

    content = (
      <div className={ classNames.item }>
        { content }
        <div className={ classNameSubItems }>
          { children }
        </div>
      </div>
    )

    let itemClass = classNames.itemContainer

    itemClass += " " + (className ? className : "") + (dark ? " " + classNames.dark : "")

    return (
      <div
        className={ itemClass }
        { ...rest }
        onMouseOver={ this.handleMouseOver }
        onMouseOut={ this.handleMouseOut }
        ref={ node => this.node = node }
      >
        { content }
      </div>
    )

  }

}

/* eslint-enable max-statements */

Item.propTypes = {
  className : PropTypes.string,
  icon : PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label : PropTypes.string,
  children : PropTypes.node,
  orientation : PropTypes.oneOf(["row", "col"]),
  delay : PropTypes.number,
  dark : PropTypes.bool,
  link : PropTypes.string,
  onMouseOver : PropTypes.func,
  onMouseOut : PropTypes.func
}

Item.defaultProps = {
  delay : 0
}

export default Item
