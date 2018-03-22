import React from "react"
import PropTypes from "prop-types"
import classNames from "./style.module.css"
import Header from "./Header"
import MainArea from "./MainArea"

import "./font.css"

const Main = ({
  children,
  header,
  sidebar,
  sidebarWidth,
  className,
  ...rest
}) => {

  for (const n in Main.propTypes) delete rest[n]
  delete rest.dispatch

  let sidebarMenu = null

  if (sidebar) {
    sidebarMenu = (
      <div className={ classNames.sidebar } tag="aside" style={ { minWidth : sidebarWidth } }>
        { sidebar }
      </div>
    )
  }

  return (
    <div id="outerContainer">
      <div className={ classNames.pageWrap + " " + classNames.background } id="pageWrap">
        <Header>{ header }</Header>
        <div className={ classNames.container + (className ? " " + className : "") }>
          { sidebarMenu }
          <MainArea>
            { children }
          </MainArea>
        </div>
      </div>
    </div>
  )

}

Main.propTypes = {
  header : PropTypes.node,
  sidebar : PropTypes.node,
  sidebarWidth : PropTypes.number,
  children : PropTypes.node,
  contentTitle : PropTypes.string,
  className : PropTypes.string
}

Main.defaultProps = {
  sidebarWidth : 260
}

export default Main
