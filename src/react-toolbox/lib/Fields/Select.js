import React from "react"
import PropTypes from "prop-types"
import Select from "react-starter/src/react-toolbox/lib/FormField/Select"
import TreeSelect from "react-starter/src/react-toolbox/lib/FormField/Tree"
import Group from "react-starter/src/react-toolbox/lib/FormField/Group"
import messages from "./messages"

class GenericSelect extends React.Component {

  constructor(props) {

    super(props)

    this.state = { value : "" }

  }

  handleChange(value) {

    this.setState({ value })

    if (this.props.onChange) this.props.onChange(value)
  }

  componentWillMount() {

    if (this.props.onMount) this.props.onMount()
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.onWillUpdate) this.props.onWillUpdate(nextProps, nextState)
  }

  render() {

    const { value, options, onChange, name, type, ...rest } = this.props

    delete rest.onMount

    let Construct

    switch (type) {

    case "select" : Construct = Select; break
    case "group" : Construct = options.length > 10 ? Select : Group; break
    case "tree-select" : default : Construct = TreeSelect; break

    }

    return (
      <Construct
        name={ name }
        options={ options }
        onChange={ onChange }
        value={ value }
        placeholder={ messages.select }
        { ...rest }
      />
    )
  }

}

GenericSelect.propTypes = {
  onChange : PropTypes.func,
  options : PropTypes.array,
  dispatch : PropTypes.func,
  value : PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  name : PropTypes.string,
  type : PropTypes.string,
  onMount : PropTypes.func,
  onWillUpdate : PropTypes.func
}

GenericSelect.defaultProps = {
  type : "select"
}

export default GenericSelect
