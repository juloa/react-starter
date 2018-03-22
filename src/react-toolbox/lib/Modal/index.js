import React from "react"
import PropTypes from "prop-types"
import BsModal from "react-bootstrap/lib/Modal"

export default class Modal extends React.Component {

  constructor(props) {

    super(props)

    this.state = { visible : false }

    this.handleClose = this.handleClose.bind(this)

  }

  handleClose() {

    this.hide()

    if (this.props.onClose) this.props.onClose()

  }

  show() {

    this.setState({ visible : true })

  }

  hide() {

    this.setState({ visible : false })

  }


  render() {

    const { visible } = this.state
    const { title, children, footer, ...rest } = this.props

    delete rest.onClose

    return (
      <BsModal
        onHide={ this.handleClose }
        show={ visible }
        { ...rest }
      >
        { title && (
          <BsModal.Header closeButton>
            <BsModal.Title>{ title }</BsModal.Title>
          </BsModal.Header>
        ) }
        <BsModal.Body>
          { children }
        </BsModal.Body>
        { footer ? <BsModal.Footer>{ footer }</BsModal.Footer> : "" }
      </BsModal>
    )

  }

}

Modal.propTypes = {
  title : PropTypes.string,
  onClose : PropTypes.func,
  children : PropTypes.node,
  footer : PropTypes.node
}
