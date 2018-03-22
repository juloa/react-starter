import React, { Component, Children } from "react"
import PropTypes from "prop-types"
import Item from "./Item/"


const styles = {
  ul : {
    margin : 0,
    padding : 0,
    listStyleType : "none"
  },
  dark : { backgroundColor : "#263238" },
  sub : { paddingLeft : 22 }
}

export default class TreeMenu extends Component {

  constructor(props) {

    super(props)

    this.renderItemfromObject = this.renderItemfromObject.bind(this)
    this.renderItemfromElmt = this.renderItemfromElmt.bind(this)

  }

  renderItemfromElmt(elmt) {

    const { dark, classItem } = this.props

    let child = elmt.props.children

    if (React.isValidElement(child)) {

      child = React.cloneElement(child, { dark, style : { ...styles.sub, ...child.props.style } })

    }

    return React.cloneElement(elmt, { dark, className : classItem }, child)

  }

  renderItemfromObject(item, i) {

    const { link, label, icon, collapsed, collapsible, items, onClick } = item
    const { dark, classItem } = this.props

    if (items && items.length > 0) {

      return (

        <Item key={ "item" + i }
          link={ link }
          label={ label }
          icon={ icon }
          onClick={ onClick }
          collapsed={ collapsed }
          dark={ dark }
          className={ classItem }
          collapsible={ typeof collapsible === "undefined" ? true : collapsible }
        >
          <TreeMenu
            style={ styles.sub }
            items={ items }
            dark={ dark }
            classItem={ classItem }
          />

        </Item>
      )

    } else {

      return (
        <Item
          key={ "item" + i }
          link={ link }
          icon={ icon }
          label={ label }
          dark={ dark }
          className={ classItem }
          onClick={ onClick }
        />
      )

    }

  }

  render() {

    const { style, dark, items, children, ...rest } = this.props

    for (const n in TreeMenu.propTypes) delete rest[n]

    let content

    if (items && items.length) {

      content = items.map(this.renderItemfromObject)

    } else if (children) {

      content = Children.toArray(children).map(this.renderItemfromElmt)

    }

    return (
      <ul { ...rest } style={ { ...styles.ul, ...(dark ? styles.dark : null), ...style } }>
        { content }
      </ul>
    )

  }

}

TreeMenu.Item = Item

export { Item }

TreeMenu.propTypes = {
  style : PropTypes.object,
  items : PropTypes.array,
  children : PropTypes.node,
  className : PropTypes.string,
  classItem : PropTypes.string,
  dark : PropTypes.bool
}
