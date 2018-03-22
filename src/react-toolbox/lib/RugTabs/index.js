import React, { Children } from "react"
import PropTypes from "prop-types"
import RugMenu from "../RugMenu"
import { Tab, NavItem } from "react-bootstrap"
import Chance from "chance"

const chance = new Chance()

class RugTabs extends React.Component {

  constructor(props) {

    super(props)

    this.id = chance.guid()
  }

  render() {

    const { children, ...rest } = this.props

    return (
      <Tab.Container id={ this.id } { ...rest }>
        <div>
          <RugMenu>
            { Children.map(children, child => (
              <NavItem eventKey={ child.props.eventKey }>
                { child.props.title }
              </NavItem>
            )) }
          </RugMenu>
          <Tab.Content animation>
            { Children.map(children, child => {
              const { ...props } = child.props

              delete props.title

              return <Tab.Pane { ...props }/>
            }) }
          </Tab.Content>
        </div>
      </Tab.Container>
    )
  }

}

RugTabs.propTypes = {
  children : PropTypes.node
}

export default RugTabs
