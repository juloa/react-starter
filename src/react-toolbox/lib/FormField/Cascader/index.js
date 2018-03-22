import React, { Children } from "react"
import PropTypes from "prop-types"
import { FormControl } from "react-bootstrap"
import { injectIntl } from "react-intl"
import RCCascader from "rc-cascader"
import "rc-cascader/assets/index.css"
import "./style.css"

export const CascaderSelect = ({
  placeholder,
  intl,
  readonly,
  value,
  children,
  options,
  separator,
  onChange,
  onBlur,
  disabled,
  ...rest
}) => {

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

  const _value = Array.isArray(value) ? value : value.split(separator)

  function handleChange(val) {
    if (onChange) onChange( Array.isArray(val) ? val : val.split(separator) )
  }

  function handleBlur(e) {
    if (onBlur) onBlur(e.target.value.split(separator))
  }

  return (
    <RCCascader
      value={ _value }
      options={ optionsObj }
      onChange={ handleChange }
      onBlur={ handleBlur }
      disabled={ disabled }
      { ...rest }
    >
      <FormControl
        value={ _value.join(separator) }
        placeholder={ placeholderMessage }
        disabled={ disabled }
        style={ disabled ? null : { backgroundColor : "white" } }
        readOnly
      />
    </RCCascader>
  )

}

CascaderSelect.propTypes = {
  placeholder : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  intl : PropTypes.object,
  readonly : PropTypes.bool,
  value : PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  children : PropTypes.node,
  options : PropTypes.array,
  separator : PropTypes.string,
  onChange : PropTypes.func,
  onBlur : PropTypes.func,
  disabled : PropTypes.bool
}

CascaderSelect.defaultProps = {
  separator : " - "
}

export default injectIntl(CascaderSelect)
