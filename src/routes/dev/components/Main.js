import React from "react"
import PropTypes from "prop-types"
import Button from "react-toolbox/lib/Button"
import PageContent from "react-toolbox/lib/Layout/PageContent"
import { Col,Row,Panel } from "react-bootstrap"

const Main = ({ children }) => {

  if (children) return children
  else {

    return (
      <PageContent title="Developer Area">
        <Row>
          <Col md ={ 12} >
            <Panel>
              <Button link="dev/catalog">» Catalog</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button link="dev/crud">» Crud example</Button>
            </Panel>
          </Col>
        </Row>
      </PageContent>
    )
  }
}

Main.propTypes = {
  children : PropTypes.node
}

export default Main