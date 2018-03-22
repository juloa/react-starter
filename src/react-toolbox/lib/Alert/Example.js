import React, { Component } from "react"
import Button from "react-bootstrap/lib/Button"
import Alert from "./"

export default class AlertExample extends Component {

  constructor(props) {

    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.handleClick = this.handleClick.bind(this)

    this.state = { readed : false }

  }

  handleClose() {

    this.setState({ readed : true })

  }

  handleClick() {

    this.dialog.show()

  }

  render() {

    return (
      <div>
        <Alert
          ref={ elmt => this.dialog = elmt }
          onClose={ this.handleClose }
        >Ceci est un simple message d'information.</Alert>
        <Button onClick={ this.handleClick }>Afficher la boîte</Button>
        <br/>
        { this.state.readed ? "Message lu" : "Message non lu" }
      </div>
    )

  }

}
