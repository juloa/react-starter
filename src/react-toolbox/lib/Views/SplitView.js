import React from "react"
import PropTypes from "prop-types"
import { Panel, Col, Row } from "react-bootstrap"

const SplitView = ({ condition, main, child }) => {
  if (condition === true && child ) {
    return (
      <Row>
        <Col md={ 6 }>
          { main }
        </Col>
        <Col md={ 6 }>
          <Panel>
          { child }
          </Panel>
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

SplitView.propTypes = {
  main : PropTypes.object,
  child : PropTypes.object,
  condition : PropTypes.bool
}

SplitView.defaultProps = {
  condition : true
}

export default SplitView
