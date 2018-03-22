import React, { Children } from "react"
import PropTypes from "prop-types"
import { FormControl } from "react-bootstrap"
import { injectIntl } from "react-intl"
import RCTreeSelect from "rc-tree-select"
import "rc-tree-select/assets/index.css"
import "./style.css"

export const TreeSelect = ({ placeholder, intl, readonly, value, children, options, ...rest }) => {

  const placeholderMessage = (intl && placeholder && placeholder.id) ? intl.formatMessage(placeholder) : placeholder

  if (readonly) return <FormControl.Static { ...rest }>{ value }</FormControl.Static>

  const optionsObj = options || Children.map(children, function processChild(child) {

    const multi = Children.count(child.props.children) > 1

    const label = child.props.label || (!multi && child.props.children)

    const item = {
      label,
      value : child.props.value || label,
      disabled : Boolean(child.props.disabled)
    }

    if (multi) item.children = Children.map(child.props.children, processChild)

    return item
  })

  const _value = (rest.multiple && !Array.isArray(value)) ? [value] : value

  return (
    <RCTreeSelect
      placeholder={ placeholderMessage }
      value={ _value }
      treeData={ optionsObj }
      showSearch={ false }
      { ...rest }
    />
  )

}

TreeSelect.propTypes = {
  placeholder : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  intl : PropTypes.object,
  readonly : PropTypes.bool,
  value : PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  children : PropTypes.node,
  options : PropTypes.array
}

export default injectIntl(TreeSelect)
