import React from "react"
import PropTypes from "prop-types"

import { OverlayTrigger, Tooltip } from "react-bootstrap"

const OverlayTooltip = ({ tip, placement, children, ...rest }) => {

  const tooltip = <Tooltip id={ "tooltip" + Math.random() }>{ tip }</Tooltip>

  return (
    <OverlayTrigger placement={ placement } overlay={ tooltip } { ...rest } >
      { children }
    </OverlayTrigger>
  )
}

OverlayTooltip.propTypes = {
  tip : PropTypes.any,
  placement : PropTypes.string,
  children : PropTypes.node
}


export default OverlayTooltip
