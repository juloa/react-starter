import React from "react"

import { Button, Glyphicon } from "react-bootstrap"


const GlyphButton = ( { children, text, glyph, submitting, ...buttonProps } ) => (
  <Button { ...buttonProps } disabled={ submitting }>
    { glyph && <Glyphicon glyph={ glyph } /> }
    { ' ' }
    { submitting ? <i> submitting</i> : text || children }
  </Button>
)

GlyphButton.propTypes = {
  children : React.PropTypes.node,
  text : React.PropTypes.string,
  glyph : React.PropTypes.string,
  submitting : React.PropTypes.bool
}

export default GlyphButton
