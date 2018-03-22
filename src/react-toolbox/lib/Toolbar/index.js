import React from "react"
import PropTypes from "prop-types"
import Item from "./Item"
import classNames from "./style.module.css"
import TreeMenu from "react-toolbox/lib/TreeMenu"

const renderItems = (items, dark) => (
  items.map((item, i) => (
    <Item
      icon={ item.icon }
      label={ item.label }
      key={ "item" + item.label + i }
      link={ item.link }
    >
      <TreeMenu items={ item.items } dark={ dark }/>
    </Item>
  ))
)

const Toolbar = ({ className, children, dark, items, orientation, ...rest }) => {

  const fullClassNames = [
    classNames.toolbar,
    classNames[orientation],
    dark && classNames.dark,
    className
  ]

  const childrenItems = items ? renderItems(items, dark) : children

  return (
    <div className={ fullClassNames.join(" ") } { ...rest }>
      <div className={classNames.backgroundToolbar} />
      { childrenItems.map((item, key) => React.cloneElement(item, { dark, orientation, key })) } 
    </div>
  )
}

Toolbar.Item = Item

Toolbar.propTypes = {
  className : PropTypes.string,
  children : PropTypes.node,
  dark : PropTypes.bool,
  items : PropTypes.array,
  orientation : PropTypes.oneOf(["row", "col"])
}

Toolbar.defaultProps = {
  orientation : "col"
}

export default Toolbar
