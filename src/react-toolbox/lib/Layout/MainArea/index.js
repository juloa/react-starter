import React from "react"
import PropTypes from "prop-types"
import classNames from "./style.module.css"

export const MainArea = ({ children, ...rest }) => (
  <div { ...rest } className={ classNames.main }>
    { children }
  </div>
)

MainArea.propTypes = {
  children : PropTypes.node
}

export default MainArea
