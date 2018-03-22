/* eslint react/prop-types:0 */
import React from "react"
import FormField from "../"
import wrapForm from "./wrapForm"
import { Button } from "react-bootstrap"

class Field extends React.Component {

  constructor(props) {
    super(props)
    this.state = { display : "default", multi : false }
    this.handleClickType = this.handleClickType.bind(this)
    this.handleClickMulti = this.handleClickMulti.bind(this)
  }

  handleClickMulti() {

    this.setState({
      multi : !this.state.multi
    })
  }

  handleClickType() {

    this.setState({
      display : this.state.display === "default" ? "buttons" : "default"
    })
  }

  render() {

    const { readonly, inline, disabled } = this.props
    const { display, multi } = this.state

    const props = {
      name : "category",
      type : "group",
      label : "Category",
      bsStyle : "primary",
      readonly,
      inline,
      display,
      multi,
      disabled
    }

    if (display !== "buttons") delete props.bsStyle

    return (
      <div>
        <FormField { ...props }>
          <option>Sports</option>
          <option>Economie</option>
          <option>Mathématiques</option>
          <option>Philosophie</option>
        </FormField>
        <br/>
        <Button onClick={ this.handleClickMulti }>Toggle multiple</Button>
        { " " }
        <Button onClick={ this.handleClickType }>Toggle display type</Button>
      </div>
    )
  }

}


const initialValues = {
  category : "Economie"
}

export default wrapForm(Field, initialValues)

