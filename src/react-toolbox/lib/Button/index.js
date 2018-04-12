import React from "react"
import PropTypes from "prop-types"
import { Glyphicon, Button as BButton } from "react-bootstrap"
import OverlayTooltip from "react-starter/src/react-toolbox/lib/OverlayTooltip"
import { Link } from "react-router-dom"
import styles from "./styles"
import classes from "./classes.module.css"
import { injectIntl } from "react-intl"

const Button = ({
  children,
  bsStyle,
  icon,
  style,
  rounded,
  compact,
  link,
  label,
  labelValues,
  intl,
  className,
  ...rest }) => {

  let labelText

  if (label) {

    if (typeof label === "string") labelText = label
    else if (label.id && label.defaultMessage) labelText = intl.formatMessage(label, labelValues)

  } else labelText = children

  const transparent = bsStyle === "transparent"

  let button = (
    <BButton
      bsStyle={ transparent ? null : bsStyle }
      style={ {
        ...styles.button,
        ...(rounded && compact ? styles.rounded : null),
        ...style
      } }
      className={ className + " " + (transparent && classes.invisible) }
      { ...rest }
    >
      { icon && <Glyphicon glyph={ icon }/> }
      { " " }
      { !compact && labelText }
    </BButton>
  )

  if (link) button = <Link to={ link }>{ button }</Link>

  if (!compact) return button

  return labelText ? (
    <OverlayTooltip
      placement="bottom"
      delay={ 200 }
      tip={ labelText }
    >
      { button }
    </OverlayTooltip>
  ) : button
}

Button.propTypes = {
  bsStyle : PropTypes.string,
  icon : PropTypes.string,
  rounded : PropTypes.bool,
  children : PropTypes.node,
  style : PropTypes.object,
  compact : PropTypes.bool,
  link : PropTypes.string,
  className : PropTypes.string,
  label : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  labelValues : PropTypes.object,
  intl : PropTypes.object
}

export default injectIntl(Button)
