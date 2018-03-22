import React from "react"
import PropTypes from "prop-types"
import { Modal, Col, Row } from "react-bootstrap"

const ModalView = ({ condition, main, child }) => {

  if (condition === true && child) {
    return (
      <div>
        <Row>
          <Col md={ 12 }>
            { main }
          </Col>
        </Row>
        <Modal show>
          <Modal.Body>
            { child }
          </Modal.Body>
        </Modal>
      </div>
    )
  } else {
    return (
      <div>
        <Row>
          <Col md={ 12 }>
            { main }
          </Col>
        </Row>
      </div>
    )
  }
}

ModalView.propTypes = {
  main : PropTypes.object,
  child : PropTypes.object,
  condition : PropTypes.bool
}


ModalView.defaultProps = {
  condition : true
}

export default ModalView
