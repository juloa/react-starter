import React from "react"
import GroupField from "react-toolbox/lib/GroupField"

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

      const name = Component.displayName

      return (
        <GroupField
          name={ name }
          label={ name }
          inline
          type={ Component }
          value={ this.state.value }
          onChange={ this.handleChange }
        />
      )
    }

  }
}
