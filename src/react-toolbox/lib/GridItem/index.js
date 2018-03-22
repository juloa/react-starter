/* eslint react/prefer-stateless-function:0 */

import React from "react"
import PropTypes from "prop-types"
import { Panel } from "react-bootstrap"

const styles = {
  container : {
    margin : 5,
    display : "inline-block",
    textAlign : "center",
    marginRight : 10
  },
  header : {
    overflow : "hidden",
    textOverflow : "ellipsis"
  }
}

export default class GridItem extends React.Component {

  render() {

    const { header, footer, children, width, height, style, ...rest } = this.props

    return (
      <div style={ { ...styles.container, width, height, ...style } } { ...rest }>
        <Panel
          style={ { height, border : "1px solid #ddd" } }
          header={ typeof header === "string" ? <h3 style={ { ...styles.header } }>{ header }</h3> : header }
          bsStyle="warning"
          footer={ footer }
        >
          { children }
        </Panel>
      </div>
    )
  }

}

GridItem.propTypes = {
  header : PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  footer : PropTypes.node,
  style : PropTypes.object,
  children : PropTypes.node,
  width : PropTypes.number,
  height : PropTypes.number
}

GridItem.defaultProps = {
  width : 250,
  height : 300
}
