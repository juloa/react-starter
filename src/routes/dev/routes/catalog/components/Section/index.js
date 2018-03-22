import React, { Component } from "react"
import PropTypes from "prop-types"
import Collapse from "react-collapse"
import Glyphicon from "react-bootstrap/lib/Glyphicon"
import classNames from "./style.module.css"


const Chevron = ({ collapsed }) => (
  <Glyphicon glyph="menu-right" className={ collapsed ? classNames.closed : classNames.open }/>
)

Chevron.propTypes = { collapsed : PropTypes.bool }


export default class Section extends Component {

  constructor(props) {

    super(props)

    this.state = { collapsed : false }

    this.handleClick = this.handleClick.bind(this)

  }

  handleClick() {

    this.setState({ collapsed : !this.state.collapsed })

  }

  render() {

    const { collapsed } = this.state
    const { title, children } = this.props

    let content = null

    if (children) {

      content = (
        <Collapse isOpened={ !collapsed }>
          { children }
        </Collapse>
      )

    }

    return (
      <section className={ classNames.section }>
        <h4 onClick={ this.handleClick } className={ classNames.title }>
          <Chevron collapsed={ collapsed }/>
          { title }
        </h4>
        { content }
      </section>
    )

  }

}

Section.propTypes = {
  children : PropTypes.node,
  title : PropTypes.string.isRequired
}
