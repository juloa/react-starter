import React, { Component } from "react"
import PropTypes from "prop-types"
import Code from "react-starter/src/react-toolbox/lib/Code"
import Section from "../Section/"
import { elmtToJSX } from "react-starter/src/react-toolbox/lib/jsx-serializer"
import classNames from "./style.module.css"
import Button from "react-bootstrap/lib/Button"

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

class Descript extends Component {

  constructor(props) {

    super(props)

    this.handleClick = this.handleClick.bind(this)

    this.state = { hideComponent : true }

  }

  toggleComponent() {

    this.setState({ hideComponent : !this.state.hideComponent })

  }

  handleClick() {

    this.toggleComponent()

  }

  render() {

    const { component, description, hideComponent, fullCode } = this.props

    let content

    if (hideComponent && this.state.hideComponent) {

      content = (
        <Button onClick={ this.handleClick } bsStyle="primary">
          Afficher le composant
        </Button>
      )

    } else {

      content = (
        <div className={ classNames.renderer }>
          { component }
        </div>
      )

    }

    return (
      <section>
        <h3>{ capitalizeFirstLetter(description) }</h3>
        <br/>
        <br/>
        <Section title="Rendu">
          { content }
        </Section>
        <Section title="Code">
          <Code>
            { fullCode ? fullCode : elmtToJSX(component) }
          </Code>
        </Section>
      </section>
    )

  }

}

Descript.propTypes = {
  component : PropTypes.node,
  description : PropTypes.string,
  hideComponent : PropTypes.bool,
  fullCode : PropTypes.string
}


export default Descript
