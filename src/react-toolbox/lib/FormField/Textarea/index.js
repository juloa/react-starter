import React from "react"
import PropTypes from "prop-types"
import { FormControl } from "react-bootstrap"
import { injectIntl } from "react-intl"

const style = {
  border : "none",
  background : "none",
  fontFamily : "inherit",
  padding : 0,
  margin : 0,
  fontSize : "inherit"
}

export const TextArea = ({ placeholder, value, intl, readonly, resize, ...rest }) => {

  const placeholderMessage = (intl && placeholder && placeholder.id) ? intl.formatMessage(placeholder) : placeholder

  if (readonly) {

    return (
      <FormControl.Static { ...rest }>
        <pre style={ style }>{ value }</pre>
      </FormControl.Static>
    )

  }

  let cssResize

  if (typeof resize === "boolean") cssResize = resize ? "both" : "none"
  else cssResize = resize

  return (
    <FormControl
      placeholder={ placeholderMessage }
      componentClass="textarea"
      value={ value }
      style={ { resize : cssResize } }
      { ...rest }
    />
  )

}

TextArea.propTypes = {
  placeholder : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  intl : PropTypes.object,
  readonly : PropTypes.bool,
  value : PropTypes.string,
  resize : PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}

export default injectIntl(TextArea)
