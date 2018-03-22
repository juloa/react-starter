import React, { Component } from "react"
import Button from "react-bootstrap/lib/Button"
import Confirm from "./"

export default class ConfirmExample extends Component {

  constructor(props) {

    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)

    this.state = { confirmed : false }

  }

  handleClick() {

    this.dialog.show()

  }

  handleConfirm() {

    this.setState({ confirmed : true })

  }

  handleCancel() {

    this.setState({ confirmed : false })

  }


  render() {

    return (
      <div>
        <Confirm
          ref={ elmt => this.dialog = elmt }
          onConfirm={ this.handleConfirm }
          onCancel={ this.handleCancel }
        >Etes-vous sûr ?</Confirm>
        <Button onClick={ this.handleClick }>Afficher la boîte</Button>
        <br/>
        { this.state.confirmed ? "La confirmation a été faite" : "En attente de confirmation" }
      </div>
    )

  }

}
