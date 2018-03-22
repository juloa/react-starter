/* eslint react/prop-types:0 */
import React from "react"
import { Modal } from "react-bootstrap"

export const modalWrapper = (OriginalComponent, afterClose = () => null) => {

  class ModalWrapper extends React.Component {

    constructor() {
      super()
      this.state = { show : true }
    }

    handleClose() {
      this.setState( { show : false } )
      window.setTimeout( afterClose, 500 )
    }

    render() {
      return (
        <Modal show={ this.state.show }>
          <Modal.Body>
            <OriginalComponent { ...this.props } />
          </Modal.Body>
        </Modal>
      )
    }

  }

  ModalWrapper.displayName = `ModalWrapper(${OriginalComponent.displayName || OriginalComponent.name})`

  return ModalWrapper

}

export default modalWrapper
