import React from "react"
import PropTypes from "prop-types"
import classNames from "./style.module.css"
import { Panel } from "react-bootstrap"

export const Content = ({ title, children, ...rest }) => (
  <div { ...rest }>
    <div className={ classNames.divHeader }>
      <h1 className={ classNames.title }>{ title }</h1>
    </div>
    <div className={ classNames.divContent + " container-fluid" }>
      <Panel>
        <div className="container-fluid">
          { children }
        </div>
      </Panel>
    </div>
  </div>
)

Content.propTypes = {
  title : PropTypes.string,
  children : PropTypes.node
}

export default Content
