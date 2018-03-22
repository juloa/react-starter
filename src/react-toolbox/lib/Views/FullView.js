import React from "react"
import PropTypes from "prop-types"
import { Col, Row } from "react-bootstrap"

const FullView = ({ condition, main, child }) => {
  if (condition === true && child && child.props.children) {
    return (
      <Row>
        <Col md={ 12 }>
          { child }
        </Col>
      </Row>
    )
  } else {
    return (
      <Row>
        <Col md={ 12 }>
          { main }
        </Col>
      </Row>
    )
  }
}


FullView.propTypes = {
  main : PropTypes.object,
  child : PropTypes.object,
  condition : PropTypes.bool
}


FullView.defaultProps = {
  condition : true
}

export default FullView
