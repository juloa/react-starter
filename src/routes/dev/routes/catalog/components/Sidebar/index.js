import React from "react"
import TreeMenu from "react-starter/src/react-toolbox/lib/TreeMenu"
import componentItems from "../../menuItems"
import ControlLabel from "react-bootstrap/lib/ControlLabel"
import FormGroup from "react-bootstrap/lib/FormGroup"
import FormControl from "react-bootstrap/lib/FormControl"


class Sidebar extends React.Component {

  constructor(props) {

    super(props)

    this.state = { componentItems }

    this.handleChange = this.handleChange.bind(this)

  }

  filter(val) {

    const reg = new RegExp(val, "i")

    this.setState({ componentItems : componentItems.filter(item => item.label.match(reg)) })

  }

  handleChange(e) {

    this.filter(e.target.value)

  }

  render() {

    return (
      <div { ...this.props }>
        <FormGroup style={ { padding : 10 } }>
          <ControlLabel>Rechercher</ControlLabel>
          <FormControl type="text" onChange={ this.handleChange }/>
        </FormGroup>
        <TreeMenu items={ this.state.componentItems }/>
      </div>

    )

  }

}


export default Sidebar
