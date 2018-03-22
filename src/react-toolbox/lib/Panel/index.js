import React from "react"
import PropTypes from "prop-types"

import Button from "../Button"
import BsPanel from "react-bootstrap/lib/Panel"
import "./style.css?global"

import messages from "messages"

class Panel extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded : props.hasOwnProperty("expanded") ? props.expanded : true
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleToggle() {
    this.setState({ expanded : !this.state.expanded })
  }

  handleClose(onClose) {
    return e => {
      e.stopPropagation()
      onClose()
    }
  }

  render() {
    const { title, children, footer, onCloseUrl, icons, ...rest } = this.props
    const { expanded } = this.state
    const icon = expanded ? "resize-small" : "resize-full"

    delete rest.expanded

    const onCloseButton = onCloseUrl && (
      <Button
        icon="remove" compact
        bsStyle="transparent"
        className="rotate"
        label={ messages.close.defaultMessage } link={ onCloseUrl }
      />
    )

    const header = (
      <div className="no_underline pointer clearfix" onClick={ this.handleToggle }>
        { title }
        <div className="pull-right">
          <Button
            icon={ icon } compact
            bsStyle="transparent"
            className="rotate"
            label={ messages.collapse.defaultMessage }
          />
         { icons }{ onCloseButton }
        </div>
      </div>
    )

    return (
      <BsPanel
        collapsible
        header={ header }
        footer={ footer }
        expanded={ expanded }
        { ...rest }
      >
        { children }
      </BsPanel>
    )


  }

}

Panel.propTypes = {
  expanded : PropTypes.bool,
  title : PropTypes.node,
  footer : PropTypes.string,
  onCloseUrl : PropTypes.string,
  icons : PropTypes.array,
  children : PropTypes.node
}

Panel.defaultProps = {
  expanded : true,
  title : null,
  footer : null,
  onCloseUrl : null,
  icons : [],
  children : null
}

export default Panel
