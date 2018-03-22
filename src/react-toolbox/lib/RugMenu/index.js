import React from "react"
import PropTypes from "prop-types"
import ReactDOM from "react-dom"
import throttle from "lodash/throttle"
import { Glyphicon, NavDropdown, Nav } from "react-bootstrap"

const styles = { kebab : { paddingRight : 120 } }

export default class RugMenu extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      menuContainerWidth : null,
      elementWidths : null
    }

    this.onResize = throttle(this.setMenuContainerWidth.bind(this), 200, { leading : false })

  }

  getMenuContainerWidth() {

    const parent = ReactDOM.findDOMNode(this).parentElement

    const style = window.getComputedStyle(parent, null)

    const width = Math.floor(parseFloat(style.getPropertyValue("width")))

    const kebabRef = this.kebabMenu

    return width - (kebabRef ? ReactDOM.findDOMNode(kebabRef).offsetWidth : 0)

  }

  setMenuContainerWidth() {

    this.setState({ menuContainerWidth : this.getMenuContainerWidth() })

  }

  getElementWidths() {

    const domNode = ReactDOM.findDOMNode(this)

    return Array.prototype.map.call(domNode.children, child => child.offsetWidth)

  }

  setElementWidths() {

    this.setState({ elementWidths : this.getElementWidths() })

  }

  componentDidMount() {

    window.addEventListener("resize", this.onResize, false)

    this.setMenuContainerWidth()

    if (this.props.children.length) this.setElementWidths()

  }

  componentDidUpdate(prevProps) {

    const prevNbItems = prevProps.children.length
    const nbItems = this.props.children.length
    const prevWidth = this.state.menuContainerWidth
    const width = this.getMenuContainerWidth()

    if (prevNbItems !== nbItems) this.setElementWidths()
    if (prevWidth !== width) this.setMenuContainerWidth()

  }

  componentWillUnmount() {

    window.removeEventListener("resize", this.onResize, false)

  }

  render() {

    const { menuContainerWidth, elementWidths } = this.state
    const { children, ...rest } = this.props

    let menuItems = []
    const kebabMenuItems = []
    let kebabMenu = null

    if (elementWidths) {

      let accWidth = 0

      React.Children.map(children, (element, index) => {

        if (React.isValidElement(element)) {

          const copy = React.cloneElement(element, { key : "__" + index })

          accWidth += elementWidths[index]
          if (accWidth <= menuContainerWidth) {

            menuItems.push(copy)

          } else kebabMenuItems.push(copy)

        }

        if (kebabMenuItems.length) {

          kebabMenu = (

            <NavDropdown
              ref={ node => this.kebabMenu = node }
              title={ <Glyphicon glyph="option-vertical"/> }
              id="nav-dropdown"
              style={ styles }
              noCaret
            >
              { kebabMenuItems }
            </NavDropdown>
          )

        } else this.kebabMenu = null

      })

    } else menuItems = children

    return (
      <Nav
        bsStyle="tabs"
        { ...rest }
      >
        { menuItems }
        { kebabMenu }
      </Nav>
    )

  }

}

RugMenu.propTypes = { children : PropTypes.node }
