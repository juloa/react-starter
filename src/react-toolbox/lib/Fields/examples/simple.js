import React from "react"

export default function createExample(Component) {

  return class SelectExample extends React.Component {

    constructor(props) {
      super(props)
      this.state = { value : "" }
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
      this.setState({ value })
    }

    render() {
      return (
        <Component value={ this.state.value } onChange={ this.handleChange }/>
      )
    }

  }
}
