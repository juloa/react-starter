import React from "react"
import PropTypes from "prop-types"
import BsModal from "react-bootstrap/lib/Modal"
import Modal from "../Modal"
import Button from "react-bootstrap/lib/Button"
import { FormattedMessage } from "react-intl"
import messages from "./messages"

class Confirm extends Modal {

  constructor(props) {

    super(props)

    this.handleCancel = this.handleCancel.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.toggleActiveChoice = this.toggleActiveChoice.bind(this)

    this.state = {
      visible : false,
      activeChoice : "confirm"
    }

  }

  handleCancel() {

    this.hide()
    this.props.onCancel()

  }

  handleConfirm() {

    this.hide()
    this.props.onConfirm()

  }

  handleKeyPress(e) {

    if (!this.state.visible) return

    if (e.key === "Escape") this.handleCancel()
    else if (e.key === "Enter") {

      this.state.activeChoice === "cancel" ? this.handleCancel() : this.handleConfirm()

    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {

      this.toggleActiveChoice()

    }

  }

  componentWillMount() {

    const { defaultChoice } = this.props

    if (defaultChoice && defaultChoice !== this.state.activeChoice) this.setState({ activeChoice : defaultChoice })

  }

  toggleActiveChoice() {

    const { activeChoice } = this.state


    this.setState({ activeChoice : activeChoice === "confirm" ? "cancel" : "confirm" })

  }

  componentDidMount() {

    document.addEventListener("keydown", this.handleKeyPress)

  }

  componentWillUnmount() {

    document.addEventListener("keydown", this.handleKeyPress)

  }

  render() {

    const { visible, activeChoice } = this.state
    const { children, ...rest } = this.props

    delete rest.onConfirm
    delete rest.onCancel
    delete rest.defaultChoice

    return (
      <BsModal
        onHide={ this.handleCancel }
        show={ visible }
        { ...rest }
      >
        <BsModal.Body>
          { children }
        </BsModal.Body>
        <BsModal.Footer>
          <Button bsStyle={ activeChoice === "confirm" ? "default" : "primary" } onClick={ this.handleCancel }>
            <FormattedMessage { ...messages.no } />
          </Button>
          &nbsp;
          <Button bsStyle={ activeChoice === "cancel" ? "default" : "primary" } onClick={ this.handleConfirm }>
            <FormattedMessage { ...messages.yes } />
          </Button>
        </BsModal.Footer>
      </BsModal>
    )
  }

}

Confirm.propTypes = {
  ...Confirm.propTypes,
  onCancel : PropTypes.func.isRequired,
  onConfirm : PropTypes.func.isRequired,
  defaultChoice : PropTypes.oneOf(["cancel", "confirm"])
}

Confirm.defaultProps = {
  ...Confirm.defaultProps,
  defaultChoice : "confirm",
  onCancel() {}
}

export default Confirm
