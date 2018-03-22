import React, { Children } from "react"
import PropTypes from "prop-types"


const FlexBar = ({ children, style, margin, ...rest }) => {

  const nbButtons = Children.count(children)

  return (
    <div style={ { display : "flex", ...style } } { ...rest }>
      { Children.map(children, (child, i) => (
        React.cloneElement(child, {
          style : {
            flex : 1,
            marginRight : (i < nbButtons - 1) ? margin : 0,
            ...child.props.style
          }
        })
      )) }
    </div>
  )

}

FlexBar.propTypes = {
  children : PropTypes.node,
  style : PropTypes.object,
  margin : PropTypes.number
}

FlexBar.defaultProps = {
  margin : 10
}


export default FlexBar
