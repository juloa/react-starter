import React from "react"
import PropTypes from "prop-types"
import { FormControl, InputGroup } from "react-bootstrap"
import { injectIntl } from "react-intl"

export const Text = ({ placeholder, addon, intl, readonly, value, type, ...rest }) => {

  const placeholderMessage = (intl && placeholder && placeholder.id) ? intl.formatMessage(placeholder) : placeholder

  if (readonly) {

    let content = value

    if (type === "password") content = value.split("").map(() => "*")

    return <FormControl.Static { ...rest }>{ content }</FormControl.Static>

  }

  const formControl = (
    <FormControl
      placeholder={ placeholderMessage }
      type={ type }
      value={ value }
      { ...rest }
    />
  )

  if (addon) {

    return (
      <InputGroup>
        { addon && <InputGroup.Addon>{ addon }</InputGroup.Addon> }
        { formControl }
      </InputGroup>
    )

  } else return formControl

}

Text.propTypes = {
  input : PropTypes.object,
  placeholder : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type : PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  intl : PropTypes.object,
  addon : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  readonly : PropTypes.bool,
  value : PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default injectIntl(Text)
